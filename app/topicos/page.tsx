import type { Metadata } from "next";
import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { TopicsFeed } from "@/components/discovery/TopicsFeed";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Descubra tópicos e compare perspectivas",
  description: "Explore os principais assuntos do momento e compare como diferentes perspectivas cobrem cada acontecimento.",
  alternates: { canonical: "/topicos" },
  openGraph: { title: "Tópicos em perspectiva | Prisma News", description: "Um acontecimento, diferentes coberturas. Descubra e compare perspectivas." },
};

export default function TopicsPage() {
  return <><DiscoveryHeader /><TopicsFeed /><Footer /></>;
}