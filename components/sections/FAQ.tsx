"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const FAQS = [
  {
    q: "Como o Prisma News classifica as perspectivas editoriais?",
    a: "A classificação é baseada em análise metodológica do posicionamento histórico dos veículos — não em percepção ou preferência pessoal. Utilizamos uma combinação de análise de conteúdo acadêmica e revisão editorial humana, atualizada periodicamente para refletir mudanças de posicionamento.",
  },
  {
    q: "O Prisma News tem viés editorial próprio?",
    a: "Não. Nossa missão é expor perspectivas, não criar uma. Somos não-partidários por princípio e por estrutura: não aceitamos financiamento político ou de grupos de interesse. A equipe editorial é instruída a manter neutralidade operacional em todas as decisões de classificação.",
  },
  {
    q: "Quais fontes são utilizadas?",
    a: "Monitoramos mais de 200 veículos jornalísticos brasileiros e internacionais com cobertura relevante para o Brasil. Incluímos veículos de diferentes espectros, tamanhos e formatos — de portais independentes a grandes grupos de comunicação. A lista completa é pública e auditável.",
  },
  {
    q: "O que exatamente é um 'blindspot'?",
    a: "Blindspots são aspectos relevantes de um evento que nenhuma das perspectivas monitoradas está cobrindo — ou que apenas uma menciona enquanto as outras ignoram. Identificar blindspots é fundamental para perceber lacunas sistêmicas de cobertura antes de formar uma opinião.",
  },
  {
    q: "Qual a diferença entre o plano Grátis e o Premium?",
    a: "No plano Grátis, você tem acesso a até 3 eventos por dia com perspectivas básicas. No Premium, o acesso é ilimitado e inclui: análise aprofundada, detector de blindspots, fact-check, contexto histórico, histórico completo de eventos, alertas temáticos personalizados e export de análises.",
  },
  {
    q: "Posso cancelar o Premium quando quiser?",
    a: "Sim, sem burocracia. O cancelamento pode ser feito a qualquer momento direto pelo painel da sua conta. Você continua com acesso até o fim do período já pago. Sem multas, sem tentativas de retenção agressiva.",
  },
  {
    q: "O Prisma News funciona bem no celular?",
    a: "Sim. A plataforma foi projetada com mobile-first: interface otimizada para telas menores, carregamento rápido e navegação intuitiva em dispositivos móveis. Nenhum recurso é bloqueado ou limitado no celular.",
  },
  {
    q: "Existe um aplicativo para iOS e Android?",
    a: "O app está em desenvolvimento e será lançado em breve. Por enquanto, a versão web mobile oferece a experiência completa, incluindo suporte a PWA (você pode adicionar o Prisma News à tela inicial do seu celular).",
  },
  {
    q: "Com que frequência os eventos são atualizados?",
    a: "A cobertura é monitorada em tempo real durante o horário de funcionamento editorial (6h às 23h). Novos artigos e perspectivas são adicionados continuamente. Eventos de alto impacto recebem atualizações mais frequentes.",
  },
  {
    q: "Meus dados pessoais estão seguros?",
    a: "Sim. Seguimos a LGPD rigorosamente. Não vendemos dados pessoais a terceiros, não compartilhamos preferências de leitura para fins publicitários e armazenamos apenas o mínimo necessário para o funcionamento do serviço. O detalhamento completo está na nossa Política de Privacidade.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => {
      if (!prev) trackEvent("faq_open", { question: q.slice(0, 60) });
      return !prev;
    });
  };

  return (
    <div className="border-b border-purple-900/30 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors leading-snug">
          {q}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-700/30 flex items-center justify-center mt-0.5">
          {open ? (
            <Minus className="w-4 h-4 text-purple-400" aria-hidden="true" />
          ) : (
            <Plus className="w-4 h-4 text-purple-400" aria-hidden="true" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 leading-relaxed text-[0.95rem]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 lg:py-32 bg-[#060111]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight"
          >
            Perguntas frequentes
          </h2>
          <p className="text-slate-400">Tudo o que você precisa saber antes de começar.</p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="bg-[#0c0324]/60 rounded-3xl border border-purple-900/30 px-6 sm:px-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </motion.div>

        {/* Contact nudge */}
        <motion.p
          className="mt-10 text-center text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ainda tem dúvidas?{" "}
          <a
            href="mailto:contato@prismanews.com.br"
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium underline underline-offset-2"
          >
            Entre em contato com a equipe
          </a>
        </motion.p>
      </div>
    </section>
  );
}
