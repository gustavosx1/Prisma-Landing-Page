import Image from "next/image";
import Link from "next/link";

export function DiscoveryHeader() {
  return (
    <header className="discovery-header">
      <div className="discovery-header__inner">
        <Link href="/" className="discovery-brand" aria-label="Prisma News — início">
          <Image src="/logo.svg" alt="" width={34} height={34} priority />
          <span>Prisma <b>News</b></span>
        </Link>
        <nav aria-label="Navegação de tópicos">
          <Link href="/topicos">Descobrir</Link>
          <Link className="discovery-header__download" href="/topicos#app-premium-title">Conheça o Premium</Link>
        </nav>
      </div>
    </header>
  );
}