import { TopicsLoading } from "@/components/discovery/TopicsLoading";
import { Footer } from "@/components/sections/Footer";

export default function Loading() {
  return (
    <>
      <main className="discovery-detail-shell">
        <TopicsLoading variant="detail" />
      </main>
      <Footer />
    </>
  );
}
