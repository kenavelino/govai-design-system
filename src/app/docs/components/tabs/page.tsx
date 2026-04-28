"use client";

import { useLayoutEffect, useRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const DEMO_TABS = ["Overview", "Analytics", "Settings", "Team"];

type LineTabsProps = {
  tabs?: string[];
  defaultValue?: string;
  dense?: boolean;
};

function LineTabsDemo({ tabs = DEMO_TABS, defaultValue, dense = false }: LineTabsProps) {
  const [value, setValue] = useState(defaultValue ?? tabs[0]);
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ left: 0, width: 0, visible: false });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]'
      );
      if (!active) {
        setInd((p) => ({ ...p, visible: false }));
        return;
      }
      const listRect = list.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setInd({
        left: rect.left - listRect.left,
        width: rect.width,
        visible: true,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    list
      .querySelectorAll<HTMLElement>('[role="tab"]')
      .forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [value, tabs]);

  return (
    <TabsPrimitive.Root value={value} onValueChange={setValue}>
      <TabsPrimitive.List
        ref={listRef}
        className="relative inline-flex items-center gap-[16px] border-b border-[var(--stroke-primary)]"
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab}
            value={tab}
            className={cn(
              "relative inline-flex items-center justify-center text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors duration-200 ease-[var(--ease-out)]",
              dense ? "px-[4px] pb-[8px] pt-[6px]" : "px-[4px] pb-[12px] pt-[8px]",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              "data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
            )}
          >
            {tab}
          </TabsPrimitive.Trigger>
        ))}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-[-1px] h-[2px] rounded-full bg-[var(--color-primary-600)] transition-[transform,width,opacity] duration-[250ms] ease-[var(--ease-out)]",
            ind.visible ? "opacity-100" : "opacity-0"
          )}
          style={{ width: ind.width, transform: `translateX(${ind.left}px)` }}
        />
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

type RectTone = "brand" | "neutral";

function RectangleTabsDemo({
  tone,
  elevated = false,
  tabs = DEMO_TABS,
}: {
  tone: RectTone;
  elevated?: boolean;
  tabs?: string[];
}) {
  return (
    <TabsPrimitive.Root defaultValue={tabs[0]}>
      <TabsPrimitive.List
        className={cn(
          "inline-flex items-center gap-[8px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[8px]",
          elevated && "shadow-[0_1px_3px_0_rgba(16,24,40,0.15)]"
        )}
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab}
            value={tab}
            className={cn(
              "inline-flex h-[36px] items-center justify-center rounded-[6px] border border-transparent px-[12px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors duration-200 ease-[var(--ease-out)]",
              "hover:text-[var(--header-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
              tone === "brand"
                ? "data-[state=active]:border-[var(--color-primary-600)] data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
                : "data-[state=active]:border-[var(--stroke-secondary)] data-[state=active]:bg-[var(--surface-tertiary)] data-[state=active]:text-[var(--header-primary)]"
            )}
          >
            {tab}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

function ChipTabsDemo({
  tabs = DEMO_TABS,
  activeBrand = false,
}: {
  tabs?: string[];
  activeBrand?: boolean;
}) {
  return (
    <Tabs defaultValue={tabs[0]}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              activeBrand &&
                "data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

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
    description: "Pill tabs on a subtle surface. Neutral active state.",
  },
  {
    key: "rounded-brand",
    label: "Rounded · Brand",
    description: "Pill tabs with a brand-colored active label.",
  },
  {
    key: "line",
    label: "Line",
    description: "Underline indicator anchored to a bottom border.",
  },
  {
    key: "rectangle-brand",
    label: "Rectangle · Brand",
    description: "Card-style tabs; active tab gets a brand border.",
  },
  {
    key: "rectangle-neutral",
    label: "Rectangle · Neutral",
    description: "Card-style tabs; active tab is filled with a neutral tone.",
  },
  {
    key: "shadow",
    label: "With Shadow",
    description: "Elevated rectangle tabs for floating toolbars.",
  },
];

function VariantPreview({ variant }: { variant: VariantKey }) {
  switch (variant) {
    case "line":
      return <LineTabsDemo />;
    case "rectangle-brand":
      return <RectangleTabsDemo tone="brand" />;
    case "rectangle-neutral":
      return <RectangleTabsDemo tone="neutral" />;
    case "shadow":
      return <RectangleTabsDemo tone="brand" elevated />;
    case "rounded-brand":
      return <ChipTabsDemo activeBrand />;
    case "rounded-neutral":
    default:
      return <ChipTabsDemo />;
  }
}

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "playground", title: "Interactive playground", level: 2 },
  { id: "rounded", title: "Rounded (chip) tabs", level: 2 },
  { id: "line", title: "Line (underline)", level: 2 },
  { id: "rectangle-brand", title: "Rectangle · Brand", level: 2 },
  { id: "rectangle-neutral", title: "Rectangle · Neutral", level: 2 },
  { id: "shadow", title: "With shadow", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

const roundedCode = `import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="Overview">
  <TabsList>
    <TabsTrigger value="Overview">Overview</TabsTrigger>
    <TabsTrigger value="Analytics">Analytics</TabsTrigger>
    <TabsTrigger value="Settings">Settings</TabsTrigger>
    <TabsTrigger value="Team">Team</TabsTrigger>
  </TabsList>
</Tabs>`;

const roundedBrandCode = `<Tabs defaultValue="Overview">
  <TabsList>
    {tabs.map((t) => (
      <TabsTrigger
        key={t}
        value={t}
        className="data-[state=active]:text-[var(--color-primary-700)] dark:data-[state=active]:text-[var(--color-primary-400)]"
      >
        {t}
      </TabsTrigger>
    ))}
  </TabsList>
</Tabs>`;

const lineCode = `import * as TabsPrimitive from "@radix-ui/react-tabs";

<TabsPrimitive.Root defaultValue="Overview">
  <TabsPrimitive.List
    className="relative inline-flex items-center gap-[16px] border-b border-[var(--stroke-primary)]"
  >
    {tabs.map((t) => (
      <TabsPrimitive.Trigger
        key={t}
        value={t}
        className="px-[4px] pb-[12px] pt-[8px] text-[14px] font-medium text-[var(--text-tertiary)]
          data-[state=active]:text-[var(--color-primary-700)]
          dark:data-[state=active]:text-[var(--color-primary-400)]"
      >
        {t}
      </TabsPrimitive.Trigger>
    ))}
    {/* Animated 2px underline sits beneath the active trigger */}
  </TabsPrimitive.List>
</TabsPrimitive.Root>`;

const rectangleBrandCode = `<TabsPrimitive.Root defaultValue="Overview">
  <TabsPrimitive.List className="inline-flex items-center gap-[8px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[8px]">
    {tabs.map((t) => (
      <TabsPrimitive.Trigger
        key={t}
        value={t}
        className="h-[36px] rounded-[6px] border border-transparent px-[12px] text-[14px] font-medium text-[var(--text-tertiary)]
          data-[state=active]:border-[var(--color-primary-600)]
          data-[state=active]:text-[var(--color-primary-700)]
          dark:data-[state=active]:text-[var(--color-primary-400)]"
      >
        {t}
      </TabsPrimitive.Trigger>
    ))}
  </TabsPrimitive.List>
</TabsPrimitive.Root>`;

const rectangleNeutralCode = `<TabsPrimitive.Root defaultValue="Overview">
  <TabsPrimitive.List className="inline-flex items-center gap-[8px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[8px]">
    {tabs.map((t) => (
      <TabsPrimitive.Trigger
        key={t}
        value={t}
        className="h-[36px] rounded-[6px] border border-transparent px-[12px] text-[14px] font-medium text-[var(--text-tertiary)]
          data-[state=active]:border-[var(--stroke-secondary)]
          data-[state=active]:bg-[var(--surface-tertiary)]
          data-[state=active]:text-[var(--header-primary)]"
      >
        {t}
      </TabsPrimitive.Trigger>
    ))}
  </TabsPrimitive.List>
</TabsPrimitive.Root>`;

const shadowCode = `<TabsPrimitive.List
  className="inline-flex items-center gap-[8px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[8px] shadow-[0_1px_3px_0_rgba(16,24,40,0.15)]"
>
  {/* triggers match Rectangle · Brand */}
</TabsPrimitive.List>`;

const overviewCode = `import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="Overview">
  <TabsList>
    <TabsTrigger value="Overview">Overview</TabsTrigger>
    <TabsTrigger value="Analytics">Analytics</TabsTrigger>
    <TabsTrigger value="Settings">Settings</TabsTrigger>
    <TabsTrigger value="Team">Team</TabsTrigger>
  </TabsList>
</Tabs>`;

export default function TabsPage() {
  const [playgroundVariant, setPlaygroundVariant] =
    useState<VariantKey>("rounded-neutral");

  const playgroundCode = (() => {
    switch (playgroundVariant) {
      case "line":
        return lineCode;
      case "rectangle-brand":
        return rectangleBrandCode;
      case "rectangle-neutral":
        return rectangleNeutralCode;
      case "shadow":
        return shadowCode;
      case "rounded-brand":
        return roundedBrandCode;
      case "rounded-neutral":
      default:
        return roundedCode;
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

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="The default tab renders as a rounded chip inside a subtle tray. The sliding pill signals the active view and animates as the user switches."
            code={overviewCode}
          >
            <ChipTabsDemo />
          </ComponentPreview>
        </section>

        <section id="playground">
          <ComponentPreview
            heading="Interactive playground"
            description="Switch between the six Figma variants to compare the visual language side by side."
            code={playgroundCode}
          >
            <div className="flex w-full flex-col items-center gap-[24px]">
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

              <div className="flex min-h-[96px] w-full items-center justify-center rounded-[12px] border border-dashed border-[var(--stroke-primary)] bg-[var(--surface-primary)] px-[24px] py-[24px]">
                <VariantPreview variant={playgroundVariant} />
              </div>

              <p className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                {VARIANTS.find((v) => v.key === playgroundVariant)?.description}
              </p>
            </div>
          </ComponentPreview>
        </section>

        <section id="rounded">
          <ComponentPreview
            heading="Rounded (chip) tabs"
            description="The retained chip styling — pill triggers on a neutral tray with an animated sliding indicator. Use for filtering and dense toolbars."
            code={roundedCode}
          >
            <div className="flex w-full flex-col items-center gap-[20px]">
              <ChipTabsDemo />
              <ChipTabsDemo activeBrand />
            </div>
          </ComponentPreview>
        </section>

        <section id="line">
          <ComponentPreview
            heading="Line (underline)"
            description="Best for primary page-level navigation. Tabs sit along a bottom border with a 2px brand-coloured underline anchoring the active view."
            code={lineCode}
          >
            <div className="flex w-full flex-col items-center gap-[20px]">
              <LineTabsDemo />
            </div>
          </ComponentPreview>
        </section>

        <section id="rectangle-brand">
          <ComponentPreview
            heading="Rectangle · Brand"
            description="Card-style tabs framed in a bordered tray. The active trigger is marked with a brand-coloured border and text."
            code={rectangleBrandCode}
          >
            <RectangleTabsDemo tone="brand" />
          </ComponentPreview>
        </section>

        <section id="rectangle-neutral">
          <ComponentPreview
            heading="Rectangle · Neutral"
            description="Same tray as the brand variant, but the active trigger fills with a neutral tone — ideal when tabs live next to strongly coloured content."
            code={rectangleNeutralCode}
          >
            <RectangleTabsDemo tone="neutral" />
          </ComponentPreview>
        </section>

        <section id="shadow">
          <ComponentPreview
            heading="With shadow"
            description="Rectangle tabs with a soft elevation shadow. Use when the tab list floats above a canvas or media surface."
            code={shadowCode}
          >
            <RectangleTabsDemo tone="brand" elevated />
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use line tabs for primary, page-level navigation between content sections",
              "Use rounded (chip) tabs for filtering and secondary segmented controls",
              "Keep labels short — 1–2 words is ideal, so every tab is visible without truncation",
              "Always show at least two tabs; otherwise use a heading",
              "Preserve tab state when users navigate away and return",
            ]}
            dontItems={[
              "Don't use tabs for sequential steps — use a stepper instead",
              "Don't stack more than six tabs in a single row; collapse overflow into a menu",
              "Don't nest tabs within tabs",
              "Don't mix rectangle and rounded variants inside the same surface",
              "Don't reorder tabs dynamically between sessions",
            ]}
          />
        </section>

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
                title: "Motion",
                desc: "The sliding indicator (chip and line variants) uses a 250ms transition. It is paused when users prefer reduced motion at the OS level.",
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

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            Tabs
          </h3>
          <PropsTable
            props={[
              {
                name: "value",
                type: "string",
                description: "Controlled active tab value.",
              },
              {
                name: "defaultValue",
                type: "string",
                description: "Initial active tab for uncontrolled usage.",
              },
              {
                name: "onValueChange",
                type: "(value: string) => void",
                description: "Fires when the active tab changes.",
              },
              {
                name: "orientation",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description: "Direction of the tab list.",
              },
              {
                name: "activationMode",
                type: '"automatic" | "manual"',
                default: '"automatic"',
                description:
                  "Whether tabs activate on focus or require Enter / Space.",
              },
            ]}
          />
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            TabsList
          </h3>
          <PropsTable
            props={[
              {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "One or more <TabsTrigger> elements.",
              },
              {
                name: "className",
                type: "string",
                description:
                  "Extra classes merged onto the list container — override surface, padding, or gap here.",
              },
            ]}
          />
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            TabsTrigger
          </h3>
          <PropsTable
            props={[
              {
                name: "value",
                type: "string",
                required: true,
                description: "Unique identifier matched against the active value.",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Prevents interaction and dims the trigger.",
              },
              {
                name: "className",
                type: "string",
                description:
                  "Override active-state colours, padding, or typography per-trigger.",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
