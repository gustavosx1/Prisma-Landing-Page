import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appDownload";
import Link from "next/link";

export function AppPremiumCTA({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`discovery-app-cta${compact ? " discovery-app-cta--compact" : ""}`} aria-labelledby="app-premium-title">
      <div>
        <p className="discovery-eyebrow">Acesso no aplicativo</p>
        <h3 id="app-premium-title">Baixe o Prisma para fazer sua assinatura.</h3>
        <p>Instale o aplicativo e assine o Prisma Premium por lá. Escolha sua loja abaixo; este site não processa compras.</p>
      </div>
      <div className="discovery-app-actions">
        <Link className="discovery-button discovery-button--outline" href="/conta?returnTo=%2Ftopicos">Ver na web</Link>
        <a className="discovery-button discovery-button--primary" href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Apple · App Store<span className="sr-only"> (baixar o Prisma, abre em nova aba)</span>
        </a>
        <a className="discovery-button discovery-button--primary" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
          Android · Google Play<span className="sr-only"> (baixar o Prisma, abre em nova aba)</span>
        </a>
        <p className="discovery-app-note">Após instalar, conclua a assinatura na área Premium do aplicativo.</p>
      </div>
    </aside>
  );
}