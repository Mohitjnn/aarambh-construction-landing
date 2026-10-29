import { site } from "@/content/site";
import { Section } from "@/components/blocks/Section";
import { SectionTitle } from "@/components/blocks/SectionTitle";
import { SoftRise } from "@/components/motion/SoftRise";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const { faqs } = site;

export function Faqs() {
  return (
    <Section id="faqs" surface="paper" role="statement" recipe="soft-rise" labelledBy="faqs-title">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionTitle id="faqs-title" eyebrow={faqs.eyebrow} title={faqs.title} className="mb-0" />
        </div>
        <SoftRise className="md:col-span-7">
          <Accordion defaultValue={[faqs.items[0].q]} className="border-t border-line">
            {faqs.items.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="t-body max-w-xl">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SoftRise>
      </div>
    </Section>
  );
}
