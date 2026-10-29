import Image from "next/image";
import { Building2, Layers, PaintRoller, Zap, type LucideIcon } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/blocks/Section";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { Cascade } from "@/components/motion/Cascade";

const icons: Record<string, LucideIcon> = {
  building: Building2,
  "paint-roller": PaintRoller,
  layers: Layers,
  zap: Zap,
};

const { services } = site;

export function Services() {
  return (
    <Section id="services" surface="paper" role="image-cards" recipe="stagger-cascade" labelledBy="services-title">
      <SectionTitle id="services-title" eyebrow={services.eyebrow} title={services.title} />

      <Cascade className="grid gap-4 md:grid-cols-2">
        {services.core.map((s) => (
          <article key={s.title} data-cascade className="hairline-card group grid overflow-hidden sm:grid-cols-5">
            <div className="relative aspect-4/3 overflow-hidden sm:col-span-2 sm:aspect-auto sm:min-h-52">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-5 sm:col-span-3">
              <h3 className="t-card">{s.title}</h3>
              <p className="t-body mt-2 text-fg-muted">{s.text}</p>
            </div>
          </article>
        ))}
      </Cascade>

      <ul className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.more.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.title} className="flex gap-3">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-eyebrow" strokeWidth={1.5} />
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="t-caption mt-1 text-fg-muted">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
