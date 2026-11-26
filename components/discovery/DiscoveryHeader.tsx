import type { ReactNode } from "react";
import { PrismaSignature } from "../ui/PrismaSignature";
import { ThemeToggle } from "../ui/ThemeToggle";

export function DiscoveryHeader({ actions }: { actions?: ReactNode }) {
  return (
    <header className="discovery-header">
      <div className="discovery-header__inner">
        <PrismaSignature />
        <div className="discovery-header__actions">{actions}<ThemeToggle /></div>
      </div>
    </header>
  );
}