"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";

type SaveDataNavigator = Navigator & { connection?: { saveData?: boolean } };

/**
 * Decorative background loop. Poster and video are attached after the page has loaded so they never
 * compete with the headline for bandwidth; the loop plays only when motion and data allow, and only on screen.
 */
export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as SaveDataNavigator).connection?.saveData;
    let io: IntersectionObserver | undefined;

    const attach = () => {
      el.poster = site.hero.poster;
      if (reduced || saveData) return;
      el.src = site.hero.video;
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      });
      io.observe(el);
    };

    if (document.readyState === "complete") attach();
    else window.addEventListener("load", attach, { once: true });
    return () => {
      window.removeEventListener("load", attach);
      io?.disconnect();
    };
  }, []);

  return (
    <video
      ref={video}
      data-hero-video
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 size-full object-cover"
    />
  );
}
