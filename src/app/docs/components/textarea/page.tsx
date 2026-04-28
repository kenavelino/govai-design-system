"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { TextArea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "interactive", title: "Interactive playground", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "tags", title: "Tags type", level: 2 },
  { id: "rtl", title: "Arabic (RTL)", level: 2 },
  { id: "anatomy", title: "Anatomy", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function OverviewDemo() {
  return (
    <div className="w-full max-w-[400px]">
      <TextArea
        label="Description"
        placeholder="Enter a description..."
        hint="This is a hint text to help user."
      />
    </div>
  );
}

function InteractivePlaygroundDemo() {
  const [type, setType] = useState<"default" | "tags">("default");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasHint, setHasHint] = useState(true);
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const isAr = dir === "rtl";

  return (
    <div className="flex w-full flex-col items-center gap-[24px]">
      <div className="flex flex-wrap items-center justify-center gap-[16px]">
        <Tabs value={type} onValueChange={(v) => setType(v as "default" | "tags")}>
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs value={dir} onValueChange={(v) => setDir(v as "ltr" | "rtl")}>
          <TabsList>
            <TabsTrigger value="ltr">LTR</TabsTrigger>
            <TabsTrigger value="rtl">RTL</TabsTrigger>
          </TabsList>
        </Tabs>
        <Checkbox size="sm" checked={disabled} onCheckedChange={setDisabled} label="Disabled" />
        <Checkbox size="sm" checked={readOnly} onCheckedChange={setReadOnly} label="Read only" />
        <Checkbox size="sm" checked={hasError} onCheckedChange={setHasError} label="Error" />
        <Checkbox size="sm" checked={hasHint} onCheckedChange={setHasHint} label="Hint" />
      </div>
      <div className="w-full max-w-[400px]">
        <TextArea
          type={type}
          label={isAr ? "الوصف" : "Description"}
          placeholder={isAr ? "أدخل وصفًا..." : "Enter a description..."}
          hint={hasHint ? (isAr ? "هذا نص تلميح لمساعدة المستخدم." : "This is a hint text to help user.") : undefined}
          error={hasError ? (isAr ? "هذه رسالة خطأ." : "This is an error message.") : undefined}
          disabled={disabled}
          readOnly={readOnly}
          dir={dir}
          value={type === "default" ? value : undefined}
          onChange={type === "default" ? (e) => setValue(e.target.value) : undefined}
          tags={type === "tags" ? tags : undefined}
          onTagsChange={type === "tags" ? setTags : undefined}
        />
      </div>
    </div>
  );
}

function StatesDemo() {
  const states: {
    label: string;
    props: Partial<React.ComponentProps<typeof TextArea>>;
    value?: string;
  }[] = [
    {
      label: "Default",
      props: { placeholder: "Enter a description..." },
    },
    {
      label: "Filled",
      props: {},
      value: "A little about the company and the team that you'll be working with.",
    },
    {
      label: "Focused",
      props: { placeholder: "Enter a description...", autoFocus: true },
    },
    {
      label: "Read only",
      props: { readOnly: true },
      value: "A little about the company and the team that you'll be working with.",
    },
    {
      label: "Disabled",
      props: { disabled: true },
      value: "A little about the company and the team that you'll be working with.",
    },
    {
      label: "Error",
      props: {
        error: "This is an error message.",
      },
      value: "A little about the company and the team that you'll be working with.",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2">
      {states.map((s) => (
        <div key={s.label} className="flex flex-col gap-[8px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
            {s.label}
          </span>
          <TextArea
            label="Label"
            hint="This is a hint text to help user."
            defaultValue={s.value}
            {...s.props}
          />
        </div>
      ))}
    </div>
  );
}

function TagsDemo() {
  const [tags, setTags] = useState<string[]>(["Design", "Engineering"]);
  const [tagsError, setTagsError] = useState<string[]>(["Design", "Engineering"]);

  return (
    <div className="flex w-full flex-wrap justify-center gap-[32px]">
      <div className="flex w-full max-w-[380px] flex-col gap-[8px]">
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
          Default
        </span>
        <TextArea
          type="tags"
          label="Label"
          hint="Press Enter or comma to add a tag."
          placeholder="Enter tags"
          tags={tags}
          onTagsChange={setTags}
        />
      </div>
      <div className="flex w-full max-w-[380px] flex-col gap-[8px]">
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
          Error
        </span>
        <TextArea
          type="tags"
          label="Label"
          error="This is an error message."
          placeholder="Enter tags"
          tags={tagsError}
          onTagsChange={setTagsError}
        />
      </div>
    </div>
  );
}

function RtlDemo() {
  const [value, setValue] = useState("قليلاً عن الشركة والفريق الذي ستعمل معه.");
  const [tags, setTags] = useState<string[]>(["تصميم", "هندسة"]);

  return (
    <div className="flex w-full flex-wrap justify-center gap-[32px]">
      <div className="w-full max-w-[380px]">
        <TextArea
          dir="rtl"
          label="الوصف"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hint="هذا نص تلميح لمساعدة المستخدم."
        />
      </div>
      <div className="w-full max-w-[380px]">
        <TextArea
          type="tags"
          dir="rtl"
          label="العلامات"
          tags={tags}
          onTagsChange={setTags}
          hint="اضغط Enter أو فاصلة لإضافة علامة."
        />
      </div>
    </div>
  );
}

export default function TextAreaPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Text Area
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            A multi-line text input for longer content such as comments, feedback, or descriptions.
            Comes in two types — Default (free text) and Tags (chip-based entry). Supports seven
            states, helper and error text, and full LTR/RTL layout.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="A 128px min-height textarea with an 8px radius, 1px stroke-primary border, 14px/10px padding, Instrument Sans 16px text, and a resize handle icon in the bottom corner."
            code={`import { TextArea } from "@/components/ui/textarea";

<TextArea
  label="Description"
  placeholder="Enter a description..."
  hint="This is a hint text to help user."
/>`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        <section id="interactive">
          <ComponentPreview
            heading="Interactive playground"
            description="Switch between Default and Tags types, toggle direction, and apply Disabled, Read only, Error, or Hint states live."
            code={`<TextArea
  type="default"       // "default" | "tags"
  label="Description"
  placeholder="Enter a description..."
  hint="This is a hint text to help user."
  error={undefined}
  disabled={false}
  readOnly={false}
  dir="ltr"
/>`}
          >
            <InteractivePlaygroundDemo />
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Default (empty), Filled (with content), Focused (primary/500 ring), Read only (surface-tertiary background), Disabled (surface-disabled at 60% opacity), and Error (error/600 border, info icon, error message)."
            code={`<TextArea label="Label" placeholder="Enter a description..." />
<TextArea label="Label" defaultValue="Filled content here." />
<TextArea label="Label" readOnly defaultValue="Read only content." />
<TextArea label="Label" disabled defaultValue="Disabled content." />
<TextArea label="Label" error="This is an error message." defaultValue="Invalid entry." />`}
          >
            <StatesDemo />
          </ComponentPreview>
        </section>

        <section id="tags">
          <ComponentPreview
            heading="Tags type"
            description='Set type="tags" to enable chip-based entry. Press Enter or comma to add a tag; press Backspace on an empty input to remove the last one. Each tag can be removed with its × button.'
            code={`const [tags, setTags] = useState(["Design", "Engineering"]);

<TextArea
  type="tags"
  label="Label"
  hint="Press Enter or comma to add a tag."
  placeholder="Enter tags"
  tags={tags}
  onTagsChange={setTags}
/>`}
          >
            <TagsDemo />
          </ComponentPreview>
        </section>

        <section id="rtl">
          <ComponentPreview
            heading="Arabic (RTL)"
            description='Pass dir="rtl" to mirror the layout. The resize icon and error icon move to the bottom-left corner. Tags are also mirrored. Placeholder and hint text should be provided in Arabic.'
            code={`<TextArea
  dir="rtl"
  label="الوصف"
  hint="هذا نص تلميح لمساعدة المستخدم."
  placeholder="أدخل وصفًا..."
/>

<TextArea
  type="tags"
  dir="rtl"
  label="العلامات"
  tags={tags}
  onTagsChange={setTags}
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
            The wrapper is a <code className="!text-[12px]">flex-col</code> container with{" "}
            <code className="!text-[12px]">6px</code> gaps between label, textarea box, and helper
            text. The label uses Instrument Sans 14/medium at{" "}
            <code className="!text-[12px]">--text-tertiary</code>. The box has a minimum height of{" "}
            <code className="!text-[12px]">128px</code>, <code className="!text-[12px]">8px</code>{" "}
            radius, <code className="!text-[12px]">14px / 10px</code> padding,{" "}
            <code className="!text-[12px]">1px solid --stroke-primary</code> border, and a
            shadow-xs (<code className="!text-[12px]">0 1px 2px rgba(10,13,18,0.05)</code>). A
            16px icon sits in the bottom-right corner (bottom-left in RTL) —{" "}
            <code className="!text-[12px]">arrows-out-simple</code> for the resize affordance,{" "}
            <code className="!text-[12px]">info</code> in error/600 colour for the error state.
            Helper and error text use 14/regular at{" "}
            <code className="!text-[12px]">--text-tertiary</code> / error/600 respectively.
          </p>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use TextArea for multi-line content (comments, descriptions, feedback). Use Input for single-line entries.",
              "Always provide a visible label — avoid relying on placeholder text alone for accessibility.",
              "Use the hint to set character limits, formatting expectations, or example content before the user types.",
              "Apply the error state with a specific message as soon as validation fails, not only on submit.",
              'Use type="tags" when the user is entering a set of discrete items rather than prose.',
              "Pass dir='rtl' and localised labels/hints when collecting Arabic input.",
            ]}
            dontItems={[
              "Don't use a TextArea for single-line inputs — use Input instead.",
              "Don't rely on placeholder text alone; it disappears when the user starts typing.",
              "Don't show error and hint text at the same time — the error replaces the hint.",
              "Don't disable resizing without good reason; users on small screens may need to expand the field.",
              "Don't mix LTR and RTL content in the same textarea without explicitly setting the dir attribute.",
              "Don't use read-only as a substitute for a display component — use a proper data display element instead.",
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
                title: "Label Association",
                desc: "The label is rendered as a <label> element with htmlFor pointing to the textarea's id. This ensures screen readers announce the label when the textarea receives focus.",
              },
              {
                title: "Focus Ring",
                desc: "A 2px primary/500 focus ring with zero offset is applied on keyboard focus. In error state the ring uses error/500 so the state is clear to keyboard users who cannot rely on border colour alone.",
              },
              {
                title: "Error Announcement",
                desc: "The error message is rendered as a sibling paragraph below the textarea. For immediate announcement, pair with an aria-describedby attribute pointing to the error element.",
              },
              {
                title: "Keyboard Operation (Tags)",
                desc: "In Tags mode, Enter or comma adds the current input as a tag. Backspace on an empty input removes the most recent tag. Each tag's remove button is a focusable <button> with an aria-label.",
              },
              {
                title: "Required Fields",
                desc: "Pass required to render a * indicator after the label text. The asterisk uses error/600 colour. Always pair it with an explanatory note like '* Required' near the form.",
              },
              {
                title: "RTL Support",
                desc: "Pass dir='rtl' to mirror the layout and move the corner icon to the bottom-left. The underlying textarea natively handles cursor behaviour for Arabic text.",
              },
              {
                title: "Colour Contrast",
                desc: "Body text (header-primary on surface-primary) and error text (error-600 on white) both meet WCAG 2.1 AA. Disabled state at 60% opacity should not convey information through colour alone.",
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
                  name: "type",
                  type: '"default" | "tags"',
                  default: '"default"',
                  description:
                    "Render mode — default is a resizable textarea, tags is a chip-based multi-value input.",
                },
                {
                  name: "label",
                  type: "string",
                  description: "Visible label rendered above the textarea and associated via htmlFor.",
                },
                {
                  name: "hint",
                  type: "string",
                  description:
                    "Helper text shown below the textarea when there is no error. Hidden when error is set.",
                },
                {
                  name: "error",
                  type: "string",
                  description:
                    "Error message shown below the textarea. Also switches the border to error/600 and shows the info icon.",
                },
                {
                  name: "required",
                  type: "boolean",
                  description: "Renders a * after the label text.",
                },
                {
                  name: "disabled",
                  type: "boolean",
                  default: "false",
                  description:
                    "Disables the textarea — applies surface-disabled background and 60% opacity.",
                },
                {
                  name: "readOnly",
                  type: "boolean",
                  default: "false",
                  description:
                    "Makes the textarea non-editable — applies surface-tertiary background.",
                },
                {
                  name: "dir",
                  type: '"ltr" | "rtl"',
                  default: '"ltr"',
                  description:
                    "Text direction. rtl mirrors the layout and moves the corner icon to the bottom-left.",
                },
                {
                  name: "tags",
                  type: "string[]",
                  description: 'Controlled tag list for type="tags" mode.',
                },
                {
                  name: "onTagsChange",
                  type: "(tags: string[]) => void",
                  description:
                    "Called whenever tags are added or removed in tags mode.",
                },
                {
                  name: "value",
                  type: "string",
                  description: "Controlled value for default textarea mode.",
                },
                {
                  name: "defaultValue",
                  type: "string",
                  description: "Uncontrolled initial value for default textarea mode.",
                },
                {
                  name: "onChange",
                  type: "React.ChangeEventHandler<HTMLTextAreaElement>",
                  description: "Change handler for default textarea mode.",
                },
                {
                  name: "placeholder",
                  type: "string",
                  description:
                    "Placeholder text. Defaults to 'Enter tags' / 'أدخل العلامات' in tags mode.",
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional CSS classes applied to the textarea element (or tags container).",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
