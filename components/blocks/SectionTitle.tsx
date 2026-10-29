import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  className?: string;
  titleRef?: React.Ref<HTMLHeadingElement>;
};

export function SectionTitle({ id, eyebrow, title, sub, className, titleRef }: SectionTitleProps) {
  return (
    <header className={cn("mb-8 md:mb-10 max-w-3xl", className)}>
      <p className="t-eyebrow mb-3 flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-current" />
        {eyebrow}
      </p>
      <h2 id={id} ref={titleRef} className="t-h2">
        {title}
      </h2>
      {sub ? <p className="t-body mt-4 text-fg-muted max-w-xl">{sub}</p> : null}
    </header>
  );
}
