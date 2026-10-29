import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "solid" | "outline";
  size?: "default" | "sm";
};

export function ButtonLink({
  variant = "solid",
  size = "default",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "btn",
        size === "sm" && "!min-h-0 !py-1.5 !px-3 text-[11px] sm:!py-2 sm:!px-4 sm:text-xs",
        variant === "outline" && "btn-outline",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden
        className={cn(size === "sm" ? "size-3 sm:size-3.5" : "size-4")}
        strokeWidth={1.75}
      />
    </a>
  );
}
