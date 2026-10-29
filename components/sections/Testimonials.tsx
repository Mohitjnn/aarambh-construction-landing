"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { gsap, mm, useGSAP } from "@/lib/gsap";
import { Section } from "@/components/blocks/Section";
import { SectionTitle } from "@/components/blocks/SectionTitle";

const { testimonials } = site;

type Item = (typeof testimonials.rows)[number][number];

function Card({ item }: { item: Item }) {
  return (
    <figure className="hairline-card flex w-80 shrink-0 flex-col justify-between gap-5 p-5">
      <blockquote className="t-body">{item.quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-gold"
        >
          {item.name.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold">{item.name}</span>
          <span className="t-caption block text-fg-muted">
            {item.role}, {item.place}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        const tracks = gsap.utils.toArray<HTMLElement>("[data-track]", root.current);
        const tweens = tracks.map((t, i) => {
          const tween = i % 2 === 0
            ? gsap.fromTo(t, { xPercent: 0 }, { xPercent: -50, duration: 60, ease: "none", repeat: -1 })
            : gsap.fromTo(t, { xPercent: -50 }, { xPercent: 0, duration: 60, ease: "none", repeat: -1 });
          const slow = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
          const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
          t.addEventListener("mouseenter", slow);
          t.addEventListener("mouseleave", resume);
          return { tween, t, slow, resume };
        });
        return () =>
          tweens.forEach(({ tween, t, slow, resume }) => {
            t.removeEventListener("mouseenter", slow);
            t.removeEventListener("mouseleave", resume);
            tween.kill();
          });
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <Section surface="paper" role="people" recipe="marquee" labelledBy="testimonials-title" className="overflow-hidden">
      <SectionTitle id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
      <div
        ref={root}
        className="-mx-4 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:-mx-8 motion-reduce:mx-0 motion-reduce:[mask-image:none]"
      >
        {testimonials.rows.map((row, r) => (
          <div key={r} className="overflow-hidden motion-reduce:overflow-visible">
            <div data-track className="flex w-max gap-4 motion-reduce:w-auto motion-reduce:flex-wrap">
              {row.map((item) => (
                <Card key={item.name} item={item} />
              ))}
              {row.map((item) => (
                <div key={`dup-${item.name}`} aria-hidden className="contents motion-reduce:hidden">
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
