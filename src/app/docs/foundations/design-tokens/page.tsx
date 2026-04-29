"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const tocItems = [
  { id: "layered-tokens", title: "Two Layered Tokens", level: 2 },
  { id: "base-tokens", title: "Base Tokens", level: 2 },
  { id: "design-palette", title: "Design Tokens", level: 2 },
  { id: "architecture", title: "Token Architecture", level: 2 },
  { id: "nomenclature", title: "Nomenclature Rules", level: 2 },
  { id: "usage", title: "Using Tokens", level: 2 },
  { id: "download", title: "Download", level: 2 },
];

const nomenclatureRules = [
  "Minimum length — 4 characters",
  "Maximum length — 8 characters",
  "Usage of numbers, spaces, special characters and capitals should be avoided",
  "All tokens should be unique across the system to avoid confusion",
  "If the product name is a single word, take the first 4 letters",
  "If the product name is two words, take the first 3 letters of each word",
  "If the product name is three words, take the first 2 letters of each word",
  "If the product name is a single word of 3 characters, repeat the last letter",
];

const productPrefixes = [
  { product: "Gov GPT", prefix: "govgpt" },
  { product: "AI Governance Tracking", prefix: "aigotr" },
  { product: "Board Observer", prefix: "boaobs" },
  { product: "AI Committee", prefix: "aicom" },
  { product: "Anees Super Companion", prefix: "ansuco" },
  { product: "HR Recruitment", prefix: "hrrec" },
  { product: "Executive Twin", prefix: "exetwi" },
  { product: "Supplier Registration", prefix: "supreg" },
];

function TokenChip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "primary" }) {
  const toneClasses =
    tone === "primary"
      ? "border-[var(--color-primary-200)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
      : "border-[var(--stroke-primary)] bg-[var(--surface-alt-tertiary)] text-[var(--text-primary)]";
  return (
    <code className={`inline-flex items-center rounded-[6px] border px-[10px] py-[4px] font-mono text-[12px] leading-[18px] ${toneClasses}`}>
      {children}
    </code>
  );
}

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setMounted(true), []);
  const prismTheme = mounted && resolvedTheme === "dark" ? themes.vsDark : themes.github;

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[20px] border border-[var(--stroke-primary)] bg-[var(--preview-frame-bg)] p-[8px]">
      <div className="relative overflow-hidden rounded-[12px] border border-[var(--stroke-primary)] shadow-[0_5px_8px_0_rgba(0,0,0,0.08)]">
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute right-[12px] top-[12px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-[6px] bg-[var(--code-bg)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
        >
          {copied ? (
            <Icon name="check" className="h-[16px] w-[16px] text-[var(--color-success-600)]" />
          ) : (
            <Icon name="copy" className="h-[16px] w-[16px]" />
          )}
        </button>
        <Highlight theme={prismTheme} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} !m-0 whitespace-pre-wrap break-words !border-0 bg-[var(--code-bg)] p-[24px] pr-[56px] text-[13px] leading-[20px]`}
              style={{ ...style, background: "var(--code-bg)" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

function TokenExample({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      <TokenChip>{from}</TokenChip>
      <span aria-hidden className="text-[14px] text-[var(--text-tertiary)]">→</span>
      <TokenChip tone="primary">{to}</TokenChip>
    </div>
  );
}

export default function DesignTokensPage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/govai-design-tokens.json";
    link.download = "GovAI_DesignTokens.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Design Tokens
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Design tokens are the single source of truth for the GovAI visual language. They encode color, spacing, radius, typography, and stroke values as named variables so that design and code stay aligned across light and dark modes.
          </p>
        </div>

        <section id="layered-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Two Layered Tokens</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The AI Factory Design System uses a two-layer token structure to balance consistency and flexibility across all products.
          </p>
          <ul className="mt-[12px] space-y-[8px] text-[14px] leading-[22px] text-[var(--text-secondary)]">
            <li className="flex gap-[8px]">
              <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
              <span>
                <span className="font-semibold text-[var(--text-primary)]">Base Tokens</span> → define the raw, foundational values (colours, spacing, typography, shadows, etc.)
              </span>
            </li>
            <li className="flex gap-[8px]">
              <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
              <span>
                <span className="font-semibold text-[var(--text-primary)]">Design Tokens</span> → they translate raw tokens into design intent (the role they play).
              </span>
            </li>
          </ul>
        </section>

        <section id="base-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Base Tokens</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Base tokens are the foundation of the system. They capture the raw design values like colors, spacing, typography, radius, and shadows. These tokens aren&apos;t linked to any specific product or component. Instead, they act as the design DNA of the GovAI ecosystem, providing a neutral base that everything else is built on.
          </p>
          <div className="mt-[16px] rounded-[12px] border border-[var(--stroke-primary)] p-[20px]">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Example</div>
            <div className="mt-[12px] space-y-[10px]">
              <TokenExample from="#004280" to="ai-fac-color-blue-100-light" />
              <TokenExample from="16px" to="ai-fac-spacing-lg" />
              <TokenExample from="Aa Hello" to="ai-fac-typography-fontsize-md" />
            </div>
          </div>
        </section>

        <section id="design-palette">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Design Tokens</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Design tokens describe the purpose of a design choice, not just its raw value. They sit on top of the base tokens and give them meaning by turning raw values into roles like &ldquo;primary background,&rdquo; &ldquo;secondary text,&rdquo; or &ldquo;form spacing.&rdquo; In other words, they explain how and where a design value should be used, rather than just what the value is.
          </p>
          <div className="mt-[16px] rounded-[12px] border border-[var(--stroke-primary)] p-[20px]">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Example</div>
            <div className="mt-[12px] space-y-[10px]">
              <TokenExample from="ai-fac-color-blue-100-light" to="ai-fac-bg-primary-light" />
              <TokenExample from="ai-fac-spacing-lg" to="ai-fac-form-gap" />
              <TokenExample from="ai-fac-typography-fontsize-md" to="ai-fac-fontsize-body" />
            </div>
          </div>
        </section>

        <section id="architecture">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Token Architecture</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Design tokens reference Base Tokens using a path reference syntax — never hard-coded values. This means changing a base value cascades across all components that consume it.
          </p>
          <div className="mt-[16px]">
            <CodeBlock
              language="tsx"
              code={`// Base Tokens (primitive)
ai-fac-colors.primary.600 = #2463EB

// Design Tokens (semantic, references base)
ai-fac-button.bg.primary-default
  → $.Base Tokens.Mode 1.ai-fac-colors.primary.600

// Result (resolved at build time)
--button-bg-primary-default: #2463EB;`}
            />
          </div>
        </section>

        <section id="nomenclature">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Product Specific Nomenclature Rules</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Product-specific nomenclature gives us a consistent way to reference products in token names. Because tokens are shared between design and engineering, these prefixes need to be short, clear, and stable over time. We keep them 4–8 lowercase letters so they&apos;re easy to type, scan, and stay unique. Prefixes are derived systematically — for example, by taking the first few letters of each word in a product name. If there&apos;s ever a clash, extra letters are added until it&apos;s unique. Once a prefix is set, it should never change, even if the product name does, to avoid breaking tokens or code.
          </p>

          <h3 className="mt-[24px] text-[15px] font-semibold leading-[22px] text-[var(--header-primary)]">Rules to be followed for token nomenclature</h3>
          <ol className="mt-[12px] list-decimal space-y-[6px] pl-[20px] text-[14px] leading-[22px] text-[var(--text-secondary)] marker:text-[var(--text-tertiary)]">
            {nomenclatureRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ol>

          <h3 className="mt-[24px] text-[15px] font-semibold leading-[22px] text-[var(--header-primary)]">Product prefixes</h3>
          <p className="mt-[6px] text-[13px] leading-[20px] text-[var(--text-tertiary)]">
            Formation of token prefixes across the product suite.
          </p>
          <div className="mt-[12px] overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Product name</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Prefix</th>
                </tr>
              </thead>
              <tbody>
                {productPrefixes.map((row) => (
                  <tr key={row.prefix} className="border-b border-[var(--stroke-primary)] transition-colors last:border-0 hover:bg-[var(--color-neutral-100)]">
                    <td className="px-[16px] py-[16px] font-medium leading-[20px] text-[var(--text-primary)]">{row.product}</td>
                    <td className="px-[16px] py-[16px]">
                      <TokenChip tone="primary">{row.prefix}</TokenChip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Using Tokens</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Design tokens are exposed as CSS custom properties with light/dark values switched automatically by the <code className="font-mono text-[12px]">.dark</code> class.
          </p>
          <div className="mt-[16px]">
            <CodeBlock
              language="tsx"
              code={`/* CSS */
.my-button {
  background: var(--button-bg-primary-default);
  color:      var(--button-text-primary-default);
  border:     1px solid var(--stroke-primary);
  border-radius: 8px;
}

/* Tailwind (arbitrary values) */
<button className="bg-[var(--button-bg-primary-default)] text-[var(--button-text-primary-default)]" />`}
            />
          </div>
        </section>

        <section id="download">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Download</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Grab the full token manifest to import into Figma Variables, Style Dictionary, or your own build pipeline.
          </p>
          <div className="mt-[16px] flex items-center gap-[12px] rounded-[12px] border border-[var(--stroke-primary)] p-[20px]">
            <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[var(--surface-alt-tertiary)]">
              <Icon name="file-js" className="h-[24px] w-[24px] text-[var(--icon-neutral)]" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-medium leading-[20px] text-[var(--text-primary)]">GovAI_DesignTokens.json</div>
              <div className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">Base Tokens + Design Tokens (Light &amp; Dark)</div>
            </div>
            <Button variant="primary" size="md" onClick={handleDownload} className="shrink-0">
              <Icon name="download-simple" className="h-[16px] w-[16px]" aria-hidden="true" />
              Download
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
