"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

const OUTLETS = [
  "Jovem Pan",
  "Crusoé",
  "Revista Oeste",
  "O Antagonista",
  "Gazeta do Povo",
  "Poder360",
  "Veja",
  "O Globo",
  "Folha de S.Paulo",
  "CNN Brasil",
  "Metrópoles",
  "UOL Notícias",
  "G1 / Globo",
  "Terra",
  "Congresso em Foco",
  "Agência Brasil",
  "Pragmatismo Político",
  "Nexo Jornal",
  "Brasil de Fato",
  "Revista Fórum",
  "The Intercept Brasil",
  "Opera Mundi",
  "Brasil Paralelo",
];

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
    a: "As fontes utilizadas incluem os veículos abaixo. As categorias esquerda, centro e direita descrevem tendências editoriais aproximadas do veículo, não cada matéria individual.",
    outlets: OUTLETS,
  },
  {
    q: "O que exatamente é um 'blindspot'?",
    a: "O indicador de blindspot lista os grupos sem cobertura do evento — esquerda, centro e direita — usando as contagens completas de matérias vinculadas, não apenas uma prévia. Com ao menos uma matéria em cada grupo, mostra cobertura equilibrada: presença dos três grupos, não igualdade de volume. Dados ausentes ou sem cobertura classificada não geram indicador. Ele não permite inferir o motivo da ausência nem a veracidade de uma matéria.",
  },
  {
    q: "O Prisma News faz fact-checking automático?",
    a: "Não. A LLM ajuda a buscar fontes primárias oficiais que possam confirmar uma informação. Essa busca serve como referência para a apuração, mas não verifica automaticamente se uma afirmação é verdadeira nem substitui análise editorial.",
  },
  {
    q: "Qual a diferença entre o plano Grátis e o Premium?",
    a: "Sem uma assinatura, qualquer visitante pode consultar a prévia pública de até 3 tópicos, com perspectivas básicas. O Premium inclui acesso ampliado, análise aprofundada, detector de blindspots, contexto histórico, alertas e busca assistida em fontes primárias oficiais. A disponibilidade e o preço são informados pela App Store ou Google Play no aplicativo; este site não processa compras. A busca não é um fact-check automatizado nem garante a veracidade de informações.",
  },
  {
    q: "Posso cancelar o Premium quando quiser?",
    a: "Sim. Assinaturas são gerenciadas pela App Store ou Google Play, onde você pode consultar as opções de cancelamento e o período de acesso restante. O site não gerencia cobranças ou cancelamentos.",
  },
  {
    q: "O Prisma News funciona bem no celular?",
    a: "Sim. A plataforma foi projetada com mobile-first: interface otimizada para telas menores, carregamento rápido e navegação intuitiva em dispositivos móveis. Nenhum recurso é bloqueado ou limitado no celular.",
  },
  {
    q: "Existe um aplicativo para iOS e Android?",
    a: "Sim. O Prisma News está disponível para iPhone e Android. Use os botões de download no site para abrir a página oficial do aplicativo na App Store ou no Google Play.",
  },

  {
    q: "Meus dados pessoais estão seguros?",
    a: "Sim. Seguimos a LGPD rigorosamente. Não vendemos dados pessoais a terceiros, não compartilhamos preferências de leitura para fins publicitários e armazenamos apenas o mínimo necessário para o funcionamento do serviço. O detalhamento completo está na nossa Política de Privacidade.",
  },
];

function FAQItem({ q, a, outlets, index }: { q: string; a: string; outlets?: string[]; index: number }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => {
      if (!prev) trackEvent("faq_open", { question: q.slice(0, 60) });
      return !prev;
    });
  };

  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        onClick={toggle}
        className={styles.faqQuestion}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span>
          {q}
        </span>
        <span aria-hidden="true">
          {open ? (
            <Minus aria-hidden="true" />
          ) : (
            <Plus aria-hidden="true" />
          )}
        </span>
      </button>

      <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={!open}>
        <div className={styles.faqAnswer}>
          <p>{a}</p>
          {outlets && (
            <ul className={styles.faqOutlets} aria-label="Veículos utilizados como fontes">
              {outlets.map((outlet) => <li key={outlet}>{outlet}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      className={styles.section}
      aria-labelledby="faq-heading"
    >
      <div className={styles.container}>
        <div className={styles.faqLayout}>
          <EditorialHeading id="faq-heading" title="Perguntas frequentes" />
          <div>
            {FAQS.map((faq, index) => <FAQItem key={faq.q} {...faq} index={index} />)}
            <p className={styles.note}>Ainda tem dúvidas?<br />
              <a href="mailto:suporteprismanews@gmail.com" className={styles.textLink}>Entre em contato com a equipe</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
