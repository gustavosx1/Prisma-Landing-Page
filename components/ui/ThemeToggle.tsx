"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "@prisma/theme-mode";
const EVENT = "prisma-theme-change";

function subscribe(callback: () => void) {
  function storageChanged(event: StorageEvent) {
    if (event.key !== KEY && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    callback();
  }
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", storageChanged);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", storageChanged);
  };
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggle() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* Preference is optional when storage is blocked. */ }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button type="button" className="theme-toggle" role="switch" aria-checked={dark}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"} onClick={toggle}>
      {dark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}