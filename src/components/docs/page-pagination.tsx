"use client";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

type FlatItem = { title: string; href: string };

function flattenNavigation(): FlatItem[] {
  const flat: FlatItem[] = [];
  for (const group of navigation) {
    for (const item of group.items) {
      flat.push({ title: item.title, href: item.href });
    }
  }
  return flat;
}

export function PagePagination() {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/$/, "") || "/";
  const flat = flattenNavigation();
  const index = flat.findIndex((i) => i.href === pathname);

  if (index === -1) return null;

  const prev = index > 0 ? flat[index - 1] : null;
  const next = index < flat.length - 1 ? flat[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="relative mt-[64px] flex items-center justify-between gap-[12px] pt-[32px]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--stroke-primary)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      />
      {prev ? (
        <Button asChild variant="secondary" size="lg" className="group">
          <Link href={prev.href}>
            <Icon name="arrow-left" className="h-[16px] w-[16px] text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--text-primary)]" aria-hidden="true" />
            <span>{prev.title}</span>
          </Link>
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Button asChild variant="secondary" size="lg" className="group ml-auto">
          <Link href={next.href}>
            <span>{next.title}</span>
            <Icon name="arrow-right" className="h-[16px] w-[16px] text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--text-primary)]" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
