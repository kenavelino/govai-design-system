"use client";

import { Icon } from "@/components/ui/icon";
import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "installation", title: "Installation", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
  { id: "component-usage", title: "Component Usage", level: 2 },
  { id: "theming", title: "Theming", level: 2 },
  { id: "customization", title: "Customization", level: 2 },
  { id: "typescript", title: "TypeScript", level: 2 },
  { id: "project-structure", title: "Project Structure", level: 2 },
];

export default function DevelopersPage() {
  return (
    <>
      <OnThisPage items={tocItems} />

      <div className="space-y-[24px]">
        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Developer Guide
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Everything you need to install, configure, and build with the GovAI
            Design System. This guide covers setup, component usage, theming,
            customization, and TypeScript integration.
          </p>
        </div>

        {/* Installation */}
        <section id="installation">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Installation
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System is distributed as an npm package. Install it
            alongside its peer dependencies to get started.
          </p>

          <div className="mt-5 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                1. Install the package
              </h4>
              <pre className="mt-3">
                <code>{`npm install @govai/design-system`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                2. Install peer dependencies
              </h4>
              <pre className="mt-3">
                <code>{`npm install react react-dom next tailwindcss next-themes lucide-react`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                3. Import the global styles
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Add the design system stylesheet to your root layout or global
                CSS file.
              </p>
              <pre className="mt-3">
                <code>{`// app/layout.tsx
import "@govai/design-system/styles.css";`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                4. Configure Tailwind CSS
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Extend your Tailwind config to include the design system preset.
              </p>
              <pre className="mt-3">
                <code>{`// tailwind.config.ts
import type { Config } from "tailwindcss";
import govaiPreset from "@govai/design-system/tailwind-preset";

const config: Config = {
  presets: [govaiPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@govai/design-system/**/*.{js,jsx}",
  ],
};

export default config;`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section id="quick-start">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Quick Start
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Once installed, you can start using GovAI components immediately.
            Here is a minimal example of a page using the design system.
          </p>

          <pre className="mt-5">
            <code>{`import { Button } from "@govai/design-system/components/button";
import { Input } from "@govai/design-system/components/input";
import { Card } from "@govai/design-system/components/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-[420px] p-8">
        <h1 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
          Sign in
        </h1>
        <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-secondary)]">
          Enter your credentials to access GovAI Hub.
        </p>

        <div className="mt-6 flex flex-col gap-[12px]">
          <Input label="Email" type="email" placeholder="you@gov.ai" />
          <Input label="Password" type="password" />
          <Button className="w-full">Sign in</Button>
        </div>
      </Card>
    </div>
  );
}`}</code>
          </pre>
        </section>

        {/* Component Usage */}
        <section id="component-usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Component Usage
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Components are imported individually from the design system package.
            Each component is tree-shakeable and ships with full TypeScript
            types.
          </p>

          <div className="mt-5 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Importing Components
              </h4>
              <pre className="mt-3">
                <code>{`// Import individual components
import { Button } from "@govai/design-system/components/button";
import { Badge } from "@govai/design-system/components/badge";
import { Dialog } from "@govai/design-system/components/dialog";
import { Table } from "@govai/design-system/components/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@govai/design-system/components/tabs";`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Using Variants
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Most components support a{" "}
                <code className="!text-[12px]">variant</code> prop for visual
                variations.
              </p>
              <pre className="mt-3">
                <code>{`<Button variant="primary">Save changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Learn more</Button>

<Badge variant="brand">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Composing Components
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Components are designed to compose together. Build complex UI
                from simple primitives.
              </p>
              <pre className="mt-3">
                <code>{`import { Card } from "@govai/design-system/components/card";
import { Badge } from "@govai/design-system/components/badge";
import { Button } from "@govai/design-system/components/button";

function KPITile({ label, value, trend }: KPITileProps) {
  return (
    <Card className="p-5">
      <p className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">{label}</p>
      <p className="mt-1 text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
        {value}
      </p>
      <Badge variant={trend > 0 ? "success" : "error"} className="mt-2">
        {trend > 0 ? "+" : ""}{trend}%
      </Badge>
    </Card>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Theming */}
        <section id="theming">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Theming
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System supports light and dark mode out of the box
            using CSS custom properties and the{" "}
            <code className="!text-[12px]">next-themes</code> library.
          </p>

          <div className="mt-5 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Setting Up Theme Provider
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Wrap your application root with the{" "}
                <code className="!text-[12px]">ThemeProvider</code> from
                next-themes to enable theme switching.
              </p>
              <pre className="mt-3">
                <code>{`// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                CSS Custom Properties
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                All design tokens are exposed as CSS custom properties. They
                automatically switch values based on the active theme.
              </p>
              <pre className="mt-3">
                <code>{`/* Light mode (default) */
:root {
  --header-primary: #0A0A0B;
  --text-secondary: #3B3B3C;
  --text-tertiary: #666666;
  --surface-tertiary: #F7F7F7;
  --stroke-primary: #EAEAEA;
  --color-primary-600: #2463EB;
  --color-primary-700: #1D58D8;
}

/* Dark mode */
.dark {
  --header-primary: #F5F5F5;
  --text-secondary: #A1A1A1;
  --text-tertiary: #8A8A8A;
  --surface-tertiary: #1A1A1A;
  --stroke-primary: #2A2A2A;
  --color-primary-600: #4B83F0;
  --color-primary-700: #6B9DF5;
}`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Using the Theme Hook
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Access and toggle the current theme programmatically using the{" "}
                <code className="!text-[12px]">useTheme</code> hook.
              </p>
              <pre className="mt-3">
                <code>{`"use client";

import { useTheme } from "next-themes";
import { Button } from "@govai/design-system/components/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Icon name="sun" className="h-5 w-5" /> : <Icon name="moon" className="h-5 w-5" />}
    </Button>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Customization */}
        <section id="customization">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Customization
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            While the design system provides sensible defaults, you can extend
            and customize tokens to match specific product requirements.
          </p>

          <div className="mt-5 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Extending Design Tokens
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Override or extend CSS custom properties in your global
                stylesheet to customize the design system tokens.
              </p>
              <pre className="mt-3">
                <code>{`/* globals.css — override tokens for your product */
:root {
  /* Override primary color for a different brand */
  --color-primary-50: #F0F7FF;
  --color-primary-100: #E0EFFE;
  --color-primary-600: #1570CD;
  --color-primary-700: #1261B5;

  /* Add custom semantic tokens */
  --surface-ai-response: #F8FAFF;
  --text-ai-generated: #4B6BFF;
}`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Adding Component Variants
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Extend the built-in variant system using the{" "}
                <code className="!text-[12px]">cva</code> (class-variance-authority)
                pattern.
              </p>
              <pre className="mt-3">
                <code>{`import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)]",
        secondary: "border border-[var(--stroke-primary)] hover:bg-[var(--surface-tertiary)]",
        // Add your custom variant
        ai: "bg-gradient-to-r from-[var(--color-primary-600)] to-purple-600 text-white",
      },
      size: {
        sm: "h-8 px-3 text-[14px]",
        md: "h-10 px-4 text-[14px]",
        lg: "h-12 px-6 text-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Tailwind Preset Extension
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Extend the GovAI Tailwind preset with additional utilities,
                colors, or breakpoints.
              </p>
              <pre className="mt-3">
                <code>{`// tailwind.config.ts
import govaiPreset from "@govai/design-system/tailwind-preset";

const config = {
  presets: [govaiPreset],
  theme: {
    extend: {
      colors: {
        "ai-purple": {
          50: "#FAF5FF",
          600: "#9333EA",
          700: "#7E22CE",
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
};`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* TypeScript */}
        <section id="typescript">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            TypeScript
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System is written in TypeScript and exports full
            type definitions for every component, variant, and utility. This
            enables IntelliSense, autocompletion, and compile-time type checking
            in your editor.
          </p>

          <div className="mt-5 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Type Exports
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Import component prop types for use in your own components and
                wrappers.
              </p>
              <pre className="mt-3">
                <code>{`import type { ButtonProps } from "@govai/design-system/components/button";
import type { BadgeProps } from "@govai/design-system/components/badge";
import type { InputProps } from "@govai/design-system/components/input";
import type { DialogProps } from "@govai/design-system/components/dialog";

// Use types in your custom components
interface ActionBarProps {
  primaryAction: ButtonProps;
  secondaryAction?: ButtonProps;
  status: BadgeProps["variant"];
}`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                IntelliSense Support
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                All components provide full autocomplete for props, variants,
                and event handlers. Your editor will show available options as
                you type.
              </p>
              <pre className="mt-3">
                <code>{`// Your editor will autocomplete variant options:
// "primary" | "secondary" | "destructive" | "ghost" | "link"
<Button variant="primary" />

// Size autocomplete:
// "sm" | "md" | "lg" | "icon"
<Button size="md" />

// Full event handler types are inferred:
<Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
  // e is fully typed
}} />`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Strict Mode Compatibility
              </h4>
              <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                The design system is fully compatible with TypeScript strict
                mode. Ensure your{" "}
                <code className="!text-[12px]">tsconfig.json</code> includes
                the following for the best experience.
              </p>
              <pre className="mt-3">
                <code>{`{
  "compilerOptions": {
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"],
      "@govai/design-system/*": ["./node_modules/@govai/design-system/dist/*"]
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section id="project-structure">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Project Structure
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System follows a clear, modular structure. Understanding this layout helps you navigate the codebase and contribute effectively.
          </p>

          <pre className="mt-5">
            <code>{`@govai/design-system/
├── components/
│   ├── ui/                    # Core UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   └── patterns/              # Composed UI patterns
│       ├── auth-form.tsx
│       ├── data-table.tsx
│       ├── kpi-tile.tsx
│       └── ...
├── lib/
│   ├── tokens.ts              # Token values as JS constants
│   ├── utils.ts               # Utility functions (cn, etc.)
│   └── hooks/                 # Shared React hooks
│       ├── use-media-query.ts
│       └── use-debounce.ts
├── styles/
│   ├── globals.css            # CSS custom properties & base styles
│   ├── tokens.css             # Token definitions (light + dark)
│   └── components.css         # Component-level styles
├── tailwind-preset.ts         # Tailwind CSS preset config
├── types/
│   └── index.d.ts             # Shared TypeScript type exports
└── package.json`}</code>
          </pre>

          <div className="mt-6 grid gap-[12px] md:grid-cols-2">
            {[
              {
                title: "components/ui/",
                desc: "Core UI primitives — buttons, inputs, badges, dialogs, and other atomic components. Each file exports a single component with its variants.",
              },
              {
                title: "components/patterns/",
                desc: "Higher-level compositions that combine multiple primitives into reusable patterns like data tables, auth forms, and KPI tiles.",
              },
              {
                title: "lib/",
                desc: "Shared utilities, token constants, and custom React hooks used across the design system and consumer applications.",
              },
              {
                title: "styles/",
                desc: "CSS files containing token definitions, base styles, and component-level CSS. These are the foundation for the theming system.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  <code className="!text-[14px]">{item.title}</code>
                </h4>
                <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
