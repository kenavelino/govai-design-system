"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc" | "none";

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "right" | "center";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[];
  data: T[];
  selectable?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  headerSize?: "sm" | "lg";
  onSelectionChange?: (selectedRows: T[]) => void;
  emptyState?: React.ReactNode;
  className?: string;
  getRowKey?: (row: T, index: number) => string | number;
  isRowDisabled?: (row: T) => boolean;
}

function SortIcon({ direction }: { direction: SortDirection }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="ml-[4px] h-[14px] w-[14px] shrink-0"
      aria-hidden
    >
      <path
        d="M8 3.5L5.5 6.5H10.5L8 3.5Z"
        fill={direction === "asc" ? "var(--color-primary-600)" : "var(--color-neutral-400)"}
      />
      <path
        d="M8 12.5L10.5 9.5H5.5L8 12.5Z"
        fill={direction === "desc" ? "var(--color-primary-600)" : "var(--color-neutral-400)"}
      />
    </svg>
  );
}

function TableCheckbox({
  checked,
  indeterminate,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center", disabled && "cursor-not-allowed")}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
        aria-label={label}
        ref={(el) => {
          if (el) el.indeterminate = !!indeterminate;
        }}
      />
      <span
        aria-hidden
        className={cn(
          "relative flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border transition-colors",
          disabled
            ? "border-[var(--stroke-primary)] bg-[var(--surface-disabled)]"
            : checked || indeterminate
            ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)]"
            : "border-[var(--color-neutral-300)] bg-white hover:border-[var(--color-primary-600)]",
        )}
      >
        {indeterminate && !checked ? (
          <svg viewBox="0 0 10 10" className="h-[10px] w-[10px]" aria-hidden>
            <path d="M2 5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : checked ? (
          <svg viewBox="0 0 10 10" className="h-[10px] w-[10px]" aria-hidden>
            <path
              d="M1.5 5l2.5 2.5 4.5-5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
    </label>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  striped = false,
  stickyHeader = false,
  headerSize = "sm",
  onSelectionChange,
  emptyState,
  className,
  getRowKey = (_, i) => i,
  isRowDisabled,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDirection((d) => (d === "asc" ? "desc" : d === "desc" ? "none" : "asc"));
        if (sortDirection === "desc") setSortKey(null);
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    },
    [sortKey, sortDirection],
  );

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || sortDirection === "none") return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const cmp = String(aVal ?? "").localeCompare(String(bVal ?? ""), undefined, { numeric: true });
    return sortDirection === "asc" ? cmp : -cmp;
  });

  const allKeys = sortedData.map((row, i) => getRowKey(row, i));
  const enabledKeys = sortedData
    .map((row, i) => ({ key: getRowKey(row, i), disabled: isRowDisabled?.(row) }))
    .filter((r) => !r.disabled)
    .map((r) => r.key);

  const allSelected = enabledKeys.length > 0 && enabledKeys.every((k) => selectedKeys.has(k));
  const someSelected = enabledKeys.some((k) => selectedKeys.has(k));

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const next = new Set(selectedKeys);
      if (checked) {
        enabledKeys.forEach((k) => next.add(k));
      } else {
        enabledKeys.forEach((k) => next.delete(k));
      }
      setSelectedKeys(next);
      onSelectionChange?.(
        sortedData.filter((row, i) => next.has(getRowKey(row, i))),
      );
    },
    [enabledKeys, selectedKeys, sortedData, getRowKey, onSelectionChange],
  );

  const handleSelectRow = useCallback(
    (key: string | number, checked: boolean) => {
      const next = new Set(selectedKeys);
      if (checked) next.add(key);
      else next.delete(key);
      setSelectedKeys(next);
      onSelectionChange?.(
        sortedData.filter((row, i) => next.has(getRowKey(row, i))),
      );
    },
    [selectedKeys, sortedData, getRowKey, onSelectionChange],
  );

  const headerHeight = headerSize === "lg" ? "h-[56px]" : "h-[40px]";

  return (
    <div className={cn("w-full overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]", className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead className={cn(stickyHeader && "sticky top-0 z-10")}>
            <tr className={cn("border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]")}>
              {selectable && (
                <th className={cn("w-[44px] px-[14px]", headerHeight)}>
                  <TableCheckbox
                    checked={allSelected}
                    indeterminate={!allSelected && someSelected}
                    onChange={handleSelectAll}
                    label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={cn(
                    "px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)] whitespace-nowrap",
                    headerHeight,
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.sortable && "cursor-pointer select-none",
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable && sortKey === col.key
                      ? sortDirection === "asc"
                        ? "ascending"
                        : sortDirection === "desc"
                        ? "descending"
                        : "none"
                      : col.sortable
                      ? "none"
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <SortIcon direction={sortKey === col.key ? sortDirection : "none"} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-[16px] py-[40px] text-center text-[14px] text-[var(--text-tertiary)]"
                >
                  {emptyState ?? "No data available"}
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = selectedKeys.has(key);
                const isDisabled = isRowDisabled?.(row) ?? false;
                const isStriped = striped && rowIndex % 2 === 1;

                return (
                  <tr
                    key={key}
                    className={cn(
                      "border-b border-[var(--stroke-primary)] last:border-0 transition-colors",
                      isDisabled
                        ? "opacity-50"
                        : isSelected
                        ? "bg-[var(--color-primary-50)]"
                        : isStriped
                        ? "bg-[var(--surface-tertiary)] hover:bg-[var(--surface-primary)]"
                        : "hover:bg-[var(--surface-primary)]",
                    )}
                    aria-selected={selectable ? isSelected : undefined}
                  >
                    {selectable && (
                      <td className="h-[72px] w-[44px] px-[14px]">
                        <TableCheckbox
                          checked={isSelected}
                          disabled={isDisabled}
                          onChange={(checked) => handleSelectRow(key, checked)}
                          label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const value = row[col.key];
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "h-[72px] px-[16px] leading-[20px] text-[var(--text-primary)]",
                            col.align === "right" && "text-right",
                            col.align === "center" && "text-center",
                          )}
                        >
                          {col.render ? col.render(value, row) : String(value ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
