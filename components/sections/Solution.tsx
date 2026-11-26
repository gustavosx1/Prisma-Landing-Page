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
			"Compare convergências e veja quais grupos não cobriram o evento. Cobertura equilibrada indica presença de esquerda, centro e direita, não igual volume de matérias.",
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
				<EditorialHeading id="solution-heading" title="Do acontecimento às diferentes perspectivas."
					description="Reunimos a cobertura para você comparar, contextualizar e compreender." />
				<div className={styles.rows}>
					{STEPS.map(({ num, Icon, title, description, detail }) => (
						<article key={num} className={styles.row}>
							<div className={styles.step}><span>Passo {num}</span></div>
							<div className={styles.titleWithIcon}><Icon className={styles.icon} aria-hidden="true" /><h3>{title}</h3></div><p>{description}</p>{detail && <p className={styles.detail}>{detail}</p>}
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
