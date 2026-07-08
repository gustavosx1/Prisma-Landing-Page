import { NavBar }       from "@/components/sections/NavBar";
import { Hero }         from "@/components/sections/Hero";
import { Problem }      from "@/components/sections/Problem";
import { Solution }     from "@/components/sections/Solution";
import { Features }     from "@/components/sections/Features";
import { WhyItMatters } from "@/components/sections/WhyItMatters";
import { Trust }        from "@/components/sections/Trust";
import { Premium }      from "@/components/sections/Premium";
import { FAQ }          from "@/components/sections/FAQ";
import { FinalCTA }     from "@/components/sections/FinalCTA";
import { Footer }       from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>
      <NavBar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <WhyItMatters />
        <Trust />
        <Premium />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
