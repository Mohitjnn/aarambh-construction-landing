import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/blocks/Logo";
import { ButtonLink } from "@/components/blocks/ButtonLink";

export function Header() {
  return (
    <header
      data-surface="navy"
      className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-line bg-navy/80 backdrop-blur-md"
    >
      <div className="container-x flex h-full items-center justify-between gap-4">
        <Logo priority />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="t-caption font-medium text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={site.contact.phoneHref}
            className="t-caption hidden items-center gap-2 font-medium text-fg md:flex"
            aria-label={`Call ${site.contact.phone}`}
          >
            <Phone aria-hidden className="size-4" strokeWidth={1.75} />
            {site.contact.phone}
          </a>
          <ButtonLink href={site.cta.href}>{site.cta.label}</ButtonLink>
        </div>
      </div>
    </header>
  );
}
