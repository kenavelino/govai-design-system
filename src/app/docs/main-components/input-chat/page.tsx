"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type BubbleVariant = "default" | "cta";
type ChatBoxType = "default" | "attachment";
type Direction = "ltr" | "rtl";

// ─── ChatBubble Component ─────────────────────────────────────────────────────

function ChatBubble({
  variant = "default",
  dir = "ltr",
  message = "What are the key differences between React Server Components and Client Components?",
  onCancel,
  onSend,
  className,
}: {
  variant?: BubbleVariant;
  dir?: Direction;
  message?: string;
  onCancel?: () => void;
  onSend?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-12)] px-[20px] py-[12px]",
        className
      )}
      style={{
        background: "rgba(200,184,177,0.15)",
        boxShadow: "0px 10px 20px rgba(0,0,0,0.05)",
        direction: dir,
      }}
    >
      <p
        className="text-[18px] leading-[28px] text-[var(--text-primary)]"
        style={{ fontWeight: 400 }}
      >
        {message}
      </p>

      {variant === "cta" && (
        <div
          className={cn(
            "mt-[12px] flex gap-[8px]",
            dir === "rtl" ? "flex-row-reverse justify-end" : "justify-end"
          )}
        >
          <button
            onClick={onCancel}
            className="inline-flex h-[36px] items-center rounded-[var(--radius-8)] border border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[16px] text-[14px] font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="inline-flex h-[36px] items-center rounded-[var(--radius-8)] bg-[var(--color-primary-600)] px-[16px] text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-primary-700)]"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

// ─── FileChip Component ───────────────────────────────────────────────────────

function FileChip({ filename = "Project_Brief.pdf" }: { filename?: string }) {
  return (
    <div className="inline-flex items-center gap-[8px] rounded-[var(--radius-8)] border border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[12px] py-[8px]">
      <Icon
        name="file-text"
        className="h-[16px] w-[16px] shrink-0 text-[var(--color-primary-600)]"
        aria-hidden="true"
      />
      <span className="text-[13px] font-medium leading-[18px] text-[var(--text-primary)]">
        {filename}
      </span>
    </div>
  );
}

// ─── IconHolder Component ─────────────────────────────────────────────────────

function IconHolder({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-[32px] w-[32px] items-center justify-center rounded-[var(--radius-8)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary-600)]"
    >
      <Icon name={icon} className="h-[16px] w-[16px]" />
    </button>
  );
}

// ─── ChatBox Component ────────────────────────────────────────────────────────

function ChatBox({
  type = "default",
  dir = "ltr",
  message = "What are the key differences between React Server Components and Client Components?",
  filename,
  showActions = true,
  className,
}: {
  type?: ChatBoxType;
  dir?: Direction;
  message?: string;
  filename?: string;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[8px]",
        dir === "rtl" ? "items-start" : "items-end",
        className
      )}
      style={{ direction: dir }}
    >
      {type === "attachment" && filename && (
        <FileChip filename={filename} />
      )}

      <ChatBubble variant="default" dir={dir} message={message} />

      {showActions && (
        <div
          className={cn(
            "flex items-center gap-[4px]",
            dir === "rtl" ? "flex-row-reverse" : ""
          )}
        >
          <IconHolder icon="pencil" label="Edit message" />
          <IconHolder icon="copy" label="Copy message" />
          <IconHolder icon="trash-2" label="Delete message" />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "bubble-variants", title: "Bubble Variants", level: 2 },
  { id: "with-attachment", title: "With Attachment", level: 2 },
  { id: "directions", title: "RTL Support", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

const bubbleCode = `<ChatBubble
  variant="default"
  message="What are the key differences between React Server Components and Client Components?"
/>`;

const ctaBubbleCode = `<ChatBubble
  variant="cta"
  message="Would you like me to expand on this section?"
  onCancel={() => {}}
  onSend={() => {}}
/>`;

const chatBoxCode = `<ChatBox
  type="default"
  message="What are the key differences between React Server Components and Client Components?"
  showActions
/>`;

const attachmentCode = `<ChatBox
  type="attachment"
  filename="Project_Brief.pdf"
  message="Summarise the key points from this document."
  showActions
/>`;

const rtlCode = `<ChatBox
  dir="rtl"
  message="ما هي الاختلافات الرئيسية بين مكونات React Server و Client؟"
  showActions
/>`;

export default function InputChatPage() {
  const [bubbleVariant, setBubbleVariant] = useState<BubbleVariant>("default");
  const [chatBoxType, setChatBoxType] = useState<ChatBoxType>("default");

  return (
    <>
      {/* On this page — sticky rail */}
      <OnThisPage items={tocItems} />

      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-[48px]">
        {/* Header */}
        <div className="space-y-[12px]">
          <div className="flex items-center gap-[8px]">
            <span className="rounded-[var(--radius-4)] bg-[var(--color-primary-50)] px-[8px] py-[2px] text-[12px] font-medium text-[var(--color-primary-700)]">
              Main Component
            </span>
          </div>
          <h1 className="text-[32px] font-semibold leading-[40px] text-[var(--header-primary)]">
            Input Chat
          </h1>
          <p className="text-[16px] leading-[26px] text-[var(--text-secondary)]">
            The Input Chat component displays a user&apos;s message in a conversational
            interface. It supports multiple variants — a default read-only bubble, a CTA
            bubble with action buttons, and a chat box with inline editing controls.
            All variants support both LTR and RTL layouts.
          </p>
        </div>

        {/* Overview */}
        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Overview
          </h2>

          {/* Variant filter pills */}
          <div className="mt-[16px] flex flex-wrap gap-[8px]">
            {(["default", "cta"] as BubbleVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setBubbleVariant(v)}
                className={cn(
                  "rounded-full border px-[14px] py-[6px] text-[13px] font-medium transition-colors capitalize",
                  bubbleVariant === v
                    ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)] text-white"
                    : "border-[var(--stroke-primary)] bg-[var(--surface-default)] text-[var(--text-secondary)] hover:border-[var(--stroke-secondary)]"
                )}
              >
                {v === "cta" ? "CTA" : "Default"}
              </button>
            ))}
          </div>

          <div className="mt-[16px]">
            <ComponentPreview
              code={bubbleVariant === "default" ? bubbleCode : ctaBubbleCode}
            >
              <div className="flex w-full justify-end p-[24px]">
                <div className="w-full max-w-[560px]">
                  <ChatBubble variant={bubbleVariant} />
                </div>
              </div>
            </ComponentPreview>
          </div>
        </section>

        {/* Bubble Variants */}
        <section id="bubble-variants" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Bubble Variants
          </h2>

          {/* Default */}
          <div className="space-y-[12px]">
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Default
              </h3>
              <p className="mt-[4px] text-[14px] leading-[22px] text-[var(--text-secondary)]">
                Read-only display of a user&apos;s message. Used in completed conversation turns
                where no further editing is available.
              </p>
            </div>
            <ComponentPreview code={bubbleCode}>
              <div className="flex w-full justify-end p-[24px]">
                <div className="w-full max-w-[560px]">
                  <ChatBubble variant="default" />
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* CTA */}
          <div className="space-y-[12px]">
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                CTA (Call to Action)
              </h3>
              <p className="mt-[4px] text-[14px] leading-[22px] text-[var(--text-secondary)]">
                Displays Cancel and Send buttons below the message text. Used when the
                user is editing a message before re-submission, or confirming an action.
              </p>
            </div>
            <ComponentPreview code={ctaBubbleCode}>
              <div className="flex w-full justify-end p-[24px]">
                <div className="w-full max-w-[560px]">
                  <ChatBubble
                    variant="cta"
                    message="Would you like me to expand on this section?"
                  />
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Chat Box */}
          <div className="space-y-[12px]">
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Chat Box
              </h3>
              <p className="mt-[4px] text-[14px] leading-[22px] text-[var(--text-secondary)]">
                Wraps the bubble with a row of inline action icons — edit, copy, and delete —
                shown below the message for quick access once the turn is complete.
              </p>
            </div>
            <ComponentPreview code={chatBoxCode}>
              <div className="flex w-full justify-end p-[24px]">
                <div className="w-full max-w-[560px]">
                  <ChatBox type="default" />
                </div>
              </div>
            </ComponentPreview>
          </div>
        </section>

        {/* With Attachment */}
        <section id="with-attachment" className="space-y-[16px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            With Attachment
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            When a file is attached to a message, a document chip appears directly above the
            bubble, linking the file to its context. The chip respects the same directional
            layout as the bubble.
          </p>

          {/* Variant switcher */}
          <div className="flex flex-wrap gap-[8px]">
            {(["default", "attachment"] as ChatBoxType[]).map((t) => (
              <button
                key={t}
                onClick={() => setChatBoxType(t)}
                className={cn(
                  "rounded-full border px-[14px] py-[6px] text-[13px] font-medium transition-colors",
                  chatBoxType === t
                    ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)] text-white"
                    : "border-[var(--stroke-primary)] bg-[var(--surface-default)] text-[var(--text-secondary)] hover:border-[var(--stroke-secondary)]"
                )}
              >
                {t === "attachment" ? "With Attachment" : "Default"}
              </button>
            ))}
          </div>

          <ComponentPreview
            code={chatBoxType === "attachment" ? attachmentCode : chatBoxCode}
          >
            <div className="flex w-full justify-end p-[24px]">
              <div className="w-full max-w-[560px]">
                <ChatBox
                  type={chatBoxType}
                  filename="Project_Brief.pdf"
                  message={
                    chatBoxType === "attachment"
                      ? "Summarise the key points from this document."
                      : "What are the key differences between React Server Components and Client Components?"
                  }
                />
              </div>
            </div>
          </ComponentPreview>
        </section>

        {/* RTL Support */}
        <section id="directions" className="space-y-[16px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            RTL Support
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            All Input Chat variants support right-to-left text direction via the{" "}
            <code className="rounded-[var(--radius-4)] bg-[var(--surface-alt-tertiary)] px-[6px] py-[2px] text-[13px] font-mono">
              dir
            </code>{" "}
            prop. The bubble layout, action icons, and CTA buttons all mirror automatically.
          </p>

          <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
            <div className="space-y-[8px]">
              <p className="text-[13px] font-medium text-[var(--text-tertiary)]">
                LTR (Left-to-right)
              </p>
              <ComponentPreview code={chatBoxCode}>
                <div className="flex w-full justify-end p-[16px]">
                  <div className="w-full max-w-[320px]">
                    <ChatBox
                      dir="ltr"
                      message="What are the key differences between React Server Components and Client Components?"
                    />
                  </div>
                </div>
              </ComponentPreview>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[13px] font-medium text-[var(--text-tertiary)]">
                RTL (Right-to-left)
              </p>
              <ComponentPreview code={rtlCode}>
                <div className="flex w-full justify-start p-[16px]">
                  <div className="w-full max-w-[320px]">
                    <ChatBox
                      dir="rtl"
                      message="ما هي الاختلافات الرئيسية بين مكونات React Server و Client؟"
                    />
                  </div>
                </div>
              </ComponentPreview>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Right-align bubbles in LTR interfaces to distinguish user messages from AI responses",
              "Use the CTA variant only for the currently-editable message state",
              "Show the file chip above the bubble when a document is attached",
              "Match the dir prop to the document language for correct bidirectional rendering",
              "Include edit, copy, and delete actions on completed turns for message management",
            ]}
            dontItems={[
              "Don't show CTA buttons on historical, read-only messages",
              "Don't stack multiple file chips — use a count badge for multiple attachments",
              "Don't use the chat bubble for AI-generated response messages (use a separate component)",
              "Don't omit aria-label attributes from icon holder buttons",
              "Don't hard-code text direction — always derive it from the document or user locale",
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
                desc: "All action buttons (edit, copy, delete) are native <button> elements — fully reachable via Tab. CTA Cancel and Send buttons follow the same tab order as they appear visually.",
              },
              {
                title: "ARIA Labels",
                desc: 'Icon-only action buttons carry descriptive aria-label attributes: "Edit message", "Copy message", and "Delete message". These are announced correctly by screen readers without relying on the visual icon.',
              },
              {
                title: "Focus Rings",
                desc: "Icon holder buttons use focus-visible:outline with the brand primary colour, ensuring a clear focus indicator for keyboard users that does not appear on mouse click.",
              },
              {
                title: "Bidirectional Text",
                desc: "RTL layout is applied via the HTML dir attribute rather than CSS mirroring, ensuring correct bidirectional text segmentation and screen reader reading order in RTL locales.",
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
        <section id="api" className="space-y-[24px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>

          <div className="space-y-[8px]">
            <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
              ChatBubble
            </h3>
            <PropsTable
              props={[
                {
                  name: "variant",
                  type: '"default" | "cta"',
                  default: '"default"',
                  description: "Bubble variant. Use cta to show Cancel/Send action buttons.",
                },
                {
                  name: "dir",
                  type: '"ltr" | "rtl"',
                  default: '"ltr"',
                  description: "Text direction for bidirectional layout support.",
                },
                {
                  name: "message",
                  type: "string",
                  default: '""',
                  description: "The message text displayed inside the bubble.",
                },
                {
                  name: "onCancel",
                  type: "() => void",
                  description: "Callback fired when Cancel is clicked (cta variant only).",
                },
                {
                  name: "onSend",
                  type: "() => void",
                  description: "Callback fired when Send is clicked (cta variant only).",
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional CSS classes applied to the bubble wrapper.",
                },
              ]}
            />
          </div>

          <div className="space-y-[8px]">
            <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
              ChatBox
            </h3>
            <PropsTable
              props={[
                {
                  name: "type",
                  type: '"default" | "attachment"',
                  default: '"default"',
                  description: "Box type. attachment shows a file chip above the bubble.",
                },
                {
                  name: "dir",
                  type: '"ltr" | "rtl"',
                  default: '"ltr"',
                  description: "Text direction for bidirectional layout support.",
                },
                {
                  name: "message",
                  type: "string",
                  default: '""',
                  description: "The message text displayed inside the bubble.",
                },
                {
                  name: "filename",
                  type: "string",
                  description: "File name shown in the attachment chip (attachment type only).",
                },
                {
                  name: "showActions",
                  type: "boolean",
                  default: "true",
                  description: "Whether to show edit, copy, and delete icons below the bubble.",
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional CSS classes applied to the chat box wrapper.",
                },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
