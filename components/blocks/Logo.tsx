import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <a href="#top" aria-label={`${site.brand.name}, back to top`} className={cn("inline-flex", className)}>
      <Image src="/media/logo.webp" alt={site.brand.name} width={800} height={266} priority={priority} className="h-11 w-auto" />
    </a>
  );
}
