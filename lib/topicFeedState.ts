import { sanitizePublicTopic, type Topic } from "@/lib/topics";

export const TOPIC_FEED_RETURN_KEY = "prisma_topic_feed_return_v1";
const SNAPSHOT_MAX_AGE_MS = 30 * 60 * 1000;
const SNAPSHOT_MAX_TOPICS = 300;

export type TopicFeedCategory = "tudo" | "economia" | "política" | "tecnologia" | "mundo" | "esportes";

export type TopicFeedSnapshot = {
  version: 1;
  savedAt: number;
  topicId: string;
  scrollY: number;
  topics: Topic[];
  premium: boolean;
  category: TopicFeedCategory;
  offset: number;
  hasMore: boolean;
  featuredIndex: number;
  searchOpen: boolean;
  searchDraft: string;
  activeQuery: string;
};

const CATEGORIES: TopicFeedCategory[] = ["tudo", "economia", "política", "tecnologia", "mundo", "esportes"];

export function saveTopicFeedSnapshot(snapshot: Omit<TopicFeedSnapshot, "version" | "savedAt">) {
  try {
    const safeTopics = snapshot.topics
      .slice(0, SNAPSHOT_MAX_TOPICS)
      .map(sanitizePublicTopic)
      .filter((topic): topic is Topic => topic !== null);
    const value: TopicFeedSnapshot = {
      ...snapshot,
      topics: safeTopics,
      version: 1,
      savedAt: Date.now(),
    };
    window.sessionStorage.setItem(TOPIC_FEED_RETURN_KEY, JSON.stringify(value));
  } catch {
    // Feed navigation should continue if session storage is unavailable or full.
  }
}

export function readTopicFeedSnapshot(topicId?: string): TopicFeedSnapshot | null {
  try {
    const raw = window.sessionStorage.getItem(TOPIC_FEED_RETURN_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
    const snapshot = value as Partial<TopicFeedSnapshot>;
    const age = Date.now() - (snapshot.savedAt ?? 0);
    if (
      snapshot.version !== 1 ||
      !Number.isFinite(snapshot.savedAt) || age < 0 || age > SNAPSHOT_MAX_AGE_MS ||
      typeof snapshot.topicId !== "string" || (topicId && snapshot.topicId !== topicId) ||
      typeof snapshot.scrollY !== "number" || !Number.isFinite(snapshot.scrollY) || snapshot.scrollY < 0 ||
      !Array.isArray(snapshot.topics) || typeof snapshot.premium !== "boolean" ||
      !CATEGORIES.includes(snapshot.category as TopicFeedCategory) ||
      typeof snapshot.offset !== "number" || !Number.isInteger(snapshot.offset) || snapshot.offset < 0 ||
      typeof snapshot.hasMore !== "boolean" ||
      typeof snapshot.featuredIndex !== "number" || !Number.isInteger(snapshot.featuredIndex) || snapshot.featuredIndex < 0 ||
      typeof snapshot.searchOpen !== "boolean" ||
      typeof snapshot.searchDraft !== "string" || snapshot.searchDraft.length > 121 ||
      typeof snapshot.activeQuery !== "string" || snapshot.activeQuery.length > 120
    ) {
      return null;
    }

    const topics = snapshot.topics
      .slice(0, SNAPSHOT_MAX_TOPICS)
      .map(sanitizePublicTopic)
      .filter((topic): topic is Topic => topic !== null);
    return { ...snapshot, topics } as TopicFeedSnapshot;
  } catch {
    return null;
  }
}

export function clearTopicFeedSnapshot() {
  try {
    window.sessionStorage.removeItem(TOPIC_FEED_RETURN_KEY);
  } catch {
    // Continue normally when storage is disabled.
  }
}
