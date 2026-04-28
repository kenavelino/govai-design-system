"use client";

import { forwardRef, useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ToggleSize = "sm" | "md";

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "checked" | "defaultChecked" | "onChange"
  > {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: ToggleSize;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

// Figma exact dimensions — sm: 36×20px, md: 44×24px
const TRACK_SIZE: Record<ToggleSize, string> = {
  sm: "h-[20px] w-[36px]",
  md: "h-[24px] w-[44px]",
};

// Thumb = track height minus 2×2px padding
const THUMB_SIZE: Record<ToggleSize, string> = {
  sm: "h-[16px] w-[16px]",
  md: "h-[20px] w-[20px]",
};

// Travel = track width − thumb width − left padding − right padding
const THUMB_ON: Record<ToggleSize, string> = {
  sm: "translate-x-[16px]",
  md: "translate-x-[20px]",
};

const LABEL_TEXT: Record<ToggleSize, string> = {
  sm: "text-[14px] leading-[20px]",
  md: "text-[16px] leading-[24px]",
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    size = "md",
    label,
    description,
    disabled = false,
    className,
    id,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? !!checked : false;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-start gap-[8px]",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        checked={isControlled ? isChecked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="peer sr-only"
        aria-checked={isChecked}
        {...rest}
      />

      {/* Track */}
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full p-[2px] transition-colors duration-[var(--duration-base)]",
          TRACK_SIZE[size],
          disabled
            ? isChecked
              ? "bg-[var(--color-primary-200)]"
              : "bg-[var(--surface-disabled)]"
            : isChecked
              ? "bg-[var(--color-primary-600)] group-hover:bg-[var(--color-primary-700)]"
              : "bg-[var(--stroke-secondary)] group-hover:bg-[var(--icon-alt-tertiary)]",
          !disabled &&
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary-500)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-default)]",
        )}
        aria-hidden="true"
      >
        {/* Thumb */}
        <span
          className={cn(
            "inline-block shrink-0 rounded-full shadow-[var(--shadow-elevation-1)] transition-transform duration-[var(--duration-base)]",
            THUMB_SIZE[size],
            isChecked ? THUMB_ON[size] : "translate-x-0",
            disabled ? "bg-[var(--color-neutral-0)]" : "bg-white",
          )}
        />
      </span>

      {(label || description) && (
        <span className="flex min-w-0 flex-col gap-[2px]">
          {label && (
            <span
              className={cn(
                "font-medium",
                LABEL_TEXT[size],
                disabled
                  ? "text-[var(--text-alt-tertiary)]"
                  : "text-[var(--header-primary)]",
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-[14px] font-normal leading-[20px]",
                disabled
                  ? "text-[var(--text-alt-tertiary)]"
                  : "text-[var(--text-secondary)]",
              )}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});
