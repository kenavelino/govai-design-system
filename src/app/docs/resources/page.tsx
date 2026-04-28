"use client";

import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "figma-design-library", title: "Figma Design Library", level: 2 },
  { id: "design-tokens", title: "Design Tokens", level: 2 },
  { id: "icon-system", title: "Icon System", level: 2 },
  { id: "illustration-guidelines", title: "Illustration Guidelines", level: 2 },
  { id: "brand-guidelines", title: "Brand Guidelines", level: 2 },
];

function ResourceCard({
  title,
  description,
  guidance,
  linkLabel,
  linkHref,
}: {
  title: string;
  description: string;
  guidance: string[];
  linkLabel?: string;
  linkHref?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
      <div className="flex items-start justify-between gap-[12px]">
        <div>
          <h3 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
            {title}
          </h3>
          <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-secondary)]">
            {description}
          </p>
        </div>
        {linkLabel && linkHref && (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-[var(--stroke-primary)] bg-[var(--color-primary-50)] px-4 py-2 text-[14px] font-medium leading-[20px] text-[var(--color-primary-700)] transition-colors hover:bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)] dark:hover:bg-[var(--color-primary-900)]"
          >
            {linkLabel}
          </a>
        )}
      </div>

      <div className="mt-5 border-t border-[var(--stroke-primary)] pt-5">
        <h4 className="text-[14px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Guidelines
        </h4>
        <ul className="mt-3 list-disc space-y-2 pl-[20px] text-[14px] leading-[20px] text-[var(--text-tertiary)] marker:text-[var(--text-tertiary)]">
          {guidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <OnThisPage items={tocItems} />

      <div className="space-y-[24px]">
        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Resources
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Design resources, tools, and guidelines to help designers and
            developers build consistent GovAI experiences. Download assets,
            reference documentation, and follow brand standards.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System provides a comprehensive set of resources to
            streamline your workflow. From Figma libraries to icon sets and
            brand assets, everything you need is organized and accessible.
          </p>
          <div className="mt-5 grid gap-[12px] md:grid-cols-3">
            {[
              {
                title: "For Designers",
                desc: "Figma libraries, design tokens, illustration guidelines, and brand assets for creating pixel-perfect designs.",
              },
              {
                title: "For Developers",
                desc: "Component packages, token exports, icon imports, and code-level documentation for implementation.",
              },
              {
                title: "For Everyone",
                desc: "Brand guidelines, writing style guides, and accessibility standards that apply across all disciplines.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {item.title}
                </h4>
                <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Figma Design Library */}
        <section id="figma-design-library">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Figma Design Library
          </h2>
          <ResourceCard
            title="GovAI Figma Component Library"
            description="The official Figma library contains all GovAI components, design tokens, color styles, typography styles, and layout templates. It is the single source of truth for design work across all GovAI products."
            linkLabel="Open in Figma"
            linkHref="#"
            guidance={[
              "Enable the library in your Figma project via Assets > Team Library > GovAI Design System.",
              "Use components from the library instead of creating custom elements. Detaching instances is discouraged.",
              "Color and typography styles are pre-configured — apply them from the Figma styles panel rather than using hardcoded values.",
              "Check for library updates regularly. The library is versioned, and updates include new components, bug fixes, and token changes.",
              "Use Auto Layout for all frames to ensure responsive behavior matches the coded implementation.",
            ]}
          />
        </section>

        {/* Design Tokens */}
        <section id="design-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Design Tokens
          </h2>
          <ResourceCard
            title="Design Token Reference"
            description="Design tokens are the atomic values (colors, spacing, typography, shadows, radii) that power the GovAI Design System. They bridge design and development by providing a shared vocabulary for all styling decisions."
            linkLabel="View Tokens"
            linkHref="/docs/tokens"
            guidance={[
              "Always reference tokens by their semantic name (e.g., text/primary) rather than raw values (e.g., #0A0A0B).",
              "Tokens are available as CSS custom properties (var(--text-primary)), Tailwind classes, and JavaScript imports.",
              "Semantic tokens automatically adapt to light and dark mode — never hardcode color values.",
              "When extending the system, propose new tokens through a design review before adding them to the codebase.",
              "Refer to the Tokens page for the full token inventory, naming conventions, and usage examples.",
            ]}
          />
        </section>

        {/* Icon System */}
        <section id="icon-system">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Icon System
          </h2>
          <ResourceCard
            title="Lucide Icons"
            description="GovAI uses Lucide as its icon system. Lucide provides a comprehensive library of over 1,000 open-source icons with a clean, consistent stroke style that aligns with the GovAI design language."
            linkLabel="Browse Icons"
            linkHref="https://lucide.dev/icons"
            guidance={[
              "Import icons from the lucide-react package: import { Search, Settings, User } from 'lucide-react'.",
              "Use a consistent stroke width of 1.5px (the default) across all icons. Do not modify stroke width per instance.",
              "Standard icon sizes: 16px for inline/small contexts, 20px for buttons and nav items, 24px for page-level actions.",
              "Icons should always be paired with text labels for accessibility. For icon-only buttons, add an aria-label attribute.",
              "Use semantic color tokens for icon colors — var(--text-secondary) for default icons, var(--color-primary-600) for active states.",
              "Do not mix icon libraries. If Lucide does not have the icon you need, request an addition through the design team.",
            ]}
          />
        </section>

        {/* Illustration Guidelines */}
        <section id="illustration-guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Illustration Guidelines
          </h2>
          <ResourceCard
            title="Illustration Style Guide"
            description="Illustrations in GovAI products are used for empty states, onboarding flows, error pages, and marketing materials. They follow a specific style to maintain visual consistency across the ecosystem."
            guidance={[
              "Use a flat, geometric illustration style with limited color palette drawn from GovAI brand colors (primary, neutral, accent).",
              "Illustrations should convey a single concept clearly. Avoid overly detailed or complex scenes.",
              "Maintain consistent proportions: spot illustrations at 120-200px, hero illustrations at 320-480px wide.",
              "All illustrations must include meaningful alt text for screen reader users.",
              "Do not use photographic images as substitutes for illustrations within the product UI.",
              "New illustrations should be submitted to the design team for review to ensure style consistency.",
              "Export illustrations as SVG for web use. Provide 2x PNG fallbacks for email and external contexts.",
            ]}
          />
        </section>

        {/* Brand Guidelines */}
        <section id="brand-guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Brand Guidelines
          </h2>
          <ResourceCard
            title="GovAI Brand Standards"
            description="The GovAI brand represents trust, innovation, and clarity in government AI. These guidelines ensure consistent brand expression across all touchpoints — from product interfaces to external communications."
            guidance={[
              "The GovAI logo should always appear with adequate clear space (minimum 1x the height of the logo mark on all sides).",
              "Primary brand color is Blue 600 (#2463EB). Use it for primary actions, links, and key brand moments. Do not overuse it.",
              "The primary typeface is Instrument Sans. Use it for all UI text, headings, and body copy. Do not substitute alternative fonts.",
              "Tone of voice should be professional, clear, and helpful. Avoid jargon, overly technical language, or casual slang.",
              "When using the logo on dark backgrounds, switch to the white/light variant. Never place the dark logo on a dark background.",
              "Do not modify, rotate, stretch, or add effects to the GovAI logo. Always use the approved logo files from the asset library.",
              "Co-branding with government agencies should follow the co-branding template available in the Figma library.",
            ]}
          />
        </section>
      </div>
    </>
  );
}
