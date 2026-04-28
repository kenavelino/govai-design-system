"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Badge } from "@/components/ui/badge";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "dot-indicator", title: "Dot Indicator", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

export default function BadgePage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Badge
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Badges are compact labels that convey status, category, or metadata. They use color and optional dot indicators to communicate meaning at a glance.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Overview</h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            The Badge component renders a small inline label with semantic color variants. Badges are non-interactive and are used alongside other content to provide additional context — such as status indicators in tables, category tags in cards, or labels in navigation.
          </p>
          <div className="mt-5 rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px] flex items-center justify-center gap-[12px] flex-wrap">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        <section id="variants">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Variants</h2>
          <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Variant</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Preview</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Background</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { variant: "neutral" as const, label: "Neutral", bg: "surface-alt-tertiary", use: "Default, general-purpose labels with no semantic meaning." },
                  { variant: "brand" as const, label: "Brand", bg: "primary/100", use: "Primary branding, feature labels, component types." },
                  { variant: "success" as const, label: "Success", bg: "success/100", use: "Positive states — active, complete, approved, stable." },
                  { variant: "error" as const, label: "Error", bg: "error/100", use: "Negative states — failed, rejected, critical, removed." },
                  { variant: "warning" as const, label: "Warning", bg: "warning/100", use: "Cautionary states — pending, expiring, deprecated." },
                  { variant: "info" as const, label: "Info", bg: "info/100", use: "Informational states — new, beta, in review, updated." },
                ].map(v => (
                  <tr key={v.label} className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)]">
                    <td className="px-[16px] py-[16px] leading-[20px] font-medium">{v.label}</td>
                    <td className="px-[16px] py-[16px] leading-[20px]"><Badge variant={v.variant}>{v.label}</Badge></td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{v.bg}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{v.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="dot-indicator">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Dot Indicator</h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Badges support an optional dot indicator that adds a small colored circle before the text. The dot uses the current text color, reinforcing the semantic meaning of the badge variant. Use dots for status-related badges to draw more attention to the state.
          </p>
          <div className="mt-5 rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px] flex items-center justify-center gap-[12px] flex-wrap">
            <Badge variant="neutral" dot>Neutral</Badge>
            <Badge variant="brand" dot>Brand</Badge>
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="error" dot>Failed</Badge>
            <Badge variant="warning" dot>Pending</Badge>
            <Badge variant="info" dot>New</Badge>
          </div>
          <div className="mt-4 flex flex-col gap-[12px]">
            {[
              { name: "With Dot", desc: "Best for status indicators where the badge represents a live state (active, pending, failed). The dot provides additional visual emphasis." },
              { name: "Without Dot", desc: "Best for category labels, feature tags, or metadata where the badge is purely descriptive (component type, version label)." },
            ].map(a => (
              <div key={a.name} className="flex items-start gap-[12px] rounded-lg border border-[var(--stroke-primary)] p-[24px]">
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-primary-600)]" />
                <div>
                  <p className="text-[14px] font-medium leading-[20px] text-[var(--text-primary)]">{a.name}</p>
                  <p className="mt-0.5 text-[12px] leading-[16px] text-[var(--text-tertiary)]">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <DoDont
            doItems={[
              "Use badges to communicate status, category, or metadata",
              "Keep badge text short — ideally 1-2 words",
              "Use semantic color variants consistently across the product",
              "Use dot indicators for live status badges (active, pending, failed)",
              "Pair badge color with text to ensure meaning is conveyed without color alone",
            ]}
            dontItems={[
              "Don't use badges as buttons — they are non-interactive",
              "Don't use more than 2 badges per item in a list",
              "Don't create custom badge colors outside the defined variant set",
              "Don't use badges for long text or descriptions",
              "Don't use the error variant for non-negative states",
            ]}
          />
        </section>

        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { title: "Semantic Color", desc: "Badge color is supplementary, not the sole indicator of meaning. The text label always conveys the badge purpose. This ensures users with color vision deficiencies can understand the badge." },
              { title: "Screen Readers", desc: "Badges render as inline <span> elements. When used as status indicators, the surrounding context (table cell header, label) provides the semantic relationship." },
              { title: "Contrast", desc: "All badge variants meet WCAG 2.1 AA contrast requirements (4.5:1) for text against their background color in both light and dark modes." },
              { title: "Dot Indicator", desc: "The dot is decorative and hidden from screen readers with aria-hidden='true'. The badge text alone conveys the complete meaning." },
            ].map(a => (
              <div key={a.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{a.title}</h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">API Reference</h2>
          <PropsTable
            props={[
              { name: "variant", type: '"neutral" | "brand" | "success" | "error" | "warning" | "info"', default: '"neutral"', description: "Visual style variant" },
              { name: "dot", type: "boolean", default: "false", description: "Shows a colored dot indicator before the text" },
              { name: "children", type: "ReactNode", required: true, description: "Badge label text" },
              { name: "className", type: "string", description: "Additional CSS classes" },
            ]}
          />
        </section>
      </div>
    </>
  );
}
