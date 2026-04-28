"use client";

import { forwardRef } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type BreadcrumbSize = "sm" | "md";

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
  icon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItemData[];
  size?: BreadcrumbSize;
  separator?: React.ReactNode;
}

const SIZE_CLASS: Record<BreadcrumbSize, string> = {
  sm: "text-[12px] leading-[16px]",
  md: "text-[16px] leading-[24px]",
};

const ICON_SIZE_CLASS: Record<BreadcrumbSize, string> = {
  sm: "h-[16px] w-[16px]",
  md: "h-[20px] w-[20px]",
};

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { items, size = "sm", separator = "/", className, ...props },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("relative flex", className)}
        {...props}
      >
        <ol className="flex items-center gap-[4px]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const content = (
              <span className="flex items-center gap-[4px]">
                {item.icon && (
                  <Icon
                    name="house"
                    weight="regular"
                    className={cn(
                      ICON_SIZE_CLASS[size],
                      isLast
                        ? "text-[var(--header-primary)]"
                        : "text-[var(--text-tertiary)]"
                    )}
                    aria-hidden
                  />
                )}
                {item.label && <span>{item.label}</span>}
              </span>
            );

            return (
              <li
                key={index}
                className="flex items-center gap-[4px]"
              >
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      SIZE_CLASS[size],
                      "font-normal",
                      isLast
                        ? "text-[var(--header-primary)]"
                        : "text-[var(--text-tertiary)]"
                    )}
                  >
                    {content}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      SIZE_CLASS[size],
                      "rounded-[2px] font-normal text-[var(--text-tertiary)] transition-colors",
                      "hover:text-[var(--header-primary)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
                    )}
                  >
                    {content}
                  </a>
                )}
                {!isLast && (
                  <span
                    aria-hidden
                    className={cn(
                      SIZE_CLASS[size],
                      "select-none text-[var(--text-tertiary)]"
                    )}
                  >
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
