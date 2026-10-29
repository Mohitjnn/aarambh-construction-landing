"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ease, motion, mm, useGSAP } from "@/lib/gsap";

/** Stagger cascade: children marked data-cascade enter in reading order with varied offsets. */
export function Cascade({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-cascade]", root.current);
        gsap.from(items, {
          autoAlpha: 0,
          y: (i: number) => 24 + (i % 3) * 10,
          rotate: (i: number) => (i % 2 ? 0.6 : -0.6),
          duration: motion.reveal,
          ease: ease.out,
          stagger: motion.stagger,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
