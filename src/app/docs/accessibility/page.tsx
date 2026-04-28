"use client";

import Image from "next/image";
import { OnThisPage } from "@/components/docs/on-this-page";

const tocItems = [
  { id: "introduction", title: "Introduction & Overview", level: 2 },
  { id: "key-considerations", title: "Key Accessibility Considerations", level: 2 },
  { id: "low-vision", title: "1. Low Vision", level: 3 },
  { id: "blindness", title: "2. Blindness", level: 3 },
  { id: "additional-resources", title: "Additional Resources", level: 2 },
];

const lowVisionBestPractices = [
  "Ensure AA contrast for text and icons.",
  "Validate color contrast using tools like the Contrast Figma plugin.",
  "Check color blindness compatibility with the Color Blind plugin.",
  "Communicate beyond color — ensure meaning is conveyed via shapes, labels, or patterns.",
  "Place controls near their labels; avoid ambiguity.",
  "Avoid relying solely on peripheral elements or motion cues.",
];

const lowVisionDos = [
  "Use text labels for icon buttons.",
  "Provide sufficient color contrast.",
  "Test layouts in monochrome.",
];

const lowVisionDonts = [
  "Use color as the only information carrier.",
  "Place labels far from inputs.",
  "Hide important info in fleeting animations.",
];

const visionSimulations = [
  { label: "Regular Vision", bg: "#4672F9", fg: "#F7F8FA", desc: "Normal color perception without limitations." },
  { label: "Achromatopsia", bg: "#5F5F5F", fg: "#F8F8F8", desc: "Complete colour blindness; vision is only in shades of gray." },
  { label: "Deuteranopia", bg: "#2753E4", fg: "#F7F8FA", desc: "Red green colour blindness caused by missing green cones." },
  { label: "Tritanopia", bg: "#008880", fg: "#F6F9F9", desc: "Blue yellow colour blindness caused by missing blue cones." },
  { label: "Blurred Vision", bg: "#2463EB", fg: "#F7F8FA", desc: "Reduced sharpness and detail, simulating low visual acuity.", blur: true },
];

const blindnessBestPractices = [
  "Ensure all content (including images and video) has text alternatives.",
  "Use a linear, logical layout for content and task flows.",
  "Avoid “infinite traps” — ensure users can skip repetitive sections.",
  "Provide keyboard navigation for all interactions.",
  "Use descriptive labels and headings for clarity.",
];

const blindnessDos = [
  "Add alt text to images.",
  "Ensure keyboard shortcuts and tab navigation work.",
  "Design simple, intuitive flows.",
];

const blindnessDonts = [
  "Create endless lists without skip options.",
  "Rely on visual-only cues.",
  "Use jargon-heavy or overly technical labels.",
];

const additionalResources = [
  {
    title: "Do’s and Don’ts",
    desc: "A digestible guide for considering accessibility among different disabilities.",
    href: "https://ukhomeoffice.github.io/accessibility-posters/posters/accessibility-posters.pdf",
  },
  {
    title: "Web Guidelines",
    desc: "Web Content Accessibility Guidelines (WCAG) sets a standard for accessibility.",
    href: "https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=144&currentsidebar=%23col_overview#principle1",
  },
  {
    title: "Intro Tutorials",
    desc: "A video series called A11ycast by Google Chrome developers teach the basics.",
    href: "https://www.youtube.com/watch?v=cOmehxAU_4s&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=12&ab_channel=GoogleChromeDevelopers",
  },
  {
    title: "Mental Models",
    desc: "A short article about how people who are blind experience mobile apps.",
    href: "https://medium.com/@DanielleTobey/what-your-mobile-app-looks-like-to-someone-who-is-blind-1baee2ffeadb",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <OnThisPage items={tocItems} />

      <div className="space-y-[40px]">
        {/* Header */}
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Accessibility
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Inclusive design principles and guidance for building AI products that are usable by everyone.
          </p>
        </div>

        {/* Introduction & Overview */}
        <section id="introduction" className="space-y-[16px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Introduction & Overview
          </h2>
          <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Accessibility ensures that all users, regardless of ability, can perceive, understand, navigate, and interact with AI-powered systems. For the AI Factory DLS, this means every product must be usable, inclusive, and compliant with global accessibility standards such as the Web Content Accessibility Guidelines (WCAG) 2.1 AA.
          </p>
          <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
            AI-driven systems often add complexity, but by embedding accessibility principles into design and development, we ensure equal access to information, efficiency of use, and trust across diverse citizen and administrator experiences.
          </p>
          <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Reference:{" "}
            <a
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-primary-600)] underline hover:text-[var(--color-primary-700)]"
            >
              WCAG Accessibility Guidelines
            </a>
          </p>
        </section>

        {/* Key Accessibility Considerations */}
        <section id="key-considerations" className="space-y-[32px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Key Accessibility Considerations
          </h2>

          {/* 1. Low Vision */}
          <div id="low-vision" className="space-y-[20px]">
            <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
              1. Low Vision
            </h3>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Challenges:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                Users may zoom, adjust colors, or use screen readers alongside usable vision. Eye strain and poor contrast are common barriers.
              </p>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Accessibility Considerations:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                Contrast, reliance on color, peripheral elements, motion.
              </p>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Best Practices:
              </p>
              <ul className="list-disc space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                {lowVisionBestPractices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Do’s:
              </p>
              <ul className="list-disc space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                {lowVisionDos.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Don’ts:
              </p>
              <ul className="list-disc space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                {lowVisionDonts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Tools & Techniques:
              </p>
            </div>

            <div className="space-y-[12px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                1. Figma Contrast plugin:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                “Contrast” is a Figma plugin that is great to use to check for color contrast. This plugin checks if the color contrast levels adhere to the WCAG requirements.
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                If you select a layer of text and right click to select the plugin, a window will tell you if it passes AA standards.
              </p>

              <div className="mt-2 overflow-hidden rounded-[12px] bg-white">
                <Image
                  src="/docs/accessibility/contrast-plugin.png"
                  alt="Figma Contrast plugin screenshot showing WCAG contrast check results"
                  width={732}
                  height={882}
                  className="h-auto w-full max-w-[560px]"
                />
              </div>
            </div>

            <div className="space-y-[12px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                2. Figma Color Blind plugin:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                “Color Blind” is a Figma plugin we have pre-installed to empathize with people who have color blindness.
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                If you select an element and right click to select a plugin, it will help generate different modes of color blindness.
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                Learn more on designing for color blindness{" "}
                <a
                  href="https://uxdesign.cc/color-blindness-in-user-interfaces-66c27331b858"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-primary-600)] underline hover:text-[var(--color-primary-700)]"
                >
                  here
                </a>
                .
              </p>

              <div className="mt-2 overflow-hidden rounded-[12px] bg-[#F0F0F0] p-[24px]">
                <div className="flex flex-col gap-[16px]">
                  {visionSimulations.map((sim) => (
                    <div key={sim.label} className="grid grid-cols-[180px_1fr] items-center gap-[20px]">
                      <div
                        className="flex h-[44px] items-center justify-center rounded-[8px] px-[16px]"
                        style={{
                          backgroundColor: sim.bg,
                          color: sim.fg,
                          filter: sim.blur ? "blur(1.5px)" : undefined,
                        }}
                      >
                        <span className="text-[14px] font-medium leading-[20px]">{sim.label}</span>
                      </div>
                      <p className="text-[14px] leading-[20px] text-[var(--text-secondary)]">{sim.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-[12px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                3. Monochrome testing
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                A quick way to check if a user interface makes sense to someone colorblind is to see it in monochrome.
              </p>
              <p className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">Here’s how:</p>
              <ol className="list-decimal space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                <li>Create a rectangle and overlay it on top of an interface.</li>
                <li>Select “Saturation” under “Layer” on the right panel.</li>
              </ol>

              <div className="mt-2 overflow-hidden rounded-[12px] bg-[#1E4BAF] p-[24px]">
                <div className="relative mx-auto aspect-[786/884] w-full max-w-[560px]">
                  <Image
                    src="/docs/accessibility/monochrome.png"
                    alt="Colour versus monochrome interface comparison"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 flex justify-around text-[16px] font-medium leading-[24px] text-white">
                  <span>Colour</span>
                  <span>Monochrome</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Blindness */}
          <div id="blindness" className="space-y-[20px]">
            <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
              2. Blindness
            </h3>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Challenges:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                Blind users experience content linearly via screen readers, both on desktop (e.g., NVDA, VoiceOver) and mobile (TalkBack, VoiceOver).
              </p>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Accessibility Considerations:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                Screen reader flow, keyboard navigation, descriptive text.
              </p>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Best Practices:
              </p>
              <ul className="list-disc space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                {blindnessBestPractices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Do’s:
              </p>
              <ul className="list-disc space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                {blindnessDos.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Don’ts:
              </p>
              <ul className="list-disc space-y-1 pl-[24px] text-[16px] leading-[24px] text-[var(--text-secondary)]">
                {blindnessDonts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-[8px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                Tools & Techniques:
              </p>
            </div>

            <div className="space-y-[12px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                1. Screen readers on mobile:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                The screen reader on iPhones is called VoiceOver (VO), and on Android it’s called TalkBack.
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                You can turn them on in the accessibility settings, or say for example, “Hey Siri! Turn on VoiceOver.”
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                When a screen reader is activated on a mobile phone, users can swipe left and right on the screen to move through all the text and elements.
              </p>

              <div className="mt-2 overflow-hidden rounded-[12px] bg-[#1E4BAF] p-[24px]">
                <Image
                  src="/docs/accessibility/screen-reader-mobile.png"
                  alt="Mobile screen reader interface example"
                  width={508}
                  height={693}
                  className="mx-auto h-auto w-full max-w-[420px]"
                />
              </div>
            </div>

            <div className="space-y-[12px]">
              <p className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">
                2. Screen readers on desktop:
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                Mac also has VoiceOver, similar to NVDA on Windows.
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                The words read out loud to describe elements can usually be customized in development. But typically you hear, for example, “Sign up, button, double tap to activate.”
              </p>
              <p className="text-[16px] leading-[24px] text-[var(--text-secondary)]">
                On Mac, use <code className="!text-[14px]">Command + F5</code> to turn VO on/off, hit{" "}
                <code className="!text-[14px]">Control</code> to pause,{" "}
                <code className="!text-[14px]">Control + Option + Arrows</code> to read, and{" "}
                <code className="!text-[14px]">Tab</code> for controls. On Windows, NVDA commands can be found in the official NVDA documentation.
              </p>

              <div className="mt-2 overflow-hidden rounded-[12px] bg-[#1E4BAF] p-[24px]">
                <Image
                  src="/docs/accessibility/screen-reader-desktop.png"
                  alt="Desktop screen reader interface example"
                  width={901}
                  height={1014}
                  className="mx-auto h-auto w-full max-w-[640px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section id="additional-resources">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Additional Resources
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {additionalResources.map((resource) => (
              <div
                key={resource.title}
                className="rounded-xl border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {resource.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {resource.desc}
                </p>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-[12px] inline-flex items-center gap-[6px] rounded-[6px] border border-[var(--stroke-primary)] px-[10px] py-[6px] text-[12px] font-semibold uppercase leading-[16px] tracking-[0.04em] text-[var(--color-primary-600)] transition-colors hover:border-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)] dark:hover:bg-[var(--color-primary-950)]"
                >
                  View Link
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
