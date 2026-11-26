"use client";

import Image from "next/image";
import { useState } from "react";

export function NewsImage({ src, fallback = "/fallback-banner.png", className = "", alt = "", coverFallback = false, priority = false }: {
  src: string | null; fallback?: string; className?: string; alt?: string; coverFallback?: boolean; priority?: boolean;
}) {
  // Keying the remote layer resets loading/error state whenever its URL changes.
  return <span className={`news-image ${className}`}>
    <Image src={fallback} alt={src ? "" : alt} fill sizes="(max-width: 600px) 100vw, 960px" unoptimized priority={priority} className={coverFallback ? "news-image__fallback news-image__fallback--cover" : "news-image__fallback"} />
    {src && <RemoteImage key={src} src={src} alt={alt} priority={priority} />}
  </span>;
}

function RemoteImage({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  if (state === "error") return null;
  return <Image src={src} alt={alt} fill sizes="(max-width: 600px) 100vw, 960px" unoptimized priority={priority}
    className={`news-image__photo${state === "ready" ? " news-image__photo--ready" : ""}`}
    onLoad={() => setState("ready")} onError={() => setState("error")} />;
}