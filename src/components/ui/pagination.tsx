"use client";

import { forwardRef, useMemo } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type PaginationVariant = "buttons" | "input";

const numberBase =
  "inline-flex h-[36px] min-w-[36px] select-none items-center justify-center rounded-[8px] px-[8px] text-[14px] font-medium leading-[20px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2";

function buildPageList(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "…"> = [];
  const showLeftEllipsis = current > 4;
  const showRightEllipsis = current < total - 3;
  pages.push(1);
  if (showLeftEllipsis) pages.push("…");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (showRightEllipsis) pages.push("…");
  pages.push(total);
  return pages;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: PaginationVariant;
  totalRows?: number;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
  rowsPerPageOptions?: number[];
  showNavLabels?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
  dir?: "ltr" | "rtl";
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    currentPage,
    totalPages,
    onPageChange,
    variant = "buttons",
    totalRows,
    rowsPerPage = 20,
    onRowsPerPageChange,
    rowsPerPageOptions = [10, 20, 50, 100],
    showNavLabels = true,
    prevLabel = "Previous",
    nextLabel = "Next",
    className,
    dir = "ltr",
  },
  ref,
) {
  const pages = useMemo(() => buildPageList(currentPage, totalPages), [currentPage, totalPages]);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;
  const isRtl = dir === "rtl";

  const goPrev = () => {
    if (!isFirst) onPageChange(currentPage - 1);
  };
  const goNext = () => {
    if (!isLast) onPageChange(currentPage + 1);
  };

  const start =
    totalRows && totalRows > 0 ? Math.min(totalRows, (currentPage - 1) * rowsPerPage + 1) : 0;
  const end =
    totalRows && totalRows > 0 ? Math.min(totalRows, currentPage * rowsPerPage) : 0;

  const PrevButton = (
    <button
      type="button"
      onClick={goPrev}
      disabled={isFirst}
      aria-label={prevLabel}
      className={cn(
        numberBase,
        "gap-[8px] px-[12px] text-[var(--text-tertiary)] enabled:hover:bg-[var(--surface-alt-tertiary)] enabled:hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
      )}
    >
      <Icon
        name={isRtl ? "caret-right" : "caret-left"}
        weight="bold"
        className="h-[16px] w-[16px]"
      />
      {showNavLabels && <span>{prevLabel}</span>}
    </button>
  );

  const NextButton = (
    <button
      type="button"
      onClick={goNext}
      disabled={isLast}
      aria-label={nextLabel}
      className={cn(
        numberBase,
        "gap-[8px] px-[12px] text-[var(--text-tertiary)] enabled:hover:bg-[var(--surface-alt-tertiary)] enabled:hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
      )}
    >
      {showNavLabels && <span>{nextLabel}</span>}
      <Icon
        name={isRtl ? "caret-left" : "caret-right"}
        weight="bold"
        className="h-[16px] w-[16px]"
      />
    </button>
  );

  if (variant === "buttons") {
    return (
      <nav
        ref={ref}
        dir={dir}
        aria-label="Pagination"
        className={cn(
          "flex w-full items-center justify-center gap-[8px] border-t border-[var(--stroke-primary)] py-[8px]",
          className,
        )}
      >
        <div className="flex min-w-0 flex-1 items-center">{PrevButton}</div>
        <div className="flex shrink-0 items-center gap-[2px]">
          {pages.map((p, idx) =>
            p === "…" ? (
              <span
                key={`e-${idx}`}
                aria-hidden="true"
                className={cn(numberBase, "text-[var(--text-tertiary)]")}
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={cn(
                  numberBase,
                  p === currentPage
                    ? "bg-[var(--surface-alt-tertiary)] text-[var(--header-primary)]"
                    : "text-[var(--text-tertiary)] hover:bg-[var(--surface-alt-tertiary)] hover:text-[var(--text-primary)]",
                )}
              >
                {p}
              </button>
            ),
          )}
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end">{NextButton}</div>
      </nav>
    );
  }

  return (
    <nav
      ref={ref}
      dir={dir}
      aria-label="Pagination"
      className={cn(
        "flex w-full items-center gap-[8px] border-t border-[var(--stroke-primary)] py-[8px]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center">
        {totalRows !== undefined && (
          <p className="text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]">
            {`Showing ${start}-${end} of ${totalRows} rows`}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-[8px]">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          aria-label={prevLabel}
          className={cn(
            numberBase,
            "w-[36px] min-w-[36px] px-0 text-[var(--text-tertiary)] enabled:hover:bg-[var(--surface-alt-tertiary)] enabled:hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
          )}
        >
          <Icon
            name={isRtl ? "caret-right" : "caret-left"}
            weight="bold"
            className="h-[16px] w-[16px]"
          />
        </button>
        <div className="flex items-center gap-[6px]">
          <input
            type="text"
            inputMode="numeric"
            value={String(currentPage).padStart(2, "0")}
            onChange={(e) => {
              const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
              if (!Number.isNaN(n) && n >= 1 && n <= totalPages) onPageChange(n);
            }}
            aria-label="Current page"
            className="h-[36px] w-[45px] rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] px-[14px] text-center text-[14px] leading-[20px] text-[var(--text-primary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] transition-colors focus-visible:border-[var(--color-primary-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
          />
          <span className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]">
            {`of ${totalPages}`}
          </span>
        </div>
        <button
          type="button"
          onClick={goNext}
          disabled={isLast}
          aria-label={nextLabel}
          className={cn(
            numberBase,
            "w-[36px] min-w-[36px] px-0 text-[var(--text-tertiary)] enabled:hover:bg-[var(--surface-alt-tertiary)] enabled:hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
          )}
        >
          <Icon
            name={isRtl ? "caret-left" : "caret-right"}
            weight="bold"
            className="h-[16px] w-[16px]"
          />
        </button>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-end">
        <div className="flex items-center gap-[8px]">
          <span className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-[var(--text-tertiary)]">
            Rows per page
          </span>
          <div className="relative">
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
              aria-label="Rows per page"
              className="h-[32px] w-[66px] appearance-none rounded-[8px] border border-[var(--stroke-primary)] bg-[var(--surface-default)] pl-[12px] pr-[28px] text-[14px] leading-[20px] text-[var(--text-tertiary)] shadow-[0_1px_2px_0_rgba(10,13,18,0.05)] transition-colors focus-visible:border-[var(--color-primary-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
            >
              {rowsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <Icon
              name="caret-down"
              weight="bold"
              className="pointer-events-none absolute right-[10px] top-1/2 h-[12px] w-[12px] -translate-y-1/2 text-[var(--text-tertiary)]"
            />
          </div>
        </div>
      </div>
    </nav>
  );
});
