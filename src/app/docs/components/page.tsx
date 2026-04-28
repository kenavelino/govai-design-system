"use client";

import Link from "next/link";
import Image from "next/image";

const components = [
  { name: "Avatar", href: "/docs/components/avatar", components: 3, variants: 11, image: "/Images/Thumbnails/base_components/Avatar.png" },
  { name: "Badge", href: "/docs/components/badge", components: 1, variants: 25, image: null },
  { name: "Breadcrumbs", href: "/docs/components/breadcrumb", components: 1, variants: 6, image: "/Images/Thumbnails/base_components/Breadcrumbs.png" },
  { name: "Button", href: "/docs/components/button", components: 1, variants: 13, image: "/Images/Thumbnails/base_components/Button.png" },
  { name: "Card", href: "/docs/components/card", components: 1, variants: 6, image: null },
  { name: "Date & Time Picker", href: "/docs/components/date-time-picker", components: 1, variants: 2, image: "/Images/Thumbnails/base_components/Date Picker.png" },
  { name: "Dropdown", href: "/docs/components/dropdown", components: 1, variants: 3, image: "/Images/Thumbnails/base_components/Dropdown.png" },
  { name: "File Uploader", href: "/docs/components/file-uploader", components: 1, variants: 1, image: "/Images/Thumbnails/base_components/File Uploader.png" },
  { name: "Input", href: "/docs/components/input", components: 1, variants: 10, image: "/Images/Thumbnails/base_components/Input.png" },
  { name: "Number Inputs", href: "/docs/components/number-inputs", components: 1, variants: 4, image: "/Images/Thumbnails/base_components/Number Inputs.png" },
  { name: "Pagination", href: "/docs/components/pagination", components: 1, variants: 2, image: "/Images/Thumbnails/base_components/Pagination.png" },
  { name: "Progress & Loaders", href: "/docs/components/progress", components: 2, variants: 4, image: "/Images/Thumbnails/base_components/Progress & Loaders.png" },
  { name: "Selectors", href: "/docs/components/selectors", components: 3, variants: 6, image: "/Images/Thumbnails/base_components/Selectors.png" },
  { name: "Sliders", href: "/docs/components/slider", components: 1, variants: 2, image: "/Images/Thumbnails/base_components/Sliders.png" },
  { name: "Steppers", href: "/docs/components/stepper", components: 1, variants: 1, image: "/Images/Thumbnails/base_components/Steppers.png" },
  { name: "Table", href: "/docs/components/table", components: 1, variants: 7, image: "/Images/Thumbnails/base_components/Table.png" },
  { name: "Tabs", href: "/docs/components/tabs", components: 1, variants: 5, image: "/Images/Thumbnails/base_components/Tab.png" },
  { name: "Text Area", href: "/docs/components/textarea", components: 1, variants: 3, image: "/Images/Thumbnails/base_components/Text Area.png" },
  { name: "Toast", href: "/docs/components/toast", components: 1, variants: 4, image: "/Images/Thumbnails/base_components/Toasters.png" },
  { name: "Toggles", href: "/docs/components/toggle", components: 1, variants: 2, image: "/Images/Thumbnails/base_components/Toggles.png" },
  { name: "Tooltip", href: "/docs/components/tooltip", components: 1, variants: 4, image: "/Images/Thumbnails/base_components/Tags.png" },
];

function formatCount(components: number, variants: number) {
  const componentLabel = components === 1 ? "component" : "components";
  const variantLabel = variants === 1 ? "variant" : "variants";
  return `${components} ${componentLabel} + ${variants} ${variantLabel}`;
}

export default function ComponentsPage() {
  return (
    <div className="space-y-[32px]">
      <div>
        <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
          Base components
        </h1>
        <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
          The core set of building blocks powering GovAI products. Each component is accessible, themeable, and ready for production.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
        {components.map((c) => (
          <Link
            key={c.name}
            href={c.href}
            className="group flex flex-col gap-[16px] rounded-[12px] border border-[var(--stroke-primary)] p-[8px] transition-all hover:border-[var(--stroke-secondary)] hover:bg-[var(--surface-tertiary)]"
          >
            <div className="aspect-[5/3] w-full overflow-hidden rounded-[8px] bg-[var(--surface-alt-tertiary)]" style={{ boxShadow: "0 0 0 1px #EAEAEA" }}>
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.name}
                  width={400}
                  height={240}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
            <div className="px-[8px] pb-[8px]">
              <h3 className="text-[15px] font-semibold leading-[22px] text-[var(--header-primary)] group-hover:text-[var(--color-primary-700)] dark:group-hover:text-[var(--color-primary-400)]">
                {c.name}
              </h3>
              <p className="mt-[4px] text-[13px] leading-[18px] text-[var(--text-tertiary)]">
                {formatCount(c.components, c.variants)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
