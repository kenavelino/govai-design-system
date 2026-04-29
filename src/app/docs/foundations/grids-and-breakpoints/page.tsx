"use client";

import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "breakpoints", title: "Breakpoints", level: 2 },
  { id: "grid", title: "Grid System", level: 2 },
  { id: "guidelines", title: "Breakpoint Guidelines", level: 2 },
];

const breakpointGuidelines = [
  {
    title: "Columns",
    description:
      "Define the primary grid structure for placing content. The number of columns increases as the viewport widens, allowing more complex layouts.",
  },
  {
    title: "Margins",
    description:
      "Ensure sufficient whitespace on the outer edges, adapting to larger screens for a balanced look.",
  },
  {
    title: "Gutters",
    description:
      "Provide spacing between columns, maintaining readability and clarity.",
  },
  {
    title: "Scalability",
    description:
      "Each breakpoint ensures smooth transitions, preventing content overlap or excessive whitespace.",
  },
  {
    title: "Device mapping",
    description:
      "Breakpoints are aligned with common device categories (mobile, tablet, desktop, widescreen).",
  },
];

const breakpointData: {
  name: string;
  width: string;
  columns: string;
  gutter: string;
  margin: string;
  notes: string;
}[] = [
  {
    name: "Mobile",
    width: "360px",
    columns: "4",
    gutter: "16px",
    margin: "16px",
    notes: "Single-column stacks, bottom sheet patterns.",
  },
  {
    name: "Tablet Portrait",
    width: "768px",
    columns: "8",
    gutter: "20px",
    margin: "20px",
    notes: "Two-column layouts start here. Side panels collapse.",
  },
  {
    name: "Tablet Landscape",
    width: "1024px",
    columns: "12",
    gutter: "24px",
    margin: "24px",
    notes: "Navigation sidebar becomes persistent. 12-column grids enabled.",
  },
  {
    name: "Laptop",
    width: "1280px",
    columns: "12",
    gutter: "20px",
    margin: "32px",
    notes: "Primary target for enterprise dashboards. Dense layouts allowed.",
  },
  {
    name: "Desktop",
    width: "1440px",
    columns: "12",
    gutter: "24px",
    margin: "32px",
    notes: "Standard desktop baseline for GovAI product screens.",
  },
  {
    name: "Ultrawide",
    width: "1920px+",
    columns: "12",
    gutter: "32px",
    margin: "40px",
    notes: "Constrain content max-widths; avoid stretching text blocks.",
  },
];

export default function GridsAndBreakpointsPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Grids and Breakpoints
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Responsive grids and breakpoints establish the structural foundation
            of every GovAI product. Six breakpoints cover the full range from
            mobile to ultrawide displays.
          </p>
        </div>

        <section id="breakpoints">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Breakpoints
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            GovAI products use a mobile-first breakpoint system. Design and code
            should always target the smallest size first and layer up.
          </p>
          <div className="mt-5 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Breakpoint
                  </th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Width
                  </th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Columns
                  </th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Gutter
                  </th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakpointData.map((bp) => (
                  <tr
                    key={bp.name}
                    className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--color-neutral-100)]"
                  >
                    <td className="px-[16px] py-[16px] leading-[20px] font-medium text-[var(--text-primary)]">
                      {bp.name}
                    </td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                      {bp.width}
                    </td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                      {bp.columns}
                    </td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                      {bp.gutter}
                    </td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                      {bp.margin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="grid">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Grid System
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            A 12-column grid governs all layouts from tablet landscape upward.
            Smaller breakpoints collapse to 8 or 4 columns for more compact
            layouts.
          </p>
          <div className="mt-5 flex flex-col gap-[12px]">
            {breakpointData.map((bp) => {
              const cols = Math.min(Number(bp.columns), 12);
              return (
                <div
                  key={bp.name}
                  className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
                >
                  <div className="mb-3 flex items-baseline justify-between">
                    <h4 className="text-[14px] font-medium text-[var(--header-primary)]">
                      {bp.name}
                    </h4>
                    <span className="text-[12px] text-[var(--text-tertiary)]">
                      {bp.width} · {bp.columns} cols
                    </span>
                  </div>
                  <div
                    className="grid h-[240px] gap-[8px] overflow-hidden rounded-[4px]"
                    style={{
                      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: cols }).map((_, i) => (
                      <div
                        key={i}
                        className="h-full bg-[rgba(243,111,111,0.18)]"
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-[12px] leading-[20px] text-[var(--text-tertiary)]">
                    {bp.notes}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Breakpoint Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {breakpointGuidelines.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {item.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
