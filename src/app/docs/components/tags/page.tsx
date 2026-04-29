"use client";

import { useState } from "react";
import { Globe, ImageSquare, Star, Tag as TagIcon, Folder, Sparkle } from "@phosphor-icons/react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Tag } from "@/components/ui/tag";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "playground", title: "Playground", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "removable", title: "Removable Tags", level: 2 },
  { id: "with-count", title: "With Count", level: 2 },
  { id: "with-status", title: "With Status", level: 2 },
  { id: "with-icon", title: "With Icon", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

type Variant = "default" | "brand";
type Size = "xs" | "sm";
type Feature = "none" | "removable" | "count" | "status";

const STATUS_OPTIONS = ["success", "error", "warning", "brand", "neutral"] as const;

export default function TagsPage() {
  const [playVariant, setPlayVariant] = useState<Variant>("default");
  const [playSize, setPlaySize] = useState<Size>("sm");
  const [playFeature, setPlayFeature] = useState<Feature>("none");
  const [playStatus, setPlayStatus] = useState<typeof STATUS_OPTIONS[number]>("success");
  const [removableTags, setRemovableTags] = useState([
    "Research", "Policy", "AI Safety", "Governance", "Compliance",
  ]);

  const playTagProps = {
    variant: playVariant,
    size: playSize,
    ...(playFeature === "removable" ? { onRemove: () => {} } : {}),
    ...(playFeature === "count" ? { count: 12 } : {}),
    ...(playFeature === "status" ? { status: playStatus } : {}),
  };

  const playCode = `<Tag
  variant="${playVariant}"
  size="${playSize}"${playFeature === "removable" ? "\n  onRemove={() => removeTag(id)}" : ""}${playFeature === "count" ? "\n  count={12}" : ""}${playFeature === "status" ? `\n  status="${playStatus}"` : ""}
>
  Label
</Tag>`;

  const controlBtnCls = (active: boolean) =>
    `rounded-[6px] border px-[10px] py-[4px] text-[12px] font-medium transition-colors cursor-pointer ${
      active
        ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-300)]"
        : "border-[var(--stroke-primary)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]"
    }`;

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Tags
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Tags are small, interactive components used for labeling, categorization, filtering, or highlighting important metadata within interfaces. They enable users to quickly identify, filter, and take action on sets of information.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Tags support inline visual organization and streamlined workflows. They may feature icons, remove actions, count indicators, and status colors — adapting to both Latin and Arabic content.
          </p>
          <div className="mt-5 rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px] flex flex-wrap items-center justify-center gap-[12px]">
            <Tag>Label</Tag>
            <Tag variant="brand">Brand</Tag>
            <Tag onRemove={() => {}}>Removable</Tag>
            <Tag count={8}>With Count</Tag>
            <Tag status="success">Active</Tag>
            <Tag status="warning">Pending</Tag>
            <Tag status="error">Failed</Tag>
            <Tag variant="brand" onRemove={() => {}}>Brand Tag</Tag>
          </div>
        </section>

        {/* Playground */}
        <section id="playground">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Playground
          </h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Configure the tag interactively to explore all combinations of variant, size, and features.
          </p>
          <div className="mt-[12px] rounded-[20px] border border-[var(--stroke-primary)] bg-[var(--preview-frame-bg)] p-[8px]">
            <div className="rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] shadow-[0_5px_8px_0_rgba(0,0,0,0.08)]">
              {/* Live preview */}
              <div className="flex min-h-[180px] items-center justify-center p-[24px]">
                <Tag {...playTagProps}>Label</Tag>
              </div>

              {/* Controls */}
              <div className="border-t border-[var(--stroke-primary)] px-[20px] py-[16px] space-y-[12px]">
                <div className="flex flex-wrap items-center gap-[8px]">
                  <span className="w-[64px] shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Variant</span>
                  {(["default", "brand"] as Variant[]).map((v) => (
                    <button key={v} onClick={() => setPlayVariant(v)} className={controlBtnCls(playVariant === v)}>
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-[8px]">
                  <span className="w-[64px] shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Size</span>
                  {(["xs", "sm"] as Size[]).map((s) => (
                    <button key={s} onClick={() => setPlaySize(s)} className={controlBtnCls(playSize === s)}>
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-[8px]">
                  <span className="w-[64px] shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Feature</span>
                  {(["none", "removable", "count", "status"] as Feature[]).map((f) => (
                    <button key={f} onClick={() => setPlayFeature(f)} className={controlBtnCls(playFeature === f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                {playFeature === "status" && (
                  <div className="flex flex-wrap items-center gap-[8px]">
                    <span className="w-[64px] shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Status</span>
                    {STATUS_OPTIONS.map((s) => (
                      <button key={s} onClick={() => setPlayStatus(s)} className={controlBtnCls(playStatus === s)}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section id="sizes">
          <ComponentPreview
            heading="Sizes"
            description="Tags come in two sizes: Extra Small (xs) and Small (sm). Use xs for dense data tables or compact layouts; use sm as the default in most interfaces."
            code={`{/* Extra Small */}
<Tag size="xs">Extra Small</Tag>
<Tag size="xs" variant="brand">Brand XS</Tag>
<Tag size="xs" onRemove={() => removeTag(id)}>Removable XS</Tag>
<Tag size="xs" count={5}>With Count</Tag>
<Tag size="xs" status="success">Active</Tag>

{/* Small (default) */}
<Tag size="sm">Small</Tag>
<Tag size="sm" variant="brand">Brand SM</Tag>
<Tag size="sm" onRemove={() => removeTag(id)}>Removable SM</Tag>
<Tag size="sm" count={5}>With Count</Tag>
<Tag size="sm" status="success">Active</Tag>`}
          >
            <div className="flex flex-col items-center gap-[20px] w-full">
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[480px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Extra Small (xs)</p>
                <div className="flex flex-wrap gap-[8px]">
                  <Tag size="xs">Extra Small</Tag>
                  <Tag size="xs" variant="brand">Brand XS</Tag>
                  <Tag size="xs" onRemove={() => {}}>Removable</Tag>
                  <Tag size="xs" count={5}>With Count</Tag>
                  <Tag size="xs" status="success">Active</Tag>
                </div>
              </div>
              <div className="w-full max-w-[480px] border-t border-[var(--stroke-primary)]" />
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[480px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Small (sm)</p>
                <div className="flex flex-wrap gap-[8px]">
                  <Tag size="sm">Small</Tag>
                  <Tag size="sm" variant="brand">Brand SM</Tag>
                  <Tag size="sm" onRemove={() => {}}>Removable</Tag>
                  <Tag size="sm" count={5}>With Count</Tag>
                  <Tag size="sm" status="success">Active</Tag>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </section>

        {/* Variants */}
        <section id="variants">
          <ComponentPreview
            heading="Variants"
            description="Tags support two visual variants: Default (neutral) and Brand (primary-tinted). Brand tags draw attention to primary classifications or highlighted metadata."
            code={`{/* Default — neutral, general-purpose */}
<Tag variant="default">Research</Tag>
<Tag variant="default">Policy</Tag>
<Tag variant="default">Governance</Tag>

{/* Brand — primary-tinted, highlighted */}
<Tag variant="brand">AI Safety</Tag>
<Tag variant="brand">Core Feature</Tag>
<Tag variant="brand">Priority</Tag>`}
          >
            <div className="flex flex-col items-center gap-[20px] w-full">
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[480px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Default</p>
                <div className="flex flex-wrap gap-[8px]">
                  <Tag>Research</Tag>
                  <Tag>Policy</Tag>
                  <Tag>Governance</Tag>
                  <Tag>Report</Tag>
                  <Tag>Tool</Tag>
                </div>
              </div>
              <div className="w-full max-w-[480px] border-t border-[var(--stroke-primary)]" />
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[480px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Brand</p>
                <div className="flex flex-wrap gap-[8px]">
                  <Tag variant="brand">AI Safety</Tag>
                  <Tag variant="brand">Core Feature</Tag>
                  <Tag variant="brand">Priority</Tag>
                  <Tag variant="brand">Featured</Tag>
                  <Tag variant="brand">New</Tag>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </section>

        {/* Removable */}
        <section id="removable">
          <ComponentPreview
            heading="Removable Tags"
            description="Pass an onRemove callback to display a dismiss button. Clicking the × removes the tag from the collection. Try removing tags in the preview below."
            code={`const [tags, setTags] = useState(["Research", "Policy", "AI Safety"]);

const removeTag = (tag: string) =>
  setTags((prev) => prev.filter((t) => t !== tag));

{tags.map((tag) => (
  <Tag key={tag} onRemove={() => removeTag(tag)}>
    {tag}
  </Tag>
))}

{tags.length === 0 && (
  <span className="text-sm text-muted-foreground">All tags removed</span>
)}`}
          >
            <div className="flex flex-wrap items-center justify-center gap-[8px] min-h-[48px]">
              {removableTags.length > 0 ? (
                removableTags.map((tag) => (
                  <Tag
                    key={tag}
                    onRemove={() =>
                      setRemovableTags((prev) => prev.filter((t) => t !== tag))
                    }
                  >
                    {tag}
                  </Tag>
                ))
              ) : (
                <div className="flex flex-col items-center gap-[8px]">
                  <p className="text-[13px] text-[var(--text-tertiary)]">All tags removed</p>
                  <button
                    onClick={() =>
                      setRemovableTags(["Research", "Policy", "AI Safety", "Governance", "Compliance"])
                    }
                    className="text-[12px] font-medium text-[var(--color-primary-600)] hover:underline"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </ComponentPreview>
        </section>

        {/* With Count */}
        <section id="with-count">
          <ComponentPreview
            heading="With Count"
            description="The count prop displays a numeric badge within the tag. Use this to indicate the number of items in a filtered category or the frequency of a classification."
            code={`<Tag count={3}>Reports</Tag>
<Tag count={12}>Research</Tag>
<Tag count={128}>Documents</Tag>
<Tag variant="brand" count={5}>AI Safety</Tag>
<Tag variant="brand" count={24}>Featured</Tag>`}
          >
            <div className="flex flex-wrap items-center justify-center gap-[10px]">
              <Tag count={3}>Reports</Tag>
              <Tag count={12}>Research</Tag>
              <Tag count={128}>Documents</Tag>
              <Tag variant="brand" count={5}>AI Safety</Tag>
              <Tag variant="brand" count={24}>Featured</Tag>
            </div>
          </ComponentPreview>
        </section>

        {/* With Status */}
        <section id="with-status">
          <ComponentPreview
            heading="With Status"
            description="The status prop displays a small colored dot before the label, indicating the current state of the associated item. Pairs well with the Default variant."
            code={`<Tag status="success">Active</Tag>
<Tag status="warning">Pending</Tag>
<Tag status="error">Failed</Tag>
<Tag status="brand">In Progress</Tag>
<Tag status="neutral">Archived</Tag>`}
          >
            <div className="flex flex-wrap items-center justify-center gap-[10px]">
              <Tag status="success">Active</Tag>
              <Tag status="warning">Pending</Tag>
              <Tag status="error">Failed</Tag>
              <Tag status="brand">In Progress</Tag>
              <Tag status="neutral">Archived</Tag>
            </div>
          </ComponentPreview>

          {/* Status reference table */}
          <div className="mt-4 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Status</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Preview</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Dot Color</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { status: "success" as const, label: "Success", color: "color-success-500", use: "Active, complete, approved, published" },
                  { status: "warning" as const, label: "Warning", color: "color-warning-500", use: "Pending, expiring, needs review" },
                  { status: "error" as const, label: "Error", color: "color-error-500", use: "Failed, rejected, critical" },
                  { status: "brand" as const, label: "Brand", color: "color-primary-500", use: "In progress, highlighted, primary state" },
                  { status: "neutral" as const, label: "Neutral", color: "color-neutral-400", use: "Archived, inactive, default state" },
                ].map((row) => (
                  <tr
                    key={row.status}
                    className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--color-neutral-100)]"
                  >
                    <td className="px-[16px] py-[12px] font-medium leading-[20px] text-[var(--text-primary)]">{row.label}</td>
                    <td className="px-[16px] py-[12px] leading-[20px]">
                      <Tag status={row.status}>{row.label}</Tag>
                    </td>
                    <td className="px-[16px] py-[12px] text-[12px] leading-[20px] text-[var(--text-tertiary)] font-mono">{row.color}</td>
                    <td className="px-[16px] py-[12px] leading-[20px] text-[var(--text-secondary)]">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* With Icon */}
        <section id="with-icon">
          <ComponentPreview
            heading="With Icon"
            description="Pass any ReactNode to the icon prop to prepend a leading element — a Phosphor icon, circular avatar, or country flag. The slot is 16×16px (SM) and 12×12px (XS); consumers control the shape."
            code={`import { Globe, Star, Folder } from "@phosphor-icons/react";

{/* Generic icon */}
<Tag icon={<Globe className="h-full w-full text-[var(--text-tertiary)]" />}>
  Global
</Tag>

{/* Avatar — circular photo */}
<Tag
  icon={
    <img
      src="/avatars/user.png"
      alt=""
      className="h-full w-full rounded-full object-cover"
    />
  }
>
  Sarah M.
</Tag>

{/* Avatar — initials fallback */}
<Tag
  icon={
    <span className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[8px] font-semibold text-[var(--color-primary-700)]">
      KA
    </span>
  }
>
  Kennedi A.
</Tag>

{/* Country flag — circle-flags circular SVG icons */}
<Tag
  icon={
    <img
      src="https://hatscripts.github.io/circle-flags/flags/ae.svg"
      alt="UAE"
      className="h-full w-full"
    />
  }
>
  UAE
</Tag>

{/* Brand variant with icon */}
<Tag
  variant="brand"
  icon={<Star className="h-full w-full text-[var(--color-primary-600)]" weight="fill" />}
>
  Featured
</Tag>`}
          >
            <div className="flex flex-col gap-[20px] w-full items-center">
              {/* Icon types */}
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[520px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Phosphor Icon</p>
                <div className="flex flex-wrap gap-[8px]">
                  <Tag icon={<Globe className="h-full w-full text-[var(--text-tertiary)]" />}>Global</Tag>
                  <Tag icon={<Star className="h-full w-full text-[var(--text-tertiary)]" />}>Featured</Tag>
                  <Tag icon={<Folder className="h-full w-full text-[var(--text-tertiary)]" />}>Projects</Tag>
                  <Tag icon={<Sparkle className="h-full w-full text-[var(--text-tertiary)]" />}>AI</Tag>
                  <Tag variant="brand" icon={<Star className="h-full w-full text-[var(--color-primary-600)]" weight="fill" />}>Priority</Tag>
                  <Tag variant="brand" icon={<Globe className="h-full w-full text-[var(--color-primary-600)]" />}>Worldwide</Tag>
                </div>
              </div>

              <div className="w-full max-w-[520px] border-t border-[var(--stroke-primary)]" />

              {/* Avatar */}
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[520px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Avatar</p>
                <div className="flex flex-wrap gap-[8px]">
                  {[
                    { initials: "KA", bg: "var(--color-primary-100)", text: "var(--color-primary-700)", label: "Kennedi A." },
                    { initials: "SA", bg: "var(--color-success-100)", text: "var(--color-success-800)", label: "Sara Al." },
                    { initials: "MR", bg: "var(--color-warning-100)", text: "var(--color-warning-800)", label: "Mohammed R." },
                    { initials: "LT", bg: "var(--color-error-100)", text: "var(--color-error-800)", label: "Layla T." },
                  ].map((a) => (
                    <Tag
                      key={a.label}
                      icon={
                        <span
                          className="flex h-full w-full items-center justify-center rounded-full text-[8px] font-bold leading-none"
                          style={{ background: `var(--color-neutral-100)`, color: `var(--text-secondary)` }}
                        >
                          {a.initials}
                        </span>
                      }
                    >
                      {a.label}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-[520px] border-t border-[var(--stroke-primary)]" />

              {/* Country flag */}
              <div className="flex flex-col items-start gap-[8px] w-full max-w-[520px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Country Flag</p>
                <div className="flex flex-wrap gap-[8px]">
                  {[
                    { code: "ae", label: "UAE" },
                    { code: "us", label: "USA" },
                    { code: "gb", label: "UK" },
                    { code: "de", label: "Germany" },
                    { code: "jp", label: "Japan" },
                    { code: "sa", label: "Saudi Arabia" },
                  ].map((c) => (
                    <Tag
                      key={c.label}
                      icon={
                        <img
                          src={`https://hatscripts.github.io/circle-flags/flags/${c.code}.svg`}
                          alt={c.label}
                          className="h-full w-full"
                        />
                      }
                    >
                      {c.label}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </ComponentPreview>
        </section>

        {/* Usage Guidelines */}
        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use tags to label, categorize, or filter sets of related content",
              "Keep tag text concise — ideally 1–3 words",
              "Use the removable (onRemove) pattern when users can add or remove tags",
              "Use status dots to reflect the live state of an associated item",
              "Use the Brand variant sparingly to highlight priority or featured content",
              "Use the XS size in compact layouts like table cells or sidebars",
            ]}
            dontItems={[
              "Don't use tags as primary navigation or action triggers",
              "Don't use more than 5–6 tags in a single row without overflow handling",
              "Don't mix sizes within the same tag group",
              "Don't create custom tag colors outside the defined variant set",
              "Don't use status dots for non-status tags — only use them for live states",
              "Don't use long text or sentences inside a tag",
            ]}
          />
        </section>

        {/* Accessibility */}
        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Accessibility
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "Keyboard Support",
                desc: "The remove button (×) is a native <button> element and is fully keyboard accessible. Tab moves focus to the button, and Enter or Space triggers the onRemove callback.",
              },
              {
                title: "ARIA Labels",
                desc: 'The remove button includes aria-label="Remove" to convey its purpose to screen readers. The × icon is marked aria-hidden="true" since the button label already describes the action.',
              },
              {
                title: "Color & Status",
                desc: "Status dots are supplementary — the tag text always conveys the label. Users with color vision deficiencies can understand the tag without relying on the dot color.",
              },
              {
                title: "Contrast",
                desc: "Both Default and Brand variants meet WCAG 2.1 AA contrast requirements (4.5:1) for text against their background colors in both light and dark modes.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {item.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <PropsTable
            props={[
              {
                name: "variant",
                type: '"default" | "brand"',
                default: '"default"',
                description: "Visual style variant of the tag",
              },
              {
                name: "size",
                type: '"xs" | "sm"',
                default: '"sm"',
                description: "Size of the tag — xs for compact layouts, sm for default use",
              },
              {
                name: "onRemove",
                type: "() => void",
                description: "When provided, renders a dismiss (×) button inside the tag",
              },
              {
                name: "count",
                type: "number",
                description: "Displays a numeric badge inside the tag on the trailing side",
              },
              {
                name: "status",
                type: '"success" | "error" | "warning" | "brand" | "neutral"',
                description: "Displays a colored dot indicator before the tag label",
              },
              {
                name: "icon",
                type: "ReactNode",
                description: "Optional icon or avatar rendered on the leading side of the label",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interactions and applies reduced opacity",
              },
              {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Tag label text",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
