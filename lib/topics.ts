export type Topic = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  publishedAt: string | null;
  categories: string[];
  articleCount: number | null;
  perspectiveCounts: { left: number; center: number; right: number };
  perspectives: Partial<Record<ArticlePerspective, string>>;
  articles: Partial<Record<ArticlePerspective, TopicArticle[]>>;
  lockedArticleCount?: number;
  previewLimit?: number;
  fullSummary?: string;
  analysis?: string;
  blindspots?: string[];
  officialSource?: { label: string; url: string } | null;
  poll?: { question: string; options: string[] } | null;
};

export type ArticlePerspective = "left" | "center_left" | "center" | "center_right" | "right";

export type TopicArticle = {
  id: string;
  title: string;
  summary: string;
  source: string;
  outletLogo: string | null;
  author: string;
  publishedAt: string | null;
  url: string | null;
  checked?: boolean;
  perspectiveScore?: number;
};

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as UnknownRecord
    : null;
}

function firstString(source: UnknownRecord, keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function safeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function perspectiveScore(source: UnknownRecord): number | undefined {
  for (const key of ["perspective_score", "perspectiveScore", "political_score", "politicalScore", "bias_score", "biasScore", "ideology_score", "ideologyScore", "score"]) {
    const value = source[key];
    const score = typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value) : NaN;
    if (Number.isFinite(score) && score >= 0 && score <= 100) return score;
  }
  return undefined;
}

function topicId(source: UnknownRecord): string {
  return firstString(source, ["id", "topic_id", "uuid"]);
}

function topicArticle(value: unknown): TopicArticle | null {
  const source = record(value);
  if (!source) return null;
  const outlet = record(source.outlet);
  const title = firstString(source, ["title", "headline"]);
  if (!title) return null;
  const url = safeUrl(firstString(source, ["url", "article_url", "link"]));
  const outletLogo = safeUrl(firstString(source, ["outlet_logo", "outlet_image", "outletLogo", "image_url"]) || firstString(outlet ?? {}, ["outlet_logo", "outlet_image", "logo", "image_url"]));
  return {
    id: firstString(source, ["id", "article_id", "uuid"]) || `${title}-${url ?? ""}`,
    title,
    summary: firstString(source, ["lead", "preview", "summary", "excerpt", "description"]),
    source: firstString(outlet ?? {}, ["name"]) || firstString(source, ["source_name", "source", "publisher"]),
    outletLogo,
    author: firstString(source, ["author", "author_name"]),
    publishedAt: firstString(source, ["published_at", "publishedAt", "date"]) || null,
    url,
    checked: typeof source.checked === "boolean" ? source.checked : undefined,
    perspectiveScore: perspectiveScore(source) ?? (outlet ? perspectiveScore(outlet) : undefined),
  };
}

function articleList(value: unknown, limit = 3): TopicArticle[] {
  if (!Array.isArray(value)) return [];
  return value.map(topicArticle).filter((article): article is TopicArticle => article !== null).slice(0, limit);
}

function strings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").slice(0, 8);
}

function perspectiveText(value: unknown): string {
  if (typeof value === "string") return value;
  const source = record(value);
  return source ? firstString(source, ["summary", "preview", "overview", "description"]) : "";
}

const ARTICLE_PERSPECTIVES: { key: ArticlePerspective; aliases: string[] }[] = [
  { key: "left", aliases: ["left", "esquerda"] },
  { key: "center_left", aliases: ["center_left", "center-left", "centro_esquerda", "centro-esquerda"] },
  { key: "center", aliases: ["center", "centro"] },
  { key: "center_right", aliases: ["center_right", "center-right", "centro_direita", "centro-direita"] },
  { key: "right", aliases: ["right", "direita"] },
];

function sanitizeArticleGroups(source: UnknownRecord, limit: number): Partial<Record<ArticlePerspective, TopicArticle[]>> {
  const groups = record(source.articles_by_perspective) ?? record(source.articles) ?? {};
  const result: Partial<Record<ArticlePerspective, TopicArticle[]>> = {};
  for (const { key, aliases } of ARTICLE_PERSPECTIVES) {
    const raw = aliases.map((alias) => groups[alias] ?? source[`articles_${alias}`]).find(Array.isArray);
    result[key] = articleList(raw, limit);
  }
  return result;
}

function paywallValues(source: UnknownRecord) {
  const paywall = record(source.paywall) ?? {};
  const locked = paywall.locked_article_count ?? source.lockedArticleCount;
  const preview = paywall.preview_limit ?? source.previewLimit;
  return {
    lockedArticleCount: typeof locked === "number" && Number.isFinite(locked) && locked > 0 ? locked : 0,
    previewLimit: typeof preview === "number" && Number.isFinite(preview) && preview > 0 ? Math.min(5, Math.floor(preview)) : 2,
  };
}

export function sanitizePublicTopic(value: unknown): Topic | null {
  const source = record(value);
  if (!source) return null;
  const id = topicId(source);
  const title = firstString(source, ["title", "canonical_title", "name"]);
  if (!id || !title) return null;

  const perspectivesSource = record(source.perspectives) ?? record(source.spectrum) ?? {};
  const image = safeUrl(firstString(source, ["image_url", "imageUrl", "cover_image", "image"]));
  const count = source.article_count ?? source.articles_count;
  const blindspot = record(source.blindspot) ?? record(source.blind_spot) ?? {};
  const spectrumCounts = record(source.perspective_counts) ?? record(source.perspectiveCounts) ?? record(source.spectrum_counts) ?? record(source.spectrumCounts) ?? {};
  const safeCount = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
  const firstCount = (...values: unknown[]) => values.map(safeCount).find((value) => value > 0) ?? 0;

  return {
    id,
    title,
    summary: firstString(source, ["summary", "preview", "short_summary", "description"]),
    imageUrl: image,
    publishedAt: firstString(source, ["published_at", "publishedAt", "created_at", "date"]) || null,
    categories: strings(source.categories ?? source.tags),
    articleCount: typeof count === "number" && Number.isFinite(count) ? count : null,
    perspectiveCounts: {
      left: firstCount(blindspot.left_count, blindspot.left, spectrumCounts.left_count, spectrumCounts.left, spectrumCounts.esquerda, source.left_count, source.leftCount),
      center: firstCount(blindspot.center_count, blindspot.center, spectrumCounts.center_count, spectrumCounts.center, spectrumCounts.centro, source.center_count, source.centerCount),
      right: firstCount(blindspot.right_count, blindspot.right, spectrumCounts.right_count, spectrumCounts.right, spectrumCounts.direita, source.right_count, source.rightCount),
    },
    perspectives: {
      left: perspectiveText(perspectivesSource.left ?? perspectivesSource.esquerda ?? source.left_summary),
      center_left: perspectiveText(perspectivesSource.center_left ?? perspectivesSource["center-left"] ?? source.center_left_summary),
      center: perspectiveText(perspectivesSource.center ?? perspectivesSource.centro ?? source.center_summary),
      center_right: perspectiveText(perspectivesSource.center_right ?? perspectivesSource["center-right"] ?? source.center_right_summary),
      right: perspectiveText(perspectivesSource.right ?? perspectivesSource.direita ?? source.right_summary),
    },
    articles: sanitizeArticleGroups(source, 3),
  };
}

function payloadItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const source = record(payload);
  if (!source) return [];
  for (const key of ["topics", "items", "results", "data"]) {
    const value = source[key];
    if (Array.isArray(value)) return value;
    const nested = record(value);
    if (nested) {
      for (const nestedKey of ["topics", "items", "results", "data"] as const) {
        if (Array.isArray(nested[nestedKey])) return nested[nestedKey] as unknown[];
        const deeper = record(nested[nestedKey]);
        if (deeper && Array.isArray(deeper.data)) return deeper.data;
      }
    }
  }
  return [];
}

export function sanitizePublicFeed(payload: unknown): Topic[] {
  // Deliberately cap after sanitization too; query parameters cannot increase previews.
  return payloadItems(payload).map(sanitizePublicTopic).filter((topic): topic is Topic => topic !== null).slice(0, 3);
}

export function sanitizePremiumFeed(payload: unknown): Topic[] {
  return payloadItems(payload).map(sanitizePublicTopic).filter((topic): topic is Topic => topic !== null).slice(0, 50);
}

export function sanitizePublicDetail(payload: unknown): Topic | null {
  const source = record(payload);
  if (!source) return null;
  const detail = record(source.topic) ?? record(source.data) ?? source;
  const topic = sanitizePublicTopic(detail);
  if (!topic) return null;
  const { lockedArticleCount, previewLimit } = paywallValues(detail);
  topic.articles = sanitizeArticleGroups(detail, previewLimit);
  topic.lockedArticleCount = lockedArticleCount;
  topic.previewLimit = previewLimit;
  return topic;
}

export function sanitizePremiumDetail(payload: unknown): Topic | null {
  const outer = record(payload);
  const source = outer ? record(outer.topic) ?? record(outer.data) ?? outer : null;
  if (!source) return null;
  const topic = sanitizePublicTopic(source);
  if (!topic) return null;
  const perspectives = record(source.perspectives) ?? record(source.spectrum) ?? {};
  const official = record(source.official_source) ?? record(source.primary_source);
  const pollSource = record(source.poll) ?? record(source.official_source_poll);
  const { lockedArticleCount, previewLimit } = paywallValues(source);
  topic.summary = firstString(source, ["summary", "full_summary", "description"]) || topic.summary;
  topic.fullSummary = firstString(source, ["full_summary", "complete_summary", "summary_full"]);
  topic.analysis = firstString(source, ["analysis", "deep_analysis", "editorial_analysis"]);
  topic.blindspots = strings(source.blindspots ?? source.blind_spots);
  topic.officialSource = official ? {
    label: firstString(official, ["title", "name", "label", "source_name"]),
    url: safeUrl(firstString(official, ["url", "link"])) ?? "",
  } : null;
  topic.poll = pollSource ? {
    question: firstString(pollSource, ["question", "title"]),
    options: strings(pollSource.options),
  } : null;
  topic.perspectives = {
    left: perspectiveText(perspectives.left ?? perspectives.esquerda ?? source.left_analysis ?? source.left_summary) || topic.perspectives.left,
    center_left: perspectiveText(perspectives.center_left ?? perspectives["center-left"] ?? source.center_left_analysis ?? source.center_left_summary) || topic.perspectives.center_left,
    center: perspectiveText(perspectives.center ?? perspectives.centro ?? source.center_analysis ?? source.center_summary) || topic.perspectives.center,
    center_right: perspectiveText(perspectives.center_right ?? perspectives["center-right"] ?? source.center_right_analysis ?? source.center_right_summary) || topic.perspectives.center_right,
    right: perspectiveText(perspectives.right ?? perspectives.direita ?? source.right_analysis ?? source.right_summary) || topic.perspectives.right,
  };
  topic.articles = sanitizeArticleGroups(source, 100);
  topic.lockedArticleCount = lockedArticleCount;
  topic.previewLimit = previewLimit;
  const officialSources = strings(official?.sources);
  if (topic.officialSource && !topic.officialSource.url && officialSources[0]) {
    topic.officialSource.url = safeUrl(officialSources[0]) ?? "";
  }
  return topic;
}

export function isPremiumSubscription(payload: unknown): boolean {
  const source = record(payload);
  if (!source) return false;
  const nested = record(source.subscription) ?? record(source.data);
  const values = [source, nested].filter((item): item is UnknownRecord => item !== null);
  return values.some((item) => {
    if (item.is_premium === true || item.premium === true || item.entitled === true || item.has_premium === true) return true;
    const active = [item.status, item.subscription_status, item.state].some((value) =>
      typeof value === "string" && ["active", "premium", "trialing"].includes(value.toLowerCase())
    );
    const plan = [item.product_type, item.plan, item.product_id, item.entitlement].some((value) =>
      typeof value === "string" && value.toLowerCase().includes("premium")
    );
    const entitlements = record(item.entitlements);
    const premiumEntitlement = entitlements?.premium;
    return active && plan || premiumEntitlement === true || record(premiumEntitlement)?.is_active === true || record(premiumEntitlement)?.isActive === true;
  });
}