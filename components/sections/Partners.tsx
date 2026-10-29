import Image from "next/image";
import { site } from "@/content/site";
import { Section } from "@/components/blocks/Section";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { Cascade } from "@/components/motion/Cascade";

const { partners } = site;

export function Partners() {
  return (
    <Section surface="paper" role="proof-wall" recipe="stagger-cascade" labelledBy="partners-title">
      <SectionTitle id="partners-title" eyebrow={partners.eyebrow} title={partners.title} />

      <Cascade>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.banks.map((b) => (
            <li key={b.name} data-cascade className="hairline-card relative aspect-[496/224] overflow-hidden">
              <Image src={b.logo} alt={b.name} fill sizes="(min-width: 1024px) 180px, 45vw" className="object-contain p-1.5" />
            </li>
          ))}
        </ul>

        <h3 className="t-card mt-10 mb-4">{partners.firmsTitle}</h3>
        <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {partners.firms.map((f, i) => (
            <li key={f.name} data-cascade className={`border-b border-line px-1 py-5 sm:pr-6 ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}>
              <p className="t-card">{f.name}</p>
              <p className="t-caption mt-1 text-fg-muted">{f.role}</p>
            </li>
          ))}
        </ul>
      </Cascade>
    </Section>
  );
}
