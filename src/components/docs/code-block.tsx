"use client";

import { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/icon";

type Language =
  | "tsx"
  | "typescript"
  | "javascript"
  | "json"
  | "bash"
  | "css"
  | "markup";

interface CodeBlockProps {
  code: string;
  language?: Language;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  const prismTheme =
    mounted && resolvedTheme === "dark" ? themes.vsDark : themes.github;

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative overflow-hidden rounded-[12px] border border-[var(--stroke-primary)] shadow-[0_5px_8px_0_rgba(0,0,0,0.08)] ${className ?? ""}`}>
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
      <Highlight theme={prismTheme} code={code.trim()} language={language}>
        {({ className: cls, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${cls} !m-0 whitespace-pre-wrap break-words !border-0 bg-[var(--code-bg)] p-[24px] pr-[56px] text-[13px] leading-[20px]`}
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
  );
}
