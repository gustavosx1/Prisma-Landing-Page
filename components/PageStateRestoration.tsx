"use client";

import { useLayoutEffect } from "react";

const SCROLL_POSITION_KEY = "prisma_scroll_position_v1";

type SavedScrollPosition = {
  pathname: string;
  scrollY: number;
};

export function PageStateRestoration() {
  useLayoutEffect(() => {
    let saveTimeout: ReturnType<typeof setTimeout> | undefined;

    const savePosition = () => {
      try {
        const position: SavedScrollPosition = {
          pathname: window.location.pathname,
          scrollY: Math.round(window.scrollY),
        };
        window.sessionStorage.setItem(
          SCROLL_POSITION_KEY,
          JSON.stringify(position),
        );
      } catch {
        // Continue normally when storage is disabled or unavailable.
      }
    };

    const scheduleSave = () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(savePosition, 150);
    };

    if (!window.location.hash) {
      try {
        const saved = window.sessionStorage.getItem(SCROLL_POSITION_KEY);
        if (saved) {
          const position = JSON.parse(saved) as Partial<SavedScrollPosition>;
          if (
            position.pathname === window.location.pathname &&
            typeof position.scrollY === "number" &&
            Number.isFinite(position.scrollY) &&
            position.scrollY > 0
          ) {
            window.scrollTo(0, position.scrollY);
          }
        }
      } catch {
        // Ignore invalid or unavailable saved state.
      }
    }

    const saveWhenHidden = () => {
      if (document.visibilityState === "hidden") savePosition();
    };

    window.addEventListener("scroll", scheduleSave, { passive: true });
    window.addEventListener("pagehide", savePosition);
    document.addEventListener("visibilitychange", saveWhenHidden);

    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      window.removeEventListener("scroll", scheduleSave);
      window.removeEventListener("pagehide", savePosition);
      document.removeEventListener("visibilitychange", saveWhenHidden);
    };
  }, []);

  return null;
}