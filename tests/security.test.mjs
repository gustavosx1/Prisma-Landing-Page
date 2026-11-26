import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Run the actual TypeScript helpers/Route Handler with isolated upstream doubles.
// No Supabase credentials, live requests or paid content are used.
function load(relativePath, imports = {}, fetchMock) {
  const path = fileURLToPath(new URL(`../${relativePath}`, import.meta.url));
  const source = readFileSync(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  new Function("require", "exports", "fetch", outputText)((name) => {
    if (!(name in imports)) throw new Error(`Unmocked import: ${name}`);
    return imports[name];
  }, exports, fetchMock);
  return exports;
}

const presentation = load("lib/topicPresentation.ts");
const topics = load("lib/topics.ts", { "./topicPresentation": presentation });
const { safeReturnTo } = load("lib/safeReturnTo.ts");
const { topicCopyText } = load("lib/topicCopy.ts");
const fixture = {
  id: "public-topic", title: "Título público", summary: "Prévia permitida",
  full_summary: "Não deve vazar", analysis: "Não deve vazar",
  official_source: { url: "https://example.com/secret" },
  articles: { left: Array.from({ length: 8 }, (_, i) => ({ id: String(i), title: "Matéria", url: "javascript:alert(1)" })) },
};

function detailRoute({ session = null, premium = false, contains = true, upstreamStatus = 200, authError = false } = {}) {
  const calls = [];
  const helpers = {
    authorizedSession: async () => { if (authError) throw new Error("internal secret"); return session; },
    checkPremium: async () => premium,
    privateHeaders: (token) => ({ Authorization: `Bearer ${token}` }),
    publicPreviewContains: async () => contains,
    topicsApiUrl: (path) => `https://api.example/${path}`,
  };
  const route = load("app/api/topics/[topicId]/route.ts", {
    "next/server": { NextResponse: { json: (data, options) => Response.json(data, options) } },
    "@/lib/server/topics-api": helpers,
    "@/lib/topics": topics,
  }, async (url, options) => {
    calls.push({ url, options });
    return Response.json(fixture, { status: url.includes("topicsfree/") ? 200 : upstreamStatus });
  });
  return { calls, get: (id = "public-topic") => route.GET(new Request("https://site.example/api/topics/test"), { params: Promise.resolve({ topicId: id }) }) };
}

test("authentication return paths stay local after normalization", () => {
  for (const value of [null, "https://evil.example", "//evil.example", "/\\evil.example", "/%5cevil.example", "/%2fevil.example", "/\tevil.example", "/%00evil", "/%zz"]) {
    assert.equal(safeReturnTo(value), "/topicos", String(value));
  }
  assert.equal(safeReturnTo("/topicos/public-topic?source=feed#summary"), "/topicos/public-topic?source=feed#summary");
  assert.equal(safeReturnTo("/@example.com"), "/@example.com"); // This is a local path, not a domain.
});

test("public sanitization caps topics/articles and rejects executable links", () => {
  assert.equal(topics.sanitizePublicFeed(Array(12).fill(fixture)).length, 3);
  const detail = topics.sanitizePublicDetail(fixture);
  assert.equal(detail.articles.left.length, 2);
  assert.equal(detail.articles.left[0].url, null);
  for (const key of ["fullSummary", "analysis", "officialSource", "poll"]) assert.equal(detail[key], undefined);
});

test("malformed topic IDs never reach upstream", async () => {
  const route = detailRoute();
  for (const id of ["../secret", "a/b", "x?access=premium", "", "x".repeat(161)]) assert.equal((await route.get(id)).status, 400);
  assert.equal(route.calls.length, 0);
});

test("changing an ID outside the public sample fails closed", async () => {
  const route = detailRoute({ contains: false });
  assert.equal((await route.get("other-topic")).status, 404);
  assert.equal(route.calls.length, 0);
});

test("free authenticated detail is sanitized and never fetches Premium", async () => {
  const route = detailRoute({ session: { accessToken: "test-token" } });
  const response = await route.get();
  const body = await response.json();
  assert.equal(body.access, "preview");
  assert.equal(body.topic.analysis, undefined);
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("Vary"), "Cookie");
  assert.ok(route.calls.every(({ url }) => url.includes("topicsfree/")));
});

test("upstream Premium denial only permits a sanitized public preview", async () => {
  for (const upstreamStatus of [401, 403]) {
    const route = detailRoute({ session: { accessToken: "test-token" }, premium: true, upstreamStatus });
    const response = await route.get();
    assert.equal((await response.json()).access, "preview");
    assert.equal(route.calls[0].options.headers.Authorization, "Bearer test-token");
    assert.equal(route.calls[0].options.cache, "no-store");
  }
});

test("Premium requires validated session and verified upstream response", async () => {
  const route = detailRoute({ session: { accessToken: "test-token" }, premium: true });
  const response = await route.get();
  assert.equal((await response.json()).access, "premium");
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
});

test("authentication failures return generic errors without upstream access", async () => {
  const route = detailRoute({ authError: true });
  const response = await route.get();
  assert.equal(response.status, 503);
  assert.ok(!JSON.stringify(await response.json()).includes("internal secret"));
  assert.equal(route.calls.length, 0);
});

test("subscription verification fails closed on upstream errors", async () => {
  for (const payload of [null, {}, { is_premium: false }]) assert.equal(topics.isPremiumSubscription(payload), false);
  const server = load("lib/server/topics-api.ts", {
    "@/lib/supabase/server": { createSupabaseServerClient: async () => ({}) },
    "@/lib/topics": topics,
  }, async () => { throw new Error("unavailable"); });
  assert.equal(await server.checkPremium("test-token"), false);
});

test("copy contains loaded title, summary and exact Prisma attribution", () => {
  assert.equal(topicCopyText(" Título ", " Sumário "), "Título\n\nSumário\n\nvia Prisma News\nhttps://www.prismanews.com.br/");
  assert.equal(topicCopyText("Título", ""), "Título\n\nvia Prisma News\nhttps://www.prismanews.com.br/");
});

test("blindspot lists every missing group only for Premium with complete counts", () => {
  assert.equal(presentation.blindspotLabel({ left: 0, center: 4, right: 0 }, true), "Blindspot: esquerda e direita");
  assert.equal(presentation.blindspotLabel({ left: 0, center: 0, right: 4 }, true), "Blindspot: esquerda e centro");
  assert.equal(presentation.blindspotLabel({ left: 1, center: 1, right: 8 }, true), "Blindspot: Cobertura equilibrada");
  assert.equal(presentation.blindspotLabel({ left: 0, center: 4, right: 0 }, false), null);
  assert.equal(presentation.blindspotLabel({ left: 0, center: 0, right: 0 }, true), null);
  assert.equal(presentation.blindspotLabel(null, true), null);
  assert.equal(presentation.completeCoverageCounts({ blindspot: { left_count: 0, center_count: 4 } }), null);
  assert.deepEqual(presentation.completeCoverageCounts({ blindspot: { left_count: 0, center_count: 4, right_count: 0 } }), { left: 0, center: 4, right: 0 });
});

test("sanitized topic preserves unknown coverage across snapshots and SSR", () => {
  const missing = topics.sanitizePublicTopic({ id: "missing", title: "Sem contagens" });
  assert.equal(missing.completePerspectiveCounts, null);
  assert.equal(topics.sanitizePublicTopic(missing).completePerspectiveCounts, null);
  const known = topics.sanitizePremiumDetail({ id: "known", title: "Com contagens", blindspot: { left_count: 0, center_count: 4, right_count: 0 } });
  assert.deepEqual(topics.sanitizePublicTopic(known).completePerspectiveCounts, { left: 0, center: 4, right: 0 });
});

test("sorting changes the whole feed including the first five featured topics", () => {
  const feed = Array.from({ length: 7 }, (_, index) => ({
    id: `topic-${index}`, publishedAt: `2026-11-${String(26 - index).padStart(2, "0")}T10:00:00Z`, articleCount: index,
  }));
  const original = feed.map(({ id }) => id);
  assert.deepEqual(presentation.sortTopics(feed, "latest").map(({ id }) => id), original);
  assert.deepEqual(presentation.sortTopics(feed, "coverage").map(({ id }) => id), [...original].reverse());
  assert.deepEqual(feed.map(({ id }) => id), original);
  assert.equal(presentation.sortTopics(feed, "coverage").slice(0, 5)[0].id, "topic-6");
  const free = feed.slice(0, 3);
  assert.equal(presentation.sortTopics(free, "coverage").length, 3);
  assert.equal(presentation.sortTopics(free, "coverage")[0].id, "topic-2");
});

test("feed return snapshot retains sort choice and defaults legacy snapshots", () => {
  const values = new Map();
  const previousWindow = globalThis.window;
  globalThis.window = { sessionStorage: {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key),
  } };
  try {
    const state = load("lib/topicFeedState.ts", { "@/lib/topics": topics });
    const snapshot = { topicId: "public-topic", scrollY: 240, topics: [fixture], premium: true, category: "tudo", offset: 1, hasMore: false, featuredIndex: 0, searchOpen: false, searchDraft: "", activeQuery: "", sort: "coverage" };
    state.saveTopicFeedSnapshot(snapshot);
    assert.equal(state.readTopicFeedSnapshot().sort, "coverage");
    const legacy = JSON.parse(values.get(state.TOPIC_FEED_RETURN_KEY));
    delete legacy.sort;
    values.set(state.TOPIC_FEED_RETURN_KEY, JSON.stringify(legacy));
    assert.equal(state.readTopicFeedSnapshot().sort, "latest");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});