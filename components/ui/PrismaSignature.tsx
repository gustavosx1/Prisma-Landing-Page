import Image from "next/image";
import Link from "next/link";
import styles from "./Landing.module.css";

export function PrismaSignature() {
  return (
    <Link href="/" aria-label="Prisma News — Página inicial" className={styles.brand}>
      <Image src="/logo.svg" alt="" width={32} height={32} />
      <span className={styles.wordmark}>Prisma <span>news</span></span>
    </Link>
  );
}