import { NavBar }       from "@/components/sections/NavBar";
import { Hero }         from "@/components/sections/Hero";
import { Problem }      from "@/components/sections/Problem";
import { Solution }     from "@/components/sections/Solution";
import { Features }     from "@/components/sections/Features";
import { TopicSearch }  from "@/components/sections/TopicSearch";
import { WhyItMatters } from "@/components/sections/WhyItMatters";
import { Premium }      from "@/components/sections/Premium";
import { FAQ }          from "@/components/sections/FAQ";
import { FinalCTA }     from "@/components/sections/FinalCTA";
import { Footer }       from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <TopicSearch />
        <WhyItMatters />
        <Premium />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
