"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";

const { form } = site;

type Errors = Partial<Record<"name" | "email", string>>;

const field =
  "mt-2 block w-full min-h-11 border border-line bg-white/5 px-3 py-2.5 text-fg placeholder:text-fg-muted rounded-sm focus:border-gold";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="hairline-card flex items-start gap-3 p-6">
        <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.75} />
        <p className="t-body">{form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="hairline-card grid gap-5 p-5 md:p-6">
      <fieldset>
        <legend className="font-medium">{form.labels.type}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {form.types.map((t, i) => (
            <label key={t} className="relative cursor-pointer">
              <input type="radio" name="type" value={t} defaultChecked={i === 0} className="peer sr-only" />
              <span className="t-caption inline-flex min-h-11 items-center border border-line px-3 text-fg-muted transition-colors peer-checked:border-gold peer-checked:bg-gold peer-checked:text-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-medium">
            {form.labels.name}
            <span aria-hidden> *</span>
          </label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={field} />
          {errors.name ? (
            <p id="name-error" className="t-caption mt-1 text-gold">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="font-medium">
            {form.labels.email}
            <span aria-hidden> *</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={field} />
          {errors.email ? (
            <p id="email-error" className="t-caption mt-1 text-gold">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="font-medium">
          {form.labels.phone}
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>

      <div>
        <label htmlFor="message" className="font-medium">
          {form.labels.message}
        </label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>

      <button type="submit" className="btn w-full sm:w-fit">
        {form.submit}
      </button>
    </form>
  );
}
