"use client";

import { Icon } from "@/components/ui/icon";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Button } from "@/components/ui/button";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "primary-buttons", title: "Primary buttons", level: 2 },
  { id: "secondary-buttons", title: "Secondary buttons", level: 2 },
  { id: "tertiary-buttons", title: "Tertiary buttons", level: 2 },
  { id: "ghost-buttons", title: "Ghost buttons", level: 2 },
  { id: "error-buttons", title: "Error buttons", level: 2 },
  { id: "error-secondary-buttons", title: "Error secondary buttons", level: 2 },
  { id: "icon-leading-buttons", title: "Icon leading buttons", level: 2 },
  { id: "icon-trailing-buttons", title: "Icon trailing buttons", level: 2 },
  { id: "icon-only-buttons", title: "Icon only buttons", level: 2 },
  { id: "loading-buttons", title: "Loading buttons", level: 2 },
  { id: "disabled-buttons", title: "Disabled buttons", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

const SIZES = ["sm", "md", "lg", "xl"] as const;

const VARIANT_LABELS: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  ghost: "Ghost",
  error: "Error",
  "error-secondary": "Error secondary",
};

function SizeRow({
  variant,
}: {
  variant: "primary" | "secondary" | "tertiary" | "ghost" | "error" | "error-secondary";
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[12px]">
      {SIZES.map((s) => (
        <Button key={s} variant={variant} size={s}>
          Button {s}
        </Button>
      ))}
    </div>
  );
}

const ICON_SIZE_CLASS: Record<(typeof SIZES)[number], string> = {
  sm: "h-[14px] w-[14px]",
  md: "h-[16px] w-[16px]",
  lg: "h-[16px] w-[16px]",
  xl: "h-[20px] w-[20px]",
};

const ICON_ONLY_SQUARE_CLASS: Record<(typeof SIZES)[number], string> = {
  sm: "!w-[32px] !px-0",
  md: "!w-[36px] !px-0",
  lg: "!w-[40px] !px-0",
  xl: "!w-[48px] !px-0",
};

function IconLeadingRow({
  variant,
}: {
  variant: "primary" | "secondary" | "tertiary";
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[12px]">
      {SIZES.map((s) => (
        <Button key={s} variant={variant} size={s}>
          <Icon name="star" className={ICON_SIZE_CLASS[s]} />
          Button {s}
        </Button>
      ))}
    </div>
  );
}

function IconTrailingRow({
  variant,
}: {
  variant: "primary" | "secondary" | "tertiary";
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[12px]">
      {SIZES.map((s) => (
        <Button key={s} variant={variant} size={s}>
          Button {s}
          <Icon name="arrow-right" className={ICON_SIZE_CLASS[s]} />
        </Button>
      ))}
    </div>
  );
}

function IconOnlyRow({
  variant,
}: {
  variant: "primary" | "secondary" | "tertiary";
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[12px]">
      {SIZES.map((s) => (
        <Button
          key={s}
          variant={variant}
          size={s}
          aria-label={`Button ${s}`}
          className={ICON_ONLY_SQUARE_CLASS[s]}
        >
          <Icon name="star" className={ICON_SIZE_CLASS[s]} />
        </Button>
      ))}
    </div>
  );
}

const variantCodeBlock = (variant: keyof typeof VARIANT_LABELS) =>
  SIZES.map(
    (s) => `<Button variant="${variant}" size="${s}">Button ${s}</Button>`
  ).join("\n");

const ICON_PX: Record<(typeof SIZES)[number], string> = {
  sm: "h-[14px] w-[14px]",
  md: "h-[16px] w-[16px]",
  lg: "h-[16px] w-[16px]",
  xl: "h-[20px] w-[20px]",
};

const ICON_ONLY_PX: Record<(typeof SIZES)[number], string> = {
  sm: "w-[32px] px-0",
  md: "w-[36px] px-0",
  lg: "w-[40px] px-0",
  xl: "w-[48px] px-0",
};

const iconLeadingCode = (["primary", "secondary", "tertiary"] as const)
  .map((v) =>
    SIZES.map(
      (s) =>
        `<Button variant="${v}" size="${s}"><Icon name="star" className="${ICON_PX[s]}" />Button ${s}</Button>`
    ).join("\n")
  )
  .join("\n\n");

const iconTrailingCode = (["primary", "secondary", "tertiary"] as const)
  .map((v) =>
    SIZES.map(
      (s) =>
        `<Button variant="${v}" size="${s}">Button ${s}<Icon name="arrow-right" className="${ICON_PX[s]}" /></Button>`
    ).join("\n")
  )
  .join("\n\n");

const iconOnlyCode = (["primary", "secondary", "tertiary"] as const)
  .map((v) =>
    SIZES.map(
      (s) =>
        `<Button variant="${v}" size="${s}" aria-label="Button ${s}" className="${ICON_ONLY_PX[s]}"><Icon name="star" className="${ICON_PX[s]}" /></Button>`
    ).join("\n")
  )
  .join("\n\n");

export default function ButtonPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Button
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Buttons trigger actions and events. Use them to indicate the primary, secondary, and tertiary actions available to the user.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            code={`import { Button } from "@/components/ui/button";

<Button>Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>`}
          >
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
          </ComponentPreview>
        </section>

        <section id="primary-buttons">
          <ComponentPreview heading="Primary buttons" code={variantCodeBlock("primary")}>
            <SizeRow variant="primary" />
          </ComponentPreview>
        </section>

        <section id="secondary-buttons">
          <ComponentPreview heading="Secondary buttons" code={variantCodeBlock("secondary")}>
            <SizeRow variant="secondary" />
          </ComponentPreview>
        </section>

        <section id="tertiary-buttons">
          <ComponentPreview heading="Tertiary buttons" code={variantCodeBlock("tertiary")}>
            <SizeRow variant="tertiary" />
          </ComponentPreview>
        </section>

        <section id="ghost-buttons">
          <ComponentPreview heading="Ghost buttons" code={variantCodeBlock("ghost")}>
            <SizeRow variant="ghost" />
          </ComponentPreview>
        </section>

        <section id="error-buttons">
          <ComponentPreview heading="Error buttons" code={variantCodeBlock("error")}>
            <SizeRow variant="error" />
          </ComponentPreview>
        </section>

        <section id="error-secondary-buttons">
          <ComponentPreview heading="Error secondary buttons" code={variantCodeBlock("error-secondary")}>
            <SizeRow variant="error-secondary" />
          </ComponentPreview>
        </section>

        <section id="icon-leading-buttons">
          <ComponentPreview
            heading="Icon leading buttons"
            description="Display a leading icon by passing an Icon component before the button label."
            code={iconLeadingCode}
          >
            <div className="flex w-full flex-col gap-[16px]">
              <IconLeadingRow variant="primary" />
              <IconLeadingRow variant="secondary" />
              <IconLeadingRow variant="tertiary" />
            </div>
          </ComponentPreview>
        </section>

        <section id="icon-trailing-buttons">
          <ComponentPreview
            heading="Icon trailing buttons"
            description="Display a trailing icon by placing the Icon after the button label."
            code={iconTrailingCode}
          >
            <div className="flex w-full flex-col gap-[16px]">
              <IconTrailingRow variant="primary" />
              <IconTrailingRow variant="secondary" />
              <IconTrailingRow variant="tertiary" />
            </div>
          </ComponentPreview>
        </section>

        <section id="icon-only-buttons">
          <ComponentPreview
            heading="Icon only buttons"
            description="Omit the label and pass only an Icon for icon-only buttons. Always include an aria-label for screen readers."
            code={iconOnlyCode}
          >
            <div className="flex w-full flex-col gap-[16px]">
              <IconOnlyRow variant="primary" />
              <IconOnlyRow variant="secondary" />
              <IconOnlyRow variant="tertiary" />
            </div>
          </ComponentPreview>
        </section>

        <section id="loading-buttons">
          <ComponentPreview
            heading="Loading buttons"
            description="Set the loading prop to show a spinner and disable interaction while an async action is in flight."
            code={SIZES.map(
              (s) => `<Button variant="primary" size="${s}" loading>Button ${s}</Button>`
            ).join("\n")}
          >
            <div className="flex flex-wrap items-center justify-center gap-[12px]">
              {SIZES.map((s) => (
                <Button key={s} variant="primary" size={s} loading>
                  Button {s}
                </Button>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="disabled-buttons">
          <ComponentPreview
            heading="Disabled buttons"
            description="Set the disabled prop to prevent interaction and dim the visual treatment."
            code={(["primary", "secondary", "tertiary"] as const)
              .map((v) =>
                SIZES.map(
                  (s) => `<Button variant="${v}" size="${s}" disabled>Button ${s}</Button>`
                ).join("\n")
              )
              .join("\n\n")}
          >
            <div className="flex w-full flex-col gap-[16px]">
              {(["primary", "secondary", "tertiary"] as const).map((v) => (
                <div key={v} className="flex flex-wrap items-center justify-center gap-[12px]">
                  {SIZES.map((s) => (
                    <Button key={s} variant={v} size={s} disabled>
                      Button {s}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <DoDont
            doItems={[
              "Use one primary button per view for the main action",
              "Use clear, action-oriented labels like 'Save', 'Create', 'Submit'",
              "Pair icon buttons with tooltips for accessibility",
              "Use loading state for async operations",
            ]}
            dontItems={[
              "Don't use multiple primary buttons in the same view",
              "Don't use vague labels like 'Click here' or 'OK'",
              "Don't disable buttons without explaining why",
              "Don't use error variant for non-destructive actions",
            ]}
          />
        </section>

        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { title: "Keyboard Navigation", desc: "Buttons are focusable with Tab and activated with Enter or Space. Focus ring uses primary/500 with 2px offset." },
              { title: "ARIA", desc: "Uses native <button> element. Loading state sets aria-busy='true'. Disabled state sets aria-disabled='true' and removes from tab order." },
              { title: "Color Contrast", desc: "All button variants meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for non-text elements)." },
              { title: "Touch Targets", desc: "Minimum touch target size is 32px (sm), with recommended 36px (md) for most use cases." },
            ].map(a => (
              <div key={a.title} className="rounded-[8px] border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{a.title}</h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">API Reference</h2>
          <PropsTable
            props={[
              { name: "variant", type: '"primary" | "secondary" | "tertiary" | "ghost" | "error" | "error-secondary"', default: '"primary"', description: "Visual style variant" },
              { name: "size", type: '"sm" | "md" | "lg" | "xl" | "icon"', default: '"md"', description: "Button size" },
              { name: "loading", type: "boolean", default: "false", description: "Shows loading spinner and disables interaction" },
              { name: "disabled", type: "boolean", default: "false", description: "Disables the button" },
              { name: "children", type: "ReactNode", required: true, description: "Button content" },
              { name: "className", type: "string", description: "Additional CSS classes" },
              { name: "onClick", type: "(e: MouseEvent) => void", description: "Click handler" },
            ]}
          />
        </section>
      </div>
    </>
  );
}
