"use client";

import { Icon } from "@/components/ui/icon";
import { OnThisPage } from "@/components/docs/on-this-page";
import { useState } from "react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "naming", title: "Naming Conventions", level: 2 },
  { id: "color-tokens", title: "Color Tokens", level: 2 },
  { id: "typography-tokens", title: "Typography Tokens", level: 2 },
  { id: "spacing-tokens", title: "Spacing Tokens", level: 2 },
  { id: "radius-tokens", title: "Border Radius Tokens", level: 2 },
  { id: "shadow-tokens", title: "Shadow Tokens", level: 2 },
  { id: "semantic-tokens", title: "Semantic Tokens", level: 2 },
  { id: "implementation", title: "Implementation", level: 2 },
];

function TokenRow({ token, value, desc }: { token: string; value: string; desc?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <tr className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)] group">
      <td className="px-[16px] py-[16px] leading-[20px]">
        <div className="flex items-center gap-2">
          <code className="!text-[12px]">{token}</code>
          <button
            onClick={() => { navigator.clipboard.writeText(token); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? <Icon name="check" className="h-4 w-4 text-[var(--color-success-600)]" /> : <Icon name="copy" className="h-4 w-4 text-[var(--icon-tertiary)]" />}
          </button>
        </div>
      </td>
      <td className="px-[16px] py-[16px] font-mono text-[14px] leading-[20px] text-[var(--header-secondary)]">{value}</td>
      {desc && <td className="px-[16px] py-[16px] text-[14px] leading-[20px] text-[var(--header-secondary)]">{desc}</td>}
    </tr>
  );
}

function TokenTable({ headers, tokens }: { headers: string[]; tokens: { token: string; value: string; desc?: string }[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
            {headers.map(h => (
              <th key={h} className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map(t => <TokenRow key={t.token} {...t} />)}
        </tbody>
      </table>
    </div>
  );
}

export default function TokensPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Design Tokens
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Design tokens are the atomic values that power the GovAI Design System. They bridge design and development by providing a shared vocabulary for styling decisions.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Overview</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Tokens are organized in three tiers:
          </p>
          <div className="mt-5 grid gap-[12px] md:grid-cols-3">
            {[
              { title: "Global Tokens", desc: "Raw values (colors, sizes). e.g., primary/600 → #2463EB" },
              { title: "Semantic Tokens", desc: "Purpose-mapped values. e.g., surface/default → white" },
              { title: "Component Tokens", desc: "Component-specific values. e.g., button/primary/bg → primary/600" },
            ].map(t => (
              <div key={t.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{t.title}</h4>
                <p className="mt-1.5 text-[14px] leading-[20px] text-[var(--text-tertiary)]">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="naming">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Naming Conventions</h2>
          <div className="mt-3 rounded-xl border border-[var(--stroke-primary)] p-[24px]">
            <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">Tokens follow a consistent naming pattern:</p>
            <pre className="mt-4"><code>{`category/property/variant/state

Examples:
  color/primary/600        → Global color token
  surface/default          → Semantic background token
  text/primary             → Semantic text color
  button/primary/bg        → Component token
  spacing/16               → Spacing token
  radius/8                 → Border radius token
  elevation/3              → Shadow token`}</code></pre>
          </div>
        </section>

        <section id="color-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Color Tokens</h2>
          <TokenTable
            headers={["Token", "Value", "Usage"]}
            tokens={[
              { token: "primary/600", value: "#2463EB", desc: "Primary brand, buttons, links" },
              { token: "primary/700", value: "#1D58D8", desc: "Hover states, active links" },
              { token: "primary/50", value: "#EFF4FF", desc: "Highlight backgrounds" },
              { token: "primary/100", value: "#DBE6FE", desc: "Selected row backgrounds" },
              { token: "success/600", value: "#1EAF62", desc: "Success states" },
              { token: "error/600", value: "#E12D48", desc: "Error states, destructive actions" },
              { token: "warning/600", value: "#E7A71A", desc: "Warning indicators" },
              { token: "info/600", value: "#0D8CD6", desc: "Information callouts" },
            ]}
          />
        </section>

        <section id="typography-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Typography Tokens</h2>
          <TokenTable
            headers={["Token", "Value"]}
            tokens={[
              { token: "font/family", value: "Instrument Sans" },
              { token: "font/weight/regular", value: "400" },
              { token: "font/weight/medium", value: "500" },
              { token: "font/weight/semibold", value: "600" },
              { token: "font/size/display-64", value: "64px" },
              { token: "font/size/heading-32", value: "32px" },
              { token: "font/size/body-16", value: "16px" },
              { token: "font/size/body-14", value: "14px" },
              { token: "font/size/label-14", value: "14px" },
              { token: "font/size/body-12", value: "12px" },
              { token: "font/lineHeight/display-64", value: "74px" },
              { token: "font/lineHeight/body-16", value: "24px" },
            ]}
          />
        </section>

        <section id="spacing-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Spacing Tokens</h2>
          <TokenTable
            headers={["Token", "Value", "Usage"]}
            tokens={[
              { token: "spacing/0", value: "0px", desc: "No spacing" },
              { token: "spacing/2", value: "2px", desc: "Micro adjustments" },
              { token: "spacing/4", value: "4px", desc: "Tight inline spacing" },
              { token: "spacing/8", value: "8px", desc: "Compact element spacing" },
              { token: "spacing/12", value: "12px", desc: "Small gaps" },
              { token: "spacing/16", value: "16px", desc: "Default element spacing" },
              { token: "spacing/24", value: "24px", desc: "Card padding, section gaps" },
              { token: "spacing/32", value: "32px", desc: "Section spacing" },
              { token: "spacing/48", value: "48px", desc: "Large section breaks" },
              { token: "spacing/64", value: "64px", desc: "Page section spacing" },
              { token: "spacing/96", value: "96px", desc: "Hero spacing" },
            ]}
          />
        </section>

        <section id="radius-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Border Radius Tokens</h2>
          <div className="mt-3 grid grid-cols-2 gap-[12px] sm:grid-cols-4">
            {[
              { name: "0", value: "0px" },
              { name: "2", value: "2px" },
              { name: "4", value: "4px" },
              { name: "8", value: "8px" },
              { name: "12", value: "12px" },
              { name: "16", value: "16px" },
              { name: "20", value: "20px" },
              { name: "full", value: "999px" },
            ].map(r => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 border-2 border-[var(--color-primary-400)] bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-950)]"
                  style={{ borderRadius: r.value }}
                />
                <code className="text-[12px]">radius/{r.name}</code>
                <span className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">{r.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="shadow-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Shadow Tokens</h2>
          <TokenTable
            headers={["Token", "Value"]}
            tokens={[
              { token: "elevation/1", value: "0 1px 2px 0 rgba(0,0,0,0.08)" },
              { token: "elevation/2", value: "0 2px 4px 0 rgba(0,0,0,0.10)" },
              { token: "elevation/3", value: "0 4px 8px 0 rgba(0,0,0,0.12)" },
              { token: "elevation/4", value: "0 8px 16px 0 rgba(0,0,0,0.14)" },
              { token: "elevation/5", value: "0 10px 20px 0 rgba(0,0,0,0.05)" },
              { token: "elevation/6", value: "4px 4px 20px 0 rgba(91,106,147,0.15)" },
            ]}
          />
        </section>

        <section id="semantic-tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Semantic Tokens</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Semantic tokens map purpose to values and automatically switch between light and dark mode.
          </p>
          <TokenTable
            headers={["Token", "Light Value", "Usage"]}
            tokens={[
              { token: "surface/default", value: "#FFFFFF", desc: "Page background" },
              { token: "surface/primary", value: "#FAFAFA", desc: "Container background" },
              { token: "surface/tertiary", value: "#F7F7F7", desc: "Subtle background" },
              { token: "surface/highlight", value: "#EFF4FF", desc: "Selected/highlight bg" },
              { token: "text/primary", value: "#0A0A0B", desc: "Primary text" },
              { token: "text/secondary", value: "#3B3B3C", desc: "Secondary text" },
              { token: "text/tertiary", value: "#666666", desc: "Subtle text" },
              { token: "stroke/primary", value: "#EAEAEA", desc: "Default borders" },
              { token: "stroke/secondary", value: "#CCCCCC", desc: "Emphasized borders" },
            ]}
          />
        </section>

        <section id="implementation">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Implementation</h2>

          <h3 className="mt-3 text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">CSS Custom Properties</h3>
          <pre className="mt-3"><code>{`/* Use semantic tokens via CSS variables */
.card {
  background: var(--surface-default);
  color: var(--text-primary);
  border: 1px solid var(--stroke-primary);
  border-radius: var(--radius-12);
  padding: var(--spacing-24);
  box-shadow: var(--shadow-elevation-1);
}`}</code></pre>

          <h3 className="mt-5 text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Tailwind CSS</h3>
          <pre className="mt-3"><code>{`{/* Use token-mapped Tailwind classes */}
<div className="
  bg-primary-600
  text-neutral-0
  rounded-xl
  p-6
  shadow-elevation-2
">
  Token-powered component
</div>`}</code></pre>

          <h3 className="mt-5 text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">JavaScript Import</h3>
          <pre className="mt-3"><code>{`import { colors, spacing, typography, elevation } from '@/lib/tokens';

// Access any token value
const primaryColor = colors.primary[600]; // "#2463EB"
const gap = spacing[16];                  // "16px"
const shadow = elevation[3];              // "0 4px 8px..."
const font = typography.fontFamily;       // "Instrument Sans"`}</code></pre>
        </section>
      </div>
    </>
  );
}
