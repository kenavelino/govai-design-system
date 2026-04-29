"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { CodeBlock } from "@/components/docs/code-block";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@/components/ui/data-table";

const tocItems = [
  { id: "overview",      title: "Overview",                  level: 2 },
  { id: "claude-code",   title: "Claude Code (MCP)",         level: 2 },
  { id: "cursor",        title: "Cursor & Windsurf",         level: 2 },
  { id: "other-tools",   title: "Other AI Tools",            level: 2 },
  { id: "mcp-tools",     title: "MCP Tools Reference",       level: 2 },
  { id: "tokens",        title: "Design Tokens",             level: 2 },
  { id: "components",    title: "Using Components",          level: 2 },
  { id: "links",         title: "Project Links",             level: 2 },
];

const mcpJsonCode = `{
  "mcpServers": {
    "govai-design-system": {
      "command": "npx",
      "args": ["-y", "govai-mcp"]
    }
  }
}`;

const cursorRulesCode = `# Download Design.md and save as .cursorrules in your project root.
# Cursor reads it automatically on every AI request.

curl -o .cursorrules \\
  https://raw.githubusercontent.com/kenavelino/govai-design-system/main/Design.md`;

const windsurfCode = `# Same as Cursor — save as .windsurfrules instead.

curl -o .windsurfrules \\
  https://raw.githubusercontent.com/kenavelino/govai-design-system/main/Design.md`;

const bundleCode = `# Open this URL, Select All, Copy, then paste as the first message
# in your AI session (ChatGPT, v0, Bolt, Lovable, Google AI Studio).
https://raw.githubusercontent.com/kenavelino/govai-design-system/main/govai-design-bundle.md`;

const bundleInstructCode = `Use the GovAI Design System above for all UI you generate.`;

const tokenExample = `/* Always use CSS custom properties — never hardcode hex values */

.my-card {
  background: var(--surface-default);
  border: 1px solid var(--stroke-primary);
  color: var(--text-primary);
  border-radius: var(--radius-12);
  box-shadow: var(--shadow-sm);
}

/* Brand colour scale */
--color-primary-50      /* lightest tint */
--color-primary-100
--color-primary-600     /* default interactive */
--color-primary-700     /* hover / active */
--color-primary-900     /* darkest */

/* Semantic surface tokens */
--surface-default        /* page background */
--surface-alt-tertiary   /* grey tray / chip bg */
--surface-primary        /* elevated white card */

/* Semantic text tokens */
--header-primary    /* headings */
--text-secondary    /* body */
--text-tertiary     /* captions / placeholders */

/* Stroke tokens */
--stroke-primary    /* default border */
--stroke-secondary  /* active / focused border */`;

const componentImportCode = `// 1. Browse the docs to find the component you need.
// 2. Open the Code tab in any ComponentPreview block to see the
//    exact import path and usage.
// 3. The component source lives at: src/components/ui/<name>.tsx

import { Button } from "@/components/ui/button";

<Button variant="primary" size="md">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="ghost">Learn more</Button>`;

const iconCode = `// Icons use Phosphor Icons served from /public/icons/{weight}/{name}.svg
// Always use the <Icon> component — never raw <img> or <svg>.
import { Icon } from "@/components/ui/icon";

<Icon name="gear"       className="h-[20px] w-[20px]" />
<Icon name="users"      className="h-[20px] w-[20px]" weight="bold" />
<Icon name="chart-bar"  className="h-[20px] w-[20px] text-[var(--color-primary-600)]" />`;

export default function DevelopersPage() {
  return (
    <>
      <OnThisPage items={tocItems} />

      <div className="space-y-[40px]">
        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Developer Guide
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            How to plug the GovAI Design System into any AI coding tool so every UI you generate is consistent, on-brand, and follows our design standards automatically.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System is a <strong>living system</strong> — not a static npm package. It is distributed through three channels depending on which AI tool you use:
          </p>
          <DataTable<{ tool: string; method: string }>
            className="mt-4"
            columns={[
              { key: "tool",   header: "Tool",   width: "200px" },
              { key: "method", header: "Method" },
            ] satisfies ColumnDef<{ tool: string; method: string }>[]}
            data={[
              { tool: "Claude Code",                    method: "MCP server via .mcp.json (recommended)" },
              { tool: "Cursor",                         method: "Design.md → .cursorrules" },
              { tool: "Windsurf",                       method: "Design.md → .windsurfrules" },
              { tool: "ChatGPT / v0 / Bolt / Lovable",  method: "Full bundle → paste as first message or system prompt" },
              { tool: "Google AI Studio",               method: "Full bundle → System Instructions" },
            ]}
            getRowKey={(row) => row.tool}
          />
        </section>

        {/* Claude Code */}
        <section id="claude-code">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Option 1 — Claude Code (MCP Server)
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            This is the recommended integration. The MCP server connects Claude directly to the live design system — no copy-pasting, and it auto-updates every time the design system changes.
          </p>

          <div className="mt-5 flex flex-col gap-[20px]">
            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
                Step 1 — Create <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px] font-normal">.mcp.json</code> in your project root
              </p>
              <p className="mt-1 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                If your project already has a <code className="text-[13px]">.mcp.json</code>, add the <code className="text-[13px]">"govai-design-system"</code> block inside the existing <code className="text-[13px]">"mcpServers"</code> section.
              </p>
              <CodeBlock code={mcpJsonCode} language="json" className="mt-3" />
            </div>

            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
                Step 2 — Restart Claude Code in your project
              </p>
              <p className="mt-1 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                That&apos;s it. Claude will automatically load the design principles, use the correct tokens, apply the right components, and follow light/dark mode rules for every UI it generates in that project.
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-alt-tertiary)] p-[20px]">
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Why MCP?</p>
              <ul className="mt-2 flex flex-col gap-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                <li>• Always reads live source — tokens, components, and rules stay current automatically</li>
                <li>• No bundle to paste or rules file to maintain</li>
                <li>• Claude can query individual components on demand instead of loading everything at once</li>
                <li>• Works across all projects that have the <code className="text-[13px]">.mcp.json</code></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cursor & Windsurf */}
        <section id="cursor">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Option 2 — Cursor & Windsurf
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Download <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px]">Design.md</code> from the repo and save it as the rules file for your editor. The AI reads it automatically on every generation.
          </p>

          <div className="mt-5 flex flex-col gap-[20px]">
            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
                Cursor — save as <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px] font-normal">.cursorrules</code>
              </p>
              <CodeBlock code={cursorRulesCode} language="bash" className="mt-3" />
            </div>

            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
                Windsurf — save as <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px] font-normal">.windsurfrules</code>
              </p>
              <CodeBlock code={windsurfCode} language="bash" className="mt-3" />
            </div>

            <p className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">
              When the design system updates, re-run the curl command to fetch the latest <code className="text-[13px]">Design.md</code> and replace your rules file.
            </p>
          </div>
        </section>

        {/* Other AI Tools */}
        <section id="other-tools">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Option 3 — ChatGPT, v0, Bolt, Lovable & Others
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            For tools that don&apos;t support rules files, paste the full design bundle as the first message in your conversation, or into the system prompt / instructions field.
          </p>

          <div className="mt-5 flex flex-col gap-[20px]">
            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Step 1 — Open the bundle URL in your browser</p>
              <CodeBlock code={bundleCode} language="bash" className="mt-3" />
            </div>

            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Step 2 — Select All → Copy → Paste as first message, then add:</p>
              <CodeBlock code={bundleInstructCode} language="bash" className="mt-3" />
            </div>
          </div>
        </section>

        {/* MCP Tools Reference */}
        <section id="mcp-tools">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            MCP Tools Reference
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            When using the MCP integration, Claude has access to these tools from the <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px]">govai-mcp</code> server:
          </p>
          <DataTable<{ tool: string; returns: string }>
            className="mt-4"
            columns={[
              {
                key: "tool",
                header: "Tool",
                width: "240px",
                render: (value) => (
                  <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[12px] text-[var(--color-primary-700)]">
                    {String(value)}
                  </code>
                ),
              },
              { key: "returns", header: "Returns" },
            ] satisfies ColumnDef<{ tool: string; returns: string }>[]}
            data={[
              { tool: "get_design_principles", returns: "Design.md — philosophy, foundations, component conventions, accessibility rules, and anti-patterns. Claude calls this at the start of any UI task." },
              { tool: "get_design_tokens",     returns: "tokens.ts — TypeScript exports for colors, typography, spacing, radius, elevation, z-index, motion, breakpoints, and grid." },
              { tool: "get_global_styles",     returns: "globals.css — all CSS custom properties: palette tokens (--color-*), semantic tokens (--surface-*, --text-*, --stroke-*), light + dark mode." },
              { tool: "list_components",       returns: "Names of all UI primitives in src/components/ui/. Claude calls this before composing UI to see what's already built." },
              { tool: "get_component",         returns: "Full source code of a specific component (e.g. 'button', 'badge'). Claude reads the API, variants, and styling before using it." },
              { tool: "get_design_bundle",     returns: "The entire system as one bundle: Design.md + tokens.ts + globals.css + every component. Used for fresh sessions in other tools." },
            ]}
            getRowKey={(row) => row.tool}
          />
        </section>

        {/* Design Tokens */}
        <section id="tokens">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Design Tokens
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            All colours, spacing, radius, and shadows are exposed as CSS custom properties. Always reference tokens — never hardcode hex values or pixel amounts.
          </p>
          <CodeBlock code={tokenExample} language="css" className="mt-5" />
        </section>

        {/* Using Components */}
        <section id="components">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Using Components
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Every component is documented on this site with a live preview and a Code tab showing the exact import path and usage. Component source lives in <code className="rounded bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px]">src/components/ui/</code>.
          </p>

          <div className="mt-5 flex flex-col gap-[20px]">
            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Component imports</p>
              <CodeBlock code={componentImportCode} language="tsx" className="mt-3" />
            </div>

            <div>
              <p className="text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">Icon usage</p>
              <p className="mt-1 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Icons use Phosphor Icons served from <code className="text-[13px]">/public/icons/</code>. Always use the <code className="text-[13px]">&lt;Icon&gt;</code> component — never raw SVG or img tags.
              </p>
              <CodeBlock code={iconCode} language="tsx" className="mt-3" />
            </div>
          </div>
        </section>

        {/* Project Links */}
        <section id="links">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Project Links
          </h2>
          <div className="mt-4 grid gap-[12px] sm:grid-cols-2">
            {[
              { label: "GitHub Repository", href: "https://github.com/kenavelino/govai-design-system",                                                              desc: "Source code, issues, and pull requests" },
              { label: "Live Docs",         href: "https://govai-design-system.kennediavelinowork.workers.dev",                                                     desc: "This documentation site, deployed on Cloudflare Workers" },
              { label: "npm — govai-mcp",   href: "https://www.npmjs.com/package/govai-mcp",                                                                        desc: "The MCP server package used with Claude Code" },
              { label: "Design Bundle",     href: "https://raw.githubusercontent.com/kenavelino/govai-design-system/main/govai-design-bundle.md",                   desc: "Full system bundle — tokens, styles, and all components" },
              { label: "Design Rules",      href: "https://raw.githubusercontent.com/kenavelino/govai-design-system/main/Design.md",                                desc: "Design.md — principles and conventions for Cursor/Windsurf" },
              { label: "Global Styles",     href: "https://raw.githubusercontent.com/kenavelino/govai-design-system/main/src/app/globals.css",                      desc: "CSS custom properties — full token definitions" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-[4px] rounded-[12px] border border-[var(--stroke-primary)] p-[20px] transition-colors hover:border-[var(--color-primary-600)] hover:bg-[var(--surface-alt-tertiary)]"
              >
                <span className="text-[14px] font-semibold text-[var(--color-primary-700)] group-hover:underline">
                  {link.label} ↗
                </span>
                <span className="text-[13px] leading-[18px] text-[var(--text-tertiary)]">
                  {link.desc}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
