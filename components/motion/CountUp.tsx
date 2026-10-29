"use client";

import { useRef } from "react";
import { gsap, mm, useGSAP } from "@/lib/gsap";

/** Counter tick: counts up once when first seen. Final value is in the markup for no-JS and reduced motion. */
export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        const counter = { n: 0 };
        const write = () => {
          if (el.current) el.current.textContent = `${Math.round(counter.n)}${suffix}`;
        };
        write();
        gsap.to(counter, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: write,
          scrollTrigger: { trigger: el.current, start: "top 85%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: el },
  );

  return (
    <span ref={el} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
