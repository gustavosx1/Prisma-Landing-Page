"use client";

import { motion } from "framer-motion";
import { ScanSearch, Columns2, Lightbulb } from "lucide-react";

const STEPS = [
  {
    num: "01",
    Icon: ScanSearch,
    title: "Evento detectado",
    description:
      "Nossa plataforma identifica automaticamente os eventos relevantes do dia, agrupando coberturas de mais de 200 veículos. Você vê o que aconteceu — não uma versão editada dele.",
    detail: "Atualizado em tempo real, curado por algoritmo + equipe editorial.",
  },
  {
    num: "02",
    Icon: Columns2,
    title: "Cobertura comparada por espectro",
    description:
      "Cada evento é apresentado com três perspectivas editoriais: esquerda, centro e direita. Você lê como cada segmento enquadra o mesmo fato — e enxerga as diferenças.",
    detail: "Classificação metodológica baseada em posicionamento editorial documentado.",
  },
  {
    num: "03",
    Icon: Lightbulb,
    title: "Blindspots e convergências revelados",
    description:
      "O que ninguém está falando? Onde todas as perspectivas concordam? Identificamos pontos cegos, lacunas de cobertura e os consensos escondidos nas divergências.",
    detail: "Ferramenta exclusiva para leitores Premium.",
  },
];

const FLOW = [
  "Evento real acontece",
  "200+ fontes capturadas",
  "Classificação editorial",
  "Blindspots detectados",
  "Você entende o quadro completo",
];

export function Solution() {
  return (
    <section
      id="como-funciona"
      className="py-20 lg:py-32 bg-[#080118] relative overflow-hidden"
      aria-labelledby="solution-heading"
    >
      {/* BG blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-800/[0.09] rounded-full blur-[100px]" />
        <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-fuchsia-900/[0.08] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Como funciona
          </p>
          <h2
            id="solution-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            Três passos para o{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              quadro completo
            </span>
          </h2>
          <p className="text-lg text-slate-400">Da detecção à compreensão, em segundos.</p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {STEPS.map(({ num, Icon, title, description, detail }, i) => (
            <motion.article
              key={num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.14 }}
            >
              {/* Icon + step number */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-700 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#080118] border-2 border-purple-500 text-purple-300 text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <p className="text-5xl font-extrabold text-purple-900/50 leading-none select-none">{num}</p>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-slate-400 leading-relaxed mb-4 text-[0.95rem]">{description}</p>
              <p className="text-xs text-purple-400 font-medium border-l-2 border-purple-600/60 pl-3">
                {detail}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Visual flow */}
        <motion.div
          className="mt-20 p-6 sm:p-8 rounded-3xl bg-purple-900/[0.09] border border-purple-800/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          aria-label={`Fluxo: ${FLOW.join(" → ")}`}
        >
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {FLOW.map((label, i) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <span className="text-sm font-semibold text-white px-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/30 whitespace-nowrap">
                  {label}
                </span>
                {i < FLOW.length - 1 && (
                  <span className="text-purple-500 text-lg" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
