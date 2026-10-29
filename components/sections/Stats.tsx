import { site } from "@/content/site";
import { Section } from "@/components/blocks/Section";
import { CountUp } from "@/components/motion/CountUp";

export function Stats() {
  return (
    <Section surface="navy" role="proof-wall" recipe="counter-tick" labelledBy="stats-title">
      <h2 id="stats-title" className="sr-only">
        Aarambh in numbers
      </h2>
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <li
            key={s.label}
            className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:flex-nowrap border-line px-4 py-3 lg:px-6 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}
          >
            <span className="text-[clamp(2.25rem,1.6rem+1.2vw,2.5rem)] font-bold leading-none text-gold">
              <CountUp value={s.value} suffix={s.suffix} />
            </span>
            <span className="t-body text-fg-muted lg:whitespace-nowrap">{s.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
