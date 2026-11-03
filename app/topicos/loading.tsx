import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { TopicsLoading } from "@/components/discovery/TopicsLoading";
import { Footer } from "@/components/sections/Footer";

export default function Loading() {
  return (
    <>
      <DiscoveryHeader />
      <main className="discovery-section topics-page" aria-label="Carregando o Prisma Feed">
        <div className="discovery-shell">
          <div className="topics-list-heading">
            <div>
              <p className="topics-list-heading__eyebrow">PRISMA</p>
              <h1>Prisma - Feed</h1>
            </div>
          </div>
          <TopicsLoading />
        </div>
      </main>
      <Footer />
    </>
  );
}
