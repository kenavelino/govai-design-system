"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type IconWeight =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

export interface IconProps {
  name: string;
  weight?: IconWeight;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

// In-memory cache so we don't refetch SVGs during a session
const svgCache = new Map<string, string>();

function processSvg(raw: string): string {
  // Make colors inherit from CSS currentColor and let CSS control size
  return raw
    .replace(/stroke="#[0-9a-fA-F]{3,8}"/g, 'stroke="currentColor"')
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
    .replace(/\swidth="[^"]*"/g, "")
    .replace(/\sheight="[^"]*"/g, "");
}

export function Icon({
  name,
  weight = "regular",
  className,
  style,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: IconProps) {
  const key = `${weight}/${name}`;
  const [svg, setSvg] = useState<string | null>(svgCache.get(key) ?? null);

  useEffect(() => {
    if (svgCache.has(key)) {
      setSvg(svgCache.get(key)!);
      return;
    }
    let cancelled = false;
    fetch(`/icons/${weight}/${name}.svg`)
      .then((r) => r.text())
      .then((text) => {
        const normalized = processSvg(text);
        svgCache.set(key, normalized);
        if (!cancelled) setSvg(normalized);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [key, weight, name]);

  return (
    <span
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : (ariaHidden ?? true)}
      className={cn(
        "inline-flex h-[16px] w-[16px] shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full",
        className
      )}
      style={style}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
