# GovAI Design System — MCP Server

A lightweight Model Context Protocol server that exposes the GovAI Design System (Design.md, tokens, global CSS, and components) live from GitHub to AI coding tools.

## What it does

When registered in Claude Code (or any MCP-compatible client), this server gives the model six tools:

| Tool | Returns |
|---|---|
| `get_design_principles` | `Design.md` from GitHub |
| `get_design_tokens` | `src/lib/tokens.ts` from GitHub |
| `get_global_styles` | `src/app/globals.css` from GitHub |
| `list_components` | List of UI primitives in `src/components/ui/` |
| `get_component(name)` | Source of a specific component |
| `get_design_bundle` | Everything concatenated into one Markdown bundle |

All content is fetched from `kenavelino/govai-design-system` on the `main` branch by default — so any push to `main` is instantly available to every MCP client without rebuilding the server.

## Install & build (one-time setup)

From this folder:

```bash
npm install
npm run build
```

This produces `dist/index.js`, the executable server entry point.

## Register in Claude Code

The repo's root `.mcp.json` already includes the registration. If you want this design system available **across all your projects** (not just when working in this repo), add the same block to your user-level Claude Code config (`~/.claude.json` or via `claude mcp add`):

```json
{
  "mcpServers": {
    "govai-design-system": {
      "command": "node",
      "args": [
        "/absolute/path/to/govai-design-system/mcp-server/dist/index.js"
      ]
    }
  }
}
```

Then restart Claude Code. You'll see `govai-design-system` in `/mcp` and the model can call `get_design_principles` etc.

## Configuration

All optional. Set these as env vars in your MCP config to override defaults:

| Variable | Default | Purpose |
|---|---|---|
| `GOVAI_REPO_OWNER` | `kenavelino` | GitHub username/org |
| `GOVAI_REPO_NAME` | `govai-design-system` | Repo name |
| `GOVAI_REPO_REF` | `main` | Branch / tag / commit SHA |
| `GITHUB_TOKEN` | _(none)_ | Required only if the repo is private |

Example with private repo auth:

```json
{
  "mcpServers": {
    "govai-design-system": {
      "command": "node",
      "args": ["/path/to/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}
```

## Usage from other AI tools

The MCP server is Claude-Code-specific — but the **content** it serves is universal. Other tools can fetch the same files directly:

- **Cursor / GitHub Copilot Chat / Windsurf:** automatically read repo files when this design system is added to the workspace
- **Google AI Studio (Gemini):** paste the raw URL of `Design.md` into "System instructions" — Gemini's 1M-token context handles the full bundle comfortably
- **ChatGPT / Claude.ai web:** paste the raw URL into the system message
- **v0.dev / Lovable / Bolt:** paste the design system URL into the project context

Raw URLs:

- `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/Design.md`
- `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/src/lib/tokens.ts`
- `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/src/app/globals.css`

## Local development

```bash
npm run dev    # tsc --watch
```

In another terminal you can quickly smoke-test the server:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

## License

Internal — DGE / GovAI. Not for redistribution outside GovAI products.
