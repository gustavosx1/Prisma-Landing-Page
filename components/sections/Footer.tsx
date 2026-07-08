import { Zap } from "lucide-react";

const LINKS = {
  Produto: [
    { label: "Recursos",       href: "#recursos" },
    { label: "Como funciona",  href: "#como-funciona" },
    { label: "Preços",         href: "#precos" },
    { label: "Roadmap",        href: "#roadmap" },
  ],
  Empresa: [
    { label: "Sobre",          href: "#sobre" },
    { label: "Metodologia",    href: "#metodologia" },
    { label: "Blog",           href: "#blog" },
    { label: "Imprensa",       href: "#imprensa" },
  ],
  Legal: [
    { label: "Termos de Uso",  href: "#termos" },
    { label: "Privacidade",    href: "#privacidade" },
    { label: "Cookies",        href: "#cookies" },
    { label: "LGPD",           href: "#lgpd" },
  ],
};

const SOCIALS = [
  { label: "Twitter / X",  href: "https://twitter.com/prismanews",           icon: "𝕏" },
  { label: "Instagram",    href: "https://instagram.com/prismanews",          icon: "◈" },
  { label: "LinkedIn",     href: "https://linkedin.com/company/prismanews",   icon: "in" },
];

export function Footer() {
  return (
    <footer
      className="bg-[#04000f] border-t border-purple-900/30"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <a
              href="/"
              aria-label="Prisma News — Página inicial"
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg text-white">
                Prisma <span className="text-purple-400">News</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Inteligência editorial para quem quer entender os fatos — não
              apenas a versão do algoritmo.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-purple-900/30 border border-purple-800/30 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-600/50 transition-all duration-200 text-sm font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
