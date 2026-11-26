import type { ReactNode } from "react";
import { PrismaSignature } from "../ui/PrismaSignature";
import { ThemeToggle } from "../ui/ThemeToggle";

export function DiscoveryHeader({ actions, searchExpanded = false }: { actions?: ReactNode; searchExpanded?: boolean }) {
  return (
    <header className={`discovery-header${searchExpanded ? " discovery-header--search-expanded" : ""}`}>
      <div className="discovery-header__inner">
        <PrismaSignature />
        <div className="discovery-header__actions">{actions}<ThemeToggle /></div>
      </div>
    </header>
  );
}