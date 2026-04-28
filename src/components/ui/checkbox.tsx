"use client";

import { forwardRef, useId, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "checked" | "defaultChecked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

const BOX_SIZE: Record<CheckboxSize, string> = {
  sm: "h-[16px] w-[16px]",
  md: "h-[20px] w-[20px]",
};

const ICON_SIZE: Record<CheckboxSize, string> = {
  sm: "h-[10px] w-[10px]",
  md: "h-[12px] w-[12px]",
};

const LABEL_TEXT: Record<CheckboxSize, string> = {
  sm: "text-[14px] leading-[20px]",
  md: "text-[16px] leading-[24px]",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked,
    indeterminate = false,
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
  const isChecked = isControlled ? checked : undefined;

  const control = (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-[4px] border transition-colors",
        BOX_SIZE[size],
        disabled
          ? "border-[var(--stroke-primary)] bg-[var(--surface-disabled)]"
          : (isChecked || indeterminate)
            ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)]"
            : "border-[var(--stroke-primary)] bg-[var(--surface-default)] group-hover:border-[var(--color-primary-600)]",
        !disabled && "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary-500)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-default)]",
      )}
      aria-hidden="true"
    >
      {indeterminate ? (
        <Icon
          name="minus"
          weight="bold"
          className={cn(ICON_SIZE[size], disabled ? "text-[var(--text-alt-tertiary)]" : "text-white")}
        />
      ) : isChecked ? (
        <Icon
          name="check"
          weight="bold"
          className={cn(ICON_SIZE[size], disabled ? "text-[var(--text-alt-tertiary)]" : "text-white")}
        />
      ) : null}
    </span>
  );

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
        checked={isControlled ? !!isChecked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="peer sr-only"
        aria-checked={indeterminate ? "mixed" : undefined}
        {...rest}
      />
      {control}
      {(label || description) && (
        <span className="flex min-w-0 flex-col gap-[2px]">
          {label && (
            <span
              className={cn(
                "font-medium",
                LABEL_TEXT[size],
                disabled ? "text-[var(--text-alt-tertiary)]" : "text-[var(--header-primary)]",
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className={cn(
                "text-[14px] font-normal leading-[20px]",
                disabled ? "text-[var(--text-alt-tertiary)]" : "text-[var(--text-secondary)]",
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
