import { AnimatedSection } from "./AnimatedSection";
import styles from "./Landing.module.css";

export function EditorialHeading({ title, description, id }: {
  title: string;
  description?: string;
  id: string;
}) {
  return (
    <AnimatedSection className={styles.header}>
      <h2 id={id} className={styles.title}>{title}</h2>
      {description && <p className={styles.lead}>{description}</p>}
    </AnimatedSection>
  );
}