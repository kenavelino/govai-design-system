"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { DoDont } from "@/components/docs/do-dont";
import { NumberInput } from "@/components/ui/number-input";
import { Checkbox } from "@/components/ui/checkbox";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "playground", title: "Playground", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "direction", title: "Direction", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
];

type CellState = "empty" | "filled" | "focused" | "error";
type FieldState = "default" | "filled" | "focused" | "active" | "error";
type Digits = 4 | 5 | 6;
type Direction = "ltr" | "rtl";

const LATIN_DIGITS = ["1", "2", "3", "4", "5", "6"] as const;
const ARABIC_DIGITS = ["١", "٢", "٣", "٤", "٥", "٦"] as const;

function cellClasses(state: CellState) {
  switch (state) {
    case "focused":
      return "border-[var(--color-primary-500)] shadow-[0_0_0_4px_var(--color-primary-100)] bg-[var(--surface-default)]";
    case "error":
      return "border-[var(--color-error-600)] shadow-[0_0_0_4px_var(--color-error-100)] bg-[var(--surface-default)]";
    default:
      return "border-[var(--stroke-primary)] bg-[var(--surface-default)]";
  }
}

function cellTextClasses(state: CellState) {
  if (state === "empty") return "text-[var(--text-tertiary)]";
  if (state === "error") return "text-[var(--color-error-600)]";
  return "text-[var(--text-primary)]";
}

interface NumberInputDemoProps {
  digits?: Digits;
  state?: FieldState;
  direction?: Direction;
  label?: string;
  hint?: string;
  errorMessage?: string;
  showLabel?: boolean;
}

function NumberInputDemo({
  digits = 4,
  state = "default",
  direction = "ltr",
  label,
  hint,
  errorMessage,
  showLabel = true,
}: NumberInputDemoProps) {
  const resolvedLabel = label ?? (direction === "rtl" ? "أدخل الرمز السري" : "Enter the secret Code");
  const resolvedHint = hint ?? (direction === "rtl" ? "هذا نص إرشادي لمساعدة المستخدم." : "This is a hint text to help user.");
  const resolvedError = errorMessage ?? (direction === "rtl" ? "هذه رسالة خطأ." : "This is an error message.");

  const glyphs = direction === "rtl" ? ARABIC_DIGITS : LATIN_DIGITS;

  const cells: CellState[] = Array.from({ length: digits }, (_, i) => {
    if (state === "default") return "empty";
    if (state === "filled") return "filled";
    if (state === "error") return "error";
    if (state === "focused") {
      return i === 0 ? "focused" : "filled";
    }
    // active = one cell focused, rest empty
    return i === digits - 1 ? "focused" : "empty";
  });

  const values = cells.map((c, i) => (c === "empty" ? "-" : glyphs[i % glyphs.length]));

  const splitAt = digits === 6 ? 3 : null;
  const groupA = splitAt ? cells.slice(0, splitAt) : cells;
  const groupB = splitAt ? cells.slice(splitAt) : [];
  const valuesA = splitAt ? values.slice(0, splitAt) : values;
  const valuesB = splitAt ? values.slice(splitAt) : [];

  const renderCell = (c: CellState, v: string, key: number) => (
    <div
      key={key}
      className={`flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-[8px] border px-[4px] py-[2px] ${cellClasses(c)}`}
    >
      <span
        className={`text-[24px] font-medium leading-[32px] ${cellTextClasses(c)}`}
      >
        {v}
      </span>
    </div>
  );

  return (
    <div
      dir={direction}
      className="flex w-full max-w-[380px] flex-col gap-[6px]"
    >
      {showLabel && (
        <span className="text-[14px] font-medium leading-[20px] text-[var(--text-secondary)]">
          {resolvedLabel}
        </span>
      )}
      <div className="flex items-center gap-[8px]">
        {groupA.map((c, i) => renderCell(c, valuesA[i], i))}
        {splitAt && (
          <span className="text-[24px] font-medium leading-[32px] text-[var(--text-tertiary)]">
            —
          </span>
        )}
        {groupB.map((c, i) => renderCell(c, valuesB[i], i + (splitAt ?? 0)))}
      </div>
      {state === "error" ? (
        <p className="text-[12px] leading-[16px] text-[var(--color-error-600)]">
          {resolvedError}
        </p>
      ) : (
        <p className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">
          {resolvedHint}
        </p>
      )}
    </div>
  );
}

const VALID_CODE = "1234";

function InteractiveOverview() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (next: string) => {
    setValue(next);
    if (status !== "idle") setStatus("idle");
  };

  const handleComplete = (next: string) => {
    setStatus(next === VALID_CODE ? "success" : "error");
  };

  return (
    <div className="flex flex-col items-center gap-[16px] text-center">
      <NumberInput
        digits={4}
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        label="Enter the secret Code"
        hint={`Try typing, pasting, or using arrow keys. Hint: the code is ${VALID_CODE}.`}
        error={status === "error" ? "That code doesn't match. Try again." : undefined}
        className="items-center text-center"
      />
      {status === "success" && (
        <p className="text-[12px] leading-[16px] text-[var(--color-success-600)]">
          ✓ Verified. Nice work.
        </p>
      )}
    </div>
  );
}

function Playground() {
  const [digits, setDigits] = useState<4 | 5 | 6>(4);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  const digitOptions: Array<4 | 5 | 6> = [4, 5, 6];

  return (
    <div className="flex w-full flex-col items-center gap-[24px] text-center">
      <div className="flex flex-wrap items-center justify-center gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
            Length
          </span>
          <div className="inline-flex items-center gap-[4px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[2px]">
            {digitOptions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDigits(d);
                  setValue("");
                }}
                className={`h-[32px] rounded-[6px] px-[12px] text-[13px] font-medium leading-[20px] transition-colors ${
                  digits === d
                    ? "bg-[var(--surface-alt-tertiary)] text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {d} digits
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
            Direction
          </span>
          <div className="inline-flex items-center gap-[4px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[2px]">
            {(["ltr", "rtl"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDirection(d);
                  setValue("");
                }}
                className={`h-[32px] rounded-[6px] px-[12px] text-[13px] font-medium leading-[20px] transition-colors ${
                  direction === d
                    ? "bg-[var(--surface-alt-tertiary)] text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {d === "ltr" ? "Latin (LTR)" : "Arabic (RTL)"}
              </button>
            ))}
          </div>
        </div>

        <div className="self-center mt-[20px]">
          <Checkbox
            size="sm"
            checked={disabled}
            onCheckedChange={setDisabled}
            label="Disabled"
          />
        </div>
      </div>

      <NumberInput
        key={`${digits}-${direction}`}
        digits={digits}
        direction={direction}
        disabled={disabled}
        value={value}
        onChange={setValue}
        label={direction === "rtl" ? "أدخل الرمز السري" : "Enter the secret Code"}
        hint={direction === "rtl" ? "هذا نص إرشادي لمساعدة المستخدم." : "This is a hint text to help user."}
        className="items-center text-center"
      />

      <div className="flex items-center gap-[12px]">
        <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Current value
        </span>
        <code className="rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--code-bg)] px-[8px] py-[4px] text-[13px] leading-[20px] text-[var(--text-primary)]">
          {value || "∅"}
        </code>
      </div>
    </div>
  );
}

export default function NumberInputsPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Number Inputs
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Number inputs are specialized components that let users enter precise, security-sensitive numeric values in codes such as OTPs, PINs, or verification numbers. Each digit is captured in its own cell, giving users clear feedback, predictable formatting, and accurate validation across LTR and RTL locales.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="A live 4-digit number input. Type, paste, or use arrow keys to navigate. Entering the correct code surfaces a success message; an incorrect one shows the error state."
            code={`import { NumberInput } from "@/components/ui/number-input";

<NumberInput
  digits={4}
  label="Enter the secret Code"
  hint="Try typing, pasting, or using arrow keys."
  onComplete={(code) => {
    if (code === "1234") verify();
    else showError();
  }}
/>`}
          >
            <InteractiveOverview />
          </ComponentPreview>
        </section>

        <section id="playground">
          <ComponentPreview
            heading="Playground"
            description="Adjust the length, direction, and disabled state to see how the component adapts. The live value is echoed below."
            code={`const [value, setValue] = useState("");

<NumberInput
  digits={6}
  direction="rtl"
  value={value}
  onChange={setValue}
  label="أدخل الرمز السري"
  hint="هذا نص إرشادي لمساعدة المستخدم."
/>`}
          >
            <Playground />
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Every length shares the same state set: default (empty, ready for input), filled (contains entered values), focused (highlighted when selected), active (user is typing in a single cell), and error (invalid or incorrect input)."
            code={`<NumberInput digits={4} state="default" />
<NumberInput digits={4} state="filled" defaultValue="1234" />
<NumberInput digits={4} state="focused" defaultValue="1234" />
<NumberInput digits={4} state="active" />
<NumberInput digits={4} state="error" defaultValue="1234" />`}
          >
            <div className="grid w-full gap-x-[24px] gap-y-[32px] md:grid-cols-2 xl:grid-cols-3">
              {([
                { state: "default", label: "Default" },
                { state: "filled", label: "Filled" },
                { state: "focused", label: "Focused" },
                { state: "active", label: "Active" },
                { state: "error", label: "Error" },
              ] as const).map((s) => (
                <div key={s.state} className="flex flex-col gap-[12px]">
                  <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
                    {s.label}
                  </p>
                  <NumberInputDemo digits={4} state={s.state} />
                </div>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="direction">
          <ComponentPreview
            heading="Direction"
            description="Number inputs mirror correctly in RTL locales. Latin renders with western digits and left-to-right flow; Arabic uses Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) and flows right-to-left. Group separators, labels, and hints all follow the locale direction."
            code={`<NumberInput digits={6} direction="ltr" label="Enter the secret Code" />
<NumberInput digits={6} direction="rtl" label="أدخل الرمز السري" />`}
          >
            <div className="grid w-full gap-x-[24px] gap-y-[32px] md:grid-cols-2">
              <div className="flex flex-col gap-[12px]">
                <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
                  Latin (LTR)
                </p>
                <NumberInputDemo digits={6} state="filled" direction="ltr" />
              </div>
              <div className="flex flex-col gap-[12px]">
                <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
                  Arabic (RTL)
                </p>
                <NumberInputDemo digits={6} state="filled" direction="rtl" />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use number inputs for precision cases: PIN codes, OTPs, or fixed-length entries",
              "Apply the error state clearly and immediately when the entered code is invalid",
              "Ensure focus advances to the next cell on entry and moves back on delete",
              "Provide a label or supporting text so users know what the number represents",
              "Respect RTL alignment and Arabic-Indic numerals for Arabic locales",
              "Pick the shortest length that satisfies the security requirement (4, 5, or 6)",
            ]}
            dontItems={[
              "Don't use a number input for free-form numeric values — use the standard Input with type=\"number\"",
              "Don't hide the label; placeholder dashes alone don't communicate intent",
              "Don't split codes into groups other than the established 3-3 pattern at 6 digits",
              "Don't block paste — users often paste codes from SMS or email",
              "Don't mix Latin and Arabic numerals within the same field",
              "Don't suppress the focus ring; it is critical for keyboard users",
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
                title: "Labels",
                desc: "The group must have a single descriptive label (e.g. \"Enter the secret Code\"). Cells should share an accessible name via aria-labelledby so screen readers announce the purpose once.",
              },
              {
                title: "Keyboard Navigation",
                desc: "Tab focuses the group; typing a digit auto-advances. Backspace moves focus back and clears. Arrow keys move between cells. Paste fills all cells in order.",
              },
              {
                title: "Error Messaging",
                desc: "Invalid codes surface an inline message below the group using --color-error-600. The message should be programmatically linked with aria-describedby and announced via aria-live=\"polite\".",
              },
              {
                title: "Focus Ring",
                desc: "The active cell uses a 4px outer ring in primary/100 with a 1px primary/500 border. Error states apply the same ring treatment in error/100 + error/600 to preserve contrast.",
              },
              {
                title: "Color Contrast",
                desc: "Cell text, labels, hints, and error messages all meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for the 24px digit display).",
              },
              {
                title: "RTL / Arabic support",
                desc: "In RTL locales, cells are laid out right-to-left, the 6-digit separator mirrors, and Arabic-Indic numerals render with the Instrument Sans fallback. Autocomplete and paste preserve the logical order regardless of direction.",
              },
            ].map((a) => (
              <div key={a.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
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
      </div>
    </>
  );
}
