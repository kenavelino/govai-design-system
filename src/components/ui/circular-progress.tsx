"use client";

import { cn } from "@/lib/utils";

export type CircularProgressSize = "sm" | "md" | "lg";
export type CircularProgressShape = "circle" | "half";

export interface CircularProgressProps {
  value?: number;
  size?: CircularProgressSize;
  shape?: CircularProgressShape;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
  "aria-label"?: string;
}

// Figma-derived sizes: sm=80px, md=120px, lg=160px
const DIMS: Record<CircularProgressSize, { outer: number; stroke: number; valueFontSize: number; labelFontSize: number }> = {
  sm: { outer: 80,  stroke: 6,  valueFontSize: 16, labelFontSize: 10 },
  md: { outer: 120, stroke: 8,  valueFontSize: 24, labelFontSize: 12 },
  lg: { outer: 160, stroke: 10, valueFontSize: 32, labelFontSize: 14 },
};

export function CircularProgress({
  value = 0,
  size = "md",
  shape = "circle",
  label,
  showValue = true,
  indeterminate = false,
  className,
  "aria-label": ariaLabel = "Progress",
}: CircularProgressProps) {
  const { outer, stroke, valueFontSize, labelFontSize } = DIMS[size];
  const cx = outer / 2;
  const cy = outer / 2;
  // 1px inner padding so the stroke doesn't clip
  const r = (outer - stroke) / 2 - 1;
  const clamped = Math.min(100, Math.max(0, value));

  const fullCirc = 2 * Math.PI * r;
  const halfCirc = Math.PI * r;

  // ─── Full circle ───────────────────────────────────────────────
  if (shape === "circle") {
    return (
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
        aria-busy={indeterminate}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: outer, height: outer }}
      >
        <svg
          width={outer}
          height={outer}
          viewBox={`0 0 ${outer} ${outer}`}
          className={cn(indeterminate && "animate-[spin_1.4s_linear_infinite]")}
          style={{ transformOrigin: "center" }}
        >
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            strokeWidth={stroke}
            className="stroke-[var(--surface-alt-tertiary)]"
          />
          {/* Arc */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="stroke-[var(--color-primary-600)]"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={
              indeterminate
                ? { strokeDasharray: `${fullCirc * 0.75} ${fullCirc * 0.25}` }
                : {
                    strokeDasharray: fullCirc,
                    strokeDashoffset: fullCirc * (1 - clamped / 100),
                    transition: "stroke-dashoffset 300ms var(--ease-out)",
                  }
            }
          />
        </svg>

        {/* Centre label — not rotated */}
        {showValue && !indeterminate && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {label && (
              <span
                className="mb-[4px] font-normal text-[var(--text-tertiary)]"
                style={{ fontSize: labelFontSize }}
              >
                {label}
              </span>
            )}
            <span
              className="font-medium leading-none text-[var(--header-primary)]"
              style={{ fontSize: valueFontSize }}
            >
              {Math.round(clamped)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  // ─── Half circle ───────────────────────────────────────────────
  // Arc from left (cx-r, cy) clockwise through the top to right (cx+r, cy)
  const svgH = cy + stroke / 2 + 2;
  const arc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Text lives INSIDE the arc — value's baseline sits at the flat edge,
  // label stacked above. Matches Figma node 314-8821.
  const labelGap = 4;
  const valueBaselineY = cy - Math.max(2, Math.round(stroke / 2));
  const labelBaselineY = valueBaselineY - valueFontSize - labelGap;

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={cn("inline-flex flex-col items-center", className)}
    >
      <svg
        width={outer}
        height={svgH}
        viewBox={`0 0 ${outer} ${svgH}`}
        style={{ overflow: "visible" }}
      >
        {/* Track */}
        <path
          d={arc}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-[var(--surface-alt-tertiary)]"
        />
        {/* Arc */}
        <path
          d={arc}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-[var(--color-primary-600)]"
          style={{
            strokeDasharray: halfCirc,
            strokeDashoffset: halfCirc * (1 - clamped / 100),
            transition: "stroke-dashoffset 300ms var(--ease-out)",
          }}
        />
        {/* Value text anchored to arc's flat baseline */}
        {showValue && (
          <text
            x={cx}
            y={valueBaselineY}
            textAnchor="middle"
            style={{ fontSize: valueFontSize, fontWeight: 500, fill: "var(--header-primary)", fontFamily: "inherit" }}
          >
            {Math.round(clamped)}%
          </text>
        )}
      </svg>
    </div>
  );
}
