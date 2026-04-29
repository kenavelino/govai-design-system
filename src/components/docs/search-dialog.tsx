"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import { colors } from "@/lib/tokens";
import { Icon } from "@/components/ui/icon";

// ─── Types ────────────────────────────────────────────────────────────────────

type PageItem = {
  kind: "page";
  id: string;
  title: string;
  href: string;
  group: string;
};

type TokenItem = {
  kind: "token";
  id: string;
  name: string;
  scale: string;
  step: string;
  hex: string;
  group: string;
};

type SearchItem = PageItem | TokenItem;

// ─── Build indexes ────────────────────────────────────────────────────────────

const NAV_INDEX: PageItem[] = navigation.flatMap((g) =>
  g.items.map((i) => ({
    kind: "page",
    id: i.href,
    title: i.title,
    href: i.href,
    group: g.label,
  }))
);

const TOKEN_INDEX: TokenItem[] = (
  Object.entries(colors) as [string, Record<string, string>][]
).flatMap(([scale, steps]) =>
  Object.entries(steps).map(([step, hex]) => ({
    kind: "token",
    id: `${scale}-${step}`,
    name: `${scale}-${step}`,
    scale,
    step,
    hex,
    group: scale.charAt(0).toUpperCase() + scale.slice(1),
  }))
);

// Quick access shown when there is no query
const QUICK_ACCESS: PageItem[] = [
  ...navigation[0].items.slice(0, 4),
  ...navigation[1].items.slice(0, 3),
  ...navigation[2].items.slice(0, 5),
].map((i) => ({
  kind: "page",
  id: i.href,
  title: i.title,
  href: i.href,
  group:
    navigation.find((g) => g.items.some((n) => n.href === i.href))?.label ?? "",
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupBy<T extends { group: string }>(items: T[]) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    if (!map.has(item.group)) map.set(item.group, []);
    map.get(item.group)!.push(item);
  }
  return map;
}

function getItemHref(item: SearchItem) {
  return item.kind === "page" ? item.href : "/docs/foundations/colors";
}

// ─── Component ────────────────────────────────────────────────────────────────

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Build results
  const flatResults: SearchItem[] = (() => {
    if (!query.trim()) return QUICK_ACCESS;
    const q = query.toLowerCase();
    const pages = NAV_INDEX.filter((r) => r.title.toLowerCase().includes(q));
    const tokens = TOKEN_INDEX.filter(
      (r) => r.scale.includes(q) || r.name.includes(q)
    );
    return [...pages, ...tokens];
  })();

  // Group results by label
  const grouped = groupBy(flatResults);

  // Reset active when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Reset + focus on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function navigate(item: SearchItem) {
    router.push(getItemHref(item));
    onOpenChange(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatResults[activeIndex];
      if (item) navigate(item);
    }
  }

  const showEmpty = query.trim() && flatResults.length === 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-150" />

        {/* Panel */}
        <Dialog.Content
          aria-describedby={undefined}
          onKeyDown={handleKeyDown}
          className={cn(
            "fixed left-1/2 top-[18vh] z-[101] w-full max-w-[560px] -translate-x-1/2",
            "overflow-hidden rounded-[12px]",
            "border border-[var(--stroke-primary)] bg-white dark:bg-[var(--surface-default)]",
            "shadow-[0_24px_60px_rgba(0,0,0,0.14)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "duration-150"
          )}
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>

          {/* ── Input ── */}
          <div className="flex items-center gap-[10px] border-b border-[var(--stroke-primary)] px-[16px]">
            <Icon
              name="magnifying-glass"
              className="h-[18px] w-[18px] shrink-0 text-[var(--text-tertiary)]"
              aria-hidden
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="h-[52px] flex-1 bg-transparent text-[15px] leading-[24px] text-[var(--header-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                className="shrink-0 rounded-[4px] p-[2px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Clear"
              >
                <Icon name="x" className="h-[14px] w-[14px]" />
              </button>
            )}
          </div>

          {/* ── Results ── */}
          <div className="max-h-[380px] overflow-y-auto p-[8px]">
            {showEmpty ? (
              <p className="px-[12px] py-[32px] text-center text-[14px] text-[var(--text-tertiary)]">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              Array.from(grouped.entries()).map(([label, items]) => (
                <div key={label} className="mb-[4px] last:mb-0">
                  {/* Group label */}
                  <div className="px-[12px] pb-[2px] pt-[8px]">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-alt-tertiary)]">
                      {!query.trim() ? label : label}
                    </span>
                  </div>

                  {/* Group items */}
                  {items.map((item) => {
                    const idx = flatResults.indexOf(item);
                    const isActive = idx === activeIndex;

                    if (item.kind === "token") {
                      return (
                        <button
                          key={item.id}
                          ref={isActive ? activeRef : undefined}
                          type="button"
                          className={cn(
                            "flex w-full items-center gap-[10px] rounded-[6px] px-[12px] py-[7px] text-left transition-colors",
                            isActive
                              ? "bg-[var(--color-neutral-50)]"
                              : "hover:bg-[var(--color-neutral-50)]"
                          )}
                          onClick={() => navigate(item)}
                          onMouseEnter={() => setActiveIndex(idx)}
                        >
                          <span
                            className="h-[18px] w-[18px] shrink-0 rounded-full border border-black/10"
                            style={{ backgroundColor: item.hex }}
                            aria-hidden
                          />
                          <span className="flex-1 text-[14px] leading-[20px] text-[var(--text-primary)]">
                            {item.name}
                          </span>
                          <span className="font-mono text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                            {item.hex}
                          </span>
                        </button>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        ref={isActive ? activeRef : undefined}
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-[10px] rounded-[6px] px-[12px] py-[7px] text-left transition-colors",
                          isActive
                            ? "bg-[var(--color-neutral-50)]"
                            : "hover:bg-[var(--color-neutral-50)]"
                        )}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <Icon
                          name="arrow-right"
                          className="h-[16px] w-[16px] shrink-0 text-[var(--text-tertiary)]"
                          aria-hidden
                        />
                        <span className="flex-1 text-[14px] leading-[20px] text-[var(--text-primary)]">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* ── Footer ── */}
          {!showEmpty && (
            <div className="flex items-center gap-[16px] border-t border-[var(--stroke-primary)] px-[16px] py-[10px]">
              <span className="flex items-center gap-[5px] text-[12px] text-[var(--text-tertiary)]">
                <Kbd>↑↓</Kbd>
                <span>navigate</span>
              </span>
              <span className="flex items-center gap-[5px] text-[12px] text-[var(--text-tertiary)]">
                <Kbd>↵</Kbd>
                <span>Go to Page</span>
              </span>
              <span className="flex items-center gap-[5px] text-[12px] text-[var(--text-tertiary)]">
                <Kbd>Esc</Kbd>
                <span>close</span>
              </span>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-[18px] items-center rounded-[3px] border border-[var(--stroke-primary)] bg-[var(--surface-alt-tertiary)] px-[5px] font-mono text-[10px] text-[var(--text-secondary)]">
      {children}
    </kbd>
  );
}
