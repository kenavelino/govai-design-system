"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { DoDont } from "@/components/docs/do-dont";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "types", title: "Types", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
];

type FieldSize = "sm" | "md";
type FieldState =
  | "placeholder"
  | "filled"
  | "focused"
  | "active"
  | "read-only"
  | "disabled"
  | "error";
type FieldType = "default" | "tags" | "number" | "website" | "currency";

interface FieldDemoProps {
  size?: FieldSize;
  type?: FieldType;
  state?: FieldState;
  label?: string;
  hint?: string;
  errorMessage?: string;
  value?: string;
  placeholder?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  mandatory?: boolean;
  showLabel?: boolean;
}

function stateClasses(state: FieldState) {
  switch (state) {
    case "focused":
      return "border-[var(--color-primary-500)] shadow-[0_0_0_4px_var(--color-primary-100)]";
    case "error":
      return "border-[var(--color-error-600)] shadow-[0_0_0_4px_var(--color-error-100)]";
    case "disabled":
      return "border-[var(--stroke-primary)] bg-[var(--surface-disabled)]";
    case "read-only":
      return "border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]";
    default:
      return "border-[var(--stroke-primary)] bg-[var(--surface-default)]";
  }
}

function textClasses(state: FieldState) {
  switch (state) {
    case "placeholder":
      return "text-[var(--text-tertiary)]";
    case "disabled":
      return "text-[var(--text-disabled)]";
    default:
      return "text-[var(--text-primary)]";
  }
}

function FieldDemo({
  size = "md",
  type = "default",
  state = "placeholder",
  label = "Label",
  hint = "This is a hint text to help user.",
  errorMessage = "This is an error message.",
  value,
  placeholder,
  leadingIcon = "envelope",
  trailingIcon = "question",
  mandatory = false,
  showLabel = true,
}: FieldDemoProps) {
  const inputPadY = size === "md" ? "py-[10px]" : "py-[8px]";
  const shadow = "shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]";
  const textSize = "text-[16px] leading-[24px]";

  const defaultPlaceholders: Record<FieldType, string> = {
    default: "olivia@govai.com",
    tags: "Enter tag",
    number: "987 654 3210",
    website: "govai.com",
    currency: "1,000.00",
  };
  const defaultValues: Record<FieldType, string> = {
    default: "chris@dge.com",
    tags: "UI Design",
    number: "987 654 3210",
    website: "dge.com",
    currency: "1,000.00",
  };

  const showValue = state !== "placeholder";
  const shown = value ?? (showValue ? defaultValues[type] : placeholder ?? defaultPlaceholders[type]);

  const renderContent = () => {
    // Number type: country dropdown + phone input
    if (type === "number") {
      return (
        <div className={`flex items-stretch rounded-[8px] border ${stateClasses(state)} overflow-hidden ${shadow}`}>
          <div className={`flex items-center gap-[4px] pl-[14px] pr-[12px] ${inputPadY} border-r border-[var(--stroke-primary)]`}>
            <img
              src="https://hatscripts.github.io/circle-flags/flags/ae.svg"
              alt="UAE"
              className="h-[20px] w-[20px] shrink-0"
            />
            <span className={`${textSize} ${textClasses(state)}`}>+971</span>
            <Icon name="caret-down" className="h-[16px] w-[16px] text-[var(--text-tertiary)]" />
          </div>
          <div className={`flex flex-1 items-center gap-[8px] px-[14px] ${inputPadY} min-w-0`}>
            <span className={`flex-1 truncate ${textSize} ${state === "placeholder" ? "text-[var(--text-tertiary)]" : textClasses(state)}`}>
              {shown}
            </span>
            {trailingIcon && (
              <Icon name={trailingIcon} className="h-[16px] w-[16px] text-[var(--text-tertiary)]" />
            )}
          </div>
        </div>
      );
    }

    // Website type: https:// prefix + input
    if (type === "website") {
      return (
        <div className={`flex items-stretch rounded-[8px] border ${stateClasses(state)} overflow-hidden ${shadow}`}>
          <div className={`flex items-center pl-[14px] pr-[12px] ${inputPadY} bg-[var(--surface-tertiary)] border-r border-[var(--stroke-primary)]`}>
            <span className={`${textSize} text-[var(--text-tertiary)]`}>https://</span>
          </div>
          <div className={`flex flex-1 items-center gap-[8px] px-[14px] ${inputPadY} min-w-0`}>
            <span className={`flex-1 truncate ${textSize} ${state === "placeholder" ? "text-[var(--text-tertiary)]" : textClasses(state)}`}>
              {shown}
            </span>
            {trailingIcon && (
              <Icon name={trailingIcon} className="h-[16px] w-[16px] text-[var(--text-tertiary)]" />
            )}
          </div>
        </div>
      );
    }

    // Currency type: $ prefix + value + currency dropdown on right
    if (type === "currency") {
      return (
        <div className={`flex items-stretch rounded-[8px] border ${stateClasses(state)} overflow-hidden ${shadow}`}>
          <div className={`flex flex-1 items-center gap-[8px] pl-[14px] ${inputPadY} min-w-0`}>
            <span className={`${textSize} text-[var(--text-tertiary)]`}>$</span>
            <span className={`flex-1 truncate ${textSize} ${state === "placeholder" ? "text-[var(--text-tertiary)]" : textClasses(state)}`}>
              {shown}
            </span>
            {trailingIcon && (
              <Icon name={trailingIcon} className="h-[16px] w-[16px] text-[var(--text-tertiary)] mr-[4px]" />
            )}
          </div>
          <div className={`flex items-center justify-between gap-[8px] px-[14px] ${inputPadY} border-l border-[var(--stroke-primary)] min-w-[82px]`}>
            <span className={`${textSize} ${textClasses(state)}`}>USD</span>
            <Icon name="caret-down" className="h-[16px] w-[16px] text-[var(--text-tertiary)]" />
          </div>
        </div>
      );
    }

    // Default and Tags — single input row with optional leading/trailing icon
    return (
      <div
        className={`flex items-center gap-[8px] rounded-[8px] border px-[14px] ${inputPadY} ${stateClasses(state)} ${shadow}`}
      >
        {leadingIcon && type === "default" && (
          <Icon
            name={leadingIcon}
            className={`h-[20px] w-[20px] ${state === "disabled" ? "text-[var(--text-disabled)]" : "text-[var(--text-tertiary)]"}`}
          />
        )}
        {type === "tags" && (
          <Icon name="tag" className="h-[20px] w-[20px] text-[var(--text-tertiary)]" />
        )}
        <span className={`flex-1 truncate ${textSize} ${state === "placeholder" ? "text-[var(--text-tertiary)]" : textClasses(state)}`}>
          {shown}
        </span>
        {trailingIcon && (
          <Icon
            name={trailingIcon}
            className={`h-[16px] w-[16px] ${state === "disabled" ? "text-[var(--text-disabled)]" : "text-[var(--text-tertiary)]"}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-[6px]">
      {showLabel && (
        <div className="flex items-center justify-between gap-[4px]">
          <div className="flex items-center gap-[4px]">
            <span className="inline-flex h-[20px] w-[20px] items-center justify-center text-[var(--text-tertiary)]">
              <Icon name="info" className="h-[16px] w-[16px]" />
            </span>
            <span className="text-[14px] font-medium leading-[20px] text-[var(--text-secondary)]">
              {label}
            </span>
            {mandatory && (
              <span className="text-[14px] font-medium leading-[20px] text-[var(--color-error-600)]">*</span>
            )}
          </div>
          <span className="inline-flex h-[20px] w-[20px] items-center justify-center text-[var(--text-tertiary)]">
            <Icon name="question" className="h-[16px] w-[16px]" />
          </span>
        </div>
      )}
      {renderContent()}
      {state === "error" ? (
        <p className="text-[14px] leading-[20px] text-[var(--color-error-600)]">{errorMessage}</p>
      ) : hint ? (
        <p className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">{hint}</p>
      ) : null}
    </div>
  );
}

export default function InputPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Input
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Inputs let users enter and edit short freeform or structured text values in forms, search bars, and filters. Variants cover common data shapes — default text, tags, numbers with country codes, URLs, and currency.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            code={`import { Input } from "@/components/ui/input";

<Input label="Full Name" placeholder="Enter your full name" />
<Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />`}
          >
            <div className="flex w-full max-w-sm flex-col gap-[12px]">
              <Input label="Full Name" placeholder="Enter your full name" />
              <Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
            </div>
          </ComponentPreview>
        </section>

        <section id="sizes">
          <ComponentPreview
            heading="Sizes"
            description="Two sizes align with the form density in the rest of the system. Use medium by default; use small in dense tables, filter bars, and toolbars."
            code={`<Input size="md" label="Label" defaultValue="chris@dge.com" hint="This is a hint text to help user." />
<Input size="sm" label="Label" defaultValue="chris@dge.com" hint="This is a hint text to help user." />`}
          >
            <div className="grid w-full gap-[32px] md:grid-cols-2">
              <div className="flex flex-col items-start gap-[12px]">
                <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">Medium</p>
                <FieldDemo size="md" state="filled" />
              </div>
              <div className="flex flex-col items-start gap-[12px]">
                <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">Small</p>
                <FieldDemo size="sm" state="filled" />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section id="types">
          <ComponentPreview
            heading="Types"
            description="Five input types cover the core data shapes used across GovAI products. Each type carries the same label, hint, and error treatment; only the input container differs."
            code={`<Input type="default" label="Label" defaultValue="chris@dge.com" />
<Input type="tags" label="Label" defaultValue="UI Design" />
<Input type="number" label="Label" defaultValue="987 654 3210" />
<Input type="website" label="Label" defaultValue="dge.com" />
<Input type="currency" label="Label" defaultValue="1,000.00" />`}
          >
            <div className="grid w-full gap-x-[24px] gap-y-[32px] md:grid-cols-2">
              {([
                { type: "default", label: "Default", desc: "General text entry with optional leading/trailing icons." },
                { type: "tags", label: "Tags", desc: "Free-form short labels for categorization." },
                { type: "number", label: "Number", desc: "Formatted number entry with a country dropdown add-on." },
                { type: "website", label: "Website", desc: "URL entry with a fixed https:// prefix add-on." },
                { type: "currency", label: "Currency", desc: "Currency value with symbol and ISO code selector." },
              ] as const).map((t) => (
                <div key={t.type} className="flex flex-col gap-[12px]">
                  <div>
                    <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">{t.label}</p>
                    <p className="mt-1 text-[13px] leading-[18px] text-[var(--text-tertiary)]">{t.desc}</p>
                  </div>
                  <FieldDemo type={t.type} state="filled" hint="" />
                </div>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="All types share the same state set: placeholder, filled, focused, active, read-only, disabled, and error. Tags use every state except active."
            code={`<Input label="Label" placeholder="chris@dge.com" />
<Input label="Label" defaultValue="chris@dge.com" />
<Input label="Label" defaultValue="chris@dge.com" autoFocus />
<Input label="Label" defaultValue="chris@dge.com" readOnly />
<Input label="Label" defaultValue="chris@dge.com" disabled />
<Input label="Label" defaultValue="chris@dge.com" error="This is an error message." />`}
          >
            <div className="grid w-full gap-x-[24px] gap-y-[32px] md:grid-cols-2">
              {([
                { state: "placeholder", label: "Placeholder" },
                { state: "filled", label: "Filled" },
                { state: "focused", label: "Focused" },
                { state: "active", label: "Active" },
                { state: "read-only", label: "Read only" },
                { state: "disabled", label: "Disabled" },
                { state: "error", label: "Error" },
              ] as const).map((s) => (
                <div key={s.state} className="flex flex-col gap-[12px]">
                  <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">{s.label}</p>
                  <FieldDemo state={s.state} hint="" />
                </div>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <DoDont
            doItems={[
              "Always provide a visible label for form inputs",
              "Use placeholder text to show example values, not as a replacement for labels",
              "Show validation errors inline below the input with a clear message",
              "Use the appropriate type (number with country code, currency, website) for built-in formatting",
              "Use hint text to provide helpful context before the user interacts",
              "Mark required fields with a red asterisk next to the label",
            ]}
            dontItems={[
              "Don't rely on placeholder text alone as the label",
              "Don't use generic error messages like 'Invalid input'",
              "Don't disable inputs without explaining why the field is unavailable",
              "Don't use a text input when a more specific control (select, checkbox) is more appropriate",
              "Don't remove the focus ring — it is critical for keyboard accessibility",
              "Don't use read-only to communicate disabled state — the visual treatments differ",
            ]}
          />
        </section>

        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { title: "Labels", desc: "Every input must have an associated <label> element using the htmlFor/id pairing. The Input component handles this automatically when the label prop is provided." },
              { title: "Error Messages", desc: "Error text is rendered adjacent to the input so screen readers can associate it. Consider adding aria-describedby for programmatic association in complex forms." },
              { title: "Keyboard Navigation", desc: "Inputs are natively focusable with Tab. Focus ring uses primary/500 with a 4px offset ring to ensure visibility on all backgrounds." },
              { title: "Color Contrast", desc: "Input text, labels, and error messages all meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text)." },
              { title: "Disabled vs Read Only", desc: "Disabled inputs are removed from the tab order. Read-only inputs remain focusable and their values are submitted with the form." },
              { title: "RTL / Arabic support", desc: "Every type mirrors correctly in RTL locales: add-ons flip to the opposite side, icons swap direction, and the caret sits at the end of the line." },
            ].map((a) => (
              <div key={a.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{a.title}</h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
