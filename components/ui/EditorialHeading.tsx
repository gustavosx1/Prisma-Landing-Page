import styles from "./Landing.module.css";

export function EditorialHeading({ eyebrow, title, description, id }: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>{title}</h2>
      <p className={styles.lead}>{description}</p>
    </div>
  );
}