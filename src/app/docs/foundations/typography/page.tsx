"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const tocItems = [
  { id: "font-family", title: "Font Family", level: 2 },
  { id: "type-scale", title: "Type Scale", level: 2 },
  { id: "display", title: "Display", level: 3 },
  { id: "heading", title: "Heading", level: 3 },
  { id: "body", title: "Body", level: 3 },
  { id: "label", title: "Label", level: 3 },
  { id: "button-text", title: "Button Text", level: 3 },
  { id: "note", title: "Note", level: 3 },
  { id: "examples", title: "Article example", level: 2 },
  { id: "weights", title: "Font Weights", level: 2 },
  { id: "guidelines", title: "Usage Guidelines", level: 2 },
];

interface TypeSample {
  category: string;
  weight: "Regular" | "Medium" | "SemiBold";
  size: string;
  lineHeight: string;
  letterSpacing: string;
  case: "Sentence" | "All caps";
}

const WEIGHT_TO_NUMBER: Record<TypeSample["weight"], number> = {
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
};

function TypeScaleTable({ samples }: { samples: TypeSample[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Scale Category</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Weight</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Size</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Case</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Letter spacing</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((s, idx) => (
            <tr
              key={`${s.category}-${s.weight}-${idx}`}
              className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--color-neutral-100)]"
            >
              <td className="px-[16px] py-[16px] align-middle">
                <span
                  className="block text-[var(--header-primary)]"
                  style={{
                    fontSize: s.size,
                    fontWeight: WEIGHT_TO_NUMBER[s.weight],
                    lineHeight: s.lineHeight,
                    letterSpacing: s.letterSpacing,
                  }}
                >
                  {s.category}
                </span>
              </td>
              <td className="px-[16px] py-[16px] align-middle leading-[20px] text-[var(--header-secondary)]">{s.weight}</td>
              <td className="px-[16px] py-[16px] align-middle leading-[20px] text-[var(--header-secondary)]">{s.size}</td>
              <td className="px-[16px] py-[16px] align-middle leading-[20px] text-[var(--header-secondary)]">{s.case}</td>
              <td className="px-[16px] py-[16px] align-middle leading-[20px] text-[var(--header-secondary)]">{s.letterSpacing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Typography
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI type system uses Instrument Sans across all products. The scale is designed for clarity in data-heavy dashboards and AI interfaces.
          </p>
        </div>

        <section id="font-family">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Font Family</h2>
          <div className="mt-3 rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px]">
            <p className="text-[48px] font-medium leading-[55px] text-[var(--header-primary)]">
              Instrument Sans
            </p>
            <p className="mt-3 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
              A clean, geometric sans-serif designed for digital interfaces. Available in Regular (400), Medium (500), and SemiBold (600) weights.
            </p>
            <div className="mt-5 flex gap-[12px] text-[var(--text-secondary)]">
              <span className="text-[20px]" style={{ fontWeight: 400 }}>Regular</span>
              <span className="text-[20px]" style={{ fontWeight: 500 }}>Medium</span>
              <span className="text-[20px]" style={{ fontWeight: 600 }}>SemiBold</span>
            </div>
          </div>
        </section>

        <section id="type-scale">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Type Scale</h2>

          <div className="mt-3 flex flex-col gap-[24px]">
            {([
              {
                id: "display",
                title: "Display",
                description: "Used for hero sections and major page headings.",
                samples: [
                  { category: "Display 64", weight: "Medium", size: "64px", lineHeight: "74px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 64", weight: "Regular", size: "64px", lineHeight: "74px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 56", weight: "Medium", size: "56px", lineHeight: "64px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 56", weight: "Regular", size: "56px", lineHeight: "64px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 52", weight: "Medium", size: "52px", lineHeight: "59px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 52", weight: "Regular", size: "52px", lineHeight: "59px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 48", weight: "Medium", size: "48px", lineHeight: "55px", letterSpacing: "-2%", case: "Sentence" },
                  { category: "Display 48", weight: "Regular", size: "48px", lineHeight: "55px", letterSpacing: "-2%", case: "Sentence" },
                ],
              },
              {
                id: "heading",
                title: "Heading",
                description: "Used for section headings and content organization.",
                samples: [
                  { category: "Heading 44", weight: "Medium", size: "44px", lineHeight: "54px", letterSpacing: "-1%", case: "Sentence" },
                  { category: "Heading 44", weight: "Regular", size: "44px", lineHeight: "54px", letterSpacing: "-1%", case: "Sentence" },
                  { category: "Heading 40", weight: "Medium", size: "40px", lineHeight: "48px", letterSpacing: "-1%", case: "Sentence" },
                  { category: "Heading 40", weight: "Regular", size: "40px", lineHeight: "48px", letterSpacing: "-1%", case: "Sentence" },
                  { category: "Heading 32", weight: "Medium", size: "32px", lineHeight: "40px", letterSpacing: "-0.5%", case: "Sentence" },
                  { category: "Heading 32", weight: "Regular", size: "32px", lineHeight: "40px", letterSpacing: "-0.5%", case: "Sentence" },
                  { category: "Heading 24", weight: "Medium", size: "24px", lineHeight: "32px", letterSpacing: "0", case: "Sentence" },
                  { category: "Heading 24", weight: "Regular", size: "24px", lineHeight: "32px", letterSpacing: "0", case: "Sentence" },
                  { category: "Heading 20", weight: "Medium", size: "20px", lineHeight: "28px", letterSpacing: "0", case: "Sentence" },
                  { category: "Heading 20", weight: "Regular", size: "20px", lineHeight: "28px", letterSpacing: "0", case: "Sentence" },
                ],
              },
              {
                id: "body",
                title: "Body",
                description: "Used for paragraphs, descriptions, and general content.",
                samples: [
                  { category: "Body 18", weight: "SemiBold", size: "18px", lineHeight: "28px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 18", weight: "Regular", size: "18px", lineHeight: "28px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 16", weight: "SemiBold", size: "16px", lineHeight: "24px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 16", weight: "Regular", size: "16px", lineHeight: "24px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 14", weight: "SemiBold", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 14", weight: "Regular", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 12", weight: "SemiBold", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                  { category: "Body 12", weight: "Regular", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                ],
              },
              {
                id: "label",
                title: "Label",
                description: "Used for form labels and UI controls.",
                samples: [
                  { category: "Label 16", weight: "Medium", size: "16px", lineHeight: "24px", letterSpacing: "0", case: "Sentence" },
                  { category: "Label 14", weight: "Medium", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Label 12", weight: "Medium", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                ],
              },
              {
                id: "button-text",
                title: "Button Text",
                description: "Used for buttons and inline hyperlinks.",
                samples: [
                  { category: "Button 16", weight: "Medium", size: "16px", lineHeight: "24px", letterSpacing: "0", case: "Sentence" },
                  { category: "Button 14", weight: "Medium", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Button 12", weight: "Medium", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                  { category: "Hyperlink 16", weight: "Regular", size: "16px", lineHeight: "24px", letterSpacing: "0", case: "Sentence" },
                  { category: "Hyperlink 14", weight: "Regular", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Hyperlink 12", weight: "Regular", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                ],
              },
              {
                id: "note",
                title: "Note",
                description: "Used for helper text, captions, and supporting copy.",
                samples: [
                  { category: "Note 14", weight: "SemiBold", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Note 14", weight: "Regular", size: "14px", lineHeight: "20px", letterSpacing: "0", case: "Sentence" },
                  { category: "Note 12", weight: "SemiBold", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                  { category: "Note 12", weight: "Regular", size: "12px", lineHeight: "16px", letterSpacing: "0", case: "Sentence" },
                ],
              },
            ] as { id: string; title: string; description: string; samples: TypeSample[] }[]).map((group) => (
              <div key={group.id} id={group.id}>
                <h3 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{group.title}</h3>
                <p className="mt-1 mb-3 text-[14px] leading-[20px] text-[var(--text-tertiary)]">{group.description}</p>
                <TypeScaleTable samples={group.samples} />
              </div>
            ))}
          </div>
        </section>

        <section id="examples">
          <ComponentPreview
            heading="Article example"
            code={`<article className="mx-auto max-w-[720px]">
  <header>
    {/* Eyebrow — Label 12 Medium */}
    <span className="block text-[12px] font-medium leading-[16px] uppercase tracking-[0.08em] text-[var(--color-primary-600)]">Design</span>

    {/* Title — Display 48 */}
    <h1 className="mt-[12px] text-[48px] font-medium leading-[55px] tracking-[-0.02em] text-[var(--header-primary)]">
      Designing for the next generation of government AI
    </h1>

    {/* Deck — Heading 44 */}
    <h2 className="mt-[16px] text-[44px] font-semibold leading-[54px] tracking-[-0.01em] text-[var(--header-primary)]">
      A foundations primer
    </h2>

    {/* Lead — Body 18 Regular */}
    <p className="mt-[20px] text-[18px] leading-[28px] text-[var(--text-secondary)]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>

    {/* Byline — Body 14 SemiBold + Body 14 Regular + Label 14 Medium */}
    <div className="mt-[24px] flex items-center gap-[12px]">
      <Avatar size="md" initials="OR" />
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Olivia Rhye</span>
        <span className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">Product Designer</span>
      </div>
      <span className="ml-auto text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]">Apr 19, 2026 · 8 min read</span>
    </div>
  </header>

  <hr className="my-[40px] border-t border-[var(--stroke-primary)]" />

  {/* Stats — Display 64 / 56 / 52 + Label 16 Medium */}
  <section className="grid grid-cols-3 gap-[24px]">
    <div>
      <p className="text-[64px] font-medium leading-[74px] tracking-[-0.02em] text-[var(--header-primary)]">92%</p>
      <span className="mt-[4px] block text-[16px] font-medium leading-[24px] text-[var(--text-secondary)]">report gains</span>
    </div>
    <div>
      <p className="text-[56px] font-medium leading-[64px] tracking-[-0.02em] text-[var(--header-primary)]">4.2×</p>
      <span className="mt-[4px] block text-[16px] font-medium leading-[24px] text-[var(--text-secondary)]">faster reviews</span>
    </div>
    <div>
      <p className="text-[52px] font-medium leading-[59px] tracking-[-0.02em] text-[var(--header-primary)]">180</p>
      <span className="mt-[4px] block text-[16px] font-medium leading-[24px] text-[var(--text-secondary)]">agencies live</span>
    </div>
  </section>

  <hr className="my-[40px] border-t border-[var(--stroke-primary)]" />

  {/* Part — Heading 40 */}
  <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.01em] text-[var(--header-primary)]">
    Part one — The foundations
  </h2>

  {/* Heading 32 */}
  <h3 className="mt-[24px] text-[32px] font-semibold leading-[40px] tracking-[-0.005em] text-[var(--header-primary)]">Introduction</h3>

  {/* Body 16 Regular with inline SemiBold / Medium / link */}
  <p className="mt-[16px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
    Mi tincidunt elit, id quisque ligula ac diam, amet.{" "}
    <span className="font-semibold text-[var(--header-primary)]">Accessibility is a baseline, not a feature</span>
    {" "}— every token flows from that premise. Read{" "}
    <span className="font-medium text-[var(--header-primary)]">the full rationale</span>{" "}
    or jump to our{" "}
    <a href="#" className="font-medium text-[var(--color-primary-600)] underline underline-offset-2 hover:text-[var(--color-primary-700)]">foundations guide</a>.
  </p>

  {/* Blockquote — 24px italic + byline */}
  <figure className="my-[40px] py-[16px]">
    <blockquote className="text-center text-[24px] font-medium italic leading-[32px] text-[var(--header-primary)]">
      &ldquo;In a world older and more complete than ours they move finished and complete.&rdquo;
    </blockquote>
    <figcaption className="mt-[24px] flex flex-col items-center">
      <Avatar size="md" initials="OR" />
      <span className="mt-[8px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Olivia Rhye</span>
      <span className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">Product Designer</span>
    </figcaption>
  </figure>

  {/* Part two — Heading 40 */}
  <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.01em] text-[var(--header-primary)]">
    Part two — In practice
  </h2>

  {/* Heading 24 */}
  <h3 className="mt-[24px] text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">How the system scales</h3>
  <p className="mt-[16px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
    Dolor enim eu tortor urna sed duis nulla.
  </p>

  {/* Heading 20 */}
  <h4 className="mt-[32px] text-[20px] font-semibold leading-[28px] text-[var(--header-primary)]">Foundations</h4>
  <p className="mt-[16px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
    Ipsum sit mattis nulla quam nulla.
  </p>

  {/* Heading 18 */}
  <h5 className="mt-[32px] text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility notes</h5>
  {/* Body 14 SemiBold */}
  <p className="mt-[12px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Always test with real assistive tools.</p>
  {/* Body 14 Regular */}
  <p className="mt-[8px] text-[14px] leading-[20px] text-[var(--text-secondary)]">
    Screen-reader audits surface failures that visual review misses.
  </p>

  {/* Tags — Label 12 Medium */}
  <div className="mt-[40px] flex flex-wrap items-center gap-[8px]">
    <span className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">Tags:</span>
    <span className="rounded-[6px] bg-[var(--surface-tertiary)] px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">Design</span>
    <span className="rounded-[6px] bg-[var(--surface-tertiary)] px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">Tokens</span>
  </div>

  {/* CTAs — Button component, size="md" (Button 14 Medium) */}
  <div className="mt-[24px] flex flex-wrap items-center gap-[12px]">
    <Button variant="primary" size="md">Get started</Button>
    <Button variant="secondary" size="md">Learn more</Button>
  </div>

  {/* Caption — Body 12 Regular */}
  <p className="mt-[32px] text-[12px] leading-[16px] text-[var(--text-tertiary)]">Figure 1 — Token hierarchy across display, heading, body, and label tiers.</p>
</article>`}
            >
              <article className="mx-auto w-full max-w-[720px] text-left">
                <header>
                  <span className="block text-[12px] font-medium leading-[16px] uppercase tracking-[0.08em] text-[var(--color-primary-600)]">Design</span>
                  <h1 className="mt-[12px] text-[48px] font-medium leading-[55px] tracking-[-0.02em] text-[var(--header-primary)]">
                    Designing for the next generation of government AI
                  </h1>
                  <h2 className="mt-[16px] text-[44px] font-semibold leading-[54px] tracking-[-0.01em] text-[var(--header-primary)]">
                    A foundations primer
                  </h2>
                  <p className="mt-[20px] text-[18px] leading-[28px] text-[var(--text-secondary)]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa.
                  </p>
                  <div className="mt-[24px] flex items-center gap-[12px]">
                    <Avatar size="md" initials="OR" />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Olivia Rhye</span>
                      <span className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">Product Designer</span>
                    </div>
                    <span className="ml-auto text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]">Apr 19, 2026 · 8 min read</span>
                  </div>
                </header>

                <hr className="my-[40px] border-t border-[var(--stroke-primary)]" />

                <section className="grid grid-cols-3 gap-[24px]">
                  <div>
                    <p className="text-[64px] font-medium leading-[74px] tracking-[-0.02em] text-[var(--header-primary)]">92%</p>
                    <span className="mt-[4px] block text-[16px] font-medium leading-[24px] text-[var(--text-secondary)]">report gains</span>
                  </div>
                  <div>
                    <p className="text-[56px] font-medium leading-[64px] tracking-[-0.02em] text-[var(--header-primary)]">4.2×</p>
                    <span className="mt-[4px] block text-[16px] font-medium leading-[24px] text-[var(--text-secondary)]">faster reviews</span>
                  </div>
                  <div>
                    <p className="text-[52px] font-medium leading-[59px] tracking-[-0.02em] text-[var(--header-primary)]">180</p>
                    <span className="mt-[4px] block text-[16px] font-medium leading-[24px] text-[var(--text-secondary)]">agencies live</span>
                  </div>
                </section>

                <hr className="my-[40px] border-t border-[var(--stroke-primary)]" />

                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.01em] text-[var(--header-primary)]">
                  Part one — The foundations
                </h2>

                <h3 className="mt-[24px] text-[32px] font-semibold leading-[40px] tracking-[-0.005em] text-[var(--header-primary)]">Introduction</h3>
                <p className="mt-[16px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                  Mi tincidunt elit, id quisque ligula ac diam, amet.{" "}
                  <span className="text-[16px] font-semibold text-[var(--header-primary)]">Accessibility is a baseline, not a feature</span>
                  {" "}— every token flows from that premise. Read{" "}
                  <span className="text-[16px] font-medium text-[var(--header-primary)]">the full rationale</span>{" "}
                  or jump to our{" "}
                  <a href="#" className="font-medium text-[var(--color-primary-600)] underline underline-offset-2 hover:text-[var(--color-primary-700)]">foundations guide</a>.
                </p>

                <figure className="my-[40px] py-[16px]">
                  <blockquote className="text-center text-[24px] font-medium italic leading-[32px] text-[var(--header-primary)]">
                    &ldquo;In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained.&rdquo;
                  </blockquote>
                  <figcaption className="mt-[24px] flex flex-col items-center gap-[4px]">
                    <Avatar size="md" initials="OR" />
                    <span className="mt-[8px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Olivia Rhye</span>
                    <span className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">Product Designer</span>
                  </figcaption>
                </figure>

                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.01em] text-[var(--header-primary)]">
                  Part two — In practice
                </h2>

                <h3 className="mt-[24px] text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">How the system scales</h3>
                <p className="mt-[16px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                  Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae.
                </p>

                <h4 className="mt-[32px] text-[20px] font-semibold leading-[28px] text-[var(--header-primary)]">Foundations</h4>
                <p className="mt-[16px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                  Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.
                </p>

                <h5 className="mt-[32px] text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility notes</h5>
                <p className="mt-[12px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Always test with real assistive tools.</p>
                <p className="mt-[8px] text-[14px] leading-[20px] text-[var(--text-secondary)]">
                  Screen-reader audits and keyboard traces surface failures that visual review misses.
                </p>

                <div className="mt-[40px] flex flex-wrap items-center gap-[8px]">
                  <span className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">Tags:</span>
                  <span className="rounded-[6px] bg-[var(--surface-tertiary)] px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">Design</span>
                  <span className="rounded-[6px] bg-[var(--surface-tertiary)] px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">Tokens</span>
                  <span className="rounded-[6px] bg-[var(--surface-tertiary)] px-[8px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">Foundations</span>
                </div>

                <div className="mt-[24px] flex flex-wrap items-center gap-[12px]">
                  <Button variant="primary" size="md">Get started</Button>
                  <Button variant="secondary" size="md">Learn more</Button>
                </div>

                <p className="mt-[32px] text-[12px] leading-[16px] text-[var(--text-tertiary)]">Figure 1 — Token hierarchy across display, heading, body, and label tiers.</p>
              </article>
          </ComponentPreview>
        </section>

        <section id="weights">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Font Weights</h2>
          <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Weight</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Value</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Usage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { weight: "Regular", value: 400, usage: "Body text, descriptions, paragraphs" },
                  { weight: "Medium", value: 500, usage: "Headings, labels, buttons, navigation" },
                  { weight: "SemiBold", value: 600, usage: "Emphasis, key metrics, important labels" },
                ].map(w => (
                  <tr key={w.weight} className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--color-neutral-100)]">
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--text-primary)]" style={{ fontWeight: w.value }}>{w.weight}</td>
                    <td className="px-[16px] py-[16px] leading-[20px]"><code>{w.value}</code></td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{w.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="guidelines">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Minimum Size</h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">Body text should never be smaller than 12px. Prefer 14px for primary content in AI interfaces for optimal readability.</p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Heading Hierarchy</h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">Maintain proper heading levels (h1 through h6). Never skip heading levels for semantic HTML compliance.</p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">AI Content Readability</h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">For AI-generated streaming content, use Body/16-reg with 24px line height for optimal readability during progressive rendering.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
