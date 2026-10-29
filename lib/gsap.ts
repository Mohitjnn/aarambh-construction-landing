import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const ease = {
  out: "power3.out",
  expo: "expo.out",
} as const;

export const motion = {
  reveal: 0.7,
  micro: 0.2,
  stagger: 0.12,
} as const;

export const mm = {
  full: "(prefers-reduced-motion: no-preference)",
  fullDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
