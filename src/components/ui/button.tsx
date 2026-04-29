"use client";

import { Icon } from "@/components/ui/icon";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[8px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary-600)] text-[var(--color-neutral-0)] hover:bg-[var(--color-primary-700)] active:bg-[var(--color-primary-600)] disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-alt-tertiary)] dark:hover:bg-[var(--color-primary-500)]",
        secondary:
          "border border-[var(--stroke-primary)] bg-[var(--surface-default)] text-[var(--text-primary)] hover:bg-[var(--surface-alt-tertiary)] active:bg-[var(--surface-alt-tertiary)] disabled:border-[var(--stroke-primary)] disabled:text-[var(--text-alt-tertiary)] disabled:bg-transparent",
        tertiary:
          "text-[var(--color-primary-700)] hover:bg-[var(--surface-tertiary)] active:bg-[var(--surface-alt-tertiary)] disabled:text-[var(--text-alt-tertiary)] dark:text-[var(--color-primary-500)]",
        ghost:
          "text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)] active:bg-[var(--surface-alt-tertiary)] disabled:text-[var(--text-alt-tertiary)]",
        error:
          "bg-[var(--color-error-600)] text-[var(--color-neutral-0)] hover:bg-[var(--color-error-700)] active:bg-[var(--color-error-600)] disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-alt-tertiary)]",
        "error-secondary":
          "border border-[var(--color-error-600)] text-[var(--color-error-700)] hover:bg-[var(--color-error-50)] disabled:border-[var(--stroke-primary)] disabled:text-[var(--text-alt-tertiary)]",
      },
      size: {
        sm: "h-[32px] px-[12px] gap-[6px] text-[12px] leading-[16px]",
        md: "h-[36px] px-[12px] gap-[8px] text-[14px] leading-[20px]",
        lg: "h-[40px] px-[16px] gap-[8px] text-[14px] leading-[20px]",
        xl: "h-[48px] px-[16px] gap-[8px] text-[16px] leading-[24px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Icon name="circle-notch" className="h-[16px] w-[16px] animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
