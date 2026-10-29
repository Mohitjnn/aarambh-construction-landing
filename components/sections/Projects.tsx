"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { gsap, ScrollTrigger, mm, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/blocks/ButtonLink";

const { projects } = site;

type ProjectItem = (typeof projects.items)[number];

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article>
      <div className="relative aspect-4/5 overflow-hidden border border-line">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 768px) 384px, 72vw"
          className="object-cover"
        />
      </div>
      <h3 className="t-card mt-4">{project.name}</h3>
      <p className="t-body mt-1 text-fg-muted">{project.type}</p>
      <p className="t-caption text-eyebrow">{project.place}</p>
    </article>
  );
}

export function Projects() {
  const stage = useRef<HTMLDivElement>(null);
  const desktopViewport = useRef<HTMLDivElement>(null);
  const mobileViewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(mm.fullDesktop, () => {
        const vp = desktopViewport.current;
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

      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const vp = mobileViewport.current;
        if (!vp) return;

        const firstCard = vp.querySelector<HTMLElement>("[data-project-card]");
        const firstDup = vp.querySelector<HTMLElement>("[data-project-dup]");
        if (!firstCard || !firstDup) return;

        const getLoopWidth = () => Math.max(0, firstDup.offsetLeft - firstCard.offsetLeft);
        let pos = vp.scrollLeft;
        let paused = false;
        let resumeTimer: ReturnType<typeof setTimeout> | undefined;

        const tick = () => {
          if (paused) return;
          const loopWidth = getLoopWidth();
          if (loopWidth <= 0) return;
          pos += 0.8 * gsap.ticker.deltaRatio(60);
          if (pos >= loopWidth) pos -= loopWidth;
          vp.scrollLeft = pos;
        };

        const pause = () => {
          paused = true;
          if (resumeTimer) clearTimeout(resumeTimer);
        };

        const resume = () => {
          if (resumeTimer) clearTimeout(resumeTimer);
          resumeTimer = setTimeout(() => {
            const loopWidth = getLoopWidth();
            pos = loopWidth > 0 ? vp.scrollLeft % loopWidth : vp.scrollLeft;
            paused = false;
          }, 1200);
        };

        const onScroll = () => {
          if (!paused) return;
          const loopWidth = getLoopWidth();
          if (loopWidth > 0 && vp.scrollLeft >= loopWidth) {
            vp.scrollLeft -= loopWidth;
          }
          pos = vp.scrollLeft;
        };

        gsap.ticker.add(tick);
        vp.addEventListener("touchstart", pause, { passive: true });
        vp.addEventListener("touchend", resume, { passive: true });
        vp.addEventListener("touchcancel", resume, { passive: true });
        vp.addEventListener("pointerdown", pause, { passive: true });
        vp.addEventListener("pointerup", resume, { passive: true });
        vp.addEventListener("mouseenter", pause);
        vp.addEventListener("mouseleave", resume);
        vp.addEventListener("scroll", onScroll, { passive: true });

        return () => {
          if (resumeTimer) clearTimeout(resumeTimer);
          gsap.ticker.remove(tick);
          vp.removeEventListener("touchstart", pause);
          vp.removeEventListener("touchend", resume);
          vp.removeEventListener("touchcancel", resume);
          vp.removeEventListener("pointerdown", pause);
          vp.removeEventListener("pointerup", resume);
          vp.removeEventListener("mouseenter", pause);
          vp.removeEventListener("mouseleave", resume);
          vp.removeEventListener("scroll", onScroll);
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
        <div
          ref={desktopViewport}
          className="w-full md:overflow-x-auto md:data-[pinned]:overflow-hidden md:[scrollbar-width:none]"
        >
          <div
            ref={track}
            className="flex flex-col gap-10 md:w-max md:flex-row md:items-center md:gap-6 md:px-8 md:pl-[max(2rem,calc((100vw-var(--container))/2+2rem))]"
          >
            <div className="flex flex-col justify-center px-4 md:w-96 md:shrink-0 md:px-0 md:pr-4">
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
            </div>

            <div
              ref={mobileViewport}
              className="w-full overflow-x-auto [scrollbar-width:none] md:w-auto md:overflow-visible"
            >
              <ul className="flex w-max gap-6 px-4 md:px-0">
                {projects.items.map((p) => (
                  <li key={p.name} data-project-card className="w-72 shrink-0 md:w-[24rem]">
                    <ProjectCard project={p} />
                  </li>
                ))}
                {projects.items.map((p) => (
                  <li
                    key={`dup-${p.name}`}
                    data-project-dup
                    aria-hidden
                    className="w-72 shrink-0 md:hidden motion-reduce:hidden"
                  >
                    <ProjectCard project={p} />
                  </li>
                ))}
                <li aria-hidden className="hidden w-8 shrink-0 md:block" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
