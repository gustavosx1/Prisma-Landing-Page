import { Brain, Shield, Vote } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

const OUTCOMES = [
	{
		Icon: Brain,
		title: "Decisões melhores",
		desc: "Com mais perspectivas, suas conclusões são mais robustas e menos vulneráveis à manipulação.",
	},
	{
		Icon: Shield,
		title: "Menos manipulação",
		desc: "Reconheça enquadramentos tendenciosos antes de internalizar narrativas criadas para te influenciar.",
	},
	{
		Icon: Vote,
		title: "Cidadania fortalecida",
		desc: "Democracias funcionam melhor quando cidadãos entendem os fatos — não só os favoritos do algoritmo.",
	},
];
const COMPARISON = [
	{
		aspect: "Organização",
		traditional: "Por manchete isolada",
		prisma: "Por evento completo",
	},
	{
		aspect: "Perspectivas",
		traditional: "1 (a que o algoritmo escolheu)",
		prisma: "Esquerda, centro e direita",
	},
	{
		aspect: "Detecção de viés",
		traditional: "Invisível",
		prisma: "Explícita e documentada",
	},
	{
		aspect: "Blindspots",
		traditional: "Você não sabe o que não sabe",
		prisma: "Grupos sem cobertura identificados",
	},
	{
		aspect: "Contexto histórico",
		traditional: "Fragmentado ou ausente",
		prisma: "Integrado ao evento",
	},
	{
		aspect: "Credibilidade da fonte",
		traditional: "Opaca",
		prisma: "Transparente com indicadores",
	},
];

export function WhyItMatters() {
	return (
		<section
			id="por-que-importa"
			className={`${styles.section} ${styles.soft}`}
			aria-labelledby="why-heading"
		>
			<div className={styles.container}>
				<EditorialHeading
					id="why-heading"
					title="Entender mais muda a forma de decidir."
					description="Diferentes perspectivas ajudam a reconhecer enquadramentos e ampliar o debate."
				/>
				<div className={styles.rows}>
					{OUTCOMES.map(({ Icon, title, desc }) => (
						<article key={title} className={styles.row}>
							<Icon className={styles.icon} aria-hidden="true" />
							<h3>{title}</h3>
							<p>{desc}</p>
						</article>
					))}
				</div>
				<div
					className={styles.tableWrap}
					role="region"
					aria-label="Comparação: Feed tradicional vs Prisma News"
					tabIndex={0}
				>
					<table className={styles.table}>
						<caption className="sr-only">
							Comparação: Feed tradicional vs Prisma News
						</caption>
						<thead>
							<tr>
								<th scope="col">Critério</th>
								<th scope="col">Feed tradicional</th>
								<th scope="col">Prisma news</th>
							</tr>
						</thead>
						<tbody>
							{COMPARISON.map((row) => (
								<tr key={row.aspect}>
									<th scope="row">{row.aspect}</th>
									<td>{row.traditional}</td>
									<td>{row.prisma}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
