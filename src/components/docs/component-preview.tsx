"use client";

import { Icon } from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  heading?: string;
  description?: string;
}

export function ComponentPreview({
  children,
  code,
  heading,
  description,
}: ComponentPreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prismTheme =
    mounted && resolvedTheme === "dark" ? themes.vsDark : themes.github;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => setTab(v as "preview" | "code")}
    >
      <div className="flex items-center justify-between gap-[12px]">
        {(heading || description) && (
          <div className="min-w-0 flex-1">
            {heading && (
              <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
                {heading}
              </h2>
            )}
            {description && (
              <p className={`${heading ? "mt-1" : ""} text-[16px] leading-[24px] text-[var(--text-tertiary)]`}>
                {description}
              </p>
            )}
          </div>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-[8px]">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <div className="mt-[12px] rounded-[20px] border border-[var(--stroke-primary)] bg-[var(--preview-frame-bg)] p-[8px]">
        <TabsContent value="preview" className="mt-0">
          <div className="flex min-h-[320px] items-center justify-center gap-[12px] overflow-hidden rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px] shadow-[0_5px_8px_0_rgba(0,0,0,0.08)]">
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <div className="relative overflow-hidden rounded-[12px] border border-[var(--stroke-primary)] shadow-[0_5px_8px_0_rgba(0,0,0,0.08)]">
            <button
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy code"}
              className="absolute right-[12px] top-[12px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-[6px] bg-[var(--code-bg)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
            >
              {copied ? (
                <Icon name="check" className="h-[16px] w-[16px] text-[var(--color-success-600)]" />
              ) : (
                <Icon name="copy" className="h-[16px] w-[16px]" />
              )}
            </button>
            <Highlight theme={prismTheme} code={code.trim()} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} !m-0 min-h-[320px] whitespace-pre-wrap break-words !border-0 bg-[var(--code-bg)] p-[24px] pr-[56px] text-[13px] leading-[20px]`}
                  style={{ ...style, background: "var(--code-bg)" }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
