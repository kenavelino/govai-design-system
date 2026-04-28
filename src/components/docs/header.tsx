"use client";

import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navigation } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/docs/logo";

type Crumb = { title: string; href: string; current?: boolean };

function getBreadcrumbs(pathname: string): Crumb[] | null {
  for (const group of navigation) {
    const item = group.items.find((i) => i.href === pathname);
    if (item) {
      return [
        { title: group.label, href: group.items[0]?.href ?? "#" },
        { title: item.title, href: item.href, current: true },
      ];
    }
  }
  return null;
}

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  useEffect(() => setMounted(true), []);
  useEffect(() => setMobileOpen(false), [pathname]);

  const themeGroupRef = useRef<HTMLDivElement>(null);
  const [themePill, setThemePill] = useState<{ x: number; w: number; h: number; visible: boolean }>({
    x: 0,
    w: 0,
    h: 0,
    visible: false,
  });

  useLayoutEffect(() => {
    if (!mounted) return;
    const group = themeGroupRef.current;
    if (!group) return;
    const active = group.querySelector<HTMLElement>('[aria-checked="true"]');
    if (!active) return;
    const groupRect = group.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    setThemePill({
      x: rect.left - groupRect.left,
      w: rect.width,
      h: rect.height,
      visible: true,
    });
  }, [mounted, theme]);

  return (
    <>
      <header className="fixed top-0 z-50 flex h-[64px] w-full items-center border-b border-[var(--stroke-primary)] bg-[var(--surface-default)]">
        {/* Left: Logo + Breadcrumbs */}
        <div className="flex h-full items-center">
          {/* Logo area — same width as sidebar */}
          <div className="relative flex h-full w-[250px] items-center gap-[12px] border-r border-[var(--stroke-primary)] px-[24px] after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[var(--surface-default)]">
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <Icon name="x" className="h-5 w-5 text-[var(--icon-secondary)]" />
              ) : (
                <Icon name="list" className="h-5 w-5 text-[var(--icon-secondary)]" />
              )}
            </button>
            <Link href="/" className="flex items-center gap-[8px]">
              <Logo size={28} color="var(--color-primary-600)" />
              <span className="hidden text-[16px] font-semibold leading-[24px] text-[var(--header-primary)] sm:inline-flex">
                GovAI
              </span>
            </Link>
          </div>

          {/* Breadcrumbs */}
          {crumbs && (
            <nav
              aria-label="Breadcrumb"
              className="hidden h-full items-center px-[24px] lg:flex"
            >
              <ol className="flex items-center gap-[8px]">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
                  return (
                    <li key={c.href + i} className="flex items-center gap-[8px]">
                      {isLast ? (
                        <span
                          aria-current="page"
                          className="text-[14px] font-semibold leading-[20px] text-[var(--text-primary)]"
                        >
                          {c.title}
                        </span>
                      ) : (
                        <Link
                          href={c.href}
                          className={cn(
                            "text-[14px] leading-[20px] transition-colors",
                            "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                          )}
                        >
                          {c.title}
                        </Link>
                      )}
                      {!isLast && (
                        <Icon name="caret-right" weight="bold" className="h-[12px] w-[12px] text-[var(--text-alt-tertiary)]"
                          aria-hidden="true" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="ml-auto flex items-center gap-[8px] px-[24px]">
          <button
            type="button"
            aria-label="Search"
            className="flex h-[32px] w-[200px] items-center justify-between gap-[8px] rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[12px] text-[14px] leading-[20px] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-alt-tertiary)]"
          >
            <span className="flex items-center gap-[8px]">
              <Icon name="magnifying-glass" className="h-[16px] w-[16px]" aria-hidden="true" />
              <span>Search</span>
            </span>
            <span className="flex items-center gap-[2px] text-[12px] leading-[16px] text-[var(--text-alt-tertiary)]">
              <span aria-hidden="true">⌘</span>
              <span>K</span>
            </span>
          </button>
          {mounted && (
            <div
              ref={themeGroupRef}
              role="radiogroup"
              aria-label="Theme"
              className="relative inline-flex h-[32px] items-center gap-[4px] rounded-[6px] bg-[var(--surface-alt-tertiary)] p-[2px]"
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute top-[2px] left-0 rounded-[4px] bg-[var(--surface-default)] shadow-[var(--shadow-elevation-1)] transition-[transform,width,opacity] duration-[250ms] ease-[var(--ease-out)]",
                  themePill.visible ? "opacity-100" : "opacity-0"
                )}
                style={{
                  width: themePill.w,
                  height: themePill.h,
                  transform: `translateX(${themePill.x}px)`,
                }}
              />
              <button
                type="button"
                role="radio"
                aria-checked={theme !== "dark"}
                onClick={() => setTheme("light")}
                className={cn(
                  "relative z-[1] inline-flex h-[28px] items-center gap-[6px] rounded-[4px] px-[10px] text-[14px] font-medium leading-[20px] transition-colors duration-200 ease-[var(--ease-out)]",
                  theme !== "dark"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                )}
              >
                <Icon name="sun" className="h-[14px] w-[14px]" aria-hidden="true" />
                <span>Light</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={theme === "dark"}
                onClick={() => setTheme("dark")}
                className={cn(
                  "relative z-[1] inline-flex h-[28px] items-center gap-[6px] rounded-[4px] px-[10px] text-[14px] font-medium leading-[20px] transition-colors duration-200 ease-[var(--ease-out)]",
                  theme === "dark"
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                )}
              >
                <Icon name="moon" className="h-[14px] w-[14px]" aria-hidden="true" />
                <span>Dark</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[64px] z-40 bg-[var(--surface-default)] p-[16px] lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-[20px]">
            {navigation.map((group) => (
              <div key={group.label}>
                <div className="px-[12px] pb-[4px] pt-[8px]">
                  <span className="text-[12px] font-semibold uppercase leading-[16px] tracking-[0.05em] text-[var(--text-alt-tertiary)]">
                    {group.label}
                  </span>
                </div>
                <div className="space-y-[1px]">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative block rounded-[6px] px-[12px] py-[6px] text-[14px] leading-[20px]",
                        pathname === item.href
                          ? "bg-[var(--surface-highlight)] font-medium text-[var(--color-primary-700)]"
                          : "text-[var(--text-tertiary)]"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
