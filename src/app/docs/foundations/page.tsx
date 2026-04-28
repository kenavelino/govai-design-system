"use client";

import { Icon } from "@/components/ui/icon";
import Link from "next/link";

const foundations = [
  {
    title: "Colors",
    description: "Primary, secondary, semantic, and neutral color palettes with light and dark mode support.",
    href: "/docs/foundations/colors",
    icon: Palette,
  },
  {
    title: "Typography",
    description: "Instrument Sans type scale including display, heading, body, and label styles.",
    href: "/docs/foundations/typography",
    icon: Type,
  },
  {
    title: "Spacing",
    description: "4px-based spacing scale and responsive grid system across all breakpoints.",
    href: "/docs/foundations/spacing",
    icon: Maximize,
  },
  {
    title: "Elevation",
    description: "Shadow levels, depth hierarchy, and z-index scale for layered interfaces.",
    href: "/docs/foundations/elevation",
    icon: Layers,
  },
];

export default function FoundationsPage() {
  return (
    <div className="flex flex-col gap-[12px]">
      <div>
        <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
          Foundations
        </h1>
        <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
          The visual and structural foundations that define the GovAI Design System. These principles ensure consistency across all products.
        </p>
      </div>
      <div className="grid gap-[12px] md:grid-cols-2">
        {foundations.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="group rounded-2xl border border-[var(--stroke-primary)] p-[24px] transition-all hover:border-[var(--stroke-secondary)] hover:shadow-[var(--shadow-elevation-2)]"
          >
            <f.icon className="mb-3 h-6 w-6 text-[var(--icon-brand)]" />
            <h3 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)] group-hover:text-[var(--color-primary-700)] dark:group-hover:text-[var(--color-primary-400)]">
              {f.title}
            </h3>
            <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
