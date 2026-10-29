"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ease, mm, useGSAP } from "@/lib/gsap";

/** Mask reveal: the frame opens through a clip-path while the image inside counter-scales. */
export function MaskIn({ children, className }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        const img = frame.current?.querySelector("img");
        const trigger = { trigger: frame.current, start: "top 85%", once: true };
        gsap.fromTo(
          frame.current,
          { clipPath: "inset(14% 14% 14% 14%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: ease.expo, scrollTrigger: trigger },
        );
        if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.2, ease: ease.expo, scrollTrigger: trigger });
      });
      return () => media.revert();
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={className}>
      {children}
    </div>
  );
}
