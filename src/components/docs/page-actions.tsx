"use client";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

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

  return (
    <div className="float-right ml-[16px] mb-[16px] flex items-center gap-[6px]">
      {prev ? (
        <Button asChild variant="secondary" size="sm" className="w-[32px] px-0" aria-label={`Previous: ${prev.title}`} title={prev.title}>
          <Link href={prev.href}>
            <Icon name="arrow-left" className="h-[14px] w-[14px]" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button variant="secondary" size="sm" className="w-[32px] px-0" disabled aria-hidden="true">
          <Icon name="arrow-left" className="h-[14px] w-[14px]" aria-hidden="true" />
        </Button>
      )}

      {next ? (
        <Button asChild variant="secondary" size="sm" className="w-[32px] px-0" aria-label={`Next: ${next.title}`} title={next.title}>
          <Link href={next.href}>
            <Icon name="arrow-right" className="h-[14px] w-[14px]" aria-hidden="true" />
          </Link>
        </Button>
      ) : (
        <Button variant="secondary" size="sm" className="w-[32px] px-0" disabled aria-hidden="true">
          <Icon name="arrow-right" className="h-[14px] w-[14px]" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
