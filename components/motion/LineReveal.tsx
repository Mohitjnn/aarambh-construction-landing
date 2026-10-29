"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, ease, motion, mm, useGSAP } from "@/lib/gsap";

type LineRevealProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Line-by-line text: each line rises from a clipped overflow when the heading enters. */
export function LineReveal({ as: Tag = "h2", id, className, children }: LineRevealProps) {
  const el = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        const split = SplitText.create(el.current as HTMLElement, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: motion.reveal + 0.2,
              ease: ease.expo,
              stagger: 0.1,
              scrollTrigger: { trigger: el.current, start: "top 85%", once: true },
            }),
        });
        return () => split.revert();
      });
      return () => media.revert();
    },
    { scope: el },
  );

  return (
    <Tag ref={el} id={id} className={className}>
      {children}
    </Tag>
  );
}
