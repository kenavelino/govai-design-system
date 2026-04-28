"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio, RadioGroup } from "@/components/ui/radio";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "checkbox", title: "Checkbox", level: 2 },
  { id: "checkbox-sizes", title: "Sizes", level: 3 },
  { id: "checkbox-indeterminate", title: "Indeterminate", level: 3 },
  { id: "checkbox-with-description", title: "With description", level: 3 },
  { id: "checkbox-group", title: "Group", level: 3 },
  { id: "radio", title: "Radio button", level: 2 },
  { id: "radio-sizes", title: "Sizes", level: 3 },
  { id: "radio-with-description", title: "With description", level: 3 },
  { id: "states", title: "States", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function CheckboxOverviewDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [plan, setPlan] = useState("pro");
  return (
    <div className="flex w-full items-start justify-center gap-[64px]">
      <div className="flex flex-col gap-[12px]">
        <Checkbox checked={a} onCheckedChange={setA} label="Email updates" />
        <Checkbox checked={b} onCheckedChange={setB} label="Product newsletter" />
        <Checkbox indeterminate label="Select all" />
        <Checkbox disabled label="Unavailable option" />
      </div>
      <div>
        <RadioGroup value={plan} onValueChange={setPlan}>
          <Radio value="starter" label="Starter" />
          <Radio value="pro" label="Pro" />
          <Radio value="enterprise" label="Enterprise" />
          <Radio value="disabled" label="Unavailable" disabled />
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckboxSizesDemo() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  return (
    <div className="flex w-full items-center justify-center gap-[48px]">
      <div className="flex flex-col gap-[12px]">
        <Checkbox size="sm" checked={sm} onCheckedChange={setSm} label="Small checkbox" />
        <Checkbox size="sm" label="Small unchecked" />
      </div>
      <div className="flex flex-col gap-[12px]">
        <Checkbox size="md" checked={md} onCheckedChange={setMd} label="Medium checkbox" />
        <Checkbox size="md" label="Medium unchecked" />
      </div>
    </div>
  );
}

function CheckboxIndeterminateDemo() {
  const [items, setItems] = useState([true, false, true]);
  const allChecked = items.every(Boolean);
  const noneChecked = items.every((v) => !v);
  const indeterminate = !allChecked && !noneChecked;
  const setAll = (v: boolean) => setItems([v, v, v]);

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-[12px]">
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onCheckedChange={setAll}
        label="Select all"
      />
      <div className="flex flex-col gap-[10px] pl-[28px]">
        {["Analytics", "Marketing", "Necessary"].map((name, i) => (
          <Checkbox
            key={name}
            size="sm"
            checked={items[i]}
            onCheckedChange={(v) =>
              setItems((prev) => prev.map((item, idx) => (idx === i ? v : item)))
            }
            label={name}
          />
        ))}
      </div>
    </div>
  );
}

function CheckboxDescriptionDemo() {
  const [marketing, setMarketing] = useState(true);
  const [terms, setTerms] = useState(false);
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-[16px]">
      <Checkbox
        checked={marketing}
        onCheckedChange={setMarketing}
        label="Marketing communications"
        description="Receive occasional product updates, tips, and special announcements via email."
      />
      <Checkbox
        checked={terms}
        onCheckedChange={setTerms}
        label="Accept terms of service"
        description="By checking this box you agree to the terms and our data processing policy."
      />
    </div>
  );
}

function CheckboxGroupDemo() {
  const initial = { analytics: true, marketing: false, essential: true, social: false };
  const [values, setValues] = useState(initial);
  const update = (key: keyof typeof initial) => (v: boolean) =>
    setValues((prev) => ({ ...prev, [key]: v }));
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-[12px]">
      <Checkbox checked={values.essential} onCheckedChange={update("essential")} label="Essential cookies" description="Required for core site functionality." />
      <Checkbox checked={values.analytics} onCheckedChange={update("analytics")} label="Analytics" description="Help us understand how visitors use the site." />
      <Checkbox checked={values.marketing} onCheckedChange={update("marketing")} label="Marketing" description="Personalized campaigns and retargeting." />
      <Checkbox checked={values.social} onCheckedChange={update("social")} label="Social media" description="Embedded content from social networks." />
    </div>
  );
}

function RadioSizesDemo() {
  const [sm, setSm] = useState("a");
  const [md, setMd] = useState("a");
  return (
    <div className="flex w-full items-start justify-center gap-[48px]">
      <RadioGroup value={sm} onValueChange={setSm} size="sm">
        <Radio value="a" label="Small option A" />
        <Radio value="b" label="Small option B" />
      </RadioGroup>
      <RadioGroup value={md} onValueChange={setMd} size="md">
        <Radio value="a" label="Medium option A" />
        <Radio value="b" label="Medium option B" />
      </RadioGroup>
    </div>
  );
}

function RadioDescriptionDemo() {
  const [plan, setPlan] = useState("team");
  return (
    <div className="w-full max-w-[400px]">
      <RadioGroup value={plan} onValueChange={setPlan}>
        <Radio
          value="personal"
          label="Personal"
          description="For individual use — unlimited personal projects and drafts."
        />
        <Radio
          value="team"
          label="Team"
          description="Collaborate with up to 10 teammates with shared workspaces."
        />
        <Radio
          value="enterprise"
          label="Enterprise"
          description="SSO, SCIM, audit logs, and dedicated support for large organizations."
        />
      </RadioGroup>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="flex w-full flex-col gap-[32px]">
      <div>
        <p className="mb-[12px] text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          Checkbox states
        </p>
        <div className="flex flex-wrap items-center gap-[24px]">
          <Checkbox label="Default" />
          <Checkbox checked label="Selected" />
          <Checkbox indeterminate label="Indeterminate" />
          <Checkbox disabled label="Disabled" />
          <Checkbox checked disabled label="Disabled selected" />
        </div>
      </div>
      <div>
        <p className="mb-[12px] text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          Radio states
        </p>
        <RadioGroup defaultValue="selected" orientation="horizontal">
          <Radio value="default" label="Default" />
          <Radio value="selected" label="Selected" />
          <Radio value="disabled" label="Disabled" disabled />
        </RadioGroup>
      </div>
    </div>
  );
}

export default function SelectorsPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Selectors
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Selectors let users pick one or more options from a list. Checkboxes allow multi-selection,
            while radio buttons restrict the user to a single option within a group.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Interactive preview of checkboxes and radio buttons working together. Toggle any item to see the selected, indeterminate, and disabled states."
            code={`import { Checkbox } from "@/components/ui/checkbox";
import { Radio, RadioGroup } from "@/components/ui/radio";

const [selected, setSelected] = useState(true);
const [plan, setPlan] = useState("pro");

<Checkbox checked={selected} onCheckedChange={setSelected} label="Email updates" />

<RadioGroup value={plan} onValueChange={setPlan}>
  <Radio value="starter" label="Starter" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`}
          >
            <CheckboxOverviewDemo />
          </ComponentPreview>
        </section>

        <section id="checkbox" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Checkbox
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            A checkbox represents a binary on/off choice. Use checkboxes whenever a user can select zero,
            one, or multiple items from a list that are independent of each other.
          </p>

          <div id="checkbox-sizes">
            <ComponentPreview
              heading="Sizes"
              description="Two sizes — sm (16px) for compact density such as tables, md (20px) as the default for forms and settings."
              code={`<Checkbox size="sm" checked label="Small checkbox" />
<Checkbox size="md" checked label="Medium checkbox" />`}
            >
              <CheckboxSizesDemo />
            </ComponentPreview>
          </div>

          <div id="checkbox-indeterminate">
            <ComponentPreview
              heading="Indeterminate"
              description="Use the indeterminate state for a parent checkbox when only some of its children are selected. Toggling the parent selects or clears all children."
              code={`const [items, setItems] = useState([true, false, true]);
const allChecked = items.every(Boolean);
const noneChecked = items.every(v => !v);

<Checkbox
  checked={allChecked}
  indeterminate={!allChecked && !noneChecked}
  onCheckedChange={(v) => setItems([v, v, v])}
  label="Select all"
/>`}
            >
              <CheckboxIndeterminateDemo />
            </ComponentPreview>
          </div>

          <div id="checkbox-with-description">
            <ComponentPreview
              heading="With description"
              description="Add supporting text below the label for fields that need extra context — consent forms, privacy settings, or granular feature toggles."
              code={`<Checkbox
  label="Marketing communications"
  description="Receive occasional product updates, tips, and special announcements via email."
/>`}
            >
              <CheckboxDescriptionDemo />
            </ComponentPreview>
          </div>

          <div id="checkbox-group">
            <ComponentPreview
              heading="Group"
              description="Stack multiple checkboxes vertically to represent a set of independent, multi-select options."
              code={`<Checkbox label="Essential cookies" description="Required for core site functionality." />
<Checkbox label="Analytics" description="Help us understand how visitors use the site." />
<Checkbox label="Marketing" description="Personalized campaigns and retargeting." />`}
            >
              <CheckboxGroupDemo />
            </ComponentPreview>
          </div>
        </section>

        <section id="radio" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Radio button
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Radio buttons let users pick exactly one option from a mutually exclusive set. Always use
            them inside a RadioGroup so the underlying inputs share a name and keyboard navigation.
          </p>

          <div id="radio-sizes">
            <ComponentPreview
              heading="Sizes"
              description="Radio buttons share the same size scale as checkboxes — sm (16px) for dense layouts, md (20px) as the default."
              code={`<RadioGroup size="sm" defaultValue="a">
  <Radio value="a" label="Small option A" />
  <Radio value="b" label="Small option B" />
</RadioGroup>

<RadioGroup size="md" defaultValue="a">
  <Radio value="a" label="Medium option A" />
  <Radio value="b" label="Medium option B" />
</RadioGroup>`}
            >
              <RadioSizesDemo />
            </ComponentPreview>
          </div>

          <div id="radio-with-description">
            <ComponentPreview
              heading="With description"
              description="Use supporting text under each option when the choice has functional consequences — plan selection, permission scopes, or navigation paths."
              code={`<RadioGroup defaultValue="team">
  <Radio value="personal" label="Personal" description="For individual use." />
  <Radio value="team" label="Team" description="Collaborate with up to 10 teammates." />
  <Radio value="enterprise" label="Enterprise" description="SSO, SCIM, audit logs." />
</RadioGroup>`}
            >
              <RadioDescriptionDemo />
            </ComponentPreview>
          </div>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Default, selected, indeterminate, and disabled states for both controls. Selected controls use primary/600 for the fill, disabled uses surface-disabled with a stroke-primary border."
            code={`<Checkbox label="Default" />
<Checkbox checked label="Selected" />
<Checkbox indeterminate label="Indeterminate" />
<Checkbox disabled label="Disabled" />
<Checkbox checked disabled label="Disabled selected" />

<RadioGroup defaultValue="selected" orientation="horizontal">
  <Radio value="default" label="Default" />
  <Radio value="selected" label="Selected" />
  <Radio value="disabled" label="Disabled" disabled />
</RadioGroup>`}
          >
            <StatesDemo />
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use checkboxes when the user can select any number of independent options",
              "Use radio buttons when options are mutually exclusive and there are between 2 and 5 choices",
              "Always provide a clear, concise label — labels are the primary affordance, not the control",
              "Use the indeterminate state to reflect partial selection in a parent checkbox",
              "Group related selectors vertically with 12px of spacing for scannability",
            ]}
            dontItems={[
              "Don't use a single radio button — use a checkbox or toggle instead",
              "Don't mix checkboxes and radios in the same group",
              "Don't use radio buttons for more than 5 options — switch to a Dropdown",
              "Don't rely on the control alone to convey meaning — the label must always describe the choice",
              "Don't leave a radio group with no default selection unless the choice is truly optional",
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
                title: "Semantic Inputs",
                desc: "Both controls render native <input> elements (type='checkbox' and type='radio'). The visible styling is a decorative span; the hidden input handles state and assistive tech.",
              },
              {
                title: "Labels",
                desc: "The visible label is rendered inside a <label> that wraps the input, so clicking or tapping the label toggles the control. The label is the accessible name for screen readers.",
              },
              {
                title: "Indeterminate",
                desc: "When indeterminate is true, the input is announced with aria-checked='mixed' so screen readers correctly convey the partial selection state.",
              },
              {
                title: "Radio Group",
                desc: "RadioGroup renders with role='radiogroup' and gives each nested Radio the same name. Arrow keys move focus between options in the group, matching native radio behavior.",
              },
              {
                title: "Keyboard",
                desc: "Tab moves focus to the control; Space toggles a checkbox or selects a radio. Focus ring uses primary/500 with a 2px offset to remain visible on all backgrounds.",
              },
              {
                title: "Color Contrast",
                desc: "Selected fill (primary/600) and the white icon meet WCAG 2.1 AA contrast (4.5:1). Disabled controls use surface-disabled with text-alt-tertiary for icons and labels.",
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
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">Checkbox</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "checked", type: "boolean", description: "Controlled checked state" },
                    { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial checked state" },
                    { name: "indeterminate", type: "boolean", default: "false", description: "Shows a minus icon instead of a check — use for partial parent selection" },
                    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when the user toggles the checkbox" },
                    { name: "size", type: '"sm" | "md"', default: '"md"', description: "Control size — sm is 16px, md is 20px" },
                    { name: "label", type: "ReactNode", description: "Primary label rendered next to the control" },
                    { name: "description", type: "ReactNode", description: "Supporting text displayed below the label" },
                    { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and applies the disabled styling" },
                    { name: "className", type: "string", description: "Additional CSS classes on the label wrapper" },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">RadioGroup</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "value", type: "string", description: "Controlled selected value" },
                    { name: "defaultValue", type: "string", description: "Uncontrolled initial selected value" },
                    { name: "onValueChange", type: "(value: string) => void", description: "Called when the user selects a different option" },
                    { name: "name", type: "string", description: "Shared name for the underlying inputs — auto-generated if omitted" },
                    { name: "size", type: '"sm" | "md"', default: '"md"', description: "Applied to all child Radio components unless overridden" },
                    { name: "disabled", type: "boolean", default: "false", description: "Disables every child Radio" },
                    { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout direction of the group" },
                    { name: "children", type: "ReactNode", required: true, description: "Radio components that make up the group" },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">Radio</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "value", type: "string", required: true, description: "Unique value identifying this option within the group" },
                    { name: "label", type: "ReactNode", description: "Primary label rendered next to the control" },
                    { name: "description", type: "ReactNode", description: "Supporting text displayed below the label" },
                    { name: "size", type: '"sm" | "md"', description: "Overrides the size inherited from RadioGroup" },
                    { name: "disabled", type: "boolean", description: "Disables this option only — overrides group disabled if false" },
                    { name: "className", type: "string", description: "Additional CSS classes on the label wrapper" },
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
