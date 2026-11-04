"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StoreButtons } from "@/components/sections/StoreButtons";

const NAV_LINKS = [
  { label: "Tópicos", href: "/conta?returnTo=%2Ftopicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Recursos", href: "#recursos" },
  { label: "Preços", href: "#precos" },
  { label: "FAQ", href: "#faq" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#060111]/90 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_1px_0_rgba(139,92,246,0.08)]"
          : "bg-transparent",
      ].join(" ")}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Prisma News — Página inicial"
          className="flex items-center gap-2.5 group"
        >
          <Image
            src="/logo.svg"
            alt="Logo Prisma News"
            width={34}
            height={34}
            className="logo-glow h-8 w-auto"
            priority
          />
          <span className="font-[family:var(--font-poppins)] text-lg font-extrabold tracking-tight text-white">
            Prisma <span className="text-purple-400">News</span>
          </span>
        </Link>

        <nav className="navbar-desktop-links" aria-label="Navegação principal">
          {NAV_LINKS.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="navbar-desktop-actions">
          <StoreButtons location="navbar" compact className="navbar-stores" />
        </div>
        <button className="navbar-menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="navbar-mobile-menu">
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.div id="navbar-mobile-menu" className="navbar-mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
          <nav aria-label="Navegação móvel">
            {NAV_LINKS.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          </nav>
          <StoreButtons location="navbar_mobile" compact />
        </motion.div>}
      </AnimatePresence>
    </motion.header>
  );
}
