import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  title: "Excluir Conta",
  description:
    "Saiba como excluir sua conta no app Prisma News no fluxo login, perfil e deletar usuário.",
  alternates: {
    canonical: `${SITE_URL}/deletar`,
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE_URL}/deletar`,
    title: "Como Excluir Sua Conta — Prisma News",
    description:
      "Passo a passo para excluir sua conta no Prisma News pelo próprio aplicativo.",
    siteName: "Prisma News",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const steps = [
  "Abra o app Prisma News e faça login com sua conta.",
  "Acesse a página de perfil na barra de navegação inferior (Ícone de usuário no canto inferior direito da tela).",
  "Role até a seção de conta e toque em Deletar usuário.",
  "Confirme a exclusão quando o app solicitar confirmação final.",
];

export default function DeleteAccountPage() {
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
              Como excluir sua conta
            </h1>
            <p className="mt-3 text-sm text-purple-200">
              <strong>Última atualização:</strong> 03/08/2026
            </p>
            <p className="mt-4 leading-relaxed text-slate-200">
              Esta página explica como excluir sua conta no aplicativo Prisma News.
            </p>
          </header>

          <section className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Fluxo de exclusão</h2>
              <p className="mt-2 text-slate-300">login - página de perfil - deletar usuário</p>

              <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-200 marker:font-semibold marker:text-purple-300">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-purple-800/35 bg-purple-950/25 p-4 text-sm leading-relaxed text-slate-300">
              <p>
                Ao excluir a conta, os dados associados ao seu usuário serão removidos conforme nossa
                política de privacidade e exigências legais aplicáveis.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Precisa de ajuda?</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Se você não conseguir excluir sua conta pelo app, envie um e-mail para{" "}
                <a
                  href="mailto:suporteprismanews@gmail.com"
                  className="font-semibold text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200"
                >
                  suporteprismanews@gmail.com
                </a>{" "}
                com o assunto &quot;Exclusão de conta&quot;.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
