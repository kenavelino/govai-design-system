"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

function normalizeDigit(char: string): string | null {
  if (/^[0-9]$/.test(char)) return char;
  const arabicIndex = ARABIC_DIGITS.indexOf(char as (typeof ARABIC_DIGITS)[number]);
  if (arabicIndex >= 0) return String(arabicIndex);
  return null;
}

function toDisplay(value: string, direction: "ltr" | "rtl"): string {
  if (direction !== "rtl") return value;
  return value
    .split("")
    .map((ch) => (/^[0-9]$/.test(ch) ? ARABIC_DIGITS[Number(ch)] : ch))
    .join("");
}

export interface NumberInputProps {
  digits?: 4 | 5 | 6;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  direction?: "ltr" | "rtl";
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  className?: string;
  name?: string;
  "aria-label"?: string;
}

export interface NumberInputHandle {
  focus: () => void;
  clear: () => void;
}

const NumberInput = forwardRef<NumberInputHandle, NumberInputProps>(function NumberInput(
  {
    digits = 4,
    value: controlledValue,
    defaultValue = "",
    onChange,
    onComplete,
    direction = "ltr",
    label,
    hint,
    error,
    disabled = false,
    autoFocus = false,
    id,
    className,
    name,
    "aria-label": ariaLabel,
  },
  ref,
) {
  const reactId = useId();
  const groupId = id ?? `number-input-${reactId}`;
  const labelId = `${groupId}-label`;
  const hintId = `${groupId}-hint`;
  const errorId = `${groupId}-error`;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(() =>
    (defaultValue ?? "").replace(/[^0-9]/g, "").slice(0, digits),
  );
  const rawValue = isControlled
    ? (controlledValue ?? "").replace(/[^0-9]/g, "").slice(0, digits)
    : internalValue;

  const cellRefs = useRef<Array<HTMLInputElement | null>>([]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      const firstEmpty = cellRefs.current.findIndex((_, i) => !rawValue[i]);
      const target = firstEmpty === -1 ? digits - 1 : firstEmpty;
      cellRefs.current[target]?.focus();
    },
    clear: () => {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      cellRefs.current[0]?.focus();
    },
  }));

  const commit = useCallback(
    (next: string) => {
      const clamped = next.slice(0, digits);
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
      if (clamped.length === digits) onComplete?.(clamped);
    },
    [digits, isControlled, onChange, onComplete],
  );

  const focusCell = (index: number) => {
    const target = cellRefs.current[Math.max(0, Math.min(digits - 1, index))];
    target?.focus();
    target?.select();
  };

  const handleChange = (index: number, raw: string) => {
    if (!raw) return;
    const normalized = raw
      .split("")
      .map(normalizeDigit)
      .filter((d): d is string => d !== null)
      .join("");
    if (!normalized) return;

    const chars = rawValue.padEnd(digits, " ").split("");
    let cursor = index;
    for (const d of normalized) {
      if (cursor >= digits) break;
      chars[cursor] = d;
      cursor += 1;
    }
    const next = chars.join("").replace(/\s/g, "");
    commit(next);
    if (cursor < digits) focusCell(cursor);
    else cellRefs.current[digits - 1]?.blur();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const isNextKey = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
    const isPrevKey = direction === "rtl" ? "ArrowRight" : "ArrowLeft";

    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = rawValue.padEnd(digits, " ").split("");
      if (chars[index] && chars[index] !== " ") {
        chars[index] = " ";
        commit(chars.join("").replace(/\s/g, ""));
        return;
      }
      if (index > 0) {
        chars[index - 1] = " ";
        commit(chars.join("").replace(/\s/g, ""));
        focusCell(index - 1);
      }
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const chars = rawValue.padEnd(digits, " ").split("");
      chars[index] = " ";
      commit(chars.join("").replace(/\s/g, ""));
      return;
    }

    if (e.key === isPrevKey) {
      e.preventDefault();
      focusCell(index - 1);
      return;
    }

    if (e.key === isNextKey) {
      e.preventDefault();
      focusCell(index + 1);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      focusCell(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      focusCell(digits - 1);
      return;
    }
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!pasted) return;
    e.preventDefault();
    handleChange(index, pasted);
  };

  const cells = useMemo(() => Array.from({ length: digits }, (_, i) => rawValue[i] ?? ""), [
    rawValue,
    digits,
  ]);

  const splitAt = digits === 6 ? 3 : null;

  const describedBy = [error ? errorId : null, !error && hint ? hintId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  const renderCell = (i: number) => {
    const hasValue = Boolean(cells[i]);
    const display = toDisplay(cells[i] ?? "", direction);

    return (
      <input
        key={i}
        ref={(el) => {
          cellRefs.current[i] = el;
        }}
        type="text"
        inputMode="numeric"
        autoComplete={i === 0 ? "one-time-code" : "off"}
        pattern="[0-9]*"
        maxLength={1}
        dir={direction}
        disabled={disabled}
        autoFocus={autoFocus && i === 0}
        name={name ? `${name}-${i}` : undefined}
        value={display}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel ?? `Digit ${i + 1} of ${digits}` : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => handleChange(i, e.target.value)}
        onKeyDown={(e) => handleKeyDown(i, e)}
        onPaste={(e) => handlePaste(i, e)}
        onFocus={(e) => e.currentTarget.select()}
        className={cn(
          "h-[44px] w-[44px] rounded-[8px] border bg-transparent px-[4px] py-[2px] text-center text-[24px] font-medium leading-[32px] transition-colors duration-150",
          "focus:outline-none focus:border-[var(--color-primary-500)] focus:shadow-[0_0_0_4px_var(--color-primary-100)]",
          "disabled:cursor-not-allowed disabled:bg-[var(--surface-tertiary)] disabled:text-[var(--text-tertiary)]",
          error
            ? "border-[var(--color-error-600)] shadow-[0_0_0_4px_var(--color-error-100)] text-[var(--color-error-600)] focus:border-[var(--color-error-600)] focus:shadow-[0_0_0_4px_var(--color-error-100)]"
            : "border-[var(--stroke-primary)]",
          hasValue ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]",
        )}
      />
    );
  };

  return (
    <div
      dir={direction}
      className={cn("flex w-full max-w-[380px] flex-col gap-[6px]", className)}
    >
      {label && (
        <span
          id={labelId}
          className="text-[14px] font-medium leading-[20px] text-[var(--text-secondary)]"
        >
          {label}
        </span>
      )}
      <div
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        className="flex items-center gap-[8px]"
      >
        {splitAt
          ? (
            <>
              {Array.from({ length: splitAt }, (_, i) => renderCell(i))}
              <span
                aria-hidden
                className="text-[24px] font-medium leading-[32px] text-[var(--text-tertiary)]"
              >
                —
              </span>
              {Array.from({ length: digits - splitAt }, (_, i) => renderCell(i + splitAt))}
            </>
          )
          : Array.from({ length: digits }, (_, i) => renderCell(i))}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-[12px] leading-[16px] text-[var(--color-error-600)]">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export { NumberInput };
