import { X } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Exact Figma token mappings:
// neutral bg-default: #fff      → bg-white
// neutral stroke:     #D6D6D6   → --stroke-primary
// neutral text:       #1C1C1E   → --header-primary
// neutral bg-hover:   #FAFAFA   → --color-neutral-0
// brand   stroke:     #94B4FD   → --color-primary-300
// brand   text:       #2463EB   → --color-primary-600
// brand   bg-default: #fff      → bg-white (hover only differs)
// brand   bg-hover:   #EFF4FF   → --color-primary-50
// count   neutral bg: #EAEAEA   → --color-neutral-100
// count   neutral tx: #3B3B3C   → --text-secondary
// count   brand bg:   #DBE6FE   → --color-primary-100
// count   brand tx:   #1D58D8   → --color-primary-700
// icon    neutral:    #666666   → --text-tertiary
// icon    brand:      #1D58D8   → --color-primary-700
// dot     success:    #158C4E   → --color-success-700
// shape: rounded-[4px] (xs), rounded-[6px] (sm) — NOT pill

const tagVariants = cva(
  "inline-flex items-center gap-[4px] min-w-[24px] font-medium text-[12px] leading-[16px] transition-colors select-none cursor-default",
  {
    variants: {
      variant: {
        default: cn(
          "border border-[var(--stroke-primary)] bg-white text-[var(--header-primary)]",
          "hover:bg-[var(--color-neutral-0)]",
          "dark:bg-[var(--surface-alt-tertiary)] dark:border-[var(--stroke-secondary)] dark:hover:bg-[var(--surface-primary)]"
        ),
        brand: cn(
          "border border-[var(--color-primary-300)] bg-white text-[var(--color-primary-600)]",
          "hover:bg-[var(--color-primary-50)]",
          "dark:bg-[var(--color-primary-950)] dark:border-[var(--color-primary-700)] dark:text-[var(--color-primary-400)]",
          "dark:hover:bg-[var(--color-primary-900)]"
        ),
      },
      size: {
        xs: "px-[4px] py-[2px] rounded-[4px]",
        sm: "px-[4px] py-[4px] rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

// Status dot colors — exact Figma token values (ai-fac-tags/bg/dot-*)
const STATUS_DOT: Record<string, string> = {
  success: "bg-[var(--color-success-700)]",   // #158C4E
  error:   "bg-[var(--color-error-700)]",     // #BA2641
  warning: "bg-[var(--color-warning-700)]",   // #D9891B
  brand:   "bg-[var(--color-primary-800)]",   // #1E4BAF
  neutral: "bg-[var(--color-neutral-400)]",   // #939393
};

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
  count?: number;
  status?: "success" | "error" | "warning" | "brand" | "neutral";
  icon?: React.ReactNode;
  disabled?: boolean;
}

function Tag({
  children,
  className,
  variant,
  size,
  onRemove,
  count,
  status,
  icon,
  disabled,
  ...props
}: TagProps) {
  const isXs = size === "xs";

  return (
    <span
      className={cn(
        tagVariants({ variant, size }),
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {status && (
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 rounded-full",
            isXs ? "h-[5px] w-[5px]" : "h-[6px] w-[6px]",
            STATUS_DOT[status]
          )}
        />
      )}
      {icon && (
        <span
          className={cn(
            "shrink-0 flex items-center justify-center",
            isXs ? "h-[12px] w-[12px]" : "h-[16px] w-[16px]"
          )}
        >
          {icon}
        </span>
      )}

      <span className="truncate">{children}</span>

      {count !== undefined && (
        <span
          className={cn(
            "shrink-0 flex items-center justify-center rounded-[4px] font-semibold leading-none",
            isXs ? "min-w-[14px] h-[14px] px-[3px] text-[9px]" : "min-w-[16px] h-[16px] px-[4px] text-[10px]",
            variant === "brand"
              ? "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-800)] dark:text-[var(--color-primary-100)]"
              : "bg-[var(--color-neutral-100)] text-[var(--text-secondary)] dark:bg-[var(--color-neutral-700)] dark:text-[var(--text-secondary)]"
          )}
        >
          {count}
        </span>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          disabled={disabled}
          aria-label="Remove"
          className={cn(
            "shrink-0 -mr-[1px] flex items-center justify-center rounded-[3px] transition-colors",
            "text-[var(--text-tertiary)] hover:text-[var(--header-primary)] hover:bg-black/8 dark:hover:bg-white/10",
            "focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-500)]",
            isXs ? "h-[14px] w-[14px]" : "h-[16px] w-[16px]"
          )}
        >
          <X
            className={isXs ? "h-[9px] w-[9px]" : "h-[10px] w-[10px]"}
            aria-hidden="true"
          />
        </button>
      )}
    </span>
  );
}
Tag.displayName = "Tag";

export { Tag, tagVariants };
