"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { StoreButtons } from "./StoreButtons";
import { PrismaSignature } from "@/components/ui/PrismaSignature";
import styles from "@/components/ui/Landing.module.css";

const NAV_LINKS = [
	{ label: "Tópicos", href: "/conta?returnTo=%2Ftopicos" },
	{ label: "Como funciona", href: "#como-funciona" },
	{ label: "Recursos", href: "#recursos" },
	{ label: "Premium", href: "#precos" },
	{ label: "FAQ", href: "#faq" },
];

export function NavBar() {
	const [open, setOpen] = useState(false);
	const toggle = useRef<HTMLButtonElement>(null);

	return (
		<header
			className={styles.nav}
			onKeyDown={(event) => {
				if (event.key === "Escape" && open) {
					setOpen(false);
					toggle.current?.focus();
				}
			}}
		>
			<div className={`${styles.container} ${styles.navInner}`}>
				<PrismaSignature />
				<nav className={styles.navLinks} aria-label="Navegação principal">
					{NAV_LINKS.map((item) => (
						<Link key={item.label} href={item.href}>
							{item.label}
						</Link>
					))}
				</nav>
				<div className={styles.navActions}>
					<StoreButtons location="navbar" compact />
				</div>
				<button
					ref={toggle}
					className={styles.menuToggle}
					type="button"
					onClick={() => setOpen((value) => !value)}
					aria-label={open ? "Fechar menu" : "Abrir menu"}
					aria-expanded={open}
					aria-controls="navbar-mobile-menu"
				>
					{open ? (
						<X size={21} aria-hidden="true" />
					) : (
						<Menu size={21} aria-hidden="true" />
					)}
				</button>
			</div>
			<div
				id="navbar-mobile-menu"
				className={styles.mobileMenu}
				hidden={!open}
			>
				<nav aria-label="Navegação móvel">
					{NAV_LINKS.map((item) => (
						<Link
							key={item.label}
							href={item.href}
							onClick={() => setOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<StoreButtons location="navbar_mobile" compact />
			</div>
		</header>
	);
}
