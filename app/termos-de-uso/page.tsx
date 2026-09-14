import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  title: "Termos de Uso — Prisma News",
  description:
    "Termos de Uso do Prisma News, incluindo acesso ao conteúdo gratuito e premium, assinaturas, cobrança e regras de uso.",
  alternates: {
    canonical: `${SITE_URL}/termos-de-uso`,
  },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE_URL}/termos-de-uso`,
    title: "Termos de Uso — Prisma News",
    description:
      "Leia os Termos de Uso do Prisma News e entenda regras, assinatura premium, cancelamento e uso do aplicativo.",
    siteName: "Prisma News",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  const summaryBullets = [
    "O Prisma News oferece conteúdo gratuito e premium, com acesso por conta e assinatura recorrente.",
    "Ao usar o app, você aceita estes Termos de Uso e a Política de Privacidade do serviço.",
    "A assinatura premium pode ser mensal ou anual, com renovação automática conforme a loja de aplicativos.",
    "Os preços e condições de assinatura são definidos pela Apple App Store e Google Play, conforme o dispositivo.",
    "Você pode cancelar a renovação automática diretamente na loja em que adquiriu a assinatura.",
    "O conteúdo do app é editorial, informativo e não substitui orientação profissional ou aconselhamento específico.",
    "Você deve usar o app de forma responsável e não pode copiar, reproduzir, explorar ou distribuir conteúdo sem autorização.",
    "Podemos suspender ou encerrar contas em casos de violação desses termos, uso indevido ou risco ao serviço."
  ];

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
              Termos de Uso — Prisma News
            </h1>

            <div className="mt-4 rounded-xl border border-purple-800/40 bg-[#120920] p-4 text-sm text-slate-200">
              <p><strong>Última atualização:</strong> 14/09/2026</p>
              <p className="mt-1"><strong>Versão:</strong> 1.0.0</p>
              <p className="mt-1"><strong>Titular do serviço:</strong> GUSTAVO DOS SANTOS BANDEIRA ROCHA</p>
              <p className="mt-1"><strong>CNPJ:</strong> 67.897.516/0001-51</p>
              
            </div>

            <p className="mt-4 leading-relaxed text-slate-200">
              Estes Termos de Uso regem o uso do aplicativo <strong>Prisma News</strong> e dos serviços
              disponibilizados por meio dele. Ao acessar ou usar o aplicativo, o usuário confirma que leu,
              compreendeu e aceita estas regras, bem como a <a href="/privacidade" className="text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200">Política de Privacidade</a>.
            </p>
          </header>

          <section className="mt-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">1. Aceitação dos Termos</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Estes Termos de Uso constituem um acordo entre o usuário e o titular do serviço do Prisma News.
                Ao criar uma conta, acessar o aplicativo, utilizar recursos gratuitos ou adquirir uma assinatura
                Premium, o usuário concorda com as condições aqui previstas.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Se o usuário não concordar com qualquer parte destes Termos, deve interromper imediatamente o uso do
                aplicativo e não utilizar os recursos pagos ou vinculados à conta.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">2. Elegibilidade e criação de conta</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Para utilizar o Prisma News, o usuário deve ter capacidade civil para contratar, conforme a legislação
                aplicável. O acesso pode ser realizado por e-mail e senha, login com Google ou Sign in with Apple,
                conforme os métodos disponibilizados no aplicativo.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>O usuário deve fornecer informações verdadeiras, completas e atualizadas durante o cadastro.</li>
                <li>É responsabilidade do usuário manter a segurança de sua conta, senha, credenciais de login e dispositivos autorizados.</li>
                <li>O uso da conta é pessoal e intransferível, salvo quando a plataforma de login permitir a associação a uma conta específica.</li>
                <li>O titular do serviço pode suspender ou encerrar acessos que sejam usados de forma indevida, fraudulenta ou incompatível com estes Termos.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">3. Descrição do serviço</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Prisma News é uma plataforma de conteúdo editorial e informativo, disponível para dispositivos móveis
                iOS e Android. O serviço pode incluir conteúdos gratuitos, conteúdos exclusivos para assinantes e
                funcionalidades de acesso, personalização, alertas, notificações e experiência de leitura.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O acesso ao conteúdo pode variar conforme a disponibilidade do plano adquirido, a conta do usuário e as
                regras da loja de aplicativos. O serviço pode disponibilizar conteúdo em formatos diferentes e pode
                incorporar melhorias, atualizações e novas funcionalidades ao longo do tempo.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">4. Assinaturas e cobrança</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Prisma News pode oferecer acesso a conteúdos e recursos Premium por meio de assinatura recorrente.
                A assinatura pode ser disponibilizada em diferentes periodicidades, como mensal ou anual, conforme a
                oferta ativa na loja em que a compra foi realizada.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>Os preços, condições de oferta, periodicidade e disponibilidade dos planos são definidos pela Apple App Store ou Google Play.</li>
                <li>A cobrança é processada exclusivamente pela loja de aplicativos e não diretamente pelo aplicativo, salvo quando expressamente informado.</li>
                <li>A assinatura é renovada automaticamente ao fim de cada ciclo, a menos que o usuário a cancele antes do vencimento do período vigente.</li>
                <li>O valor da assinatura pode ser alterado por decisão da loja ou do titular do serviço, conforme as regras da plataforma e as notificações aplicáveis.</li>
                <li>Testes gratuitos, descontos, promoções ou ofertas especiais, quando disponíveis, estarão sujeitos às condições específicas informadas na compra.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-slate-200">
                O usuário reconhece que ao iniciar uma assinatura, entende que a cobrança será feita de acordo com o
                método de pagamento habilitado na loja de aplicativos e de acordo com as políticas daquela plataforma.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">5. Cancelamento e gerenciamento da assinatura</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O cancelamento da renovação automática deve ser realizado pelo usuário diretamente na App Store ou no
                Google Play, conforme a plataforma de aquisição da assinatura.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>O cancelamento impede a renovação automática para o próximo ciclo, mas não reembolsa automaticamente o período já pago.</li>
                <li>Se a assinatura for cancelada, o usuário continuará com acesso Premium até o fim do período de cobrança já pago e vigente.</li>
                <li>O aplicativo pode disponibilizar funcionalidade de restauração de compras para permitir a recuperação de compras válidas, conforme as regras da loja e o status do usuário.</li>
                <li>O usuário também pode gerenciar a assinatura por meio das configurações da conta na loja de aplicativos, conforme a plataforma utilizada.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">6. Reembolsos</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Eventuais solicitações de reembolso serão tratadas conforme a política de reembolso da Apple App Store
                ou do Google Play, na medida em que a compra tenha sido realizada por meio dessas plataformas.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O titular do serviço não decide unilateralmente sobre reembolsos de compras realizadas em lojas de
                aplicativos, salvo quando a própria política da loja e a legislação aplicável exigirem alguma ação
                específica. O usuário deve entrar em contato com a loja de aplicativos para solicitar análise e,
                quando aplicável, devolução do valor.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">7. Uso permitido e condutas proibidas</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O usuário deve utilizar o Prisma News de forma responsável, respeitando as regras destes Termos, as
                políticas da plataforma e a legislação vigente. O uso do aplicativo não pode ser destinado a fins
                ilegais, fraudulentos, abusivos, discriminatórios ou que causem prejuízo ao serviço, a outros usuários
                ou ao titular do serviço.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>Não é permitido copiar, reproduzir, redistribuir, vender, sublicenciar, extrair ou reutilizar conteúdo do app sem autorização.</li>
                <li>Não é permitido tentar acessar áreas do serviço, contas ou dados que não sejam de sua titularidade ou que não sejam autorizados.</li>
                <li>Não é permitido usar o aplicativo para disseminar conteúdo ofensivo, falso, fraudulento, ilícito ou provocativo.</li>
                <li>Não é permitido interferir no funcionamento do app, em integrações, APIs, notificações ou na infraestrutura tecnológica que o suporte.</li>
                <li>Não é permitido criar múltiplas contas para burlar regras, políticas, ofertas ou limitações do serviço.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">8. Propriedade intelectual</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Todo o conteúdo, design, marcas, nomes, logotipos, textos, imagens, gráficos, ícones, estrutura,
                interfaces, algoritmos, códigos-fonte, tecnologias e demais materiais relacionados ao Prisma News são
                de propriedade do titular do serviço ou de terceiros com autorização expressa para uso no aplicativo.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O usuário recebe apenas uma licença limitada e não exclusiva para uso pessoal do app, conforme os
                termos destes documentos. Qualquer reprodução, cópia, redistribuição, alteração, extração ou uso
                comercial sem autorização prévia e expressa é proibida.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">9. Conteúdo editorial e isenção de responsabilidade</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O conteúdo disponibilizado no Prisma News é de natureza editorial e informativa. Ele tem como objetivo
                fornecer informações, contexto e análise sobre temas relevantes, mas não configura aconselhamento
                profissional, jurídico, financeiro, médico, psicológico, contábil, de investimento ou qualquer outra
                especialidade específica.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O conteúdo não deve ser interpretado como substituição de orientação qualificada de um profissional
                habilitado. O usuário deve buscar assessoria adequada antes de tomar decisões com impacto relevante em
                sua vida pessoal, profissional ou financeira. O titular do serviço não se responsabiliza por decisões
                tomadas com base exclusivamente no conteúdo do app.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">10. Suspensão e encerramento de conta</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O titular do serviço pode, a seu critério, suspender temporariamente ou encerrar definitivamente a
                conta do usuário quando houver violação destes Termos, uso fraudulento, atividade que ameace a
                segurança do serviço, descumprimento de políticas aplicáveis, ou qualquer conduta que comprometa a
                operação, integridade, reputação ou estabilidade do aplicativo.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Em caso de encerramento, o acesso à conta e aos conteúdos vinculados poderá ser limitado ou cessado,
                sem prejuízo de medidas legais cabíveis ou da necessidade de manutenção de dados conforme a legislação
                aplicável e a Política de Privacidade.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">11. Limitação de responsabilidade</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Prisma News busca manter o serviço funcional, acessível e seguro, mas não garante que o app esteja
                sempre livre de falhas, interrupções, indisponibilidades, erros de conteúdo, defeitos de software ou
                indisponibilidade temporária de rede, servidores ou fornecedores terceiros.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Na medida do permitido pela legislação aplicável, o titular do serviço não será responsável por danos
                indiretos, consequentes, especiais, incidentais ou lucros cessantes decorrentes do uso ou da impossibilidade
                de uso do aplicativo, incluindo prejuízos relacionados a disponibilidade, dados, perda de conteúdo ou
                interrupções do serviço.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">12. Privacidade e dados</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O uso do Prisma News está sujeito à nossa <a href="/privacidade" className="text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200">Política de Privacidade</a>, que explica quais dados são coletados, como são utilizados,
                com quem podem ser compartilhados e quais são os direitos do usuário em relação aos seus dados pessoais.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O aplicativo pode enviar notificações push, mediante autorização do usuário e conforme as configurações do
                dispositivo e da plataforma. O usuário pode gerenciar a permissão de notificações em seu aparelho.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">13. Alterações dos Termos</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O titular do serviço pode atualizar estes Termos periodicamente para refletir melhorias no serviço,
                ajustes operacionais, requisitos legais, mudanças de políticas de plataformas de distribuição ou novas
                funcionalidades. Alterações relevantes poderão ser comunicadas dentro do aplicativo, por e-mail ou por
                outros canais disponíveis.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O uso contínuo do aplicativo após a publicação de uma atualização constitui aceitação das novas condições,
                salvo quando a lei ou as plataformas exigirem um procedimento específico para consentimento ou notificação.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">14. Contato e suporte</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Para dúvidas, solicitações de suporte, informações sobre a conta, assinatura, cancelamento, cobrança ou
                qualquer questão relacionada a estes Termos, entre em contato pelo e-mail:
                <br />
                <a
                  href="mailto:suporteprismanews@gmail.com"
                  className="mt-2 inline-block font-semibold text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200"
                >
                  suporteprismanews@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">15. Lei aplicável e foro</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Estes Termos serão regidos e interpretados pela legislação aplicável ao serviço, incluindo as normas
                relacionadas a contratos digitais, consumo e proteção de dados, quando cabíveis. Em caso de controvérsia,
                as partes poderão buscar solução amigável antes de recorrer à via judicial.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Para fins de determinação da competência, fica definido o foro de [CIDADE/ESTADO], [PAÍS], salvo regra
                específica de proteção ao consumidor, legislação aplicável ou exigência de foro obrigatório.
              </p>
            </div>

            <div className="rounded-xl border border-purple-800/35 bg-purple-950/25 p-4 text-sm leading-relaxed text-slate-300">
              <p>
                Ao continuar usando o Prisma News, você confirma que leu, compreendeu e concorda com estes Termos de Uso.
                Caso tenha dúvidas, entre em contato por e-mail antes de prosseguir com o uso do serviço.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Resumo para a loja</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                {summaryBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-purple-800/35 bg-[#10071d] p-4">
              <h2 className="text-2xl font-bold text-white">TL;DR</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>Você aceita estes termos ao usar o Prisma News e ao criar sua conta.</li>
                <li>O app oferece conteúdo gratuito e conteúdo Premium com assinatura recorrente.</li>
                <li>Pagamentos e renovação são gerenciados pela App Store ou Google Play.</li>
                <li>O preço e a disponibilidade dos planos são definidos pela loja.</li>
                <li>Você pode cancelar a renovação na loja de aplicativos.</li>
                <li>O cancelamento mantém o acesso até o fim do ciclo já pago.</li>
                <li>Reembolsos seguem a política da Apple/Google.</li>
                <li>Uso indevido, cópia ou interferência no serviço é proibido.</li>
                <li>O conteúdo é informativo e não substitui aconselhamento profissional.</li>
                <li>Consulte a Política de Privacidade para saber sobre dados e notificações.</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
