export type Topic = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string | null;
  publishedAt: string | null;
  categories: string[];
  articleCount: number | null;
  perspectives: Partial<Record<"left" | "center" | "right", string>>;
  articles: Partial<Record<"left" | "center" | "right", TopicArticle[]>>;
  fullSummary?: string;
  analysis?: string;
  blindspots?: string[];
  officialSource?: { label: string; url: string } | null;
  poll?: { question: string; options: string[] } | null;
};

export type TopicArticle = {
  title: string;
  summary: string;
  source: string;
  publishedAt: string | null;
  url: string | null;
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

function topicId(source: UnknownRecord): string {
  return firstString(source, ["id", "topic_id", "uuid"]);
}

function topicArticle(value: unknown): TopicArticle | null {
  const source = record(value);
  if (!source) return null;
  const title = firstString(source, ["title", "headline"]);
  if (!title) return null;
  const url = safeUrl(firstString(source, ["url", "article_url", "link"]));
  return {
    title,
    summary: firstString(source, ["preview", "summary", "excerpt", "description"]),
    source: firstString(source, ["source_name", "source", "publisher"]),
    publishedAt: firstString(source, ["published_at", "publishedAt", "date"]) || null,
    url,
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

export function sanitizePublicTopic(value: unknown): Topic | null {
  const source = record(value);
  if (!source) return null;
  const id = topicId(source);
  const title = firstString(source, ["title", "name"]);
  if (!id || !title) return null;

  const perspectivesSource = record(source.perspectives) ?? record(source.spectrum) ?? {};
  const articlesSource = record(source.articles_by_perspective) ?? record(source.articles) ?? {};
  const image = safeUrl(firstString(source, ["image_url", "imageUrl", "cover_image", "image"]));
  const count = source.article_count ?? source.articles_count;

  return {
    id,
    title,
    summary: firstString(source, ["summary", "preview", "short_summary", "description"]),
    imageUrl: image,
    publishedAt: firstString(source, ["published_at", "publishedAt", "created_at", "date"]) || null,
    categories: strings(source.categories ?? source.tags),
    articleCount: typeof count === "number" && Number.isFinite(count) ? count : null,
    perspectives: {
      left: perspectiveText(perspectivesSource.left ?? perspectivesSource.esquerda ?? source.left_summary),
      center: perspectiveText(perspectivesSource.center ?? perspectivesSource.centro ?? source.center_summary),
      right: perspectiveText(perspectivesSource.right ?? perspectivesSource.direita ?? source.right_summary),
    },
    articles: {
      left: articleList(articlesSource.left ?? articlesSource.esquerda ?? source.left_articles),
      center: articleList(articlesSource.center ?? articlesSource.centro ?? source.center_articles),
      right: articleList(articlesSource.right ?? articlesSource.direita ?? source.right_articles),
    },
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
      for (const nestedKey of ["topics", "items", "results"]) {
        if (Array.isArray(nested[nestedKey])) return nested[nestedKey] as unknown[];
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
  return sanitizePublicTopic(record(source.topic) ?? record(source.data) ?? source);
}

export function sanitizePremiumDetail(payload: unknown): Topic | null {
  const outer = record(payload);
  const source = outer ? record(outer.topic) ?? record(outer.data) ?? outer : null;
  if (!source) return null;
  const topic = sanitizePublicTopic(source);
  if (!topic) return null;
  const perspectives = record(source.perspectives) ?? record(source.spectrum) ?? {};
  const groups = record(source.articles_by_perspective) ?? record(source.articles) ?? {};
  const official = record(source.official_source) ?? record(source.primary_source);
  const pollSource = record(source.poll);
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
    center: perspectiveText(perspectives.center ?? perspectives.centro ?? source.center_analysis ?? source.center_summary) || topic.perspectives.center,
    right: perspectiveText(perspectives.right ?? perspectives.direita ?? source.right_analysis ?? source.right_summary) || topic.perspectives.right,
  };
  topic.articles = {
    left: articleList(groups.left ?? groups.esquerda ?? source.left_articles, 100),
    center: articleList(groups.center ?? groups.centro ?? source.center_articles, 100),
    right: articleList(groups.right ?? groups.direita ?? source.right_articles, 100),
  };
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