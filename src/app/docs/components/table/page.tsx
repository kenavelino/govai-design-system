"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@/components/ui/data-table";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "sorting", title: "Sorting", level: 2 },
  { id: "row-selection", title: "Row Selection", level: 2 },
  { id: "striped-rows", title: "Striped Rows", level: 2 },
  { id: "row-states", title: "Row States", level: 2 },
  { id: "tag-variants", title: "Tag Variants", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

interface PolicyRow extends Record<string, unknown> {
  name: string;
  status: "Active" | "Draft" | "Published" | "Archived" | "In Review";
  category: string;
  updated: string;
}

const policyData: PolicyRow[] = [
  { name: "AI Safety Framework", status: "Active", category: "Research", updated: "Mar 8, 2026" },
  { name: "Governance Report Q1", status: "Draft", category: "Report", updated: "Mar 5, 2026" },
  { name: "Policy Recommendations", status: "Published", category: "Policy", updated: "Feb 28, 2026" },
  { name: "Risk Assessment Tool", status: "Archived", category: "Tool", updated: "Feb 15, 2026" },
  { name: "Oversight Guidelines", status: "In Review", category: "Policy", updated: "Feb 10, 2026" },
];

const statusBadge: Record<PolicyRow["status"], { variant: "success" | "warning" | "brand" | "neutral" | "info" }> = {
  Active: { variant: "success" },
  Draft: { variant: "warning" },
  Published: { variant: "brand" },
  Archived: { variant: "neutral" },
  "In Review": { variant: "info" },
};

const baseCols: ColumnDef<PolicyRow>[] = [
  { key: "name", header: "Name" },
  {
    key: "status",
    header: "Status",
    render: (val) => {
      const s = val as PolicyRow["status"];
      return <Badge variant={statusBadge[s].variant} dot>{s}</Badge>;
    },
  },
  { key: "category", header: "Category" },
  { key: "updated", header: "Updated" },
];

const overviewCode = `import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

const columns = [
  { key: "name", header: "Name" },
  {
    key: "status",
    header: "Status",
    render: (val) => <Badge variant={statusVariant[val]} dot>{val}</Badge>,
  },
  { key: "category", header: "Category" },
  { key: "updated",  header: "Updated" },
];

const data = [
  { name: "AI Safety Framework",    status: "Active",    category: "Research", updated: "Mar 8, 2026" },
  { name: "Governance Report Q1",   status: "Draft",     category: "Report",   updated: "Mar 5, 2026" },
  { name: "Policy Recommendations", status: "Published", category: "Policy",   updated: "Feb 28, 2026" },
  { name: "Risk Assessment Tool",   status: "Archived",  category: "Tool",     updated: "Feb 15, 2026" },
  { name: "Oversight Guidelines",   status: "In Review", category: "Policy",   updated: "Feb 10, 2026" },
];

<DataTable columns={columns} data={data} />`;

const sortingCode = `import { DataTable } from "@/components/ui/data-table";

const columns = [
  { key: "name",     header: "Name",     sortable: true },
  { key: "status",   header: "Status",   sortable: true },
  { key: "category", header: "Category", sortable: true },
  { key: "updated",  header: "Updated",  sortable: true },
];

<DataTable columns={columns} data={data} />`;

const sortableCols: ColumnDef<PolicyRow>[] = baseCols.map((c) => ({ ...c, sortable: true }));

const selectionCode = `import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

function SelectableTable() {
  const [selected, setSelected] = useState([]);
  return (
    <DataTable
      columns={columns}
      data={data}
      selectable
      onSelectionChange={setSelected}
    />
  );
}`;

function SelectableDemo() {
  const [selected, setSelected] = useState<PolicyRow[]>([]);
  return (
    <div className="flex w-full flex-col gap-[12px]">
      <DataTable
        columns={baseCols}
        data={policyData}
        selectable
        onSelectionChange={setSelected}
      />
      {selected.length > 0 && (
        <p className="text-[12px] text-[var(--text-tertiary)]">
          {selected.length} row{selected.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

const stripedCode = `import { DataTable } from "@/components/ui/data-table";

<DataTable columns={columns} data={data} striped />`;

const rowStatesData: PolicyRow[] = [
  { name: "Default row", status: "Active", category: "Research", updated: "Mar 8, 2026" },
  { name: "Hover row", status: "Draft", category: "Report", updated: "Mar 5, 2026" },
  { name: "Disabled row", status: "Archived", category: "Tool", updated: "Feb 15, 2026" },
];

const rowStatesCode = `import { DataTable } from "@/components/ui/data-table";

<DataTable
  columns={columns}
  data={data}
  selectable
  isRowDisabled={(row) => row.status === "Archived"}
/>`;

const tagVariantsData: PolicyRow[] = [
  { name: "Active item", status: "Active", category: "Research", updated: "Mar 8, 2026" },
  { name: "Draft item", status: "Draft", category: "Report", updated: "Mar 5, 2026" },
  { name: "Published item", status: "Published", category: "Policy", updated: "Feb 28, 2026" },
  { name: "Archived item", status: "Archived", category: "Tool", updated: "Feb 15, 2026" },
  { name: "In Review item", status: "In Review", category: "Policy", updated: "Feb 10, 2026" },
];

const tagVariantsCode = `import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

const statusVariant = {
  Active:    "success",
  Draft:     "warning",
  Published: "brand",
  Archived:  "neutral",
  "In Review": "info",
};

const columns = [
  { key: "name",   header: "Name" },
  {
    key: "status",
    header: "Status",
    render: (val) => <Badge variant={statusVariant[val]} dot>{val}</Badge>,
  },
  { key: "category", header: "Category" },
  { key: "updated",  header: "Updated"  },
];`;

export default function TablePage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            Table
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            Data tables display structured information in rows and columns. They support sorting,
            row selection, striped rows, and custom cell renderers for managing and comparing
            datasets across GovAI products.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="A standard table with status badges, category labels, and date values."
            code={overviewCode}
          >
            <DataTable columns={baseCols} data={policyData} className="w-full" />
          </ComponentPreview>
        </section>

        <section id="sorting">
          <ComponentPreview
            heading="Sorting"
            description="Click any column header to sort ascending, descending, or reset. The active sort column shows a highlighted caret."
            code={sortingCode}
          >
            <DataTable columns={sortableCols} data={policyData} className="w-full" />
          </ComponentPreview>
        </section>

        <section id="row-selection">
          <ComponentPreview
            heading="Row Selection"
            description="Enable checkboxes with selectable. The header checkbox selects or deselects all non-disabled rows."
            code={selectionCode}
          >
            <SelectableDemo />
          </ComponentPreview>
        </section>

        <section id="striped-rows">
          <ComponentPreview
            heading="Striped Rows"
            description="Use striped for alternating row backgrounds — improves scannability in dense tables."
            code={stripedCode}
          >
            <DataTable columns={baseCols} data={policyData} striped className="w-full" />
          </ComponentPreview>
        </section>

        <section id="row-states">
          <ComponentPreview
            heading="Row States"
            description="Rows support default, hover, selected, and disabled states. Disabled rows are dimmed and excluded from selection."
            code={rowStatesCode}
          >
            <DataTable
              columns={baseCols}
              data={rowStatesData}
              selectable
              isRowDisabled={(row) => row.status === "Archived"}
              className="w-full"
            />
          </ComponentPreview>
        </section>

        <section id="tag-variants">
          <ComponentPreview
            heading="Tag Variants"
            description="Status tags use the Badge component. Match the variant to the semantic meaning of the status value."
            code={tagVariantsCode}
          >
            <DataTable columns={baseCols} data={tagVariantsData} className="w-full" />
          </ComponentPreview>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Use tables for structured, comparable data with consistent columns",
              "Provide sortable columns for key data points users want to rank",
              "Use clear, concise column headers that describe the data",
              "Use the Badge component for status values — match variant to semantic meaning",
              "Right-align numeric columns for easy visual comparison",
            ]}
            dontItems={[
              "Don't use tables for layout purposes — use CSS Grid or Flexbox",
              "Don't include more than 7–8 columns without a column toggle",
              "Don't wrap long text in cells — truncate with a tooltip on hover",
              "Don't use tables for data with only 1–2 rows — use a detail card instead",
              "Don't rely on color alone to communicate row state",
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
                title: "Semantic HTML",
                desc: "Uses native <table>, <thead>, <tbody>, <tr>, <th>, and <td> elements. Column headers include scope='col' for proper screen reader association.",
              },
              {
                title: "Sortable Columns",
                desc: "Sort controls are applied to <th> elements. aria-sort indicates the current sort state ('ascending', 'descending', or 'none') on the active column.",
              },
              {
                title: "Row Selection",
                desc: "Checkboxes carry aria-label values identifying each row. The header checkbox is labelled 'Select all rows'. aria-selected reflects the current selection state on each row.",
              },
              {
                title: "Keyboard Navigation",
                desc: "Tab moves focus between interactive elements — checkboxes and sortable column headers. Focus is always visible with a 2px primary ring.",
              },
              {
                title: "Disabled Rows",
                desc: "Disabled rows have opacity reduced to 50% and checkboxes are set to the disabled attribute, preventing both click and keyboard interaction.",
              },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-[8px] border border-[var(--stroke-primary)] p-[24px]"
              >
                <h4 className="text-[16px] font-medium leading-[24px] text-[var(--header-primary)]">
                  {a.title}
                </h4>
                <p className="mt-[6px] text-[14px] leading-[20px] text-[var(--text-tertiary)]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="api">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            API Reference
          </h2>

          <h3 className="mt-[16px] mb-[4px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            DataTable
          </h3>
          <PropsTable
            props={[
              {
                name: "columns",
                type: "ColumnDef<T>[]",
                required: true,
                description: "Array of column definitions controlling headers, keys, sorting, and cell rendering",
              },
              {
                name: "data",
                type: "T[]",
                required: true,
                description: "Array of row data objects to display",
              },
              {
                name: "selectable",
                type: "boolean",
                default: "false",
                description: "Enables row selection checkboxes and a select-all header checkbox",
              },
              {
                name: "striped",
                type: "boolean",
                default: "false",
                description: "Alternates row backgrounds for improved readability in dense tables",
              },
              {
                name: "stickyHeader",
                type: "boolean",
                default: "false",
                description: "Keeps the header row fixed during vertical scrolling",
              },
              {
                name: "headerSize",
                type: '"sm" | "lg"',
                default: '"sm"',
                description: "Controls header row height — small (40px) or large (56px)",
              },
              {
                name: "onSelectionChange",
                type: "(selectedRows: T[]) => void",
                description: "Callback fired when the selection changes, receives the current selected rows",
              },
              {
                name: "emptyState",
                type: "ReactNode",
                description: "Content rendered in a full-width cell when data is empty",
              },
              {
                name: "getRowKey",
                type: "(row: T, index: number) => string | number",
                description: "Returns a stable key for each row. Defaults to the row index",
              },
              {
                name: "isRowDisabled",
                type: "(row: T) => boolean",
                description: "Returns true to disable a row — dims it and excludes it from selection",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes applied to the table wrapper",
              },
            ]}
          />

          <h3 className="mt-[24px] mb-[4px] text-[14px] font-semibold leading-[20px] text-[var(--header-primary)]">
            ColumnDef
          </h3>
          <PropsTable
            props={[
              {
                name: "key",
                type: "string",
                required: true,
                description: "Property name on the row object used to read the cell value",
              },
              {
                name: "header",
                type: "string",
                required: true,
                description: "Text displayed in the column header",
              },
              {
                name: "sortable",
                type: "boolean",
                description: "Enables click-to-sort on this column with an up/down caret indicator",
              },
              {
                name: "width",
                type: "string",
                description: "CSS width value applied to the column (e.g. '120px', '20%')",
              },
              {
                name: "align",
                type: '"left" | "center" | "right"',
                description: "Text alignment for both the header and all body cells in this column",
              },
              {
                name: "render",
                type: "(value: unknown, row: T) => ReactNode",
                description: "Custom cell renderer — use for badges, links, progress bars, or any custom content",
              },
            ]}
          />
        </section>
      </div>
    </>
  );
}
