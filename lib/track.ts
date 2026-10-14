"use client";

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
};

export type TrackEventType = "visit" | "download_click";

const VISITOR_ID_KEY = "visitor_id_v1";
const ATTRIBUTION_KEY = "attr_v1";
const VISIT_SESSION_KEY = "visit_tracked_v1";
let visitTrackedInMemory = false;

const EMPTY_ATTRIBUTION: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
};

function parseAttribution(value: unknown): Attribution {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ...EMPTY_ATTRIBUTION };
  }

  const saved = value as Record<string, unknown>;
  return {
    utm_source: typeof saved.utm_source === "string" ? saved.utm_source : null,
    utm_medium: typeof saved.utm_medium === "string" ? saved.utm_medium : null,
    utm_campaign: typeof saved.utm_campaign === "string" ? saved.utm_campaign : null,
    utm_content: typeof saved.utm_content === "string" ? saved.utm_content : null,
  };
}

export function getVisitorId(): string {
  try {
    const savedId = window.localStorage.getItem(VISITOR_ID_KEY);
    if (savedId) return savedId;

    const visitorId = window.crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return window.crypto.randomUUID();
  }
}

export function getAttribution(): Attribution {
  try {
    const saved = window.localStorage.getItem(ATTRIBUTION_KEY);
    return saved ? parseAttribution(JSON.parse(saved) as unknown) : { ...EMPTY_ATTRIBUTION };
  } catch {
    return { ...EMPTY_ATTRIBUTION };
  }
}

export function captureAttribution(): Attribution {
  const searchParams = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
    utm_content: searchParams.get("utm_content"),
  };

  if (attribution.utm_campaign || attribution.utm_source) {
    try {
      window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    } catch {
      // Attribution is still returned for this page even if persistence is blocked.
    }
    return attribution;
  }

  return getAttribution();
}

export function sendEvent(
  type: TrackEventType,
  options: { store?: "play" | "appstore" } = {},
): void {
  const payload = {
    type,
    visitor_id: getVisitorId(),
    ...getAttribution(),
    store: options.store ?? null,
  };
  const body = new Blob([JSON.stringify(payload)], { type: "application/json" });

  try {
    if (navigator.sendBeacon("/api/track", body)) return;
  } catch {
    // Fall back to fetch when sendBeacon is unavailable or throws.
  }

  void fetch("/api/track", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  }).catch(() => undefined);
}

export function trackVisitOnce(): void {
  captureAttribution();
  if (visitTrackedInMemory) return;

  try {
    if (window.sessionStorage.getItem(VISIT_SESSION_KEY)) {
      visitTrackedInMemory = true;
      return;
    }
    window.sessionStorage.setItem(VISIT_SESSION_KEY, "1");
  } catch {
    // Continue and send the visit if session storage is unavailable.
  }

  visitTrackedInMemory = true;
  sendEvent("visit");
}