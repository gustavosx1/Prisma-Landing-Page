import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appDownload";

export function AppPremiumCTA({ compact = false }: { compact?: boolean }) {
  const appLink = process.env.NEXT_PUBLIC_PRISMA_PREMIUM_LINK;

  return (
    <aside className={`discovery-app-cta${compact ? " discovery-app-cta--compact" : ""}`} aria-labelledby="app-premium-title">
      <div>
        <p className="discovery-eyebrow">Acesso no aplicativo</p>
        <h3 id="app-premium-title">Mais contexto, no Prisma Premium.</h3>
        <p>As assinaturas são feitas exclusivamente no aplicativo, pela App Store ou Google Play. Este site não processa compras.</p>
      </div>
      <div className="discovery-app-actions">
        {appLink ? (
          <a className="discovery-button discovery-button--primary" href={appLink}>
            Abrir Prisma no Premium
          </a>
        ) : (
          <p className="discovery-app-note">Abra a área Premium no Prisma News ou instale o aplicativo pelas lojas.</p>
        )}
        <a href={APP_STORE_URL} target="_blank" rel="noreferrer">Baixar na App Store<span className="sr-only"> (abre em nova aba)</span></a>
        <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">Baixar no Google Play<span className="sr-only"> (abre em nova aba)</span></a>
        {appLink && <p className="discovery-app-note">Se o app não abrir, escolha sua loja para instalar. Nenhuma compra é realizada neste site.</p>}
      </div>
    </aside>
  );
}