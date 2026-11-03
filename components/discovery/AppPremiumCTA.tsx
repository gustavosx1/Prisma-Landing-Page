import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appDownload";
import Link from "next/link";

export function AppPremiumCTA({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`discovery-app-cta${compact ? " discovery-app-cta--compact" : ""}`} aria-labelledby="app-premium-title">
      <div>
        <p className="discovery-eyebrow">Acesso no aplicativo</p>
        <h3 id="app-premium-title">Mais contexto, no Prisma Premium.</h3>
        <p>As assinaturas são feitas exclusivamente no aplicativo, pela App Store ou Google Play. Este site não processa compras.</p>
      </div>
      <div className="discovery-app-actions">
        <Link className="discovery-button discovery-button--outline" href="/conta?returnTo=%2Ftopicos">Ver na web</Link>
        <a className="discovery-button discovery-button--primary" href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Baixar e assinar na App Store<span className="sr-only"> (abre em nova aba)</span>
        </a>
        <a className="discovery-button discovery-button--primary" href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">
          Baixar e assinar no Google Play<span className="sr-only"> (abre em nova aba)</span>
        </a>
        <p className="discovery-app-note">Após instalar, assine na área Premium do aplicativo. Este site não processa compras.</p>
      </div>
    </aside>
  );
}