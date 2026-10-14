"use client";

import { useEffect, useRef } from "react";
import { Apple, Play } from "lucide-react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/appDownload";
import { captureAttribution, sendEvent } from "@/lib/track";

const PLAY_ID = "br.com.prismanews.app";
const APPSTORE_URL = APP_STORE_URL;

type DownloadButtonsProps = {
  compact?: boolean;
  className?: string;
  onStoreClick?: (store: "play" | "appstore") => void;
};

export function DownloadButtons({
  compact = false,
  className = "",
  onStoreClick,
}: DownloadButtonsProps) {
  const appStoreLink = useRef<HTMLAnchorElement>(null);
  const playLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const attribution = captureAttribution();
    if (!attribution.utm_campaign) return;

    const campaign = `${attribution.utm_campaign}_${attribution.utm_content ?? ""}`.replace(/_$/, "");
    const referrerParams = new URLSearchParams({
      utm_source: attribution.utm_source || "youtube",
      utm_medium: attribution.utm_medium || "creator",
      utm_campaign: campaign,
    });

    if (playLink.current) {
      playLink.current.href = `https://play.google.com/store/apps/details?id=${PLAY_ID}&referrer=${encodeURIComponent(referrerParams.toString())}`;
    }
    if (appStoreLink.current) {
      const attributedAppStoreUrl = new URL(APPSTORE_URL);
      attributedAppStoreUrl.searchParams.set("ct", campaign.slice(0, 40));
      appStoreLink.current.href = attributedAppStoreUrl.toString();
    }
  }, []);

  return (
    <div className={`store-buttons ${compact ? "store-buttons-compact" : ""} ${className}`}>
      <a
        ref={appStoreLink}
        href={APPSTORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          sendEvent("download_click", { store: "appstore" });
          onStoreClick?.("appstore");
        }}
        aria-label="Baixar na App Store — Prisma News"
        className="store-button"
      >
        <Apple aria-hidden="true" className="store-button-icon" />
        <span>{compact ? "App Store" : "Baixar na App Store"}</span>
      </a>
      <a
        ref={playLink}
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          sendEvent("download_click", { store: "play" });
          onStoreClick?.("play");
        }}
        aria-label="Disponível no Google Play — Prisma News"
        className="store-button"
      >
        <Play aria-hidden="true" className="store-button-icon" />
        <span>{compact ? "Google Play" : "Disponível no Google Play"}</span>
      </a>
    </div>
  );
}