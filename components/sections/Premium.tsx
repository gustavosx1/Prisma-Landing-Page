"use client";

import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import { StoreButtons } from "@/components/sections/StoreButtons";

type PlanFeature = { text: string; included: boolean };

const PLANS: {
  name: string;
  price: string | null;
  period: string;
  description: string;
  highlight: boolean;
  badge?: string;
  features: PlanFeature[];
}[] = [
  {
    name: "Grátis",
    price: null,
    period: "para sempre",
    description: "Para começar a ver os dois lados.",
    highlight: false,
    features: [
      { text: "3 eventos por dia",                         included: true  },
      { text: "Perspectivas esquerda/centro/direita",      included: true  },
      { text: "Resumo básico por evento",                  included: true  },
      { text: "Histórico de 7 dias",                       included: true  },
      { text: "Detector de blindspots",                    included: false },
      { text: "Análise aprofundada",                       included: false },
      { text: "Busca assistida em fontes oficiais",       included: false },
      { text: "Alertas temáticos personalizados",          included: false },
      { text: "Export de análises (PDF/Markdown)",         included: false },
    ],
  },
  {
    name: "Premium",
    price: "9,90",
    period: "por mês",
    description: "Para quem quer o quadro completo, sempre.",
    highlight: true,
    badge: "Mais popular",
    features: [
      { text: "Eventos ilimitados",                        included: true },
      { text: "Perspectivas esquerda/centro/direita",      included: true },
      { text: "Resumo completo por evento",                included: true },
      { text: "Histórico completo",                        included: true },
      { text: "Detector de blindspots",                    included: true },
      { text: "Análise aprofundada",                       included: true },
      { text: "Busca assistida em fontes oficiais",       included: true },
      { text: "Alertas temáticos personalizados",          included: true },
      { text: "Export de análises (PDF/Markdown)",         included: true },
    ],
  },
];

const FRICTION = [
  "Cancele quando quiser, sem burocracia",
  "Cobrança transparente, sem surpresas",
  "Sem período de fidelidade",
  "Dados protegidos — nunca vendemos suas informações",
];

export function Premium() {
  return (
    <section
      id="precos"
      className="pricing-section py-20 lg:py-32 bg-[#080118] relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-fuchsia-900/[0.13] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Planos
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            Simples, transparente,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              sem surpresas.
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Comece grátis. Evolua quando precisar de mais profundidade.
          </p>
        </motion.div>

        <motion.aside
          className="promo-card mx-auto mb-12 max-w-4xl rounded-3xl border p-6 text-center sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          aria-label="Promoção de lançamento válida durante outubro de 2026"
        >
          <p className="promo-eyebrow mb-2 text-sm font-bold uppercase tracking-[0.16em]">
            Oferta de lançamento · outubro de 2026
          </p>
          <h3 className="mb-2 text-2xl font-extrabold sm:text-3xl">
            Primeiro mês por <span>R$ 2,90</span>
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed sm:text-base">
            Para novos usuários que assinarem durante outubro de 2026. A partir do segundo mês,
            o Premium renova por R$ 9,90/mês. Confira as condições exibidas na loja antes de assinar.
          </p>
        </motion.aside>

        {/* Plan cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.14 }}
              className={[
                "relative p-6 sm:p-8 rounded-3xl border transition-all duration-300",
                plan.highlight
                  ? "bg-gradient-to-b from-purple-950 to-[#0c0324] border-purple-500/40 shadow-[0_0_60px_rgba(139,92,246,0.2)]"
                  : "bg-[#0c0324]/50 border-purple-900/30",
              ].join(" ")}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    <Zap className="w-3 h-3" aria-hidden="true" fill="white" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-5">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price ? `R$ ${plan.price}` : "Grátis"}
                  </span>
                  <span className="text-slate-400 text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul
                className="space-y-3 mb-8"
                aria-label={`Funcionalidades do plano ${plan.name}`}
              >
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 text-sm">
                    {f.included ? (
                      <Check
                        className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"
                        aria-label="Incluído"
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5"
                        aria-label="Não incluído"
                      />
                    )}
                    <span className={f.included ? "text-slate-300" : "text-slate-600"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <StoreButtons location={`pricing_${plan.name.toLowerCase()}`} />
            </motion.div>
          ))}
        </div>

        {/* Friction reducers */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5 text-sm text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {FRICTION.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
