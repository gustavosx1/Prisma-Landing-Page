"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const OUTCOMES = [
  {
    emoji: "🧠",
    title: "Decisões melhores",
    desc: "Com mais perspectivas, suas conclusões são mais robustas e menos vulneráveis à manipulação.",
  },
  {
    emoji: "🛡️",
    title: "Menos manipulação",
    desc: "Reconheça enquadramentos tendenciosos antes de internalizar narrativas criadas para te influenciar.",
  },
  {
    emoji: "🗳️",
    title: "Cidadania fortalecida",
    desc: "Democracias funcionam melhor quando cidadãos entendem os fatos — não só os favoritos do algoritmo.",
  },
];

const COMPARISON = [
  { aspect: "Organização",           traditional: "Por manchete isolada",              prisma: "Por evento completo" },
  { aspect: "Perspectivas",          traditional: "1 (a que o algoritmo escolheu)",    prisma: "3+ espectros editoriais" },
  { aspect: "Detecção de viés",      traditional: "Invisível",                         prisma: "Explícita e documentada" },
  { aspect: "Blindspots",            traditional: "Você não sabe o que não sabe",       prisma: "Identificados e destacados" },
  { aspect: "Contexto histórico",    traditional: "Fragmentado ou ausente",            prisma: "Integrado ao evento" },
  { aspect: "Credibilidade da fonte",traditional: "Opaca",                             prisma: "Transparente com indicadores" },
];

export function WhyItMatters() {
  return (
    <section
      id="por-que-importa"
      className="py-20 lg:py-32 bg-[#08011a] relative overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/[0.13] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Por que importa
          </p>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            Informação sem contexto é{" "}
            <span className="text-rose-400">desinformação</span> de outro jeito.
          </h2>
          <p className="text-lg text-slate-400">
            Decisões melhores, menos manipulação e entendimento cívico mais robusto — isso é o que acontece quando você vê o evento inteiro.
          </p>
        </motion.div>

        {/* Outcome cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {OUTCOMES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-purple-900/[0.09] border border-purple-800/20"
            >
              <span className="text-4xl mb-4 block" role="img" aria-label={item.title}>
                {item.emoji}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-purple-800/30"
        >
          <table className="w-full" aria-label="Comparação: Feed tradicional vs Prisma News">
            <thead>
              <tr className="bg-[#0c0324]">
                <th scope="col" className="text-left px-6 py-5 text-slate-400 font-semibold text-sm">
                  Critério
                </th>
                <th scope="col" className="px-6 py-5 text-center text-slate-400 font-semibold text-sm">
                  Feed tradicional
                </th>
                <th scope="col" className="px-6 py-5 text-center bg-purple-900/20 text-purple-300 font-bold text-sm">
                  Prisma News ✦
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.aspect}
                  className={`border-t border-purple-900/20 ${i % 2 === 0 ? "bg-[#0a0120]" : "bg-[#060111]"}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-300">{row.aspect}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0" aria-hidden="true" />
                      {row.traditional}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center bg-purple-900/[0.08]">
                    <span className="inline-flex items-center gap-2 text-sm text-emerald-300 font-medium">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                      {row.prisma}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
