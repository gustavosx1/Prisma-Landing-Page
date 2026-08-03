import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Spectrum (Prisma News), em conformidade com a LGPD.",
  alternates: {
    canonical: `${SITE_URL}/privacidade`,
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE_URL}/privacidade`,
    title: "Política de Privacidade — Prisma News",
    description:
      "Entenda como coletamos, usamos e protegemos seus dados no Spectrum, em conformidade com a LGPD.",
    siteName: "Prisma News",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const legalBases = [
  "Execução de contrato (art. 7º, V) — para fornecer a assinatura premium",
  "Legítimo interesse (art. 7º, IX) — para melhorias do serviço e segurança",
  "Consentimento (art. 7º, I) — quando aplicável, como em comunicações opcionais",
];

const dataRights = [
  "Confirmação da existência de tratamento de dados",
  "Acesso aos seus dados",
  "Correção de dados incompletos ou desatualizados",
  "Anonimização, bloqueio ou eliminação de dados desnecessários",
  "Portabilidade de dados",
  "Eliminação dos dados tratados com base em consentimento",
  "Revogação do consentimento",
];

const thirdParties = [
  {
    name: "Supabase",
    purpose: "Armazenamento de banco de dados e autenticação",
    data: "E-mail, preferências de conta",
  },
  {
    name: "Google Gemini API",
    purpose: "Processamento de IA para classificação de notícias",
    data: "Conteúdo jornalístico agregado",
  },
  {
    name: "RevenueCat",
    purpose: "Gerenciamento de assinaturas premium",
    data: "Status de assinatura, identificador de usuário",
  },
  {
    name: "Google Play / Apple App Store",
    purpose: "Processamento de pagamento e cobrança",
    data: "Dados de pagamento (tratados exclusivamente pela loja)",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.18),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.14),transparent_34%),#060111]">
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
              Política de Privacidade — Prisma News
            </h1>
            <p className="mt-3 text-sm text-purple-200">
              <strong>Última atualização:</strong> 03/08/2026
            </p>
            <p className="mt-4 leading-relaxed text-slate-200">
              Esta Política de Privacidade descreve como o aplicativo <strong>Spectrum</strong>
              (&quot;nós&quot;, &quot;aplicativo&quot;), operado por <strong>GUSTAVO DOS SANTOS BANDEIRA ROCHA</strong>,
              CNPJ <strong>67.897.516/0001-51</strong>, coleta, usa, armazena e protege os dados de
              quem utiliza o serviço, em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018 — LGPD).
            </p>
            <p className="mt-3 leading-relaxed text-slate-200">
              Ao usar o Spectrum, você concorda com os termos descritos aqui.
            </p>
          </header>

          <section className="mt-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">1. Quem é o responsável pelos seus dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                <strong>Controlador:</strong> GUSTAVO DOS SANTOS BANDEIRA ROCHA, MEI, São Luís — MA,
                Brasil
                <br />
                <strong>Contato:</strong>{" "}
                <a
                  href="mailto:suporteprismanews@gmail.com"
                  className="text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200"
                >
                  suporteprismanews@gmail.com
                </a>
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Você pode entrar em contato pelo e-mail acima para dúvidas sobre esta política ou para
                exercer seus direitos como titular de dados.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">2. Quais dados coletamos</h2>
              <h3 className="mt-4 text-xl font-semibold text-purple-200">2.1 Uso básico do aplicativo (sem conta)</h3>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Spectrum pode ser utilizado sem necessidade de cadastro para consultar notícias
                agregadas e suas classificações no espectro político e no Factômetro. Nesse modo, não
                coletamos dados pessoais identificáveis, apenas dados técnicos mínimos necessários ao
                funcionamento (ex.: identificador de instalação, versão do app, sistema operacional),
                usados apenas para diagnóstico e estabilidade.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-purple-200">2.2 Cadastro para recursos premium</h3>
              <p className="mt-3 leading-relaxed text-slate-200">Caso você opte por assinar recursos premium, coletamos:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>E-mail (para criação e autenticação de conta)</li>
                <li>Status e histórico da assinatura (gerenciado pelas lojas de aplicativo, ver seção 4)</li>
                <li>Preferências de uso dentro do app (ex.: fontes favoritas, filtros salvos), se aplicável</li>
              </ul>
              <p className="mt-3 leading-relaxed text-slate-200">
                Não coletamos dados de cartão de crédito ou informações financeiras diretamente. Todo o
                processamento de pagamento é feito pela Google Play e/ou Apple App Store.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-purple-200">2.3 Dados processados por inteligência artificial</h3>
              <p className="mt-3 leading-relaxed text-slate-200">
                Para gerar a classificação de espectro político e o Factômetro, o conteúdo das notícias
                agregadas (texto público de veículos de imprensa) é processado por meio da API do Gemini
                (Google). Esse processamento é feito sobre o conteúdo jornalístico em si, não sobre dados
                pessoais do usuário.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">3. Como usamos os dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">Usamos os dados coletados para:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>Viabilizar o funcionamento do aplicativo e da conta premium</li>
                <li>Processar e validar assinaturas junto às lojas</li>
                <li>Melhorar a precisão do sistema de classificação e fact-checking</li>
                <li>Comunicar mudanças relevantes no serviço (ex.: e-mails transacionais)</li>
                <li>Cumprir obrigações legais e responder a solicitações de autoridades, quando exigido</li>
              </ul>
              <p className="mt-3 leading-relaxed text-slate-200">Não vendemos dados pessoais a terceiros.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">4. Compartilhamento com terceiros</h2>
              <div className="mt-4 overflow-x-auto rounded-xl border border-purple-800/40 bg-[#0a0320]">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-purple-900/30 text-purple-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Terceiro</th>
                      <th className="px-4 py-3 font-semibold">Finalidade</th>
                      <th className="px-4 py-3 font-semibold">Dados envolvidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thirdParties.map((party) => (
                      <tr key={party.name} className="border-t border-purple-900/30">
                        <td className="px-4 py-3 font-medium text-white">{party.name}</td>
                        <td className="px-4 py-3 text-slate-200">{party.purpose}</td>
                        <td className="px-4 py-3 text-slate-200">{party.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 leading-relaxed text-slate-200">
                Alguns desses serviços podem armazenar ou processar dados em servidores fora do Brasil
                (transferência internacional de dados), sempre observando padrões de proteção compatíveis
                com a LGPD.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Podemos adicionar futuramente ferramentas de analytics (ex.: Firebase Analytics) para
                entender uso agregado do app. Caso isso ocorra, esta política será atualizada antes da
                mudança entrar em vigor.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">5. Base legal (LGPD)</h2>
              <p className="mt-3 leading-relaxed text-slate-200">Tratamos dados pessoais com base em:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                {legalBases.map((base) => (
                  <li key={base}>{base}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">6. Seus direitos como titular de dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Conforme os artigos 17 a 22 da LGPD, você pode solicitar, a qualquer momento:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                {dataRights.map((right) => (
                  <li key={right}>{right}</li>
                ))}
              </ul>
              <p className="mt-3 leading-relaxed text-slate-200">
                Solicitações podem ser feitas pelo e-mail informado na seção 1. Responderemos dentro do
                prazo legal aplicável.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">7. Retenção e exclusão de dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Mantemos dados de conta enquanto a assinatura estiver ativa ou enquanto for necessário
                para cumprir obrigações legais. Você pode solicitar a exclusão da sua conta e dados
                associados a qualquer momento pelo contato acima.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">8. Crianças e adolescentes</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Spectrum não é direcionado a menores de 18 anos e não coletamos intencionalmente dados
                de menores de 13 anos. Caso identifiquemos coleta acidental de dados de uma criança,
                tomaremos medidas para excluí-los.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">9. Segurança</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra
                acesso não autorizado, perda ou alteração, incluindo autenticação segura e criptografia
                em trânsito.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">10. Alterações nesta política</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Podemos atualizar esta Política de Privacidade periodicamente. Alterações relevantes serão
                comunicadas dentro do aplicativo ou por e-mail, quando aplicável. A data da última
                atualização estará sempre no topo deste documento.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">11. Contato</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Dúvidas, solicitações ou reclamações sobre esta política:{" "}
                <a
                  href="mailto:suporteprismanews@gmail.com"
                  className="font-semibold text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200"
                >
                  suporteprismanews@gmail.com
                </a>
              </p>
            </div>

            <div className="rounded-xl border border-purple-800/35 bg-purple-950/25 p-4 text-sm leading-relaxed text-slate-300">
              <p>
                Se você não concordar com esta política, recomendamos interromper o uso dos recursos que
                envolvem tratamento de dados pessoais. O uso contínuo após atualizações desta política
                será interpretado como ciência dos novos termos.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
