"use client";

import type { ReactNode } from "react";

interface DoDontProps {
  doItems?: string[];
  dontItems?: string[];
  doContent?: ReactNode;
  dontContent?: ReactNode;
  doTitle?: string;
  dontTitle?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M7 12.5l3 3 7-7"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoDont({
  doItems,
  dontItems,
  doContent,
  dontContent,
  doTitle,
  dontTitle,
}: DoDontProps) {
  return (
    <div className="mt-[12px] grid gap-[24px] md:grid-cols-2">
      {/* Do box — flex-col so inner white box fills remaining height */}
      <div className="flex flex-col overflow-hidden rounded-[12px] bg-[rgba(0,162,81,0.09)] p-[20px]">
        <div className="flex flex-1 flex-col overflow-hidden rounded-[8px] bg-white p-[24px] dark:bg-[var(--surface-primary)]">
          {doContent ?? (
            <ul className="flex flex-col gap-[12px]">
              {doItems?.map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] leading-[20px] text-[var(--text-primary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-[16px] flex items-center gap-[10px]">
          <CheckIcon className="h-[20px] w-[20px] shrink-0 text-[#00a251]" />
          <span className="text-[18px] font-semibold leading-[24px] text-[#00a251]">
            Do
          </span>
        </div>
        {doTitle && (
          <h3 className="mt-[8px] text-[14px] font-normal leading-[22px] text-[var(--text-primary)]">
            {doTitle}
          </h3>
        )}
      </div>
      {/* Don't box */}
      <div className="flex flex-col overflow-hidden rounded-[12px] bg-[rgba(217,45,32,0.10)] p-[20px]">
        <div className="flex flex-1 flex-col overflow-hidden rounded-[8px] bg-white p-[24px] dark:bg-[var(--surface-primary)]">
          {dontContent ?? (
            <ul className="flex flex-col gap-[12px]">
              {dontItems?.map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] leading-[20px] text-[var(--text-primary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-[16px] flex items-center gap-[10px]">
          <CloseIcon className="h-[20px] w-[20px] shrink-0 text-[#d92d20]" />
          <span className="text-[18px] font-semibold leading-[24px] text-[#d92d20]">
            Don&apos;t
          </span>
        </div>
        {dontTitle && (
          <h3 className="mt-[8px] text-[14px] font-normal leading-[22px] text-[var(--text-primary)]">
            {dontTitle}
          </h3>
        )}
      </div>
    </div>
  );
}
