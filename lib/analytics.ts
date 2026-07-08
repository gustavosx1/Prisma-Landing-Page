type EventName =
  | "hero_cta_click"
  | "demo_click"
  | "pricing_cta_click"
  | "faq_open"
  | "signup_start"
  | "signup_complete"
  | "scroll_depth"
  | (string & Record<never, never>);

export function trackEvent(
  name: EventName,
  properties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  const win = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === "function") {
    win.gtag("event", name, properties ?? {});
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, properties);
  }
}

export function initScrollDepth(): () => void {
  if (typeof window === "undefined") return () => {};
  const depths = [25, 50, 75, 100];
  const triggered = new Set<number>();

  const handleScroll = () => {
    const scrolled =
      (window.scrollY /
        Math.max(document.body.scrollHeight - window.innerHeight, 1)) *
      100;
    depths.forEach((depth) => {
      if (scrolled >= depth && !triggered.has(depth)) {
        triggered.add(depth);
        trackEvent("scroll_depth", { depth });
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}
