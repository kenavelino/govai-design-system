"use client";

import { useEffect, type RefObject } from "react";

export function useScrollFade(
  ref: RefObject<HTMLElement | null>,
  size = 32
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) {
        el.style.setProperty("--fade-top", "0px");
        el.style.setProperty("--fade-bottom", "0px");
        return;
      }
      const topRatio = Math.max(0, Math.min(scrollTop / size, 1));
      const bottomRatio = Math.max(0, Math.min((maxScroll - scrollTop) / size, 1));
      el.style.setProperty("--fade-top", `${size * topRatio}px`);
      el.style.setProperty("--fade-bottom", `${size * bottomRatio}px`);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref, size]);
}
