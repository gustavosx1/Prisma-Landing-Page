"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { APP_DOWNLOAD_URL } from "@/lib/appDownload";

const NAV_LINKS = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Recursos",      href: "#recursos" },
  { label: "Preços",        href: "#precos" },
  { label: "FAQ",           href: "#faq" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCTA = (location: string) =>
    trackEvent("hero_cta_click", { location });

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
          <span className="font-bold text-lg text-white tracking-tight">
            Prisma <span className="text-purple-400">News</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleCTA("navbar")}
            className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.55)]"
          >
            Começar grátis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg transition-colors"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#060111]/95 backdrop-blur-xl border-b border-purple-900/30 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1" aria-label="Menu mobile">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-purple-900/30 rounded-xl transition-colors font-medium"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-3 mt-3 border-t border-purple-900/30 space-y-2">
                <a
                  href={APP_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setOpen(false); handleCTA("navbar_mobile"); }}
                  className="block px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white text-center rounded-xl transition-colors font-semibold"
                >
                  Começar grátis
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
