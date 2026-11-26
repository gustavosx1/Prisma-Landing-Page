"use client";

import { DownloadButtons } from "@/components/DownloadButtons";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/ui/Landing.module.css";

type StoreButtonsProps = {
  location: string;
  compact?: boolean;
  className?: string;
  showWeb?: boolean;
};

export function StoreButtons({ location, compact = false, className = "", showWeb = true }: StoreButtonsProps) {
  return (
    <DownloadButtons
      compact={compact}
      className={`${styles.stores} ${className}`}
      showWeb={showWeb}
      onStoreClick={(store) =>
        trackEvent("app_store_click", {
          store: store === "appstore" ? "App Store" : "Google Play",
          location,
        })
      }
    />
  );
}