"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { initScrollDepth } from "@/lib/analytics";
import { StoreButtons } from "./StoreButtons";
import { Sunprint } from "@/components/ui/Sunprint";
import styles from "@/components/ui/Landing.module.css";

const PERSPECTIVES = [
	{
		label: "Esquerda",
		text: '"Para especialistas progressistas, a reforma representa uma vitória das elites econômicas. A nova estrutura beneficia quem já concentra riqueza e penaliza quem mais precisa de proteção social."',
		source: "Exemplos de veículos: Brasil de Fato, Intercept",
	},
	{
		label: "Centro",
		text: '"A reforma moderniza o sistema tributário, mas especialistas divergem quanto à progressividade. O impacto real depende da regulamentação, ainda em disputa no Congresso."',
		source: "Exemplos de veículos: Folha, UOL, Metrópoles",
	},
	{
		label: "Direita",
		text: '"A aprovação sinaliza estabilidade fiscal e deve atrair investimentos. A simplificação do sistema beneficia empresas e pode gerar crescimento e empregos no médio prazo."',
		source: "Exemplos de veículos: O Antagonista, Jovem Pan",
	},
];
const STATS = [
	{ value: "20", label: "Veículos brasileiros" },
	{ value: "3", label: "Grupos de perspectivas" },
	{ value: "Fontes", label: "Primárias oficiais" },
	{ value: "100%", label: "Não-partidário" },
];

export function Hero() {
	const [activeTab, setActiveTab] = useState(1);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => initScrollDepth(), []);

	function selectTab(index: number) {
		setActiveTab(index);
		tabs.current[index]?.focus();
	}

	return (
		<section
			className={`${styles.section} ${styles.hero}`}
			aria-labelledby="hero-heading"
		>
			<div className={styles.container}>
				<div className={styles.heroGrid}>
					<div className={styles.heroCopy}>
						<p className={styles.eyebrow}>Inteligência editorial</p>
						<h1 id="hero-heading" className={styles.heroTitle}>
							Veja o evento inteiro, não só um lado da história.
						</h1>
						<p className={styles.lead}>
							Compare perspectivas editoriais em segundos e descubra o que a
							sua timeline escondia — com análise por espectro, detecção de
							blindspots e busca assistida por LLM em fontes primárias oficiais
							que possam ajudar a confirmar informações; essa busca não
							substitui uma verificação editorial.
						</p>
						<StoreButtons location="hero" showWeb={false} />
						<ul className={styles.proof}>
							{["Comparação por espectro", "Resumo por evento", "Sem ruído ou clickbait"].map(
								(item) => (
									<li key={item}>
										<CheckCircle2 aria-hidden="true" />
										{item}
									</li>
								)
							)}
						</ul>
					</div>
					<div
						className={styles.demo}
						aria-label="Demonstração ilustrativa do produto Prisma News"
					>
						<Sunprint />
						<p className={styles.meta}>
							Exemplo ilustrativo · textos fictícios, não citações dos veículos
						</p>
						<h2>Reforma tributária aprovada pelo Congresso Nacional</h2>
						<p className={styles.meta}>
							Um mesmo evento. Três enquadramentos para comparar.
						</p>
						<div
							className={styles.tabs}
							role="tablist"
							aria-label="Perspectivas editoriais"
						>
							{PERSPECTIVES.map((perspective, index) => (
								<button
									key={perspective.label}
									ref={(element) => {
										tabs.current[index] = element;
									}}
									type="button"
									role="tab"
									className={styles.tab}
									id={`perspective-tab-${index}`}
									aria-controls={`perspective-panel-${index}`}
									aria-selected={activeTab === index}
									tabIndex={activeTab === index ? 0 : -1}
									onClick={() => setActiveTab(index)}
									onKeyDown={(event) => {
										const next =
											event.key === "ArrowRight"
												? (index + 1) % 3
												: event.key === "ArrowLeft"
												? (index + 2) % 3
												: event.key === "Home"
												? 0
												: event.key === "End"
												? 2
												: null;
										if (next !== null) {
											event.preventDefault();
											selectTab(next);
										}
									}}
								>
									{perspective.label}
								</button>
							))}
						</div>
						{PERSPECTIVES.map((perspective, index) => (
							<div
								key={perspective.label}
								className={styles.panel}
								role="tabpanel"
								id={`perspective-panel-${index}`}
								aria-labelledby={`perspective-tab-${index}`}
								hidden={activeTab !== index}
								tabIndex={0}
							>
								<p>{perspective.text}</p>
								<p className={styles.meta}>{perspective.source}</p>
							</div>
						))}
						<div className={styles.demoFooter}>
							<p className={styles.meta}>
								Blindspot indica ausência de cobertura em um grupo — não um
								julgamento sobre o conteúdo.
							</p>
							<Link
								href="/conta?returnTo=%2Ftopicos"
								className={styles.textLink}
							>
								Ver tópicos de hoje{" "}
								<ArrowRight size={17} aria-hidden="true" />
							</Link>
						</div>
					</div>
				</div>
				<dl className={styles.stats}>
					{STATS.map((stat) => (
						<div key={stat.label}>
							<dt>{stat.value}</dt>
							<dd>{stat.label}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
