import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Canal de suporte do Prisma News para dúvidas sobre conteúdo, bugs e questionamentos de classificação política.",
  alternates: {
    canonical: `${SITE_URL}/suporte`,
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE_URL}/suporte`,
    title: "Suporte — Prisma News",
    description:
      "Entre em contato com o suporte do Prisma News para dúvidas, bugs e questionamentos sobre classificações.",
    siteName: "Prisma News",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.18),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.14),transparent_34%),#060111]">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-purple-700/50 bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:border-purple-500 hover:text-white"
        >
          Voltar para a página inicial
        </Link>

        <article className="mt-6 rounded-2xl border border-purple-800/30 bg-surface-card/90 p-6 text-slate-100 shadow-[0_8px_40px_rgba(5,2,18,0.5)] backdrop-blur sm:p-8 lg:p-10">
          <header className="border-b border-purple-900/35 pb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Suporte
            </h1>
            <p className="mt-3 text-sm text-purple-200">
              <strong>Última atualização:</strong> 05/08/2026
            </p>
          </header>

          <section className="mt-6">
            <p className="leading-relaxed text-slate-200">
              Qualquer dúvida sobre conteúdo, relato de bugs dentro do app ou questionamento sobre
              alguma classificação de veículo político deve ser encaminhada para{" "}
              <a
                href="mailto:suporteprismanews@gmail.com"
                className="font-semibold text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200"
              >
                suporteprismanews@gmail.com
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
