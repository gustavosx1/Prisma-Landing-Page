import type { Topic } from "@/lib/topics";

export function SpectrumRuler({ counts, showLabels = true, showWhenEmpty = false }: { counts: Topic["perspectiveCounts"]; showLabels?: boolean; showWhenEmpty?: boolean }) {
  const segments = [
    { key: "left", label: "Esquerda", count: counts.left, color: "var(--spectrum-left)" },
    { key: "center", label: "Centro", count: counts.center, color: "var(--spectrum-center)" },
    { key: "right", label: "Direita", count: counts.right, color: "var(--spectrum-right)" },
  ];
  const total = segments.reduce((sum, segment) => sum + segment.count, 0);
  if (total === 0 && !showWhenEmpty) return null;
  return (
    <div className="spectrum-ruler" role="img" aria-label={total > 0 ? `Distribuição de matérias: ${segments.map(({ label, count }) => `${label}, ${count}`).join("; ")}` : "Distribuição de matérias indisponível"}>
      <div className="spectrum-ruler__track" aria-hidden="true">
        {segments.map((segment) => (segment.count > 0 || (showWhenEmpty && total === 0)) && <span key={segment.key} style={{ flexGrow: total > 0 ? segment.count : 1, backgroundColor: segment.color }} />)}
      </div>
      {showLabels && <div className="spectrum-ruler__labels" aria-hidden="true">
        {segments.map((segment) => segment.count > 0 && <span className={`spectrum-ruler__label spectrum-ruler__label--${segment.key}`} key={segment.key}><i />{segment.label} · {segment.count}</span>)}
      </div>}
    </div>
  );
}