import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imgClassName,
  priority = false,
  onClick,
}: {
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href="#top"
      aria-label={`${site.brand.name}, back to top`}
      onClick={onClick}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/media/logo.webp"
        alt={site.brand.name}
        width={800}
        height={266}
        priority={priority}
        className={cn("h-10 sm:h-11 md:h-12 w-auto", imgClassName)}
      />
    </a>
  );
}
