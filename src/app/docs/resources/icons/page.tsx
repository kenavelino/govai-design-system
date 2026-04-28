"use client";

import { Icon } from "@/components/ui/icon";
import { useMemo, useState, useEffect } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import manifest from "../../../../../public/icons/manifest.json";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "library", title: "Icon Library", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

type Weight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";

const WEIGHTS: { key: Weight; label: string }[] = [
  { key: "thin", label: "Thin" },
  { key: "light", label: "Light" },
  { key: "regular", label: "Regular" },
  { key: "bold", label: "Bold" },
  { key: "fill", label: "Fill" },
  { key: "duotone", label: "Duotone" },
];

type Manifest = Record<Weight, string[]> & { total: number; weights: Weight[] };

function IconTile({
  name,
  weight,
  onCopy,
  isCopied,
}: {
  name: string;
  weight: Weight;
  onCopy: (name: string) => void;
  isCopied: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(name)}
      className="group flex aspect-square w-full flex-col items-center justify-center gap-[16px] rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[16px] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
      aria-label={`Copy icon name ${name}`}
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${weight}/${name}.svg`}
        alt={name}
        width={32}
        height={32}
        className="h-[32px] w-[32px] dark:invert"
        loading="lazy"
      />
      <span className="max-w-full truncate text-[14px] leading-[20px] text-[var(--text-secondary)]">
        {isCopied ? "Copied!" : name}
      </span>
    </button>
  );
}

export default function IconsPage() {
  const [weight, setWeight] = useState<Weight>("regular");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(120);

  const m = manifest as unknown as Manifest;

  const allIcons = useMemo(() => m[weight] ?? [], [m, weight]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIcons;
    return allIcons.filter((n) => n.toLowerCase().includes(q));
  }, [allIcons, query]);

  const visible = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(120);
  }, [weight, query]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Icons
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI icon library contains {m.total} icons across six weights —
            Thin, Light, Regular, Bold, Fill, and Duotone. Every icon is
            available as an SVG from the official Figma library and mirrored
            here for browsing.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-secondary)]">
            Import icons directly as SVGs or use the file paths below in a
            component. Click any icon to copy its name to the clipboard.
          </p>
          <div className="mt-5 rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px]">
            <code className="text-[13px] leading-[20px] text-[var(--text-primary)]">
              {`<img src="/icons/${weight}/${filtered[0] ?? "acorn"}.svg" alt="" />`}
            </code>
          </div>
        </section>

        <section id="library">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Icon Library
          </h2>

          <div className="mt-5 flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              value={weight}
              onValueChange={(v) => setWeight(v as Weight)}
              className="overflow-x-auto"
            >
              <TabsList>
                {WEIGHTS.map((w) => (
                  <TabsTrigger key={w.key} value={w.key}>
                    {w.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-[280px]">
              <Icon name="magnifying-glass" className="pointer-events-none absolute left-[12px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[var(--text-tertiary)]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search icons"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-[36px] w-full rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] pl-[36px] pr-[12px] text-[14px] leading-[20px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary-500)] focus:outline-none"
              />
            </div>
          </div>

          <p className="mt-3 text-[12px] leading-[16px] text-[var(--text-tertiary)]">
            {filtered.length} icon{filtered.length === 1 ? "" : "s"}
            {query && <span> · searching &quot;{query}&quot;</span>}
          </p>

          {filtered.length === 0 ? (
            <div className="mt-5 rounded-[12px] border border-dashed border-[var(--stroke-primary)] p-[24px] text-center">
              <p className="text-[14px] leading-[20px] text-[var(--text-secondary)]">
                No icons match &quot;{query}&quot;.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-2 gap-[16px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {visible.map((name) => (
                  <IconTile
                    key={name}
                    name={name}
                    weight={weight}
                    onCopy={handleCopy}
                    isCopied={copied === name}
                  />
                ))}
              </div>
              {filtered.length > visibleCount && (
                <div className="mt-[16px] flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + 240)}
                    className="inline-flex h-[40px] items-center gap-[8px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[16px] text-[14px] font-medium leading-[20px] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
                  >
                    Load more ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "Consistent weight",
                body: "Use the same weight across a product surface. Mixing Regular with Bold within one screen breaks visual rhythm.",
              },
              {
                title: "Standard sizes",
                body: "Render icons at 16px, 20px, or 24px. These map cleanly to the Body/Label text scale for inline and button-aligned usage.",
              },
              {
                title: "Color with tokens",
                body: "Apply color via semantic tokens (var(--text-secondary) for default, var(--color-primary-600) for active/brand).",
              },
              {
                title: "Accessible labels",
                body: "Icon-only buttons must have aria-label. Decorative icons should have aria-hidden=\"true\".",
              },
            ].map((g) => (
              <div
                key={g.title}
                className="rounded-[12px] border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {g.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
