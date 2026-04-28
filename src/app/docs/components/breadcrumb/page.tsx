"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "interactive", title: "Interactive playground", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "with-home-icon", title: "With home icon", level: 2 },
  { id: "truncated", title: "Truncated path", level: 2 },
  { id: "arabic", title: "Arabic (RTL)", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

export default function BreadcrumbPage() {
  const [size, setSize] = useState<"sm" | "md">("md");
  const [showIcon, setShowIcon] = useState(true);
  const [rtl, setRtl] = useState(false);

  const labels = rtl
    ? ["الرئيسية", "المكونات", "مسار التنقل"]
    : ["Home", "Components", "Breadcrumbs"];

  const playgroundItems = [
    { label: showIcon ? "" : labels[0], href: "#", icon: showIcon },
    { label: labels[1], href: "#" },
    { label: labels[2] },
  ];

  const playgroundCode = `import { Breadcrumb } from "@/components/ui/breadcrumb";

<Breadcrumb
  size="${size}"
  items={[
    { label: ${showIcon ? `""` : `"${labels[0]}"`}, href: "#"${showIcon ? ", icon: true" : ""} },
    { label: "${labels[1]}", href: "#" },
    { label: "${labels[2]}" },
  ]}
/>`;

  const overviewCode = `import { Breadcrumb } from "@/components/ui/breadcrumb";

<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: true },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumbs" },
  ]}
/>`;

  const sizesCode = `<Breadcrumb size="sm" items={[
  { label: "Home", href: "/" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumbs" },
]} />

<Breadcrumb size="md" items={[
  { label: "Home", href: "/" },
  { label: "Components", href: "/docs/components" },
  { label: "Breadcrumbs" },
]} />`;

  const iconCode = `<Breadcrumb
  items={[
    { label: "", href: "/", icon: true },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumbs" },
  ]}
/>`;

  const truncatedCode = `<Breadcrumb
  items={[
    { label: "", href: "/", icon: true },
    { label: "…", href: "#" },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumbs" },
  ]}
/>`;

  const arabicCode = `<Breadcrumb
  dir="rtl"
  items={[
    { label: "الرئيسية", href: "/" },
    { label: "المكونات", href: "/docs/components" },
    { label: "مسار التنقل" },
  ]}
/>`;

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Breadcrumbs
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Breadcrumbs are navigational aids displaying the user&apos;s current location within the site or application hierarchy. They offer a clear, clickable path back to previous states, enhancing discoverability and reducing user effort in navigating complex structures.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="A breadcrumb trail is a secondary navigation pattern. The last item represents the current page and is not interactive."
            code={overviewCode}
          >
            <Breadcrumb
              items={[
                { label: "", href: "#", icon: true },
                { label: "Components", href: "#" },
                { label: "Breadcrumbs" },
              ]}
            />
          </ComponentPreview>
        </section>

        <section id="interactive">
          <ComponentPreview
            heading="Interactive playground"
            description="Toggle size, the home icon, and language direction to explore every state in one place."
            code={playgroundCode}
          >
            <div className="flex w-full flex-col items-center gap-[24px]">
              <div className="flex flex-wrap items-center justify-center gap-[12px]">
                <div className="inline-flex items-center gap-[4px] rounded-[8px] bg-[var(--surface-alt-tertiary)] p-[4px]">
                  {(["sm", "md"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={cn(
                        "inline-flex h-[28px] items-center justify-center rounded-[6px] px-[12px] text-[14px] font-medium leading-[20px] transition-colors",
                        size === s
                          ? "bg-[var(--surface-default)] text-[var(--text-primary)] shadow-[var(--shadow-elevation-1)]"
                          : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      Size {s}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowIcon((v) => !v)}
                  className={cn(
                    "inline-flex h-[36px] items-center gap-[8px] rounded-[8px] border px-[12px] text-[14px] font-medium leading-[20px] transition-colors",
                    showIcon
                      ? "border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]"
                      : "border-[var(--stroke-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
                  )}
                >
                  <Icon name="house" className="h-[16px] w-[16px]" />
                  {showIcon ? "Icon on" : "Icon off"}
                </button>

                <button
                  type="button"
                  onClick={() => setRtl((v) => !v)}
                  className={cn(
                    "inline-flex h-[36px] items-center gap-[8px] rounded-[8px] border px-[12px] text-[14px] font-medium leading-[20px] transition-colors",
                    rtl
                      ? "border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]"
                      : "border-[var(--stroke-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
                  )}
                >
                  {rtl ? "RTL" : "LTR"}
                </button>
              </div>

              <div
                dir={rtl ? "rtl" : "ltr"}
                className="flex min-h-[72px] w-full items-center justify-center rounded-[12px] border border-dashed border-[var(--stroke-primary)] bg-[var(--surface-primary)] px-[24px] py-[20px]"
              >
                <Breadcrumb size={size} items={playgroundItems} />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="sizes">
          <ComponentPreview
            heading="Sizes"
            description="Small (12px / 16px line-height) is used on mobile surfaces. Medium (16px / 24px line-height) is the desktop default."
            code={sizesCode}
          >
            <div className="flex w-full flex-col items-center gap-[20px]">
              <Breadcrumb
                size="sm"
                items={[
                  { label: "Home", href: "#" },
                  { label: "Components", href: "#" },
                  { label: "Breadcrumbs" },
                ]}
              />
              <Breadcrumb
                size="md"
                items={[
                  { label: "Home", href: "#" },
                  { label: "Components", href: "#" },
                  { label: "Breadcrumbs" },
                ]}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="with-home-icon">
          <ComponentPreview
            heading="With home icon"
            description="Replace the first label with a house icon for a more compact, visual anchor to the root location."
            code={iconCode}
          >
            <div className="flex w-full flex-col items-center gap-[20px]">
              <Breadcrumb
                size="sm"
                items={[
                  { label: "", href: "#", icon: true },
                  { label: "Components", href: "#" },
                  { label: "Breadcrumbs" },
                ]}
              />
              <Breadcrumb
                size="md"
                items={[
                  { label: "", href: "#", icon: true },
                  { label: "Components", href: "#" },
                  { label: "Breadcrumbs" },
                ]}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="truncated">
          <ComponentPreview
            heading="Truncated path"
            description="For deep hierarchies, collapse middle segments with an ellipsis to preserve layout and maintain orientation."
            code={truncatedCode}
          >
            <Breadcrumb
              size="md"
              items={[
                { label: "", href: "#", icon: true },
                { label: "…", href: "#" },
                { label: "Components", href: "#" },
                { label: "Breadcrumbs" },
              ]}
            />
          </ComponentPreview>
        </section>

        <section id="arabic">
          <ComponentPreview
            heading="Arabic (RTL)"
            description="Breadcrumbs respect the parent direction. Wrap the component in an element with dir='rtl' for Arabic layouts."
            code={arabicCode}
          >
            <div dir="rtl" className="flex w-full flex-col items-center gap-[20px]">
              <Breadcrumb
                size="sm"
                items={[
                  { label: "الرئيسية", href: "#" },
                  { label: "المكونات", href: "#" },
                  { label: "مسار التنقل" },
                ]}
              />
              <Breadcrumb
                size="md"
                items={[
                  { label: "الرئيسية", href: "#" },
                  { label: "المكونات", href: "#" },
                  { label: "مسار التنقل" },
                ]}
              />
            </div>
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Place breadcrumbs at the top of a page, directly below the primary navigation",
              "Render the current page as the last, non-interactive item",
              "Use the home icon only on the first segment to anchor the root",
              "Use small size on mobile and medium size on desktop",
              "Support both LTR and RTL content for bilingual surfaces",
            ]}
            dontItems={[
              "Don't use breadcrumbs on top-level pages with no parent hierarchy",
              "Don't link the current page item — it should act as a label, not an action",
              "Don't mix breadcrumbs with tabs as the primary navigation for the same hierarchy",
              "Don't truncate labels without providing the full path via tooltip or hover state",
              "Don't use breadcrumbs deeper than 4–5 visible segments; collapse with an ellipsis",
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
                title: "Landmark role",
                desc: "The component renders a <nav> with aria-label='Breadcrumb', announcing it as a named landmark to assistive technologies.",
              },
              {
                title: "Current page",
                desc: "The final item uses aria-current='page' so screen readers announce the user's current location.",
              },
              {
                title: "Keyboard navigation",
                desc: "Each link is focusable via Tab and activated with Enter. The focus ring uses primary/500 with a 2px offset for high visibility.",
              },
              {
                title: "Separators",
                desc: "Visual separators are marked aria-hidden, preventing screen readers from reading the slash between items.",
              },
              {
                title: "Bidirectional text",
                desc: "Breadcrumbs inherit direction from the parent dir attribute, flipping order automatically for RTL languages like Arabic.",
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
            Breadcrumb
          </h3>
          <PropsTable
            props={[
              {
                name: "items",
                type: "BreadcrumbItemData[]",
                required: true,
                description: "Ordered list of breadcrumb segments, from root to current page.",
              },
              {
                name: "size",
                type: '"sm" | "md"',
                default: '"sm"',
                description: "Controls typography size. Small for mobile, medium for desktop.",
              },
              {
                name: "separator",
                type: "ReactNode",
                default: '"/"',
                description: "Custom separator rendered between items.",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes applied to the <nav> element.",
              },
            ]}
          />
          <h3 className="mt-5 text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            BreadcrumbItemData
          </h3>
          <PropsTable
            props={[
              {
                name: "label",
                type: "ReactNode",
                required: true,
                description: "Text shown for the segment. Pass an empty string when icon-only.",
              },
              {
                name: "href",
                type: "string",
                description: "Destination URL. Omit on the last item so it renders as the current page.",
              },
              {
                name: "icon",
                type: "boolean",
                default: "false",
                description: "Show the house icon before the label. Typically used on the first segment.",
              },
              {
                name: "onClick",
                type: "(e: MouseEvent) => void",
                description: "Optional click handler for the link.",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
