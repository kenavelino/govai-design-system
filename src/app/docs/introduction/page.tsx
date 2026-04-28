"use client";

import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "design-philosophy", title: "Design Philosophy", level: 2 },
  { id: "when-to-use", title: "When to Use", level: 2 },
  { id: "principles", title: "Core Principles", level: 2 },
];

export default function IntroductionPage() {
  return (
    <>
      <OnThisPage items={tocItems} />

      <div className="space-y-[24px]">
        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Introduction
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System is the unified design language for building consistent, accessible, and scalable AI-native government interfaces across all GovAI products.
          </p>
          <div className="mt-6 rounded-[12px] border border-[var(--stroke-primary)] p-[8px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/intro-diagram.jpg"
              alt="Diagram showing how Figma connects through MCP to Code — the Figma-to-code design workflow"
              className="w-full rounded-[8px]"
            />
          </div>
        </div>

        {/* Overview */}
        <section id="overview">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Overview</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System provides a comprehensive set of design tokens, reusable components, layout patterns, and accessibility guidelines that ensure every product in the GovAI ecosystem delivers a consistent, high-quality user experience.
          </p>
          <p className="mt-5 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Whether you&apos;re building a dashboard for GovAI Hub, a conversational interface for GovGPT, or an internal tool for AI Factory, this system provides the building blocks you need to ship polished, accessible interfaces efficiently.
          </p>
        </section>

        {/* Design Philosophy */}
        <section id="design-philosophy">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Design Philosophy</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI Design System is built on the belief that government AI products should feel modern, approachable, and trustworthy. We prioritize clarity over cleverness, consistency over novelty, and accessibility over aesthetics alone.
          </p>
          <div className="mt-5 grid gap-[12px] md:grid-cols-2">
            {[
              { title: "Clarity", desc: "Every interface element has a clear purpose. Reduce cognitive load through strong visual hierarchy and predictable interactions." },
              { title: "Trust", desc: "Government AI products demand trust. Use established patterns, clear feedback, and transparent data handling to build confidence." },
              { title: "Efficiency", desc: "Minimize time-to-task. Design for power users while remaining approachable for first-time visitors." },
              { title: "Scalability", desc: "Components and patterns that work at any scale — from a simple form to a complex analytical dashboard." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--stroke-primary)] bg-[var(--surface-tertiary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{item.title}</h4>
                <p className="mt-2 text-[14px] leading-[20px] text-[var(--text-tertiary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to Use */}
        <section id="when-to-use">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">When to Use</h2>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Use the GovAI Design System whenever you are building, designing, or reviewing any user-facing interface for a GovAI product. This includes:
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-[20px] text-[16px] leading-[24px] text-[var(--text-secondary)] marker:text-[var(--text-tertiary)]">
            {[
              "New product features and screens",
              "Design reviews and audits",
              "Component implementation in React",
              "Prototyping and wireframing in Figma",
              "Accessibility compliance checks",
              "Design-to-development handoffs",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Core Principles */}
        <section id="principles">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">Core Principles</h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              { num: "01", title: "Consistency First", desc: "Interfaces across GovAI products must look and behave consistently. Use shared components and tokens." },
              { num: "02", title: "Component Reuse", desc: "Use existing components whenever possible. Never introduce custom components when an existing one solves the problem." },
              { num: "03", title: "Token Compliance", desc: "All styling must follow approved tokens. Never use arbitrary spacing, colors, typography, or radius values." },
              { num: "04", title: "Clear Hierarchy", desc: "Layouts should prioritize readability and clarity through strong visual hierarchy." },
              { num: "05", title: "Accessibility", desc: "Interfaces must follow accessibility best practices including contrast, readable typography, and accessible controls." },
            ].map((p) => (
              <div key={p.num} className="rounded-[8px] border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">{p.title}</h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
