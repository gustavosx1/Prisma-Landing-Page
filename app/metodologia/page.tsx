import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  title: "Metodologia Prisma",
  description:
    "Entenda como o Prisma calcula o espectro dos veículos, quais critérios são analisados e quais são as limitações da metodologia.",
  alternates: {
    canonical: `${SITE_URL}/metodologia`,
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE_URL}/metodologia`,
    title: "Metodologia Prisma — Prisma News",
    description:
      "Transparência sobre como calculamos o espectro dos veículos e quais são os limites dessa classificação.",
    siteName: "Prisma News",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const methodologySections = [
  {
    title: "Como classificamos os veículos",
    content: (
      <p>
        A posição de cada veículo no espectro (0 a 100) é calculada a partir da análise automatizada, por inteligência
        artificial, da linguagem usada nos artigos publicados — não é uma avaliação sobre a veracidade das informações
        reportadas, nem uma opinião do Prisma sobre a qualidade jornalística do veículo.
      </p>
    ),
  },
  {
    title: "O que é analisado",
    content: (
      <p>
        Para cada artigo, a IA avalia, sem saber de qual veículo o texto veio, padrões de carga emocional das palavras,
        seleção e diversidade das fontes citadas, e enquadramento da pauta. A partir dessas dimensões, cada artigo
        recebe uma nota individual.
      </p>
    ),
  },
  {
    title: "Como chegamos na nota do veículo",
    content: (
      <p>
        A nota final de um veículo é a mediana das notas dos artigos analisados nos últimos 6 meses, exigindo um mínimo
        de 200 artigos válidos. Enquanto a classificação estiver pendente — inclusive quando a amostra for insuficiente
        — o veículo fica em avaliação e não é exibido no app. Ele passa a aparecer após a conclusão da classificação.
      </p>
    ),
  },
  {
    title: "Como interpretamos a nota no app",
    content: (
      <p>
        Usamos três faixas fixas para leitura editorial: abaixo de 40 = esquerda, entre 40 e 60 = centro, acima de 60 =
        direita. Não usamos categorias separadas de centro-esquerda ou centro-direita.
      </p>
    ),
  },
  {
    title: "Limitações conhecidas",
    content: (
      <p>
        Classificação automatizada por IA está sujeita a erro e inconsistência. Um espectro linear de 0 a 100 é uma
        simplificação da realidade política, que é multidimensional. Além disso, reconhecemos que um veículo é resultado
        da soma dos profissionais que nele trabalham, então esta nota está sujeita a variações futuras. Esta nota reflete
        padrões linguísticos identificados nos textos analisados, não uma medição objetiva e definitiva de
        posicionamento político.
      </p>
    ),
  },
];

export default function MethodologyPage() {
  return (
    <main className="legal-page min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.18),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.14),transparent_34%),#060111]">
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-purple-700/50 bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:border-purple-500 hover:text-white"
        >
          Voltar para a página inicial
        </Link>

        <article className="mt-6 rounded-2xl border border-purple-800/30 bg-surface-card/90 p-6 text-slate-100 shadow-[0_8px_40px_rgba(5,2,18,0.5)] backdrop-blur sm:p-8 lg:p-10">
          <header className="border-b border-purple-900/35 pb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Metodologia Prisma
            </h1>
            <p className="mt-3 text-sm text-purple-200">
              <strong>Versão da metodologia:</strong> v1.0.0 · <strong>Última atualização:</strong> 15 de julho de 2026
            </p>
            <p className="mt-4 leading-relaxed text-slate-200">
              Transparência sobre como calculamos o espectro dos veículos.
            </p>
          </header>

          <section className="mt-8 space-y-8">
            {methodologySections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <div className="mt-3 leading-relaxed text-slate-200">{content}</div>
              </div>
            ))}

            <div>
              <h2 className="text-2xl font-bold text-white">Contestação</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Nossa classificação segue critérios metodológicos consistentes e não é alterada a pedido do próprio
                veículo. Se um veículo preferir não fazer parte do Prisma, pode solicitar sua retirada pelo e-mail{" "}
                <a
                  href="mailto:suporteprismanews@gmail.com"
                  className="font-semibold text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200"
                >
                  suporteprismanews@gmail.com
                </a>
                .
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}