"use client";

import { OnThisPage } from "@/components/docs/on-this-page";
import {
  CollapsiblePalette,
  type CollapsibleShade,
} from "@/components/docs/collapsible-palette";

const tocItems = [
  { id: "primary", title: "Primary", level: 2 },
  { id: "secondary", title: "Secondary Palettes", level: 2 },
  { id: "neutrals", title: "Neutrals", level: 2 },
  { id: "semantic", title: "Semantic Colors", level: 2 },
  { id: "data-viz", title: "Data Visualization", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
];

function makeShades(
  prefix: string,
  colors: Record<string, string>
): CollapsibleShade[] {
  return Object.entries(colors).map(([shade, value]) => ({
    shade,
    value,
    token: `${prefix}/${shade}`,
  }));
}

export default function ColorsPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Colors
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            The GovAI color system uses semantic color tokens that support light
            and dark themes. All colors are designed to meet WCAG 2.1 AA
            contrast requirements.
          </p>
        </div>

        <section id="primary">
          <CollapsiblePalette
            title="Primary"
            titleSize="lg"
            shades={makeShades("primary", {
              "950": "#162B54",
              "900": "#1D408A",
              "800": "#1E4BAF",
              "700": "#1D58D8",
              "600": "#2463EB",
              "500": "#3D78F9",
              "400": "#6190FA",
              "300": "#94B4FD",
              "200": "#BFD3FE",
              "100": "#DBE6FE",
              "50": "#EFF4FF",
            })}
          />
        </section>

        <section id="secondary">
          <h2 className="mb-6 text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Secondary Palettes
          </h2>
          <div className="space-y-[24px]">
            <CollapsiblePalette
              title="Purple"
              shades={makeShades("purple", {
                "950": "#0D012A",
                "900": "#190544",
                "800": "#34098A",
                "700": "#3C06A1",
                "600": "#500DD6",
                "500": "#6D1EF6",
                "400": "#9F68FF",
                "300": "#BD97FF",
                "200": "#D7C0FF",
                "100": "#DDCCFF",
                "50": "#DDCCFF",
              })}
            />
            <CollapsiblePalette
              title="Orange"
              shades={makeShades("orange", {
                "950": "#541616",
                "900": "#8A351D",
                "800": "#AF401E",
                "700": "#D8491D",
                "600": "#EB5224",
                "500": "#F9693D",
                "400": "#FA8761",
                "300": "#FDAE94",
                "200": "#FECEBF",
                "100": "#FEE3DB",
                "50": "#FFF3EF",
              })}
            />
            <CollapsiblePalette
              title="Violet"
              shades={makeShades("violet", {
                "950": "#190F1B",
                "900": "#331E36",
                "800": "#4D2D51",
                "700": "#673B6B",
                "600": "#804A86",
                "500": "#9A59A1",
                "400": "#AB75B1",
                "300": "#BC90C0",
                "200": "#CDACD0",
                "100": "#DDC8E0",
                "50": "#EEE3EF",
              })}
            />
            <CollapsiblePalette
              title="Indigo"
              shades={makeShades("indigo", {
                "950": "#0E1320",
                "900": "#1B263F",
                "800": "#29395F",
                "700": "#374C7E",
                "600": "#445F9E",
                "500": "#4B69AD",
                "400": "#6F8AC8",
                "300": "#8CA1D3",
                "200": "#A9B9DE",
                "100": "#C5D0E9",
                "50": "#E2E8F4",
              })}
            />
            <CollapsiblePalette
              title="Teal"
              shades={makeShades("teal", {
                "950": "#000B0C",
                "900": "#001618",
                "800": "#002124",
                "700": "#002B30",
                "600": "#00363C",
                "500": "#004148",
                "400": "#2B6167",
                "300": "#558085",
                "200": "#80A0A4",
                "100": "#AAC0C2",
                "50": "#D5DFE1",
              })}
            />
          </div>
        </section>

        <section id="neutrals">
          <h2 className="mb-6 text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Neutrals
          </h2>
          <div className="space-y-[24px]">
            <CollapsiblePalette
              title="Base"
              defaultShade="white"
              shades={[
                { shade: "white", value: "#FFFFFF", token: "white" },
                { shade: "black", value: "#101010", token: "black" },
              ]}
            />
            <CollapsiblePalette
              title="Light Mode Neutrals"
              shades={makeShades("light", {
                "950": "#0A0A0B",
                "900": "#1C1C1E",
                "800": "#2C2C2E",
                "700": "#3B3B3C",
                "600": "#4A4A4A",
                "500": "#666666",
                "400": "#939393",
                "300": "#CCCCCC",
                "200": "#D6D6D6",
                "100": "#EAEAEA",
                "50": "#F7F7F7",
                "0": "#FAFAFA",
              })}
            />
            <CollapsiblePalette
              title="Dark Mode Neutrals"
              shades={makeShades("dark", {
                "950": "#FAFAFA",
                "900": "#EDEDED",
                "800": "#D1D1D1",
                "700": "#BEBEBE",
                "600": "#A8A8A8",
                "500": "#757575",
                "400": "#5B5B5B",
                "300": "#464646",
                "200": "#3F3F3F",
                "100": "#2A2A2A",
                "50": "#1C1C1C",
                "0": "#151515",
              })}
            />
          </div>
        </section>

        <section id="semantic">
          <h2 className="mb-6 text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Semantic Colors
          </h2>
          <div className="space-y-[24px]">
            <CollapsiblePalette
              title="Success"
              shades={makeShades("success", {
                "950": "#011F09",
                "900": "#023212",
                "800": "#17633B",
                "700": "#158C4E",
                "600": "#1EAF62",
                "500": "#21C16B",
                "400": "#3DE089",
                "300": "#84EAB4",
                "200": "#C1F5DA",
                "100": "#D1FBE9",
                "50": "#E0FBEC",
              })}
            />
            <CollapsiblePalette
              title="Error"
              shades={makeShades("error", {
                "950": "#25070A",
                "900": "#2D0511",
                "800": "#6A1323",
                "700": "#BA2641",
                "600": "#E12D48",
                "500": "#F03F51",
                "400": "#F66B77",
                "300": "#F89FA3",
                "200": "#FBC7CC",
                "100": "#FCE6E8",
                "50": "#FFF4F5",
              })}
            />
            <CollapsiblePalette
              title="Warning"
              shades={makeShades("warning", {
                "950": "#2A1401",
                "900": "#442605",
                "800": "#8A5209",
                "700": "#D9891B",
                "600": "#E7A71A",
                "500": "#F6B51E",
                "400": "#FFD268",
                "300": "#FFE097",
                "200": "#FFECC0",
                "100": "#FFEECC",
                "50": "#FFFAEA",
              })}
            />
            <CollapsiblePalette
              title="Info"
              shades={makeShades("info", {
                "950": "#01222A",
                "900": "#053444",
                "800": "#09658A",
                "700": "#066BA1",
                "600": "#0D8CD6",
                "500": "#1EA7F6",
                "400": "#68C8FF",
                "300": "#97D9FF",
                "200": "#C0E8FF",
                "100": "#CCEEFF",
                "50": "#EAF7FF",
              })}
            />
          </div>
        </section>

        <section id="data-viz">
          <CollapsiblePalette
            title="Data Visualization"
            defaultShade="1"
            shades={[
              { shade: "1", value: "#4556B5", token: "data/1" },
              { shade: "2", value: "#3AB2C1", token: "data/2" },
              { shade: "3", value: "#FF7043", token: "data/3" },
              { shade: "4", value: "#E54440", token: "data/4" },
              { shade: "5", value: "#7763CF", token: "data/5" },
              { shade: "6", value: "#FFC821", token: "data/6" },
              { shade: "7", value: "#F0739D", token: "data/7" },
              { shade: "8", value: "#D1DC65", token: "data/8" },
              { shade: "9", value: "#5BC6F6", token: "data/9" },
            ]}
          />
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Contrast Requirements
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Normal text must maintain a minimum 4.5:1 contrast ratio. Large
                text (18px+ regular, 14px+ bold) requires 3:1. All semantic
                colors are pre-validated against their respective backgrounds.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Color Independence
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Never use color alone to convey meaning. Always pair with icons,
                text labels, or patterns to ensure information is accessible to
                users with color vision deficiencies.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
              <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                Theme Support
              </h4>
              <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                Use semantic tokens (surface/default, text-primary, etc.)
                instead of raw color values to ensure automatic light/dark mode
                support.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
