"use client";

import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";
import { DownloadButtons } from "../DownloadButtons";
import { trackEvent } from "@/lib/analytics";

type AppPremiumCTAProps = { variant: "feed" | "detail" };

export function AppPremiumCTA({ variant }: AppPremiumCTAProps) {
  const isDetail = variant === "detail";
  const titleId = `app-premium-title-${variant}`;

  return (
    <section className={`premium-app-cta premium-app-cta--${variant}`} aria-labelledby={titleId}>
      <Crown className="premium-app-cta__crown" size={20} aria-hidden="true" />
      <div className="premium-app-cta__copy">
        <p className="premium-app-cta__eyebrow">Prisma Premium</p>
        <h2 id={titleId}>{isDetail ? "Veja o quadro completo no Prisma Premium." : "No plano gratuito, você tem acesso aos 3 tópicos mais recentes."}</h2>
        <p className="premium-app-cta__description">
          {isDetail
            ? "A prévia deste tópico é só o começo. A cobertura completa e os recursos Premium ficam disponíveis no aplicativo."
            : "Explore tópicos e coberturas completas com o Prisma Premium. O acesso é liberado após assinar pelo aplicativo."}
        </p>
        <Link className="discovery-text-link" href="/#precos">Conhecer o Premium <ArrowRight size={16} aria-hidden="true" /></Link>
        <DownloadButtons compact showWeb={false} className="premium-app-cta__stores" onStoreClick={(store) => trackEvent("app_store_click", { store, location: isDetail ? "premium_topic_detail" : "premium_feed" })} />
        <p className="premium-app-cta__hint">Contratação no aplicativo iOS ou Android. Este site não processa pagamentos.</p>
      </div>
    </section>
  );
}