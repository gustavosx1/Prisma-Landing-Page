"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  Eye,
  TrendingUp,
} from "lucide-react";
import { trackEvent, initScrollDepth } from "@/lib/analytics";

const PERSPECTIVES = [
  {
    label: "Esquerda",
    activeBg: "bg-rose-600",
    textColor: "text-rose-400",
    text: '"Para especialistas progressistas, a reforma representa uma vitória das elites econômicas. A nova estrutura beneficia quem já concentra riqueza e penaliza quem mais precisa de proteção social."',
    source: "Fonte: Brasil de Fato, Le Monde Diplomatique BR",
  },
  {
    label: "Centro",
    activeBg: "bg-purple-600",
    textColor: "text-purple-400",
    text: '"A reforma moderniza o sistema tributário, mas especialistas divergem quanto à progressividade. O impacto real depende da regulamentação, ainda em disputa no Congresso."',
    source: "Fonte: Estadão, Valor Econômico, Reuters Brasil",
  },
  {
    label: "Direita",
    activeBg: "bg-sky-600",
    textColor: "text-sky-400",
    text: '"A aprovação sinaliza estabilidade fiscal e deve atrair investimentos. A simplificação do sistema beneficia empresas e pode gerar crescimento e empregos no médio prazo."',
    source: "Fonte: Veja, CNN Brasil, InfoMoney",
  },
];

const STATS = [
  { value: "500+", label: "Eventos por semana" },
  { value: "3×",   label: "Perspectivas por evento" },
  { value: "200+", label: "Fontes monitoradas" },
  { value: "100%", label: "Não-partidário" },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const cleanup = initScrollDepth();
    return cleanup;
  }, []);

  // Auto-cycle perspectives
  useEffect(() => {
    const id = setInterval(() => setActiveTab((p) => (p + 1) % 3), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#060111]">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/70 via-[#060111] to-fuchsia-950/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-700/12 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-fuchsia-700/8 rounded-full blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,1) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Copy ── */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
                Inteligência editorial
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Veja o evento inteiro,{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                não só um lado
              </span>{" "}
              da história.
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="text-lg text-slate-300 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Compare perspectivas editoriais em segundos e descubra o que a
              sua timeline escondia — com análise por espectro, detecção de
              blindspots e fontes verificadas.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#comecar"
                onClick={() => trackEvent("hero_cta_click", { location: "hero" })}
                aria-label="Começar grátis — sem cartão de crédito"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-base transition-all duration-200 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]"
              >
                Começar grátis
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#demo"
                onClick={() => trackEvent("demo_click", { location: "hero" })}
                aria-label="Ver demonstração do produto"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 text-white font-semibold rounded-2xl text-base transition-all duration-200"
              >
                <Play className="w-4 h-4 text-purple-400" aria-hidden="true" fill="currentColor" />
                Ver demonstração
              </a>
            </motion.div>

            {/* Microproof */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {["Comparação por espectro","Resumo por evento","Sem ruído ou clickbait"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Product mockup ── */}
          <motion.div
            className="relative"
            aria-label="Demonstração do produto Prisma News"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-3xl scale-95 pointer-events-none" aria-hidden="true" />

            {/* Card */}
            <div className="relative bg-[#0c0324]/80 backdrop-blur-xl border border-purple-800/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_80px_rgba(88,28,135,0.3)]">
              {/* Event header */}
              <div className="flex items-start gap-3 mb-5">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0 animate-pulse" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">
                    Evento em destaque
                  </p>
                  <h2 className="text-white font-bold text-base sm:text-lg leading-snug">
                    Reforma tributária aprovada pelo Congresso Nacional
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Hoje, 14h32 · 23 veículos cobriram</p>
                </div>
              </div>

              {/* Tabs */}
              <div
                className="flex gap-1 bg-white/[0.04] rounded-xl p-1 mb-4"
                role="tablist"
                aria-label="Perspectivas editoriais"
              >
                {PERSPECTIVES.map((p, i) => (
                  <button
                    key={p.label}
                    role="tab"
                    aria-selected={activeTab === i}
                    aria-controls={`perspective-panel-${i}`}
                    id={`perspective-tab-${i}`}
                    onClick={() => setActiveTab(i)}
                    className={[
                      "flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300",
                      activeTab === i
                        ? `${p.activeBg} text-white shadow-sm`
                        : "text-slate-400 hover:text-slate-300",
                    ].join(" ")}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Perspective content */}
              <div
                className="min-h-[108px] mb-4"
                role="tabpanel"
                id={`perspective-panel-${activeTab}`}
                aria-labelledby={`perspective-tab-${activeTab}`}
              >
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="text-slate-300 text-sm leading-relaxed mb-2">
                    {PERSPECTIVES[activeTab].text}
                  </p>
                  <p className={`text-xs font-medium ${PERSPECTIVES[activeTab].textColor}`}>
                    {PERSPECTIVES[activeTab].source}
                  </p>
                </motion.div>
              </div>

              {/* Footer strip */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-800/25">
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                  2 blindspots
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  7 fontes
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                  Alto impacto
                </span>
              </div>
            </div>

            {/* Badge */}
            <motion.span
              className="absolute -top-4 -right-3 bg-fuchsia-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.85, type: "spring", stiffness: 220 }}
              aria-label="Três perspectivas disponíveis"
            >
              3 perspectivas
            </motion.span>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          className="mt-16 lg:mt-20 pt-8 border-t border-purple-900/30 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
