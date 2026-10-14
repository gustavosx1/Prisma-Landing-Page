"use client";

import { useEffect } from "react";
import { trackVisitOnce } from "@/lib/track";

export function Tracker() {
  useEffect(() => {
    trackVisitOnce();
  }, []);

  return null;
}