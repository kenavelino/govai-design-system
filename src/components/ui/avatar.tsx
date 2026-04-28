"use client";

import { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[999px] font-semibold",
  {
    variants: {
      size: {
        sm: "h-[32px] w-[32px] text-[12px] leading-[16px]",
        md: "h-[40px] w-[40px] text-[14px] leading-[20px]",
        lg: "h-[48px] w-[48px] text-[16px] leading-[24px]",
      },
      variant: {
        default: "bg-[var(--surface-alt-tertiary)] text-[var(--text-secondary)]",
        brand:
          "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
}

const Avatar = forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, variant, src, alt, initials, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, variant }), className)}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt || ""}
          className="aspect-square h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center">
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
