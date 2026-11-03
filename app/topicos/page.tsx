import type { Metadata } from "next";
import { TopicsFeed } from "@/components/discovery/TopicsFeed";
import { Footer } from "@/components/sections/Footer";
import { authorizedSession } from "@/lib/server/topics-api";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Descubra tópicos e compare perspectivas",
  description: "Explore os principais assuntos do momento e compare como diferentes perspectivas cobrem cada acontecimento.",
  alternates: { canonical: "/topicos" },
  openGraph: { title: "Tópicos em perspectiva | Prisma News", description: "Um acontecimento, diferentes coberturas. Descubra e compare perspectivas." },
};

export default async function TopicsPage() {
  const session = await authorizedSession().catch(() => null);
  if (!session) redirect("/conta?returnTo=%2Ftopicos");

  return <><TopicsFeed /><Footer /></>;
}