import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-[6px] rounded-[999px] px-[8px] py-[2px] text-[12px] font-semibold leading-[16px] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        neutral:
          "bg-[var(--surface-alt-tertiary)] text-[var(--text-secondary)]",
        brand:
          "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]",
        success:
          "bg-[var(--color-success-100)] text-[var(--color-success-800)] dark:bg-[var(--color-success-950)] dark:text-[var(--color-success-200)]",
        error:
          "bg-[var(--color-error-100)] text-[var(--color-error-800)] dark:bg-[var(--color-error-950)] dark:text-[var(--color-error-200)]",
        warning:
          "bg-[var(--color-warning-100)] text-[var(--color-warning-800)] dark:bg-[var(--color-warning-950)] dark:text-[var(--color-warning-200)]",
        info:
          "bg-[var(--color-info-100)] text-[var(--color-info-800)] dark:bg-[var(--color-info-950)] dark:text-[var(--color-info-200)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="h-[6px] w-[6px] rounded-[999px] bg-current" />
      )}
      {children}
    </span>
  );
}
Badge.displayName = "Badge";

export { Badge, badgeVariants };
