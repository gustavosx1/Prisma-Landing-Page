"use client";

import { motion } from "framer-motion";
import { StoreButtons } from "@/components/sections/StoreButtons";

export function FinalCTA() {
  return (
    <section
      className="final-cta-section py-20 lg:py-32 relative overflow-hidden bg-[#07011a]"
      aria-labelledby="final-cta-heading"
    >
      {/* Gradient atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07011a] via-purple-950/40 to-[#07011a]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-700/18 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-fuchsia-700/12 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
              Comece hoje. Grátis.
            </span>
          </div>

          {/* Headline */}
          <h2
            id="final-cta-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight"
          >
            Comece a ver o{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
              quadro completo
            </span>
            .
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Cada evento tem mais de um lado. Agora você pode ver todos eles —
            antes de formar a sua opinião.
          </p>

          {/* CTAs */}
          <StoreButtons location="final_cta" className="justify-center" />

          {/* Reassurance */}
          <p className="text-sm text-slate-500">
            Grátis para sempre no plano básico&nbsp;·&nbsp;Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
}
