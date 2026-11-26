export function topicCopyText(title: string, summary: string): string {
  return [title.trim(), summary.trim(), "via Prisma News\nhttps://www.prismanews.com.br/"].filter(Boolean).join("\n\n");
}