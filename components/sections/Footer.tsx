import Image from "next/image";
import Link from "next/link";
import { StoreButtons } from "@/components/sections/StoreButtons";

const LEGAL_LINKS = [
  { label: "Termos de Uso", href: "/termos-de-uso" },
  { label: "Privacidade", href: "/privacidade" },
];

export function Footer() {
  return (
    <footer className="footer-shell border-t" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="footer-main grid gap-10 border-b pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          {/* Brand column */}
          <div className="footer-brand">
            <Link
              href="/"
              aria-label="Prisma News — Página inicial"
              className="mb-3 inline-flex items-center gap-3"
            >
              <Image
                src="/logo.svg"
                alt="Logo Prisma News"
                width={34}
                height={34}
                className="h-9 w-auto object-contain"
              />
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Prisma <span className="text-purple-500">News</span>
              </span>
            </Link>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-slate-600">
              Inteligência editorial para quem quer entender os fatos — não
              apenas a versão do algoritmo.
            </p>
            <StoreButtons location="footer" compact className="mb-5" />
            <a
              href="https://www.instagram.com/prismanewsoficial/"
              aria-label="Instagram @prismanewsoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-instagram inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-colors"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
              </svg>
              @prismanewsoficial
            </a>
          </div>

          <nav className="footer-legal md:pt-2" aria-label="Links legais">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Informações legais
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-legal-link inline-flex rounded-md py-1 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
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
