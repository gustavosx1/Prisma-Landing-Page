"use client";

import { motion } from "framer-motion";
import { LayoutGrid, SlidersHorizontal, EyeOff, Shield, Star, Bell } from "lucide-react";

const FEATURES = [
  {
    Icon: LayoutGrid,
    title: "Feed por evento",
    description:
      "Esqueça o feed de manchetes infinito. No Prisma, você navega por eventos — cada acontecimento agrupado com toda a sua cobertura em um único lugar.",
    gradient: "from-purple-600 to-violet-700",
    glow: "shadow-[0_0_28px_rgba(109,28,217,0.3)]",
    premium: false,
  },
  {
    Icon: SlidersHorizontal,
    title: "Perspectivas comparadas",
    description:
      "Leia o que a esquerda, o centro e a direita dizem sobre o mesmo fato. Veja o que muda, o que converge — e forme a sua própria opinião com base em evidências.",
    gradient: "from-violet-600 to-fuchsia-700",
    glow: "shadow-[0_0_28px_rgba(139,92,246,0.3)]",
    premium: false,
  },
  {
    Icon: EyeOff,
    title: "Detector de blindspots",
    description:
      "Identifique o que nenhuma perspectiva está cobrindo. Os blindspots revelam lacunas e vieses sistemáticos — o que cada espectro editorial evita dizer.",
    gradient: "from-fuchsia-600 to-pink-700",
    glow: "shadow-[0_0_28px_rgba(217,70,239,0.3)]",
    premium: true,
  },
  {
    Icon: Shield,
    title: "Credibilidade de fontes",
    description:
      "Saiba quem está falando. Cada veículo vem com métricas de transparência editorial, histórico de correções e posicionamento documentado.",
    gradient: "from-sky-600 to-blue-700",
    glow: "shadow-[0_0_28px_rgba(14,165,233,0.2)]",
    premium: false,
  },
  {
    Icon: Star,
    title: "Análise e fact-check",
    description:
      "Acesso a análises aprofundadas, verificação de afirmações-chave e contexto histórico completo para cada evento. Mais do que manchetes: compreensão real.",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-[0_0_28px_rgba(245,158,11,0.2)]",
    premium: true,
  },
  {
    Icon: Bell,
    title: "Alertas temáticos",
    description:
      "Configure temas de interesse e receba notificações quando um evento relevante surgir — com cobertura completa já organizada para explorar.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-[0_0_28px_rgba(52,211,153,0.2)]",
    premium: true,
  },
];

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  return (
    <section
      id="recursos"
      className="py-20 lg:py-32 bg-[#060111]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Recursos
          </p>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
          >
            Ferramentas para quem quer{" "}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              entender de verdade
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Cada funcionalidade foi criada para dar autonomia intelectual — não dependência editorial.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FEATURES.map(({ Icon, title, description, gradient, glow, premium }) => (
            <motion.article
              key={title}
              variants={itemVariants}
              className="relative p-6 lg:p-7 rounded-2xl bg-[#0c0324]/60 border border-purple-900/30 hover:border-purple-700/50 hover:-translate-y-1 transition-all duration-300"
            >
              {premium && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2 py-0.5 rounded-full">
                  Premium
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 ${glow}`}>
                <Icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
