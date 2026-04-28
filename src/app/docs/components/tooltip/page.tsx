"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "positions", title: "Positions", level: 2 },
  { id: "with-icon", title: "With icon button", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Tooltip
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Tooltips display brief, informative text when users hover over or focus on an element. They provide supplementary context without cluttering the interface.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Hover over the button to see the tooltip. Tooltips appear on hover and keyboard focus, and dismiss on Escape."
            code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      This is a tooltip
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>This is a tooltip</TooltipContent>
            </Tooltip>
          </ComponentPreview>
        </section>

        <section id="positions">
          <ComponentPreview
            heading="Positions"
            description="Tooltips can be placed on any side of the trigger using the side prop. The component auto-flips when there is insufficient viewport space."
            code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">Tooltip on top</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Left</Button>
  </TooltipTrigger>
  <TooltipContent side="left">Tooltip on left</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary">Right</Button>
  </TooltipTrigger>
  <TooltipContent side="right">Tooltip on right</TooltipContent>
</Tooltip>`}
          >
            <div className="flex flex-wrap items-center justify-center gap-[16px]">
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" className="capitalize">{side}</Button>
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    Tooltip on {side}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="with-icon">
          <ComponentPreview
            heading="With icon button"
            description="Use tooltips to label icon-only buttons. Always include an aria-label on the trigger for screen reader support."
            code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary" size="md" aria-label="Download file" className="w-[36px] px-0">
      <Icon name="download" className="h-[16px] w-[16px]" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Download file</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary" size="md" aria-label="Copy to clipboard" className="w-[36px] px-0">
      <Icon name="copy" className="h-[16px] w-[16px]" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Copy to clipboard</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary" size="md" aria-label="Share" className="w-[36px] px-0">
      <Icon name="share" className="h-[16px] w-[16px]" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Share</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="secondary" size="md" aria-label="Delete" className="w-[36px] px-0">
      <Icon name="trash" className="h-[16px] w-[16px]" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Delete</TooltipContent>
</Tooltip>`}
          >
            <div className="flex flex-wrap items-center justify-center gap-[12px]">
              {[
                { icon: "download", label: "Download file" },
                { icon: "copy", label: "Copy to clipboard" },
                { icon: "share", label: "Share" },
                { icon: "trash", label: "Delete" },
              ].map(({ icon, label }) => (
                <Tooltip key={icon}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="md"
                      aria-label={label}
                      className="!w-[36px] !px-0"
                    >
                      <Icon name={icon as Parameters<typeof Icon>[0]["name"]} className="h-[16px] w-[16px]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use tooltips to label icon-only buttons and controls",
              "Keep tooltip text concise — ideally one line, max two",
              "Use tooltips for supplementary information, not essential content",
              "Add a short delay (200–300ms) before showing to prevent accidental triggers",
              "Test tooltips on small screens to ensure they don't overflow",
            ]}
            dontItems={[
              "Don't put interactive elements (links, buttons) inside tooltips",
              "Don't use tooltips for error messages — use inline validation instead",
              "Don't rely on tooltips for critical information users must see",
              "Don't use tooltips on touch-only devices without proper fallbacks",
              "Don't use tooltips on elements that are already self-explanatory",
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
                title: "ARIA Tooltip Pattern",
                desc: "The tooltip uses role='tooltip' and is linked to its trigger via aria-describedby. Screen readers announce the tooltip content when the trigger is focused.",
              },
              {
                title: "Keyboard Support",
                desc: "Tooltips appear on keyboard focus and dismiss when focus leaves. Pressing Escape also closes the tooltip. Navigate between triggers with Tab and Shift+Tab.",
              },
              {
                title: "Timing",
                desc: "A 200ms show delay and 100ms hide delay prevents flickering and lets users move between adjacent elements without accidentally dismissing.",
              },
              {
                title: "No Interaction Required",
                desc: "Tooltip content is read-only and informational. Users never need to interact with tooltip content directly, ensuring compatibility with all input methods.",
              },
              {
                title: "Color Contrast",
                desc: "All tooltip variants meet WCAG AA contrast ratios in both light and dark modes to ensure readability for users with low vision.",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-[8px] border border-[var(--stroke-primary)] p-[24px]"
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
                name: "children",
                type: "ReactNode",
                required: true,
                description: "The trigger element wrapped by TooltipTrigger",
              },
              {
                name: "side",
                type: '"top" | "bottom" | "left" | "right"',
                default: '"top"',
                description: "Preferred placement of the tooltip relative to the trigger",
              },
              {
                name: "sideOffset",
                type: "number",
                default: "8",
                description: "Distance in pixels between the trigger and the tooltip",
              },
              {
                name: "delayDuration",
                type: "number",
                default: "200",
                description: "Milliseconds before the tooltip appears on hover",
              },
              {
                name: "asChild",
                type: "boolean",
                description: "When true on TooltipTrigger, props are passed to the child element instead",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes applied to TooltipContent",
              },
            ]}
          />
        </section>
      </div>
    </TooltipProvider>
  );
}
