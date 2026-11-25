import { StoreButtons } from "./StoreButtons";
import { Sunprint } from "@/components/ui/Sunprint";
import styles from "@/components/ui/Landing.module.css";

export function FinalCTA() {
  return (
    <section className={`${styles.section} ${styles.soft}`} aria-labelledby="final-cta-heading">
      <div className={`${styles.container} ${styles.finalGrid}`}>
        <div>
          <p className={styles.eyebrow}>Comece hoje. Grátis.</p>
          <h2 id="final-cta-heading" className={styles.title}>Comece a ver o quadro completo.</h2>
          <p className={styles.lead}>Cada evento tem mais de um lado. Agora você pode ver todos eles — antes de formar a sua opinião.</p>
          <StoreButtons location="final_cta" />
          <p className={styles.note}>Grátis para sempre no plano básico · Cancele quando quiser</p>
        </div>
        <Sunprint />
      </div>
    </section>
  );
}
