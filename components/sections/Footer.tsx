import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { StoreButtons } from "@/components/sections/StoreButtons";

const LEGAL_LINKS = [
  { label: "Termos de Uso", href: "/termos-de-uso" },
  { label: "Privacidade", href: "/privacidade" },
];

export function Footer() {
  return (
    <footer
      className="bg-[#04000f] border-t border-purple-900/30"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <Link
              href="/"
              aria-label="Prisma News — Página inicial"
              className="flex items-center gap-2.5 mb-4"
            >
              <Image
                src="/logo.svg"
                alt="Logo Prisma News"
                width={34}
                height={34}
                className="logo-glow h-8 w-auto object-contain"
              />
              <span className="font-bold text-lg text-white">
                Prisma <span className="text-purple-400">News</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Inteligência editorial para quem quer entender os fatos — não
              apenas a versão do algoritmo.
            </p>
            <StoreButtons location="footer" compact className="mb-6" />
            <a
              href="https://www.instagram.com/prismanewsoficial/"
              aria-label="Instagram @prismanewsoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-purple-500"
            >
              <Camera aria-hidden="true" className="h-5 w-5" />
              @prismanewsoficial
            </a>
          </div>

          <nav aria-label="Links legais">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Informações legais
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-purple-900/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Prisma News. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            Feito com cuidado no Brasil{" "}
            <span role="img" aria-label="Brasil">🇧🇷</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
