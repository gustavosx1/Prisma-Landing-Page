import { ArrowDownToLine, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { StoreButtons } from "@/components/sections/StoreButtons";

type AppPremiumCTAProps = { variant: "feed" | "detail" };

export function AppPremiumCTA({ variant }: AppPremiumCTAProps) {
  const isDetail = variant === "detail";
  const titleId = `app-premium-title-${variant}`;

  return (
    <section className={`premium-app-cta premium-app-cta--${variant}`} aria-labelledby={titleId}>
      <div className="premium-app-cta__copy">
        <p className="premium-app-cta__eyebrow"><Sparkles size={14} aria-hidden="true" /> Prisma Premium</p>
        <h2 id={titleId}>{isDetail ? "Veja o quadro completo no Prisma Premium." : "Mais contexto para cada assunto."}</h2>
        <p className="premium-app-cta__description">
          {isDetail
            ? "A prévia deste tópico é só o começo. A cobertura completa e os recursos Premium ficam disponíveis no aplicativo."
            : "Explore tópicos e coberturas completas com o Prisma Premium. O acesso é liberado após assinar pelo aplicativo."}
        </p>
        <div className="premium-app-cta__assurance"><ShieldCheck size={17} aria-hidden="true" /> Assinatura feita exclusivamente no aplicativo — este site não processa pagamentos.</div>
      </div>
      <div className="premium-app-cta__download">
        <div className="premium-app-cta__download-heading">
          <span className="premium-app-cta__icon"><Smartphone size={19} aria-hidden="true" /></span>
          <div><strong>Comece pelo app</strong><span>Disponível para iOS e Android</span></div>
        </div>
        <StoreButtons location={isDetail ? "premium_topic_detail" : "premium_feed"} showWeb={false} className="premium-app-cta__store-buttons" />
        <p className="premium-app-cta__hint"><ArrowDownToLine size={14} aria-hidden="true" /> Baixe o Prisma e assine na área Premium do aplicativo.</p>
      </div>
    </section>
  );
}