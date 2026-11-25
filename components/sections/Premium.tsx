import { Check, X } from "lucide-react";
import { StoreButtons } from "./StoreButtons";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

type PlanFeature = { text: string; included: boolean };
const PLANS: { name: string; period: string; description: string; highlight: boolean; features: PlanFeature[] }[] = [
  {
    name: "Grátis", period: "para sempre", description: "Para começar a ver os dois lados.", highlight: false,
    features: [
      { text: "Prévia pública de até 3 tópicos", included: true },
      { text: "Perspectivas esquerda/centro/direita", included: true },
      { text: "Resumo básico por evento", included: true },
      { text: "Histórico de 7 dias", included: true },
      { text: "Detector de blindspots", included: false },
      { text: "Análise aprofundada", included: false },
      { text: "Busca assistida em fontes oficiais", included: false },
      { text: "Alertas temáticos personalizados", included: false },
      { text: "Export de análises (PDF/Markdown)", included: false },
    ],
  },
  {
    name: "Premium", period: "consulte na loja", description: "Para quem quer o quadro completo, sempre.", highlight: true,
    features: [
      { text: "Eventos ilimitados", included: true },
      { text: "Perspectivas esquerda/centro/direita", included: true },
      { text: "Resumo completo por evento", included: true },
      { text: "Histórico completo", included: true },
      { text: "Detector de blindspots", included: true },
      { text: "Análise aprofundada", included: true },
      { text: "Busca assistida em fontes oficiais", included: true },
      { text: "Alertas temáticos personalizados", included: true },
      { text: "Export de análises (PDF/Markdown)", included: true },
    ],
  },
];
const FRICTION = ["Cancele quando quiser, sem burocracia", "Cobrança transparente, sem surpresas", "Sem período de fidelidade", "Dados protegidos — nunca vendemos suas informações"];

export function Premium() {
  return (
    <section id="precos" className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.container}>
        <EditorialHeading id="pricing-heading" eyebrow="Planos" title="Simples, transparente, sem surpresas."
          description="Comece grátis. Evolua quando precisar de mais profundidade." />
        <aside className={styles.subscription} aria-label="Assinatura disponível nos aplicativos Prisma News">
          <span className={styles.badge}>Disponível somente no aplicativo</span>
          <h3>Escolha o Premium na sua loja de aplicativos</h3>
          <p>Assinaturas são processadas pela App Store ou Google Play no aplicativo Prisma News. Confira o preço, a renovação e as condições diretamente na loja. Este site não processa compras.</p>
        </aside>
        <div className={styles.plans}>
          {PLANS.map((plan) => (
            <article key={plan.name} className={`${styles.plan} ${plan.highlight ? styles.planPremium : ""}`}>
              <h3>{plan.name}</h3>
              <p className={styles.planDescription}>{plan.description}</p>
              <p className={styles.price}>{plan.highlight ? "Na loja" : "Grátis"}</p>
              <p className={styles.period}>{plan.period}</p>
              <ul className={styles.planFeatures} aria-label={`Funcionalidades do plano ${plan.name}`}>
                {plan.features.map((feature) => (
                  <li key={feature.text} className={feature.included ? styles.included : styles.excluded}>
                    {feature.included ? <Check aria-label="Incluído" /> : <X aria-label="Não incluído" />}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <StoreButtons location={`pricing_${plan.name.toLowerCase()}`} />
            </article>
          ))}
        </div>
        <ul className={styles.reassurance}>{FRICTION.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
  );
}
