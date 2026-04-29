"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Badge } from "@/components/ui/badge";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "anatomy", title: "Anatomy", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

export default function CardPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Card
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Cards are flexible containers that group related content and actions. They provide a visual boundary that helps users scan and understand information hierarchy.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Overview</h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Cards serve as content containers with consistent styling. They can hold text, images, actions, and metadata. Use cards to present items in a collection, dashboard widgets, or summary panels.
          </p>
          <div className="mt-5 rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px] flex items-center justify-center gap-[12px] flex-wrap">
            <div className="w-[260px] rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-primary)] overflow-hidden">
              <div className="p-5">
                <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Projects</p>
                <h3 className="mt-[6px] text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">AI Safety Research</h3>
                <p className="mt-2 text-[12px] leading-[20px] text-[var(--text-tertiary)]">Exploring alignment techniques and interpretability methods for large language models.</p>
              </div>
              <div className="px-5 py-3 border-t border-[var(--stroke-primary)] flex items-center justify-between">
                <span className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">Updated 2 days ago</span>
                <Badge variant="brand">Active</Badge>
              </div>
            </div>
            <div className="w-[260px] rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-primary)] overflow-hidden cursor-pointer hover:border-[var(--color-primary-300)] hover:shadow-md transition-all">
              <div className="p-5">
                <p className="text-[12px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Reports</p>
                <h3 className="mt-[6px] text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Q4 Analysis Report</h3>
                <p className="mt-2 text-[12px] leading-[20px] text-[var(--text-tertiary)]">Quarterly review of governance frameworks and policy recommendations.</p>
              </div>
              <div className="px-5 py-3 border-t border-[var(--stroke-primary)] flex items-center justify-between">
                <span className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">Published</span>
                <Badge variant="success">Complete</Badge>
              </div>
            </div>
          </div>
        </section>

        <section id="anatomy">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Anatomy</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { name: "Container", desc: "The outer wrapper with rounded corners, border, and background. Provides the visual boundary for all card content." },
              { name: "Header", desc: "Optional top section for titles, subtitles, or metadata. Can include an icon or avatar." },
              { name: "Body", desc: "The main content area. Flexible and can contain text, images, charts, or any custom content." },
              { name: "Footer", desc: "Optional bottom section separated by a border. Typically holds actions, metadata, or status indicators." },
              { name: "Media", desc: "Optional image or visual element. Can appear at the top, within the body, or as a background." },
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

        <section id="variants">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Variants</h2>
          <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Variant</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Border</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Interaction</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Standard", "stroke/primary", "None", "Static content display — dashboards, summaries, detail panels."],
                  ["Interactive", "stroke/primary (hover: primary/300)", "Hover shadow, cursor pointer", "Clickable cards that navigate to a detail view or trigger an action."],
                ].map(([variant, border, interaction, use]) => (
                  <tr key={variant} className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--color-neutral-100)]">
                    <td className="px-[16px] py-[16px] leading-[20px] font-medium">{variant}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{border}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{interaction}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <DoDont
            doItems={[
              "Use cards to group related pieces of information together",
              "Keep card content scannable — use headings, short descriptions, and metadata",
              "Maintain consistent card sizes within a grid layout",
              "Use the interactive variant for cards that link to detail views",
              "Include clear visual hierarchy within each card",
            ]}
            dontItems={[
              "Don't overload cards with too much content — keep them focused",
              "Don't nest cards inside other cards",
              "Don't mix interactive and non-interactive cards in the same collection without visual distinction",
              "Don't use cards for single pieces of information — use inline content instead",
              "Don't rely on card color alone to convey meaning",
            ]}
          />
        </section>

        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { title: "Semantic Structure", desc: "Cards use an <article> element when they represent self-contained content. Headings within cards follow the document heading hierarchy." },
              { title: "Interactive Cards", desc: "Interactive cards are wrapped in a link or button element, making the entire card clickable. The accessible name comes from the card title." },
              { title: "Keyboard Navigation", desc: "Interactive cards are focusable with Tab and activated with Enter. A visible focus ring uses primary/500 with 2px offset." },
              { title: "Color Contrast", desc: "Card borders and content meet WCAG 2.1 AA contrast requirements. Status badges within cards use both color and text to convey meaning." },
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
              { name: "variant", type: '"standard" | "interactive"', default: '"standard"', description: "Card style variant" },
              { name: "onClick", type: "() => void", description: "Click handler for interactive cards" },
              { name: "href", type: "string", description: "Link URL for interactive cards (renders as anchor)" },
              { name: "header", type: "ReactNode", description: "Content for the card header area" },
              { name: "footer", type: "ReactNode", description: "Content for the card footer area" },
              { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Internal padding size" },
              { name: "children", type: "ReactNode", required: true, description: "Card body content" },
              { name: "className", type: "string", description: "Additional CSS classes" },
            ]}
          />
        </section>
      </div>
    </>
  );
}
