"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Pagination } from "@/components/ui/pagination";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "with-buttons", title: "With buttons", level: 2 },
  { id: "with-page-input", title: "With page input", level: 2 },
  { id: "rtl-support", title: "RTL support", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function PaginationButtonsDemo({
  total = 10,
  initial = 1,
}: {
  total?: number;
  initial?: number;
}) {
  const [page, setPage] = useState(initial);
  return (
    <div className="w-full">
      <Pagination currentPage={page} totalPages={total} onPageChange={setPage} />
    </div>
  );
}

function PaginationInputDemo({ rtl = false }: { rtl?: boolean }) {
  const [page, setPage] = useState(2);
  const [rows, setRows] = useState(20);
  return (
    <div className="w-full">
      <Pagination
        variant="input"
        currentPage={page}
        totalPages={100}
        onPageChange={setPage}
        totalRows={2000}
        rowsPerPage={rows}
        onRowsPerPageChange={setRows}
        dir={rtl ? "rtl" : "ltr"}
      />
    </div>
  );
}

function PaginationStatesDemo() {
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <div>
        <p className="mb-[8px] text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          First page — previous disabled
        </p>
        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
      <div>
        <p className="mb-[8px] text-[12px] font-medium leading-[16px] text-[var(--text-tertiary)]">
          Last page — next disabled
        </p>
        <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
      </div>
    </div>
  );
}

export default function PaginationPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Pagination
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Pagination organizes large content sets into manageable segments. It provides clear controls
            for jumping between pages, viewing ranges, and quickly accessing the start or end of a sequence.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="An interactive pagination with previous and next buttons, numbered pages, and ellipsis for large ranges."
            code={`import { Pagination } from "@/components/ui/pagination";

const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`}
          >
            <PaginationButtonsDemo />
          </ComponentPreview>
        </section>

        <section id="with-buttons">
          <ComponentPreview
            heading="With buttons"
            description="Use previous and next buttons alongside numbered pages. Click any number to jump directly to that page."
            code={`const [page, setPage] = useState(5);

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`}
          >
            <PaginationButtonsDemo initial={5} />
          </ComponentPreview>
        </section>

        <section id="with-page-input">
          <ComponentPreview
            heading="With page input"
            description="Use an editable input to type the exact page number. Includes row count summary and a rows-per-page selector — ideal for tables with many pages."
            code={`const [page, setPage] = useState(2);
const [rows, setRows] = useState(20);

<Pagination
  variant="input"
  currentPage={page}
  totalPages={100}
  onPageChange={setPage}
  totalRows={2000}
  rowsPerPage={rows}
  onRowsPerPageChange={setRows}
/>`}
          >
            <PaginationInputDemo />
          </ComponentPreview>
        </section>

        <section id="rtl-support">
          <ComponentPreview
            heading="RTL support"
            description="Pagination mirrors direction, labels, and caret icons when rendered with dir='rtl', making it suitable for Arabic and other right-to-left languages."
            code={`<Pagination
  variant="input"
  dir="rtl"
  currentPage={page}
  totalPages={100}
  onPageChange={setPage}
  totalRows={2000}
  rowsPerPage={rows}
  onRowsPerPageChange={setRows}
/>`}
          >
            <PaginationInputDemo rtl />
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Previous and next are automatically disabled at the boundaries. Disabled controls use the surface-disabled background and text-disabled color."
            code={`<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
<Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />`}
          >
            <PaginationStatesDemo />
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use the buttons variant for short lists under 20 pages where direct numbered navigation is useful",
              "Use the page-input variant for tables with hundreds or thousands of rows where typing the page is faster",
              "Always show the current page in the aria-current='page' state for screen readers",
              "Place pagination at the end of the paginated content, aligned with the content width",
              "Disable previous on the first page and next on the last page to prevent invalid navigation",
            ]}
            dontItems={[
              "Don't use pagination for fewer than two pages — hide the control entirely",
              "Don't mix both variants on the same page — pick the one that fits the content density",
              "Don't use labels longer than 'Previous' and 'Next' for the boundary controls",
              "Don't allow page numbers outside the 1—total range in the page-input variant",
              "Don't combine pagination with infinite scroll in the same view",
            ]}
          />
        </section>

        <section id="accessibility">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Accessibility
          </h2>
          <div className="mt-3 flex flex-col gap-[12px]">
            {[
              {
                title: "Semantic Navigation",
                desc: "The root element is a <nav> with aria-label='Pagination'. This groups the controls for assistive technology and allows users to skip to or from the pagination region.",
              },
              {
                title: "Current Page",
                desc: "The active page button has aria-current='page' so screen readers announce the user's position in the sequence.",
              },
              {
                title: "Keyboard",
                desc: "All buttons and the page input are native focusable elements. Tab moves between controls, Enter or Space activates buttons, and the input accepts numeric entry. Focus ring uses primary/500 with a 2px offset.",
              },
              {
                title: "Disabled Boundaries",
                desc: "When on the first or last page, the corresponding boundary button is disabled and skipped in the tab order. The disabled state dims to text-disabled for clear visual affordance.",
              },
              {
                title: "Direction",
                desc: "Setting dir='rtl' mirrors the caret icons and flips the visual order of the previous and next buttons so the component reads naturally in Arabic and other RTL languages.",
              },
            ].map((a) => (
              <div key={a.title} className="rounded-xl border border-[var(--stroke-primary)] p-[24px]">
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {a.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>
          <PropsTable
            props={[
              { name: "currentPage", type: "number", required: true, description: "The currently selected page (1-indexed)" },
              { name: "totalPages", type: "number", required: true, description: "Total number of pages" },
              { name: "onPageChange", type: "(page: number) => void", required: true, description: "Called when the user selects a new page" },
              { name: "variant", type: '"buttons" | "input"', default: '"buttons"', description: "Switches between numbered buttons and a page input with rows-per-page selector" },
              { name: "totalRows", type: "number", description: "Total number of rows — used to render the 'Showing X-Y of Z' summary in the input variant" },
              { name: "rowsPerPage", type: "number", default: "20", description: "Number of rows rendered per page in the input variant" },
              { name: "onRowsPerPageChange", type: "(rows: number) => void", description: "Called when the user changes the rows-per-page selector" },
              { name: "rowsPerPageOptions", type: "number[]", default: "[10, 20, 50, 100]", description: "Options shown in the rows-per-page selector" },
              { name: "showNavLabels", type: "boolean", default: "true", description: "Shows the 'Previous' and 'Next' text labels next to the caret icons" },
              { name: "prevLabel", type: "string", default: '"Previous"', description: "Label for the previous button" },
              { name: "nextLabel", type: "string", default: '"Next"', description: "Label for the next button" },
              { name: "dir", type: '"ltr" | "rtl"', default: '"ltr"', description: "Sets text direction and mirrors caret icons for RTL languages" },
              { name: "className", type: "string", description: "Additional CSS classes applied to the root nav element" },
            ]}
          />
        </section>
      </div>
    </>
  );
}
