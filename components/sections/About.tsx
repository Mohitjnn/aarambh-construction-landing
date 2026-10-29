"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { gsap, mm, useGSAP } from "@/lib/gsap";
import { LineReveal } from "@/components/motion/LineReveal";

const { about } = site;

export function About() {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.full, () => {
        const scrub = { trigger: frame.current, start: "top 90%", end: "top 25%", scrub: true };
        gsap.fromTo(frame.current, { clipPath: "inset(28% 24% 28% 24%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: scrub });
        gsap.fromTo("[data-about-img]", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: scrub });
      });
      return () => media.revert();
    },
    { scope: frame },
  );

  return (
    <section
      id="about"
      data-surface="paper"
      data-role="backdrop-overlay"
      data-recipe="mask-reveal"
      aria-labelledby="about-title"
      className="section-pad"
    >
      <div className="container-x grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="t-eyebrow mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-current" />
            {about.eyebrow}
          </p>
          <LineReveal id="about-title" className="t-h2">
            {about.statement[0]}{" "}
            <span className="bg-[linear-gradient(transparent_62%,var(--gold)_62%,var(--gold)_92%,transparent_92%)]">
              {about.statement[1]}
            </span>
          </LineReveal>
        </div>
        <div className="md:col-span-5">
          <p className="t-body max-w-md text-fg-muted">{about.body}</p>
          <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-line pt-6">
            {about.values.map((v) => (
              <div key={v.title}>
                <dt className="t-card">{v.title}</dt>
                <dd className="t-caption mt-1 text-fg-muted">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        <div
          ref={frame}
          className="relative h-72 w-full overflow-hidden border-y border-line bg-paper sm:h-96 lg:h-[28rem]"
        >
          <Image
            data-about-img
            src={about.image}
            alt={about.imageAlt}
            fill
            sizes="100vw"
            className="object-cover mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}
