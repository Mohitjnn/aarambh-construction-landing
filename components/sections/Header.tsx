"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/blocks/Logo";
import { ButtonLink } from "@/components/blocks/ButtonLink";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when the slide-out sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        data-surface="navy"
        className="fixed inset-x-0 top-0 z-40 h-(--header-h) border-b border-line bg-navy/80 backdrop-blur-md"
      >
        <div className="container-x flex h-full items-center justify-between gap-4">
          <Logo priority />

          {/* Desktop Navigation */}
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

          {/* Desktop CTA & Phone */}
          <div className="hidden items-center gap-4 sm:flex">
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

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex size-10 items-center justify-center rounded-sm text-fg transition-colors hover:bg-white/10 lg:hidden"
            aria-expanded={isOpen}
            aria-label="Open mobile menu"
            aria-controls="mobile-sheet"
          >
            <Menu className="size-6" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Dimmed Overlay Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-50 bg-navy-deep/60 backdrop-blur-xs transition-opacity duration-300 ease-out lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-out Sheet */}
      <aside
        id="mobile-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        data-surface="navy"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-line bg-navy shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sheet Top Bar with matching header height */}
        <div className="flex h-(--header-h) items-center justify-between border-b border-line px-6">
          <span className="t-eyebrow">Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            className="flex size-9 items-center justify-center rounded-sm text-fg transition-colors hover:bg-white/10"
            aria-label="Close mobile menu"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-8">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="flex rounded-sm px-3 py-2.5 text-base font-medium text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Footer */}
          <div className="flex flex-col gap-4 border-t border-line pt-6">
            <a
              href={site.contact.phoneHref}
              className="flex items-center gap-3 px-3 py-1.5 text-sm font-medium text-fg"
              aria-label={`Call ${site.contact.phone}`}
            >
              <Phone aria-hidden className="size-4 text-gold" strokeWidth={1.75} />
              {site.contact.phone}
            </a>
            <ButtonLink
              href={site.cta.href}
              onClick={closeMenu}
              className="w-full justify-center"
            >
              {site.cta.label}
            </ButtonLink>
          </div>
        </div>
      </aside>
    </>
  );
}