"use client";

import { Icon } from "@/components/ui/icon";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, type NavGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useScrollFade } from "@/hooks/use-scroll-fade";

function SidebarGroup({ group }: { group: NavGroup }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const contentId = `sidebar-group-${group.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      {/* Section label / toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between rounded-[6px] px-[6px] pb-[4px] pt-[8px] text-left transition-colors hover:text-[var(--text-primary)]"
      >
        <span className="text-[12px] font-semibold leading-[16px] text-[var(--text-primary)]">
          {group.label}
        </span>
        <Icon name="caret-down" weight="bold" className={cn(
            "h-[12px] w-[12px] text-[var(--text-alt-tertiary)] transition-transform duration-200",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
          aria-hidden="true" />
      </button>

      {/* Nav items */}
      {isOpen && (
        <div id={contentId} className="space-y-[1px] pt-[4px]">
          {group.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center rounded-[6px] px-[8px] py-[6px] text-[14px] leading-[20px] transition-colors",
                  isActive
                    ? "bg-[var(--surface-alt-tertiary)] font-medium text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.title}
                {item.badge && (
                  <span className="ml-auto rounded-[999px] bg-[var(--color-primary-100)] px-[6px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const ref = useRef<HTMLElement>(null);
  useScrollFade(ref);
  return (
    <aside
      ref={ref}
      className="scroll-fade-y fixed left-0 top-[64px] z-30 hidden h-[calc(100vh-64px)] w-[250px] overflow-y-auto sidebar-no-scrollbar border-r border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[20px] lg:block"
    >
      <nav className="flex flex-col pb-[16px]">
        {navigation.map((group, i) => (
          <div
            key={group.label}
            className={cn(
              "py-[12px]",
              i > 0 && "divider-dashed-fade"
            )}
          >
            <SidebarGroup group={group} />
          </div>
        ))}
      </nav>
    </aside>
  );
}
