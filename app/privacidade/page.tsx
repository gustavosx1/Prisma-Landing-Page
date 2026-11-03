import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do Prisma News, em conformidade com a LGPD.",
  alternates: {
    canonical: `${SITE_URL}/privacidade`,
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE_URL}/privacidade`,
    title: "Política de Privacidade — Prisma News",
    description:
      "Entenda como coletamos, usamos e protegemos seus dados no Prisma News, em conformidade com a LGPD.",
    siteName: "Prisma News",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const legalBases = [
  "Execução de contrato (art. 7º, V) — para fornecer a assinatura premium",
  "Legítimo interesse (art. 7º, IX) — para manter a segurança e o funcionamento do serviço",
  "Legítimo interesse (art. 7º, IX) — para métricas limitadas de visitas e cliques no site, respeitados os direitos e as expectativas dos titulares",
];

const dataRights = [
  "Confirmação da existência de tratamento de dados",
  "Acesso aos seus dados",
  "Correção de dados incompletos ou desatualizados",
  "Anonimização, bloqueio ou eliminação de dados desnecessários",
  "Portabilidade de dados",
  "Eliminação dos dados tratados com base em consentimento",
  "Revogação do consentimento",
  "Oposição a tratamento baseado em hipótese de dispensa de consentimento, quando houver descumprimento da LGPD",
];

const thirdParties = [
  {
    name: "Supabase",
    purpose: "Autenticação e armazenamento de dados do aplicativo; armazenamento de eventos do site quando a integração de analytics estiver configurada",
    data: "No app: e-mail, ID de usuário e token de push. No site: ID pseudônimo, eventos de visita/clique, parâmetros de campanha, user-agent e país informado pela infraestrutura",
  },
  {
    name: "RevenueCat",
    purpose: "Gerenciamento de assinaturas premium",
    data: "ID de usuário, produto Premium, status, renovação e expiração da assinatura",
  },
  {
    name: "Google Play / Apple App Store",
    purpose: "Processamento de pagamento e cobrança",
    data: "Nenhum dado financeiro é recebido pelo aplicativo; o pagamento é tratado exclusivamente pela loja",
  },
];

const appPrivacyData = [
  {
    category: "Endereço de e-mail (Email Address)",
    use: "Criar e autenticar a conta",
    purpose: "Funcionalidade do app (App Functionality)",
  },
  {
    category: "ID de usuário (User ID)",
    use: "Identificar a conta e vincular o perfil Premium e a assinatura",
    purpose: "Funcionalidade do app (App Functionality)",
  },
  {
    category: "ID do dispositivo (Device ID)",
    use: "Associar o token de push do Expo à conta para enviar notificações",
    purpose: "Funcionalidade do app (App Functionality)",
  },
  {
    category: "Histórico de compras (Purchase History)",
    use: "Gerenciar o produto Premium, o status, a renovação e a expiração via RevenueCat",
    purpose: "Funcionalidade do app (App Functionality)",
  },
];

export default function PrivacyPolicyPage() {
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
              Política de Privacidade — Prisma News
            </h1>
            <p className="mt-3 text-sm text-purple-200">
              <strong>Última atualização:</strong> 03/11/2026
            </p>
            <p className="mt-4 leading-relaxed text-slate-200">
              Esta Política descreve o tratamento de dados no aplicativo e no site <strong>Prisma News</strong>
              (&quot;nós&quot;, &quot;serviço&quot;), operado por <strong>GUSTAVO DOS SANTOS BANDEIRA ROCHA</strong>,
              CNPJ <strong>67.897.516/0001-51</strong>, coleta, usa, armazena e protege os dados de
              quem utiliza o serviço, em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018 — LGPD).
            </p>
            <p className="mt-3 leading-relaxed text-slate-200">
              O uso do serviço não substitui as bases legais aplicáveis a cada operação de tratamento. Esta Política
              explica quais dados são tratados, para quais finalidades e como exercer seus direitos.
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
              <p className="mt-3 leading-relaxed text-slate-200">
                O tratamento varia conforme você use o aplicativo ou o site. No aplicativo, podemos tratar:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li><strong>E-mail:</strong> para criação e autenticação da conta.</li>
                <li><strong>ID de usuário:</strong> para identificar a conta e vinculá-la ao perfil Premium e à assinatura.</li>
                <li><strong>ID do dispositivo:</strong> o token de push do Expo, armazenado no backend e associado ao ID de usuário para o envio de notificações.</li>
                <li><strong>Histórico de compras:</strong> produto Premium, status, renovação e expiração da assinatura, gerenciados via RevenueCat.</li>
              </ul>
              <h3 className="mt-6 text-xl font-semibold text-purple-200">2.1 Dados tratados no site</h3>
              <p className="mt-3 leading-relaxed text-slate-200">
                Para medir visitas e cliques nos links das lojas e avaliar campanhas, o site gera um identificador
                pseudônimo no armazenamento local do navegador e registra, quando disponíveis, parâmetros de campanha
                (utm_source, utm_medium, utm_campaign e utm_content), tipo de evento e loja selecionada. A solicitação
                ao servidor também pode incluir user-agent e país aproximado fornecido pela infraestrutura de hospedagem.
                O evento pode ser armazenado no Supabase quando a integração de analytics estiver configurada. O ID
                pseudônimo não é usado para identificar diretamente seu nome, mas continua tratado como dado pessoal
                quando puder ser associado a você.
              </p>
              <h3 className="mt-6 text-xl font-semibold text-purple-200">2.2 Dados que não coletamos</h3>
              <p className="mt-3 leading-relaxed text-slate-200">
                Não coletamos informações de pagamento ou cartão, dados sensíveis ou localização precisa do dispositivo,
                contatos, fotos, histórico individual de buscas, relatórios de falha ou dados para publicidade
                direcionada. No site, os eventos limitam-se às métricas descritas nesta Política e não incluem o
                conteúdo de buscas.
              </p>

              <h3 className="mt-6 text-xl font-semibold text-purple-200">2.3 Pagamentos</h3>
              <p className="mt-3 leading-relaxed text-slate-200">
                Não recebemos nem armazenamos dados financeiros ou de cartão. Todo o processamento de
                pagamento é realizado pela Apple App Store e/ou Google Play.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">3. Como usamos os dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">Usamos os dados para:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>Criar, autenticar e identificar a conta</li>
                <li>Viabilizar os recursos Premium e verificar o estado da assinatura</li>
                <li>Enviar notificações por meio do token de push associado à conta</li>
                <li>Entender, de forma pseudônima, o uso do site, medir cliques nos links das lojas e avaliar campanhas de divulgação</li>
                <li>Cumprir obrigações legais e responder a solicitações de autoridades, quando exigido</li>
              </ul>
              <p className="mt-3 leading-relaxed text-slate-200">
                Não vendemos dados pessoais nem fazemos publicidade direcionada. O aplicativo não usa os dados da
                tabela seguinte para rastreamento entre apps ou sites; o site realiza as métricas pseudônimas acima.
                Você pode se opor ao tratamento baseado em legítimo interesse pelo contato indicado nesta Política.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">4. Declaração de privacidade do app</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Esta tabela descreve somente os dados do aplicativo e suas finalidades. Ela não descreve o analytics
                do site, detalhado na seção 2.1.
              </p>
              <div className="legal-table-wrap mt-4 overflow-x-auto rounded-xl border border-purple-800/40 bg-[#0a0320]">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-purple-900/30 text-purple-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Categoria Apple</th>
                      <th className="px-4 py-3 font-semibold">Uso</th>
                      <th className="px-4 py-3 font-semibold">Finalidade</th>
                      <th className="px-4 py-3 font-semibold">Vinculado ao usuário</th>
                      <th className="px-4 py-3 font-semibold">Rastreamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appPrivacyData.map((data) => (
                      <tr key={data.category} className="border-t border-purple-900/30">
                        <td className="px-4 py-3 font-medium text-white">{data.category}</td>
                        <td className="px-4 py-3 text-slate-200">{data.use}</td>
                        <td className="px-4 py-3 text-slate-200">{data.purpose}</td>
                        <td className="px-4 py-3 text-slate-200">Sim</td>
                        <td className="px-4 py-3 text-slate-200">Não</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">5. Compartilhamento com terceiros</h2>
              <div className="legal-table-wrap mt-4 overflow-x-auto rounded-xl border border-purple-800/40 bg-[#0a0320]">
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
                Alguns desses serviços podem armazenar ou processar dados fora do Brasil. Quando houver transferência
                internacional, ela deverá observar uma hipótese autorizadora e as garantias previstas na LGPD e na
                regulamentação aplicável. As localidades e salvaguardas específicas dependem dos serviços e da
                configuração efetivamente utilizada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">6. Base legal (LGPD)</h2>
              <p className="mt-3 leading-relaxed text-slate-200">Tratamos dados pessoais com base em:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                {legalBases.map((base) => (
                  <li key={base}>{base}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">7. Seus direitos como titular de dados</h2>
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
              <h2 className="text-2xl font-bold text-white">8. Retenção e exclusão de dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Mantemos dados de conta enquanto necessários para prestar o serviço e, após o encerramento, pelo tempo
                necessário para cumprir obrigações legais, exercer direitos ou resolver disputas. Eventos do site são
                mantidos para análise operacional pelo período necessário às finalidades informadas e podem ser
                eliminados ou agregados. Você pode solicitar a exclusão pelo contato acima; alguns dados poderão ser
                conservados quando a lei autorizar ou exigir.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">9. Crianças e adolescentes</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Prisma News não é destinado a menores de 18 anos. Se soubermos que uma conta pertence a pessoa
                menor de idade, poderemos restringir o acesso e tomar medidas para excluir os dados, observadas as
                obrigações legais e o melhor interesse da criança ou do adolescente. Responsáveis podem nos contatar
                pelo e-mail desta Política.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">10. Segurança</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra
                acesso não autorizado, perda ou alteração, incluindo autenticação segura e criptografia
                em trânsito.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">11. Alterações nesta política</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Podemos atualizar esta Política para refletir mudanças no tratamento ou na lei. A versão atual e a
                data estarão nesta página; mudanças relevantes serão comunicadas por meio adequado. O uso contínuo,
                por si só, não substitui consentimento quando ele for exigido por lei.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">12. Contato</h2>
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
                Se você tiver dúvidas ou quiser exercer seus direitos, fale conosco pelo canal informado nesta
                Política. O tratamento continuará limitado às finalidades e bases legais aqui descritas e àquilo que
                a legislação exigir.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
