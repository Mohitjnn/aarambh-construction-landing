import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<"a"> & { variant?: "solid" | "outline" };

export function ButtonLink({ variant = "solid", className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={cn("btn", variant === "outline" && "btn-outline", className)} {...props}>
      {children}
      <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
    </a>
  );
}
