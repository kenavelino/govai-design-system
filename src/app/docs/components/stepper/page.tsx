"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import type { StepItem } from "@/components/ui/stepper";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "vertical", title: "Vertical stepper", level: 2 },
  { id: "horizontal", title: "Horizontal stepper", level: 2 },
  { id: "statuses", title: "Step statuses", level: 2 },
  { id: "without-description", title: "Without description", level: 2 },
  { id: "dot-type", title: "Dot type", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

const BASE_STEPS = [
  { label: "Personal details", description: "Provide your name and email address" },
  { label: "Account setup", description: "Create your username and password" },
  { label: "Preferences", description: "Configure your notification settings" },
  { label: "Review & submit", description: "Confirm your information is correct" },
];

function buildSteps(current: number, errorIndex?: number): StepItem[] {
  return BASE_STEPS.map((s, i) => ({
    ...s,
    status:
      i === errorIndex
        ? "error"
        : i < current
        ? "complete"
        : i === current
        ? "current"
        : "waiting",
  }));
}

function InteractiveDemo() {
  const [current, setCurrent] = useState(1);
  const [errorIndex, setErrorIndex] = useState<number | undefined>(undefined);

  const steps = buildSteps(current, errorIndex);
  const isFirst = current === 0;
  const isLast = current === BASE_STEPS.length - 1;

  function handleNext() {
    setErrorIndex(undefined);
    setCurrent((c) => Math.min(BASE_STEPS.length - 1, c + 1));
  }
  function handleBack() {
    setErrorIndex(undefined);
    setCurrent((c) => Math.max(0, c - 1));
  }
  function handleError() {
    setErrorIndex((prev) => (prev === current ? undefined : current));
  }

  return (
    <div className="flex w-full max-w-[340px] flex-col gap-[24px]">
      <Stepper steps={steps} />
      <div className="flex flex-wrap items-center gap-[12px]">
        <Button variant="secondary" size="sm" onClick={handleBack} disabled={isFirst}>
          Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          disabled={isLast || errorIndex !== undefined}
        >
          Next
        </Button>
        <Button variant="error" size="sm" onClick={handleError}>
          {errorIndex === current ? "Clear error" : "Trigger error"}
        </Button>
      </div>
    </div>
  );
}

const interactiveCode = `import { useState } from "react";
import { Stepper } from "@/components/ui/stepper";
import type { StepItem } from "@/components/ui/stepper";

const BASE_STEPS = [
  { label: "Personal details", description: "Provide your name and email address" },
  { label: "Account setup",    description: "Create your username and password" },
  { label: "Preferences",      description: "Configure your notification settings" },
  { label: "Review & submit",  description: "Confirm your information is correct" },
];

function StepperDemo() {
  const [current, setCurrent] = useState(0);

  const steps: StepItem[] = BASE_STEPS.map((s, i) => ({
    ...s,
    status: i < current ? "complete" : i === current ? "current" : "waiting",
  }));

  return (
    <div className="flex flex-col gap-6">
      <Stepper steps={steps} />
      <div className="flex gap-3">
        <Button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
          Back
        </Button>
        <Button onClick={() => setCurrent(c => Math.min(3, c + 1))} disabled={current === 3}>
          Next
        </Button>
      </div>
    </div>
  );
}`;

const verticalSteps: StepItem[] = [
  { label: "Personal details", description: "Provide your name and email address", status: "complete" },
  { label: "Account setup", description: "Create your username and password", status: "current" },
  { label: "Preferences", description: "Configure your notification settings", status: "waiting" },
  { label: "Review & submit", description: "Confirm your information is correct", status: "waiting" },
];

const verticalCode = `import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "Personal details",  description: "Provide your name and email address",    status: "complete" },
  { label: "Account setup",     description: "Create your username and password",       status: "current"  },
  { label: "Preferences",       description: "Configure your notification settings",    status: "waiting"  },
  { label: "Review & submit",   description: "Confirm your information is correct",     status: "waiting"  },
];

<Stepper steps={steps} direction="vertical" />`;

const horizontalSteps: StepItem[] = [
  { label: "Personal details", description: "Name and email", status: "complete" },
  { label: "Account setup", description: "Username & password", status: "current" },
  { label: "Preferences", description: "Notifications", status: "waiting" },
  { label: "Review", description: "Confirm details", status: "waiting" },
];

const horizontalCode = `import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "Personal details", description: "Name and email",       status: "complete" },
  { label: "Account setup",    description: "Username & password",   status: "current"  },
  { label: "Preferences",      description: "Notifications",         status: "waiting"  },
  { label: "Review",           description: "Confirm details",       status: "waiting"  },
];

<Stepper steps={steps} direction="horizontal" />`;

const statusSteps: StepItem[] = [
  { label: "Completed step", description: "This step has been finished", status: "complete" },
  { label: "Current step", description: "The user is working on this step", status: "current" },
  { label: "Error step", description: "This step needs attention", status: "error" },
  { label: "Upcoming step", description: "This step hasn't started yet", status: "waiting" },
];

const statusesCode = `import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "Completed step", description: "This step has been finished",          status: "complete" },
  { label: "Current step",   description: "The user is working on this step",     status: "current"  },
  { label: "Error step",     description: "This step needs attention",            status: "error"    },
  { label: "Upcoming step",  description: "This step hasn't started yet",         status: "waiting"  },
];

<Stepper steps={steps} />`;

const noDescSteps: StepItem[] = [
  { label: "Personal details", status: "complete" },
  { label: "Account setup", status: "current" },
  { label: "Preferences", status: "waiting" },
  { label: "Review & submit", status: "waiting" },
];

const noDescCode = `import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "Personal details", status: "complete" },
  { label: "Account setup",    status: "current"  },
  { label: "Preferences",      status: "waiting"  },
  { label: "Review & submit",  status: "waiting"  },
];

<Stepper steps={steps} />`;

const dotStepsVertical: StepItem[] = [
  { label: "Personal details", description: "Provide your name and email", status: "complete" },
  { label: "Account setup", description: "Create your credentials", status: "current" },
  { label: "Preferences", description: "Configure your settings", status: "waiting" },
  { label: "Review & submit", description: "Confirm your information", status: "waiting" },
];

const dotCode = `import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "Personal details", description: "Provide your name and email",  status: "complete" },
  { label: "Account setup",    description: "Create your credentials",       status: "current"  },
  { label: "Preferences",      description: "Configure your settings",       status: "waiting"  },
  { label: "Review & submit",  description: "Confirm your information",      status: "waiting"  },
];

<Stepper steps={steps} type="dot" />`;

export default function StepperPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Steppers
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Steppers guide users through a multi-step process by showing progress, current position,
            and remaining steps. Each step can display a status — completed, active, error, or
            upcoming — so users always know where they are and what comes next.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Click Next and Back to navigate steps. Use Trigger error to simulate a failed step."
            code={interactiveCode}
          >
            <InteractiveDemo />
          </ComponentPreview>
        </section>

        <section id="vertical">
          <ComponentPreview
            heading="Vertical stepper"
            description="Stack steps vertically — ideal for forms, configuration flows, and sidebars."
            code={verticalCode}
          >
            <Stepper steps={verticalSteps} direction="vertical" className="w-full max-w-[320px]" />
          </ComponentPreview>
        </section>

        <section id="horizontal">
          <ComponentPreview
            heading="Horizontal stepper"
            description="Lay steps out in a row — suitable for top-of-page progress indicators and short flows."
            code={horizontalCode}
          >
            <Stepper steps={horizontalSteps} direction="horizontal" className="w-full" />
          </ComponentPreview>
        </section>

        <section id="statuses">
          <ComponentPreview
            heading="Step statuses"
            description="Each step carries one of four statuses: complete, current, error, and waiting."
            code={statusesCode}
          >
            <Stepper steps={statusSteps} className="w-full max-w-[320px]" />
          </ComponentPreview>
        </section>

        <section id="without-description">
          <ComponentPreview
            heading="Without description"
            description="Omit the description prop for a compact stepper that shows only step labels."
            code={noDescCode}
          >
            <Stepper steps={noDescSteps} className="w-full max-w-[280px]" />
          </ComponentPreview>
        </section>

        <section id="dot-type">
          <ComponentPreview
            heading="Dot type"
            description="Use type='dot' for a minimal indicator — ideal when step numbers aren't needed."
            code={dotCode}
          >
            <Stepper steps={dotStepsVertical} type="dot" className="w-full max-w-[320px]" />
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use steppers for sequential, multi-step processes with 3–7 steps",
              "Show only the information relevant to each step",
              "Allow users to review and edit completed steps",
              "Use error status with inline messaging to guide users toward resolution",
            ]}
            dontItems={[
              "Don't use steppers for non-sequential tasks — use tabs instead",
              "Don't create more than 7 steps; break long flows into separate sections",
              "Don't hide progress — always show completed and upcoming steps",
              "Don't rely on color alone to communicate status",
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
                title: "Keyboard Navigation",
                desc: "Each step item is a list item inside a semantic list (role='list'). Interactive elements within the stepper (buttons, links) must be reachable via Tab. The active step is annotated with aria-current='step'.",
              },
              {
                title: "Screen Reader Announcements",
                desc: "Use aria-live regions or route announcements to inform screen readers when the active step changes. Status changes (e.g., error) should be announced immediately.",
              },
              {
                title: "Color Independence",
                desc: "Status is communicated through both color and icon shape — a check for complete, a number for current/waiting, and an × for error — so color is never the sole indicator.",
              },
              {
                title: "Color Contrast",
                desc: "All badge and text combinations meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text). White icons on primary/600 and error/600 backgrounds are fully compliant.",
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

          <h3 className="mt-[16px] mb-[4px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            Stepper
          </h3>
          <PropsTable
            props={[
              {
                name: "steps",
                type: "StepItem[]",
                required: true,
                description: "Array of step objects to render in order",
              },
              {
                name: "direction",
                type: '"vertical" | "horizontal"',
                default: '"vertical"',
                description: "Layout direction of the stepper",
              },
              {
                name: "type",
                type: '"number" | "dot"',
                default: '"number"',
                description: "Badge indicator style — numbered circle or minimal dot",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes applied to the root element",
              },
            ]}
          />

          <h3 className="mt-[24px] mb-[4px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            StepItem
          </h3>
          <PropsTable
            props={[
              {
                name: "label",
                type: "string",
                required: true,
                description: "Short title displayed next to the step badge",
              },
              {
                name: "description",
                type: "string",
                description: "Optional supporting text shown below the label",
              },
              {
                name: "status",
                type: '"complete" | "current" | "error" | "waiting"',
                required: true,
                description:
                  "Visual and semantic state of the step — controls badge color, icon, and text color",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
