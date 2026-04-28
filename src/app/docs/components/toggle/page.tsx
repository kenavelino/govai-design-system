"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Toggle } from "@/components/ui/toggle";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "with-label", title: "With label", level: 2 },
  { id: "with-supporting-text", title: "With supporting text", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function OverviewDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  return (
    <div className="flex flex-col items-start gap-[16px]">
      <Toggle
        checked={notifications}
        onCheckedChange={setNotifications}
        label="Email notifications"
        description="Receive updates about your account activity."
      />
      <Toggle
        checked={darkMode}
        onCheckedChange={setDarkMode}
        label="Dark mode"
        description="Switch to a darker interface theme."
      />
      <Toggle
        checked={autoSave}
        onCheckedChange={setAutoSave}
        label="Auto-save"
        description="Automatically save your changes every minute."
      />
      <Toggle
        checked={analytics}
        onCheckedChange={setAnalytics}
        label="Usage analytics"
        description="Help improve the product by sharing anonymous usage data."
      />
    </div>
  );
}

function SizesDemo() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(true);
  return (
    <div className="flex w-full items-start justify-center gap-[64px]">
      <div className="flex flex-col gap-[16px]">
        <p className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          Small (sm)
        </p>
        <Toggle size="sm" checked={sm} onCheckedChange={setSm} label="Small toggle on" />
        <Toggle size="sm" label="Small toggle off" />
      </div>
      <div className="flex flex-col gap-[16px]">
        <p className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          Medium (md)
        </p>
        <Toggle size="md" checked={md} onCheckedChange={setMd} label="Medium toggle on" />
        <Toggle size="md" label="Medium toggle off" />
      </div>
    </div>
  );
}

function WithLabelDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setCc] = useState(true);
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-[16px]">
      <Toggle checked={a} onCheckedChange={setA} label="Marketing emails" />
      <Toggle checked={b} onCheckedChange={setB} label="SMS alerts" />
      <Toggle checked={c} onCheckedChange={setCc} label="Push notifications" />
    </div>
  );
}

function WithSupportingTextDemo() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-[20px]">
      <Toggle
        checked={twoFactor}
        onCheckedChange={setTwoFactor}
        label="Two-factor authentication"
        description="Require a verification code in addition to your password."
      />
      <Toggle
        checked={publicProfile}
        onCheckedChange={setPublicProfile}
        label="Public profile"
        description="Make your profile visible to anyone on the platform."
      />
      <Toggle
        checked={dataSharing}
        onCheckedChange={setDataSharing}
        label="Data sharing"
        description="Allow anonymized usage data to be shared with third-party analytics."
      />
    </div>
  );
}

function StatesDemo() {
  const [active, setActive] = useState(true);
  return (
    <div className="flex w-full items-start justify-center gap-[64px]">
      <div className="flex flex-col gap-[16px]">
        <p className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          Off
        </p>
        <Toggle label="Default" />
        <Toggle disabled label="Disabled" />
      </div>
      <div className="flex flex-col gap-[16px]">
        <p className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          On
        </p>
        <Toggle checked={active} onCheckedChange={setActive} label="Active" />
        <Toggle checked disabled label="Disabled" />
      </div>
    </div>
  );
}

export default function TogglePage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Toggles
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Toggles are binary switches that let users turn a setting on or off with immediate
            effect. Use them for settings that take effect instantly — unlike checkboxes, toggles
            imply an immediate state change without requiring a submit action.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Interactive toggles covering common settings scenarios. Click any toggle to switch between on and off states."
            code={`import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const [notifications, setNotifications] = useState(true);
const [autoSave, setAutoSave] = useState(true);

<Toggle
  checked={notifications}
  onCheckedChange={setNotifications}
  label="Email notifications"
  description="Receive updates about your account activity."
/>
<Toggle
  checked={autoSave}
  onCheckedChange={setAutoSave}
  label="Auto-save"
  description="Automatically save your changes every minute."
/>`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        <section id="sizes" className="space-y-[24px]">
          <ComponentPreview
            heading="Sizes"
            description="Two sizes — sm (36×20px) for compact layouts such as sidebars or dense settings panels, md (44×24px) as the default for forms and preference screens."
            code={`<Toggle size="sm" checked label="Small toggle on" />
<Toggle size="sm" label="Small toggle off" />

<Toggle size="md" checked label="Medium toggle on" />
<Toggle size="md" label="Medium toggle off" />`}
          >
            <SizesDemo />
          </ComponentPreview>
        </section>

        <section id="with-label">
          <ComponentPreview
            heading="With label"
            description="Always pair a toggle with a concise label describing the setting. The label is the primary affordance — keep it short and action-oriented."
            code={`<Toggle checked label="Marketing emails" />
<Toggle label="SMS alerts" />
<Toggle checked label="Push notifications" />`}
          >
            <WithLabelDemo />
          </ComponentPreview>
        </section>

        <section id="with-supporting-text">
          <ComponentPreview
            heading="With supporting text"
            description="Add a description below the label when the setting has non-obvious consequences — security settings, data sharing preferences, or features that affect other users."
            code={`<Toggle
  checked={twoFactor}
  onCheckedChange={setTwoFactor}
  label="Two-factor authentication"
  description="Require a verification code in addition to your password."
/>
<Toggle
  checked={publicProfile}
  onCheckedChange={setPublicProfile}
  label="Public profile"
  description="Make your profile visible to anyone on the platform."
/>`}
          >
            <WithSupportingTextDemo />
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Default (off), active (on), and disabled variants for both states. Disabled toggles retain their visual position so users can see what the setting would be if it were editable."
            code={`{/* Off states */}
<Toggle label="Default" />
<Toggle disabled label="Disabled" />

{/* On states */}
<Toggle checked label="Active" />
<Toggle checked disabled label="Disabled on" />`}
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
              "Use toggles for binary settings that take effect immediately (on/off, enable/disable)",
              "Always provide a label — never use a standalone toggle without context",
              "Add supporting text for settings with non-obvious consequences such as security or billing impact",
              "Keep sizes consistent within the same form or settings panel",
              "Place the toggle on the right side of the label in settings lists for alignment",
            ]}
            dontItems={[
              "Don't use toggles for actions that need a confirmation step — use a button instead",
              "Don't use toggles for multi-select or mutually exclusive options — use checkboxes or radios",
              "Don't use vague labels like 'Enable' without specifying what is being enabled",
              "Don't mix sm and md sizes within the same list or form group",
              "Don't disable a toggle without explaining why the setting is unavailable",
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
                title: "Switch Role",
                desc: "The underlying input renders with role='switch', which tells screen readers this is a two-state control. The accessible name comes from the visible label, which wraps the input.",
              },
              {
                title: "aria-checked",
                desc: "aria-checked is set to true or false to reflect the current state. Screen readers announce 'on' or 'off' alongside the label when the toggle is focused or activated.",
              },
              {
                title: "Keyboard Navigation",
                desc: "Tab moves focus to the toggle; Space activates it. The focus ring uses primary/500 with a 2px ring and 2px offset, remaining visible on all backgrounds.",
              },
              {
                title: "Labels",
                desc: "The label element wraps the hidden input, so clicking or tapping the label text activates the toggle. This maximises the touch/click target beyond the visual track.",
              },
              {
                title: "Disabled State",
                desc: "When disabled, the input receives the disabled attribute and pointer-events are removed from the label. The visual state persists so users can still read what the setting would be.",
              },
              {
                title: "Color Contrast",
                desc: "The on-state track (primary/600) and the white thumb meet WCAG 2.1 AA contrast (4.5:1). Disabled tracks use surface-disabled and text-alt-tertiary to remain distinguishable.",
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
          <div className="mt-[12px]">
            <PropsTable
              props={[
                {
                  name: "checked",
                  type: "boolean",
                  description: "Controlled on/off state",
                },
                {
                  name: "defaultChecked",
                  type: "boolean",
                  description: "Uncontrolled initial state",
                },
                {
                  name: "onCheckedChange",
                  type: "(checked: boolean) => void",
                  description: "Called when the user toggles the switch",
                },
                {
                  name: "size",
                  type: '"sm" | "md"',
                  default: '"md"',
                  description: "Track size — sm is 36×20px, md is 44×24px",
                },
                {
                  name: "label",
                  type: "ReactNode",
                  description: "Primary label rendered beside the toggle",
                },
                {
                  name: "description",
                  type: "ReactNode",
                  description: "Supporting text displayed below the label",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  default: "false",
                  description: "Disables interaction and applies muted styling",
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional CSS classes on the label wrapper",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
