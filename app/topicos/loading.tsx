import Image from "next/image";
import { TopicsLoading } from "@/components/discovery/TopicsLoading";
import { Footer } from "@/components/sections/Footer";

export default function Loading() {
  return (
    <>
      <main className="discovery-section topics-page" aria-label="Carregando o Prisma Feed">
        <div className="discovery-shell">
          <div className="topics-list-heading">
            <div>
              <p className="topics-list-heading__eyebrow">PRISMA</p>
              <h1><Image src="/logo.svg" alt="" width={42} height={42} /> Prisma - Feed</h1>
            </div>
          </div>
          <TopicsLoading />
        </div>
      </main>
      <Footer />
    </>
  );
}
