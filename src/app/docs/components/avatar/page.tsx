"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Avatar } from "@/components/ui/avatar";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "sizes", title: "Sizes", level: 3 },
  { id: "variants", title: "Variants", level: 3 },
  { id: "with-image", title: "With Image", level: 3 },
  { id: "initials", title: "With Initials", level: 3 },
  { id: "grouped", title: "Grouped Avatars", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

// ─── Demo components ──────────────────────────────────────────────────────────

const PHOTOS = [
  "https://i.pravatar.cc/150?img=47",
  "https://i.pravatar.cc/150?img=32",
  "https://i.pravatar.cc/150?img=15",
  "https://i.pravatar.cc/150?img=22",
  "https://i.pravatar.cc/150?img=60",
];

function OverviewDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[24px]">
      <Avatar size="lg" src={PHOTOS[0]} alt="Jane Cooper" />
      <Avatar size="lg" src={PHOTOS[1]} alt="Alex Kim" />
      <Avatar size="md" initials="RS" />
      <Avatar size="md" initials="KA" variant="brand" />
      <Avatar size="sm" src={PHOTOS[2]} alt="Sam Torres" />
      <Avatar size="sm" initials="TL" variant="brand" />
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-[48px]">
      {(["sm", "md", "lg"] as const).map((size, i) => (
        <div key={size} className="flex flex-col items-center gap-[12px]">
          <Avatar size={size} src={PHOTOS[i]} alt="User" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">
            {size} — {size === "sm" ? "32" : size === "md" ? "40" : "48"}px
          </span>
        </div>
      ))}
    </div>
  );
}

function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-[48px]">
      <div className="flex flex-col items-center gap-[12px]">
        <Avatar size="md" initials="JD" />
        <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">default</span>
      </div>
      <div className="flex flex-col items-center gap-[12px]">
        <Avatar size="md" initials="JD" variant="brand" />
        <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">brand</span>
      </div>
    </div>
  );
}

function WithImageDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-[48px]">
      {(["sm", "md", "lg"] as const).map((size, i) => (
        <div key={size} className="flex flex-col items-center gap-[12px]">
          <Avatar size={size} src={PHOTOS[i]} alt="User photo" />
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">{size}</span>
        </div>
      ))}
    </div>
  );
}

function InitialsDemo() {
  const pairs: { initials: string; variant: "default" | "brand" }[] = [
    { initials: "AB", variant: "default" },
    { initials: "CD", variant: "default" },
    { initials: "EF", variant: "default" },
    { initials: "GH", variant: "brand" },
    { initials: "IJ", variant: "brand" },
    { initials: "KL", variant: "brand" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-[16px]">
      {pairs.map(({ initials, variant }) => (
        <Avatar key={initials} size="md" initials={initials} variant={variant} />
      ))}
    </div>
  );
}

function GroupedDemo() {
  const overlap: { [key in "sm" | "md" | "lg"]: string } = {
    sm: "-ml-[6px]",
    md: "-ml-[8px]",
    lg: "-ml-[10px]",
  };
  const ring = { boxShadow: "0 0 0 2px var(--surface-default)" };

  return (
    <div className="flex flex-wrap items-center justify-center gap-[48px]">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-[16px]">
          <div className="flex items-center">
            {PHOTOS.slice(0, 4).map((src, i) => (
              <Avatar
                key={src}
                size={size}
                src={src}
                alt={`User ${i + 1}`}
                className={i !== 0 ? overlap[size] : ""}
                style={ring}
              />
            ))}
            <Avatar
              size={size}
              initials="+5"
              className={overlap[size]}
              style={ring}
            />
          </div>
          <span className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">{size}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AvatarPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Avatar
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Avatars are visual identifiers used throughout the design system to represent individual
            users, teams, or entities. They appear as photos, icons, or initials across various sizes
            and styles, and support grouping with overflow count indicators.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Avatars support photo, initials, and brand variants across three sizes."
            code={`import { Avatar } from "@/components/ui/avatar";

<Avatar size="lg" src="/photo.jpg" alt="Jane Cooper" />
<Avatar size="md" initials="RS" />
<Avatar size="md" initials="KA" variant="brand" />
<Avatar size="sm" src="/photo.jpg" alt="Sam Torres" />`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        {/* Sizes */}
        <section id="sizes" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Sizes
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Three sizes are available — sm (32px), md (40px, default), and lg (48px). Choose the size
            that fits the surrounding context: sm for compact lists, lg for profile headers.
          </p>

          <div id="sizes">
            <ComponentPreview
              heading="Sizes"
              description="All three sizes shown with image avatars."
              code={`<Avatar size="sm" src="/photo.jpg" alt="User" />
<Avatar size="md" src="/photo.jpg" alt="User" />
<Avatar size="lg" src="/photo.jpg" alt="User" />`}
            >
              <SizesDemo />
            </ComponentPreview>
          </div>

          {/* Variants */}
          <div id="variants">
            <ComponentPreview
              heading="Variants"
              description="The default variant uses a neutral surface. The brand variant uses the primary/100 background with primary/700 text — use it to highlight key contacts or user roles."
              code={`<Avatar size="md" initials="JD" />
<Avatar size="md" initials="JD" variant="brand" />`}
            >
              <VariantsDemo />
            </ComponentPreview>
          </div>

          {/* With Image */}
          <div id="with-image">
            <ComponentPreview
              heading="With Image"
              description="Pass src and alt to display a photo. If the image fails to load, the component falls back to the initials or a blank placeholder."
              code={`<Avatar size="sm" src="/photo.jpg" alt="User photo" />
<Avatar size="md" src="/photo.jpg" alt="User photo" />
<Avatar size="lg" src="/photo.jpg" alt="User photo" />`}
            >
              <WithImageDemo />
            </ComponentPreview>
          </div>

          {/* With Initials */}
          <div id="initials">
            <ComponentPreview
              heading="With Initials"
              description="Pass initials to display a monogram. Keep to two characters maximum. Use the brand variant to visually differentiate user roles or teams."
              code={`<Avatar size="md" initials="AB" />
<Avatar size="md" initials="CD" />
<Avatar size="md" initials="GH" variant="brand" />
<Avatar size="md" initials="IJ" variant="brand" />`}
            >
              <InitialsDemo />
            </ComponentPreview>
          </div>
        </section>

        {/* Grouped Avatars */}
        <section id="grouped" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Grouped Avatars
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Stack avatars with negative left margin and a surface ring to show collaborative contexts
            such as shared documents or team lists. Use a final initials avatar (e.g. +5) to indicate
            overflow.
          </p>
          <ComponentPreview
            heading="Grouped"
            description="Overlap using negative margin and a 2px surface ring. Overflow count uses a default-variant initials avatar."
            code={`<div className="flex items-center">
  <Avatar size="md" src="/photo.jpg" alt="User 1" style={{ boxShadow: "0 0 0 2px var(--surface-default)" }} />
  <Avatar size="md" src="/photo.jpg" alt="User 2" className="-ml-[8px]" style={{ boxShadow: "0 0 0 2px var(--surface-default)" }} />
  <Avatar size="md" src="/photo.jpg" alt="User 3" className="-ml-[8px]" style={{ boxShadow: "0 0 0 2px var(--surface-default)" }} />
  <Avatar size="md" initials="+5" className="-ml-[8px]" style={{ boxShadow: "0 0 0 2px var(--surface-default)" }} />
</div>`}
          >
            <GroupedDemo />
          </ComponentPreview>
        </section>

        {/* Usage Guidelines */}
        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use photo avatars when the user has uploaded a profile picture",
              "Fall back to initials when no photo is available — keep initials to two characters",
              "Use the brand variant to highlight key users, team leads, or selected contacts",
              "Use the sm size in dense lists, tables, and compact navigation items",
              "Always provide a descriptive alt text for image avatars to support screen readers",
              "Use grouped avatars with an overflow count (+N) when showing more than 4–5 team members",
            ]}
            dontItems={[
              "Don't use more than two characters for initials — it breaks the circular layout",
              "Don't rely on avatar color alone to convey meaning — combine with labels or tooltips",
              "Don't mix sizes within the same grouping — keep all stacked avatars the same size",
              "Don't use the brand variant as a default state — reserve it for meaningful differentiation",
              "Don't leave the alt prop empty on image avatars — always describe the person depicted",
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
                title: "Alt text for images",
                desc: "Always supply a descriptive alt prop when using src. If the avatar is purely decorative (e.g. a repeated icon), pass alt=\"\" to hide it from assistive technology.",
              },
              {
                title: "Initials fallback",
                desc: "When rendering initials, ensure the outer element has an aria-label matching the full name so screen readers announce the person correctly instead of spelling out the abbreviation.",
              },
              {
                title: "Color contrast",
                desc: "The default variant text (#3B3B3C) on the surface-alt-tertiary background (#EAEAEA) meets WCAG 2.1 AA contrast (5.7:1). The brand variant primary/700 (#1D58D8) on primary/100 (#DBE6FE) also meets AA (4.6:1).",
              },
              {
                title: "Focus management",
                desc: "Avatars are non-interactive by default. If used as a button or link trigger (e.g. to open a profile), wrap them in a <button> or <a> element and ensure a visible focus ring is present.",
              },
              {
                title: "Grouped avatars",
                desc: "In grouped stacks, each Avatar should retain its individual alt text. The overflow count avatar (e.g. +5) should have an aria-label such as \"5 more members\" for clarity.",
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

        {/* API Reference */}
        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <div className="mt-[12px]">
            <PropsTable
              props={[
                {
                  name: "size",
                  type: '"sm" | "md" | "lg"',
                  default: '"md"',
                  description: "Avatar diameter — sm 32px, md 40px, lg 48px",
                },
                {
                  name: "variant",
                  type: '"default" | "brand"',
                  default: '"default"',
                  description: "Surface colour — default uses neutral surface, brand uses primary/100",
                },
                {
                  name: "src",
                  type: "string",
                  description: "URL of the avatar photo. Falls back to initials if the image fails to load",
                },
                {
                  name: "alt",
                  type: "string",
                  description: "Accessible description of the image. Required when src is provided",
                },
                {
                  name: "initials",
                  type: "string",
                  description: "One or two characters shown when no image is available",
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional CSS classes merged onto the root element",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
