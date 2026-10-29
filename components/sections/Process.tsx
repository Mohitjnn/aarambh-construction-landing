"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, mm, useGSAP } from "@/lib/gsap";
import { Section } from "@/components/blocks/Section";
import { SectionTitle } from "@/components/blocks/SectionTitle";

const { process } = site;

export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.fullDesktop, () => {
        const q = gsap.utils.selector(root);
        const steps = q("[data-step]");
        const frames = q("[data-frame]");
        gsap.set(frames.slice(1), { autoAlpha: 0 });
        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (!self.isActive) return;
              frames.forEach((f, j) => gsap.to(f, { autoAlpha: j === i ? 1 : 0, duration: 0.5, ease: "power2.out" }));
            },
          });
        });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <Section surface="navy" role="scroll-story" recipe="sticky-media-story" labelledBy="process-title">
      <SectionTitle id="process-title" eyebrow={process.eyebrow} title={process.title} />
      <div ref={root} className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="hidden md:col-span-7 md:block">
          <div className="sticky top-28 h-[min(36rem,calc(100svh-9rem))] overflow-hidden border border-line">
            {process.steps.map((s, i) => (
              <Image
                key={s.title}
                data-frame
                src={s.image}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className={`object-cover ${i === 0 ? "" : "invisible"}`}
              />
            ))}
          </div>
        </div>
        <ol className="md:col-span-5">
          {process.steps.map((s, i) => (
            <li key={s.title} data-step className="border-t border-line py-8 md:flex md:h-[min(18rem,calc(100svh-12rem))] md:flex-col md:justify-center md:py-0">
              <div className="relative mb-5 aspect-4/3 overflow-hidden border border-line md:hidden">
                <Image src={s.image} alt={s.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="flex items-baseline gap-4">
                <span className="font-semibold text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-card">{s.title}</h3>
              </div>
              <p className="t-body mt-3 max-w-md text-fg-muted md:pl-10">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
