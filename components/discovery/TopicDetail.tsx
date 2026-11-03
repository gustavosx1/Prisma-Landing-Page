"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BadgeCheck, CircleHelp, LockKeyhole, RefreshCw } from "lucide-react";
import { AppPremiumCTA } from "@/components/discovery/AppPremiumCTA";
import { sanitizePremiumDetail, sanitizePublicDetail, type Topic, type TopicArticle } from "@/lib/topics";
import { TopicsLoading } from "@/components/discovery/TopicsLoading";

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
  if (perspective === "center") {
    return [...(topic.articles.center_left ?? []), ...(topic.articles.center ?? []), ...(topic.articles.center_right ?? [])];
  }
  return topic.articles[perspective] ?? [];
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
  const [topic, setTopic] = useState<Topic | null>(initialTopic);
  const [state, setState] = useState<"loading" | "ready" | "error">(initialTopic ? "ready" : "loading");
  const [premium, setPremium] = useState(initialPremium);
  const [activePerspective, setActivePerspective] = useState<DetailPerspective>("center");

  const load = useCallback(async () => {
    setState("loading");
    try {
      const response = await fetch(`/api/topics/${encodeURIComponent(topicId)}`, { cache: "no-store" });
      const payload = await response.json() as ApiDetail;
      if (!response.ok) throw new Error(payload.error ?? "detail request failed");
      const next = payload.access === "premium" ? sanitizePremiumDetail(payload.topic) : sanitizePublicDetail(payload.topic);
      if (!next) throw new Error("invalid topic");
      setTopic(next);
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
  const perspectiveLabel = PERSPECTIVES.find(({ key }) => key === activePerspective)?.label ?? "";

  return (
    <main className="discovery-detail-shell">
      <Link className="discovery-text-link" href="/topicos"><ArrowLeft size={16} aria-hidden="true" /> Todos os tópicos</Link>
      <article className="topic-detail">
        <header className="topic-detail__header">
          <div className="topic-detail__image">
            <Image src={topic.imageUrl || "/fallback.png"} alt={topic.imageUrl ? `Imagem relacionada a ${topic.title}` : "Identidade visual Prisma News"} width={1600} height={900} unoptimized />
          </div>
          <p className="discovery-eyebrow">{topic.categories.join(" · ") || "Cobertura em perspectiva"}</p>
          <h1>{topic.title}</h1>
          {topic.summary && <p className="topic-detail__summary">{topic.summary}</p>}
          <div className="topic-detail__meta">{topic.publishedAt && <time>{dateLabel(topic.publishedAt)}</time>}{topic.articleCount !== null && <span>{topic.articleCount} matérias analisadas</span>}</div>
        </header>

        <section className="topic-perspectives" aria-label="Coberturas por perspectiva">
          <div className="topic-section-heading"><div><p className="discovery-eyebrow">O mesmo fato, outros enquadramentos</p></div></div>
          <div className="topic-perspective-tabs" role="tablist" aria-label="Filtrar veículos por perspectiva">
            {PERSPECTIVES.map(({ key, label }, index) => <button type="button" role="tab" key={key} id={`perspective-tab-${key}`} aria-controls="perspective-panel" aria-selected={activePerspective === key} tabIndex={activePerspective === key ? 0 : -1} onClick={() => setActivePerspective(key)} onKeyDown={(event) => {
              if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? PERSPECTIVES.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + PERSPECTIVES.length) % PERSPECTIVES.length;
              const nextKey = PERSPECTIVES[nextIndex].key;
              setActivePerspective(nextKey);
              document.getElementById(`perspective-tab-${nextKey}`)?.focus();
            }}>
              <span className={`topic-perspective-tabs__dot topic-perspective-tabs__dot--${key}`} aria-hidden="true" />{label}<span className="topic-perspective-tabs__count">{articlesForPerspective(topic, key).length}</span>
            </button>)}
          </div>
          <div className={`topic-perspective-panel topic-perspective-panel--${activePerspective.replace("_", "-")}`} role="tabpanel" id="perspective-panel" aria-labelledby={`perspective-tab-${activePerspective}`}>
            {topic.perspectives[activePerspective] && <p className="topic-perspective-panel__summary">{topic.perspectives[activePerspective]}</p>}
            {selectedArticles.length > 0 ? <div className="topic-article-list">
              {selectedArticles.map((article) => <ArticleRow article={article} premium={premium} key={article.id} />)}
            </div> : <p className="topic-perspective-panel__empty">Nenhuma matéria de {perspectiveLabel.toLocaleLowerCase("pt-BR")} foi incluída na resposta deste tópico.</p>}
          </div>
        </section>

        {!premium && (topic.lockedArticleCount ?? 0) > 0 && <aside className="topic-paywall-note"><LockKeyhole size={17} aria-hidden="true" /><p><strong>{topic.lockedArticleCount} matérias adicionais</strong> estão disponíveis no Prisma Premium. Esta prévia mostra até {topic.previewLimit ?? 2} matérias por perspectiva.</p></aside>}

        {!premium && <AppPremiumCTA variant="detail" />}
      </article>
    </main>
  );
}
