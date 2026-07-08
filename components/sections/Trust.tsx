"use client";

import { motion } from "framer-motion";
import { Quote, BookOpen } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Pela primeira vez sinto que estou lendo a notícia em si — não a versão que o algoritmo escolheu para mim. O Prisma mudou como eu processo informação.",
    name: "Fernanda Costa",
    role: "Professora universitária, São Paulo",
    initial: "F",
    color: "bg-purple-600",
  },
  {
    quote:
      "O detector de blindspots é assustadoramente eficiente. Você percebe o que estava faltando nas suas leituras e nunca mais consegue ignorar isso.",
    name: "Rafael Mendonça",
    role: "Advogado e pesquisador, Brasília",
    initial: "R",
    color: "bg-fuchsia-600",
  },
  {
    quote:
      "Recomendo para todos os meus alunos de jornalismo. É a ferramenta de media literacy que faltava — prática, honesta e sem agenda.",
    name: "Dra. Sílvia Barros",
    role: "Pesquisadora em comunicação, UFRJ",
    initial: "S",
    color: "bg-violet-600",
  },
];

const LOGOS = [
  "Folha de S.Paulo",
  "Estadão",
  "Piauí",
  "The Intercept Brasil",
  "Nexo Jornal",
  "Agência Pública",
];

const METHODOLOGY = [
  {
    label: "Esquerda",
    desc: "Ênfase em justiça social, critica poderes econômicos e concentração de renda.",
  },
  {
    label: "Centro",
    desc: "Foco em pluralidade, evita posicionamento ideológico explícito.",
  },
  {
    label: "Direita",
    desc: "Ênfase em livre mercado, instituições e estabilidade fiscal.",
  },
];

const TRUST_ANCHORS = [
  { value: "100%", label: "Não-partidário",     sub: "Sem financiamento político" },
  { value: "200+", label: "Fontes monitoradas", sub: "Diversidade garantida" },
  { value: "Aberta", label: "Metodologia",      sub: "Documentada e auditável" },
];

export function Trust() {
  return (
    <section
      id="confianca"
      className="py-20 lg:py-32 bg-[#060111]"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Confiança
          </p>
          <h2
            id="trust-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight"
          >
            Construído para quem leva informação a sério.
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-[#0c0324]/60 border border-purple-800/25"
            >
              <Quote className="w-8 h-8 text-purple-800 mb-4" aria-hidden="true" />
              <p className="text-slate-300 leading-relaxed text-[0.95rem] mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  aria-hidden="true"
                >
                  {t.initial}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-white text-sm block">{t.name}</cite>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Logos */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Monitoramos veículos reconhecidos como
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {LOGOS.map((logo) => (
              <span
                key={logo}
                className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-sm font-medium"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Methodology explainer */}
        <motion.div
          className="p-6 sm:p-8 rounded-3xl bg-purple-900/[0.09] border border-purple-800/25"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-purple-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">
                Como classificamos as perspectivas?
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                A classificação editorial do Prisma News é baseada em análise documentada do posicionamento histórico dos veículos — não em percepção ou intuição. Usamos metodologia acadêmica de análise de mídia, complementada por revisão editorial humana e atualizada periodicamente.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {METHODOLOGY.map((m) => (
                  <div key={m.label} className="p-4 rounded-xl bg-purple-900/20 border border-purple-800/20">
                    <p className="text-sm font-bold text-white mb-1">{m.label}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust anchors */}
        <motion.div
          className="mt-12 grid sm:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {TRUST_ANCHORS.map((a) => (
            <div key={a.label} className="p-4">
              <p className="text-2xl font-extrabold text-purple-400 mb-1">{a.value}</p>
              <p className="text-sm font-bold text-white">{a.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{a.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
