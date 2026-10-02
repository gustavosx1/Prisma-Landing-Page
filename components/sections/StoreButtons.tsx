"use client";

import { Apple, Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appDownload";

type StoreButtonsProps = {
  location: string;
  compact?: boolean;
  className?: string;
};

const STORES = [
  { name: "App Store", label: "Baixar na App Store", url: APP_STORE_URL, Icon: Apple },
  { name: "Google Play", label: "Disponível no Google Play", url: GOOGLE_PLAY_URL, Icon: Play },
];

export function StoreButtons({ location, compact = false, className = "" }: StoreButtonsProps) {
  return (
    <div className={`store-buttons ${compact ? "store-buttons-compact" : ""} ${className}`}>
      {STORES.map(({ name, label, url, Icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("app_store_click", { store: name, location })}
          aria-label={`${label} — Prisma News`}
          className="store-button"
        >
          <Icon aria-hidden="true" className="store-button-icon" />
          <span>{compact ? name : label}</span>
        </a>
      ))}
    </div>
  );
}