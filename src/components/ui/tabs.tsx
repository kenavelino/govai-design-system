"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number; h: number; visible: boolean }>({
    x: 0,
    w: 0,
    h: 0,
    visible: false,
  });

  const setRefs = (node: HTMLDivElement | null) => {
    listRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
      if (!active) {
        setPill((p) => ({ ...p, visible: false }));
        return;
      }
      const listRect = list.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setPill({
        x: rect.left - listRect.left,
        w: rect.width,
        h: rect.height,
        visible: true,
      });
    };

    measure();

    const mo = new MutationObserver(measure);
    mo.observe(list, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    });

    const ro = new ResizeObserver(measure);
    ro.observe(list);
    list
      .querySelectorAll<HTMLElement>('[role="tab"]')
      .forEach((el) => ro.observe(el));

    window.addEventListener("resize", measure);
    return () => {
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  return (
    <TabsPrimitive.List
      ref={setRefs}
      className={cn(
        "relative inline-flex items-center gap-[4px] rounded-[8px] bg-[var(--surface-alt-tertiary)] p-[4px]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-[4px] left-0 rounded-[6px] bg-[var(--surface-default)] shadow-[var(--shadow-elevation-1)] transition-[transform,width,opacity] duration-[250ms] ease-[var(--ease-out)]",
          pill.visible ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: pill.w,
          height: pill.h,
          transform: `translateX(${pill.x}px)`,
        }}
      />
      {children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-[1] inline-flex h-[28px] items-center justify-center rounded-[6px] px-[12px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors duration-200 ease-[var(--ease-out)]",
      "hover:text-[var(--text-primary)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:text-[var(--text-disabled)]",
      "data-[state=active]:text-[var(--text-primary)]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      "mt-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
