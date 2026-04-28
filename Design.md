# GovAI Design System

The GovAI Design System is the unified design language for building consistent, accessible, and scalable AI-native government interfaces across all GovAI products.

This document is the **source of truth for AI coding tools** building UI for GovAI. When generating code, always follow these rules and reference the structured token files (`src/lib/tokens.ts`, `src/app/globals.css`) for exact values.

---

## Mission

Provide a comprehensive, opinionated design language that:
- Eliminates inconsistency across GovAI Hub, GovGPT, AI Factory, and other government products
- Makes AI-generated UI feel native to GovAI from the first prompt
- Bakes in WCAG 2.1 AA accessibility by default
- Supports light and dark themes, RTL/Arabic locales, and responsive layouts

---

## Core Principles

1. **Tokens are the source of truth.** Never hardcode colors, spacing, radius, or shadows. Always reference design tokens via CSS variables (`var(--color-primary-500)`) or the `tokens.ts` exports.
2. **Compose, don't reinvent.** New components should be built from the 26 existing primitives (Button, Input, Card, etc.). If a primitive is missing, propose it before authoring a new one-off.
3. **Accessibility is a hard requirement.** Every interactive element needs keyboard support, focus rings, ARIA labels for icon-only controls, and WCAG-compliant color contrast.
4. **Light AND dark mode always.** Every surface, text color, and stroke must reference the semantic CSS variables that auto-swap with `next-themes`.
5. **RTL works out of the box.** Use logical properties when possible (`ms-*`, `me-*` over `ml-*`, `mr-*` for direction-aware spacing).
6. **Eliminate complexity.** Prefer simple, predictable components over magic. If a feature requires more than 3 props to use correctly, it's too complicated.

---

## Foundations

### Typography

- **Font family:** `Instrument Sans` (Google Fonts), with `system-ui, sans-serif` fallback
- **Weights used:** `400` regular, `500` medium, `600` semibold (no bold/light)
- **Scale categories:** `display`, `heading`, `body`, `label` — see `tokens.ts > typography`

| Use case | Token | Size / Line height |
|---|---|---|
| Page hero | `display-48` to `display-64` | 48–64 px / 55–74 px |
| Section heading | `heading-32`, `heading-24` | 32 / 40, 24 / 32 |
| Sub-heading | `heading-20`, `heading-18` | 20 / 28, 18 / 24 |
| Body | `body-16`, `body-14` | 16 / 24, 14 / 20 |
| Caption / label | `label-12` | 12 / 16 |

> **Rule:** Never use arbitrary `text-[xxpx]` Tailwind values that don't map to the token scale.

### Color Tokens

Two layers — **palette** (raw colors) and **semantic** (purpose-based):

#### Palette tokens (`--color-{name}-{step}`)
- Primary (blue): `50` → `950` — the GovAI brand color (`#2463EB` at 600)
- Neutral (light): `0` → `950` — for backgrounds, text, strokes
- Semantic: `success` (green), `error` (red), `warning` (yellow), `info` (cyan)
- Accent: `purple`, `orange`, `violet`, `indigo`, `teal`
- Data viz: `data-1` through `data-9` for charts

#### Semantic tokens (auto-swap by theme)
| Variable | Purpose | Light | Dark |
|---|---|---|---|
| `--surface-default` | Default page bg | `#F7F7F7` | `#101010` |
| `--surface-primary` | Card / panel bg | `#FAFAFA` | `#151515` |
| `--surface-tertiary` | Subtle bg layers | `#F7F7F7` | `#1C1C1C` |
| `--surface-alt-tertiary` | Image placeholders | `#EAEAEA` | `#2A2A2A` |
| `--text-primary` | Primary text | `#0A0A0B` | `#FAFAFA` |
| `--text-secondary` | Secondary text | `#3B3B3C` | `#BEBEBE` |
| `--text-tertiary` | Subtle text | `#666666` | `#A8A8A8` |
| `--header-primary` | Heading color | `#1C1C1E` | `#EDEDED` |
| `--stroke-primary` | Default border | `#D6D6D6` | `#2A2A2A` |
| `--icon-brand` | Brand icon color | `#1D58D8` | `#3D78F9` |

> **Rule:** Component code should reference **semantic tokens** for theming (`var(--surface-primary)`), never raw palette values. Use raw palette only for explicit branding accents.

### Spacing — 4px base scale

Allowed values: `0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120` (all in px).

> **Rule:** Never use Tailwind's default scale (`p-3` = 12 px happens to match, but `p-5` = 20 px and `p-7` does not exist in our system). Always use bracket syntax: `p-[16px]`, `gap-[12px]`. This makes intent explicit and matches Figma values 1:1.

### Corner Radius

| Token | Value | Use |
|---|---|---|
| `--radius-2` | 2 px | Tags, status dots |
| `--radius-4` | 4 px | Inputs, small buttons |
| `--radius-8` | 8 px | Standard buttons, inputs, badges |
| `--radius-12` | 12 px | Cards, modals |
| `--radius-16` | 16 px | Featured cards, hero containers |
| `--radius-20` | 20 px | Outer wrapper frames (preview boxes) |
| `--radius-full` | 999 px | Avatars, pills |

### Elevation (shadows)

Six levels via `--shadow-elevation-{1..6}`, all using soft black drop shadows. Use sparingly — flat surfaces with subtle borders are preferred over heavy shadows.

| Level | Use case |
|---|---|
| `1` | Resting cards |
| `2` | Hovered cards |
| `3` | Dropdowns, popovers |
| `4` | Modals, dialogs |
| `5` | Toasts |
| `6` | Critical alerts |

### Strokes / Borders

- Widths: `1px` default, `2px` for emphasis (focus rings), `4px` only for divider walls
- Default border color: `var(--stroke-primary)` — auto-swaps for theme
- Never use raw hex values for borders

### Z-Index Scale

Use the named scale, never magic numbers:
- `base: 0`
- `dropdown: 1000`
- `sticky: 1100`
- `modal: 1300`
- `popover: 1400`
- `tooltip: 1500`
- `toast: 1600`

### Motion

| Duration | Use |
|---|---|
| `instant` 50 ms | Hover state changes |
| `fast` 100 ms | Toggle/switch state |
| `normal` 200 ms | Default transitions |
| `slow` 300 ms | Modal/drawer entry |
| `slower` 500 ms | Page-level transitions |

| Easing | Use |
|---|---|
| `default` (ease-in-out) | Most transitions |
| `out` (ease-out) | Entry / appearance |
| `in` (ease-in) | Exit / disappearance |
| `spring` | Playful interactions, bounces |

> **Rule:** Always include `transition-colors`, `transition-all`, or scoped `transition-transform` on interactive elements. Never instant state changes for hover/focus.

### Breakpoints & Grid

| Breakpoint | Min width | Columns | Gutter | Margin |
|---|---|---|---|---|
| Mobile | 360 px | 4 | 16 px | 16 px |
| Tablet portrait | 768 px | 8 | 20 px | 20 px |
| Tablet landscape | 1024 px | 12 | 24 px | 24 px |
| Laptop | 1280 px | 12 | 20 px | 32 px |
| Desktop | 1440 px | 12 | 24 px | 32 px |
| Ultrawide | 1920 px | 12 | 32 px | 40 px |

---

## Component Architecture

The system uses **shadcn-pattern components** (Radix UI + Tailwind + class-variance-authority) — but they are **hand-built**, not installed via the shadcn CLI.

### Component conventions

1. **File location:** `src/components/ui/{component-name}.tsx`
2. **First line:** `"use client";` (all UI components are client-side)
3. **Variants via CVA:**
   ```tsx
   const buttonVariants = cva("base-classes", {
     variants: {
       variant: { primary: "...", secondary: "..." },
       size: { sm: "...", md: "...", lg: "..." }
     },
     defaultVariants: { variant: "primary", size: "md" }
   });
   ```
4. **Class composition:** always use `cn(...)` from `@/lib/utils` (combines `clsx` + `tailwind-merge`)
5. **Forwarded refs:** use `forwardRef` for any component that wraps a native element
6. **Radix primitives:** prefer Radix-UI primitives (`@radix-ui/react-*`) over building from scratch for accessibility-critical components (Dialog, Tooltip, Tabs, Dropdown, etc.)

### Available Primitives (do not duplicate)

`avatar`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `circular-progress`, `data-table`, `date-time-picker`, `dropdown`, `file-uploader`, `icon`, `input`, `number-input`, `pagination`, `progress-bar`, `radio`, `slider`, `stepper`, `tabs`, `textarea`, `toast`, `toggle`, `tooltip`

> Always call `get_component(name)` (via the MCP server) or read the file directly before building — verify the API surface and styles.

---

## Page-Level Layout Conventions

Doc/marketing pages use `ComponentPreview` wrappers from `@/components/docs/component-preview` — a Tabs-based block with a Preview/Code toggle. Use this for any "show example + show code" pattern.

```tsx
<ComponentPreview heading="Buttons" code={`<Button>Click me</Button>`}>
  <Button>Click me</Button>
</ComponentPreview>
```

For sections like "Usage Guidelines," wrap content in `<DoDont>` from `@/components/docs/do-dont`.

For pages with a right-rail TOC, use `<OnThisPage items={[...]} />` at the top of the page.

For prop documentation tables, use `<PropsTable props={[...]} />`.

---

## Accessibility Requirements

These are non-negotiable:

1. **Keyboard navigation:** every interactive element is reachable with `Tab` and operable with `Enter`/`Space`/arrow keys as appropriate.
2. **Focus rings:** visible 2-px ring using `--color-primary-500` with 2-px offset, never removed.
3. **ARIA labels:** all icon-only buttons need `aria-label`. All inputs need `<label>` association.
4. **Color contrast:** text 4.5:1 vs background, large text 3:1, non-text 3:1 — applies in BOTH light and dark themes.
5. **Touch targets:** minimum 32 px on hover, recommend 36 px (md) for primary use.
6. **Screen readers:** decorative icons get `aria-hidden="true"`, meaningful icons get `aria-label`.
7. **Motion:** respect `prefers-reduced-motion` — long transitions become instant.
8. **RTL:** test every component in `dir="rtl"` — addons flip, icons mirror, carets sit correctly.

---

## Anti-patterns (DO NOT DO)

- ❌ Hardcoded hex colors in JSX (`#2463EB` instead of `var(--color-primary-600)`)
- ❌ Custom shadows that don't match the elevation scale
- ❌ Custom radius values not in the radius scale
- ❌ `text-base`, `text-lg`, `text-2xl` Tailwind defaults — use bracket-syntax pixel values matching the typography scale
- ❌ Padding/spacing values not in the 4-px scale
- ❌ Removing focus rings ("for design reasons")
- ❌ Building a new component when an existing primitive can compose it
- ❌ Adding raw `<button>` instead of using the `<Button>` component
- ❌ Importing `lucide-react` icons when our `<Icon name="..." />` (Phosphor + custom registry) covers it

---

## Working with this design system through AI

When using Claude Code, Cursor, Gemini, ChatGPT, or any other AI tool:

1. **Always reference live source.** The `Design.md`, `tokens.ts`, and component files in this GitHub repo are the source of truth — not memory or training data.
2. **For Claude Code:** the GovAI MCP server (registered as `govai-design-system`) provides `get_design_principles`, `get_design_tokens`, `get_global_styles`, `list_components`, `get_component(name)`, and `get_design_bundle`. Call these at the start of any UI task.
3. **For other tools:** paste the raw GitHub URL of `Design.md`, `tokens.ts`, and `globals.css` into the system prompt or context window before generating UI.
4. **For Gemini AI Studio specifically:** paste the entire bundle (call `get_design_bundle` from Claude Code, or manually concatenate the three files above) into "System instructions" — Gemini's 1M-token context handles it comfortably.

---

## Repository

- **Source:** https://github.com/kenavelino/govai-design-system
- **Live docs:** https://govai-design-system.kennediavelinowork.workers.dev
- **Owner:** Kennedi Avelino, DGE
