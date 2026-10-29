import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  surface: "paper" | "navy";
  role: string;
  recipe: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, surface, role, recipe, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-surface={surface}
      data-role={role}
      data-recipe={recipe}
      aria-labelledby={labelledBy}
      className={cn("section-pad", className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}
