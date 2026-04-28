"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import {
  DateTimePicker,
  type DateRange,
} from "@/components/ui/date-time-picker";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "interactive", title: "Interactive playground", level: 2 },
  { id: "date-only", title: "Date only", level: 2 },
  { id: "date-and-time", title: "Date & time", level: 2 },
  { id: "date-range", title: "Date range", level: 2 },
  { id: "datetime-range", title: "Date & time range", level: 2 },
  { id: "arabic", title: "Arabic (RTL)", level: 2 },
  { id: "anatomy", title: "Anatomy", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function DateOnlyDemo() {
  const [value, setValue] = useState<Date | null>(new Date(2024, 0, 6));
  return (
    <div className="flex w-full justify-center">
      <DateTimePicker
        variant="date"
        value={value}
        onChange={(v) => setValue(v as Date | null)}
      />
    </div>
  );
}

function DateTimeDemo() {
  const [value, setValue] = useState<Date | null>(
    new Date(2024, 0, 6, 0, 0, 0)
  );
  return (
    <div className="flex w-full justify-center">
      <DateTimePicker
        variant="datetime"
        value={value}
        onChange={(v) => setValue(v as Date | null)}
      />
    </div>
  );
}

function DateRangeDemo() {
  const [value, setValue] = useState<DateRange>({
    from: new Date(2024, 0, 6),
    to: new Date(2024, 0, 24),
  });
  return (
    <div className="flex w-full justify-center">
      <DateTimePicker
        variant="date-range"
        value={value}
        onChange={(v) => setValue(v as DateRange)}
      />
    </div>
  );
}

function DateTimeRangeDemo() {
  const [value, setValue] = useState<DateRange>({
    from: new Date(2024, 0, 6, 0, 0, 0),
    to: new Date(2024, 0, 25, 9, 0, 0),
  });
  return (
    <div className="flex w-full justify-center">
      <DateTimePicker
        variant="datetime-range"
        value={value}
        onChange={(v) => setValue(v as DateRange)}
      />
    </div>
  );
}

function ArabicDemo() {
  const [value, setValue] = useState<DateRange>({
    from: new Date(2024, 0, 6),
    to: new Date(2024, 0, 24),
  });
  return (
    <div dir="rtl" className="flex w-full justify-center">
      <DateTimePicker
        variant="date-range"
        dir="rtl"
        value={value}
        onChange={(v) => setValue(v as DateRange)}
      />
    </div>
  );
}

function InteractivePlayground() {
  const [variant, setVariant] = useState<
    "date" | "datetime" | "date-range" | "datetime-range"
  >("date-range");
  const [rtl, setRtl] = useState(false);
  const [single, setSingle] = useState<Date | null>(new Date(2024, 0, 6, 9, 0));
  const [range, setRange] = useState<DateRange>({
    from: new Date(2024, 0, 6),
    to: new Date(2024, 0, 24),
  });

  const variants: { key: typeof variant; en: string; ar: string }[] = [
    { key: "date", en: "Date", ar: "تاريخ" },
    { key: "datetime", en: "Date & time", ar: "تاريخ ووقت" },
    { key: "date-range", en: "Date range", ar: "نطاق التاريخ" },
    { key: "datetime-range", en: "Date & time range", ar: "نطاق تاريخ ووقت" },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-[24px]">
      <div className="flex flex-wrap items-center justify-center gap-[12px]">
        <div className="inline-flex items-center gap-[4px] rounded-[8px] bg-[var(--surface-alt-tertiary)] p-[4px]">
          {variants.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setVariant(v.key)}
              className={cn(
                "inline-flex h-[28px] items-center justify-center rounded-[6px] px-[12px] text-[14px] font-medium leading-[20px] transition-colors",
                variant === v.key
                  ? "bg-[var(--surface-default)] text-[var(--text-primary)] shadow-[var(--shadow-elevation-1)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              )}
            >
              {rtl ? v.ar : v.en}
            </button>
          ))}
        </div>
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
        {variant === "date" || variant === "datetime" ? (
          <DateTimePicker
            variant={variant}
            dir={rtl ? "rtl" : "ltr"}
            value={single}
            onChange={(v) => setSingle(v as Date | null)}
          />
        ) : (
          <DateTimePicker
            variant={variant}
            dir={rtl ? "rtl" : "ltr"}
            value={range}
            onChange={(v) => setRange(v as DateRange)}
          />
        )}
      </div>
    </div>
  );
}

export default function DateTimePickerPage() {
  const overviewCode = `import { DateTimePicker } from "@/components/ui/date-time-picker";

const [value, setValue] = useState(new Date(2024, 0, 6));

<DateTimePicker
  variant="date"
  value={value}
  onChange={setValue}
/>`;

  const playgroundCode = `<DateTimePicker
  variant="date-range"
  value={range}
  onChange={setRange}
/>`;

  const dateCode = `const [value, setValue] = useState(new Date(2024, 0, 6));

<DateTimePicker
  variant="date"
  value={value}
  onChange={setValue}
/>`;

  const dateTimeCode = `const [value, setValue] = useState(new Date(2024, 0, 6, 0, 0));

<DateTimePicker
  variant="datetime"
  value={value}
  onChange={setValue}
/>`;

  const dateRangeCode = `const [range, setRange] = useState({
  from: new Date(2024, 0, 6),
  to: new Date(2024, 0, 24),
});

<DateTimePicker
  variant="date-range"
  value={range}
  onChange={setRange}
/>`;

  const dateTimeRangeCode = `<DateTimePicker
  variant="datetime-range"
  value={range}
  onChange={setRange}
/>`;

  const arabicCode = `<DateTimePicker
  variant="date-range"
  dir="rtl"
  value={range}
  onChange={setRange}
/>`;

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Date &amp; Time Picker
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            A compact calendar control for selecting a single date, a date with time,
            or a date range — including presets for common periods and a matching time
            dropdown. Supports both LTR and RTL layouts.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Click the trigger to open the calendar. Pick a day, optionally change month or year, then apply the selection."
            code={overviewCode}
          >
            <DateOnlyDemo />
          </ComponentPreview>
        </section>

        <section id="interactive">
          <ComponentPreview
            heading="Interactive playground"
            description="Switch between all four variants and toggle direction to preview every state in one place."
            code={playgroundCode}
          >
            <InteractivePlayground />
          </ComponentPreview>
        </section>

        <section id="date-only">
          <ComponentPreview
            heading="Date only"
            description="A single input with a calendar. Use for birthdays, deadlines, and any field where time is not relevant."
            code={dateCode}
          >
            <DateOnlyDemo />
          </ComponentPreview>
        </section>

        <section id="date-and-time">
          <ComponentPreview
            heading="Date & time"
            description="Pair a date input with a time dropdown that steps in 15-minute increments by default. Ideal for scheduling and meeting start times."
            code={dateTimeCode}
          >
            <DateTimeDemo />
          </ComponentPreview>
        </section>

        <section id="date-range">
          <ComponentPreview
            heading="Date range"
            description="Two calendars side-by-side with presets for Today, This Week, Last Month, and more. The selected range is highlighted in primary/50 between the endpoints."
            code={dateRangeCode}
          >
            <DateRangeDemo />
          </ComponentPreview>
        </section>

        <section id="datetime-range">
          <ComponentPreview
            heading="Date & time range"
            description="Combines range selection with time dropdowns for each endpoint. Use for report filters, exports, and audit windows."
            code={dateTimeRangeCode}
          >
            <DateTimeRangeDemo />
          </ComponentPreview>
        </section>

        <section id="arabic">
          <ComponentPreview
            heading="Arabic (RTL)"
            description="Every label, caret icon, and column order mirrors when dir='rtl' is applied. Month and weekday names render in Arabic."
            code={arabicCode}
          >
            <ArabicDemo />
          </ComponentPreview>
        </section>

        <section id="anatomy">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Anatomy
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                name: "Trigger",
                desc: "A 28px-tall input with 8px radius, stroke-primary border, and the shadow-elevation-1 shadow. Displays the formatted date and, for time variants, a second read-only field with the time.",
              },
              {
                name: "Presets sidebar",
                desc: "Appears only in range variants. 140px wide, 12px-item rows, labels resolved to Arabic when RTL is active. Clicking a preset updates the draft selection in place.",
              },
              {
                name: "Calendar header",
                desc: "Month and year selectors open compact 3-column grids for fast jumping. Chevron navigation mirrors for RTL so the caret always points forward or backward within the user's reading direction.",
              },
              {
                name: "Day grid",
                desc: "7×6 grid of 32×32 cells. Today is marked with a primary/600 dot. Selected days use primary/600 fill; in-range days use primary/50 (or primary/950 in dark mode).",
              },
              {
                name: "Time dropdown",
                desc: "15-minute increments by default, configurable via the minuteStep prop. 12-hour format with AM/PM (or ص/م in Arabic).",
              },
              {
                name: "Footer actions",
                desc: "Reset (left, error/600 text) clears the draft, Cancel closes without applying, and Apply commits the draft to the onChange callback.",
              },
            ].map((a) => (
              <div
                key={a.name}
                className="flex items-start gap-[12px] rounded-lg border border-[var(--stroke-primary)] p-[24px]"
              >
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-primary-600)]" />
                <div>
                  <p className="text-[14px] font-medium leading-[20px] text-[var(--text-primary)]">
                    {a.name}
                  </p>
                  <p className="mt-0.5 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use the date variant when only a calendar day is needed — birthdays, due dates, single-day events",
              "Use the datetime variant when time-of-day matters — meetings, reminders, scheduled publishes",
              "Use range variants for filters spanning more than one day — reports, analytics, exports",
              "Provide a default value that matches the most likely selection (today, this week) to shorten the interaction",
              "Always close the picker with Apply so the draft state is explicit and reversible via Cancel",
            ]}
            dontItems={[
              "Don't use the range variant for single-day selection — users expect one input, not two",
              "Don't hide the Reset action — users should always be able to clear their choice",
              "Don't require a time value when the field is purely date-oriented; strip the time or use the date variant",
              "Don't allow the end of a range to be earlier than its start — swap them internally rather than erroring",
              "Don't remove the preset sidebar for range variants without a clear reason; presets cover 80% of real requests",
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
                title: "Dialog role",
                desc: "The popover uses role='dialog' so screen readers announce it as a modal region. Focus moves into the calendar when the trigger opens and returns to the trigger when it closes.",
              },
              {
                title: "Day buttons",
                desc: "Each day cell is a native <button> with aria-pressed to reflect the selected state. Labels include the full date (e.g., 'Sat Jan 6 2024') so navigation is meaningful with a screen reader.",
              },
              {
                title: "Keyboard",
                desc: "Tab cycles through the trigger, header controls, calendar days, presets, and footer actions. Escape closes without applying. Enter activates buttons; Space toggles selections.",
              },
              {
                title: "Chevron mirroring",
                desc: "In RTL layouts the previous and next carets swap direction so the visual affordance always aligns with the user's reading order. Arrow key navigation follows the same mirroring.",
              },
              {
                title: "Color and state",
                desc: "Selected days use primary/600 with a neutral/0 numeral, meeting WCAG AA contrast. Today is reinforced with a dot so color alone is never the sole indicator.",
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

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <PropsTable
            props={[
              {
                name: "variant",
                type: '"date" | "datetime" | "date-range" | "datetime-range"',
                default: '"date"',
                description: "Selects the picker mode and whether a time dropdown is shown",
              },
              {
                name: "value",
                type: "Date | DateRange | null",
                description: "Controlled value. Use Date for date and datetime variants, DateRange for range variants.",
              },
              {
                name: "defaultValue",
                type: "Date | DateRange | null",
                description: "Uncontrolled initial value",
              },
              {
                name: "onChange",
                type: "(value: Date | DateRange | null) => void",
                description: "Called with the committed value after Apply or preset selection",
              },
              {
                name: "placeholder",
                type: "string",
                description: "Text shown in the trigger when no date is selected",
              },
              {
                name: "minuteStep",
                type: "number",
                default: "15",
                description: "Granularity of the time dropdown (in minutes)",
              },
              {
                name: "dir",
                type: '"ltr" | "rtl"',
                default: '"ltr"',
                description: "Controls text direction, Arabic labels, and caret mirroring",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables the trigger and prevents opening the popover",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes applied to the root wrapper",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
