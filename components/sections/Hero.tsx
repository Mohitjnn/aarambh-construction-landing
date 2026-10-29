"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { gsap, mm, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/blocks/ButtonLink";
import { HeroVideo } from "@/components/sections/HeroVideo";

const wordmark =
  "font-bold uppercase leading-none whitespace-nowrap text-[clamp(1rem,0.3rem+3.4vw,3.5rem)] tracking-[0.12em]";

export function Hero() {
  const shell = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const q = gsap.utils.selector(shell);
      const textWidth = (el: Element) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        return range.getBoundingClientRect().width;
      };
      // The two words differ in length, so the phrase is nudged left until it is optically centred.
      const offset = () => {
        const [l, r] = [q("[data-hero-word='l']")[0], q("[data-hero-word='r']")[0]];
        return l && r ? -(textWidth(r) - textWidth(l)) / 2 : 0;
      };
      const corner = (el: Element, x: number, y: number) => {
        const box = el.getBoundingClientRect();
        return { x: x - (box.left + box.width / 2), y: y - (box.top + box.height / 2) };
      };
      const build = (travel: string) => {
        const dotA = q("[data-hero-dot='a']")[0];
        const dotB = q("[data-hero-dot='b']")[0];
        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "none" },
          scrollTrigger: {
            trigger: shell.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        // Text leaves first (first third), before the gates start to open.
        tl.to(q("[data-hero-text]"), { autoAlpha: 0, yPercent: -6, duration: 0.28, ease: "power1.in" }, 0);
        tl.to(q("[data-hero-panel='l']"), { xPercent: -100, duration: 0.5, ease: "power2.inOut" }, 0.3);
        tl.to(q("[data-hero-panel='r']"), { xPercent: 100, duration: 0.5, ease: "power2.inOut" }, 0.3);
        tl.fromTo(q("[data-hero-video]"), { scale: 1.08 }, { scale: 1, duration: 0.6 }, 0.3);
        tl.fromTo(q("[data-hero-wash]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6 }, 0.3);
        tl.fromTo(q("[data-hero-wordrow]"), { x: () => offset() }, { x: () => offset() * 0.88, duration: 0.65 }, 0.3);
        tl.fromTo(q("[data-hero-word='l']"), { x: 0, letterSpacing: "0.12em" }, { x: `-${travel}`, letterSpacing: "0.02em", duration: 0.65 }, 0.3);
        tl.fromTo(q("[data-hero-word='r']"), { x: 0, letterSpacing: "0.12em" }, { x: travel, letterSpacing: "0.02em", duration: 0.65 }, 0.3);
        // The cue is only for the closed state: gone within the first sliver of scroll, before the gates move.
        tl.to(q("[data-hero-cue]"), { autoAlpha: 0, duration: 0.05, ease: "power1.out" }, 0);
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.5 })
          .to(q("[data-hero-cue-arrow]"), { y: 10, duration: 0.25, ease: "power2.out" })
          .to(q("[data-hero-cue-arrow]"), { y: 0, duration: 0.9, ease: "bounce.out" });
        if (dotA && dotB) {
          const w = () => stageWidth();
          tl.to(dotA, { x: () => corner(dotA, 24, 96).x, y: () => corner(dotA, 24, 96).y, duration: 0.65 }, 0.3);
          tl.to(dotB, { x: () => corner(dotB, w() - 24, stageHeight() - 24).x, y: () => corner(dotB, w() - 24, stageHeight() - 24).y, duration: 0.65 }, 0.3);
        }
      };
      const stageWidth = () => shell.current?.clientWidth ?? 0;
      const stageHeight = () => window.innerHeight;
      media.add(mm.fullDesktop, () => build("10vw"));
      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => build("2vw"));
      media.add(mm.reduced, () => {
        const place = () => gsap.set(q("[data-hero-wordrow]"), { x: offset() });
        place();
        window.addEventListener("resize", place);
        return () => window.removeEventListener("resize", place);
      });
      return () => media.revert();
    },
    { scope: shell },
  );

  return (
    <section id="top" data-role="hero-stage" data-recipe="portal-parting" aria-label={site.brand.name}>
      <div ref={shell} className="hero-shell h-[260svh]">
        <div data-surface="navy" className="sticky top-0 isolate h-svh overflow-hidden">
          <HeroVideo />
          <div
            aria-hidden
            data-hero-wash
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-navy/70 via-gold/10 to-navy/60 mix-blend-multiply motion-reduce:hidden"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-navy/85 via-navy/45 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-3/5 bg-linear-to-t from-navy/95 via-navy/80 to-transparent motion-reduce:block"
          />

          <div data-hero-panel="l" className="hero-panel pointer-events-none absolute inset-y-0 left-0 w-1/2" />
          <div data-hero-panel="r" className="hero-panel pointer-events-none absolute inset-y-0 right-0 w-1/2" />

          <div
            aria-hidden
            data-hero-wordrow
            className="pointer-events-none absolute inset-x-0 top-[20%] flex items-center justify-center"
          >
            <span data-hero-word="l" className={`${wordmark} w-1/2 pr-3 text-right md:pr-5 text-paper`}>
              {site.brand.wordmark.left}
            </span>
            <span data-hero-word="r" className={`${wordmark} w-1/2 pl-3 text-left md:pl-5 text-gold`}>
              {site.brand.wordmark.right}
            </span>
            <span className="hero-dot absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-3 gap-1.5">
              <span data-hero-dot="a" className="size-2 rounded-full bg-gold" />
              <span data-hero-dot="b" className="size-2 rounded-full bg-bronze" />
            </span>
          </div>

          <div
            data-hero-text
            className="absolute inset-x-0 top-[44%] bottom-0 z-10 container-x flex flex-col items-center text-center motion-reduce:top-auto motion-reduce:bottom-10"
          >
            <h1 className="t-h1 max-w-4xl">{site.hero.headline}</h1>
            <p className="t-body mt-4 max-w-xl text-fg-muted motion-reduce:text-fg">{site.hero.sub}</p>
            <ButtonLink href={site.cta.href} className="mt-6">
              {site.cta.label}
            </ButtonLink>
          </div>

          <a
            href="#about"
            data-hero-cue
            aria-label="Scroll to the next section"
            className="t-caption absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit flex-col items-center gap-1 text-fg-muted transition-colors hover:text-fg"
          >
            Scroll
            <ArrowDown data-hero-cue-arrow aria-hidden className="size-5 text-gold" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  );
}
