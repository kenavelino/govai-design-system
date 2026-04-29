"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/navigation";

const baseComponentsGroup = navigation.find((g) => g.label === "Base Components");
const components = (baseComponentsGroup?.items ?? []).filter((i) => i.componentCard);

function formatCount(componentCount: number, variantCount: number) {
  const componentLabel = componentCount === 1 ? "component" : "components";
  const variantLabel = variantCount === 1 ? "variant" : "variants";
  return `${componentCount} ${componentLabel} + ${variantCount} ${variantLabel}`;
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
        {components.map((c) => {
          const card = c.componentCard!;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group flex flex-col gap-[16px] rounded-[12px] border border-[var(--stroke-primary)] p-[8px] transition-all hover:border-[var(--stroke-secondary)] hover:bg-[var(--surface-tertiary)]"
            >
              <div className="aspect-[5/3] w-full overflow-hidden rounded-[8px] bg-[var(--surface-alt-tertiary)]" style={{ boxShadow: "0 0 0 1px #EAEAEA" }}>
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={c.title}
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
                  {c.title}
                </h3>
                <p className="mt-[4px] text-[13px] leading-[18px] text-[var(--text-tertiary)]">
                  {formatCount(card.componentCount, card.variantCount)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
