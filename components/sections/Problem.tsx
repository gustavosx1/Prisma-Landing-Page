import { Filter, AlertCircle, Users } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

const PAINS = [
	{
		Icon: Filter,
		title: "Bolhas algorítmicas",
		description:
			"As plataformas mostram só o que confirma o que você já pensa. O algoritmo prioriza engajamento — e engajamento é polarização.",
	},
	{
		Icon: AlertCircle,
		title: "Manchetes sem contexto",
		description:
			"Títulos criados para cliques, não para informar. Você lê a manchete, acha que entendeu — e perdeu toda a nuance que importa.",
	},
	{
		Icon: Users,
		title: "Polarização crescente",
		description:
			"Quando cada grupo vê apenas a sua versão da realidade, o debate público se torna impossível. A desconfiança virou padrão.",
	},
];

export function Problem() {
	return (
		<section id="problema" className={styles.section} aria-labelledby="problem-heading">
			<div className={styles.container}>
				<EditorialHeading id="problem-heading"
					title="Seu feed mostra só parte da história."
					description="Entre bolhas e manchetes, o contexto pode ficar de fora." />
				<div className={styles.rows}>
					{PAINS.map(({ Icon, title, description }) => (
						<article key={title} className={styles.row}>
							<div className={styles.titleWithIcon}><Icon className={styles.icon} aria-hidden="true" /><h3>{title}</h3></div><p>{description}</p>
						</article>
					))}
				</div>
				<p className={`${styles.note} ${styles.problemConclusion}`}><strong>Existe uma forma melhor de entender o que acontece no mundo.</strong>E ela começa com ver o mesmo evento de múltiplos ângulos.</p>
			</div>
		</section>
	);
}
