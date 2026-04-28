"use client";

import { DoDont } from "@/components/docs/do-dont";
import { Icon } from "@/components/ui/icon";
import { OnThisPage } from "@/components/docs/on-this-page";
import { spacing } from "@/lib/tokens";

const tocItems = [
  { id: "scale", title: "Spacing Scale", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
  { id: "dos-and-donts", title: "Do's and Don'ts", level: 2 },
];

function Redline({ value, height }: { value: string; height: number }) {
  return (
    <div className="flex items-center gap-[6px] shrink-0" style={{ height: `${height}px` }}>
      <span className="font-mono text-[11px] font-medium leading-[14px] tracking-[-0.1px] text-[#e8178a]">
        {value}
      </span>
      <div className="relative flex h-full w-[14px] items-stretch">
        <span className="absolute left-0 top-0 h-[1px] w-full bg-[#e8178a]" />
        <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#e8178a]" />
        <span className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-[#e8178a]" />
      </div>
    </div>
  );
}

function AutoLayoutMock({ variant }: { variant: "do" | "dont" }) {
  const rows = variant === "do"
    ? [
        { left: "7:1", right: "Hug" },
        { left: "6", right: "Hug" },
        { left: "16", right: "12" },
      ]
    : [
        { left: "7:2", right: "Hug" },
        { left: "9", right: "Hug" },
        { left: "18", right: "13" },
      ];
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[6px] bg-[#1f1f22] p-[12px] font-mono text-[10px] leading-[14px] text-[#d6d6d6]">
      <div className="flex items-center justify-between pb-[8px] text-[9px] uppercase tracking-wider text-[#8a8a8a]">
        <span>Auto layout</span>
        <span className="text-[#d6d6d6]">⌘</span>
      </div>
      <div className="grid grid-cols-4 gap-[6px] border-t border-[#2e2e32] pt-[8px]">
        {rows.map((r, i) => (
          <div key={i} className="contents">
            <div className="col-span-2 rounded-[4px] bg-[#2a2a2d] px-[8px] py-[6px]">{r.left}</div>
            <div className="col-span-2 rounded-[4px] bg-[#2a2a2d] px-[8px] py-[6px]">{r.right}</div>
          </div>
        ))}
        <div className="col-span-4 mt-[4px] flex items-center gap-[6px] rounded-[4px] bg-[#2a2a2d] px-[8px] py-[6px]">
          <span className="inline-block h-[10px] w-[10px] rounded-[2px] border border-[#5a5a5e]" />
          <span>Clip content</span>
        </div>
      </div>
    </div>
  );
}

function SpacingExample({
  heading,
  bodyTop,
  bodyToCta,
  ctaLabel,
}: {
  heading: string;
  bodyTop: string;
  bodyToCta: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex gap-[16px]">
      <div className="flex flex-col items-end pt-[24px]">
        <Redline value={bodyTop} height={parseInt(bodyTop, 10)} />
        <div className="flex-1" />
        <Redline value={bodyToCta} height={parseInt(bodyToCta, 10)} />
        <div className="h-[32px]" />
      </div>
      <div className="flex-1">
        <h4 className="text-[18px] font-medium leading-[24px] tracking-[-0.1px] text-[var(--text-primary)]">
          {heading}
        </h4>
        <div style={{ height: `${parseInt(bodyTop, 10)}px` }} />
        <p className="text-[13px] leading-[20px] text-[var(--text-primary)]">
          This is body text using Regular weight for optimal readability. Most content should use Regular weight.
        </p>
        <p className="mt-[4px] text-[13px] leading-[20px] text-[var(--text-primary)]">
          Another paragraph of Regular text that's easy to read and doesn't create visual noise.
        </p>
        <div style={{ height: `${parseInt(bodyToCta, 10)}px` }} />
        <button
          type="button"
          className="inline-flex h-[32px] items-center justify-center rounded-[6px] bg-[var(--color-primary-600)] px-[14px] text-[13px] font-medium text-white"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

function HeadingBodyStack({
  items,
}: {
  items: { heading: string; body: string; gap: string }[];
}) {
  return (
    <div className="flex flex-col gap-[28px]">
      {items.map((item, i) => (
        <div key={i} className="flex gap-[16px]">
          <div className="flex flex-col items-end pt-[24px]">
            <Redline value={item.gap} height={parseInt(item.gap, 10)} />
          </div>
          <div className="flex-1">
            <h4 className="text-[16px] font-medium leading-[22px] text-[var(--text-primary)]">
              {item.heading}
            </h4>
            <div style={{ height: `${parseInt(item.gap, 10)}px` }} />
            <p className="text-[13px] leading-[20px] text-[var(--text-primary)]">
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SpacingPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Spacing
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            A consistent spacing scale creates visual rhythm and alignment across all GovAI interfaces. All spacing values are based on a 4px base unit.
          </p>
        </div>

        <section id="scale">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Spacing Scale</h2>
          <div className="mt-5 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] w-[140px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Name</th>
                  <th className="h-[40px] w-[100px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Size</th>
                  <th className="h-[40px] w-[100px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Pixels</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Preview</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(spacing).map(([key, value]) => {
                  const px = parseInt(value, 10);
                  const em = `${+(px / 16).toFixed(2)}em`;
                  return (
                    <tr
                      key={key}
                      className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)]"
                    >
                      <td className="px-[16px] py-[16px] font-medium leading-[20px] text-[var(--text-primary)]">
                        size-{key}
                      </td>
                      <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                        {em}
                      </td>
                      <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                        {value}
                      </td>
                      <td className="px-[16px] py-[16px]">
                        {px > 0 && (
                          <div
                            className="h-[12px] bg-[var(--color-primary-600)]"
                            style={{ width: value }}
                            aria-hidden
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Use the scale</h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Always use spacing tokens from the scale. Never use arbitrary values like 5px or 13px.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Consistent padding</h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Cards use 24px internal padding. Modals use 24px to 32px. Maintain consistent internal spacing within component types.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Section spacing</h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Use spacing/32 to spacing/64 between major page sections. Use spacing/16 to spacing/24 between related content groups.
              </p>
            </div>
          </div>
        </section>

        <section id="dos-and-donts">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Do's and Don'ts</h2>
          <div className="mt-5">
            <DoDont
              doTitle="Use a consistent scale"
              doContent={
                <ul className="flex flex-col gap-[24px] pl-[24px]">
                  {["4px", "8px", "12px", "16px"].map((v) => (
                    <li key={v} className="flex items-center gap-[16px]">
                      <span className="min-w-[44px] text-[16px] font-medium leading-[22px] tracking-[-0.1px] text-[var(--text-primary)]">{v}</span>
                      <Icon name="check-circle" className="h-[14px] w-[14px] text-[var(--color-success-600)]" />
                    </li>
                  ))}
                  <li className="text-[16px] font-medium leading-[22px] tracking-[-0.1px] text-[var(--text-primary)]">...</li>
                </ul>
              }
              dontTitle="Never break the spacing rule"
              dontContent={
                <ul className="flex flex-col gap-[24px] pl-[24px]">
                  {["9px", "27px", "33px", "41px"].map((v) => (
                    <li key={v} className="flex items-center gap-[16px]">
                      <span className="min-w-[44px] text-[16px] font-medium leading-[22px] tracking-[-0.1px] text-[var(--text-primary)]">{v}</span>
                      <Icon name="xcircle" className="h-[14px] w-[14px] text-[var(--color-error-600)]" />
                    </li>
                  ))}
                  <li className="text-[16px] font-medium leading-[22px] tracking-[-0.1px] text-[var(--text-primary)]">...</li>
                </ul>
              }
            />
            <DoDont
              doTitle="Use the defined spacing tokens"
              doContent={<AutoLayoutMock variant="do" />}
              dontTitle="Do not break the tokens to use custom values"
              dontContent={<AutoLayoutMock variant="dont" />}
            />
            <DoDont
              doTitle="Be consistent with spacing"
              doContent={
                <SpacingExample
                  heading="Hello from homepage!"
                  bodyTop="16"
                  bodyToCta="32"
                  ctaLabel="Enter"
                />
              }
              dontTitle="Maintain consistent component spacing across pages."
              dontContent={
                <SpacingExample
                  heading="Hello from contact us page!"
                  bodyTop="24"
                  bodyToCta="24"
                  ctaLabel="Enter"
                />
              }
            />
            <DoDont
              doTitle="Keep heading-to-body spacing between 8–12px, consistently"
              doContent={
                <HeadingBodyStack
                  items={[
                    { heading: "Section Heading", body: "Body text follows with optimal 4px spacing for clear grouping and readability.", gap: "04" },
                    { heading: "Another Heading", body: "Maximum 08px spacing maintains visual connection.", gap: "08" },
                  ]}
                />
              }
              dontTitle="Avoid excessive heading-to-body gaps that disconnect related content."
              dontContent={
                <HeadingBodyStack
                  items={[
                    { heading: "Too Much Space", body: "Body text is disconnected from its heading.", gap: "16" },
                    { heading: "Too Much Space", body: "Body text is disconnected from its heading.", gap: "24" },
                  ]}
                />
              }
            />
          </div>
        </section>
      </div>
    </>
  );
}
