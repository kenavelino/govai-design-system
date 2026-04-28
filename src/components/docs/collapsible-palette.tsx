"use client";

import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CollapsibleShade {
  shade: string; // e.g. "600"
  value: string; // e.g. "#2463EB"
  token: string; // e.g. "primary/600"
}

function shouldUseLightText(hex: string): boolean {
  // Parse #RRGGBB
  const h = hex.replace("#", "");
  if (h.length !== 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Relative luminance (WCAG formula)
  const srgb = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  return L < 0.5;
}

interface CollapsiblePaletteProps {
  title: string;
  shades: CollapsibleShade[];
  defaultShade?: string;
  titleSize?: "sm" | "lg";
}

export function CollapsiblePalette({
  title,
  shades,
  defaultShade = "600",
  titleSize = "sm",
}: CollapsiblePaletteProps) {
  const hasDefault = shades.some((s) => s.shade === defaultShade);
  const initial = hasDefault ? defaultShade : shades[Math.floor(shades.length / 2)].shade;
  const [expanded, setExpanded] = useState<string>(initial);
  const [copied, setCopied] = useState<string>("");

  const handleCopy = (e: React.MouseEvent, value: string, shade: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(shade);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div>
      <h3
        className={cn(
          "mb-[12px] text-[var(--header-primary)]",
          titleSize === "lg"
            ? "text-[18px] font-semibold leading-[24px]"
            : "text-[16px] font-medium leading-[24px]"
        )}
      >
        {title}
      </h3>
      <div
        className="flex flex-col gap-[4px] overflow-hidden rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] p-[8px] sm:h-[176px] sm:flex-row"
        role="list"
      >
        {shades.map((s) => {
          const isOpen = expanded === s.shade;
          const lightText = shouldUseLightText(s.value);
          const textColor = lightText ? "#FAFAFA" : "#0A0A0B";
          const subTextColor = lightText ? "rgba(250,250,250,0.75)" : "rgba(10,10,11,0.65)";
          return (
            <div
              key={s.shade}
              role="button"
              tabIndex={0}
              onClick={() => setExpanded(s.shade)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded(s.shade);
                }
              }}
              aria-expanded={isOpen}
              aria-label={`${s.token} ${s.value}`}
              className={cn(
                "relative flex min-h-[56px] cursor-pointer items-end overflow-hidden rounded-[8px] p-[12px] text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[flex-grow]",
                "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]",
                isOpen
                  ? "sm:flex-[4] sm:min-w-[220px]"
                  : "sm:flex-1 sm:min-w-[36px] sm:hover:flex-[1.4]"
              )}
              style={{ backgroundColor: s.value, color: textColor }}
            >
              {isOpen ? (
                <div className="flex w-full items-end justify-between gap-[12px]">
                  <div className="min-w-0">
                    <div
                      className="text-[12px] leading-[16px]"
                      style={{ color: subTextColor }}
                    >
                      {s.token.charAt(0).toUpperCase() + s.token.slice(1)}
                    </div>
                    <div
                      className="text-[20px] font-semibold leading-[28px]"
                      style={{ color: textColor }}
                    >
                      {s.shade}
                    </div>
                    <div
                      className="font-mono text-[12px] leading-[16px]"
                      style={{ color: subTextColor }}
                    >
                      {s.value.toUpperCase()}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, s.value, s.shade)}
                    aria-label={`Copy ${s.value}`}
                    className={cn(
                      "flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[6px] transition-colors",
                      lightText
                        ? "hover:bg-white/15"
                        : "hover:bg-black/10"
                    )}
                    style={{ color: textColor }}
                  >
                    {copied === s.shade ? (
                      <Icon name="check" className="h-[16px] w-[16px]" />
                    ) : (
                      <Icon name="copy" className="h-[16px] w-[16px]" />
                    )}
                  </button>
                </div>
              ) : (
                <span
                  className="text-[12px] font-medium leading-[16px]"
                  style={{ color: textColor }}
                >
                  {s.shade}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
