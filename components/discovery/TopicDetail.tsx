"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, RefreshCw } from "lucide-react";
import { AppPremiumCTA } from "@/components/discovery/AppPremiumCTA";
import { sanitizePremiumDetail, sanitizePublicDetail, type Topic } from "@/lib/topics";

type ApiDetail = { topic?: unknown; access?: "preview" | "premium"; error?: string };

function dateLabel(value: string | null) {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(parsed);
}

const PERSPECTIVES = [
  { key: "left", label: "Esquerda", color: "left" },
  { key: "center", label: "Centro", color: "center" },
  { key: "right", label: "Direita", color: "right" },
] as const;

export function TopicDetail({ topicId, initialTopic = null }: { topicId: string; initialTopic?: Topic | null }) {
  const [topic, setTopic] = useState<Topic | null>(initialTopic);
  const [state, setState] = useState<"loading" | "ready" | "error">(initialTopic ? "ready" : "loading");
  const [premium, setPremium] = useState(false);

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

  if (state === "loading" && !topic) return <main className="discovery-detail-shell"><p className="discovery-state" role="status">Carregando a cobertura…</p></main>;
  if ((state === "error" && !topic) || !topic) return <main className="discovery-detail-shell"><div className="discovery-state discovery-state--error" role="alert"><p>Não foi possível abrir este tópico.</p><button className="discovery-button discovery-button--outline" onClick={() => void load()}><RefreshCw size={16} aria-hidden="true" /> Tentar novamente</button></div><Link className="discovery-text-link" href="/topicos"><ArrowLeft size={16} aria-hidden="true" /> Voltar aos tópicos</Link></main>;

  return (
    <main className="discovery-detail-shell">
      <Link className="discovery-text-link" href="/topicos"><ArrowLeft size={16} aria-hidden="true" /> Todos os tópicos</Link>
      <article className="topic-detail">
        <header className="topic-detail__header">
          {topic.imageUrl && <div className="topic-detail__image"><Image src={topic.imageUrl} alt={`Imagem relacionada a ${topic.title}`} width={1600} height={900} unoptimized /></div>}
          <p className="discovery-eyebrow">{topic.categories.join(" · ") || "Cobertura em perspectiva"}</p>
          <h1>{topic.title}</h1>
          {topic.summary && <p className="topic-detail__summary">{topic.summary}</p>}
          <div className="topic-detail__meta">{topic.publishedAt && <time>{dateLabel(topic.publishedAt)}</time>}{topic.articleCount !== null && <span>{topic.articleCount} matérias analisadas</span>}</div>
          <div className="topic-spectrum topic-spectrum--large" aria-label="Comparação entre perspectivas: esquerda, centro e direita">
            <span className="topic-spectrum__left"><i />Esquerda</span><span className="topic-spectrum__center"><i />Centro</span><span className="topic-spectrum__right"><i />Direita</span>
          </div>
        </header>

        <section className="topic-perspectives" aria-labelledby="perspectives-heading">
          <div className="topic-section-heading"><div><p className="discovery-eyebrow">O mesmo fato, outros enquadramentos</p><h2 id="perspectives-heading">Três perspectivas</h2></div></div>
          <div className="topic-perspectives__grid">
            {PERSPECTIVES.map(({ key, label, color }) => (
              <section className={`perspective-panel perspective-panel--${color}`} key={key} aria-labelledby={`perspective-${key}`}>
                <h3 id={`perspective-${key}`}><span aria-hidden="true" />{label}</h3>
                <p>{topic.perspectives[key] || "A síntese desta perspectiva não está disponível na prévia."}</p>
                <ul>
                  {(topic.articles[key] ?? []).map((article, index) => <li key={`${article.title}-${index}`}>
                    <strong>{article.title}</strong>
                    {article.source && <span>{article.source}</span>}
                    {article.summary && <p>{article.summary}</p>}
                    {article.url && <a href={article.url} target="_blank" rel="noreferrer">Ler na fonte<span className="sr-only"> (abre em nova aba)</span></a>}
                  </li>)}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {premium && <section className="topic-premium-content" aria-labelledby="premium-content-heading"><p className="discovery-eyebrow">Prisma Premium</p><h2 id="premium-content-heading">Análise completa</h2>{topic.fullSummary && <p>{topic.fullSummary}</p>}{topic.analysis && <p>{topic.analysis}</p>}{topic.blindspots && topic.blindspots.length > 0 && <><h3>Pontos que merecem atenção</h3><ul>{topic.blindspots.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></>}{topic.officialSource?.url && <p><a href={topic.officialSource.url} target="_blank" rel="noreferrer">{topic.officialSource.label || "Consultar fonte oficial"}<span className="sr-only"> (abre em nova aba)</span></a></p>}{topic.poll?.question && <div className="topic-poll"><h3>{topic.poll.question}</h3><ul>{topic.poll.options.map((option, index) => <li key={`${option}-${index}`}>{option}</li>)}</ul></div>}</section>}

        {!premium && <section className="topic-locked" aria-labelledby="locked-title"><LockKeyhole size={21} aria-hidden="true" /><div><h2 id="locked-title">Esta é uma prévia pública</h2><p>As análises completas e o histórico ampliado ficam no Prisma Premium. A assinatura é feita somente pelo aplicativo.</p><Link href={`/conta?returnTo=${encodeURIComponent(`/topicos/${topic.id}`)}`}>Entrar ou criar uma conta</Link></div><AppPremiumCTA compact /></section>}
        {premium && <p className="topic-detail__premium-note">Você está vendo o conteúdo Premium disponível para sua conta.</p>}
      </article>
    </main>
  );
}