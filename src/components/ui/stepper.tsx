"use client";

import { cn } from "@/lib/utils";

export type StepStatus = "complete" | "current" | "error" | "waiting";

export interface StepItem {
  label: string;
  description?: string;
  status: StepStatus;
}

export interface StepperProps {
  steps: StepItem[];
  direction?: "vertical" | "horizontal";
  type?: "number" | "dot";
  className?: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-[12px] w-[12px]" aria-hidden>
      <path
        d="M2 6l3 3 5-6"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="h-[12px] w-[12px]" aria-hidden>
      <path
        d="M2.5 2.5l7 7M9.5 2.5l-7 7"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepBadge({
  status,
  stepNumber,
  type,
}: {
  status: StepStatus;
  stepNumber: number;
  type: "number" | "dot";
}) {
  if (type === "dot") {
    return (
      <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center">
        <div
          className={cn(
            "rounded-full transition-all duration-200",
            status === "complete" && "h-[10px] w-[10px] bg-[var(--color-primary-600)]",
            status === "current" &&
              "h-[12px] w-[12px] bg-[var(--color-primary-600)] outline outline-[4px] outline-[var(--color-primary-100)]",
            status === "error" && "h-[10px] w-[10px] bg-[var(--color-error-600)]",
            status === "waiting" &&
              "h-[10px] w-[10px] border-[2px] border-[var(--color-neutral-300)] bg-transparent",
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full transition-all duration-200",
        (status === "complete" || status === "current") && "bg-[var(--color-primary-600)]",
        status === "error" && "bg-[var(--color-error-600)]",
        status === "waiting" && "bg-[var(--color-neutral-100)]",
      )}
    >
      {status === "complete" && <CheckIcon />}
      {status === "current" && (
        <span className="text-[14px] font-medium leading-[20px] text-white">
          {stepNumber}
        </span>
      )}
      {status === "error" && <XIcon />}
      {status === "waiting" && (
        <span className="text-[14px] font-medium leading-[20px] text-[var(--color-neutral-700)]">
          {stepNumber}
        </span>
      )}
    </div>
  );
}

export function Stepper({
  steps,
  direction = "vertical",
  type = "number",
  className,
}: StepperProps) {
  if (direction === "horizontal") {
    return (
      <div className={cn("flex w-full", className)} role="list">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const connectorFilled = step.status === "complete";

          return (
            <div
              key={index}
              className={cn("flex flex-1 flex-col", !isLast && "min-w-0")}
              role="listitem"
              aria-current={step.status === "current" ? "step" : undefined}
            >
              <div className="flex items-center pr-[6px]">
                <StepBadge status={step.status} stepNumber={index + 1} type={type} />
                {!isLast && (
                  <div
                    className={cn(
                      "h-[2px] flex-1 transition-colors duration-300",
                      connectorFilled
                        ? "bg-[var(--color-primary-600)]"
                        : "bg-[var(--color-neutral-200)]",
                    )}
                  />
                )}
              </div>
              <div className="mt-[8px]">
                <p
                  className={cn(
                    "text-[14px] font-medium leading-[20px] transition-colors duration-200",
                    step.status === "current"
                      ? "text-[var(--color-primary-900)]"
                      : "text-[var(--color-neutral-950)]",
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p
                    className={cn(
                      "text-[14px] leading-[20px] transition-colors duration-200",
                      step.status === "current"
                        ? "text-[var(--color-primary-700)]"
                        : "text-[var(--color-neutral-700)]",
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)} role="list">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const connectorFilled = step.status === "complete";

        return (
          <div
            key={index}
            className="flex items-start gap-[12px]"
            role="listitem"
            aria-current={step.status === "current" ? "step" : undefined}
          >
            <div className="flex shrink-0 flex-col items-center gap-[6px] self-stretch pb-[6px]">
              <StepBadge status={step.status} stepNumber={index + 1} type={type} />
              {!isLast && (
                <div
                  className={cn(
                    "w-[2px] min-h-[16px] flex-1 rounded-full transition-colors duration-300",
                    connectorFilled
                      ? "bg-[var(--color-primary-600)]"
                      : "bg-[var(--color-neutral-200)]",
                  )}
                />
              )}
            </div>
            <div className={cn("flex flex-col pt-[4px]", !isLast && "pb-[24px]")}>
              <p
                className={cn(
                  "text-[14px] font-medium leading-[20px] transition-colors duration-200",
                  step.status === "current"
                    ? "text-[var(--color-primary-900)]"
                    : "text-[var(--color-neutral-950)]",
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p
                  className={cn(
                    "text-[14px] leading-[20px] transition-colors duration-200",
                    step.status === "current"
                      ? "text-[var(--color-primary-700)]"
                      : "text-[var(--color-neutral-700)]",
                  )}
                >
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
