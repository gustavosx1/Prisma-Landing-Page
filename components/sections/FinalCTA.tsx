import { StoreButtons } from "./StoreButtons";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import styles from "@/components/ui/Landing.module.css";

export function FinalCTA() {
  return (
    <section className={`${styles.section} ${styles.soft}`} aria-labelledby="final-cta-heading">
      <div className={styles.container}>
        <EditorialHeading id="final-cta-heading" title="Comece a ver o quadro completo."
          description="Explore outras perspectivas antes de formar sua opinião." />
        <div className={styles.finalGrid}>
          <StoreButtons location="final_cta" />
          <p className={styles.note}>Grátis para sempre no plano básico · Cancele quando quiser</p>
        </div>
      </div>
    </section>
  );
}
