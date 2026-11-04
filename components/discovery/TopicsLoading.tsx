export function TopicsLoading({ variant = "feed" }: { variant?: "feed" | "detail" }) {
  if (variant === "detail") {
    return (
      <div className="topics-loading topics-loading--detail" role="status" aria-label="Carregando cobertura">
        <span className="topics-skeleton topics-skeleton--back" />
        <span className="topics-skeleton topics-skeleton--banner" />
        <span className="topics-skeleton topics-skeleton--eyebrow" />
        <span className="topics-skeleton topics-skeleton--title" />
        <span className="topics-skeleton topics-skeleton--text" />
        <span className="topics-skeleton topics-skeleton--tabs" />
        <span className="topics-skeleton topics-skeleton--article" />
        <span className="topics-skeleton topics-skeleton--article" />
        <span className="sr-only">Carregando cobertura…</span>
      </div>
    );
  }

  return (
    <div className="topics-loading" role="status" aria-label="Carregando assuntos">
      <span className="topics-skeleton topics-skeleton--heading" />
      <span className="topics-skeleton topics-skeleton--filters" />
      <span className="topics-skeleton topics-skeleton--banner" />
      <div className="topics-loading__grid">
        {Array.from({ length: 6 }, (_, index) => <span className="topics-skeleton topics-skeleton--card" key={index} />)}
      </div>
      <span className="sr-only">Carregando assuntos…</span>
    </div>
  );
}
