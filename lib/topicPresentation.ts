import type { Topic } from "./topics";

export type TopicSort = "latest" | "coverage";
type Counts = Topic["perspectiveCounts"];

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

/** Absence cannot be inferred from limited article previews or missing counts. */
export function completeCoverageCounts(payload: unknown): Counts | null {
  const outer = record(payload);
  const source = record(outer?.topic) ?? record(outer?.data) ?? outer;
  if (!source) return null;
  if (Object.hasOwn(source, "completePerspectiveCounts") && source.completePerspectiveCounts === null) return null;
  const counts = record(source.completePerspectiveCounts) ?? record(source.blindspot) ?? record(source.blind_spot) ?? record(source.perspective_counts) ?? record(source.perspectiveCounts) ?? record(source.spectrum_counts) ?? record(source.spectrumCounts) ?? source;
  const read = (key: string, localized: string) => counts[`${key}_count`] ?? counts[key] ?? counts[localized] ?? source[`${key}_count`] ?? source[`${key}Count`];
  const values = [read("left", "esquerda"), read("center", "centro"), read("right", "direita")];
  if (!values.every((value): value is number => typeof value === "number" && Number.isInteger(value) && value >= 0)) return null;
  return { left: values[0], center: values[1], right: values[2] };
}

export function blindspotLabel(counts: Counts | null, premium: boolean): string | null {
  if (!premium || !counts || Object.values(counts).some((n) => !Number.isInteger(n) || n < 0) || Object.values(counts).every((n) => n === 0)) return null;
  const groups = [{ key: "left", label: "esquerda" }, { key: "center", label: "centro" }, { key: "right", label: "direita" }] as const;
  const missing = groups.filter(({ key }) => counts[key] === 0).map(({ label }) => label);
  return missing.length ? `Blindspot: ${new Intl.ListFormat("pt-BR", { type: "conjunction" }).format(missing)}` : "Blindspot: Cobertura equilibrada";
}

export function sortTopics(topics: Topic[], sort: TopicSort): Topic[] {
  const time = (topic: Topic) => Date.parse(topic.publishedAt ?? "") || 0;
  return [...topics].sort((a, b) => {
    const coverage = (b.articleCount ?? 0) - (a.articleCount ?? 0);
    const latest = time(b) - time(a);
    return (sort === "coverage" ? coverage || latest : latest || coverage) || a.id.localeCompare(b.id);
  });
}