"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, mm, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/blocks/ButtonLink";

const { projects } = site;

export function Projects() {
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(mm.fullDesktop, () => {
        const vp = viewport.current;
        const tr = track.current;
        if (!vp || !tr) return;
        vp.dataset.pinned = "true";
        const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(tr);
        return () => {
          ro.disconnect();
          delete vp.dataset.pinned;
        };
      });
      return () => media.revert();
    },
    { scope: stage },
  );

  return (
    <section
      id="projects"
      data-surface="navy"
      data-role="scroll-story"
      data-recipe="horizontal-rail"
      aria-labelledby="projects-title"
    >
      <div ref={stage} className="flex min-h-svh items-center py-16 md:py-0">
        <div ref={viewport} className="w-full overflow-x-auto data-[pinned]:overflow-hidden [scrollbar-width:none]">
          <ul ref={track} className="flex w-max snap-x gap-6 px-4 md:px-8 md:pl-[max(2rem,calc((100vw-var(--container))/2+2rem))]">
            <li className="flex w-[80vw] max-w-md shrink-0 snap-start flex-col justify-center pr-4 md:w-96">
              <p className="t-eyebrow mb-3 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-current" />
                {projects.eyebrow}
              </p>
              <h2 id="projects-title" className="t-h2">
                {projects.title}
              </h2>
              <div className="mt-6">
                <ButtonLink href={site.cta.href}>{site.cta.label}</ButtonLink>
              </div>
            </li>
            {projects.items.map((p) => (
              <li key={p.name} className="w-72 shrink-0 snap-start md:w-[24rem]">
                <article>
                  <div className="relative aspect-4/5 overflow-hidden border border-line">
                    <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 384px, 72vw" className="object-cover" />
                  </div>
                  <h3 className="t-card mt-4">{p.name}</h3>
                  <p className="t-body mt-1 text-fg-muted">{p.type}</p>
                  <p className="t-caption text-eyebrow">{p.place}</p>
                </article>
              </li>
            ))}
            <li aria-hidden className="w-4 shrink-0 md:w-8" />
          </ul>
        </div>
      </div>
    </section>
  );
}
