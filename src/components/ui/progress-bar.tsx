"use client";

import { cn } from "@/lib/utils";

export type ProgressBarLabel = "none" | "right" | "bottom";

export interface ProgressBarProps {
  value?: number;
  label?: ProgressBarLabel;
  indeterminate?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function ProgressBar({
  value = 0,
  label = "none",
  indeterminate = false,
  className,
  "aria-label": ariaLabel = "Progress",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const pct = Math.round(clamped);

  const track = (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      aria-busy={indeterminate}
      aria-valuetext={indeterminate ? "Loading" : `${pct}%`}
      className="relative h-[8px] w-full overflow-hidden rounded-full bg-[var(--surface-alt-tertiary)]"
    >
      {indeterminate ? (
        <div className="absolute top-0 h-full w-[45%] animate-[progress-indeterminate_1.6s_ease-in-out_infinite] rounded-full bg-[var(--color-primary-600)]" />
      ) : (
        <div
          className="h-full rounded-full bg-[var(--color-primary-600)] transition-all duration-[var(--duration-slow)] ease-out"
          style={{ width: `${clamped}%` }}
        />
      )}
    </div>
  );

  if (label === "right") {
    return (
      <div className={cn("flex items-center gap-[8px]", className)}>
        <div className="flex-1">{track}</div>
        {!indeterminate && (
          <span className="w-[36px] shrink-0 text-right text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">
            {pct}%
          </span>
        )}
      </div>
    );
  }

  if (label === "bottom") {
    return (
      <div className={cn("flex flex-col gap-[6px]", className)}>
        {track}
        <span className="text-[12px] font-medium leading-[16px] text-[var(--text-secondary)]">
          {indeterminate ? "Loading…" : `${pct}%`}
        </span>
      </div>
    );
  }

  return <div className={cn(className)}>{track}</div>;
}
