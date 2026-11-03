"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

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

        <nav aria-label="Navegação principal">
          <Link href="/conta?returnTo=%2Ftopicos" className="discovery-button discovery-button--primary navbar-login">Entrar</Link>
        </nav>
      </div>
    </motion.header>
  );
}
