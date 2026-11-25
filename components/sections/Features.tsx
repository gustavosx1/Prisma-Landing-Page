import { LayoutGrid, SlidersHorizontal, EyeOff, Shield, Search, Bell } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

const FEATURES = [
	{
		Icon: LayoutGrid,
		title: "Feed por evento",
		description:
			"Esqueça o feed de manchetes infinito. No Prisma, você navega por eventos — cada acontecimento agrupado com toda a sua cobertura em um único lugar.",
		premium: false,
	},
	{
		Icon: SlidersHorizontal,
		title: "Perspectivas comparadas",
		description:
			"Leia o que a esquerda, o centro e a direita dizem sobre o mesmo fato. Veja o que muda, o que converge — e forme a sua própria opinião com base em evidências.",
		premium: false,
	},
	{
		Icon: EyeOff,
		title: "Detector de blindspots",
		description:
			"Identifique quais grupos não têm cobertura do evento nas contagens completas de matérias. Quando esquerda, centro e direita têm ao menos uma matéria, o indicador mostra cobertura equilibrada — sem sugerir igualdade de volume ou ausência de viés.",
		premium: true,
	},
	{
		Icon: Shield,
		title: "Credibilidade de fontes",
		description:
			"Saiba quem está falando. Cada veículo vem com métricas de transparência editorial, histórico de correções e posicionamento documentado.",
		premium: false,
	},
	{
		Icon: Search,
		title: "Busca em fontes oficiais",
		description:
			"A LLM ajuda a localizar fontes primárias oficiais que possam confirmar uma informação. Essa busca apoia a apuração, mas não é um fact-check automatizado nem garante a veracidade de uma afirmação.",
		premium: true,
	},
	{
		Icon: Bell,
		title: "Alertas temáticos",
		description:
			"Configure temas de interesse e receba notificações quando um evento relevante surgir — com cobertura completa já organizada para explorar.",
		premium: true,
	},
];

export function Features() {
	return (
		<section id="recursos" className={styles.section} aria-labelledby="features-heading">
			<div className={styles.container}>
				<EditorialHeading
					id="features-heading"
					eyebrow="Recursos"
					title="Ferramentas para quem quer entender de verdade"
					description="Cada funcionalidade foi criada para dar autonomia intelectual — não dependência editorial."
				/>
				<div className={styles.rows}>
					{FEATURES.map(({ Icon, title, description, premium }) => (
						<article key={title} className={styles.row}>
							<Icon className={styles.icon} aria-hidden="true" />
							<div className={styles.featureTitle}>
								<h3>{title}</h3>
								{premium && <span className={styles.badge}>Premium</span>}
							</div>
							<p>{description}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
