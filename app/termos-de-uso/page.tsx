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
    "A assinatura Premium mensal custa R$ 9,90, com renovação automática conforme as condições da loja de aplicativos.",
    "Os preços e condições de assinatura são definidos pela Apple App Store e Google Play, conforme o dispositivo.",
    "Você pode cancelar a renovação automática diretamente na loja em que adquiriu a assinatura.",
    "Os direitos legais do consumidor, inclusive o direito de arrependimento quando aplicável, são preservados.",
    "O conteúdo do app é editorial, informativo e não substitui orientação profissional ou aconselhamento específico.",
    "Você deve usar o app de forma responsável e não pode copiar, reproduzir, explorar ou distribuir conteúdo sem autorização.",
    "Podemos suspender ou encerrar contas em casos de violação desses termos, uso indevido ou risco ao serviço."
  ];

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
              Termos de Uso — Prisma News
            </h1>

            <div className="mt-4 rounded-xl border border-purple-800/40 bg-[#120920] p-4 text-sm text-slate-200">
              <p><strong>Última atualização:</strong> 03/11/2026</p>
              <p className="mt-1"><strong>Versão:</strong> 1.1.0</p>
              <p className="mt-1"><strong>Titular do serviço:</strong> GUSTAVO DOS SANTOS BANDEIRA ROCHA</p>
              <p className="mt-1"><strong>CNPJ:</strong> 67.897.516/0001-51</p>
              
            </div>

            <p className="mt-4 leading-relaxed text-slate-200">
              Estes Termos regem o aplicativo Prisma News e os serviços digitais nele oferecidos pelo titular
              identificado acima. A contratação de assinatura é concluída pela loja de aplicativos, que também
              apresenta as condições comerciais finais. Leia estes Termos e a <a href="/privacidade" className="text-purple-300 underline decoration-purple-500/70 underline-offset-2 hover:text-purple-200">Política de Privacidade</a> antes de usar os recursos.
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
                A conta e a contratação de recursos pagos destinam-se a pessoas com capacidade civil para contratar.
                O serviço não é direcionado a menores de 18 anos. Os métodos de acesso disponíveis podem variar entre
                o aplicativo e o site.
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
                iOS e Android e, em parte, pela web. O serviço pode incluir conteúdos gratuitos, recursos Premium,
                funcionalidades de conta, alertas, notificações e ferramentas de leitura e comparação de perspectivas.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O acesso depende do plano contratado, do estado da assinatura confirmado pela loja e da disponibilidade
                técnica do serviço. As funcionalidades podem ser corrigidas ou atualizadas. Não prometemos disponibilidade
                ininterrupta; indisponibilidades não afastam direitos e soluções previstos em lei.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">4. Assinaturas e cobrança</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O Prisma News pode oferecer acesso a conteúdos e recursos Premium por assinatura recorrente. O plano
                mensal de referência é R$ 9,90; preço, período, tributos, eventual oferta, renovação e demais condições
                efetivamente aplicáveis devem ser conferidos na tela de compra da Apple App Store ou Google Play antes
                da confirmação. Em caso de divergência, prevalecem as condições mostradas pela loja para aquela compra,
                sem prejuízo dos direitos legais do consumidor.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>A loja informa o preço final, o período, a renovação e as condições da oferta antes da confirmação; verifique esses dados na tela de compra.</li>
                <li>O pagamento e a gestão da assinatura são processados pela loja da compra; este site não recebe dados de cartão nem realiza checkout.</li>
                <li>Quando o plano indicar renovação automática, novas cobranças seguem os ciclos e condições informados pela loja até o cancelamento.</li>
                <li>Cancelamentos, cobranças e pedidos de reembolso podem ser iniciados nas ferramentas oficiais da loja. Isso não restringe direitos assegurados pela legislação brasileira.</li>
                <li>Qualquer mudança de preço ou condição para renovações deve ser comunicada e aplicada conforme a legislação e as regras da loja, podendo o usuário cancelar antes da próxima cobrança.</li>
                <li>Testes, descontos ou promoções só se aplicam se estiverem expressamente disponíveis e descritos na tela de compra no momento da contratação.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-slate-200">
                Recursos de busca assistida por inteligência artificial podem localizar fontes primárias oficiais que
                ajudem a confirmar informações. Essa consulta não constitui fact-check automatizado, não garante a
                veracidade de uma afirmação e não substitui análise editorial ou avaliação crítica das fontes.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O usuário reconhece que ao iniciar uma assinatura, entende que a cobrança será feita de acordo com o
                método de pagamento habilitado na loja de aplicativos e de acordo com as políticas daquela plataforma.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Se a contratação ocorrer fora do estabelecimento comercial, o consumidor poderá exercer o direito de
                arrependimento no prazo legal de 7 dias, quando aplicável, pelos canais da loja e/ou pelo suporte do
                Prisma News. O pedido será encaminhado para processamento e eventual estorno conforme a lei e o fluxo
                da loja. Nada nestes Termos elimina o direito de arrependimento ou outros direitos inderrogáveis.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">5. Cancelamento e gerenciamento da assinatura</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                O cancelamento da renovação automática deve ser solicitado nas configurações de assinatura da App Store
                ou Google Play, conforme a plataforma de aquisição. O suporte pode orientar, mas não consegue cancelar
                uma cobrança administrada pela loja em nome do usuário.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-200 marker:text-purple-300">
                <li>O cancelamento normalmente impede ciclos futuros e não significa, por si só, reembolso do período já iniciado; permanecem válidos os direitos legais e as regras da loja.</li>
                <li>O acesso Premium permanece até o fim do período pago, salvo regra legal ou condição da loja aplicável ao caso.</li>
                <li>O aplicativo pode disponibilizar funcionalidade de restauração de compras para permitir a recuperação de compras válidas, conforme as regras da loja e o status do usuário.</li>
                <li>O usuário também pode gerenciar a assinatura por meio das configurações da conta na loja de aplicativos, conforme a plataforma utilizada.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">6. Reembolsos</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Para compras feitas nas lojas, pedidos de reembolso podem ser apresentados pelos canais oficiais da Apple
                App Store ou Google Play. A análise e execução do estorno seguem os procedimentos da loja e a legislação
                aplicável. O titular do serviço prestará cooperação razoável quando necessária, sem prejuízo de
                responsabilidades que a lei lhe atribua.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                A indicação da loja como canal operacional não afasta direitos do consumidor nem transfere obrigações
                legais do fornecedor. Para dúvidas sobre acesso à conta ou funcionamento do serviço, contate o suporte
                Prisma News; para uma transação da loja, use também o canal oficial da plataforma.
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
                O acesso poderá ser limitado ou suspenso quando necessário para cumprir a lei, proteger pessoas,
                investigar fraude ou abuso, responder a risco concreto de segurança ou fazer cessar violação material
                destes Termos. Quando razoavelmente possível, o usuário será informado dos motivos e poderá contatar o
                suporte para esclarecimentos ou revisão. Medidas urgentes podem ser adotadas sem aviso prévio quando
                necessário para conter risco ou cumprir determinação legal.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                O encerramento será proporcional ao motivo e não elimina direitos relativos a valores pagos, reembolso,
                dados pessoais ou reparação previstos em lei. Dados poderão ser mantidos apenas nos prazos e hipóteses
                legais descritos na Política de Privacidade.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">11. Limitação de responsabilidade</h2>
              <p className="mt-3 leading-relaxed text-slate-200">
                Empregamos esforços razoáveis para manter o serviço funcional e seguro. Ainda assim, podem ocorrer
                interrupções, manutenção, falhas de rede ou indisponibilidade de fornecedores e lojas. Quando possível,
                buscaremos restabelecer o funcionamento e comunicar interrupções relevantes.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Nenhuma disposição destes Termos exclui ou limita responsabilidade que não possa ser afastada por lei,
                inclusive direitos do consumidor e reparação por danos quando devida. Na extensão permitida pela lei,
                não respondemos por prejuízos causados exclusivamente por terceiros, pela loja ou por uso do serviço em
                desacordo com estes Termos, sem prejuízo da análise das circunstâncias concretas e das responsabilidades
                legalmente atribuídas a cada agente.
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
                Podemos atualizar estes Termos para refletir mudanças no serviço, requisitos legais ou operacionais.
                Publicaremos a versão e a data atualizadas e, quando a mudança for relevante, comunicaremos com
                antecedência razoável por canal apropriado e solicitaremos nova aceitação quando exigido por lei.
              </p>
              <p className="mt-3 leading-relaxed text-slate-200">
                Alterações não afastam direitos já constituídos nem produzem efeito retroativo. Se o usuário não concordar
                com uma alteração relevante, poderá deixar de usar o serviço e cancelar a assinatura futura pela loja,
                sem prejuízo de obrigações e direitos já existentes.
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
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Quando juridicamente cabível,
                fica eleito o foro da Comarca de São Luís, Estado do Maranhão, por ser a cidade indicada como sede do
                titular do serviço, sem impedir o consumidor de ajuizar demanda no foro de seu domicílio ou de exercer
                qualquer outra opção de foro assegurada por norma cogente. Esta cláusula não restringe o acesso ao Poder
                Judiciário nem altera competências absolutas.
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

            <div className="legal-tldr rounded-xl border border-purple-800/35 bg-[#10071d] p-4">
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
