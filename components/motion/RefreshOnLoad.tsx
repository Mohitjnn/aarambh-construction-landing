"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Recalculates scroll positions once fonts and images have settled, so pins measure real sizes. */
export function RefreshOnLoad() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  return null;
}
