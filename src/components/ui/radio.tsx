"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type RadioSize = "sm" | "md";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  size: RadioSize;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  size?: RadioSize;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
  children: ReactNode;
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  name,
  size = "md",
  disabled = false,
  orientation = "vertical",
  className,
  children,
}: RadioGroupProps) {
  const autoName = useId();
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const handleChange = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name: name ?? autoName,
        value: current,
        onValueChange: handleChange,
        size,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col gap-[12px]" : "flex-row flex-wrap gap-[16px]",
          className,
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

const BOX_SIZE: Record<RadioSize, string> = {
  sm: "h-[16px] w-[16px]",
  md: "h-[20px] w-[20px]",
};

const DOT_SIZE: Record<RadioSize, string> = {
  sm: "h-[6px] w-[6px]",
  md: "h-[8px] w-[8px]",
};

const LABEL_TEXT: Record<RadioSize, string> = {
  sm: "text-[14px] leading-[20px]",
  md: "text-[16px] leading-[24px]",
};

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  size?: RadioSize;
  disabled?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, size: sizeProp, disabled: disabledProp, className, id, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id || autoId;
  const size = sizeProp ?? group?.size ?? "md";
  const disabled = disabledProp ?? group?.disabled ?? false;
  const checked = group ? group.value === value : undefined;
  const name = group?.name;

  const control = (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full border transition-colors",
        BOX_SIZE[size],
        disabled
          ? "border-[var(--stroke-primary)] bg-[var(--surface-disabled)]"
          : checked
            ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)]"
            : "border-[var(--stroke-primary)] bg-[var(--surface-default)] group-hover:border-[var(--color-primary-600)]",
      )}
      aria-hidden="true"
    >
      {checked && (
        <span
          className={cn(
            "rounded-full",
            DOT_SIZE[size],
            disabled ? "bg-[var(--text-alt-tertiary)]" : "bg-white",
          )}
        />
      )}
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
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          if (e.target.checked) group?.onValueChange?.(value);
        }}
        className="peer sr-only"
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
