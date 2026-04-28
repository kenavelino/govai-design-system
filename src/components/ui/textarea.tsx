"use client";

import { forwardRef, useId, useRef, useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export type TextAreaType = "default" | "tags";

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
  type?: TextAreaType;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      hint,
      error,
      required,
      disabled,
      readOnly,
      dir = "ltr",
      type = "default",
      tags,
      onTagsChange,
      id,
      placeholder,
      onChange,
      ...props
    },
    ref
  ) => {
    const uid = useId();
    const inputId = id ?? `textarea-${uid}`;
    const isAr = dir === "rtl";

    const isTagsMode = type === "tags";

    if (isTagsMode) {
      return (
        <TagsTextArea
          label={label}
          hint={hint}
          error={error}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          dir={dir}
          tags={tags ?? []}
          onTagsChange={onTagsChange}
          id={inputId}
          placeholder={placeholder ?? (isAr ? "أدخل العلامات" : "Enter tags")}
          className={className}
        />
      );
    }

    const borderClass = error
      ? "border-[var(--color-error-600)]"
      : "border-[var(--stroke-primary)] hover:border-[var(--stroke-secondary)]";

    const focusClass = error
      ? "focus:ring-[var(--color-error-500)] focus:border-[var(--color-error-600)]"
      : "focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)]";

    return (
      <div dir={dir} className="flex w-full flex-col gap-[6px]">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]"
          >
            {label}
            {required && (
              <span className="ml-[2px] text-[var(--color-error-600)]">*</span>
            )}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            id={inputId}
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            dir={dir}
            placeholder={placeholder}
            onChange={onChange}
            className={cn(
              "min-h-[128px] w-full rounded-[8px] border px-[14px] py-[10px] pb-[24px]",
              "text-[16px] leading-[24px] text-[var(--header-primary)]",
              "bg-transparent shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
              "placeholder:text-[var(--text-tertiary)]",
              "resize-y transition-colors duration-200",
              "outline-none focus:ring-2 focus:ring-offset-0",
              borderClass,
              focusClass,
              disabled &&
                "cursor-not-allowed resize-none bg-[var(--surface-disabled)] text-[var(--text-disabled)] opacity-60 hover:border-[var(--stroke-primary)]",
              readOnly &&
                "cursor-default resize-none bg-[var(--surface-tertiary)] hover:border-[var(--stroke-primary)]",
              className
            )}
            {...props}
          />
          {!disabled && (
            <div
              className={cn(
                "pointer-events-none absolute bottom-[8px] text-[var(--text-tertiary)]",
                isAr ? "left-[10px]" : "right-[10px]"
              )}
            >
              {error ? (
                <Icon name="info" className="size-[16px] text-[var(--color-error-600)]" />
              ) : (
                <Icon name="arrows-out-simple" className="size-[16px]" />
              )}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[14px] leading-[20px] text-[var(--color-error-600)]">
            {error}
          </p>
        ) : hint ? (
          <p className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

interface TagsTextAreaProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  dir?: "ltr" | "rtl";
  tags: string[];
  onTagsChange?: (tags: string[]) => void;
  id?: string;
  placeholder?: string;
  className?: string;
}

function TagsTextArea({
  label,
  hint,
  error,
  required,
  disabled,
  readOnly,
  dir = "ltr",
  tags,
  onTagsChange,
  id,
  placeholder,
  className,
}: TagsTextAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const isAr = dir === "rtl";

  const addTag = (value: string) => {
    const trimmed = value.trim().replace(/,+$/, "").trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onTagsChange?.([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    onTagsChange?.(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const borderClass = error
    ? "border-[var(--color-error-600)]"
    : focused
      ? "border-[var(--color-primary-500)] ring-2 ring-[var(--color-primary-500)] ring-offset-0"
      : "border-[var(--stroke-primary)] hover:border-[var(--stroke-secondary)]";

  return (
    <div dir={dir} className="flex w-full flex-col gap-[6px]">
      {label && (
        <label
          htmlFor={id}
          className="text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]"
        >
          {label}
          {required && (
            <span className="ml-[2px] text-[var(--color-error-600)]">*</span>
          )}
        </label>
      )}
      <div
        className={cn(
          "relative min-h-[128px] w-full cursor-text rounded-[8px] border px-[14px] py-[10px] pb-[24px]",
          "bg-transparent shadow-[0_1px_2px_0_rgba(10,13,18,0.05)]",
          "transition-colors duration-200",
          borderClass,
          disabled && "cursor-not-allowed bg-[var(--surface-disabled)] opacity-60",
          readOnly && "bg-[var(--surface-tertiary)]",
          className
        )}
        onClick={() => !disabled && !readOnly && tagInputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-[6px]">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-[4px] rounded-full bg-[var(--surface-tertiary)] px-[10px] py-[3px] text-[14px] leading-[20px] text-[var(--header-primary)] border border-[var(--stroke-primary)]"
            >
              {tag}
              {!disabled && !readOnly && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(i);
                  }}
                  className="ml-[2px] text-[var(--text-tertiary)] hover:text-[var(--header-primary)] transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <Icon name="x" className="size-[12px]" />
                </button>
              )}
            </span>
          ))}
          {!disabled && !readOnly && (
            <input
              ref={tagInputRef}
              id={id}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                if (inputValue) addTag(inputValue);
              }}
              placeholder={tags.length === 0 ? placeholder : ""}
              dir={dir}
              className="min-w-[120px] flex-1 bg-transparent text-[16px] leading-[24px] text-[var(--header-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
            />
          )}
        </div>
        {!disabled && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-[8px] text-[var(--text-tertiary)]",
              isAr ? "left-[10px]" : "right-[10px]"
            )}
          >
            {error ? (
              <Icon name="info" className="size-[16px] text-[var(--color-error-600)]" />
            ) : (
              <Icon name="arrows-out-simple" className="size-[16px]" />
            )}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-[14px] leading-[20px] text-[var(--color-error-600)]">{error}</p>
      ) : hint ? (
        <p className="text-[14px] leading-[20px] text-[var(--text-tertiary)]">{hint}</p>
      ) : null}
    </div>
  );
}

export { TextArea };
