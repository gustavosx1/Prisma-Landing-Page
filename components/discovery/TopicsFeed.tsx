"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowRight, Eye, Layers3, LockKeyhole, RefreshCw, Search, Sparkles } from "lucide-react";
import { sanitizePremiumFeed, sanitizePublicFeed, type Topic } from "@/lib/topics";
import { AppPremiumCTA } from "@/components/discovery/AppPremiumCTA";

type FeedState = "loading" | "ready" | "empty" | "error";

function dateLabel(value: string | null) {
  if (!value) return "Atualizado recentemente";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Atualizado recentemente" : new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(parsed);
}

export function TopicsFeed() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [state, setState] = useState<FeedState>("loading");
  const [premium, setPremium] = useState(false);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const load = useCallback(async (nextOffset = 0, search = "") => {
    setState("loading");
    try {
      const params = new URLSearchParams({ limit: search ? "30" : "50", offset: String(nextOffset) });
      if (search) params.set("q", search);
      const response = await fetch(`/api/topics?${params.toString()}`, { cache: "no-store" });
      const payload: unknown = await response.json();
      if (!response.ok) throw new Error("feed request failed");
      const envelope = payload as { topics?: unknown; access?: string };
      const isPremium = envelope.access === "premium";
      const incoming = isPremium ? sanitizePremiumFeed(envelope.topics ?? payload) : sanitizePublicFeed(envelope.topics ?? payload);
      setPremium(isPremium);
      setTopics((current) => nextOffset === 0 ? incoming : [...current, ...incoming]);
      setOffset(nextOffset + incoming.length);
      setHasMore(isPremium && incoming.length >= (search ? 30 : 50));
      setState(incoming.length || nextOffset > 0 ? "ready" : "empty");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value && value.length < 2) return;
    setActiveQuery(value);
    void load(0, value);
  }

  return (
    <section className="discovery-section topics-page" id="topicos" aria-labelledby="topics-title">
      <div className="discovery-shell">
        <div className="topics-hero">
          <div className="topics-hero__copy">
            <p className="topics-kicker"><span aria-hidden="true" /> PRISMA NEWS <b>/</b> EXPLORAR
            </p>
            <h1 id="topics-title">Entenda o assunto <span>por todos os ângulos.</span></h1>
            <p className="discovery-lede">Um acontecimento, diferentes coberturas. Compare o que cada perspectiva destaca — e descubra o contexto que uma manchete sozinha não mostra.</p>
            <div className="topics-principles" aria-label="Como funciona a leitura Prisma">
              <span><Eye size={16} aria-hidden="true" /> Perspectivas em contexto</span>
              <span><Layers3 size={16} aria-hidden="true" /> Coberturas lado a lado</span>
            </div>
          </div>
          <aside className="topics-hero__visual" aria-label="Uma notícia pode ser observada por diferentes perspectivas">
            <div className="topics-prism" aria-hidden="true"><i /><i /><i /></div>
            <div className="topics-hero__visual-label"><Sparkles size={15} aria-hidden="true" /> LEITURA EM CONTEXTO</div>
            <div className="topics-hero__spectrum" aria-hidden="true"><span /><span /><span /></div>
            <p>Uma história.<br /><strong>Mais contexto para entender.</strong></p>
            <span className="topics-hero__caption">Perspectivas diferentes, no mesmo lugar.</span>
          </aside>
        </div>

        <div className="topics-search-panel">
          <div className="topics-search-panel__heading">
            <div>
              <span>Explore por tema</span>
              <p>Encontre uma cobertura específica</p>
            </div>
            <span className="topics-premium-badge"><LockKeyhole size={13} aria-hidden="true" /> PREMIUM</span>
          </div>
          <form className="discovery-search" onSubmit={submitSearch} role="search">
            <label htmlFor="topic-search" className="sr-only">Buscar tópicos Premium</label>
            <Search size={19} aria-hidden="true" />
            <input id="topic-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={premium ? "Buscar por assunto, país ou tema" : "Busca avançada disponível no Premium"} disabled={!premium} minLength={2} maxLength={120} />
            <button type="submit" disabled={!premium || query.trim().length < 2}>Buscar <ArrowRight size={16} aria-hidden="true" /></button>
          </form>
        </div>

        <div className="topics-list-heading">
          <div>
            <p className="topics-list-heading__eyebrow">AGORA EM DESTAQUE</p>
            <h2>Assuntos para acompanhar</h2>
          </div>
          <span>Atualizado com frequência</span>
        </div>

        {state === "loading" && topics.length === 0 && <div className="discovery-state" role="status" aria-live="polite">Carregando os tópicos mais recentes…</div>}
        {state === "error" && <div className="discovery-state discovery-state--error" role="alert"><p>Não foi possível carregar os tópicos agora.</p><button className="discovery-button discovery-button--outline" onClick={() => void load(0, activeQuery)}><RefreshCw size={16} aria-hidden="true" /> Tentar novamente</button></div>}
        {state === "empty" && <div className="discovery-state">Ainda não há tópicos publicados. Volte em breve.</div>}

        {topics.length > 0 && <Link className="featured-topic" href={`/topicos/${encodeURIComponent(topics[0].id)}`} aria-label={`Ver tópico em destaque: ${topics[0].title}`}>
          {topics[0].imageUrl && <Image className="featured-topic__image" src={topics[0].imageUrl} alt="" fill sizes="(max-width: 760px) 100vw, 1180px" unoptimized />}
          <span className="featured-topic__veil" aria-hidden="true" />
          <span className="featured-topic__content">
            <span className="featured-topic__tag"><Sparkles size={14} aria-hidden="true" /> Novo tópico em destaque</span>
            <span className="featured-topic__date">{dateLabel(topics[0].publishedAt)}{topics[0].categories[0] ? ` · ${topics[0].categories[0]}` : ""}</span>
            <strong>{topics[0].title}</strong>
            <span className="featured-topic__summary">{topics[0].summary || "Leia e compare as principais perspectivas sobre este assunto."}</span>
            <span className="featured-topic__action">Explorar cobertura <ArrowRight size={17} aria-hidden="true" /></span>
          </span>
          <span className="featured-topic__spectrum" aria-label="Perspectivas: esquerda, centro e direita"><i className="left" /><i className="center" /><i className="right" /></span>
        </Link>}

        {topics.length > 1 && (
          <div className="discovery-grid" aria-live="polite">
            {topics.slice(1).map((topic, index) => (
              <article className={`topic-card topic-card--${index % 3}`} key={topic.id}>
                <Link className="topic-card__link" href={`/topicos/${encodeURIComponent(topic.id)}`} aria-label={`Abrir tópico: ${topic.title}`}>
                  <div className="topic-card__visual" style={topic.imageUrl ? { backgroundImage: `linear-gradient(180deg, transparent 38%, rgba(17,24,39,.7)), url("${topic.imageUrl.replaceAll('"', '')}")` } : undefined}>
                    {topic.imageUrl && <Image className="topic-card__photo" src={topic.imageUrl} alt="" width={900} height={600} unoptimized />}
                    {!topic.imageUrl && <span className="topic-card__visual-mark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
                    <span className="topic-card__visual-label">Em perspectiva</span>
                  </div>
                  <div className="topic-card__body">
                    <div className="topic-card__meta"><time>{dateLabel(topic.publishedAt)}</time>{topic.categories[0] && <span>{topic.categories[0]}</span>}</div>
                    <h3>{topic.title}</h3>
                    <p>{topic.summary || "Leia como diferentes veículos estão cobrindo este acontecimento."}</p>
                    <div className="topic-spectrum" aria-label="Perspectivas: esquerda, centro e direita">
                      <span className="topic-spectrum__left"><i />Esquerda</span>
                      <span className="topic-spectrum__center"><i />Centro</span>
                      <span className="topic-spectrum__right"><i />Direita</span>
                    </div>
                    <div className="topic-card__foot"><span>{topic.articleCount ? `${topic.articleCount} matérias` : "Coberturas comparadas"}</span><span className="topic-card__open">Abrir análise <ArrowDownRight size={16} aria-hidden="true" /></span></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {state === "loading" && topics.length > 0 && <p className="discovery-loading-more" role="status">Atualizando tópicos…</p>}
        {!premium && topics.length > 0 && <div className="discovery-limit-note"><span>Você está vendo a prévia pública: até 3 tópicos.</span><Link href="/conta?returnTo=%2Ftopicos">Entrar na sua conta</Link></div>}
        {premium && hasMore && <button className="discovery-button discovery-button--outline discovery-more" onClick={() => void load(offset, activeQuery)}>Carregar mais</button>}
        {!premium && <AppPremiumCTA />}
      </div>
    </section>
  );
}