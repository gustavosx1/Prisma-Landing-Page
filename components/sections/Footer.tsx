import Link from "next/link";
import { StoreButtons } from "./StoreButtons";
import { FooterSignOut } from "./FooterSignOut";
import { PrismaSignature } from "@/components/ui/PrismaSignature";
import styles from "@/components/ui/Landing.module.css";

const LEGAL_LINKS = [
	{ label: "Termos de Uso", href: "/termos-de-uso" },
	{ label: "Privacidade", href: "/privacidade" },
	{ label: "Metodologia", href: "/metodologia" },
];

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.footerMain}>
					<div>
						<PrismaSignature />
						<p className={styles.footerIntro}>
							Inteligência editorial para quem quer entender os fatos — não apenas
							a versão do algoritmo.
						</p>
						<StoreButtons location="footer" compact />
						<a
							href="https://www.instagram.com/prismanewsoficial/"
							aria-label="Instagram @prismanewsoficial"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.textLink}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
								<rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
								<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
								<circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
							</svg> @prismanewsoficial
						</a>
					</div>
					<nav aria-label="Links legais">
						<h3>Informações legais</h3>
						<ul>
							{LEGAL_LINKS.map((item) => (
								<li key={item.href}>
									<Link
										href={item.href}
										className={styles.legalLink}
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className={styles.footerBottom}>
					<p>
						© {new Date().getFullYear()} Prisma News. Todos os direitos
						reservados.
					</p>
					<div className={styles.footerActions}>
						<p>
							Feito com cuidado no Brasil{" "}
							<span role="img" aria-label="Brasil">
								🇧🇷
							</span>
						</p>
						<FooterSignOut />
					</div>
				</div>
			</div>
		</footer>
	);
}
