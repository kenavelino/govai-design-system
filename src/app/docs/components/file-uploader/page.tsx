"use client";

import { useState } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DoDont } from "@/components/docs/do-dont";
import {
  FileUploader,
  UploadItem,
  type FileUploaderSize,
  type UploadedFile,
} from "@/components/ui/file-uploader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "interactive", title: "Interactive playground", level: 2 },
  { id: "sizes", title: "Sizes", level: 2 },
  { id: "with-files", title: "With uploaded files", level: 2 },
  { id: "states", title: "States", level: 2 },
  { id: "arabic", title: "Arabic (RTL)", level: 2 },
  { id: "upload-item", title: "Upload item", level: 2 },
  { id: "anatomy", title: "Anatomy", level: 2 },
  { id: "usage", title: "Usage Guidelines", level: 2 },
  { id: "accessibility", title: "Accessibility", level: 2 },
  { id: "api", title: "API Reference", level: 2 },
];

function OverviewDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[512px]">
        <FileUploader
          multiple
          accept=".png,.jpg,.jpeg,.gif,.svg"
          hint="SVG, PNG, JPG or GIF (max. 800x400px)"
        />
      </div>
    </div>
  );
}

function InteractivePlaygroundDemo() {
  const [size, setSize] = useState<FileUploaderSize>("xl");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [multiple, setMultiple] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const sizes: FileUploaderSize[] = ["xl", "lg", "md", "sm"];

  return (
    <div className="flex w-full flex-col items-center gap-[24px]">
      <div className="flex flex-wrap items-center justify-center gap-[16px]">
        <Tabs value={size} onValueChange={(v) => setSize(v as FileUploaderSize)}>
          <TabsList>
            {sizes.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs value={dir} onValueChange={(v) => setDir(v as "ltr" | "rtl")}>
          <TabsList>
            <TabsTrigger value="ltr">LTR</TabsTrigger>
            <TabsTrigger value="rtl">RTL</TabsTrigger>
          </TabsList>
        </Tabs>
        <Checkbox
          size="sm"
          checked={multiple}
          onCheckedChange={setMultiple}
          label="Multiple"
        />
        <Checkbox
          size="sm"
          checked={disabled}
          onCheckedChange={setDisabled}
          label="Disabled"
        />
      </div>
      <div className="w-full max-w-[512px]">
        <FileUploader
          size={size}
          dir={dir}
          multiple={multiple}
          disabled={disabled}
          maxSize={10 * 1024 * 1024}
          hint={dir === "rtl" ? "PDF، DOCX، PNG (حد أقصى 10MB)" : "PDF, DOCX, PNG (max. 10 MB)"}
        />
      </div>
    </div>
  );
}

function SizesDemo() {
  const sizes: FileUploaderSize[] = ["xl", "lg", "md", "sm"];
  return (
    <div className="flex w-full max-w-[512px] flex-col gap-[24px]">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col gap-[8px]">
          <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
            {s}
          </span>
          <FileUploader size={s} hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
        </div>
      ))}
    </div>
  );
}

function WithFilesDemo() {
  const initial: UploadedFile[] = [
    {
      id: "1",
      name: "Annual-report-2024.pdf",
      size: 2_413_000,
      type: "application/pdf",
      status: "uploaded",
      progress: 100,
    },
    {
      id: "2",
      name: "Financials.xlsx",
      size: 834_000,
      type: "application/vnd.ms-excel",
      status: "uploaded",
      progress: 100,
    },
    {
      id: "3",
      name: "Cover-image.png",
      size: 1_240_000,
      type: "image/png",
      status: "uploading",
      progress: 64,
    },
  ];
  const [files, setFiles] = useState<UploadedFile[]>(initial);
  return (
    <div className="flex w-full max-w-[512px] flex-col">
      <FileUploader
        multiple
        files={files}
        onFilesChange={setFiles}
        simulateUpload
        hint="PDF, DOCX, XLSX, PNG or JPG (max. 10 MB)"
      />
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="grid w-full max-w-[768px] grid-cols-1 gap-[24px] md:grid-cols-2">
      <div className="flex flex-col gap-[8px]">
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
          Default
        </span>
        <FileUploader hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.04em] text-[var(--text-tertiary)]">
          Disabled
        </span>
        <FileUploader disabled hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
      </div>
    </div>
  );
}

function ArabicDemo() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[512px]">
        <FileUploader
          dir="rtl"
          multiple
          maxSize={10 * 1024 * 1024}
          hint="PDF، DOCX، PNG (حد أقصى 10MB)"
        />
      </div>
    </div>
  );
}

function UploadItemDemo() {
  const items: UploadedFile[] = [
    {
      id: "1",
      name: "Uploading-now.pdf",
      size: 2_413_000,
      type: "application/pdf",
      status: "uploading",
      progress: 42,
    },
    {
      id: "2",
      name: "Completed-file.xlsx",
      size: 834_000,
      type: "application/vnd.ms-excel",
      status: "uploaded",
      progress: 100,
    },
    {
      id: "3",
      name: "Too-large-file.zip",
      size: 52_300_000,
      type: "application/zip",
      status: "error",
      progress: 0,
      error: "File exceeds 10 MB limit",
    },
  ];
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-[8px]">
      {items.map((file) => (
        <UploadItem key={file.id} file={file} onRemove={() => undefined} />
      ))}
    </div>
  );
}

export default function FileUploaderPage() {
  return (
    <>
      <OnThisPage items={tocItems} />
      <div className="space-y-[24px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-[32px] text-[var(--header-primary)]">
            File Uploader
          </h1>
          <p className="mt-3 text-[16px] leading-[24px] text-[var(--text-secondary)]">
            A drag-and-drop dropzone for uploading one or multiple files. Includes an active drag
            state, file list with progress, and an upload item component for showing uploading,
            completed, and error rows. Supports both LTR and RTL layouts.
          </p>
        </div>

        <section id="overview">
          <ComponentPreview
            heading="Overview"
            description="Click the dropzone or drag files onto it to upload. The zone highlights in primary/50 with a solid primary/600 border while a file is being dragged over it."
            code={`import { FileUploader } from "@/components/ui/file-uploader";

<FileUploader
  multiple
  accept=".png,.jpg,.jpeg,.gif,.svg"
  hint="SVG, PNG, JPG or GIF (max. 800x400px)"
/>`}
          >
            <OverviewDemo />
          </ComponentPreview>
        </section>

        <section id="interactive">
          <ComponentPreview
            heading="Interactive playground"
            description="Switch between sizes and directions, toggle multiple and disabled, then drop a file onto the zone to see the active, uploading, and uploaded states."
            code={`const [size, setSize] = useState<FileUploaderSize>("xl");
const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

<FileUploader
  size={size}
  dir={dir}
  multiple
  maxSize={10 * 1024 * 1024}
  hint="PDF, DOCX, PNG (max. 10 MB)"
/>`}
          >
            <InteractivePlaygroundDemo />
          </ComponentPreview>
        </section>

        <section id="sizes">
          <ComponentPreview
            heading="Sizes"
            description="Four sizes — xl (108px, default for empty states), lg (64px, compact forms with an inline upload button), md (36px, input-height inline), sm (28px, dense tables or metadata rows)."
            code={`<FileUploader size="xl" hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
<FileUploader size="lg" hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
<FileUploader size="md" />
<FileUploader size="sm" />`}
          >
            <SizesDemo />
          </ComponentPreview>
        </section>

        <section id="with-files">
          <ComponentPreview
            heading="With uploaded files"
            description="File rows appear beneath the dropzone. Uploading items show a spinning progress ring; completed items show a solid 36px file-type icon coloured by category with the category label as subtext. Click the XCircle icon to cancel or remove a file."
            code={`const [files, setFiles] = useState<UploadedFile[]>([
  { id: "1", name: "Annual-report-2024.pdf", size: 2413000, type: "application/pdf", status: "uploaded", progress: 100 },
  { id: "2", name: "Cover-image.png", size: 1240000, type: "image/png", status: "uploading", progress: 64 },
]);

<FileUploader multiple files={files} onFilesChange={setFiles} />`}
          >
            <WithFilesDemo />
          </ComponentPreview>
        </section>

        <section id="states">
          <ComponentPreview
            heading="States"
            description="Default: dashed stroke-primary border on the transparent surface. Active (drag-over): primary/50 fill with a solid primary/600 border and 'Drop files here' text. Disabled: surface-disabled fill at 60% opacity, no pointer events."
            code={`<FileUploader />
<FileUploader disabled />`}
          >
            <StatesDemo />
          </ComponentPreview>
        </section>

        <section id="arabic">
          <ComponentPreview
            heading="Arabic (RTL)"
            description="Pass dir='rtl' to mirror the entire layout. Labels swap to Arabic (انقر للرفع، أو اسحب وأفلت), hint text aligns to the right, and in the lg variant the upload button moves to the left."
            code={`<FileUploader
  dir="rtl"
  multiple
  maxSize={10 * 1024 * 1024}
  hint="PDF، DOCX، PNG (حد أقصى 10MB)"
/>`}
          >
            <ArabicDemo />
          </ComponentPreview>
        </section>

        <section id="upload-item">
          <ComponentPreview
            heading="Upload item"
            description="The UploadItem row is exported separately so you can render a file list outside the uploader (for example, in a review screen). States: uploading (spinning progress ring with the category label), uploaded (36px solid colour file-type icon), error (error/600 border, fill, and message)."
            code={`import { UploadItem } from "@/components/ui/file-uploader";

<UploadItem file={{ id: "1", name: "Uploading-now.pdf", size: 2413000, type: "application/pdf", status: "uploading", progress: 42 }} onRemove={handleRemove} />
<UploadItem file={{ id: "2", name: "Completed-file.xlsx", size: 834000, type: "application/vnd.ms-excel", status: "uploaded", progress: 100 }} onRemove={handleRemove} />
<UploadItem file={{ id: "3", name: "Too-large-file.zip", size: 52300000, type: "application/zip", status: "error", progress: 0, error: "File exceeds 10 MB limit" }} onRemove={handleRemove} />`}
          >
            <UploadItemDemo />
          </ComponentPreview>
        </section>

        <section id="anatomy" className="space-y-[12px]">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Anatomy
          </h2>
          <p className="text-[14px] leading-[22px] text-[var(--text-secondary)]">
            The dropzone uses a <code className="!text-[12px]">radius-xl (12px)</code> container
            with a <code className="!text-[12px]">1px</code> dashed{" "}
            <code className="!text-[12px]">stroke-primary</code> border. In xl the padding is{" "}
            <code className="!text-[12px]">16px / 12px</code>, centred layout with a 40px featured
            icon, a 14px primary label, and a 12px secondary hint. File rows are 12px radius with
            8px padding and a 12px gap between the icon, content, and remove action.
          </p>
        </section>

        <section id="usage">
          <h2 className="text-[18px] font-semibold leading-[24px] text-[var(--header-primary)]">
            Usage Guidelines
          </h2>
          <DoDont
            doItems={[
              "Show accepted file types and the maximum file size in the hint before the user selects anything",
              "Use xl in empty states and dedicated upload screens; use md or sm when the uploader lives inside a form row",
              "Render uploading progress in the file row so users can see upload status without waiting for completion",
              "Provide a clear Remove/Cancel affordance on every file row",
              "Validate file type and size on drop and on file-input change — show an error row rather than silently rejecting",
            ]}
            dontItems={[
              "Don't hide the drag-and-drop affordance — always pair it with a 'Click to upload' link",
              "Don't start an upload without showing progress; users should never wonder whether something is happening",
              "Don't auto-dismiss error rows — let the user read the message and remove the failed file manually",
              "Don't use the uploader for media recording or camera capture — use a dedicated capture component instead",
              "Don't stack uploaded files inside the dropzone area — render them as a separate list beneath it",
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
                title: "Keyboard Operable",
                desc: "The dropzone is tab-focusable with role='button'. Pressing Enter or Space opens the native file picker, matching the behaviour of clicking the zone.",
              },
              {
                title: "Focus Ring",
                desc: "A 2px primary/500 focus ring with a 2px offset appears on keyboard focus, visible on light, dark, and hover surfaces.",
              },
              {
                title: "Screen Reader Semantics",
                desc: "The hidden <input type='file'> is the accessible form control. Each file row exposes the filename as its text and the remove button has an explicit aria-label for the action (Cancel upload / Remove file).",
              },
              {
                title: "Drag-and-drop Alternative",
                desc: "Drag-and-drop is an enhancement — the click-to-upload path works without a pointer. The zone text always includes the clickable 'Click to upload' link so non-drag users have a clear route.",
              },
              {
                title: "RTL Support",
                desc: "Pass dir='rtl' to mirror the layout, flip the lg upload button, and swap English labels for Arabic. The underlying file input stays the same.",
              },
              {
                title: "Colour Contrast",
                desc: "Primary/600 label on white meets WCAG 2.1 AA (7.1:1). Error text uses error/600, which passes AA on both surface-primary and surface-tertiary. Disabled state uses surface-disabled with 60% opacity — never rely on colour alone to signal state.",
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
          <div className="space-y-[24px]">
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">FileUploader</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "size", type: '"xl" | "lg" | "md" | "sm"', default: '"xl"', description: "Dropzone size — xl (108px) is the default empty-state upload; md and sm are input-height for inline forms" },
                    { name: "accept", type: "string", description: "Comma-separated list of MIME types or extensions accepted by the native file input" },
                    { name: "multiple", type: "boolean", default: "false", description: "Allow selecting multiple files in a single picker or drop operation" },
                    { name: "maxSize", type: "number", description: "Maximum file size in bytes — files exceeding this appear as error rows" },
                    { name: "hint", type: "string", description: "Helper text shown beneath the primary label; falls back to an auto-generated summary from accept/maxSize" },
                    { name: "disabled", type: "boolean", default: "false", description: "Disables click, keyboard, and drag interactions; applies surface-disabled styling" },
                    { name: "dir", type: '"ltr" | "rtl"', default: '"ltr"', description: "Text direction — rtl mirrors the layout and swaps English labels for Arabic" },
                    { name: "files", type: "UploadedFile[]", description: "Controlled file list; pair with onFilesChange to manage state externally" },
                    { name: "defaultFiles", type: "UploadedFile[]", description: "Uncontrolled initial file list" },
                    { name: "onFilesChange", type: "(files: UploadedFile[]) => void", description: "Called whenever the file list changes (add, progress tick, remove)" },
                    { name: "onFileSelect", type: "(files: File[]) => void", description: "Called with the raw File objects accepted by the picker or drop event — use this to trigger a real upload" },
                    { name: "simulateUpload", type: "boolean", default: "true", description: "When true the uploader auto-advances progress to 100% — turn off when wiring a real upload pipeline" },
                    { name: "className", type: "string", description: "Additional CSS classes on the outer wrapper" },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">UploadItem</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "file", type: "UploadedFile", required: true, description: "The file record to render — determines the icon, label, subtext, and status styling" },
                    { name: "onRemove", type: "(id: string) => void", description: "Called when the user clicks the XCircle icon; omit to hide the action entirely" },
                    { name: "dir", type: '"ltr" | "rtl"', default: '"ltr"', description: "Mirrors the layout and the remove button's aria-label" },
                    { name: "className", type: "string", description: "Additional CSS classes on the row container" },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold leading-[24px] text-[var(--header-primary)]">UploadedFile</h3>
              <div className="mt-[12px]">
                <PropsTable
                  props={[
                    { name: "id", type: "string", required: true, description: "Stable unique identifier for the row (used as the React key and for remove lookups)" },
                    { name: "name", type: "string", required: true, description: "Filename rendered as the primary label" },
                    { name: "size", type: "number", required: true, description: "File size in bytes — formatted automatically (KB / MB / GB)" },
                    { name: "type", type: "string", required: true, description: "MIME type — used to pick the file-type icon and colour" },
                    { name: "status", type: '"uploading" | "uploaded" | "error"', required: true, description: "Current state; drives the left affordance (progress ring vs file icon) and the row border colour" },
                    { name: "progress", type: "number", required: true, description: "0 – 100 — only drives the visual in 'uploading' status" },
                    { name: "error", type: "string", description: "Optional error message shown in the subtext when status is 'error'" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
