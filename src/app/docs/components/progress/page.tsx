"use client";

import { useState, useEffect } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CircularProgress } from "@/components/ui/circular-progress";

function useLoopingProgress(duration = 5000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const animate = (now: number) => {
      if (start === null) start = now;
      const elapsed = (now - start) % duration;
      setValue(Math.round((elapsed / duration) * 100));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [duration]);
  return value;
}

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "progress-bar", title: "Progress Bar", level: 2 },
  { id: "bar-labels", title: "Label placement", level: 3 },
  { id: "circular", title: "Circular Progress", level: 2 },
  { id: "circular-sizes", title: "Sizes", level: 3 },
  { id: "circular-half", title: "Half circle", level: 3 },
  { id: "loaders", title: "Indeterminate Loaders", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

// ─── Demo components ──────────────────────────────────────────────────────────

function OverviewDemo() {
  const value = useLoopingProgress(5000);
  return (
    <div className="flex w-full flex-col items-center gap-[40px]">
      <div className="flex w-full max-w-[520px] flex-col gap-[16px]">
        <ProgressBar value={Math.max(0, value - 20)} label="right" aria-label="Processing" />
      </div>
      <div className="flex items-center gap-[48px]">
        <CircularProgress value={value} size="md" label="Complete" />
        <CircularProgress value={Math.max(0, value - 20)} size="md" shape="half" label="Processed" />
      </div>
    </div>
  );
}

function BarLabelsDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-[32px]">
      <div className="flex flex-col gap-[8px]">
        <span className="text-[12px] font-medium text-[var(--text-tertiary)]">No label</span>
        <ProgressBar value={60} label="none" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[12px] font-medium text-[var(--text-tertiary)]">Label right</span>
        <ProgressBar value={60} label="right" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[12px] font-medium text-[var(--text-tertiary)]">Label bottom</span>
        <ProgressBar value={60} label="bottom" />
      </div>
    </div>
  );
}


function CircularSizesDemo() {
  const value = useLoopingProgress(5000);
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-wrap items-end justify-center gap-[40px]">
        <div className="flex flex-col items-center gap-[8px]">
          <CircularProgress value={value} size="sm" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">sm — 80px</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <CircularProgress value={value} size="md" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">md — 120px</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <CircularProgress value={value} size="lg" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">lg — 160px</span>
        </div>
      </div>
    </div>
  );
}

function CircularHalfDemo() {
  const value = useLoopingProgress(5000);
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-wrap items-end justify-center gap-[40px]">
        <div className="flex flex-col items-center gap-[8px]">
          <CircularProgress value={value} size="sm" shape="half" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">sm</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <CircularProgress value={value} size="md" shape="half" label="Active users" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">md + label</span>
        </div>
        <div className="flex flex-col items-center gap-[8px]">
          <CircularProgress value={value} size="lg" shape="half" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">lg</span>
        </div>
      </div>
    </div>
  );
}

function LoadersDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-[40px]">
      <div className="flex flex-col items-center gap-[16px]">
        <p className="text-[12px] font-medium text-[var(--text-tertiary)]">
          Circular — indeterminate spinner
        </p>
        <div className="flex flex-wrap items-center justify-center gap-[40px]">
          <div className="flex flex-col items-center gap-[8px]">
            <CircularProgress indeterminate size="sm" showValue={false} aria-label="Loading" />
            <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">sm</span>
          </div>
          <div className="flex flex-col items-center gap-[8px]">
            <CircularProgress indeterminate size="md" showValue={false} aria-label="Loading" />
            <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">md</span>
          </div>
          <div className="flex flex-col items-center gap-[8px]">
            <CircularProgress indeterminate size="lg" showValue={false} aria-label="Loading" />
            <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">lg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Progress Bar &amp; Loaders
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Progress indicators communicate the status and completion of ongoing tasks or processes.
            Use determinate variants when the total work is known, and indeterminate loaders
            when duration is unknown.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Progress bars and circular indicators animate from 0 to 100% over 5 seconds on load."
            code={`import { ProgressBar } from "@/components/ui/progress-bar";
import { CircularProgress } from "@/components/ui/circular-progress";

<ProgressBar value={68} label="right" />
<CircularProgress value={68} size="md" label="Complete" />
<CircularProgress value={48} size="md" shape="half" label="Processed" />`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        {/* Progress Bar */}
        <section id="progress-bar" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Progress Bar
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            An 8px-height linear track with a primary/600 fill. Supports three label placements
            and an indeterminate animated mode.
          </p>

          <div id="bar-labels">
            <ComponentPreview
              heading="Label placement"
              description="Three label options: none (track only), right (inline percentage), and bottom (label below the bar)."
              code={`<ProgressBar value={60} label="none" />
<ProgressBar value={60} label="right" />
<ProgressBar value={60} label="bottom" />`}
            >
              <BarLabelsDemo />
            </ComponentPreview>
          </div>

        </section>

        {/* Circular Progress */}
        <section id="circular" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Circular Progress
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            SVG-based ring indicators available as full circles or half-circles, in three sizes.
            An optional label below the percentage suits data dashboards.
          </p>

          <div id="circular-sizes">
            <ComponentPreview
              heading="Sizes"
              description="Three sizes — sm (80px), md (120px, default), and lg (160px). All animate together in a continuous loop."
              code={`<CircularProgress value={60} size="sm" />
<CircularProgress value={60} size="md" />
<CircularProgress value={60} size="lg" />`}
            >
              <CircularSizesDemo />
            </ComponentPreview>
          </div>

          <div id="circular-half">
            <ComponentPreview
              heading="Half circle"
              description='The shape="half" variant renders a top-arc indicator. Use it for metric cards and KPI tiles where vertical space is limited.'
              code={`<CircularProgress value={60} size="sm" shape="half" />
<CircularProgress value={60} size="md" shape="half" label="Active users" />
<CircularProgress value={60} size="lg" shape="half" />`}
            >
              <CircularHalfDemo />
            </ComponentPreview>
          </div>
        </section>

        {/* Loaders */}
        <section id="loaders">
          <ComponentPreview
            heading="Indeterminate Loaders"
            description="When duration is unknown, use indeterminate mode. The linear bar slides continuously; the circular spinner rotates a 75% arc at 1.4s per revolution."
            code={`{/* Linear */}
<ProgressBar indeterminate />
<ProgressBar indeterminate label="bottom" />

{/* Circular spinners */}
<CircularProgress indeterminate size="sm" showValue={false} />
<CircularProgress indeterminate size="md" showValue={false} />
<CircularProgress indeterminate size="lg" showValue={false} />`}
          >
            <LoadersDemo />
          </ComponentPreview>
        </section>

        {/* Usage Guidelines */}
        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use determinate progress when the completion percentage can be calculated",
              "Use indeterminate loaders for network requests, file parsing, or any unknown-duration operation",
              "Pair a progress bar with a descriptive label to tell users what is loading",
              "Use the right-label variant when space is constrained or the bar sits inside a table row",
              "Match circular indicator size to the surrounding context — sm for inline, lg for dashboard tiles",
            ]}
            dontItems={[
              "Don't leave a loader running after the task completes — always resolve to a final state",
              "Don't use progress indicators for instant operations (< 300 ms) — they cause unnecessary visual noise",
              "Don't use multiple indeterminate bars stacked in the same view",
              "Don't show a circular progress at 0% without context — add a label or supporting text",
              "Don't use progress bars as decorative elements without an associated task or metric",
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
                title: "ARIA role",
                desc: 'Both components render with role="progressbar". The aria-valuenow, aria-valuemin (0), and aria-valuemax (100) attributes reflect the current state for screen readers.',
              },
              {
                title: "Indeterminate state",
                desc: 'Indeterminate loaders set aria-busy="true" and omit aria-valuenow so assistive technology announces "loading" rather than a numeric value.',
              },
              {
                title: "Labels",
                desc: 'Always provide a meaningful aria-label prop (e.g. "File upload progress") so screen readers can associate the control with its context beyond the percentage.',
              },
              {
                title: "Reduced motion",
                desc: "All CSS animations respect the prefers-reduced-motion media query. When reduced motion is preferred, animations are disabled — only the static fill state is shown.",
              },
              {
                title: "Color contrast",
                desc: "The primary/600 fill (#2463EB) against the light surface-alt-tertiary track meets WCAG 2.1 AA contrast requirements. Percentage labels use text-secondary (#3B3B3C).",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
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
          <div className="space-y-[24px]">
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                ProgressBar
              </h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "value", type: "number", default: "0", description: "Progress value from 0 to 100" },
                    { name: "label", type: '"none" | "right" | "bottom"', default: '"none"', description: "Position of the percentage label" },
                    { name: "indeterminate", type: "boolean", default: "false", description: "Enables the animated sliding loader — hides the percentage label" },
                    { name: "aria-label", type: "string", default: '"Progress"', description: "Accessible label for screen readers" },
                    { name: "className", type: "string", description: "Additional CSS classes on the wrapper" },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                CircularProgress
              </h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "value", type: "number", default: "0", description: "Progress value from 0 to 100" },
                    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Ring diameter — sm 80px, md 120px, lg 160px" },
                    { name: "shape", type: '"circle" | "half"', default: '"circle"', description: "Full 360° ring or top-arc half circle" },
                    { name: "showValue", type: "boolean", default: "true", description: "Show the percentage number inside the ring" },
                    { name: "label", type: "string", description: "Optional sub-label rendered below the percentage" },
                    { name: "indeterminate", type: "boolean", default: "false", description: "Enables the spinning loader animation" },
                    { name: "aria-label", type: "string", default: '"Progress"', description: "Accessible label for screen readers" },
                    { name: "className", type: "string", description: "Additional CSS classes on the wrapper" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
