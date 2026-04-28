"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useScrollFade } from "@/hooks/use-scroll-fade";

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

const SCROLL_DURATION_MS = 500;
const SCROLL_OFFSET_PX = 80;

// cubic-bezier(0.22, 1, 0.36, 1) — ease-out-quint: snappy entrance, gentle settle
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

export function OnThisPage({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const animationRef = useRef<number | null>(null);
  const asideRef = useRef<HTMLElement>(null);
  useScrollFade(asideRef);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targetY =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      window.scrollTo(0, startY + distance * easeOutQuint(t));
      if (t < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
    if (window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside
      ref={asideRef}
      className="scroll-fade-y fixed right-0 top-[64px] hidden h-[calc(100vh-64px)] w-[220px] overflow-y-auto p-[24px] xl:block"
    >
      {/* Header */}
      <div className="mb-[16px]">
        <span className="text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">
          On this page
        </span>
      </div>

      {/* TOC items with left border indicator */}
      <nav className="relative">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "relative block border-l-[1px] py-[8px] pl-[24px] text-[14px] leading-[20px] transition-colors",
                item.level > 2 && "pl-[36px]",
                isActive
                  ? "border-[var(--text-primary)] font-medium text-[var(--text-primary)]"
                  : "border-[var(--stroke-primary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              )}
            >
              {item.title}
            </a>
          );
        })}
        {/* Fade covers for top and bottom of the vertical indicator line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-[16px] w-px bg-gradient-to-b from-[var(--surface-default)] to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 bottom-0 h-[16px] w-px bg-gradient-to-t from-[var(--surface-default)] to-transparent"
        />
      </nav>
    </aside>
  );
}
