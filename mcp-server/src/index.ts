#!/usr/bin/env node
/**
 * GovAI Design System — MCP Server
 *
 * Exposes the live design system (Design.md, tokens, global CSS, components)
 * from GitHub via Model Context Protocol tools.
 *
 * Configure via environment variables (all optional):
 *   GOVAI_REPO_OWNER   default: "kenavelino"
 *   GOVAI_REPO_NAME    default: "govai-design-system"
 *   GOVAI_REPO_REF     default: "main"
 *   GITHUB_TOKEN       optional; required only if the repo is private
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const OWNER = process.env.GOVAI_REPO_OWNER ?? "kenavelino";
const REPO = process.env.GOVAI_REPO_NAME ?? "govai-design-system";
const REF = process.env.GOVAI_REPO_REF ?? "main";
const TOKEN = process.env.GITHUB_TOKEN;

interface GitHubContentItem {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
}

const baseRawHeaders: Record<string, string> = {
  "User-Agent": "govai-mcp-server",
};
if (TOKEN) baseRawHeaders.Authorization = `Bearer ${TOKEN}`;

const baseApiHeaders: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "govai-mcp-server",
};
if (TOKEN) baseApiHeaders.Authorization = `Bearer ${TOKEN}`;

async function fetchRaw(path: string): Promise<string> {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${REF}/${path}`;
  const res = await fetch(url, { headers: baseRawHeaders });
  if (!res.ok) {
    throw new Error(
      `GET ${path} failed: ${res.status} ${res.statusText}` +
        (!TOKEN && res.status === 404
          ? " — if the repo is private, set GITHUB_TOKEN env var"
          : "")
    );
  }
  return res.text();
}

async function fetchDir(path: string): Promise<GitHubContentItem[]> {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(
    path
  )}?ref=${REF}`;
  const res = await fetch(url, { headers: baseApiHeaders });
  if (!res.ok) {
    throw new Error(
      `LIST ${path} failed: ${res.status} ${res.statusText}` +
        (!TOKEN && res.status === 404
          ? " — if the repo is private, set GITHUB_TOKEN env var"
          : "")
    );
  }
  return (await res.json()) as GitHubContentItem[];
}

const server = new McpServer({
  name: "govai-design-system",
  version: "0.1.0",
});

server.tool(
  "get_design_principles",
  "Returns Design.md — the GovAI Design System's principles, philosophy, foundations (typography/colors/spacing/radius/elevation/strokes/sizes/motion), component conventions, accessibility rules, and anti-patterns. Call this at the start of any UI task.",
  {},
  async () => {
    const md = await fetchRaw("Design.md");
    return { content: [{ type: "text", text: md }] };
  }
);

server.tool(
  "get_design_tokens",
  "Returns src/lib/tokens.ts — structured TypeScript exports for colors (palette + semantic), typography, spacing, radius, elevation, z-index, motion, breakpoints, and grid. Use exact values from this file when generating UI.",
  {},
  async () => {
    const ts = await fetchRaw("src/lib/tokens.ts");
    return { content: [{ type: "text", text: ts }] };
  }
);

server.tool(
  "get_global_styles",
  "Returns src/app/globals.css — CSS variables for the entire system: palette tokens (--color-*), semantic tokens (--surface-*, --text-*, --stroke-*, --icon-*), light + dark mode definitions, spacing/radius/shadow scales, motion easings.",
  {},
  async () => {
    const css = await fetchRaw("src/app/globals.css");
    return { content: [{ type: "text", text: css }] };
  }
);

server.tool(
  "list_components",
  "Returns the names of all available UI primitives in src/components/ui/. Call before composing UI to see what's already built and avoid duplication.",
  {},
  async () => {
    const items = await fetchDir("src/components/ui");
    const components = items
      .filter((i) => i.type === "file" && i.name.endsWith(".tsx"))
      .filter((i) => !i.name.endsWith(".figma.tsx"))
      .map((i) => i.name.replace(/\.tsx$/, ""))
      .sort();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ count: components.length, components }, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "get_component",
  "Returns the source code of a specific UI primitive by name (e.g. 'button', 'badge', 'tooltip'). Use this to learn the exact API, variants, and styling before composing.",
  {
    name: z
      .string()
      .describe("Component name without extension, e.g. 'button' or 'tooltip'"),
  },
  async ({ name }) => {
    const safe = name.replace(/[^a-zA-Z0-9-_]/g, "");
    const code = await fetchRaw(`src/components/ui/${safe}.tsx`);
    return { content: [{ type: "text", text: code }] };
  }
);

server.tool(
  "get_design_bundle",
  "Returns the entire design system as a single concatenated bundle: Design.md + tokens.ts + globals.css + every UI component source. Use this when starting a fresh vibe-coding session in another project so the model has the full ecosystem in one shot. Output is large (~30k tokens) — fits comfortably in Claude/Gemini context.",
  {},
  async () => {
    const [md, tokensTs, css, items] = await Promise.all([
      fetchRaw("Design.md").catch(() => "_(Design.md not found in repo)_"),
      fetchRaw("src/lib/tokens.ts"),
      fetchRaw("src/app/globals.css"),
      fetchDir("src/components/ui"),
    ]);

    const componentFiles = items
      .filter((i) => i.type === "file" && i.name.endsWith(".tsx"))
      .filter((i) => !i.name.endsWith(".figma.tsx"))
      .map((i) => i.name)
      .sort();

    const componentSources = await Promise.all(
      componentFiles.map(async (name) => ({
        name,
        code: await fetchRaw(`src/components/ui/${name}`),
      }))
    );

    const bundle = [
      "# GovAI Design System — Full Bundle",
      "",
      `Generated from \`${OWNER}/${REPO}@${REF}\` at ${new Date().toISOString()}.`,
      "",
      "This bundle contains everything needed to generate UI consistent with the GovAI Design System.",
      "",
      "---",
      "",
      "## 1. Design Principles (Design.md)",
      "",
      md,
      "",
      "---",
      "",
      "## 2. Design Tokens (src/lib/tokens.ts)",
      "",
      "```ts",
      tokensTs,
      "```",
      "",
      "---",
      "",
      "## 3. Global Styles (src/app/globals.css)",
      "",
      "```css",
      css,
      "```",
      "",
      "---",
      "",
      "## 4. UI Components (src/components/ui/)",
      "",
      ...componentSources.flatMap(({ name, code }) => [
        `### ${name}`,
        "",
        "```tsx",
        code,
        "```",
        "",
      ]),
    ].join("\n");

    return { content: [{ type: "text", text: bundle }] };
  }
);

// Stdio transport — Claude Code spawns this process and talks over stdin/stdout
const transport = new StdioServerTransport();
await server.connect(transport);
process.stderr.write(
  `[govai-mcp] ready · source: ${OWNER}/${REPO}@${REF}${TOKEN ? " (auth)" : " (public)"}\n`
);
