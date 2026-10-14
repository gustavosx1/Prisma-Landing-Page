"use client";

import { DownloadButtons } from "@/components/DownloadButtons";
import { trackEvent } from "@/lib/analytics";

type StoreButtonsProps = {
  location: string;
  compact?: boolean;
  className?: string;
};

export function StoreButtons({ location, compact = false, className = "" }: StoreButtonsProps) {
  return (
    <DownloadButtons
      compact={compact}
      className={className}
      onStoreClick={(store) =>
        trackEvent("app_store_click", {
          store: store === "appstore" ? "App Store" : "Google Play",
          location,
        })
      }
    />
  );
}