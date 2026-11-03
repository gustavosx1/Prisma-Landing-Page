import type { Metadata } from "next";
import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { TopicDetail } from "@/components/discovery/TopicDetail";
import { Footer } from "@/components/sections/Footer";
import { publicPreviewContains, topicsApiUrl } from "@/lib/server/topics-api";
import { sanitizePublicDetail } from "@/lib/topics";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ topicId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const topic = await loadPublicTopic(topicId);
  const title = topic?.title ?? "Cobertura em perspectiva";
  const description = topic?.summary || "Compare diferentes perspectivas editoriais sobre este acontecimento.";
  return {
    title,
    description,
    alternates: { canonical: `/topicos/${encodeURIComponent(topicId)}` },
    openGraph: { title: `${title} | Prisma News`, description, images: topic?.imageUrl ? [topic.imageUrl] : undefined },
  };
}

async function loadPublicTopic(topicId: string) {
  if (!/^[\w-]{1,160}$/.test(topicId)) return null;
  try {
    if (!await publicPreviewContains(topicId)) return null;
    const response = await fetch(topicsApiUrl(`feed/topicsfree/${encodeURIComponent(topicId)}`), { cache: "no-store" });
    if (!response.ok) return null;
    return sanitizePublicDetail(await response.json());
  } catch {
    return null;
  }
}

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params;
  const initialTopic = await loadPublicTopic(topicId);
  return <><DiscoveryHeader /><TopicDetail topicId={topicId} initialTopic={initialTopic} /><Footer /></>;
}