"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type SliderLabel = "none" | "bottom" | "top-floating" | "bottom-floating";

type SliderValue = number | [number, number];

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  range?: boolean;
  label?: SliderLabel;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  className?: string;
  ariaLabel?: string;
  ariaLabelStart?: string;
  ariaLabelEnd?: string;
  id?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToStep(value: number, step: number, min: number): number {
  if (step <= 0) return value;
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

function toArray(value: SliderValue, range: boolean): [number, number] {
  if (Array.isArray(value)) return [value[0], value[1]];
  return range ? [0, value] : [0, value];
}

function fromArray(values: [number, number], range: boolean): SliderValue {
  return range ? values : values[1];
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  range = false,
  label = "none",
  formatValue,
  disabled = false,
  dir = "ltr",
  className,
  ariaLabel,
  ariaLabelStart,
  ariaLabelEnd,
  id,
}: SliderProps) {
  const uid = useId();
  const sliderId = id ?? `slider-${uid}`;
  const trackRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<"start" | "end" | null>(null);
  const isControlled = value !== undefined;

  const initial: [number, number] = useMemo(() => {
    const source = value ?? defaultValue ?? (range ? [min, max] : 0);
    return toArray(source as SliderValue, range);
  }, [value, defaultValue, range, min, max]);

  const [internal, setInternal] = useState<[number, number]>(initial);
  const current: [number, number] = isControlled
    ? toArray(value as SliderValue, range)
    : internal;

  const isAr = dir === "rtl";
  const format = useCallback(
    (v: number) => (formatValue ? formatValue(v) : `${Math.round(v)}%`),
    [formatValue]
  );

  const commit = useCallback(
    (next: [number, number]) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(fromArray(next, range));
    },
    [isControlled, onValueChange, range]
  );

  const percentFromClient = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return 0;
      const rect = track.getBoundingClientRect();
      const relative = clientX - rect.left;
      const ratio = clamp(relative / rect.width, 0, 1);
      const pct = isAr ? 1 - ratio : ratio;
      return min + pct * (max - min);
    },
    [isAr, min, max]
  );

  const setThumb = useCallback(
    (which: "start" | "end", rawValue: number) => {
      const snapped = clamp(roundToStep(rawValue, step, min), min, max);
      if (!range) {
        if (snapped === current[1]) return;
        commit([min, snapped]);
        return;
      }
      const [start, end] = current;
      if (which === "start") {
        if (snapped > end) {
          commit([end, snapped]);
          activeThumbRef.current = "end";
        } else {
          commit([snapped, end]);
        }
      } else {
        if (snapped < start) {
          commit([snapped, start]);
          activeThumbRef.current = "start";
        } else {
          commit([start, snapped]);
        }
      }
    },
    [step, min, max, range, current, commit]
  );

  const pickThumb = useCallback(
    (rawValue: number): "start" | "end" => {
      if (!range) return "end";
      const [start, end] = current;
      return Math.abs(rawValue - start) < Math.abs(rawValue - end)
        ? "start"
        : "end";
    },
    [range, current]
  );

  const onTrackPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      event.preventDefault();
      const raw = percentFromClient(event.clientX);
      const which = pickThumb(raw);
      activeThumbRef.current = which;
      setThumb(which, raw);
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    },
    [disabled, percentFromClient, pickThumb, setThumb]
  );

  const onTrackPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const which = activeThumbRef.current;
      if (!which) return;
      const raw = percentFromClient(event.clientX);
      setThumb(which, raw);
    },
    [disabled, percentFromClient, setThumb]
  );

  const onTrackPointerUp = useCallback(() => {
    activeThumbRef.current = null;
  }, []);

  const onThumbPointerDown = useCallback(
    (which: "start" | "end") =>
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) return;
        event.preventDefault();
        event.stopPropagation();
        activeThumbRef.current = which;
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
      },
    [disabled]
  );

  const onThumbPointerMove = useCallback(
    (which: "start" | "end") =>
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (activeThumbRef.current !== which) return;
        const raw = percentFromClient(event.clientX);
        setThumb(which, raw);
      },
    [disabled, percentFromClient, setThumb]
  );

  const onThumbPointerUp = useCallback(() => {
    activeThumbRef.current = null;
  }, []);

  const onThumbKeyDown = useCallback(
    (which: "start" | "end") =>
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const big = Math.max(step * 10, (max - min) / 10);
        const invert = isAr ? -1 : 1;
        const [start, end] = current;
        const value = which === "start" ? start : end;
        let next = value;
        switch (event.key) {
          case "ArrowRight":
            next = value + step * invert;
            break;
          case "ArrowLeft":
            next = value - step * invert;
            break;
          case "ArrowUp":
            next = value + step;
            break;
          case "ArrowDown":
            next = value - step;
            break;
          case "PageUp":
            next = value + big;
            break;
          case "PageDown":
            next = value - big;
            break;
          case "Home":
            next = min;
            break;
          case "End":
            next = max;
            break;
          default:
            return;
        }
        event.preventDefault();
        setThumb(which, next);
      },
    [disabled, step, max, min, isAr, current, setThumb]
  );

  useEffect(() => {
    if (isControlled) return;
    setInternal((prev) => {
      const next: [number, number] = [
        clamp(roundToStep(prev[0], step, min), min, max),
        clamp(roundToStep(prev[1], step, min), min, max),
      ];
      if (next[0] > next[1]) next[0] = next[1];
      if (next[0] === prev[0] && next[1] === prev[1]) return prev;
      return next;
    });
  }, [isControlled, min, max, step]);

  const toPct = (v: number) => ((v - min) / (max - min)) * 100;
  const [startPct, endPct] = [toPct(current[0]), toPct(current[1])];
  const progressStart = range ? Math.min(startPct, endPct) : 0;
  const progressEnd = range ? Math.max(startPct, endPct) : endPct;
  const leftOffset = (pct: number) => (isAr ? `${100 - pct}%` : `${pct}%`);

  const startDisplay = format(current[0]);
  const endDisplay = format(current[1]);

  const showStaticLabels = label === "bottom";
  const showFloating = label === "top-floating" || label === "bottom-floating";
  const floatingOnTop = label === "top-floating";

  const thumbClasses = cn(
    "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-[24px] rounded-full",
    "bg-[var(--surface-primary)] border border-[var(--stroke-primary)]",
    "shadow-[0_2px_4px_-2px_rgba(10,13,18,0.06),0_4px_8px_-2px_rgba(10,13,18,0.10)]",
    "outline-none transition-colors",
    !disabled && "cursor-grab active:cursor-grabbing",
    !disabled &&
      "hover:border-[var(--color-primary-600)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-tertiary)]",
    disabled && "cursor-not-allowed opacity-60"
  );

  const renderFloatingTooltip = (text: string) => (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 -translate-x-1/2 flex flex-col items-center",
        floatingOnTop ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
      )}
      style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.14))" }}
    >
      {!floatingOnTop && (
        <svg
          width="16"
          height="6"
          viewBox="0 0 16 6"
          className="block"
          style={{ transform: "rotate(180deg)" }}
        >
          <path d="M0 6 L8 0 L16 6 Z" fill="var(--color-neutral-800)" />
        </svg>
      )}
      <div className="flex items-center justify-center rounded-[6px] bg-[var(--color-neutral-800)] px-[8px] py-[6px] text-[12px] font-medium leading-[16px] text-white whitespace-nowrap">
        {text}
      </div>
      {floatingOnTop && (
        <svg width="16" height="6" viewBox="0 0 16 6" className="block">
          <path d="M0 0 L8 6 L16 0 Z" fill="var(--color-neutral-800)" />
        </svg>
      )}
    </div>
  );

  const renderThumb = (which: "start" | "end", pct: number, label: string) => {
    const thumbValue = which === "start" ? current[0] : current[1];
    const accessibleLabel =
      which === "start"
        ? ariaLabelStart ?? ariaLabel
        : ariaLabelEnd ?? ariaLabel;
    return (
      <button
        type="button"
        role="slider"
        aria-label={accessibleLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={thumbValue}
        aria-valuetext={label}
        aria-orientation="horizontal"
        aria-disabled={disabled || undefined}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={thumbClasses}
        style={{ left: leftOffset(pct) }}
        onPointerDown={onThumbPointerDown(which)}
        onPointerMove={onThumbPointerMove(which)}
        onPointerUp={onThumbPointerUp}
        onPointerCancel={onThumbPointerUp}
        onKeyDown={onThumbKeyDown(which)}
      >
        {showFloating && renderFloatingTooltip(label)}
      </button>
    );
  };

  const containerPaddingY =
    label === "top-floating"
      ? "pt-[44px]"
      : label === "bottom-floating"
        ? "pb-[44px]"
        : label === "bottom"
          ? "pb-[28px]"
          : "";

  return (
    <div
      dir={dir}
      id={sliderId}
      className={cn(
        "relative w-full",
        containerPaddingY,
        disabled && "opacity-60",
        className
      )}
    >
      <div
        ref={trackRef}
        role="presentation"
        className={cn(
          "relative h-[24px] w-full select-none",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        )}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onTrackPointerMove}
        onPointerUp={onTrackPointerUp}
        onPointerCancel={onTrackPointerUp}
      >
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 h-[8px] -translate-y-1/2 rounded-full bg-[var(--color-neutral-300)] dark:bg-[var(--color-neutral-700)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 h-[8px] -translate-y-1/2 rounded-[4px] bg-[var(--color-primary-600)]"
          style={{
            left: isAr
              ? `${100 - progressEnd}%`
              : `${progressStart}%`,
            right: isAr
              ? `${progressStart}%`
              : `${100 - progressEnd}%`,
          }}
        />
        {range && renderThumb("start", startPct, startDisplay)}
        {renderThumb("end", endPct, endDisplay)}
      </div>

      {showStaticLabels && (
        <>
          {range && (
            <span
              aria-hidden="true"
              className="absolute top-[calc(50%+16px)] -translate-x-1/2 text-[16px] font-medium leading-[24px] text-[var(--header-primary)]"
              style={{ left: leftOffset(startPct) }}
            >
              {startDisplay}
            </span>
          )}
          <span
            aria-hidden="true"
            className="absolute top-[calc(50%+16px)] -translate-x-1/2 text-[16px] font-medium leading-[24px] text-[var(--header-primary)]"
            style={{ left: leftOffset(endPct) }}
          >
            {endDisplay}
          </span>
        </>
      )}
    </div>
  );
}
