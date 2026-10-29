"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ease, mm, useGSAP } from "@/lib/gsap";

/** Soft rise: 20px rise plus fade, for small supporting blocks only. */
export function SoftRise({ children, className }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        gsap.from(el.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.5,
          ease: ease.out,
          scrollTrigger: { trigger: el.current, start: "top 88%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: el },
  );

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
