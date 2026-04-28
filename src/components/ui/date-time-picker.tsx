"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type DateTimePickerVariant =
  | "date"
  | "datetime"
  | "date-range"
  | "datetime-range";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DateTimePickerProps {
  variant?: DateTimePickerVariant;
  value?: Date | DateRange | null;
  defaultValue?: Date | DateRange | null;
  onChange?: (value: Date | DateRange | null) => void;
  placeholder?: string;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  className?: string;
  minuteStep?: number;
}

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const DAY_LABELS_EN = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_LABELS_AR = ["ن", "ث", "ر", "خ", "ج", "س", "ح"];

type PresetKey =
  | "today"
  | "yesterday"
  | "this-week"
  | "last-week"
  | "this-month"
  | "last-month"
  | "this-year"
  | "last-year"
  | "all-time";

const PRESETS: { key: PresetKey; labelEn: string; labelAr: string }[] = [
  { key: "today", labelEn: "Today", labelAr: "اليوم" },
  { key: "yesterday", labelEn: "Yesterday", labelAr: "أمس" },
  { key: "this-week", labelEn: "This Week", labelAr: "هذا الأسبوع" },
  { key: "last-week", labelEn: "Last Week", labelAr: "الأسبوع الماضي" },
  { key: "this-month", labelEn: "This Month", labelAr: "هذا الشهر" },
  { key: "last-month", labelEn: "Last Month", labelAr: "الشهر الماضي" },
  { key: "this-year", labelEn: "This Year", labelAr: "هذه السنة" },
  { key: "last-year", labelEn: "Last Year", labelAr: "السنة الماضية" },
  { key: "all-time", labelEn: "All Time", labelAr: "كل الأوقات" },
];

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isInRange(day: Date, from: Date | null, to: Date | null): boolean {
  if (!from || !to) return false;
  const t = startOfDay(day).getTime();
  return t > startOfDay(from).getTime() && t < startOfDay(to).getTime();
}

function formatDate(d: Date | null, rtl: boolean): string {
  if (!d) return "";
  const day = d.getDate();
  const month = (rtl ? MONTHS_AR : MONTHS_EN)[d.getMonth()].slice(0, 3);
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
}

function formatTime(d: Date | null, rtl: boolean): string {
  if (!d) return rtl ? "12:00 ص" : "12:00 AM";
  let h = d.getHours();
  const m = d.getMinutes();
  const suffix = rtl ? (h >= 12 ? "م" : "ص") : h >= 12 ? "PM" : "AM";
  h = h % 12 === 0 ? 12 : h % 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
}

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function getPresetRange(key: PresetKey): { from: Date | null; to: Date | null } {
  const now = startOfDay(new Date());
  switch (key) {
    case "today":
      return { from: now, to: now };
    case "yesterday": {
      const y = addDays(now, -1);
      return { from: y, to: y };
    }
    case "this-week": {
      const dayIdx = (now.getDay() + 6) % 7;
      return { from: addDays(now, -dayIdx), to: addDays(now, 6 - dayIdx) };
    }
    case "last-week": {
      const dayIdx = (now.getDay() + 6) % 7;
      const end = addDays(now, -dayIdx - 1);
      return { from: addDays(end, -6), to: end };
    }
    case "this-month":
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: new Date(now.getFullYear(), now.getMonth() + 1, 0),
      };
    case "last-month":
      return {
        from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        to: new Date(now.getFullYear(), now.getMonth(), 0),
      };
    case "this-year":
      return {
        from: new Date(now.getFullYear(), 0, 1),
        to: new Date(now.getFullYear(), 11, 31),
      };
    case "last-year":
      return {
        from: new Date(now.getFullYear() - 1, 0, 1),
        to: new Date(now.getFullYear() - 1, 11, 31),
      };
    case "all-time":
      return { from: null, to: null };
  }
}

interface CalendarProps {
  view: Date;
  onViewChange: (d: Date) => void;
  selected: Date | null;
  rangeFrom: Date | null;
  rangeTo: Date | null;
  onSelect: (d: Date) => void;
  rtl: boolean;
  showNav?: boolean;
}

function CalendarMonth({
  view,
  onViewChange,
  selected,
  rangeFrom,
  rangeTo,
  onSelect,
  rtl,
  showNav = true,
}: CalendarProps) {
  const [mode, setMode] = useState<"days" | "months" | "years">("days");
  const monthLabels = rtl ? MONTHS_AR : MONTHS_EN;
  const dayLabels = rtl ? DAY_LABELS_AR : DAY_LABELS_EN;
  const cells = useMemo(
    () => buildMonthGrid(view.getFullYear(), view.getMonth()),
    [view]
  );
  const today = startOfDay(new Date());

  const goPrev = () => {
    const d = new Date(view);
    d.setMonth(d.getMonth() - 1);
    onViewChange(d);
  };
  const goNext = () => {
    const d = new Date(view);
    d.setMonth(d.getMonth() + 1);
    onViewChange(d);
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center justify-between gap-[8px]">
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={() => setMode(mode === "months" ? "days" : "months")}
            className="inline-flex h-[28px] items-center gap-[4px] rounded-[6px] px-[6px] text-[14px] font-medium leading-[20px] text-[var(--header-primary)] hover:bg-[var(--surface-tertiary)]"
          >
            {monthLabels[view.getMonth()]}
            <Icon name="caret-down" className="h-[12px] w-[12px] text-[var(--text-tertiary)]" />
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "years" ? "days" : "years")}
            className="inline-flex h-[28px] items-center gap-[4px] rounded-[6px] px-[6px] text-[14px] font-medium leading-[20px] text-[var(--header-primary)] hover:bg-[var(--surface-tertiary)]"
          >
            {view.getFullYear()}
            <Icon name="caret-down" className="h-[12px] w-[12px] text-[var(--text-tertiary)]" />
          </button>
        </div>
        {showNav && (
          <div className="flex items-center gap-[4px]">
            <button
              type="button"
              onClick={goPrev}
              aria-label={rtl ? "الشهر التالي" : "Previous month"}
              className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[var(--text-tertiary)] hover:bg-[var(--surface-tertiary)] hover:text-[var(--header-primary)]"
            >
              <Icon name={rtl ? "caret-right" : "caret-left"} className="h-[14px] w-[14px]" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={rtl ? "الشهر السابق" : "Next month"}
              className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-[var(--text-tertiary)] hover:bg-[var(--surface-tertiary)] hover:text-[var(--header-primary)]"
            >
              <Icon name={rtl ? "caret-left" : "caret-right"} className="h-[14px] w-[14px]" />
            </button>
          </div>
        )}
      </div>

      {mode === "days" && (
        <>
          <div className="grid grid-cols-7 gap-y-[4px]">
            {dayLabels.map((lbl, i) => (
              <div
                key={`${lbl}-${i}`}
                className="flex h-[28px] items-center justify-center text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]"
              >
                {lbl}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-[2px]">
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} className="h-[32px] w-[32px]" />;
              const isSelected = isSameDay(d, selected);
              const isRangeStart = isSameDay(d, rangeFrom);
              const isRangeEnd = isSameDay(d, rangeTo);
              const isInBetween = isInRange(d, rangeFrom, rangeTo);
              const isToday = isSameDay(d, today);
              const active = isSelected || isRangeStart || isRangeEnd;
              return (
                <div key={d.toISOString()} className="flex h-[32px] items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onSelect(d)}
                    className={cn(
                      "relative inline-flex h-[32px] w-[32px] items-center justify-center rounded-[8px] text-[12px] leading-[16px] transition-colors",
                      active &&
                        "bg-[var(--color-primary-600)] font-medium text-[var(--color-neutral-0)]",
                      !active &&
                        isInBetween &&
                        "bg-[var(--color-primary-50)] text-[var(--header-primary)] dark:bg-[var(--color-primary-950)]",
                      !active &&
                        !isInBetween &&
                        "text-[var(--header-primary)] hover:bg-[var(--surface-tertiary)]"
                    )}
                    aria-pressed={active}
                    aria-label={d.toDateString()}
                  >
                    {d.getDate()}
                    {isToday && !active && (
                      <span className="absolute bottom-[4px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-[var(--color-primary-600)]" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {mode === "months" && (
        <div className="grid grid-cols-3 gap-[8px]">
          {monthLabels.map((m, idx) => {
            const active = idx === view.getMonth();
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  const d = new Date(view);
                  d.setMonth(idx);
                  onViewChange(d);
                  setMode("days");
                }}
                className={cn(
                  "inline-flex h-[32px] items-center justify-center rounded-[8px] px-[8px] text-[12px] leading-[16px] transition-colors",
                  active
                    ? "bg-[var(--color-primary-600)] font-medium text-[var(--color-neutral-0)]"
                    : "text-[var(--header-primary)] hover:bg-[var(--surface-tertiary)]"
                )}
              >
                {m.slice(0, rtl ? 4 : 3)}
              </button>
            );
          })}
        </div>
      )}

      {mode === "years" && (
        <div className="grid grid-cols-3 gap-[8px]">
          {Array.from({ length: 12 }).map((_, i) => {
            const base = view.getFullYear() - 6 + i;
            const active = base === view.getFullYear();
            return (
              <button
                key={base}
                type="button"
                onClick={() => {
                  const d = new Date(view);
                  d.setFullYear(base);
                  onViewChange(d);
                  setMode("days");
                }}
                className={cn(
                  "inline-flex h-[32px] items-center justify-center rounded-[8px] px-[8px] text-[12px] leading-[16px] transition-colors",
                  active
                    ? "bg-[var(--color-primary-600)] font-medium text-[var(--color-neutral-0)]"
                    : "text-[var(--header-primary)] hover:bg-[var(--surface-tertiary)]"
                )}
              >
                {base}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TimeSelect({
  value,
  onChange,
  rtl,
  disabled,
  minuteStep = 15,
}: {
  value: Date;
  onChange: (d: Date) => void;
  rtl: boolean;
  disabled?: boolean;
  minuteStep?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const times: Date[] = useMemo(() => {
    const list: Date[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += minuteStep) {
        const t = new Date(value);
        t.setHours(h, m, 0, 0);
        list.push(t);
      }
    }
    return list;
  }, [minuteStep, value]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-[28px] w-full items-center justify-between gap-[6px] rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span>{formatTime(value, rtl)}</span>
        <Icon name="caret-down" className="h-[12px] w-[12px] text-[var(--text-tertiary)]" />
      </button>
      {open && (
        <div
          className="absolute top-[calc(100%+4px)] z-10 max-h-[180px] w-full min-w-[120px] overflow-y-auto rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] p-[4px] shadow-[var(--shadow-elevation-3)]"
          style={{ [rtl ? "right" : "left"]: 0 }}
        >
          {times.map((t) => {
            const active =
              t.getHours() === value.getHours() && t.getMinutes() === value.getMinutes();
            return (
              <button
                key={t.toISOString()}
                type="button"
                onClick={() => {
                  const next = new Date(value);
                  next.setHours(t.getHours(), t.getMinutes(), 0, 0);
                  onChange(next);
                  setOpen(false);
                }}
                className={cn(
                  "flex h-[28px] w-full items-center rounded-[6px] px-[8px] text-[12px] leading-[16px] transition-colors",
                  active
                    ? "bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-400)]"
                    : "text-[var(--header-primary)] hover:bg-[var(--surface-tertiary)]"
                )}
              >
                {formatTime(t, rtl)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DateTimePicker({
  variant = "date",
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  dir = "ltr",
  className,
  minuteStep = 15,
}: DateTimePickerProps) {
  const rtl = dir === "rtl";
  const isRange = variant === "date-range" || variant === "datetime-range";
  const hasTime = variant === "datetime" || variant === "datetime-range";

  const [internal, setInternal] = useState<Date | DateRange | null>(
    defaultValue ?? (isRange ? { from: null, to: null } : null)
  );
  const value = controlledValue ?? internal;

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Date | DateRange | null>(value);
  const [view, setView] = useState<Date>(() => {
    const now = new Date();
    if (isRange) {
      const r = (value as DateRange) || { from: null, to: null };
      return r.from ? new Date(r.from) : now;
    }
    return (value as Date) || now;
  });
  const [selectingEnd, setSelectingEnd] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const updatePos = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const popW = popoverRef.current?.offsetWidth ?? 0;
      setPopoverPos({
        top: rect.bottom + 8,
        left: rtl ? rect.right - popW : rect.left,
      });
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [open, rtl, draft]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      const inTrigger = containerRef.current && containerRef.current.contains(t);
      const inPopover = popoverRef.current && popoverRef.current.contains(t);
      if (!inTrigger && !inPopover) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const commit = (next: Date | DateRange | null) => {
    if (controlledValue === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleApply = () => {
    commit(draft);
    setOpen(false);
  };
  const handleCancel = () => {
    setDraft(value);
    setOpen(false);
  };
  const handleReset = () => {
    const next: Date | DateRange | null = isRange ? { from: null, to: null } : null;
    setDraft(next);
  };
  const handleToday = () => {
    const now = new Date();
    if (isRange) {
      setDraft({ from: startOfDay(now), to: startOfDay(now) });
    } else {
      const base = (draft as Date) ?? new Date();
      const next = new Date(now);
      if (hasTime) next.setHours(base.getHours(), base.getMinutes(), 0, 0);
      else next.setHours(0, 0, 0, 0);
      setDraft(next);
    }
    setView(now);
  };

  const applyPreset = (key: PresetKey) => {
    const r = getPresetRange(key);
    setDraft(r);
    if (r.from) setView(new Date(r.from));
  };

  const selectDay = (d: Date) => {
    if (!isRange) {
      const base = (draft as Date) ?? new Date();
      const next = new Date(d);
      if (hasTime) next.setHours(base.getHours(), base.getMinutes(), 0, 0);
      setDraft(next);
      return;
    }
    const r = (draft as DateRange) ?? { from: null, to: null };
    if (!r.from || (r.from && r.to) || selectingEnd === false) {
      if (!r.from || (r.from && r.to)) {
        setDraft({ from: d, to: null });
        setSelectingEnd(true);
      } else {
        if (d < r.from) setDraft({ from: d, to: r.from });
        else setDraft({ ...r, to: d });
        setSelectingEnd(false);
      }
    } else {
      if (d < (r.from as Date)) setDraft({ from: d, to: r.from });
      else setDraft({ ...r, to: d });
      setSelectingEnd(false);
    }
  };

  const trigger = useMemo(() => {
    const input = (text: string, placeholder: string, highlight: boolean) => (
      <div
        className={cn(
          "inline-flex h-[28px] min-w-[96px] items-center rounded-[8px] border px-[10px] text-[12px] leading-[16px] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          highlight
            ? "border-[var(--color-primary-400)]"
            : "border-[var(--stroke-primary)]",
          text ? "text-[var(--header-primary)]" : "text-[var(--text-tertiary)]"
        )}
      >
        {text || placeholder}
      </div>
    );

    if (!isRange) {
      const d = (value as Date) ?? null;
      return (
        <div className="flex items-center gap-[6px]">
          {input(formatDate(d, rtl), placeholder ?? (rtl ? "تاريخ" : "Select date"), open)}
          {hasTime && (
            <div className="inline-flex h-[28px] min-w-[110px] items-center justify-between gap-[6px] rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
              <span>{formatTime(d, rtl)}</span>
              <Icon name="caret-down" className="h-[12px] w-[12px] text-[var(--text-tertiary)]" />
            </div>
          )}
        </div>
      );
    }
    const r = (value as DateRange) ?? { from: null, to: null };
    return (
      <div className="flex items-center gap-[6px]">
        {input(formatDate(r.from, rtl), rtl ? "من" : "From", open)}
        {hasTime && (
          <div className="inline-flex h-[28px] min-w-[96px] items-center justify-between gap-[6px] rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
            <span>{formatTime(r.from, rtl)}</span>
            <Icon name="caret-down" className="h-[12px] w-[12px] text-[var(--text-tertiary)]" />
          </div>
        )}
        <span className="text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          {rtl ? "إلى" : "To"}
        </span>
        {input(formatDate(r.to, rtl), rtl ? "إلى" : "To", false)}
        {hasTime && (
          <div className="inline-flex h-[28px] min-w-[96px] items-center justify-between gap-[6px] rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
            <span>{formatTime(r.to, rtl)}</span>
            <Icon name="caret-down" className="h-[12px] w-[12px] text-[var(--text-tertiary)]" />
          </div>
        )}
      </div>
    );
  }, [hasTime, isRange, open, placeholder, rtl, value]);

  const secondView = useMemo(() => {
    const d = new Date(view);
    d.setMonth(d.getMonth() + 1);
    return d;
  }, [view]);

  const draftAsRange = (draft as DateRange) || { from: null, to: null };
  const draftAsDate = draft as Date | null;
  const presetLabelKey: "labelEn" | "labelAr" = rtl ? "labelAr" : "labelEn";

  return (
    <div
      ref={containerRef}
      dir={dir}
      className={cn("relative inline-block", disabled && "pointer-events-none opacity-60", className)}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-[6px]"
      >
        {trigger}
      </button>

      {open && mounted && createPortal(
        <div
          ref={popoverRef}
          role="dialog"
          dir={dir}
          style={{ position: "fixed", top: popoverPos.top, left: popoverPos.left, zIndex: 50 }}
          className="flex rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] shadow-[var(--shadow-elevation-4)]"
        >
          {isRange && (
            <div className="flex w-[140px] shrink-0 flex-col border-e border-[var(--stroke-primary)] p-[8px]">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => applyPreset(p.key)}
                  className="flex h-[32px] w-full items-center rounded-[6px] px-[10px] text-[12px] leading-[16px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--header-primary)]"
                >
                  {p[presetLabelKey]}
                </button>
              ))}
            </div>
          )}

          <div className="flex min-w-[280px] flex-col p-[16px]">
            {isRange ? (
              <>
                <div className="mb-[12px] flex flex-wrap items-center gap-[6px]">
                  <span className="text-[12px] font-medium leading-[16px] text-[var(--header-primary)]">
                    {rtl ? "من" : "From"}
                  </span>
                  <div className="inline-flex h-[28px] min-w-[110px] items-center rounded-[8px] border border-[var(--color-primary-400)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
                    {formatDate(draftAsRange.from, rtl) || (rtl ? "تاريخ" : "Select date")}
                  </div>
                  {hasTime && draftAsRange.from && (
                    <div className="w-[120px]">
                      <TimeSelect
                        value={draftAsRange.from}
                        onChange={(t) =>
                          setDraft({ ...draftAsRange, from: t })
                        }
                        rtl={rtl}
                        minuteStep={minuteStep}
                      />
                    </div>
                  )}
                  {!hasTime && (
                    <button
                      type="button"
                      onClick={handleToday}
                      className="inline-flex h-[28px] items-center rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] font-medium leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] hover:bg-[var(--surface-tertiary)]"
                    >
                      {rtl ? "اليوم" : "Today"}
                    </button>
                  )}
                  <span className="text-[12px] font-medium leading-[16px] text-[var(--header-primary)]">
                    {rtl ? "إلى" : "To"}
                  </span>
                  <div className="inline-flex h-[28px] min-w-[110px] items-center rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
                    {formatDate(draftAsRange.to, rtl) || (rtl ? "تاريخ" : "Select date")}
                  </div>
                  {hasTime && draftAsRange.to && (
                    <div className="w-[120px]">
                      <TimeSelect
                        value={draftAsRange.to}
                        onChange={(t) =>
                          setDraft({ ...draftAsRange, to: t })
                        }
                        rtl={rtl}
                        minuteStep={minuteStep}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-[24px]">
                  <CalendarMonth
                    view={view}
                    onViewChange={setView}
                    selected={null}
                    rangeFrom={draftAsRange.from}
                    rangeTo={draftAsRange.to}
                    onSelect={selectDay}
                    rtl={rtl}
                    showNav={false}
                  />
                  <CalendarMonth
                    view={secondView}
                    onViewChange={(d) => {
                      const prev = new Date(d);
                      prev.setMonth(prev.getMonth() - 1);
                      setView(prev);
                    }}
                    selected={null}
                    rangeFrom={draftAsRange.from}
                    rangeTo={draftAsRange.to}
                    onSelect={selectDay}
                    rtl={rtl}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-[12px] flex flex-wrap items-center gap-[6px]">
                  <div className="inline-flex h-[28px] min-w-[140px] items-center rounded-[8px] border border-[var(--color-primary-400)] px-[10px] text-[12px] leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
                    {formatDate(draftAsDate, rtl) || (rtl ? "تاريخ" : "Select date")}
                  </div>
                  {hasTime && draftAsDate && (
                    <div className="w-[120px]">
                      <TimeSelect
                        value={draftAsDate}
                        onChange={(t) => setDraft(t)}
                        rtl={rtl}
                        minuteStep={minuteStep}
                      />
                    </div>
                  )}
                  {!hasTime && (
                    <button
                      type="button"
                      onClick={handleToday}
                      className="inline-flex h-[28px] items-center rounded-[8px] border border-[var(--stroke-primary)] px-[10px] text-[12px] font-medium leading-[16px] text-[var(--header-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] hover:bg-[var(--surface-tertiary)]"
                    >
                      {rtl ? "اليوم" : "Today"}
                    </button>
                  )}
                </div>
                <CalendarMonth
                  view={view}
                  onViewChange={setView}
                  selected={draftAsDate}
                  rangeFrom={null}
                  rangeTo={null}
                  onSelect={selectDay}
                  rtl={rtl}
                />
              </>
            )}

            <div className="mt-[16px] flex items-center justify-between border-t border-[var(--stroke-primary)] pt-[12px]">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-[32px] items-center rounded-[8px] px-[10px] text-[12px] font-medium leading-[16px] text-[var(--color-error-600)] transition-colors hover:bg-[var(--color-error-50)] dark:hover:bg-[var(--color-error-950)]"
              >
                {rtl ? "إعادة تعيين" : "Reset"}
              </button>
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex h-[32px] items-center rounded-[8px] border border-[var(--color-primary-400)] px-[12px] text-[12px] font-medium leading-[16px] text-[var(--color-primary-700)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] transition-colors hover:bg-[var(--color-primary-50)] dark:text-[var(--color-primary-400)] dark:hover:bg-[var(--color-primary-950)]"
                >
                  {rtl ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="inline-flex h-[32px] items-center rounded-[8px] bg-[var(--color-primary-600)] px-[12px] text-[12px] font-medium leading-[16px] text-[var(--color-neutral-0)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] transition-colors hover:bg-[var(--color-primary-700)]"
                >
                  {rtl ? "تطبيق" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
