"use client";

import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "thickness", title: "Stroke Thickness", level: 2 },
  { id: "styles", title: "Stroke Styles", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

const thicknessScale = [
  {
    token: "strokes/1",
    value: "1px",
    desc: "Default border weight for the majority of components.",
  },
  {
    token: "strokes/2",
    value: "2px",
    desc: "Emphasized borders for focus rings, active states, and selected controls.",
  },
  {
    token: "strokes/4",
    value: "4px",
    desc: "Heavy accent borders for marketing surfaces and high-emphasis separators.",
  },
];

const styleScale = [
  {
    token: "strokes/style-solid",
    value: "solid",
    desc: "Standard continuous stroke used for structural borders.",
  },
  {
    token: "strokes/style-dashed",
    value: "dashed",
    desc: "Indicates optional, placeholder, or drop-target regions.",
  },
  {
    token: "strokes/style-dotted",
    value: "dotted",
    desc: "Subtle separation for guides, hints, and low-priority dividers.",
  },
];

export default function StrokesPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Strokes
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Strokes provide structural separation between components, states,
            and content regions. The GovAI Design System uses a minimal stroke
            palette to support clarity without visual noise.
          </p>
        </div>

        <section id="thickness">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Stroke Thickness
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Three thickness tokens define the scale. Reach for heavier weights
            only to signal emphasis or hierarchy.
          </p>
          <div className="mt-5 grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
            {thicknessScale.map((s) => (
              <div
                key={s.token}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <div
                  className="mb-4 h-[96px] bg-white"
                  style={{
                    borderTop: `${s.value} solid #004280`,
                  }}
                />
                <code className="text-[12px] text-[var(--text-primary)]">
                  {s.token}
                </code>
                <p className="mt-1 text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                  {s.value}
                </p>
                <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-secondary)]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="styles">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Stroke Styles
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Pair any thickness token with a style to communicate state or
            intent.
          </p>
          <div className="mt-5 grid gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
            {styleScale.map((s) => (
              <div
                key={s.token}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <div
                  className="mb-4 h-[96px] bg-white"
                  style={{
                    borderTop: `2px ${s.value} #004280`,
                  }}
                />
                <code className="text-[12px] text-[var(--text-primary)]">
                  {s.token}
                </code>
                <p className="mt-1 text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                  {s.value}
                </p>
                <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-secondary)]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Prefer 1px strokes
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Use strokes/1 for the vast majority of borders. Reserve
                strokes/2 for emphasis states like focus rings, and use
                strokes/4 only for high-emphasis accents and marketing
                surfaces.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Use semantic tokens
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Apply borders using var(--stroke-primary) or var(--stroke-secondary).
                This ensures automatic theme adaptation without additional code.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Avoid double strokes
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                When two bordered elements sit adjacent, collapse their shared
                border into a single 1px line — do not stack borders.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
