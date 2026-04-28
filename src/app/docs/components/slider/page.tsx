"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Slider, type SliderLabel } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "interactive", title: "Interactive playground", level: 2 },
  { id: "labels", title: "Label placement", level: 2 },
  { id: "range", title: "Range (dual-thumb)", level: 2 },
  { id: "presets", title: "Preset values", level: 2 },
  { id: "disabled", title: "Disabled", level: 2 },
  { id: "rtl", title: "Arabic (RTL)", level: 2 },
  { id: "anatomy", title: "Anatomy", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function OverviewDemo() {
  const [value, setValue] = useState<number>(50);
  return (
    <div className="w-full max-w-[320px]">
      <Slider
        value={value}
        onValueChange={(v) => setValue(v as number)}
        label="bottom"
        ariaLabel="Value"
      />
    </div>
  );
}

function InteractivePlaygroundDemo() {
  const [label, setLabel] = useState<SliderLabel>("bottom");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [range, setRange] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [single, setSingle] = useState<number>(50);
  const [pair, setPair] = useState<[number, number]>([25, 75]);
  const labels: { value: SliderLabel; display: string }[] = [
    { value: "none", display: "None" },
    { value: "bottom", display: "Bottom" },
    { value: "top-floating", display: "Top float" },
    { value: "bottom-floating", display: "Bottom float" },
  ];
  return (
    <div className="flex w-full flex-col items-center gap-[32px]">
      <div className="flex flex-wrap items-center justify-center gap-[16px]">
        <Tabs
          value={label}
          onValueChange={(v) => setLabel(v as SliderLabel)}
        >
          <TabsList>
            {labels.map((l) => (
              <TabsTrigger key={l.value} value={l.value}>
                {l.display}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs value={dir} onValueChange={(v) => setDir(v as "ltr" | "rtl")}>
          <TabsList>
            <TabsTrigger value="ltr">LTR</TabsTrigger>
            <TabsTrigger value="rtl">RTL</TabsTrigger>
          </TabsList>
        </Tabs>
        <Checkbox
          size="sm"
          checked={range}
          onCheckedChange={setRange}
          label="Range"
        />
        <Checkbox
          size="sm"
          checked={disabled}
          onCheckedChange={setDisabled}
          label="Disabled"
        />
      </div>
      <div className="w-full max-w-[320px]">
        {range ? (
          <Slider
            range
            label={label}
            dir={dir}
            disabled={disabled}
            value={pair}
            onValueChange={(v) => setPair(v as [number, number])}
            ariaLabelStart="Minimum"
            ariaLabelEnd="Maximum"
          />
        ) : (
          <Slider
            label={label}
            dir={dir}
            disabled={disabled}
            value={single}
            onValueChange={(v) => setSingle(v as number)}
            ariaLabel="Value"
          />
        )}
      </div>
    </div>
  );
}

function LabelsDemo() {
  const entries: { label: SliderLabel; heading: string }[] = [
    { label: "none", heading: "No values" },
    { label: "bottom", heading: "Bottom values" },
    { label: "top-floating", heading: "Top floating values" },
    { label: "bottom-floating", heading: "Bottom floating values" },
  ];
  return (
    <div className="grid w-full max-w-[720px] grid-cols-1 gap-x-[32px] gap-y-[40px] md:grid-cols-2">
      {entries.map((entry) => (
        <div key={entry.label} className="flex flex-col gap-[12px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
            {entry.heading}
          </span>
          <Slider
            defaultValue={50}
            label={entry.label}
            ariaLabel={entry.heading}
          />
        </div>
      ))}
    </div>
  );
}

function RangeDemo() {
  const [value, setValue] = useState<[number, number]>([25, 75]);
  return (
    <div className="w-full max-w-[320px]">
      <Slider
        range
        label="bottom"
        value={value}
        onValueChange={(v) => setValue(v as [number, number])}
        ariaLabelStart="Minimum"
        ariaLabelEnd="Maximum"
      />
    </div>
  );
}

function PresetsDemo() {
  const rows: { start: number; end: number; labelText: string }[] = [
    { start: 0, end: 25, labelText: "0 – 25%" },
    { start: 0, end: 50, labelText: "0 – 50%" },
    { start: 0, end: 75, labelText: "0 – 75%" },
    { start: 0, end: 100, labelText: "0 – 100%" },
    { start: 25, end: 50, labelText: "25 – 50%" },
    { start: 25, end: 75, labelText: "25 – 75%" },
    { start: 25, end: 100, labelText: "25 – 100%" },
    { start: 50, end: 75, labelText: "50 – 75%" },
    { start: 50, end: 100, labelText: "50 – 100%" },
    { start: 75, end: 100, labelText: "75 – 100%" },
  ];
  return (
    <div className="grid w-full max-w-[720px] grid-cols-1 gap-x-[32px] gap-y-[32px] md:grid-cols-2">
      {rows.map((row) => (
        <div key={row.labelText} className="flex flex-col gap-[12px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
            {row.labelText}
          </span>
          <Slider
            range
            defaultValue={[row.start, row.end]}
            label="bottom"
            ariaLabelStart="Minimum"
            ariaLabelEnd="Maximum"
          />
        </div>
      ))}
    </div>
  );
}

function DisabledDemo() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-[40px]">
      <Slider disabled defaultValue={35} label="bottom" ariaLabel="Disabled single" />
      <Slider
        disabled
        range
        defaultValue={[25, 75]}
        label="bottom"
        ariaLabelStart="Disabled min"
        ariaLabelEnd="Disabled max"
      />
    </div>
  );
}

function RtlDemo() {
  const [single, setSingle] = useState<number>(60);
  const [pair, setPair] = useState<[number, number]>([20, 80]);
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-[40px]">
      <Slider
        dir="rtl"
        label="bottom"
        value={single}
        onValueChange={(v) => setSingle(v as number)}
        ariaLabel="القيمة"
      />
      <Slider
        dir="rtl"
        range
        label="top-floating"
        value={pair}
        onValueChange={(v) => setPair(v as [number, number])}
        ariaLabelStart="الأدنى"
        ariaLabelEnd="الأعلى"
      />
    </div>
  );
}

export default function SliderPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Sliders
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Interactive control for selecting a value, or a range of values, from a continuous or
            stepped scale. Supports single and dual-thumb modes, four label placements (none,
            bottom, top-floating tooltip, bottom-floating tooltip), full keyboard operation, and
            LTR/RTL layouts.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="An 8px rounded track with a 24px circular thumb. Drag the thumb, click anywhere on the track to jump the nearest thumb, or focus and use arrow keys."
            code={`import { Slider } from "@/components/ui/slider";

const [value, setValue] = useState(50);

<Slider
  value={value}
  onValueChange={(v) => setValue(v as number)}
  label="bottom"
  ariaLabel="Value"
/>`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        <section id="interactive">
          <ComponentPreview
            heading="Interactive playground"
            description="Switch label placement, toggle range mode or disabled, and flip direction. Values persist as you drag."
            code={`const [label, setLabel] = useState<SliderLabel>("bottom");
const [range, setRange] = useState(false);
const [value, setValue] = useState(50);
const [pair, setPair] = useState<[number, number]>([25, 75]);

{range ? (
  <Slider range label={label} value={pair} onValueChange={setPair} />
) : (
  <Slider label={label} value={value} onValueChange={setValue} />
)}`}
          >
            <InteractivePlaygroundDemo />
          </ComponentPreview>
        </section>

        <section id="labels">
          <ComponentPreview
            heading="Label placement"
            description='Four options — "none" hides all labels, "bottom" anchors a static 16/medium value under each thumb, "top-floating" and "bottom-floating" render a 12/medium tooltip (neutral-800 surface, 6px radius, arrow) attached to the thumb.'
            code={`<Slider label="none" defaultValue={50} />
<Slider label="bottom" defaultValue={50} />
<Slider label="top-floating" defaultValue={50} />
<Slider label="bottom-floating" defaultValue={50} />`}
          >
            <LabelsDemo />
          </ComponentPreview>
        </section>

        <section id="range">
          <ComponentPreview
            heading="Range (dual-thumb)"
            description="Pass range and a [start, end] value to render two thumbs. The progress fill spans between them; the active thumb swaps automatically if you drag one past the other."
            code={`const [value, setValue] = useState<[number, number]>([25, 75]);

<Slider
  range
  label="bottom"
  value={value}
  onValueChange={(v) => setValue(v as [number, number])}
  ariaLabelStart="Minimum"
  ariaLabelEnd="Maximum"
/>`}
          >
            <RangeDemo />
          </ComponentPreview>
        </section>

        <section id="presets">
          <ComponentPreview
            heading="Preset values"
            description="Common range presets drawn from the Figma spec: 0–25, 0–50, 0–75, 0–100, 25–50, 25–75, 25–100, 50–75, 50–100, 75–100."
            code={`<Slider range defaultValue={[0, 25]} label="bottom" />
<Slider range defaultValue={[0, 50]} label="bottom" />
<Slider range defaultValue={[25, 75]} label="bottom" />
<Slider range defaultValue={[50, 100]} label="bottom" />`}
          >
            <PresetsDemo />
          </ComponentPreview>
        </section>

        <section id="disabled">
          <ComponentPreview
            heading="Disabled"
            description="Sets the whole slider to 60% opacity and blocks pointer and keyboard interaction. The track and thumb remain visible so the current value stays readable."
            code={`<Slider disabled defaultValue={35} label="bottom" />
<Slider disabled range defaultValue={[25, 75]} label="bottom" />`}
          >
            <DisabledDemo />
          </ComponentPreview>
        </section>

        <section id="rtl">
          <ComponentPreview
            heading="Arabic (RTL)"
            description='Pass dir="rtl" to flip the axis. Increasing values grow from right to left, and arrow keys swap direction accordingly so the right-arrow still increases the value in the reading order.'
            code={`<Slider dir="rtl" label="bottom" defaultValue={60} ariaLabel="القيمة" />

<Slider
  dir="rtl"
  range
  label="top-floating"
  defaultValue={[20, 80]}
  ariaLabelStart="الأدنى"
  ariaLabelEnd="الأعلى"
/>`}
          >
            <RtlDemo />
          </ComponentPreview>
        </section>

        <section id="anatomy" className="space-y-[12px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Anatomy
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            The track is an <code className="!text-[12px]">8px</code> pill with
            {" "}<code className="!text-[12px]">--color-neutral-300</code> fill and a{" "}
            <code className="!text-[12px]">--color-primary-600</code> progress bar rounded to 4px
            at the inner edges. Each thumb is a <code className="!text-[12px]">24px</code> circle
            with a white surface, a <code className="!text-[12px]">1px stroke-primary</code>{" "}
            border, and an elevation-md shadow. Static bottom labels use Instrument Sans 16/medium
            at <code className="!text-[12px]">--header-primary</code>; floating tooltips use
            {" "}12/medium white-on-neutral-800 with a 6px radius, 6px padding, and a 16×6 arrow.
          </p>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use sliders for continuous or ranged values where the absolute number is less important than the relative position (volume, brightness, price filters).",
              "Pair a slider with a live text value — use bottom labels for static contexts and floating tooltips when the value changes during drag.",
              "Use range mode for min/max filters so both bounds are visible and adjustable in place.",
              "Snap to a step that matches the precision the user actually cares about (5%, 10%, whole numbers).",
              "Make sure the slider is still operable by keyboard — focus ring visible, arrow keys step, Home/End jump to bounds.",
            ]}
            dontItems={[
              "Don't use a slider when precise input matters — pair it with a number input or use a number field directly.",
              "Don't place more than one floating tooltip on top of another; switch to static bottom labels when thumbs are close.",
              "Don't hide the current value in range mode — label both thumbs so screen-reader and visual users agree on state.",
              "Don't rely on hover-only feedback; floating tooltips should stay visible while the thumb is focused or being dragged.",
              "Don't use a slider for discrete, unrelated options — use a segmented control or select instead.",
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
                title: "Keyboard Operable",
                desc: "Each thumb is a focusable button with role='slider'. Arrow keys move by one step, Page Up/Page Down move by 10× step (or 10% of the range), and Home/End jump to the minimum or maximum.",
              },
              {
                title: "Focus Ring",
                desc: "A 2px primary/500 focus ring with a 2px offset appears on keyboard focus, offset against the surface-tertiary backdrop so it is visible on every surface.",
              },
              {
                title: "Screen Reader Semantics",
                desc: "Each thumb exposes aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext (the formatted display value). Pass ariaLabel (single) or ariaLabelStart / ariaLabelEnd (range) so the purpose of each handle is announced.",
              },
              {
                title: "Drag Alternative",
                desc: "Clicking anywhere on the track jumps the nearest thumb, so the component is usable without the precision of a drag gesture. Touch, mouse, and stylus are all handled through pointer events.",
              },
              {
                title: "RTL Support",
                desc: "Pass dir='rtl' to mirror the axis. Arrow keys invert so that ArrowRight still advances the value in the reading order, and floating tooltips stay centered above or below their thumb.",
              },
              {
                title: "Colour Contrast",
                desc: "Primary/600 progress on neutral/300 track meets WCAG 2.1 AA non-text contrast. Static label text uses header-primary which passes AA on both surface-primary and surface-tertiary. Floating tooltip text (white on neutral-800) exceeds AAA.",
              },
            ].map((a) => (
              <div key={a.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {a.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <div className="space-y-[24px]">
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">Slider</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "min", type: "number", default: "0", description: "Minimum value for the scale." },
                    { name: "max", type: "number", default: "100", description: "Maximum value for the scale." },
                    { name: "step", type: "number", default: "1", description: "Snap increment. Arrow keys move by this amount; Page keys by 10×." },
                    { name: "value", type: "number | [number, number]", description: "Controlled value. Use a number for a single thumb, a tuple for range mode." },
                    { name: "defaultValue", type: "number | [number, number]", description: "Uncontrolled initial value." },
                    { name: "onValueChange", type: "(value: number | [number, number]) => void", description: "Fires on every pointer drag tick, track click, or keyboard step." },
                    { name: "range", type: "boolean", default: "false", description: "Renders a second thumb and returns a [start, end] tuple." },
                    { name: "label", type: '"none" | "bottom" | "top-floating" | "bottom-floating"', default: '"none"', description: "Value label placement. Floating modes render a tooltip attached to each thumb." },
                    { name: "formatValue", type: "(value: number) => string", description: "Custom formatter for the label and aria-valuetext. Defaults to '{n}%'." },
                    { name: "disabled", type: "boolean", default: "false", description: "Blocks pointer and keyboard interaction and dims the slider to 60% opacity." },
                    { name: "dir", type: '"ltr" | "rtl"', default: '"ltr"', description: "Axis direction. rtl mirrors the track and inverts horizontal arrow keys." },
                    { name: "ariaLabel", type: "string", description: "Accessible name for the single thumb. Prefer this when no visible label is associated." },
                    { name: "ariaLabelStart", type: "string", description: "Accessible name for the start thumb in range mode." },
                    { name: "ariaLabelEnd", type: "string", description: "Accessible name for the end thumb in range mode." },
                    { name: "id", type: "string", description: "Optional id applied to the outer wrapper (useful for external label associations)." },
                    { name: "className", type: "string", description: "Additional CSS classes on the outer wrapper." },
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
