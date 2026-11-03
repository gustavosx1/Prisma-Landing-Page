import type { Metadata } from "next";
import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { TopicDetail } from "@/components/discovery/TopicDetail";
import { Footer } from "@/components/sections/Footer";
import { authorizedSession, checkPremium, privateHeaders, publicPreviewContains, topicsApiUrl } from "@/lib/server/topics-api";
import { sanitizePremiumDetail, sanitizePublicDetail, type Topic } from "@/lib/topics";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ topicId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId } = await params;
  const session = await authorizedSession().catch(() => null);
  const { topic } = await loadTopicForSession(topicId, session?.accessToken ?? null);
  const title = topic?.title ?? "Cobertura em perspectiva";
  const description = topic?.summary || "Compare diferentes perspectivas editoriais sobre este acontecimento.";
  return {
    title,
    description,
    alternates: { canonical: `/topicos/${encodeURIComponent(topicId)}` },
    openGraph: { title: `${title} | Prisma News`, description, images: topic?.imageUrl ? [topic.imageUrl] : undefined },
  };
}

async function loadTopicForSession(topicId: string, accessToken: string | null): Promise<{ topic: Topic | null; premium: boolean }> {
  if (!/^[\w-]{1,160}$/.test(topicId)) return { topic: null, premium: false };
  if (accessToken && await checkPremium(accessToken)) {
    try {
      const response = await fetch(topicsApiUrl(`feed/topics/${encodeURIComponent(topicId)}`), {
        headers: privateHeaders(accessToken),
        cache: "no-store",
      });
      if (!response.ok) return { topic: null, premium: true };
      return { topic: sanitizePremiumDetail(await response.json()), premium: true };
    } catch {
      return { topic: null, premium: true };
    }
  }
  try {
    if (!await publicPreviewContains(topicId)) return { topic: null, premium: false };
    const response = await fetch(topicsApiUrl(`feed/topicsfree/${encodeURIComponent(topicId)}`), { cache: "no-store" });
    return response.ok ? { topic: sanitizePublicDetail(await response.json()), premium: false } : { topic: null, premium: false };
  } catch {
    return { topic: null, premium: false };
  }
}

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params;
  const session = await authorizedSession().catch(() => null);
  if (!session) redirect(`/conta?returnTo=${encodeURIComponent(`/topicos/${topicId}`)}`);
  const { topic: initialTopic, premium: initialPremium } = await loadTopicForSession(topicId, session.accessToken);
  return <><DiscoveryHeader /><TopicDetail topicId={topicId} initialTopic={initialTopic} initialPremium={initialPremium} /><Footer /></>;
}