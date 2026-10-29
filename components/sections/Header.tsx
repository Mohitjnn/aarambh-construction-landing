"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/blocks/Logo";
import { ButtonLink } from "@/components/blocks/ButtonLink";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close drawer when resized to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        data-surface="navy"
        className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-line bg-navy/80 backdrop-blur-md"
      >
        <div className="container-x relative flex h-full items-center justify-between gap-2 lg:gap-4">
          {/* Mobile Left: Navigation Drawer Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Open navigation menu"
              className="inline-flex size-9 items-center justify-center rounded-sm border border-line text-fg transition-all duration-200 hover:border-gold hover:text-gold active:scale-95 focus-visible:outline-2 focus-visible:outline-gold sm:size-10"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Logo: Centered on mobile (<lg), positioned on left on desktop (lg+) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0">
            <Logo priority imgClassName="h-10 sm:h-11 md:h-12" />
          </div>

          {/* Desktop Navigation Items */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="t-caption font-medium text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action: Call link (desktop) & Reduced/Refined CTA button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={site.contact.phoneHref}
              className="t-caption hidden items-center gap-2 font-medium text-fg xl:flex"
              aria-label={`Call ${site.contact.phone}`}
            >
              <Phone aria-hidden className="size-4" strokeWidth={1.75} />
              {site.contact.phone}
            </a>
            <ButtonLink
              href={site.cta.href}
              size="sm"
              className="whitespace-nowrap lg:!min-h-[2.75rem] lg:!px-5 lg:!py-2.5 lg:text-sm lg:[&>svg]:size-4"
            >
              {site.cta.label}
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-navy-deep/80 backdrop-blur-sm transition-all duration-500 ease-out lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-In Navigation Drawer Panel (Slides from left with smooth curve) */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        data-surface="navy"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-[340px] flex-col border-r border-line bg-navy shadow-[0_0_50px_rgba(0,0,0,0.6)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header (Fades and drops in) */}
        <div
          className={cn(
            "flex h-(--header-h) items-center justify-between border-b border-line px-5 transition-all duration-500 ease-out",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          )}
          style={{ transitionDelay: isOpen ? "80ms" : "0ms" }}
        >
          <Logo priority onClick={() => setIsOpen(false)} imgClassName="h-9 sm:h-10" />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="group inline-flex size-9 items-center justify-center rounded-sm border border-line text-fg transition-all duration-200 hover:border-gold hover:text-gold active:scale-95 focus-visible:outline-2 focus-visible:outline-gold sm:size-10"
          >
            <X
              className={cn(
                "size-5 transition-transform duration-500 ease-out",
                isOpen ? "rotate-0" : "-rotate-90"
              )}
              strokeWidth={1.75}
            />
          </button>
        </div>

        {/* Drawer Navigation Links (Staggered cascade animation) */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div
            className={cn(
              "mb-3 text-[11px] font-semibold uppercase tracking-wider text-eyebrow transition-all duration-500 ease-out",
              isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            )}
            style={{ transitionDelay: isOpen ? "120ms" : "0ms" }}
          >
            Navigation
          </div>
          <nav aria-label="Mobile Navigation">
            <ul className="space-y-1">
              {site.nav.map((item, index) => (
                <li
                  key={item.href}
                  className={cn(
                    "transition-all duration-500 ease-out",
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                  )}
                  style={{
                    transitionDelay: isOpen ? `${140 + index * 55}ms` : "0ms",
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between rounded px-3 py-3 text-base font-medium text-fg transition-colors hover:bg-white/5 hover:text-gold"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-gold/60 transition-colors group-hover:text-gold">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 -translate-x-1 text-fg-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-gold"
                      strokeWidth={1.75}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Drawer Direct Contact & Call To Action (Slide up entrance) */}
        <div
          className={cn(
            "space-y-4 border-t border-line bg-navy-deep/40 p-5 transition-all duration-500 ease-out",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
          style={{
            transitionDelay: isOpen ? `${160 + site.nav.length * 55}ms` : "0ms",
          }}
        >
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-eyebrow">
              Direct Contact
            </div>
            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <Phone className="size-4 shrink-0 text-gold" strokeWidth={1.75} />
              <span>{site.contact.phone}</span>
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <Mail className="size-4 shrink-0 text-gold" strokeWidth={1.75} />
              <span className="truncate">{site.contact.email}</span>
            </a>
          </div>

          <ButtonLink
            href={site.cta.href}
            onClick={() => setIsOpen(false)}
            className="w-full justify-center"
          >
            {site.cta.label}
          </ButtonLink>
        </div>
      </aside>
    </>
  );
}
