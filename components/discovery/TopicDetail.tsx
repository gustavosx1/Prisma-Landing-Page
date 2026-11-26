"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Check, ChevronDown, ChevronUp, CircleHelp, Copy, LockKeyhole, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppPremiumCTA } from "@/components/discovery/AppPremiumCTA";
import { sanitizePremiumDetail, sanitizePublicDetail, type Topic, type TopicArticle } from "@/lib/topics";
import { readTopicFeedSnapshot } from "@/lib/topicFeedState";
import { TopicsLoading } from "@/components/discovery/TopicsLoading";
import { NewsImage } from "./NewsImage";
import { SpectrumRuler } from "./SpectrumRuler";
import { topicCopyText } from "@/lib/topicCopy";
import { blindspotLabel, completeCoverageCounts } from "@/lib/topicPresentation";

type ApiDetail = { topic?: unknown; access?: "preview" | "premium"; error?: string };

function dateLabel(value: string | null) {
  if (!value) return "Data de publicação indisponível";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Data de publicação indisponível" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(parsed);
}

type DetailPerspective = "left" | "center" | "right";

const PERSPECTIVES: { key: DetailPerspective; label: string; color: string }[] = [
  { key: "left", label: "Esquerda", color: "left" },
  { key: "center", label: "Centro", color: "center" },
  { key: "right", label: "Direita", color: "right" },
];

function articlesForPerspective(topic: Topic, perspective: DetailPerspective) {
  const groupedArticles = [
    ...(topic.articles.left ?? []).map((article) => ({ article, fallback: "left" as const })),
    ...(topic.articles.center_left ?? []).map((article) => ({ article, fallback: "center" as const })),
    ...(topic.articles.center ?? []).map((article) => ({ article, fallback: "center" as const })),
    ...(topic.articles.center_right ?? []).map((article) => ({ article, fallback: "center" as const })),
    ...(topic.articles.right ?? []).map((article) => ({ article, fallback: "right" as const })),
  ];
  const seen = new Set<string>();

  return groupedArticles.flatMap(({ article, fallback }) => {
    const scorePerspective = typeof article.perspectiveScore === "number"
      ? article.perspectiveScore < 40 ? "left" : article.perspectiveScore > 60 ? "right" : "center"
      : fallback;
    if (scorePerspective !== perspective || seen.has(article.id)) return [];
    seen.add(article.id);
    return [article];
  });
}

function articleLead(value: string) {
  const characters = Array.from(value.trim());
  return characters.length > 120 ? `${characters.slice(0, 119).join("").trimEnd()}…` : value;
}

function ArticleRow({ article, premium }: { article: TopicArticle; premium: boolean }) {
  const initials = article.source.trim().slice(0, 1).toLocaleUpperCase("pt-BR") || "P";
  return (
    <article className="topic-article">
      <div className="topic-article__outlet" aria-hidden="true">
        {article.outletLogo ? <Image src={article.outletLogo} alt="" width={42} height={42} unoptimized /> : <span>{initials}</span>}
      </div>
      <div className="topic-article__content">
        <div className="topic-article__meta">
          <span>{article.source || "Veículo não informado"}</span>
          <time>{dateLabel(article.publishedAt)}</time>
        </div>
        <h3>{article.title}</h3>
        <p>{article.summary ? articleLead(article.summary) : "Resumo não informado pelo veículo."}</p>
        <div className="topic-article__byline">
          <span>{article.author || "Autoria não informada"}</span>
          {premium && typeof article.checked === "boolean" && <span className={`topic-article__checked${article.checked ? "" : " topic-article__checked--pending"}`} title="Status editorial de conferência; não é um veredito sobre a veracidade da matéria.">{article.checked ? <BadgeCheck size={14} aria-hidden="true" /> : <CircleHelp size={14} aria-hidden="true" />} {article.checked ? "Conferido editorialmente" : "Ainda não conferido"}</span>}
        </div>
        {article.url && <a className="topic-article__action" href={article.url} target="_blank" rel="noopener noreferrer">Ler cobertura completa <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>}
      </div>
    </article>
  );
}

export function TopicDetail({ topicId, initialTopic = null, initialPremium = false }: { topicId: string; initialTopic?: Topic | null; initialPremium?: boolean }) {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(initialTopic);
  const [state, setState] = useState<"loading" | "ready" | "error">(initialTopic ? "ready" : "loading");
  const [premium, setPremium] = useState(initialPremium);
  const [activePerspective, setActivePerspective] = useState<DetailPerspective>("center");
  const [coverageCounts, setCoverageCounts] = useState<Topic["perspectiveCounts"] | null>(initialTopic?.completePerspectiveCounts ?? null);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [copyBusy, setCopyBusy] = useState(false);
  const [copySucceeded, setCopySucceeded] = useState(false);
  const [manualCopy, setManualCopy] = useState("");
  const copying = useRef(false);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const response = await fetch(`/api/topics/${encodeURIComponent(topicId)}`, { cache: "no-store" });
      const payload = await response.json() as ApiDetail;
      if (!response.ok) throw new Error(payload.error ?? "detail request failed");
      const next = payload.access === "premium" ? sanitizePremiumDetail(payload.topic) : sanitizePublicDetail(payload.topic);
      if (!next) throw new Error("invalid topic");
      setTopic(next);
      setCoverageCounts(completeCoverageCounts(payload.topic));
      setPremium(payload.access === "premium");
      setState("ready");
    } catch {
      setState("error");
    }
  }, [topicId]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  if (state === "loading" && !topic) return <main className="discovery-detail-shell"><TopicsLoading variant="detail" /></main>;
  if ((state === "error" && !topic) || !topic) return <main className="discovery-detail-shell"><div className="discovery-state discovery-state--error" role="alert"><p>Não foi possível abrir este tópico.</p><button className="discovery-button discovery-button--outline" onClick={() => void load()}><RefreshCw size={16} aria-hidden="true" /> Tentar novamente</button></div><Link className="discovery-text-link" href="/topicos"><ArrowLeft size={16} aria-hidden="true" /> Voltar aos tópicos</Link></main>;

  const selectedArticles = articlesForPerspective(topic, activePerspective);
  const hasLockedArticles = !premium && (topic.lockedArticleCount ?? 0) > 0;
  const perspectiveLabel = PERSPECTIVES.find(({ key }) => key === activePerspective)?.label ?? "";
  const blindspot = blindspotLabel(coverageCounts, premium);
  async function copyTopic() {
    if (!topic || copying.current) return;
    const text = topicCopyText(topic.title, topic.summary);
    copying.current = true;
    setCopyBusy(true);
    setCopySucceeded(false);
    setShareMessage("");
    setManualCopy("");
    try {
      await navigator.clipboard.writeText(text);
      setCopySucceeded(true);
      setShareMessage("Título e resumo copiados. Cole onde quiser compartilhar.");
    } catch {
      setManualCopy(text);
      setShareMessage("Seu navegador não permitiu a cópia automática. Selecione e copie o texto abaixo.");
    } finally {
      copying.current = false;
      setCopyBusy(false);
    }
  }

  return (
    <main className="discovery-detail-shell">
      <article className={`topic-detail${hasLockedArticles ? " topic-detail--locked" : ""}`}>
        <header className="topic-detail__header">
          <div className="topic-detail__image">
            <NewsImage src={topic.imageUrl} fallback="/fallback-banner.png" alt={topic.imageUrl ? `Imagem relacionada a ${topic.title}` : ""} priority />
            <Link className="topic-detail__back" href="/topicos" aria-label="Voltar aos tópicos" onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              if (!readTopicFeedSnapshot(topicId)) return;
              event.preventDefault();
              router.back();
            }}><ArrowLeft size={20} aria-hidden="true" /></Link>
            <button className="topic-detail__share" type="button" aria-label={copyBusy ? "Copiando matéria" : "Copiar matéria"} title="Copiar título e resumo" disabled={copyBusy} onClick={() => void copyTopic()}>{copySucceeded ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}</button>
          </div>
          {shareMessage && <p className="topic-detail__share-message" role="status">{shareMessage}</p>}
          {manualCopy && <div className="topic-detail__manual-copy"><label htmlFor="topic-copy-text">Texto para compartilhar</label><textarea id="topic-copy-text" readOnly value={manualCopy} rows={7} onFocus={(event) => event.currentTarget.select()} /></div>}
          <p className="discovery-eyebrow">{topic.categories.join(" · ") || "Cobertura em perspectiva"}</p>
          <h1>{topic.title}</h1>
          {topic.summary && <><p className="topic-detail__summary" id="topic-summary">{summaryExpanded || topic.summary.length <= 320 ? topic.summary : `${topic.summary.slice(0, 319).trimEnd()}…`}</p>
            {topic.summary.length > 320 && <button className="topic-summary-toggle" type="button" aria-label={summaryExpanded ? "Recolher resumo" : "Ler resumo completo"} aria-expanded={summaryExpanded} aria-controls="topic-summary" onClick={() => setSummaryExpanded((value) => !value)}>{summaryExpanded ? "Ver menos" : "Ler resumo completo"}{summaryExpanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}</button>}</>}
          <div className="topic-detail__meta">
            {topic.publishedAt && <time>{dateLabel(topic.publishedAt)}</time>}
            {topic.publishedAt && topic.articleCount !== null && <span className="topic-detail__meta-separator" aria-hidden="true">•</span>}
            {topic.articleCount !== null && <span>{topic.articleCount} matérias analisadas</span>}
          </div>
        </header>

        <section className="topic-perspectives" aria-label="Coberturas por perspectiva">
          <h2 className="sr-only">Compare a cobertura</h2>
          {blindspot && <div className="topic-section-heading topic-comparison-row"><h2 className="topic-comparison-heading topic-blindspot-badge">{blindspot}</h2></div>}
          {coverageCounts && <SpectrumRuler counts={coverageCounts} showLabels={false} />}
          <div className="topic-perspective-tabs" role="tablist" aria-label="Filtrar veículos por perspectiva">
            {PERSPECTIVES.map(({ key, label }, index) => <button type="button" role="tab" key={key} id={`perspective-tab-${key}`} aria-controls="perspective-panel" aria-selected={activePerspective === key} tabIndex={activePerspective === key ? 0 : -1} onClick={() => setActivePerspective(key)} onKeyDown={(event) => {
              if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? PERSPECTIVES.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + PERSPECTIVES.length) % PERSPECTIVES.length;
              const nextKey = PERSPECTIVES[nextIndex].key;
              setActivePerspective(nextKey);
              document.getElementById(`perspective-tab-${nextKey}`)?.focus();
            }}>
              <span className={`topic-perspective-tabs__dot topic-perspective-tabs__dot--${key}`} aria-hidden="true" />{label}<span className="topic-perspective-tabs__count" aria-label={coverageCounts ? `${coverageCounts[key]} matérias no total` : `${articlesForPerspective(topic, key).length} matérias nesta resposta`}>{coverageCounts?.[key] ?? articlesForPerspective(topic, key).length}</span>
            </button>)}
          </div>
          <div className={`topic-perspective-panel topic-perspective-panel--${activePerspective.replace("_", "-")}${selectedArticles.length === 0 ? " topic-perspective-panel--empty" : ""}`} role="tabpanel" id="perspective-panel" aria-labelledby={`perspective-tab-${activePerspective}`}>
            {topic.perspectives[activePerspective] && <p className="topic-perspective-panel__summary">{topic.perspectives[activePerspective]}</p>}
            {selectedArticles.length > 0 ? <div className="topic-article-list">
              {selectedArticles.map((article) => <ArticleRow article={article} premium={premium} key={article.id} />)}
            </div> : <p className="topic-perspective-panel__empty">Não há matérias de veículos de {perspectiveLabel.toLocaleLowerCase("pt-BR")} sobre este evento...</p>}
          </div>
        </section>

        {hasLockedArticles && <aside className="topic-paywall-note"><LockKeyhole size={17} aria-hidden="true" /><p><strong>{topic.lockedArticleCount} matérias adicionais</strong> estão disponíveis no Prisma Premium. Esta prévia mostra até {topic.previewLimit ?? 2} matérias por perspectiva.</p></aside>}

        {!premium && <AppPremiumCTA variant="detail" />}
      </article>
    </main>
  );
}
