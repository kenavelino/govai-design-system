"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type DropdownSize = "md" | "sm";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  size?: DropdownSize;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  direction?: "ltr" | "rtl";
  leadingIcon?: ReactNode;
  className?: string;
  name?: string;
  id?: string;
  mandatory?: boolean;
}

const sizeStyles: Record<DropdownSize, { trigger: string; text: string }> = {
  md: {
    trigger: "min-h-[44px] px-[14px] py-[10px]",
    text: "text-[16px] leading-[24px]",
  },
  sm: {
    trigger: "min-h-[40px] px-[12px] py-[8px]",
    text: "text-[14px] leading-[20px]",
  },
};

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(function Dropdown(
  {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = "Select an option",
    label,
    hint,
    error,
    size = "md",
    multiple = false,
    searchable = false,
    disabled = false,
    readOnly = false,
    direction = "ltr",
    leadingIcon,
    className,
    name,
    id,
    mandatory = false,
  },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? `dropdown-${reactId}`;
  const labelId = `${fieldId}-label`;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const listboxId = `${fieldId}-listbox`;

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return multiple ? [] : "";
  });
  const currentValue = (isControlled ? controlledValue : internalValue) as
    | string
    | string[];

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedValues = useMemo<string[]>(() => {
    if (multiple) return Array.isArray(currentValue) ? currentValue : [];
    return typeof currentValue === "string" && currentValue
      ? [currentValue]
      : [];
  }, [currentValue, multiple]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !query) return options;
    const q = query.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q),
    );
  }, [options, query, searchable]);

  const commit = useCallback(
    (next: string | string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleSelect = useCallback(
    (option: DropdownOption) => {
      if (option.disabled) return;
      if (multiple) {
        const current = Array.isArray(currentValue) ? currentValue : [];
        const exists = current.includes(option.value);
        const next = exists
          ? current.filter((v) => v !== option.value)
          : [...current, option.value];
        commit(next);
      } else {
        commit(option.value);
        setIsOpen(false);
        setQuery("");
      }
    },
    [commit, currentValue, multiple],
  );

  const removeTag = useCallback(
    (optionValue: string) => {
      if (!multiple) return;
      const current = Array.isArray(currentValue) ? currentValue : [];
      commit(current.filter((v) => v !== optionValue));
    },
    [commit, currentValue, multiple],
  );

  const selectedOptions = useMemo(
    () => options.filter((o) => selectedValues.includes(o.value)),
    [options, selectedValues],
  );

  useEffect(() => {
    if (!isOpen) return;
    function onDocMouseDown(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      const inContainer = containerRef.current?.contains(target);
      const inMenu = menuRef.current?.contains(target);
      if (!inContainer && !inMenu) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || !mounted) return;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      const menu = menuRef.current;
      if (!rect || !menu) return;
      menu.style.left = `${rect.left}px`;
      menu.style.top = `${rect.bottom + 6}px`;
      menu.style.width = `${rect.width}px`;
    };
    updatePosition();
    const onScroll = (event: Event) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      updatePosition();
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, mounted, filteredOptions.length]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
      return;
    }
    const firstSelected = filteredOptions.findIndex((o) =>
      selectedValues.includes(o.value),
    );
    setActiveIndex(firstSelected >= 0 ? firstSelected : 0);
    if (searchable) {
      const timeoutId = window.setTimeout(() => searchRef.current?.focus(), 10);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isOpen, filteredOptions, selectedValues, searchable]);

  const openMenu = () => {
    if (disabled || readOnly) return;
    setIsOpen(true);
  };

  const toggleMenu = () => {
    if (disabled || readOnly) return;
    setIsOpen((v) => !v);
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) return;
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openMenu();
    }
  };

  const moveActive = (delta: number) => {
    if (filteredOptions.length === 0) return;
    setActiveIndex((current) => {
      let next = current + delta;
      let guard = 0;
      while (guard < filteredOptions.length) {
        if (next < 0) next = filteredOptions.length - 1;
        if (next >= filteredOptions.length) next = 0;
        if (!filteredOptions[next]?.disabled) return next;
        next += delta > 0 ? 1 : -1;
        guard += 1;
      }
      return current;
    });
  };

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(filteredOptions.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option) handleSelect(option);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setQuery("");
    } else if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  const displayText = useMemo(() => {
    if (multiple) return null;
    const selected = selectedOptions[0];
    return selected?.label ?? "";
  }, [multiple, selectedOptions]);

  const hasSelection = selectedValues.length > 0;

  const triggerStateClasses = error
    ? "border-[var(--color-error-600)] hover:border-[var(--color-error-600)]"
    : isOpen
      ? "border-[var(--color-primary-600)] shadow-[0_0_0_4px_var(--color-primary-100)]"
      : "border-[var(--stroke-primary)] hover:border-[var(--stroke-secondary)] focus-visible:border-[var(--color-primary-300)] focus-visible:shadow-[0_0_0_4px_var(--color-primary-100)]";

  const triggerBg = readOnly
    ? "bg-[var(--surface-tertiary)]"
    : disabled
      ? "bg-[var(--surface-disabled)]"
      : "bg-transparent";

  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div
      dir={direction}
      className={cn("flex w-full flex-col gap-[6px]", className)}
      ref={containerRef}
    >
      {label && (
        <div className="flex items-center justify-between">
          <label
            id={labelId}
            htmlFor={fieldId}
            className="flex items-center gap-[4px] text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]"
          >
            {label}
            {mandatory && (
              <span
                aria-hidden
                className="text-[14px] font-medium leading-[20px] text-[var(--color-error-600)]"
              >
                *
              </span>
            )}
          </label>
        </div>
      )}

      <div className="relative">
        <button
          ref={(node) => {
            triggerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }}
          type="button"
          id={fieldId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          disabled={disabled}
          aria-readonly={readOnly || undefined}
          data-state={isOpen ? "open" : "closed"}
          onClick={toggleMenu}
          onKeyDown={handleTriggerKeyDown}
          name={!multiple && name ? name : undefined}
          className={cn(
            "flex w-full items-center gap-[8px] rounded-[8px] border text-left transition-[box-shadow,border-color] duration-150 shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
            "focus:outline-none",
            sizeStyles[size].trigger,
            triggerBg,
            triggerStateClasses,
            (disabled || readOnly) && "cursor-not-allowed",
            !disabled && !readOnly && "cursor-pointer",
          )}
        >
          {leadingIcon && (
            <span
              className={cn(
                "inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center",
                error
                  ? "text-[var(--color-error-600)]"
                  : disabled
                    ? "text-[var(--text-alt-tertiary)]"
                    : "text-[var(--icon-tertiary)]",
              )}
            >
              {leadingIcon}
            </span>
          )}

          <span
            className={cn(
              "flex min-w-0 flex-1 flex-wrap items-center gap-[6px]",
              sizeStyles[size].text,
            )}
          >
            {multiple && hasSelection ? (
              selectedOptions.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-[4px] rounded-[6px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] px-[6px] py-[2px] text-[12px] font-medium leading-[16px] text-[var(--text-primary)]"
                >
                  {opt.label}
                  {!disabled && !readOnly && (
                    <span
                      role="button"
                      aria-label={`Remove ${opt.label}`}
                      tabIndex={-1}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(opt.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          removeTag(opt.value);
                        }
                      }}
                      className="inline-flex h-[14px] w-[14px] cursor-pointer items-center justify-center rounded-[999px] text-[var(--icon-tertiary)] hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)]"
                    >
                      <Icon name="x" className="h-[10px] w-[10px]" />
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span
                className={cn(
                  "truncate",
                  hasSelection
                    ? disabled
                      ? "text-[var(--text-alt-tertiary)]"
                      : readOnly
                        ? "text-[var(--text-secondary)]"
                        : "text-[var(--text-primary)]"
                    : disabled
                      ? "text-[var(--text-alt-tertiary)]"
                      : "text-[var(--text-tertiary)]",
                )}
              >
                {displayText || placeholder}
              </span>
            )}
          </span>

          <Icon
            name="caret-down"
            className={cn(
              "h-[16px] w-[16px] shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
              error
                ? "text-[var(--color-error-600)]"
                : disabled
                  ? "text-[var(--text-alt-tertiary)]"
                  : "text-[var(--icon-tertiary)]",
            )}
          />
        </button>

        {isOpen && mounted && createPortal(
          <div
            ref={menuRef}
            dir={direction}
            style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
            onKeyDown={handleMenuKeyDown}
            className={cn(
              "flex flex-col gap-[6px] rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] p-[8px] shadow-[0_8px_16px_0_rgba(0,0,0,0.12)]",
            )}
          >
            {searchable && (
              <div className="flex items-center gap-[8px] rounded-[8px] border border-[var(--stroke-primary)] bg-transparent px-[12px] py-[8px] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]">
                <Icon
                  name="magnifying-glass"
                  className="h-[16px] w-[16px] shrink-0 text-[var(--icon-tertiary)]"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  aria-label="Search options"
                  className="min-w-0 flex-1 bg-transparent text-[14px] leading-[20px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="inline-flex h-[16px] w-[16px] items-center justify-center rounded-[4px] text-[var(--icon-tertiary)] hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)]"
                  >
                    <Icon name="x" className="h-[12px] w-[12px]" />
                  </button>
                )}
              </div>
            )}

            <ul
              role="listbox"
              id={listboxId}
              aria-multiselectable={multiple || undefined}
              aria-labelledby={label ? labelId : undefined}
              tabIndex={-1}
              className="flex max-h-[280px] flex-col gap-[2px] overflow-y-auto"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-[8px] py-[10px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  No results found
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = selectedValues.includes(option.value);
                  const isActive = index === activeIndex;
                  return (
                    <li
                      key={option.value}
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled || undefined}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "flex cursor-pointer items-start gap-[12px] rounded-[6px] px-[8px] py-[8px] transition-colors",
                        option.disabled && "cursor-not-allowed opacity-60",
                        isSelected
                          ? "bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-950)]"
                          : isActive
                            ? "bg-[var(--surface-tertiary)]"
                            : "bg-transparent",
                      )}
                    >
                      {multiple && (
                        <span
                          aria-hidden
                          className={cn(
                            "mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                            isSelected
                              ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)] text-white"
                              : "border-[var(--stroke-primary)] bg-[var(--surface-primary)]",
                          )}
                        >
                          {isSelected && (
                            <Icon name="check" className="h-[10px] w-[10px]" />
                          )}
                        </span>
                      )}
                      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                        <span
                          className={cn(
                            "text-[14px] font-medium leading-[20px]",
                            isSelected
                              ? "text-[var(--color-primary-700)] dark:text-[var(--color-primary-400)]"
                              : "text-[var(--header-primary)]",
                          )}
                        >
                          {option.label}
                        </span>
                        {option.description && (
                          <span
                            className={cn(
                              "text-[12px] leading-[16px]",
                              isSelected
                                ? "text-[var(--color-primary-700)] dark:text-[var(--color-primary-400)]"
                                : "text-[var(--text-tertiary)]",
                            )}
                          >
                            {option.description}
                          </span>
                        )}
                      </span>
                      {!multiple && isSelected && (
                        <Icon
                          name="check"
                          className="mt-[2px] h-[16px] w-[16px] shrink-0 text-[var(--color-primary-600)]"
                        />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body,
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-[12px] leading-[16px] text-[var(--color-error-600)]"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className={cn(
            "text-[12px] leading-[16px]",
            disabled ? "text-[var(--text-disabled)]" : "text-[var(--text-tertiary)]",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export { Dropdown };
