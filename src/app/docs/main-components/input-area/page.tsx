"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type InputAreaState =
  | "default"
  | "document"
  | "restricted"
  | "image-loading"
  | "image"
  | "multi-image";

// ─── InputArea Component ──────────────────────────────────────────────────────

function InputArea({
  state = "default",
  value = "",
  onChange,
  model = "GPT-4.1",
  disclaimer = true,
  onSend,
  onAttach,
  className,
}: {
  state?: InputAreaState;
  value?: string;
  onChange?: (v: string) => void;
  model?: string;
  disclaimer?: boolean;
  onSend?: () => void;
  onAttach?: () => void;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholder =
    state === "image" || state === "image-loading" || state === "multi-image"
      ? "Describe these images in detail."
      : "Ask anything";

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className={cn("flex w-full flex-col gap-[8px]", className)}>
      {/* Restricted banner */}
      {state === "restricted" && (
        <div className="flex items-center justify-between rounded-[var(--radius-12)] bg-[var(--color-primary-50)] px-[16px] py-[10px]">
          <div className="flex items-center gap-[8px]">
            <Icon
              name="info"
              className="h-[16px] w-[16px] shrink-0 text-[var(--color-primary-600)]"
              aria-hidden="true"
            />
            <span className="text-[14px] font-medium leading-[20px] text-[var(--color-primary-700)]">
              This chat is limited to web search
            </span>
          </div>
          <button
            className="flex h-[24px] w-[24px] items-center justify-center rounded-[var(--radius-4)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)]"
            aria-label="Dismiss"
          >
            <Icon name="x" className="h-[14px] w-[14px]" />
          </button>
        </div>
      )}

      {/* Main container */}
      <div className="rounded-[var(--radius-20)] border border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[24px] py-[16px]">
        {/* Document chip */}
        {state === "document" && (
          <div className="mb-[16px]">
            <div className="inline-flex items-center gap-[10px] rounded-[var(--radius-12)] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] px-[12px] py-[8px]">
              <Icon
                name="file-doc"
                className="h-[20px] w-[20px] shrink-0 text-[var(--color-primary-600)]"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="text-[13px] font-medium leading-[18px] text-[var(--text-primary)]">
                  Document_name.xls
                </span>
                <span className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                  Spreadsheet
                </span>
              </div>
              <button
                className="ml-[4px] flex h-[18px] w-[18px] items-center justify-center rounded-[var(--radius-full)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)]"
                aria-label="Remove document"
              >
                <Icon name="x" className="h-[12px] w-[12px]" />
              </button>
            </div>
          </div>
        )}

        {/* Image previews */}
        {(state === "image-loading" ||
          state === "image" ||
          state === "multi-image") && (
          <div className="mb-[16px] flex gap-[8px]">
            {state === "image-loading" && (
              <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[var(--radius-8)] bg-[var(--surface-alt-tertiary)]">
                <button
                  className="absolute right-[-6px] top-[-6px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-alt-tertiary)] shadow-[var(--shadow-elevation-1)] text-[var(--text-tertiary)]"
                  aria-label="Remove image"
                >
                  <Icon name="x" className="h-[10px] w-[10px]" />
                </button>
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-[24px] w-[24px] animate-spin rounded-[var(--radius-full)] border-[3px] border-[var(--stroke-primary)] border-t-[var(--color-primary-600)]" />
                </div>
              </div>
            )}
            {state === "image" && (
              <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-[var(--radius-8)] bg-[var(--surface-alt-tertiary)]">
                <button
                  className="absolute right-[-6px] top-[-6px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-alt-tertiary)] shadow-[var(--shadow-elevation-1)] text-[var(--text-tertiary)]"
                  aria-label="Remove image"
                >
                  <Icon name="x" className="h-[10px] w-[10px]" />
                </button>
                <div className="flex h-full w-full items-center justify-center">
                  <Icon
                    name="image"
                    className="h-[32px] w-[32px] text-[var(--text-tertiary)]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            )}
            {state === "multi-image" &&
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[var(--radius-8)] bg-[var(--surface-alt-tertiary)]"
                >
                  {i === 1 && (
                    <button
                      className="absolute right-[-6px] top-[-6px] z-10 flex h-[18px] w-[18px] items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-alt-tertiary)] shadow-[var(--shadow-elevation-1)] text-[var(--text-tertiary)]"
                      aria-label="Remove image"
                    >
                      <Icon name="x" className="h-[10px] w-[10px]" />
                    </button>
                  )}
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon
                      name="image"
                      className="h-[24px] w-[24px] text-[var(--text-tertiary)]"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Input row */}
        <div className="flex items-end justify-between gap-[8px]">
          {/* Left: textarea + add button */}
          <div className="flex min-w-0 flex-1 flex-col gap-[24px]">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              rows={1}
              aria-label="Message input"
              className="w-full resize-none bg-transparent text-[18px] font-normal leading-[28px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
              style={{ overflow: "hidden" }}
            />
            <div className="flex items-center gap-[12px]">
              <button
                onClick={onAttach}
                aria-label="Add attachment"
                className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--surface-alt-tertiary)] transition-colors hover:bg-[var(--stroke-primary)]"
              >
                <Icon name="plus" className="h-[24px] w-[24px] text-[var(--text-primary)]" />
              </button>
            </div>
          </div>

          {/* Right: model selector + mic + send */}
          <div className="flex shrink-0 items-center gap-[8px]">
            <button
              className="flex items-center gap-[4px] rounded-[var(--radius-12)] px-[2px] py-[8px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
              aria-label={`Switch AI model, current: ${model}`}
            >
              <span className="whitespace-nowrap text-[16px] font-medium leading-[24px]">
                {model}
              </span>
              <Icon name="caret-down" className="h-[24px] w-[24px]" aria-hidden="true" />
            </button>

            <button
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[var(--radius-full)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
              aria-label="Voice input"
            >
              <Icon name="microphone" className="h-[20px] w-[20px]" />
            </button>

            <button
              onClick={onSend}
              aria-label="Send message"
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[var(--radius-12)] bg-[var(--color-primary-600)] transition-colors hover:bg-[var(--color-primary-700)]"
            >
              <Icon
                name="arrow-up"
                className="h-[20px] w-[20px] text-[var(--color-neutral-0)]"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      {disclaimer && (
        <p className="text-center text-[14px] leading-[20px] text-[var(--text-tertiary)]">
          GovGPT can make mistakes. Please verify important details.
        </p>
      )}
    </div>
  );
}

// ─── Interactive Demo ─────────────────────────────────────────────────────────

const STATE_OPTIONS: { value: InputAreaState; label: string }[] = [
  { value: "default",       label: "Default" },
  { value: "document",      label: "Document attached" },
  { value: "restricted",    label: "Restricted" },
  { value: "image-loading", label: "Image uploading" },
  { value: "image",         label: "Image" },
  { value: "multi-image",   label: "Multi-image" },
];

function InteractiveDemo() {
  const [state, setState] = useState<InputAreaState>("default");
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full flex-col gap-[20px]">
      {/* State picker */}
      <div className="flex flex-wrap gap-[8px]">
        {STATE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setState(opt.value)}
            className={cn(
              "rounded-[var(--radius-full)] border px-[12px] py-[6px] text-[13px] font-medium leading-[20px] transition-colors",
              state === opt.value
                ? "border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]"
                : "border-[var(--stroke-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-alt-tertiary)]"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <InputArea
        state={state}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

// ─── Code snippets ────────────────────────────────────────────────────────────

const defaultCode = `<InputArea
  placeholder="Ask anything"
  model="GPT-4.1"
  disclaimer
  onSend={() => console.log("send")}
  onAttach={() => console.log("attach")}
/>`;

const documentCode = `<InputArea
  state="document"
  model="GPT-4.1"
  disclaimer
/>`;

const restrictedCode = `<InputArea
  state="restricted"
  model="GPT-4.1"
  disclaimer
/>`;

const imageCode = `// Single image
<InputArea state="image" model="GPT-4.1" />

// Image uploading
<InputArea state="image-loading" model="GPT-4.1" />

// Multiple images
<InputArea state="multi-image" model="GPT-4.1" />`;

// ─── TOC ──────────────────────────────────────────────────────────────────────

const tocItems = [
  { id: "overview",    title: "Overview",          level: 2 },
  { id: "default",     title: "Default",           level: 2 },
  { id: "document",    title: "Document attached", level: 2 },
  { id: "restricted",  title: "Restricted",        level: 2 },
  { id: "images",      title: "Image previews",    level: 2 },
  { id: "usage",       title: "Usage Guidelines",  level: 2 },
  { id: "accessibility","title": "Accessibility",  level: 2 },
  { id: "api",         title: "API Reference",     level: 2 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InputAreaPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">

        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Input Area
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The primary chat input component for AI interfaces. Supports text, file attachments, image uploads, model selection, and voice input — with contextual states for restrictions and upload progress.
          </p>
        </div>

        {/* Interactive overview */}
        <section id="overview">
          <ComponentPreview heading="Overview" code={defaultCode}>
            <div className="w-full max-w-[640px]">
              <InteractiveDemo />
            </div>
          </ComponentPreview>
        </section>

        {/* Default */}
        <section id="default">
          <ComponentPreview
            heading="Default"
            description="The resting state. Textarea accepts freeform text; the bottom toolbar provides attachment, model selection, voice, and send controls."
            code={defaultCode}
          >
            <div className="w-full max-w-[640px]">
              <InputArea />
            </div>
          </ComponentPreview>
        </section>

        {/* Document attached */}
        <section id="document">
          <ComponentPreview
            heading="Document attached"
            description="A file chip appears above the textarea when a document has been uploaded. The chip shows the filename, type, and a remove button."
            code={documentCode}
          >
            <div className="w-full max-w-[640px]">
              <InputArea state="document" />
            </div>
          </ComponentPreview>
        </section>

        {/* Restricted */}
        <section id="restricted">
          <ComponentPreview
            heading="Restricted"
            description="A dismissable info banner appears above the input when the agent's capabilities are limited — for example, web search only."
            code={restrictedCode}
          >
            <div className="w-full max-w-[640px]">
              <InputArea state="restricted" />
            </div>
          </ComponentPreview>
        </section>

        {/* Image previews */}
        <section id="images">
          <ComponentPreview
            heading="Image previews"
            description="Image thumbnails appear above the textarea after an image is selected. Uploading shows a spinner; complete shows a thumbnail; multiple images show a row of thumbnails."
            code={imageCode}
          >
            <div className="flex w-full max-w-[640px] flex-col gap-[32px]">
              <div>
                <p className="mb-[12px] text-[13px] font-medium leading-[20px] text-[var(--text-tertiary)]">
                  Uploading
                </p>
                <InputArea state="image-loading" disclaimer={false} />
              </div>
              <div>
                <p className="mb-[12px] text-[13px] font-medium leading-[20px] text-[var(--text-tertiary)]">
                  Single image
                </p>
                <InputArea state="image" disclaimer={false} />
              </div>
              <div>
                <p className="mb-[12px] text-[13px] font-medium leading-[20px] text-[var(--text-tertiary)]">
                  Multiple images
                </p>
                <InputArea state="multi-image" />
              </div>
            </div>
          </ComponentPreview>
        </section>

        {/* Usage Guidelines */}
        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Place the Input Area at the bottom of the chat viewport",
              "Show the restriction banner when agent scope is limited",
              "Auto-grow the textarea to fit the user's message",
              "Use the disclaimer text below the input in all public-facing AI interfaces",
              "Display file/image chips inline inside the container before the textarea",
            ]}
            dontItems={[
              "Don't hide the disclaimer text in production AI interfaces",
              "Don't use Input Area for non-AI search or form submission",
              "Don't disable the send button without a visible explanation",
              "Don't stack multiple Input Area components on the same screen",
              "Don't remove the model selector without replacing it with an equivalent control",
            ]}
          />
        </section>

        {/* Accessibility */}
        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Accessibility
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "Keyboard Navigation",
                desc: "The textarea is the natural focus target. Tab moves through attachment, model, voice, and send controls. Enter inside the textarea inserts a newline; Shift+Enter or a dedicated send shortcut can be configured to submit.",
              },
              {
                title: "ARIA Labels",
                desc: "All icon-only buttons (add attachment, microphone, send) carry aria-label attributes. The textarea uses aria-label='Message input'. The model selector describes its current value in its aria-label.",
              },
              {
                title: "Focus Management",
                desc: "After sending a message, focus returns to the textarea automatically. The restriction banner's dismiss button is keyboard accessible and focuses the next logical element when activated.",
              },
              {
                title: "Color Contrast",
                desc: "Placeholder text uses --text-tertiary which meets WCAG AA 4.5:1 against --surface-default. The send button blue (#2463EB) on white icon meets 4.5:1.",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-[var(--radius-8)] border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {a.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <PropsTable
            props={[
              {
                name: "state",
                type: '"default" | "document" | "restricted" | "image-loading" | "image" | "multi-image"',
                default: '"default"',
                description: "Visual state of the input area",
              },
              {
                name: "value",
                type: "string",
                default: '""',
                description: "Controlled textarea value",
              },
              {
                name: "onChange",
                type: "(value: string) => void",
                description: "Called when the textarea value changes",
              },
              {
                name: "model",
                type: "string",
                default: '"GPT-4.1"',
                description: "Model name displayed in the selector",
              },
              {
                name: "disclaimer",
                type: "boolean",
                default: "true",
                description: 'Show the "GovGPT can make mistakes" disclaimer',
              },
              {
                name: "onSend",
                type: "() => void",
                description: "Called when the send button is clicked",
              },
              {
                name: "onAttach",
                type: "() => void",
                description: "Called when the attachment (+) button is clicked",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes applied to the root element",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
