"use client";

import { Icon } from "@/components/ui/icon";
import { useState } from "react";

interface ColorSwatchProps {
  name: string;
  value: string;
  token: string;
  textDark?: boolean;
}

export function ColorSwatch({ name, value, token, textDark = false }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="group w-full text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <div
        className="mb-2 flex h-16 items-end justify-between rounded-xl p-3 shadow-[var(--shadow-elevation-1)]"
        style={{ backgroundColor: value }}
      >
        <span
          className={`text-[12px] leading-[16px] font-medium opacity-0 transition-opacity group-hover:opacity-100 ${
            textDark ? "text-[var(--color-neutral-950)]" : "text-[var(--color-neutral-0)]"
          }`}
        >
          {copied ? <Icon name="check" className="h-4 w-4" /> : <Icon name="copy" className="h-4 w-4" />}
        </span>
      </div>
      <p className="text-[14px] leading-[20px] font-medium text-[var(--text-primary)]">{name}</p>
      <p className="text-[12px] font-mono text-[var(--text-tertiary)]">{value}</p>
      <p className="text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">{token}</p>
    </button>
  );
}

export function ColorPalette({
  title,
  colors,
}: {
  title: string;
  colors: { name: string; value: string; token: string; textDark?: boolean }[];
}) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{title}</h3>
      <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {colors.map((color) => (
          <ColorSwatch key={color.token} {...color} />
        ))}
      </div>
    </div>
  );
}
