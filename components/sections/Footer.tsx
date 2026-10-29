import { site } from "@/content/site";
import { Logo } from "@/components/blocks/Logo";
import { SoftRise } from "@/components/motion/SoftRise";

const { footer, contact, brand } = site;

export function Footer() {
  return (
    <footer data-surface="navy" data-role="footer" data-recipe="soft-rise" className="relative overflow-hidden border-t border-line bg-navy-deep pt-12 md:pt-16">
      <SoftRise className="container-x grid gap-10 pb-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="t-body mt-4 max-w-sm text-fg-muted">{footer.description}</p>
          <address className="t-body mt-4 not-italic text-fg-muted">
            {contact.address}
            <br />
            <a href={contact.phoneHref}>{contact.phone}</a> · <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </address>
        </div>
        <nav aria-label="Quick links" className="md:col-span-3 md:col-start-7">
          <h2 className="t-card mb-4">Quick Links</h2>
          <ul className="grid gap-2">
            {footer.quick.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-fg-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Other pages" className="md:col-span-3">
          <h2 className="t-card mb-4">Other Pages</h2>
          <ul className="grid gap-2">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-fg-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SoftRise>

      <div className="container-x border-t border-line py-5">
        <p className="t-caption text-fg-muted">&copy; {footer.copyright}</p>
      </div>

      <div
        aria-hidden
        data-text={brand.short}
        className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center text-[clamp(4rem,19vw,17rem)] font-bold uppercase leading-[0.8] text-gold/10 before:content-[attr(data-text)]"
      />
    </footer>
  );
}
