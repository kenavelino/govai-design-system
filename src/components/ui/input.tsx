"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-[6px] block text-[14px] font-medium leading-[20px] text-[var(--text-primary)]"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-[40px] w-full rounded-[8px] border bg-transparent px-[12px] text-[14px] leading-[20px] text-[var(--text-primary)] ring-offset-[var(--surface-default)] placeholder:text-[var(--text-alt-tertiary)] transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-[2px]",
            "disabled:cursor-not-allowed disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
            error
              ? "border-[var(--color-error-600)] focus-visible:ring-[var(--color-error-500)]"
              : "border-[var(--stroke-primary)] hover:border-[var(--stroke-secondary)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-[6px] text-[12px] leading-[16px] text-[var(--color-error-600)]">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-[6px] text-[12px] leading-[16px] text-[var(--text-tertiary)]">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
