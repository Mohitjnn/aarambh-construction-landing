import Image from "next/image";
import { site } from "@/content/site";
import { Section } from "@/components/blocks/Section";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { MaskIn } from "@/components/motion/MaskIn";

const { team } = site;

export function Team() {
  return (
    <Section surface="navy" role="image-cards" recipe="mask-reveal" labelledBy="team-title">
      <SectionTitle id="team-title" eyebrow={team.eyebrow} title={team.title} />
      <ul className="grid gap-6 md:grid-cols-3">
        {team.people.map((p) => (
          <li key={p.name}>
            <MaskIn className="relative aspect-4/5 overflow-hidden border border-line">
              <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 360px, 100vw" style={{ objectPosition: p.focus }} className="object-cover" />
            </MaskIn>
            <h3 className="t-card mt-4">{p.name}</h3>
            <p className="t-caption text-eyebrow">{p.role}</p>
            <p className="t-body mt-2 text-fg-muted">{p.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
