"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section
      className="py-20 lg:py-32 relative overflow-hidden bg-[#07011a]"
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#comecar"
              onClick={() =>
                trackEvent("hero_cta_click", { location: "final_cta" })
              }
              aria-label="Começar grátis — sem cartão de crédito"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-base transition-all duration-200 shadow-[0_0_50px_rgba(139,92,246,0.4)] hover:shadow-[0_0_70px_rgba(139,92,246,0.6)]"
            >
              Começar grátis agora
              <ArrowRight
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#assinar"
              onClick={() =>
                trackEvent("pricing_cta_click", {
                  plan: "Premium",
                  location: "final_cta",
                })
              }
              aria-label="Assinar plano Premium"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 text-white font-semibold rounded-2xl text-base transition-all duration-200"
            >
              Assinar Premium
            </a>
          </div>

          {/* Reassurance */}
          <p className="text-sm text-slate-500">
            Grátis para sempre no plano básico&nbsp;·&nbsp;Sem cartão de
            crédito&nbsp;·&nbsp;Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  );
}
