"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, RefreshCw, Search, Sparkles, X } from "lucide-react";
import { sanitizePremiumFeed, sanitizePublicFeed, type Topic } from "@/lib/topics";
import { AppPremiumCTA } from "@/components/discovery/AppPremiumCTA";
import { TopicsLoading } from "@/components/discovery/TopicsLoading";

type FeedState = "loading" | "ready" | "empty" | "error";
type SearchMessage = "" | "validation" | "access" | "error";
type CategoryFilter = "tudo" | "economia" | "política" | "tecnologia" | "mundo" | "esportes";

const CATEGORY_FILTERS: CategoryFilter[] = ["tudo", "economia", "política", "tecnologia", "mundo", "esportes"];

function normalizedCategory(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function matchesCategory(categories: string[], filter: CategoryFilter) {
  if (filter === "tudo") return true;
  const values = categories.map(normalizedCategory);
  if (filter === "economia") return values.some((value) => value.includes("economia"));
  if (filter === "política") return values.some((value) => value.includes("politica"));
  if (filter === "tecnologia") return values.some((value) => value.includes("tecnologia") || value.includes("tech"));
  if (filter === "mundo") return values.some((value) => value.includes("mundo") || value.includes("internacional") || value.includes("global"));
  return values.some((value) => value.includes("esporte"));
}

function SpectrumRuler({ counts, showLabels = true }: { counts: Topic["perspectiveCounts"]; showLabels?: boolean }) {
  const segments = [
    { key: "left", label: "Esquerda", count: counts.left, color: "#e53935" },
    { key: "center", label: "Centro", count: counts.center, color: "#858585" },
    { key: "right", label: "Direita", count: counts.right, color: "#2563eb" },
  ];
  const total = segments.reduce((sum, segment) => sum + segment.count, 0);
  if (total === 0) return null;

  return (
    <div className="spectrum-ruler" role="img" aria-label={`Distribuição de matérias: ${segments.map(({ label, count }) => `${label}, ${count}`).join("; ")}`}>
      <div className="spectrum-ruler__track" aria-hidden="true">
        {segments.map((segment) => segment.count > 0 && (
          <span key={segment.key} style={{ flexGrow: segment.count, backgroundColor: segment.color }} />
        ))}
      </div>
      {showLabels && <div className="spectrum-ruler__labels" aria-hidden="true">
        {segments.map((segment) => segment.count > 0 && (
          <span className={`spectrum-ruler__label spectrum-ruler__label--${segment.key}`} key={segment.key}>
            <i />{segment.label} · {segment.count}
          </span>
        ))}
      </div>}
    </div>
  );
}

function relativeTime(value: string | null) {
  if (!value) return "Publicado recentemente";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Publicado recentemente";
  const elapsed = Math.max(0, Date.now() - parsed.getTime());
  if (elapsed < 60_000) return "Agora";
  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60_000, "minute"], [3_600_000, "hour"], [86_400_000, "day"], [604_800_000, "week"], [2_592_000_000, "month"], [31_536_000_000, "year"],
  ];
  let unitIndex = 0;
  while (unitIndex < units.length - 1 && elapsed >= units[unitIndex + 1][0]) unitIndex += 1;
  const valueInUnit = Math.floor(elapsed / units[unitIndex][0]);
  return new Intl.RelativeTimeFormat("pt-BR", { numeric: "always" }).format(-valueInUnit, units[unitIndex][1]);
}

function summaryPreview(value: string, maxLength = 120) {
  const characters = Array.from(value.trim());
  return characters.length > maxLength ? `${characters.slice(0, maxLength - 1).join("").trimEnd()}…` : value;
}

export function TopicsFeed() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [state, setState] = useState<FeedState>("loading");
  const [premium, setPremium] = useState(false);
  const [category, setCategory] = useState<CategoryFilter>("tudo");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState<SearchMessage>("");
  const activeQueryRef = useRef("");
  const requestId = useRef(0);
  const activeRequest = useRef<AbortController | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleTopics = topics.filter((topic) => matchesCategory(topic.categories, category));
  const carouselTopics = visibleTopics.slice(0, 5);
  const featuredTopic = carouselTopics[featuredIndex % Math.max(carouselTopics.length, 1)];

  const load = useCallback(async (nextOffset = 0, searchTerm = "") => {
    const search = searchTerm.trim();
    if (search && (search.length < 2 || search.length > 120)) {
      setSearchMessage("validation");
      return;
    }
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const currentRequestId = ++requestId.current;
    setState("loading");
    setSearchMessage("");
    if (nextOffset === 0) {
      setTopics([]);
      setFeaturedIndex(0);
    }
    try {
      const limit = search ? 20 : 50;
      const params = new URLSearchParams({ limit: String(limit), offset: String(nextOffset) });
      if (search) params.set("q", search);
      const response = await fetch(`/api/topics?${params.toString()}`, { cache: "no-store", signal: controller.signal });
      const payload: unknown = await response.json();
      if (currentRequestId !== requestId.current) return;
      const envelope = payload as { topics?: unknown; access?: string; error?: string };
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setPremium(false);
          setSearchMessage("access");
          setState("ready");
          setTopics([]);
          return;
        }
        if (response.status === 400 || response.status === 422) {
          setSearchMessage("validation");
          setState("ready");
          setTopics([]);
          return;
        }
        throw new Error(envelope.error || "feed request failed");
      }
      const isPremium = envelope.access === "premium";
      const incoming = isPremium ? sanitizePremiumFeed(envelope.topics ?? payload) : sanitizePublicFeed(envelope.topics ?? payload);
      const topicsEnvelope = envelope.topics as { meta?: { has_more?: unknown } } | undefined;
      setPremium(isPremium);
      setTopics((current) => nextOffset === 0 ? incoming : [...current, ...incoming]);
      setOffset(nextOffset + incoming.length);
      setHasMore(isPremium && (typeof topicsEnvelope?.meta?.has_more === "boolean" ? topicsEnvelope.meta.has_more : incoming.length >= limit));
      setState(incoming.length || nextOffset > 0 ? "ready" : "empty");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (currentRequestId !== requestId.current) return;
      if (search) {
        setSearchMessage("error");
        setState("ready");
        setTopics([]);
        return;
      }
      setState("error");
    }
  }, []);

  useEffect(() => {
    if (carouselTopics.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setFeaturedIndex((current) => (current + 1) % carouselTopics.length), 15000);
    return () => window.clearInterval(timer);
  }, [carouselTopics.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    if (!searchOpen || !premium) return;
    const term = searchDraft.trim();
    if (!term && !activeQueryRef.current) return;
    activeRequest.current?.abort();
    requestId.current += 1;
    if (term && (term.length < 2 || term.length > 120)) {
      debounceTimer.current = setTimeout(() => {
        setSearchMessage("validation");
        setState("ready");
        setTopics([]);
      }, 0);
      return () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
      };
    }
    debounceTimer.current = setTimeout(() => {
      activeQueryRef.current = term;
      setActiveQuery(term);
      void load(0, term);
    }, 450);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [load, premium, searchDraft, searchOpen]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = searchDraft.trim();
    if (term.length < 2 || term.length > 120) {
      setSearchMessage("validation");
      return;
    }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    activeQueryRef.current = term;
    setActiveQuery(term);
    void load(0, term);
  }

  function closeSearch() {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearchOpen(false);
    setSearchDraft("");
    activeQueryRef.current = "";
    setActiveQuery("");
    setSearchMessage("");
    if (activeQuery) void load(0, "");
  }

  return (
    <section className="discovery-section topics-page" id="topicos" aria-labelledby="topics-title">
      <div className="discovery-shell">
        <div className="topics-list-heading">
          <div>
            <h1 id="topics-title"><Image src="/logo.svg" alt="" width={42} height={42} priority /> <span>Prisma <span className="topics-list-heading__bullet" aria-hidden="true">•</span> Feed</span></h1>
          </div>
          <div className="topics-toolbar">
            <div className="topics-category-filters" role="group" aria-label="Filtrar tópicos por categoria">
              {CATEGORY_FILTERS.map((item) => (
                <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setFeaturedIndex(0); }}>
                  {item === "tudo" ? "Tudo" : item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            {premium && <div className={`topic-search${searchOpen ? " topic-search--open" : ""}`}>
              <button type="button" className="topic-search__trigger" aria-label="Pesquisar tópicos" aria-expanded={searchOpen} onClick={() => {
                setSearchOpen(true);
                window.setTimeout(() => document.getElementById("premium-topic-search")?.focus(), 0);
              }}><Search size={17} aria-hidden="true" /></button>
              <form className="topic-search__form" role="search" onSubmit={submitSearch}>
                <label htmlFor="premium-topic-search" className="sr-only">Pesquisar tópicos no Prisma Premium</label>
                <input id="premium-topic-search" value={searchDraft} onChange={(event) => setSearchDraft(event.target.value)} placeholder="Pesquisar assuntos" maxLength={121} tabIndex={searchOpen ? 0 : -1} aria-hidden={!searchOpen} />
                <button type="submit" className="topic-search__submit" aria-label="Pesquisar" tabIndex={searchOpen ? 0 : -1}><Search size={17} aria-hidden="true" /></button>
                <button type="button" className="topic-search__close" aria-label="Fechar pesquisa" onClick={closeSearch} tabIndex={searchOpen ? 0 : -1}><X size={16} aria-hidden="true" /></button>
              </form>
            </div>}
          </div>
        </div>

        {searchMessage && <p className={`topic-search-message topic-search-message--${searchMessage}`} role="status" aria-live="polite">
          {searchMessage === "validation" && "Digite entre 2 e 120 caracteres para pesquisar."}
          {searchMessage === "access" && "A busca é exclusiva do Prisma Premium. Assine pelo aplicativo para pesquisar tópicos."}
          {searchMessage === "error" && "Não foi possível pesquisar agora. Confira sua conexão e tente novamente."}
        </p>}

        {state === "loading" && topics.length === 0 && <TopicsLoading />}
        {state === "error" && <div className="discovery-state discovery-state--error" role="alert"><p>Não foi possível carregar os tópicos agora.</p><button className="discovery-button discovery-button--outline" onClick={() => void load()}><RefreshCw size={16} aria-hidden="true" /> Tentar novamente</button></div>}
        {state === "empty" && <div className="discovery-state">{activeQuery ? `Nenhum tópico encontrado para “${activeQuery}”.` : "Ainda não há tópicos publicados. Volte em breve."}</div>}
        {state === "ready" && topics.length > 0 && visibleTopics.length === 0 && <div className="discovery-state">Nenhum tópico nesta categoria por enquanto. Escolha outro tema para continuar explorando.</div>}

        {featuredTopic && <section className="featured-carousel" aria-label="Tópicos em destaque" aria-roledescription="carrossel">
          <div className="featured-carousel__track">
            {carouselTopics.map((topic, index) => <Link className={`featured-topic${index === featuredIndex ? " featured-topic--active" : ""}`} key={topic.id} href={`/topicos/${encodeURIComponent(topic.id)}`} aria-label={`Ver tópico em destaque: ${topic.title}`}>
              <Image className="featured-topic__image" src={topic.imageUrl || "/fallback-banner.png"} alt="" fill sizes="(max-width: 760px) 88vw, 1180px" unoptimized priority={index === 0} />
              <span className="featured-topic__veil" aria-hidden="true" />
              <span className="featured-topic__content">
                <span className="featured-topic__tag"><Sparkles size={14} aria-hidden="true" /> Em destaque · {topic.categories[0] || "Prisma News"}</span>
                <time className="featured-topic__date" dateTime={topic.publishedAt ?? undefined}>{relativeTime(topic.publishedAt)}</time>
                <strong>{topic.title}</strong>
                <span className="featured-topic__summary">{summaryPreview(topic.summary || "Leia e compare as principais perspectivas sobre este assunto.")}</span>
                <span className="featured-topic__action">Ler cobertura completa <ArrowRight size={17} aria-hidden="true" /></span>
              </span>
            </Link>)}
          </div>
          {carouselTopics.length > 1 && <div className="featured-carousel__controls">
            <button type="button" aria-label="Tópico anterior" onClick={() => setFeaturedIndex((index) => (index - 1 + carouselTopics.length) % carouselTopics.length)}><ArrowLeft size={17} aria-hidden="true" /></button>
            <div className="featured-carousel__dots" aria-label={`Tópico ${featuredIndex + 1} de ${carouselTopics.length}`}>
              {carouselTopics.map((topic, index) => <button type="button" key={topic.id} aria-label={`Mostrar tópico ${index + 1}: ${topic.title}`} aria-current={index === featuredIndex ? "true" : undefined} onClick={() => setFeaturedIndex(index)} />)}
            </div>
            <button type="button" aria-label="Próximo tópico" onClick={() => setFeaturedIndex((index) => (index + 1) % carouselTopics.length)}><ArrowRight size={17} aria-hidden="true" /></button>
          </div>}
        </section>}

        {visibleTopics.length > carouselTopics.length && (
          <div className="discovery-grid" aria-live="polite">
            {visibleTopics.slice(carouselTopics.length).map((topic, index) => (
              <article className={`topic-card topic-card--${index % 3}`} key={topic.id}>
                <Link className="topic-card__link" href={`/topicos/${encodeURIComponent(topic.id)}`} aria-label={`Abrir tópico: ${topic.title}`}>
                  <div className="topic-card__visual">
                    <Image className="topic-card__photo" src={topic.imageUrl || "/fallback.png"} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" unoptimized />
                    <span className="topic-card__visual-label">Em perspectiva</span>
                  </div>
                  <div className="topic-card__body">
                    <div className="topic-card__meta"><time dateTime={topic.publishedAt ?? undefined}>{relativeTime(topic.publishedAt)}</time>{topic.categories[0] && <span>{topic.categories[0]}</span>}</div>
                    <h3>{topic.title}</h3>
                    <p>{summaryPreview(topic.summary || "Leia como diferentes veículos estão cobrindo este acontecimento.")}</p>
                    <SpectrumRuler counts={topic.perspectiveCounts} />
                    <div className="topic-card__foot"><span>{topic.articleCount ? `${topic.articleCount} matérias` : "Coberturas comparadas"}</span><span className="topic-card__open">Ler cobertura completa <ArrowDownRight size={16} aria-hidden="true" /></span></div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {state === "loading" && topics.length > 0 && <p className="discovery-loading-more" role="status">Atualizando assuntos…</p>}
        {!premium && topics.length > 0 && <div className="discovery-limit-note discovery-limit-note--premium"><p>Assine o Prisma Premium para acessar mais</p></div>}
        {premium && hasMore && <button className="discovery-button discovery-button--outline discovery-more" onClick={() => void load(offset, activeQuery)} disabled={state === "loading"}>Carregar mais</button>}
        {!premium && <AppPremiumCTA variant="feed" />}
      </div>
    </section>
  );
}