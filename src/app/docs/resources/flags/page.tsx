"use client";

import { Icon } from "@/components/ui/icon";
import { useMemo, useState, useEffect } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import manifest from "../../../../../public/flags/manifest.json";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "library", title: "Flag Library", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

type Region = "all" | "africa" | "americas" | "asia-pacific" | "europe" | "middle-east";

const REGIONS: { key: Region; label: string; filter: string }[] = [
  { key: "all", label: "All", filter: "" },
  { key: "africa", label: "Africa", filter: "Africa" },
  { key: "americas", label: "Americas", filter: "Americas" },
  { key: "asia-pacific", label: "Asia & Pacific", filter: "Asia & Pacific" },
  { key: "europe", label: "Europe", filter: "Europe" },
  { key: "middle-east", label: "Middle East", filter: "Middle East" },
];

type Country = { name: string; code: string; region: string };

async function downloadFlag(country: Country) {
  const url = `https://flagcdn.com/${country.code}.svg`;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `flag-${country.code}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function FlagTile({
  country,
  onCopy,
  isCopied,
}: {
  country: Country;
  onCopy: (c: Country) => void;
  isCopied: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onCopy(country)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCopy(country);
        }
      }}
      className="group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-[12px] rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[16px] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
      aria-label={`Copy ${country.name} ISO code`}
      title={country.name}
    >
      <div className="flex h-[30px] w-[44px] items-center justify-center overflow-hidden rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.12)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://flagcdn.com/w40/${country.code}.png`}
          srcSet={`https://flagcdn.com/w80/${country.code}.png 2x`}
          alt={country.name}
          width={44}
          height={30}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="max-w-full truncate text-[12px] leading-[16px] text-[var(--text-secondary)]">
        {isCopied ? "Copied!" : country.name}
      </span>

      {/* Download button — visible on group hover */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          downloadFlag(country);
        }}
        className="absolute right-[6px] top-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] text-[var(--icon-tertiary)] opacity-0 transition-all hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)] group-hover:opacity-100"
        aria-label={`Download ${country.name} flag SVG`}
        title="Download SVG"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M6 1.5v5M3.5 4.5 6 7l2.5-2.5M2 9.5h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function FlagsPage() {
  const [region, setRegion] = useState<Region>("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(120);

  const countries = manifest.countries as Country[];

  const filtered = useMemo(() => {
    const regionFilter = REGIONS.find((r) => r.key === region)?.filter ?? "";
    let list = regionFilter ? countries.filter((c) => c.region === regionFilter) : countries;
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
    return list;
  }, [countries, region, query]);

  const visible = filtered.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(120);
  }, [region, query]);

  const handleCopy = (country: Country) => {
    navigator.clipboard.writeText(country.code);
    setCopied(country.code);
    setTimeout(() => setCopied(""), 1500);
  };

  const firstCountry = filtered[0];

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        {/* Page header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Country Flags
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI flag library contains {manifest.total} country flags across six regions — Africa,
            Americas, Asia &amp; Pacific, Europe, and Middle East. Every flag is available as an SVG and
            referenced by its ISO 3166-1 alpha-2 country code. Click any flag to copy its code.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-secondary)]">
            Flags are identified by their ISO 3166-1 alpha-2 country code. Click any tile to copy the
            two-letter code to your clipboard. Hover a tile to reveal the download button and save the
            SVG locally.
          </p>
          <div className="mt-5 rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px]">
            <code className="text-[13px] leading-[20px] text-[var(--text-primary)]">
              {`<img src="https://flagcdn.com/${firstCountry?.code ?? "ae"}.svg" alt="${firstCountry?.name ?? "United Arab Emirates"}" width="40" />`}
            </code>
          </div>
        </section>

        {/* Flag Library */}
        <section id="library">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Flag Library
          </h2>

          <div className="mt-5 flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              value={region}
              onValueChange={(v) => setRegion(v as Region)}
              className="overflow-x-auto"
            >
              <TabsList>
                {REGIONS.map((r) => (
                  <TabsTrigger key={r.key} value={r.key}>
                    {r.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-[280px]">
              <Icon
                name="magnifying-glass"
                className="pointer-events-none absolute left-[12px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[var(--text-tertiary)]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search countries"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-[36px] w-full rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] pl-[36px] pr-[12px] text-[14px] leading-[20px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--color-primary-500)] focus:outline-none"
              />
            </div>
          </div>

          <p className="mt-3 text-[12px] leading-[16px] text-[var(--text-tertiary)]">
            {filtered.length} countr{filtered.length === 1 ? "y" : "ies"}
            {query && <span> · searching &quot;{query}&quot;</span>}
          </p>

          {filtered.length === 0 ? (
            <div className="mt-5 rounded-[12px] border border-dashed border-[var(--stroke-primary)] p-[24px] text-center">
              <p className="text-[14px] leading-[20px] text-[var(--text-secondary)]">
                No countries match &quot;{query}&quot;.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-2 gap-[16px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {visible.map((country) => (
                  <FlagTile
                    key={country.code}
                    country={country}
                    onCopy={handleCopy}
                    isCopied={copied === country.code}
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

        {/* Usage Guidelines */}
        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "Use ISO codes consistently",
                body: "Always reference flags by their ISO 3166-1 alpha-2 code (e.g. \"ae\" for the United Arab Emirates). This ensures consistent, unambiguous identification across all product surfaces.",
              },
              {
                title: "Respect standard proportions",
                body: "Display flags at sizes that preserve the native 3:2 aspect ratio — 16×11px, 24×16px, 32×21px, or 40×27px. Never stretch or crop flags as it misrepresents national symbols.",
              },
              {
                title: "Always provide accessible alt text",
                body: "Use the full country name as the alt attribute (e.g. alt=\"United Arab Emirates\"). Flags used purely as decoration should have aria-hidden=\"true\" to avoid cluttering the accessibility tree.",
              },
              {
                title: "Pairing flags with text labels",
                body: "When combining flags with country names — in dropdowns, selectors, or lists — display the flag at 16×11px with 8px of gap before the label. Use the body-secondary token for the country name text.",
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
