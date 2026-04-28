"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { radius } from "@/lib/tokens";

const tocItems = [
  { id: "scale", title: "Radius Scale", level: 2 },
  { id: "usage", title: "Usage", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

const usageMap: { token: string; value: string; applied: string[] }[] = [
  {
    token: "radius/0",
    value: "0px",
    applied: ["Table cells", "Full-bleed sections", "Edge-to-edge lists"],
  },
  {
    token: "radius/2",
    value: "2px",
    applied: ["Sub-pixel chips", "Minor accents"],
  },
  {
    token: "radius/4",
    value: "4px",
    applied: ["Checkboxes", "Small tags", "Progress indicators"],
  },
  {
    token: "radius/8",
    value: "8px",
    applied: ["Inputs", "Buttons", "Dropdowns", "Date pickers"],
  },
  {
    token: "radius/12",
    value: "12px",
    applied: ["Cards", "Alerts", "Toasts", "File uploader"],
  },
  {
    token: "radius/16",
    value: "16px",
    applied: ["Modals", "Large surfaces", "Elevated containers"],
  },
  {
    token: "radius/20",
    value: "20px",
    applied: ["Feature cards", "Marketing surfaces"],
  },
  {
    token: "radius/999",
    value: "999px",
    applied: ["Avatars", "Pills", "Badges", "Round buttons"],
  },
];

export default function CornerRadiusPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Corner Radius
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Corner radius tokens define the softness of container edges across
            the GovAI Design System. Consistent radii create familiar shapes and
            reinforce the overall product feel.
          </p>
        </div>

        <section id="scale">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Radius Scale
          </h2>
          <div className="mt-3 grid gap-[12px] sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(radius).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col items-center gap-[12px] rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <div
                  className="h-[80px] w-[80px] border border-[var(--stroke-primary)] bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-950)]"
                  style={{
                    borderRadius: value,
                  }}
                />
                <div className="text-center">
                  <code className="text-[12px] text-[var(--text-primary)]">
                    radius/{key}
                  </code>
                  <p className="mt-1 text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Each radius value has dedicated use cases. Pair the right radius
            with the component scale to maintain rhythm.
          </p>
          <div className="mt-5 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Token
                  </th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Value
                  </th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
                    Applied to
                  </th>
                </tr>
              </thead>
              <tbody>
                {usageMap.map((row) => (
                  <tr
                    key={row.token}
                    className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)]"
                  >
                    <td className="px-[16px] py-[16px] leading-[20px]">
                      <code className="text-[12px]">{row.token}</code>
                    </td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                      {row.value}
                    </td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                      {row.applied.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Use tokens only
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Never use arbitrary radius values like 5px or 10px. Always
                select from the scale to keep the system consistent.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Nested radii
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                When elements nest inside a rounded container, use a smaller
                radius for inner elements (e.g. 8px inside a 12px card) to
                preserve the visual concentric rhythm.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Pill shapes
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Use radius/999 for avatars, badges, tags, and any element that
                should read as fully rounded. Do not replicate pill shapes with
                manual half-height values.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
