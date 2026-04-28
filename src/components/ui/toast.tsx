"use client";

import { Icon } from "@/components/ui/icon";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const toastVariants = cva(
  "flex items-start gap-[12px] rounded-[12px] border p-[16px] shadow-[var(--shadow-elevation-4)]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-default)] border-[var(--stroke-primary)]",
        success:
          "bg-[var(--color-success-50)] border-[var(--color-success-100)] dark:bg-[var(--color-success-950)] dark:border-[var(--color-success-800)]",
        error:
          "bg-[var(--color-error-50)] border-[var(--color-error-100)] dark:bg-[var(--color-error-950)] dark:border-[var(--color-error-800)]",
        warning:
          "bg-[var(--color-warning-50)] border-[var(--color-warning-100)] dark:bg-[var(--color-warning-950)] dark:border-[var(--color-warning-800)]",
        info:
          "bg-[var(--color-info-50)] border-[var(--color-info-100)] dark:bg-[var(--color-info-950)] dark:border-[var(--color-info-800)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const variantIcons = {
  default: <Icon name="info" className="h-[16px] w-[16px] text-[var(--icon-tertiary)]" />,
  success: <Icon name="check" className="h-[16px] w-[16px] text-[var(--color-success-700)] dark:text-[var(--color-success-400)]" />,
  error: <Icon name="x" className="h-[16px] w-[16px] text-[var(--color-error-700)] dark:text-[var(--color-error-400)]" />,
  warning: <Icon name="warning" className="h-[16px] w-[16px] text-[var(--color-warning-700)] dark:text-[var(--color-warning-400)]" />,
  info: <Icon name="info" className="h-[16px] w-[16px] text-[var(--color-info-700)] dark:text-[var(--color-info-400)]" />,
};

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  onClose?: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", title, description, onClose, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="mt-[2px]">{variantIcons[variant || "default"]}</div>
      <div className="flex-1">
        <p className="text-[14px] font-semibold leading-[20px] text-[var(--text-primary)]">{title}</p>
        {description && (
          <p className="mt-[4px] text-[12px] leading-[16px] text-[var(--text-tertiary)]">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-[var(--icon-tertiary)] hover:text-[var(--icon-secondary)] transition-colors duration-200"
        >
          <Icon name="x" className="h-[16px] w-[16px]" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
);
Toast.displayName = "Toast";

export { Toast, toastVariants };
