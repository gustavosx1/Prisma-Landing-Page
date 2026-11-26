import Link from "next/link";
import { ArrowRight, Cpu, Globe2, HeartPulse, Leaf, Search, TrendingUp, WandSparkles } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

const EXAMPLES = [
  { Icon: WandSparkles, title: "Inteligência artificial", detail: "Regulação, trabalho e novos modelos" },
  { Icon: Cpu, title: "Tecnologia", detail: "Inovação, privacidade e vida digital" },
  { Icon: Globe2, title: "Geopolítica", detail: "Diplomacia, conflitos e relações globais" },
  { Icon: TrendingUp, title: "Economia", detail: "Juros, inflação e decisões de mercado" },
  { Icon: HeartPulse, title: "Saúde", detail: "Pesquisa, prevenção e políticas públicas" },
  { Icon: Leaf, title: "Meio ambiente", detail: "Clima, energia e sustentabilidade" },
];

export function TopicSearch() {
  return (
    <section id="busca-topicos" className={styles.section} aria-labelledby="topic-search-heading">
      <div className={styles.container}>
        <EditorialHeading
          id="topic-search-heading"
          title="Faça busca dos seus tópicos favoritos e compare diferentes perspectivas"
          description="Do seu interesse ao contexto: encontre acontecimentos e compare como são cobertos."
        />
        <div className={styles.searchExplore}>
          <p className={styles.searchIntro}>
            <Search size={18} aria-hidden="true" />
            Por onde sua curiosidade começa?
          </p>
          <ul className={styles.searchExamples} aria-label="Exemplos de assuntos para pesquisar">
            {EXAMPLES.map(({ Icon, title, detail }) => (
              <li key={title}>
                <Link href="/conta?returnTo=%2Ftopicos" prefetch={false} className={styles.searchExample}
                  aria-label={`${title}: acessar a conta para buscar tópicos`}>
                  <Icon className={styles.searchIcon} aria-hidden="true" />
                  <span>
                    <span className={styles.searchName}>{title}</span>
                    <span className={styles.searchDetail}>{detail}</span>
                  </span>
                  <ArrowRight className={styles.searchArrow} size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.searchAccess}>
            <p>Busca de tópicos disponível para assinantes Premium. Os exemplos são sugestões: entre na sua conta e digite o assunto na busca.</p>
            <Link href="/conta?returnTo=%2Ftopicos" prefetch={false} className={styles.searchCTA}>
              Acessar minha conta <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}