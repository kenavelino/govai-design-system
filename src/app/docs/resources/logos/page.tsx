"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { Logo } from "@/components/docs/logo";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "variants", title: "Logo Variants", level: 2 },
  { id: "clear-space", title: "Clear Space & Sizing", level: 2 },
  { id: "misuse", title: "Misuse", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

function LogoMark({
  variant,
  size = 48,
}: {
  variant: "primary" | "inverted" | "mono-light" | "mono-dark";
  size?: number;
}) {
  const color =
    variant === "primary"
      ? "var(--color-primary-600)"
      : variant === "inverted"
      ? "#FFFFFF"
      : variant === "mono-light"
      ? "#101010"
      : "#FFFFFF";
  return <Logo size={size} color={color} />;
}

export default function LogosPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Logos
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI logo is the primary identifier of GovAI products. These
            guidelines cover approved variants, clear space, sizing, and
            prohibited uses.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI logo system consists of a primary brand mark, an inverted
            version for light backgrounds, and monochromatic variants for
            single-color applications. Always use the approved files from the
            asset library — do not recreate or modify the mark.
          </p>
        </section>

        <section id="variants">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Logo Variants
          </h2>
          <div className="mt-3 grid gap-[12px] sm:grid-cols-2">
            {[
              {
                label: "Primary",
                variant: "primary" as const,
                bg: "bg-[var(--surface-default)]",
                use: "Default brand application on neutral or light backgrounds.",
              },
              {
                label: "Inverted",
                variant: "inverted" as const,
                bg: "bg-[var(--color-primary-600)]",
                use: "Use on brand-blue backgrounds or marketing hero sections.",
              },
              {
                label: "Mono (Light)",
                variant: "mono-light" as const,
                bg: "bg-[var(--surface-tertiary)]",
                use: "Black mark on white — use for print, single-color documents.",
              },
              {
                label: "Mono (Dark)",
                variant: "mono-dark" as const,
                bg: "bg-white",
                use: "White mark on black — use for dark surfaces and video.",
              },
            ].map((v) => (
              <div
                key={v.label}
                className="overflow-hidden rounded-xl border border-[var(--stroke-primary)]"
              >
                <div
                  className={`flex h-[160px] items-center justify-center ${v.bg}`}
                >
                  <LogoMark variant={v.variant} size={64} />
                </div>
                <div className="border-t border-[var(--stroke-primary)] p-4">
                  <h4 className="text-[14px] font-medium text-[var(--header-primary)]">
                    {v.label}
                  </h4>
                  <p className="mt-1 text-[12px] leading-[20px] text-[var(--text-tertiary)]">
                    {v.use}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="clear-space">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Clear Space & Sizing
          </h2>
          <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-secondary)]">
            Always maintain minimum clear space equal to 1x the height of the
            logo mark on all sides. Do not reduce the logo below the minimum
            display size.
          </p>
          <div className="mt-5 grid gap-[12px] md:grid-cols-2">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[14px] font-medium text-[var(--header-primary)]">
                Clear space
              </h4>
              <div className="mt-4 flex justify-center rounded-lg bg-[var(--surface-tertiary)] p-[48px]">
                <div className="relative">
                  <div className="absolute -inset-[48px] rounded-xl border border-dashed border-[var(--color-primary-400)]" />
                  <LogoMark variant="primary" size={48} />
                </div>
              </div>
              <p className="mt-3 text-[12px] text-[var(--text-tertiary)]">
                Minimum clear space = 1x logo height (48px here).
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[14px] font-medium text-[var(--header-primary)]">
                Minimum sizes
              </h4>
              <div className="mt-4 flex flex-col gap-[12px]">
                {[
                  { label: "Digital minimum", size: 24, note: "24px — UI chrome" },
                  { label: "Print minimum", size: 32, note: "32px — documents" },
                  { label: "Marketing hero", size: 64, note: "64px+ for marketing" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-[12px]">
                    <LogoMark variant="primary" size={m.size} />
                    <div>
                      <p className="text-[12px] font-medium text-[var(--header-primary)]">
                        {m.label}
                      </p>
                      <p className="text-[12px] text-[var(--text-tertiary)]">
                        {m.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="misuse">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Misuse
          </h2>
          <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-secondary)]">
            Never alter the GovAI logo. The following modifications are
            prohibited.
          </p>
          <div className="mt-5 grid gap-[12px] sm:grid-cols-2 md:grid-cols-3">
            {[
              { label: "Do not rotate", transform: "rotate(-12deg)" },
              { label: "Do not stretch", transform: "scaleX(1.6)" },
              { label: "Do not recolor", variant: "mono-light" as const },
              { label: "Do not add effects", effect: true },
              {
                label: "Do not place on low-contrast backgrounds",
                lowContrast: true,
              },
              { label: "Do not reconstruct", recreate: true },
            ].map((m, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-[var(--stroke-primary)]"
              >
                <div
                  className={`flex h-[120px] items-center justify-center ${
                    m.lowContrast
                      ? "bg-[var(--color-primary-500)]"
                      : "bg-[var(--surface-tertiary)]"
                  }`}
                >
                  <div
                    style={{
                      transform: m.transform,
                      filter: m.effect
                        ? "drop-shadow(0 0 12px rgba(36,99,235,0.8))"
                        : undefined,
                      opacity: m.lowContrast ? 0.9 : 1,
                    }}
                  >
                    {m.recreate ? (
                      <div className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-xl bg-[var(--color-primary-600)] font-semibold text-white">
                        g
                      </div>
                    ) : (
                      <LogoMark variant={m.variant ?? "primary"} size={48} />
                    )}
                  </div>
                </div>
                <div className="border-t border-[var(--stroke-primary)] p-3">
                  <p className="text-[12px] font-medium text-[var(--color-error-800)] dark:text-[var(--color-error-400)]">
                    ✕ {m.label}
                  </p>
                </div>
              </div>
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
                title: "Use approved files only",
                body: "Download logo assets from the official GovAI brand library. Never screenshot or recreate the logo from scratch.",
              },
              {
                title: "Contrast with the background",
                body: "Ensure the chosen logo variant meets contrast requirements against its background. Use the dark mono variant on dark surfaces.",
              },
              {
                title: "Co-branding",
                body: "When co-branding with government agencies, follow the co-branding template in the Figma asset library — do not combine logos ad hoc.",
              },
              {
                title: "File formats",
                body: "Use SVG for web and Figma. Use PNG at 2x for email and external platforms that do not support SVG. Provide transparent backgrounds.",
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
