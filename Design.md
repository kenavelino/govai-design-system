# GovAI Design System

The GovAI Design System is the unified design language for building consistent, accessible, and scalable AI-native government interfaces across all GovAI products.

This document is the **mandatory source of truth for AI coding tools** building UI for GovAI. Every rule below is a hard requirement — not a suggestion.

---

## Mission

Provide a comprehensive, opinionated design language that:
- Eliminates inconsistency across GovAI Hub, GovGPT, AI Factory, and other government products
- Makes AI-generated UI feel native to GovAI from the first prompt
- Bakes in WCAG 2.1 AA accessibility by default
- Supports light and dark themes, RTL/Arabic locales, and responsive layouts

---

## AI Compliance Protocol

**Before generating any UI, Claude MUST:**

1. Call `get_design_principles` to load this document
2. Call `get_design_tokens` to load exact token values
3. Call `get_global_styles` to load CSS variables
4. Call `list_components` to see all available primitives
5. Call `get_component(name)` for every component you intend to use
6. Run through the **Mandatory Checklist** below before outputting any code

**Mandatory Checklist — tick every box before outputting code:**

- [ ] Every color references a CSS variable (`var(--...)`) — no hardcoded hex
- [ ] Every spacing value is from the 4px scale using bracket syntax (`p-[16px]`)
- [ ] Every radius is from the radius scale (`rounded-[var(--radius-8)]`)
- [ ] Every shadow uses an elevation token (`shadow-[var(--shadow-elevation-2)]`)
- [ ] Every font size matches the typography scale (bracket px values only)
- [ ] Every interactive element has keyboard support and a visible focus ring
- [ ] Every icon uses `<Icon name="..." />` — never raw SVG or lucide-react
- [ ] Every existing primitive is used — no raw `<button>`, `<input>`, `<select>` etc.
- [ ] Light AND dark mode works via semantic CSS variables
- [ ] Layout uses the correct grid columns and gutters for each breakpoint
- [ ] Touch targets are minimum 32px, recommended 36px for primary actions
- [ ] All ARIA labels, roles, and keyboard handlers are present

---

## Core Principles

1. **Tokens are the source of truth.** Never hardcode colors, spacing, radius, or shadows. Always reference design tokens via CSS variables (`var(--color-primary-500)`) or the `tokens.ts` exports.
2. **Compose, don't reinvent.** Every new UI must be built from existing primitives. If a primitive is missing, propose it as a new component — never build a one-off.
3. **Accessibility is a hard requirement.** Every interactive element needs keyboard support, focus rings, ARIA labels for icon-only controls, and WCAG-compliant color contrast.
4. **Light AND dark mode always.** Every surface, text color, and stroke must reference semantic CSS variables that auto-swap with `next-themes`.
5. **RTL works out of the box.** Use logical properties when possible (`ms-*`, `me-*` over `ml-*`, `mr-*`).
6. **Eliminate complexity.** If a feature requires more than 3 props to use correctly, it's too complicated.

---

## Foundations

### Typography

- **Font family:** `Instrument Sans` (Google Fonts), with `system-ui, sans-serif` fallback
- **Weights:** `400` regular, `500` medium, `600` semibold — no other weights
- **Scale categories:** `display`, `heading`, `body`, `label`

| Use case | Size / Line height | Weight |
|---|---|---|
| Page hero | 48–64px / 55–74px | 600 |
| Section heading | 32px / 40px, 24px / 32px | 600 |
| Sub-heading | 20px / 28px, 18px / 24px | 500–600 |
| Body | 16px / 24px, 14px / 20px | 400 |
| Caption / label | 12px / 16px | 400–500 |

**MUST use:** bracket-syntax px values that match the scale exactly: `text-[16px] leading-[24px]`
**NEVER use:** `text-base`, `text-lg`, `text-2xl`, or any Tailwind default text size class

---

### Color — MANDATORY RULES

**Two-layer system — always use semantic tokens for components:**

#### Semantic tokens (MUST use for all UI)

| Variable | Purpose |
|---|---|
| `var(--surface-default)` | Page background |
| `var(--surface-primary)` | Card / panel background |
| `var(--surface-tertiary)` | Subtle background layers |
| `var(--surface-alt-tertiary)` | Image placeholders, skeletons |
| `var(--surface-disabled)` | Disabled element backgrounds |
| `var(--surface-highlight)` | Selected / highlighted states |
| `var(--surface-modal)` | Modal / dialog backgrounds |
| `var(--text-primary)` | Primary body text |
| `var(--text-secondary)` | Secondary / supporting text |
| `var(--text-tertiary)` | Subtle / placeholder text |
| `var(--text-disabled)` | Disabled text |
| `var(--header-primary)` | Heading text |
| `var(--header-secondary)` | Sub-heading text |
| `var(--icon-brand)` | Brand-colored icons |
| `var(--icon-neutral)` | Default icons |
| `var(--icon-secondary)` | Secondary icons |
| `var(--icon-tertiary)` | Subtle icons |
| `var(--icon-disabled)` | Disabled icons |
| `var(--stroke-primary)` | Default borders |
| `var(--stroke-secondary)` | Emphasis borders |
| `var(--stroke-disabled)` | Disabled borders |

#### Palette tokens (only for explicit brand accents, never for component theming)

- Primary (blue): `var(--color-primary-{50–950})`
- Success: `var(--color-success-{50–950})`
- Error: `var(--color-error-{50–950})`
- Warning: `var(--color-warning-{50–950})`
- Info: `var(--color-info-{50–950})`
- Accent: `purple`, `orange`, `violet`, `indigo`, `teal`
- Data viz: `var(--color-data-{1–9})` — for charts only

**NEVER:** hardcode any hex value (`#2463EB`, `#FAFAFA`, etc.) in component code.

---

### Spacing — 4px Base Scale

**Allowed values only:** `0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120` (px)

**MUST use:** bracket syntax — `p-[16px]`, `gap-[12px]`, `mt-[8px]`
**NEVER use:** `p-3`, `p-5`, `p-7` or any Tailwind default spacing that doesn't map to the scale

---

### Corner Radius — MANDATORY

| Token | Value | Use |
|---|---|---|
| `var(--radius-2)` | 2px | Tags, status dots, micro elements |
| `var(--radius-4)` | 4px | Small buttons, chips |
| `var(--radius-8)` | 8px | Standard buttons, inputs, badges |
| `var(--radius-12)` | 12px | Cards, modals, dropdowns |
| `var(--radius-16)` | 16px | Featured cards, hero containers |
| `var(--radius-20)` | 20px | Outer wrapper frames |
| `var(--radius-full)` | 999px | Avatars, pills, circular elements |

**MUST use:** `rounded-[var(--radius-8)]` syntax — always reference the token
**NEVER use:** `rounded`, `rounded-md`, `rounded-lg`, or arbitrary px values not in the scale

---

### Elevation (Shadows)

| Level | Token | Use case |
|---|---|---|
| 1 | `var(--shadow-elevation-1)` | Resting cards |
| 2 | `var(--shadow-elevation-2)` | Hovered cards |
| 3 | `var(--shadow-elevation-3)` | Dropdowns, popovers |
| 4 | `var(--shadow-elevation-4)` | Modals, dialogs |
| 5 | `var(--shadow-elevation-5)` | Toasts |
| 6 | `var(--shadow-elevation-6)` | Critical alerts |

**NEVER:** use `shadow-sm`, `shadow-md`, `shadow-lg`, or custom shadow values.

---

### Strokes / Borders

- **Widths:** `1px` default, `2px` focus rings, `4px` divider walls only
- **Color:** always `var(--stroke-primary)` or `var(--stroke-secondary)` — never raw hex
- **Class syntax:** `border border-[var(--stroke-primary)]`

---

### Z-Index — Named Scale Only

| Name | Value | Use |
|---|---|---|
| base | 0 | Normal flow |
| dropdown | 1000 | Dropdowns |
| sticky | 1100 | Sticky headers |
| modal | 1300 | Modals, dialogs |
| popover | 1400 | Popovers |
| tooltip | 1500 | Tooltips |
| toast | 1600 | Toast notifications |

**NEVER:** use raw z-index numbers (`z-10`, `z-50`, `z-[999]`).

---

### Motion

| Duration | Value | Use |
|---|---|---|
| instant | 50ms | Hover state changes |
| fast | 100ms | Toggle/switch state |
| normal | 200ms | Default transitions |
| slow | 300ms | Modal/drawer entry |
| slower | 500ms | Page-level transitions |

| Easing | Use |
|---|---|
| `var(--ease-out)` | Entry / appearance |
| `var(--ease-in)` | Exit / disappearance |
| `var(--ease-in-out)` | Most transitions |
| `var(--ease-spring)` | Playful interactions |

**MUST:** add `transition-colors`, `transition-all`, or scoped `transition-transform` on every interactive element.
**MUST:** respect `prefers-reduced-motion` — handled globally in `globals.css`, never override it.

---

### Breakpoints & Grid — MANDATORY

| Breakpoint | Min width | Columns | Gutter | Margin |
|---|---|---|---|---|
| Mobile | 360px | 4 | 16px | 16px |
| Tablet portrait | 768px | 8 | 20px | 20px |
| Tablet landscape | 1024px | 12 | 24px | 24px |
| Laptop | 1280px | 12 | 20px | 32px |
| Desktop | 1440px | 12 | 24px | 32px |
| Ultrawide | 1920px | 12 | 32px | 40px |

**MUST:** implement all breakpoints for any layout component.
**MUST:** use `sm:` (768px), `md:` (1024px), `lg:` (1280px), `xl:` (1440px) Tailwind prefixes mapped to the grid spec above.

---

## Icons — MANDATORY

All icons in GovAI use **Phosphor Icons** via the `<Icon>` component.

```tsx
import { Icon } from "@/components/ui/icon";

<Icon name="house" />
<Icon name="magnifying-glass" size={20} />
<Icon name="caret-down" weight="bold" />
```

**MUST:**
- Always use `<Icon name="..." />` — never import raw SVG or use `lucide-react`
- Pass `aria-hidden="true"` for decorative icons
- Pass `aria-label` for icon-only interactive elements
- Use sizes from the spacing scale: `16, 20, 24, 32px`

**NEVER:**
- Use `lucide-react`, `heroicons`, or any other icon library
- Inline SVG markup
- Emoji as icons

---

## Flags & Logos

### Country Flags
Flags are rendered using the GovAI flag registry via the Icon component — never use emoji flags or third-party flag libraries.

```tsx
<Icon name="flag-ae" />   // UAE
<Icon name="flag-us" />   // USA
```

### GovAI Logo
Always import the logo from the asset registry — never recreate it in CSS or inline SVG.

```tsx
import Logo from "@/components/brand/logo";

<Logo variant="full" />      // full logo with wordmark
<Logo variant="mark" />      // icon mark only
<Logo variant="wordmark" />  // wordmark only
```

Logo color adapts automatically via CSS variables — never override it.

---

## Mandatory Component Usage

**Rule:** If a primitive exists for the UI pattern you are building, you MUST use it. Never build a raw HTML equivalent.

The MCP server auto-detects all components via the GitHub API — any new `.tsx` file added to `src/components/ui/` is immediately available via `list_components` and `get_component(name)` without any manual update to this document or the server.

### Avatar
**Use for:** user profile pictures, initials, group representations
```tsx
import { Avatar } from "@/components/ui/avatar";
<Avatar src="/photo.jpg" alt="John" size="md" variant="default" />
<Avatar initials="JD" size="lg" variant="brand" />
```
Sizes: `sm` (32px) · `md` (40px) · `lg` (48px) — Never use raw `<img>` for avatars

---

### Badge
**Use for:** status labels, counts, category tags, notification indicators
```tsx
import { Badge } from "@/components/ui/badge";
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="neutral">Draft</Badge>
```
Never use `<span>` with custom styling for status indicators.

---

### Breadcrumb
**Use for:** navigation hierarchy on all pages deeper than level 1
```tsx
import { Breadcrumb } from "@/components/ui/breadcrumb";
<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Settings" }]} />
```
Always include breadcrumbs on second-level pages and deeper.

---

### Button
**Use for:** ALL clickable actions — primary, secondary, destructive, ghost, icon-only
```tsx
import { Button } from "@/components/ui/button";
<Button variant="primary" size="md">Submit</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="icon" aria-label="Settings">
  <Icon name="gear" />
</Button>
```
Sizes: `sm` · `md` · `lg` · `icon` — Variants: `primary` · `secondary` · `ghost` · `destructive` · `outline` · `link`
**NEVER** use raw `<button>` or `<a>` styled as a button.

---

### Card
**Use for:** content containers, feature sections, list items, dashboard panels
```tsx
import { Card } from "@/components/ui/card";
<Card padding="md" elevated>Content</Card>
```
Radius always `var(--radius-12)` — Never use raw `<div>` with manual border + shadow.

---

### Checkbox
**Use for:** multi-select options, boolean toggles in forms
```tsx
import { Checkbox } from "@/components/ui/checkbox";
<Checkbox id="agree" label="I agree to the terms" />
```
Always include a visible label. Never use raw `<input type="checkbox">`.

---

### Circular Progress
**Use for:** loading states, completion percentages, score indicators
```tsx
import { CircularProgress } from "@/components/ui/circular-progress";
<CircularProgress value={72} size="md" label="Progress" />
```

---

### Data Table
**Use for:** ALL tabular data — lists, records, reports
```tsx
import { DataTable } from "@/components/ui/data-table";
<DataTable columns={columns} data={rows} />
```
Never use raw `<table>` with custom styling. Always pair with `<Pagination>` for more than 10 rows.

---

### Date & Time Picker
**Use for:** all date/time inputs
```tsx
import { DateTimePicker } from "@/components/ui/date-time-picker";
<DateTimePicker label="Start date" mode="date" />
<DateTimePicker label="Meeting time" mode="datetime" />
```
Never use raw `<input type="date">` or `<input type="time">`.

---

### Dropdown
**Use for:** contextual menus, action menus, single-select when options are dynamic
```tsx
import { Dropdown } from "@/components/ui/dropdown";
<Dropdown trigger={<Button variant="secondary">Options</Button>}>
  <Dropdown.Item onSelect={() => {}}>Edit</Dropdown.Item>
  <Dropdown.Item onSelect={() => {}} destructive>Delete</Dropdown.Item>
</Dropdown>
```
Built on Radix UI — full keyboard navigation included.

---

### File Uploader
**Use for:** all file upload interactions
```tsx
import { FileUploader } from "@/components/ui/file-uploader";
<FileUploader accept=".pdf,.docx" maxSize={10} label="Upload document" />
```
Never use raw `<input type="file">` directly.

---

### Input
**Use for:** all single-line text inputs
```tsx
import { Input } from "@/components/ui/input";
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Search" leadingIcon="magnifying-glass" />
```
Always include a `label`. Never use raw `<input>`.

---

### Number Input
**Use for:** numeric values, quantities, counts
```tsx
import { NumberInput } from "@/components/ui/number-input";
<NumberInput label="Quantity" min={1} max={100} step={1} />
```
Never use `<Input type="number">` — always use this component.

---

### Pagination
**Use for:** any list or table longer than one page
```tsx
import { Pagination } from "@/components/ui/pagination";
<Pagination total={240} pageSize={20} currentPage={1} onChange={setPage} />
```
Always show for data tables with more than 10 rows.

---

### Progress Bar
**Use for:** linear progress, upload progress, multi-step completion
```tsx
import { ProgressBar } from "@/components/ui/progress-bar";
<ProgressBar value={65} label="Uploading..." />
<ProgressBar indeterminate label="Processing" />
```

---

### Radio
**Use for:** single-select from a visible list of options
```tsx
import { Radio } from "@/components/ui/radio";
<Radio.Group name="role" label="Select role">
  <Radio value="admin" label="Admin" />
  <Radio value="viewer" label="Viewer" />
</Radio.Group>
```
Never use raw `<input type="radio">`.

---

### Slider
**Use for:** range inputs, value selection within a min/max
```tsx
import { Slider } from "@/components/ui/slider";
<Slider min={0} max={100} step={5} label="Budget" />
```
Never use raw `<input type="range">`.

---

### Stepper
**Use for:** multi-step flows, wizards, onboarding sequences
```tsx
import { Stepper } from "@/components/ui/stepper";
<Stepper steps={["Details", "Review", "Confirm"]} currentStep={1} />
```

---

### Tabs
**Use for:** switching between views within the same page context
```tsx
import { Tabs } from "@/components/ui/tabs";
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">...</Tabs.Content>
  <Tabs.Content value="settings">...</Tabs.Content>
</Tabs>
```
Built on Radix UI — full keyboard navigation included.

---

### Textarea
**Use for:** multi-line text input
```tsx
import { Textarea } from "@/components/ui/textarea";
<Textarea label="Description" rows={4} placeholder="Enter details..." />
```
Always include a label. Never use raw `<textarea>`.

---

### Toast
**Use for:** all transient feedback — success, error, warning, info
```tsx
import { toast } from "@/components/ui/toast";
toast.success("Changes saved");
toast.error("Something went wrong");
toast.warning("Quota nearly reached");
toast.info("New version available");
```
Never use custom alert divs or inline success/error messages for transient feedback.

---

### Toggle
**Use for:** binary on/off settings that take effect immediately
```tsx
import { Toggle } from "@/components/ui/toggle";
<Toggle label="Enable notifications" defaultChecked />
```
Use Toggle (not Checkbox) for settings that take effect immediately. Never use raw `<input type="checkbox">` for toggle UIs.

---

### Tooltip
**Use for:** supplementary info on hover for icon-only buttons, truncated text, disabled elements
```tsx
import { Tooltip } from "@/components/ui/tooltip";
<Tooltip content="Delete this item">
  <Button variant="ghost" size="icon" aria-label="Delete">
    <Icon name="trash" />
  </Button>
</Tooltip>
```
Every icon-only button MUST have a Tooltip AND an `aria-label`.

---

## Auto-Sync: New Components

The GovAI MCP server (`govai-mcp`) **automatically detects new components** via the GitHub API. When a new `.tsx` file is added to `src/components/ui/`:

- `list_components` returns it immediately on the next call
- `get_component(name)` fetches its live source from GitHub
- `get_design_bundle` includes it in the full bundle automatically

**No manual updates needed anywhere.** Push to GitHub → instantly available in all AI tools.

The `govai-design-bundle.md` is also auto-regenerated via GitHub Actions on every push to `main`.

---

## Component Architecture

All components follow the **shadcn-pattern** (Radix UI + Tailwind + class-variance-authority) — hand-built, not installed via the shadcn CLI.

### Conventions

1. **File location:** `src/components/ui/{component-name}.tsx`
2. **First line:** `"use client";`
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
4. **Class composition:** always use `cn(...)` from `@/lib/utils`
5. **Forwarded refs:** use `forwardRef` for any component wrapping a native element
6. **Radix primitives:** use `@radix-ui/react-*` for accessibility-critical components

---

## Page-Level Layout Conventions

```tsx
<ComponentPreview heading="Button" code={`<Button>Click me</Button>`}>
  <Button>Click me</Button>
</ComponentPreview>

<DoDont do="Use semantic tokens" dont="Hardcode hex colors" />

<OnThisPage items={[{ id: "buttons", label: "Buttons" }]} />

<PropsTable props={[{ name: "variant", type: "string", default: "primary" }]} />
```

---

## Accessibility Requirements

1. **Keyboard navigation:** `Tab` to reach, `Enter`/`Space` to activate, arrow keys for menus/tabs
2. **Focus rings:** 2px ring using `--color-primary-500`, 2px offset — NEVER removed
3. **ARIA labels:** icon-only buttons need `aria-label`; inputs need `<label>` association
4. **Color contrast:** 4.5:1 normal text, 3:1 large text — in BOTH light AND dark modes
5. **Touch targets:** minimum 32px, recommended 36px for primary actions
6. **Screen readers:** decorative icons get `aria-hidden="true"`, meaningful icons get `aria-label`
7. **Motion:** `prefers-reduced-motion` handled globally in `globals.css` — never override
8. **RTL:** every component works in `dir="rtl"` — use logical properties
9. **Semantic HTML:** use `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>` correctly
10. **Error states:** form errors linked via `aria-describedby`, visible in both themes

---

## Anti-Patterns (NEVER DO)

### Colors
- ❌ `className="text-[#2463EB]"` → use `text-[var(--color-primary-600)]`
- ❌ Palette tokens for component theming → use semantic tokens
- ❌ `bg-blue-500`, `text-gray-700` → use CSS variable equivalents

### Spacing
- ❌ `p-3`, `p-5`, `gap-2.5` — not in the 4px scale
- ❌ `p-[13px]`, `mt-[7px]` — not in the scale

### Typography
- ❌ `text-base`, `text-lg`, `text-2xl`
- ❌ Font weights other than 400, 500, 600
- ❌ Any font family other than Instrument Sans

### Radius
- ❌ `rounded`, `rounded-md`, `rounded-lg`
- ❌ `rounded-[6px]`, `rounded-[10px]` — not in the radius scale

### Shadows
- ❌ `shadow-sm`, `shadow-md`, `shadow-lg`
- ❌ Custom `box-shadow` values

### Icons
- ❌ `import { Search } from "lucide-react"` → use `<Icon name="magnifying-glass" />`
- ❌ Inline `<svg>` markup
- ❌ Emoji as UI icons

### Components
- ❌ Raw `<button>` → `<Button>`
- ❌ Raw `<input>` → `<Input>` or `<NumberInput>`
- ❌ Raw `<textarea>` → `<Textarea>`
- ❌ Raw `<select>` → `<Dropdown>`
- ❌ Raw `<input type="checkbox">` → `<Checkbox>` or `<Toggle>`
- ❌ Raw `<input type="radio">` → `<Radio>`
- ❌ Raw `<input type="range">` → `<Slider>`
- ❌ Raw `<input type="date">` → `<DateTimePicker>`
- ❌ Raw `<img>` for avatars → `<Avatar>`
- ❌ Raw `<table>` → `<DataTable>`
- ❌ Custom alert/toast divs → `toast.success()` / `toast.error()`

### Accessibility
- ❌ `focus:outline-none` without a visible replacement ring
- ❌ Icon-only buttons without `aria-label`
- ❌ `onClick` on `<div>` without `role` and keyboard handler
- ❌ Color as the only visual differentiator

### Z-Index
- ❌ `z-10`, `z-50`, `z-[999]` → use the named z-index scale

---

## Working with This Design System Through AI

### Claude Code (MCP — recommended)
Register `govai-mcp` in `.mcp.json` and Claude will auto-call the tools:
- `get_design_principles` · `get_design_tokens` · `get_global_styles`
- `list_components` · `get_component(name)` · `get_design_bundle`

### Google AI Studio / Gemini
Paste `govai-design-bundle.md` into **System Instructions**. Auto-regenerated on every push to `main`.

### Other Tools (Cursor, Windsurf, ChatGPT)
- Design.md: `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/Design.md`
- tokens.ts: `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/src/lib/tokens.ts`
- globals.css: `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/src/app/globals.css`
- Full bundle: `https://raw.githubusercontent.com/kenavelino/govai-design-system/main/govai-design-bundle.md`

---

## Repository

- **Source:** https://github.com/kenavelino/govai-design-system
- **Live docs:** https://govai-design-system.kennediavelinowork.workers.dev
- **npm package:** https://www.npmjs.com/package/govai-mcp
- **Owner:** Kennedi Avelino, DGE
