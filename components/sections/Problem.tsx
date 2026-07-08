"use client";

import { motion } from "framer-motion";
import { Filter, AlertCircle, Users } from "lucide-react";

const PAINS = [
  {
    Icon: Filter,
    title: "Bolhas algorítmicas",
    description:
      "As plataformas mostram só o que confirma o que você já pensa. O algoritmo prioriza engajamento — e engajamento é polarização.",
    accent: "text-rose-400",
    bg: "bg-rose-500/[0.08]",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/10",
  },
  {
    Icon: AlertCircle,
    title: "Manchetes sem contexto",
    description:
      "Títulos criados para cliques, não para informar. Você lê a manchete, acha que entendeu — e perdeu toda a nuance que importa.",
    accent: "text-amber-400",
    bg: "bg-amber-500/[0.07]",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
  },
  {
    Icon: Users,
    title: "Polarização crescente",
    description:
      "Quando cada grupo vê apenas a sua versão da realidade, o debate público se torna impossível. A desconfiança virou padrão.",
    accent: "text-fuchsia-400",
    bg: "bg-fuchsia-500/[0.07]",
    border: "border-fuchsia-500/20",
    iconBg: "bg-fuchsia-500/10",
  },
];

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function Problem() {
  return (
    <section
      id="problema"
      className="py-20 lg:py-32 bg-[#060111] relative overflow-hidden"
      aria-labelledby="problem-heading"
    >
      {/* top glow separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/35 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            O problema
          </p>
          <h2
            id="problem-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            Você está vendo{" "}
            <span className="text-rose-400">fragmentos</span> e acreditando que
            é o{" "}
            <span className="text-rose-400">quadro completo</span>.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            O feed de notícias moderno não foi feito para te informar. Foi feito
            para te manter engajado — o que é muito diferente.
          </p>
        </motion.div>

        {/* Pain cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PAINS.map(({ Icon, title, description, accent, bg, border, iconBg }) => (
            <motion.article
              key={title}
              variants={itemVariants}
              className={`p-6 lg:p-8 rounded-2xl ${bg} border ${border} hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${iconBg} border ${border} flex items-center justify-center mb-5`}>
                <Icon className={`w-6 h-6 ${accent}`} aria-hidden="true" />
              </div>
              <h3 className={`text-xl font-bold ${accent} mb-3`}>{title}</h3>
              <p className="text-slate-300 leading-relaxed text-[0.95rem]">{description}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* Bridge sentence */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-semibold text-white">
            Existe uma forma melhor de entender o que acontece no mundo.
          </p>
          <p className="text-slate-400 mt-2">
            E ela começa com ver o mesmo evento de múltiplos ângulos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
