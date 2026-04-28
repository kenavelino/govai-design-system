"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { elevation } from "@/lib/tokens";

const tocItems = [
  { id: "levels", title: "Elevation Levels", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "z-index", title: "Z-Index Scale", level: 2 },
];

export default function ElevationPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Elevation
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Elevation creates visual hierarchy through shadows and depth. Use elevation to indicate interactive states and layer relationships.
          </p>
        </div>

        <section id="levels">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Elevation Levels</h2>
          <div className="mt-3 grid gap-[24px] md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(elevation).map(([level, shadow]) => (
              <div key={level} className="flex flex-col gap-[12px]">
                <div
                  className="flex h-[156px] w-[156px] items-center justify-center rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-default)]"
                  style={{ boxShadow: shadow }}
                >
                  <span className="text-[20px] font-medium text-[var(--text-secondary)]">
                    {level}
                  </span>
                </div>
                <div>
                  <p className="text-[14px] font-medium leading-[20px] text-[var(--text-primary)]">
                    Elevation {level}
                  </p>
                  <p className="mt-0.5 font-mono text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                    {shadow}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Level</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Subtle card lift, default card state"],
                  ["2", "Hover states, raised cards"],
                  ["3", "Dropdowns, popovers, floating elements"],
                  ["4", "Modals, dialogs, overlays"],
                  ["5", "Toast notifications, floating action buttons"],
                  ["6", "Special emphasis, feature highlights"],
                ].map(([level, use]) => (
                  <tr key={level} className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)]">
                    <td className="px-[16px] py-[16px] leading-[20px] font-medium">Elevation {level}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="z-index">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Z-Index Scale</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Use the z-index scale to manage stacking context consistently.
          </p>
          <div className="mt-5 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Token</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Value</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["z-base", "0", "Default stacking"],
                  ["z-dropdown", "1000", "Dropdown menus, select options"],
                  ["z-sticky", "1100", "Sticky headers, navigation"],
                  ["z-modal", "1300", "Modal dialogs, overlays"],
                  ["z-popover", "1400", "Popovers, floating panels"],
                  ["z-tooltip", "1500", "Tooltips"],
                  ["z-toast", "1600", "Toast notifications"],
                ].map(([token, value, use]) => (
                  <tr key={token} className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)]">
                    <td className="px-[16px] py-[16px] leading-[20px]"><code>{token}</code></td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{value}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
