"use client";

import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "libraries", title: "Available Libraries", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

const libraries = [
  {
    title: "GovAI Design Language System",
    description:
      "The foundational library containing all design tokens, color styles, typography, layout grids, and component primitives used across every GovAI product.",
    tag: "Core",
    link: "https://www.figma.com/design/EkHlX5CqU8QaVV1hiPlxcP/AI-Factory-Design-Language-System",
  },
  {
    title: "GovAI Component Library",
    description:
      "Production-ready Figma components for buttons, inputs, tables, navigation, alerts, and every other approved pattern. Enable this library to access all components.",
    tag: "Components",
    link: "https://www.figma.com/design/EkHlX5CqU8QaVV1hiPlxcP/AI-Factory-Design-Language-System?node-id=44-899",
  },
  {
    title: "GovGPT — All Flows",
    description:
      "Approved reference screens for the GovGPT conversational assistant. Use these as canonical examples when designing chat and document-assistance flows.",
    tag: "Product",
    link: "https://www.figma.com/design/PtENLKtr4MsPk0LDgOqMXV/GovGPT--All-Flows",
  },
  {
    title: "HR Recruiting — All Screens",
    description:
      "Approved product screens for the HR Recruiting workflow. Use for reference when designing enterprise workflow tooling built on the GovAI Design System.",
    tag: "Product",
    link: "https://www.figma.com/design/h8OFtTMyyatmkGCKqInX2m/HR-Recruiting---ALL-SCREENS",
  },
];

export default function FigmaFilesPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Figma files
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The official GovAI Figma libraries contain every token, component,
            and pattern used across GovAI products. Enable them in your Figma
            project before starting any design work.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Every Figma library below is a published team library. Designers
            must enable them from Assets → Team Library → GovAI Design System
            before creating new screens. Detaching instances is discouraged —
            update the library instead.
          </p>
        </section>

        <section id="libraries">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Available Libraries
          </h2>
          <div className="mt-3 grid gap-[12px] md:grid-cols-2">
            {libraries.map((lib) => (
              <a
                key={lib.title}
                href={lib.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-[var(--stroke-primary)] p-[24px] transition-colors hover:bg-[var(--surface-tertiary)]"
              >
                <span className="inline-flex w-fit rounded-[999px] bg-[var(--color-primary-50)] px-[8px] py-[2px] text-[12px] font-medium text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]">
                  {lib.tag}
                </span>
                <h3 className="mt-3 text-[16px] font-medium leading-[24px] text-[var(--header-primary)] group-hover:text-[var(--color-primary-600)]">
                  {lib.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-secondary)]">
                  {lib.description}
                </p>
                <span className="mt-4 text-[12px] font-medium text-[var(--color-primary-700)] dark:text-[var(--color-primary-400)]">
                  Open in Figma →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "Enable the libraries",
                body: "Libraries must be enabled at the team level. Do not duplicate components locally — use the canonical library instance so updates propagate automatically.",
              },
              {
                title: "Use styles, not raw values",
                body: "Apply color, text, and effect styles from the library rather than pasting hex values or manually sized text. Styles ensure tokens stay in sync with code.",
              },
              {
                title: "Auto Layout everywhere",
                body: "All frames that might resize (cards, rows, lists) must use Auto Layout so the Figma file matches the responsive behavior of the coded component.",
              },
              {
                title: "Respect versioning",
                body: "Check for library updates at the start of each sprint. Review release notes for breaking changes before accepting updates on in-progress files.",
              },
              {
                title: "Handoff notes",
                body: "When annotating for engineering, reference components by their canonical library name (e.g. Button/Primary/Medium) rather than describing styles.",
              },
            ].map((g) => (
              <div
                key={g.title}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {g.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
