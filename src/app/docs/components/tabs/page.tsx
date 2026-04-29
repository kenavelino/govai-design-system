"use client";

import { useLayoutEffect, useRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const DEMO_TABS_DATA = [
  { label: "Overview",  icon: "squares-four" },
  { label: "Analytics", icon: "chart-bar" },
  { label: "Settings",  icon: "gear" },
  { label: "Team",      icon: "users" },
];
const DEMO_TABS = DEMO_TABS_DATA.map((t) => t.label);

// ─── Line variant ────────────────────────────────────────────────────────────
function LineTabsDemo({ tabs = DEMO_TABS_DATA, icon = false }: { tabs?: typeof DEMO_TABS_DATA; icon?: boolean }) {
  const [value, setValue] = useState(tabs[0].label);
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ left: 0, width: 0, visible: false });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
      if (!active) { setInd((p) => ({ ...p, visible: false })); return; }
      const listRect = list.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setInd({ left: rect.left - listRect.left, width: rect.width, visible: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    list.querySelectorAll<HTMLElement>('[role="tab"]').forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [value, tabs]);

  return (
    <TabsPrimitive.Root value={value} onValueChange={setValue}>
      <TabsPrimitive.List
        ref={listRef}
        className="relative inline-flex items-center gap-[16px] border-b border-[var(--stroke-primary)]"
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.label}
            value={tab.label}
            className={cn(
              "relative inline-flex items-center justify-center gap-[8px] pb-[12px] pt-[8px] px-[4px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors duration-200",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              "data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
            )}
          >
            {icon && <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-[-1px] h-[2px] rounded-tl-[2px] rounded-tr-[2px] bg-[var(--color-primary-600)] transition-[transform,width,opacity] duration-[250ms] ease-[var(--ease-out)]",
            ind.visible ? "opacity-100" : "opacity-0"
          )}
          style={{ width: ind.width, transform: `translateX(${ind.left}px)` }}
        />
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

// ─── Rectangle · Brand variant ───────────────────────────────────────────────
function RectBrandDemo({ tabs = DEMO_TABS_DATA, icon = false }: { tabs?: typeof DEMO_TABS_DATA; icon?: boolean }) {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0].label}>
      <TabsPrimitive.List className="inline-flex items-stretch rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.15)]">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.label}
            value={tab.label}
            className={cn(
              "inline-flex items-center justify-center gap-[8px] rounded-[8px] border border-transparent px-[16px] py-[10px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors duration-200",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              "data-[state=active]:border-[var(--color-primary-600)] data-[state=active]:bg-[var(--surface-default)] data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
            )}
          >
            {icon && <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

// ─── Rectangle · Neutral variant ─────────────────────────────────────────────
function RectNeutralDemo({ tabs = DEMO_TABS_DATA, icon = false }: { tabs?: typeof DEMO_TABS_DATA; icon?: boolean }) {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0].label}>
      <TabsPrimitive.List className="inline-flex items-stretch rounded-[8px] border border-[var(--stroke-primary)]">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.label}
            value={tab.label}
            className={cn(
              "inline-flex items-center justify-center gap-[8px] rounded-[8px] border border-transparent px-[10px] py-[8px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors duration-200",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              "data-[state=active]:border-[var(--stroke-secondary)] data-[state=active]:text-[var(--header-primary)]"
            )}
          >
            {icon && <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

// ─── Rounded · Neutral / Brand variants ──────────────────────────────────────
function RoundedPillDemo({
  tabs = DEMO_TABS_DATA,
  brand = false,
  icon = false,
}: {
  tabs?: typeof DEMO_TABS_DATA;
  brand?: boolean;
  icon?: boolean;
}) {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0].label}>
      <TabsPrimitive.List className="inline-flex items-center gap-[12px]">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.label}
            value={tab.label}
            className={cn(
              "inline-flex items-center justify-center gap-[8px] rounded-[999px] border px-[16px] py-[8px] text-[14px] font-medium leading-[20px] transition-colors duration-200",
              "border-[var(--color-primary-100)] text-[var(--text-tertiary)]",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              brand
                ? "data-[state=active]:border-[var(--color-primary-600)] data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
                : "data-[state=active]:border-[var(--stroke-secondary)] data-[state=active]:text-[var(--header-primary)]"
            )}
          >
            {icon && <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

// ─── With Shadow variant ──────────────────────────────────────────────────────
function WithShadowDemo({ tabs = DEMO_TABS_DATA, icon = false }: { tabs?: typeof DEMO_TABS_DATA; icon?: boolean }) {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0].label}>
      <TabsPrimitive.List className="inline-flex items-center rounded-[8px] bg-[var(--surface-alt-tertiary)] p-[4px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.15)]">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.label}
            value={tab.label}
            className={cn(
              "inline-flex items-center justify-center gap-[8px] rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-all duration-200",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              "data-[state=active]:bg-[var(--surface-default)] data-[state=active]:text-[var(--header-primary)] data-[state=active]:shadow-[0px_0px_24px_0px_rgba(28,27,27,0.08)]"
            )}
          >
            {icon && <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

// ─── Both variants side-by-side helper ───────────────────────────────────────
function WithAndWithoutIcon({ children }: { children: (icon: boolean) => React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-[20px]">
      <div className="flex flex-col items-center gap-[8px]">
        <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--text-tertiary)]">Without icon</span>
        {children(false)}
      </div>
      <div className="w-full border-t border-dashed border-[var(--stroke-primary)]" />
      <div className="flex flex-col items-center gap-[8px]">
        <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--text-tertiary)]">With icon</span>
        {children(true)}
      </div>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────────────
type VariantKey =
  | "rounded-neutral"
  | "rounded-brand"
  | "line"
  | "rectangle-brand"
  | "rectangle-neutral"
  | "shadow";

const VARIANTS: { key: VariantKey; label: string; description: string }[] = [
  {
    key: "rounded-neutral",
    label: "Rounded · Neutral",
    description: "Standalone pill tabs with a neutral border on the active item. No container tray.",
  },
  {
    key: "rounded-brand",
    label: "Rounded · Brand",
    description: "Pill tabs with a brand-coloured border and text on the active item.",
  },
  {
    key: "line",
    label: "Line",
    description: "Minimal underline indicator anchored to a bottom border — best for primary navigation.",
  },
  {
    key: "rectangle-brand",
    label: "Rectangle · Brand",
    description: "Card-style tabs in a bordered tray. Active tab is outlined in the brand colour.",
  },
  {
    key: "rectangle-neutral",
    label: "Rectangle · Neutral",
    description: "Card-style tabs in a simple border tray. Active tab gets a neutral outline.",
  },
  {
    key: "shadow",
    label: "With Shadow",
    description: "Grey-tray tabs where the active tab floats with a white background and subtle elevation.",
  },
];

function VariantPreview({ variant, icon }: { variant: VariantKey; icon: boolean }) {
  switch (variant) {
    case "line":              return <LineTabsDemo icon={icon} />;
    case "rectangle-brand":   return <RectBrandDemo icon={icon} />;
    case "rectangle-neutral": return <RectNeutralDemo icon={icon} />;
    case "shadow":            return <WithShadowDemo icon={icon} />;
    case "rounded-brand":     return <RoundedPillDemo brand icon={icon} />;
    case "rounded-neutral":
    default:                  return <RoundedPillDemo icon={icon} />;
  }
}

// ─── TOC ─────────────────────────────────────────────────────────────────────
const tocItems = [
  { id: "overview",           title: "Overview",              level: 2 },
  { id: "playground",         title: "Interactive playground", level: 2 },
  { id: "rounded-neutral",    title: "Rounded · Neutral",     level: 2 },
  { id: "rounded-brand",      title: "Rounded · Brand",       level: 2 },
  { id: "line",               title: "Line (underline)",       level: 2 },
  { id: "rectangle-brand",    title: "Rectangle · Brand",     level: 2 },
  { id: "rectangle-neutral",  title: "Rectangle · Neutral",   level: 2 },
  { id: "shadow",             title: "With Shadow",            level: 2 },
  { id: "usage",              title: "Usage Guidelines",       level: 2 },
  { id: "accessibility",      title: "Accessibility",          level: 2 },
  { id: "api",                title: "API Reference",          level: 2 },
];

// ─── Code snippets ────────────────────────────────────────────────────────────
const overviewCode = `import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="Overview">
  <TabsList>
    <TabsTrigger value="Overview">Overview</TabsTrigger>
    <TabsTrigger value="Analytics">Analytics</TabsTrigger>
    <TabsTrigger value="Settings">Settings</TabsTrigger>
    <TabsTrigger value="Team">Team</TabsTrigger>
  </TabsList>
</Tabs>`;

const roundedNeutralCode = `// Without icon
<TabsPrimitive.List className="inline-flex items-center gap-[12px]">
  {tabs.map((tab) => (
    <TabsPrimitive.Trigger
      key={tab.label} value={tab.label}
      className="rounded-[999px] border border-[var(--color-primary-100)] px-[16px] py-[8px]
        text-[14px] font-medium text-[var(--text-tertiary)]
        data-[state=active]:border-[var(--stroke-secondary)]
        data-[state=active]:text-[var(--header-primary)]"
    >
      {tab.label}
    </TabsPrimitive.Trigger>
  ))}
</TabsPrimitive.List>

// With icon — add Icon before the label
<TabsPrimitive.Trigger ...>
  <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />
  {tab.label}
</TabsPrimitive.Trigger>`;

const roundedBrandCode = `// Without icon
<TabsPrimitive.List className="inline-flex items-center gap-[12px]">
  {tabs.map((tab) => (
    <TabsPrimitive.Trigger
      key={tab.label} value={tab.label}
      className="rounded-[999px] border border-[var(--color-primary-100)] px-[16px] py-[8px]
        text-[14px] font-medium text-[var(--text-tertiary)]
        data-[state=active]:border-[var(--color-primary-600)]
        data-[state=active]:text-[var(--color-primary-700)]"
    >
      {tab.label}
    </TabsPrimitive.Trigger>
  ))}
</TabsPrimitive.List>

// With icon — add Icon before the label
<TabsPrimitive.Trigger ...>
  <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />
  {tab.label}
</TabsPrimitive.Trigger>`;

const lineCode = `// Without icon
<TabsPrimitive.List className="relative inline-flex items-center gap-[16px] border-b border-[var(--stroke-primary)]">
  {tabs.map((tab) => (
    <TabsPrimitive.Trigger
      key={tab.label} value={tab.label}
      className="inline-flex items-center gap-[8px] pb-[12px] pt-[8px] px-[4px]
        text-[14px] font-medium text-[var(--text-tertiary)]
        data-[state=active]:text-[var(--color-primary-700)]"
    >
      {tab.label}
    </TabsPrimitive.Trigger>
  ))}
  {/* Animated 2px underline — position with transform + ResizeObserver */}
</TabsPrimitive.List>

// With icon — add Icon before the label
<TabsPrimitive.Trigger ...>
  <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />
  {tab.label}
</TabsPrimitive.Trigger>`;

const rectangleBrandCode = `// Without icon
<TabsPrimitive.List className="inline-flex items-stretch rounded-[8px] border border-[var(--stroke-primary)]
  bg-[var(--surface-default)] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.15)]">
  {tabs.map((tab) => (
    <TabsPrimitive.Trigger
      key={tab.label} value={tab.label}
      className="inline-flex items-center gap-[8px] rounded-[8px] border border-transparent
        px-[16px] py-[10px] text-[14px] font-medium text-[var(--text-tertiary)]
        data-[state=active]:border-[var(--color-primary-600)]
        data-[state=active]:text-[var(--color-primary-700)]"
    >
      {tab.label}
    </TabsPrimitive.Trigger>
  ))}
</TabsPrimitive.List>

// With icon — add Icon before the label
<TabsPrimitive.Trigger ...>
  <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />
  {tab.label}
</TabsPrimitive.Trigger>`;

const rectangleNeutralCode = `// Without icon
<TabsPrimitive.List className="inline-flex items-stretch rounded-[8px] border border-[var(--stroke-primary)]">
  {tabs.map((tab) => (
    <TabsPrimitive.Trigger
      key={tab.label} value={tab.label}
      className="inline-flex items-center gap-[8px] rounded-[8px] border border-transparent
        px-[10px] py-[8px] text-[14px] font-medium text-[var(--text-tertiary)]
        data-[state=active]:border-[var(--stroke-secondary)]
        data-[state=active]:text-[var(--header-primary)]"
    >
      {tab.label}
    </TabsPrimitive.Trigger>
  ))}
</TabsPrimitive.List>

// With icon — add Icon before the label
<TabsPrimitive.Trigger ...>
  <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />
  {tab.label}
</TabsPrimitive.Trigger>`;

const shadowCode = `// Without icon
<TabsPrimitive.List className="inline-flex items-center rounded-[8px]
  bg-[var(--surface-alt-tertiary)] p-[4px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.15)]">
  {tabs.map((tab) => (
    <TabsPrimitive.Trigger
      key={tab.label} value={tab.label}
      className="inline-flex items-center gap-[8px] rounded-[8px] px-[16px] py-[8px]
        text-[14px] font-medium text-[var(--text-tertiary)]
        data-[state=active]:bg-[var(--surface-default)]
        data-[state=active]:text-[var(--header-primary)]
        data-[state=active]:shadow-[0px_0px_24px_0px_rgba(28,27,27,0.08)]"
    >
      {tab.label}
    </TabsPrimitive.Trigger>
  ))}
</TabsPrimitive.List>

// With icon — add Icon before the label
<TabsPrimitive.Trigger ...>
  <Icon name={tab.icon} className="h-[20px] w-[20px] text-inherit" aria-hidden="true" />
  {tab.label}
</TabsPrimitive.Trigger>`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TabsPage() {
  const [playgroundVariant, setPlaygroundVariant] = useState<VariantKey>("rounded-neutral");
  const [showIcons, setShowIcons] = useState(false);

  const playgroundCode = (() => {
    switch (playgroundVariant) {
      case "line":              return lineCode;
      case "rectangle-brand":   return rectangleBrandCode;
      case "rectangle-neutral": return rectangleNeutralCode;
      case "shadow":            return shadowCode;
      case "rounded-brand":     return roundedBrandCode;
      case "rounded-neutral":
      default:                  return roundedNeutralCode;
    }
  })();

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Tabs
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Tabs organise content into parallel views where only one is visible at a time. Use them to split dense sections without forcing a page change.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="The default tab uses a chip-in-tray style with an animated sliding pill that signals the active view as the user switches."
            code={overviewCode}
          >
            <Tabs defaultValue={DEMO_TABS[0]}>
              <TabsList>
                {DEMO_TABS.map((t) => (
                  <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </ComponentPreview>
        </section>

        {/* Playground */}
        <section id="playground">
          <ComponentPreview
            heading="Interactive playground"
            description="Switch between the six Figma variants and toggle icons on or off to compare the visual language side by side."
            code={playgroundCode}
          >
            <div className="flex w-full flex-col items-center gap-[24px]">
              {/* Variant selector */}
              <div className="flex flex-wrap items-center justify-center gap-[8px]">
                {VARIANTS.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setPlaygroundVariant(v.key)}
                    aria-pressed={playgroundVariant === v.key}
                    className={cn(
                      "inline-flex h-[32px] items-center rounded-[8px] border px-[12px] text-[13px] font-medium leading-[18px] transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
                      playgroundVariant === v.key
                        ? "border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]"
                        : "border-[var(--stroke-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              {/* Icon toggle */}
              <div className="flex items-center gap-[8px]">
                <span className="text-[13px] text-[var(--text-tertiary)]">Icons</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={showIcons}
                  onClick={() => setShowIcons((v) => !v)}
                  className={cn(
                    "relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-[999px] border-2 border-transparent transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
                    showIcons ? "bg-[var(--color-primary-600)]" : "bg-[var(--stroke-primary)]"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow-sm transition-transform duration-200",
                      showIcons ? "translate-x-[16px]" : "translate-x-0"
                    )}
                  />
                </button>
                <span className="text-[13px] text-[var(--text-tertiary)]">{showIcons ? "On" : "Off"}</span>
              </div>

              {/* Preview */}
              <div className="flex min-h-[96px] w-full items-center justify-center rounded-[12px] border border-dashed border-[var(--stroke-primary)] bg-[var(--surface-primary)] px-[24px] py-[24px]">
                <VariantPreview variant={playgroundVariant} icon={showIcons} />
              </div>

              <p className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                {VARIANTS.find((v) => v.key === playgroundVariant)?.description}
              </p>
            </div>
          </ComponentPreview>
        </section>

        {/* Rounded · Neutral */}
        <section id="rounded-neutral">
          <ComponentPreview
            heading="Rounded · Neutral"
            description="Standalone pill tabs with a light brand border on each item. The active tab gets a neutral outline — no container tray."
            code={roundedNeutralCode}
          >
            <WithAndWithoutIcon>
              {(icon) => <RoundedPillDemo icon={icon} />}
            </WithAndWithoutIcon>
          </ComponentPreview>
        </section>

        {/* Rounded · Brand */}
        <section id="rounded-brand">
          <ComponentPreview
            heading="Rounded · Brand"
            description="Same pill shape, but the active tab is outlined and labelled in the brand colour. Use when you want stronger visual hierarchy."
            code={roundedBrandCode}
          >
            <WithAndWithoutIcon>
              {(icon) => <RoundedPillDemo brand icon={icon} />}
            </WithAndWithoutIcon>
          </ComponentPreview>
        </section>

        {/* Line */}
        <section id="line">
          <ComponentPreview
            heading="Line (underline)"
            description="Best for primary page-level navigation. Tabs sit along a bottom border with an animated 2px brand underline anchoring the active view."
            code={lineCode}
          >
            <WithAndWithoutIcon>
              {(icon) => <LineTabsDemo icon={icon} />}
            </WithAndWithoutIcon>
          </ComponentPreview>
        </section>

        {/* Rectangle · Brand */}
        <section id="rectangle-brand">
          <ComponentPreview
            heading="Rectangle · Brand"
            description="Card-style tabs in a shadowed, bordered tray. The active trigger gets a full brand-coloured border — strong emphasis without a filled background."
            code={rectangleBrandCode}
          >
            <WithAndWithoutIcon>
              {(icon) => <RectBrandDemo icon={icon} />}
            </WithAndWithoutIcon>
          </ComponentPreview>
        </section>

        {/* Rectangle · Neutral */}
        <section id="rectangle-neutral">
          <ComponentPreview
            heading="Rectangle · Neutral"
            description="Same card shape but the active trigger uses a neutral border — ideal when tabs sit next to strongly coloured content or in secondary panels."
            code={rectangleNeutralCode}
          >
            <WithAndWithoutIcon>
              {(icon) => <RectNeutralDemo icon={icon} />}
            </WithAndWithoutIcon>
          </ComponentPreview>
        </section>

        {/* With Shadow */}
        <section id="shadow">
          <ComponentPreview
            heading="With Shadow"
            description="A grey tray where the active tab floats with a white background and a soft elevation shadow. Use for toolbars that float above a canvas or media surface."
            code={shadowCode}
          >
            <WithAndWithoutIcon>
              {(icon) => <WithShadowDemo icon={icon} />}
            </WithAndWithoutIcon>
          </ComponentPreview>
        </section>

        {/* Usage */}
        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use line tabs for primary, page-level navigation between content sections",
              "Use rounded pill tabs for filtering and secondary segmented controls",
              "Keep labels short — 1–2 words is ideal, so every tab is visible without truncation",
              "Always show at least two tabs; otherwise use a heading",
              "Preserve tab state when users navigate away and return",
              "Add icons to reinforce the meaning of labels, especially for navigation-heavy interfaces",
            ]}
            dontItems={[
              "Don't use tabs for sequential steps — use a stepper instead",
              "Don't stack more than six tabs in a single row; collapse overflow into a menu",
              "Don't nest tabs within tabs",
              "Don't mix rectangle and rounded variants on the same surface",
              "Don't reorder tabs dynamically between sessions",
              "Don't use icons alone without labels — always pair them for clarity",
            ]}
          />
        </section>

        {/* Accessibility */}
        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Accessibility
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "WAI-ARIA Tabs pattern",
                desc: "Built on Radix primitives. The list has role='tablist', each trigger role='tab' with aria-selected, and each panel role='tabpanel' associated via aria-labelledby.",
              },
              {
                title: "Keyboard navigation",
                desc: "Arrow Left/Right moves focus between tabs, Home/End jumps to the first and last tab. Enter or Space activates the focused tab when manual activation is enabled.",
              },
              {
                title: "Focus management",
                desc: "Only the active tab is in the tab order (tabindex='0'). Inactive tabs use tabindex='-1' and are reached with arrow keys — preventing excessive tab stops for keyboard users.",
              },
              {
                title: "Visible focus ring",
                desc: "Every trigger exposes a 2px primary-500 focus ring with an offset so it stays readable over both light and dark backgrounds.",
              },
              {
                title: "Icons and screen readers",
                desc: "Tab icons are marked aria-hidden='true' so screen readers announce only the label text. Never rely on icons alone to convey tab identity.",
              },
              {
                title: "Motion",
                desc: "The sliding indicator (line variant) uses a 250ms transition. It is paused when users prefer reduced motion at the OS level.",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-[8px] border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {a.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            Tabs
          </h3>
          <PropsTable
            props={[
              { name: "value",           type: "string",                          description: "Controlled active tab value." },
              { name: "defaultValue",    type: "string",                          description: "Initial active tab for uncontrolled usage." },
              { name: "onValueChange",   type: "(value: string) => void",         description: "Fires when the active tab changes." },
              { name: "orientation",     type: '"horizontal" | "vertical"',       default: '"horizontal"', description: "Direction of the tab list." },
              { name: "activationMode", type: '"automatic" | "manual"',          default: '"automatic"',  description: "Whether tabs activate on focus or require Enter / Space." },
            ]}
          />
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            TabsList
          </h3>
          <PropsTable
            props={[
              { name: "children",  type: "ReactNode", required: true, description: "One or more <TabsTrigger> elements." },
              { name: "className", type: "string",                    description: "Extra classes merged onto the list container — override surface, padding, or gap here." },
            ]}
          />
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            TabsTrigger
          </h3>
          <PropsTable
            props={[
              { name: "value",     type: "string",  required: true, description: "Unique identifier matched against the active value." },
              { name: "disabled",  type: "boolean", default: "false", description: "Prevents interaction and dims the trigger." },
              { name: "className", type: "string",                    description: "Override active-state colours, padding, or typography per-trigger." },
            ]}
          />
        </section>
      </div>
    </>
  );
}
