import { ScanSearch, Columns2, Lightbulb } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

const STEPS = [
	{
		num: "01",
		Icon: ScanSearch,
		title: "Evento detectado",
		description:
			"Nossa plataforma organiza eventos relevantes e reúne matérias dos 20 veículos jornalísticos brasileiros acompanhados. Você compara a cobertura — não apenas manchetes isoladas.",
		detail: "A organização combina recursos automatizados com curadoria editorial.",
	},
	{
		num: "02",
		Icon: Columns2,
		title: "Cobertura comparada por espectro",
		description:
			"Classificamos cada veículo pelas tendências editoriais observadas em seu histórico. Essa leitura é aproximada: não rotula cada jornalista ou matéria e pode ser revista à medida que a linha editorial muda.",
	},
	{
		num: "03",
		Icon: Lightbulb,
		title: "Blindspots e convergências revelados",
		description:
			"O que pode estar faltando na cobertura? Onde as perspectivas convergem? O indicador de blindspot mostra quais grupos — esquerda, centro e direita — não têm matérias sobre o evento. A presença dos três grupos indica cobertura equilibrada, não igualdade no volume de matérias.",
		detail: "Ferramenta exclusiva para leitores Premium. Dados ausentes não geram indicador.",
	},
];

const FLOW = [
	"Evento real acontece",
	"20 veículos consultados",
	"Classificação editorial",
	"Blindspots detectados",
	"Você entende o quadro completo",
];

export function Solution() {
	return (
		<section id="como-funciona" className={`${styles.section} ${styles.soft}`} aria-labelledby="solution-heading">
			<div className={styles.container}>
				<EditorialHeading id="solution-heading" eyebrow="Como funciona" title="Três passos para o quadro completo" description="Da detecção à compreensão, em segundos." />
				<div className={styles.rows}>
					{STEPS.map(({ num, Icon, title, description, detail }) => (
						<article key={num} className={styles.row}>
							<div className={styles.step}><span>Passo {num}</span><Icon className={styles.icon} aria-hidden="true" /></div>
							<h3>{title}</h3><p>{description}</p>{detail && <p className={styles.detail}>{detail}</p>}
						</article>
					))}
				</div>
				<ol className={styles.flow} aria-label="Fluxo de organização da cobertura">
					{FLOW.map((label, index) => <li key={label}>{label}{index < FLOW.length - 1 && <span aria-hidden="true">→</span>}</li>)}
				</ol>
			</div>
		</section>
	);
}
