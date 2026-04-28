"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { DoDont } from "@/components/docs/do-dont";
import { Dropdown, type DropdownOption } from "@/components/ui/dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "searchable", title: "Searchable", level: 2 },
  { id: "multi-select", title: "Multi-select", level: 2 },
  { id: "direction", title: "Direction", level: 2 },
  { id: "playground", title: "Playground", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
];

const DEPARTMENTS: DropdownOption[] = [
  {
    value: "dge",
    label: "Department of Government Enablement",
    description: "Government transformation and AI",
  },
  {
    value: "doh",
    label: "Department of Health",
    description: "Healthcare policy and operations",
  },
  {
    value: "doe",
    label: "Department of Education",
    description: "Curriculum and learning services",
  },
  {
    value: "doc",
    label: "Department of Culture",
    description: "Heritage, arts, and tourism",
  },
  {
    value: "dof",
    label: "Department of Finance",
    description: "Public finance and budgets",
  },
  {
    value: "doi",
    label: "Department of Infrastructure",
    description: "Urban planning and mobility",
  },
];

const COUNTRIES: DropdownOption[] = [
  { value: "ae", label: "United Arab Emirates" },
  { value: "sa", label: "Kingdom of Saudi Arabia" },
  { value: "bh", label: "Bahrain" },
  { value: "om", label: "Oman" },
  { value: "kw", label: "Kuwait" },
  { value: "qa", label: "Qatar" },
];

const ARABIC_DEPARTMENTS: DropdownOption[] = [
  { value: "dge", label: "دائرة التمكين الحكومي" },
  { value: "doh", label: "دائرة الصحة" },
  { value: "doe", label: "دائرة التعليم والمعرفة" },
  { value: "doc", label: "دائرة الثقافة والسياحة" },
];

function OverviewDemo() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="w-[340px]">
      <Dropdown
        label="Department"
        placeholder="Select a department"
        hint="Choose the entity responsible for this request."
        options={DEPARTMENTS}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    </div>
  );
}

function SizesDemo() {
  const [md, setMd] = useState<string>("");
  const [sm, setSm] = useState<string>("");
  return (
    <div className="grid w-full max-w-[760px] grid-cols-1 gap-[32px] md:grid-cols-2">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Medium
        </p>
        <Dropdown
          size="md"
          label="Country"
          placeholder="Select a country"
          hint="Medium is the default size."
          options={COUNTRIES}
          value={md}
          onChange={(v) => setMd(v as string)}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Small
        </p>
        <Dropdown
          size="sm"
          label="Country"
          placeholder="Select a country"
          hint="Use in dense UI or toolbars."
          options={COUNTRIES}
          value={sm}
          onChange={(v) => setSm(v as string)}
        />
      </div>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="grid w-full max-w-[800px] grid-cols-1 gap-x-[32px] gap-y-[24px] md:grid-cols-2">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Placeholder
        </p>
        <Dropdown
          label="Department"
          placeholder="Select a department"
          hint="This is a hint text to help user."
          options={DEPARTMENTS}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Single Selected
        </p>
        <Dropdown
          label="Department"
          hint="Selection is committed."
          options={DEPARTMENTS}
          defaultValue="dge"
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Read Only
        </p>
        <Dropdown
          label="Department"
          hint="Non-editable, data visible."
          options={DEPARTMENTS}
          defaultValue="doh"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Disabled
        </p>
        <Dropdown
          label="Department"
          hint="Non-interactive and subdued."
          options={DEPARTMENTS}
          defaultValue="doe"
          disabled
        />
      </div>
      <div className="flex flex-col gap-[8px] md:col-span-2">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Error
        </p>
        <Dropdown
          label="Department"
          placeholder="Select a department"
          options={DEPARTMENTS}
          error="Please select a department before submitting."
          mandatory
        />
      </div>
    </div>
  );
}

function SearchableDemo() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="w-[340px]">
      <Dropdown
        label="Department"
        placeholder="Find a department"
        hint="Type to filter the list in place."
        options={DEPARTMENTS}
        value={value}
        onChange={(v) => setValue(v as string)}
        searchable
      />
    </div>
  );
}

function MultiSelectDemo() {
  const [values, setValues] = useState<string[]>(["dge", "doh"]);
  return (
    <div className="w-[380px]">
      <Dropdown
        label="Assigned departments"
        placeholder="Select one or more"
        hint="Selected items appear as removable tags."
        options={DEPARTMENTS}
        value={values}
        onChange={(v) => setValues(v as string[])}
        multiple
        searchable
      />
    </div>
  );
}

function DirectionDemo() {
  const [latin, setLatin] = useState<string>("dge");
  const [arabic, setArabic] = useState<string>("dge");
  return (
    <div className="grid w-full max-w-[760px] grid-cols-1 gap-[32px] md:grid-cols-2">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Latin (LTR)
        </p>
        <Dropdown
          label="Department"
          hint="Left-to-right layout."
          options={DEPARTMENTS}
          value={latin}
          onChange={(v) => setLatin(v as string)}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Arabic (RTL)
        </p>
        <Dropdown
          direction="rtl"
          label="الدائرة"
          hint="تخطيط من اليمين إلى اليسار."
          options={ARABIC_DEPARTMENTS}
          value={arabic}
          onChange={(v) => setArabic(v as string)}
        />
      </div>
    </div>
  );
}

function Playground() {
  const [size, setSize] = useState<"md" | "sm">("md");
  const [searchable, setSearchable] = useState(true);
  const [multiple, setMultiple] = useState(false);
  const [withIcon, setWithIcon] = useState(true);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValue, setMultiValue] = useState<string[]>([]);

  return (
    <div className="flex w-full max-w-[760px] flex-col items-center gap-[24px]">
      <div className="flex flex-wrap items-start justify-center gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
            Size
          </span>
          <div className="inline-flex items-center gap-[4px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] p-[2px]">
            {(["md", "sm"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`h-[32px] rounded-[6px] px-[12px] text-[13px] font-medium leading-[20px] transition-colors ${
                  size === s
                    ? "bg-[var(--surface-alt-tertiary)] text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {s === "md" ? "Medium" : "Small"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px] pt-[22px]">
          {[
            { label: "Searchable", checked: searchable, onChange: setSearchable },
            { label: "Multiple", checked: multiple, onChange: setMultiple },
            { label: "Leading icon", checked: withIcon, onChange: setWithIcon },
            { label: "Error", checked: error, onChange: setError },
            { label: "Disabled", checked: disabled, onChange: setDisabled },
            { label: "Read only", checked: readOnly, onChange: setReadOnly },
          ].map((c) => (
            <Checkbox
              key={c.label}
              size="sm"
              checked={c.checked}
              onCheckedChange={c.onChange}
              label={c.label}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-[380px]">
        <Dropdown
          key={`${multiple}`}
          label="Department"
          placeholder={multiple ? "Select one or more" : "Select a department"}
          hint={error ? undefined : "Adjust the controls above to see the dropdown adapt."}
          error={error ? "This field is required." : undefined}
          options={DEPARTMENTS}
          size={size}
          searchable={searchable}
          multiple={multiple}
          disabled={disabled}
          readOnly={readOnly}
          mandatory={error}
          leadingIcon={
            withIcon ? (
              <Icon name="buildings" className="h-[18px] w-[18px]" />
            ) : undefined
          }
          value={multiple ? multiValue : singleValue}
          onChange={(v) => {
            if (multiple) setMultiValue(v as string[]);
            else setSingleValue(v as string);
          }}
        />
      </div>

      <div className="flex items-center gap-[12px]">
        <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-tertiary)]">
          Current value
        </span>
        <code className="rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--code-bg)] px-[8px] py-[4px] text-[13px] leading-[20px] text-[var(--text-primary)]">
          {multiple
            ? multiValue.length
              ? JSON.stringify(multiValue)
              : "[]"
            : singleValue || "∅"}
        </code>
      </div>
    </div>
  );
}

export default function DropdownPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Dropdown
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Dropdowns let users pick one or more values from a collapsible list. Use them when the set of options is larger than five, when space is limited, or when the selection needs to be filterable.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="A live single-select dropdown. Click the trigger to open, use the arrow keys and Enter to navigate, and Escape to close."
            code={`import { Dropdown } from "@/components/ui/dropdown";

const options = [
  { value: "dge", label: "Department of Government Enablement" },
  { value: "doh", label: "Department of Health" },
  { value: "doe", label: "Department of Education" },
];

<Dropdown
  label="Department"
  placeholder="Select a department"
  hint="Choose the entity responsible for this request."
  options={options}
/>`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        <section id="sizes">
          <ComponentPreview
            heading="Sizes"
            description="Two sizes share a single visual language. Medium (44px) is the default for forms and primary surfaces. Small (40px) is reserved for dense layouts such as filter bars or toolbars."
            code={`<Dropdown size="md" label="Country" options={options} />
<Dropdown size="sm" label="Country" options={options} />`}
          >
            <SizesDemo />
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Every dropdown supports the full state set: placeholder, single-selected, read-only, disabled, and error. Hover, focused, and open states happen automatically through pointer and keyboard interaction."
            code={`<Dropdown label="Department" placeholder="Select a department" options={options} />
<Dropdown label="Department" defaultValue="dge" options={options} />
<Dropdown label="Department" defaultValue="doh" options={options} readOnly />
<Dropdown label="Department" defaultValue="doe" options={options} disabled />
<Dropdown label="Department" options={options} error="Please select a department." mandatory />`}
          >
            <StatesDemo />
          </ComponentPreview>
        </section>

        <section id="searchable">
          <ComponentPreview
            heading="Searchable"
            description="Add an in-field search when the list is longer than seven items. The menu filters in place as the user types, and keyboard navigation jumps between matching results."
            code={`<Dropdown
  label="Department"
  placeholder="Find a department"
  options={options}
  searchable
/>`}
          >
            <SearchableDemo />
          </ComponentPreview>
        </section>

        <section id="multi-select">
          <ComponentPreview
            heading="Multi-select"
            description="Enable multi-select for tasks where users can pick more than one value. Selected items are summarised as removable tags inside the trigger and marked with checkboxes inside the menu."
            code={`const [values, setValues] = useState(["dge", "doh"]);

<Dropdown
  label="Assigned departments"
  options={options}
  value={values}
  onChange={(v) => setValues(v as string[])}
  multiple
  searchable
/>`}
          >
            <MultiSelectDemo />
          </ComponentPreview>
        </section>

        <section id="direction">
          <ComponentPreview
            heading="Direction"
            description="The dropdown mirrors correctly in RTL locales. Labels, hints, caret position, and menu alignment follow the locale direction automatically."
            code={`<Dropdown direction="ltr" label="Department" options={latinOptions} />
<Dropdown direction="rtl" label="الدائرة" options={arabicOptions} />`}
          >
            <DirectionDemo />
          </ComponentPreview>
        </section>

        <section id="playground">
          <ComponentPreview
            heading="Playground"
            description="Explore every combination of size, interaction mode, and state. The live value is echoed below the field."
            code={`<Dropdown
  label="Department"
  options={options}
  size="md"
  searchable
  multiple={false}
  error={undefined}
  leadingIcon={<Icon name="buildings" />}
/>`}
          >
            <Playground />
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use a dropdown when there are five or more options to choose from",
              "Write a descriptive label above the field — never rely on placeholder text alone",
              "Use the searchable variant when the list exceeds seven items",
              "Show supporting text to explain constraints or hint at expected input",
              "Use multi-select with removable tags when users can pick more than one value",
              "Mirror the component in RTL locales and use locale-appropriate option labels",
            ]}
            dontItems={[
              "Don't use a dropdown for fewer than five options — use radio buttons or segmented controls",
              "Don't use a dropdown for binary choices — use a toggle or checkbox",
              "Don't nest a dropdown inside another dropdown",
              "Don't truncate option labels — size the menu wide enough to display the full text",
              "Don't disable a field without explaining why through supporting or error text",
              "Don't mix Latin and Arabic content within the same option list",
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
                title: "ARIA Combobox pattern",
                desc: "The trigger uses role=\"combobox\" with aria-haspopup=\"listbox\" and aria-expanded. The menu renders as a role=\"listbox\" with role=\"option\" items. aria-multiselectable is set on multi-select menus.",
              },
              {
                title: "Keyboard Navigation",
                desc: "Arrow Up/Down moves through options, Enter or Space selects the active option, Home and End jump to the first or last option, and Escape closes the menu and returns focus to the trigger. Tab dismisses the menu and moves focus forward.",
              },
              {
                title: "Labelling",
                desc: "Labels are wired with aria-labelledby so screen readers announce the field purpose once. Supporting text and error messages are linked via aria-describedby. Required fields expose mandatory state via a visible asterisk and aria-invalid when in error.",
              },
              {
                title: "Focus Management",
                desc: "Opening the menu focuses the search input when searchable, or moves the active descendant to the currently selected option. Closing the menu always returns focus to the trigger so the tab order stays predictable.",
              },
              {
                title: "Color Contrast",
                desc: "Labels, hints, selected states, and error messaging meet WCAG 2.1 AA. Focused and open states use the --color-primary-600 border with a 4px --color-primary-100 ring for 3:1 contrast against the surface.",
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
      </div>
    </>
  );
}
