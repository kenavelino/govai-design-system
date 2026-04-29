"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Badge } from "@/components/ui/badge";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "variants", title: "Variants", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

export default function ToastPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Toast
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Toasts provide brief, non-intrusive feedback about an operation. They appear temporarily and dismiss automatically, keeping the user informed without interrupting their workflow.
          </p>
        </div>

        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Overview</h2>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            Toasts are small notification messages that slide in from the edge of the screen, typically the bottom-right corner. They convey the result of an action (success, error, warning, or general info) and auto-dismiss after a configurable duration.
          </p>
          <div className="mt-5 rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px] flex flex-col gap-[12px] flex flex-col items-center">
            {[
              { label: "Default", bg: "var(--surface-primary)", border: "var(--stroke-primary)", icon: "info", iconColor: "var(--text-tertiary)", text: "Your session will expire in 5 minutes." },
              { label: "Success", bg: "var(--color-success-50)", border: "var(--color-success-300)", icon: "check", iconColor: "var(--color-success-600)", text: "Changes saved successfully." },
              { label: "Error", bg: "var(--color-error-50)", border: "var(--color-error-300)", icon: "x", iconColor: "var(--color-error-600)", text: "Failed to save. Please try again." },
              { label: "Warning", bg: "var(--color-warning-50)", border: "var(--color-warning-300)", icon: "alert", iconColor: "var(--color-warning-600)", text: "API rate limit is approaching." },
              { label: "Info", bg: "var(--color-info-50)", border: "var(--color-info-300)", icon: "info", iconColor: "var(--color-info-600)", text: "A new version is available." },
            ].map(t => (
              <div key={t.label} className="w-[380px] rounded-lg border px-4 py-3 flex items-start gap-[12px] shadow-[var(--shadow-elevation-1)]" style={{ backgroundColor: t.bg, borderColor: t.border }}>
                <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: t.iconColor }}>
                  <span className="text-[12px] font-semibold text-[var(--color-neutral-0)]">{t.icon === "check" ? "\u2713" : t.icon === "x" ? "\u2715" : t.icon === "alert" ? "!" : "i"}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium leading-[20px] text-[var(--text-primary)]">{t.label}</p>
                  <p className="mt-0.5 text-[12px] leading-[16px] text-[var(--text-tertiary)]">{t.text}</p>
                </div>
                <button className="mt-0.5 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5l-7 7m0-7l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="variants">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Variants</h2>
          <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Variant</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Background</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Border</th>
                  <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Default", "surface/primary", "stroke/primary", "General notifications and neutral messages."],
                  ["Success", "success/50", "success/300", "Successful operations — save, create, update confirmations."],
                  ["Error", "error/50", "error/300", "Failed operations — network errors, validation failures."],
                  ["Warning", "warning/50", "warning/300", "Cautionary notices — approaching limits, deprecated features."],
                  ["Info", "info/50", "info/300", "Informational updates — new features, version updates."],
                ].map(([variant, bg, border, use]) => (
                  <tr key={variant} className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--color-neutral-100)]">
                    <td className="px-[16px] py-[16px] leading-[20px] font-medium">{variant}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{bg}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{border}</td>
                    <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Usage Guidelines</h2>
          <DoDont
            doItems={[
              "Use toasts for brief, non-critical feedback about completed actions",
              "Keep messages concise — one or two sentences maximum",
              "Auto-dismiss success toasts after 4-5 seconds",
              "Allow error toasts to persist until manually dismissed",
              "Stack multiple toasts vertically with consistent spacing",
            ]}
            dontItems={[
              "Don't use toasts for critical errors that require user action — use a modal or inline alert",
              "Don't include complex interactions or forms inside toasts",
              "Don't show more than 3 toasts at once — queue additional ones",
              "Don't use toasts for information that the user needs to reference later",
              "Don't auto-dismiss error toasts — users may need time to read them",
            ]}
          />
        </section>

        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Accessibility</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { title: "Live Region", desc: "Toast containers use role='status' and aria-live='polite' so screen readers announce new toasts without interrupting the current reading flow. Error toasts use aria-live='assertive' for immediate announcement." },
              { title: "Dismiss Controls", desc: "Each toast includes a visible close button that is keyboard focusable. Pressing Escape dismisses the most recent toast." },
              { title: "Timing", desc: "Auto-dismiss timing is generous (minimum 5 seconds) to give users enough time to read. Users can pause auto-dismiss by hovering over or focusing on the toast." },
              { title: "Motion Sensitivity", desc: "Toast enter/exit animations respect the prefers-reduced-motion media query. When reduced motion is preferred, toasts appear and disappear without sliding." },
            ].map(a => (
              <div key={a.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{a.title}</h4>
                <p className="mt-1.5 text-[14px] leading-[20px] text-[var(--text-tertiary)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">API Reference</h2>
          <PropsTable
            props={[
              { name: "variant", type: '"default" | "success" | "error" | "warning" | "info"', default: '"default"', description: "Visual style of the toast" },
              { name: "title", type: "string", required: true, description: "Toast heading text" },
              { name: "description", type: "string", description: "Optional body text below the title" },
              { name: "duration", type: "number", default: "5000", description: "Auto-dismiss duration in milliseconds. Set to 0 for persistent toasts." },
              { name: "onDismiss", type: "() => void", description: "Callback when the toast is dismissed" },
              { name: "action", type: "{ label: string; onClick: () => void }", description: "Optional action button within the toast" },
              { name: "position", type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"bottom-right"', description: "Screen position for the toast stack" },
              { name: "closable", type: "boolean", default: "true", description: "Shows or hides the dismiss button" },
            ]}
          />
        </section>
      </div>
    </>
  );
}
