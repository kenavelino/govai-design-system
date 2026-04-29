"use client";

import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type FlatItem = { title: string; href: string };

function flatten(): FlatItem[] {
  return navigation.flatMap((g) =>
    g.items.map((i) => ({ title: i.title, href: i.href }))
  );
}

export function PageActions() {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/$/, "") || "/";
  const flat = flatten();
  const index = flat.findIndex((i) => i.href === pathname);
  const prev = index > 0 ? flat[index - 1] : null;
  const next = index < flat.length - 1 ? flat[index + 1] : null;

  const iconButtonClass = cn(
    "flex h-[32px] w-[32px] items-center justify-center rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] transition-colors",
    "hover:bg-[var(--surface-alt-tertiary)]"
  );

  const disabledButtonClass =
    "flex h-[32px] w-[32px] items-center justify-center rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] opacity-40 cursor-not-allowed";

  return (
    <div className="float-right ml-[16px] mb-[16px] flex items-center gap-[6px]">
      {prev ? (
        <Link
          href={prev.href}
          aria-label={`Previous: ${prev.title}`}
          title={prev.title}
          className={iconButtonClass}
        >
          <Icon name="arrow-left" className="h-[14px] w-[14px] text-[var(--text-primary)]" aria-hidden="true" />
        </Link>
      ) : (
        <span className={disabledButtonClass} aria-hidden="true">
          <Icon name="arrow-left" className="h-[14px] w-[14px] text-[var(--text-tertiary)]" />
        </span>
      )}

      {next ? (
        <Link
          href={next.href}
          aria-label={`Next: ${next.title}`}
          title={next.title}
          className={iconButtonClass}
        >
          <Icon name="arrow-right" className="h-[14px] w-[14px] text-[var(--text-primary)]" aria-hidden="true" />
        </Link>
      ) : (
        <span className={disabledButtonClass} aria-hidden="true">
          <Icon name="arrow-right" className="h-[14px] w-[14px] text-[var(--text-tertiary)]" />
        </span>
      )}
    </div>
  );
}
