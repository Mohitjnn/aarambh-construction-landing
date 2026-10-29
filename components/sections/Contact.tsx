import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { LineReveal } from "@/components/motion/LineReveal";
import { ContactForm } from "@/components/sections/ContactForm";

const { contact, form } = site;

export function Contact() {
  return (
    <section
      id="contact"
      data-surface="navy"
      data-role="split"
      data-recipe="line-by-line-text"
      aria-labelledby="contact-title"
      className="section-pad"
    >
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="t-eyebrow mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-current" />
            {form.eyebrow}
          </p>
          <LineReveal id="contact-title" className="t-h2">
            {form.title}
          </LineReveal>
          <p className="t-body mt-4 max-w-sm text-fg-muted">{form.sub}</p>

          <div className="mt-6 border-t border-line pt-6">
            <p className="t-card">{contact.contactPerson.name}</p>
            <p className="t-caption text-eyebrow">{contact.contactPerson.role}</p>
            <ul className="mt-4 grid gap-3">
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-3">
                  <Phone aria-hidden className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3">
                  <Mail aria-hidden className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                <address className="not-italic">{contact.address}</address>
              </li>
            </ul>
          </div>

          <iframe
            title="Aarambh Construction office on the map, Borivali West"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-6 h-56 w-full border border-line grayscale"
          />
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
