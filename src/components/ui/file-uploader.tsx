"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type FileUploaderSize = "xl" | "lg" | "md" | "sm";
export type UploadStatus = "uploading" | "uploaded" | "error";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress: number;
  error?: string;
}

export interface FileUploaderProps {
  size?: FileUploaderSize;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  hint?: string;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  className?: string;
  files?: UploadedFile[];
  defaultFiles?: UploadedFile[];
  onFilesChange?: (files: UploadedFile[]) => void;
  onFileSelect?: (files: File[]) => void;
  simulateUpload?: boolean;
}

const LABELS = {
  en: {
    click: "Click to upload",
    drag: " or drag and drop",
    drop: "Drop files here",
    upload: "Upload",
    remove: "Remove file",
    cancel: "Cancel upload",
  },
  ar: {
    click: "انقر للرفع",
    drag: " أو اسحب وأفلت",
    drop: "أفلت الملفات هنا",
    upload: "رفع",
    remove: "إزالة الملف",
    cancel: "إلغاء الرفع",
  },
} as const;

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function getFileCategory(type: string, name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (type.startsWith("image/") || ["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext))
    return "image";
  if (type.startsWith("video/") || ["mp4", "mov", "avi", "mkv"].includes(ext)) return "video";
  if (type.startsWith("audio/") || ["mp3", "wav"].includes(ext)) return "audio";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "doc";
  if (["xls", "xlsx", "csv"].includes(ext)) return "sheet";
  if (["ppt", "pptx"].includes(ext)) return "slides";
  if (["zip", "rar", "7z"].includes(ext)) return "archive";
  if (["js", "ts", "tsx", "jsx", "html", "css", "json", "xml", "java", "py"].includes(ext))
    return "code";
  return "file";
}

function getFileIcon(category: string): string {
  switch (category) {
    case "image":
      return "file-image";
    case "video":
      return "file-video";
    case "audio":
      return "file-audio";
    case "pdf":
      return "file-pdf";
    case "doc":
      return "file-doc";
    case "sheet":
      return "file-xls";
    case "slides":
      return "file-ppt";
    case "archive":
      return "file-zip";
    case "code":
      return "file-code";
    default:
      return "file";
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "image":
      return "#7C3AED";
    case "video":
      return "#DB2777";
    case "audio":
      return "#A855F7";
    case "pdf":
      return "#DC2626";
    case "doc":
      return "#2463EB";
    case "sheet":
      return "#158C4E";
    case "slides":
      return "#EA580C";
    case "archive":
      return "#6B7280";
    case "code":
      return "#0891B2";
    default:
      return "#6B7280";
  }
}

function getCategoryLabel(category: string, isAr: boolean): string {
  if (isAr) {
    switch (category) {
      case "image":
        return "صورة";
      case "video":
        return "فيديو";
      case "audio":
        return "صوت";
      case "pdf":
        return "مستند PDF";
      case "doc":
        return "مستند Word";
      case "sheet":
        return "جدول بيانات";
      case "slides":
        return "عرض تقديمي";
      case "archive":
        return "ملف مضغوط";
      case "code":
        return "ملف كود";
      default:
        return "ملف";
    }
  }
  switch (category) {
    case "image":
      return "Image";
    case "video":
      return "Video";
    case "audio":
      return "Audio";
    case "pdf":
      return "PDF document";
    case "doc":
      return "Word document";
    case "sheet":
      return "Spreadsheet";
    case "slides":
      return "Presentation";
    case "archive":
      return "Archive";
    case "code":
      return "Code file";
    default:
      return "File";
  }
}

function ProgressRing({
  size = 32,
  strokeWidth = 3,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.3;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 animate-spin"
      style={{ animationDuration: "1s" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--stroke-primary)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-primary-600)"
        strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${circumference - arcLength}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export interface UploadItemProps {
  file: UploadedFile;
  onRemove?: (id: string) => void;
  dir?: "ltr" | "rtl";
  className?: string;
}

export function UploadItem({ file, onRemove, dir = "ltr", className }: UploadItemProps) {
  const isAr = dir === "rtl";
  const labels = isAr ? LABELS.ar : LABELS.en;
  const category = getFileCategory(file.type, file.name);
  const color = getCategoryColor(category);
  const iconName = getFileIcon(category);
  const isUploading = file.status === "uploading";
  const isError = file.status === "error";
  const subtext = isError
    ? file.error || (isAr ? "فشل الرفع" : "Upload failed")
    : getCategoryLabel(category, isAr);

  return (
    <div
      dir={dir}
      className={cn(
        "flex w-[280px] items-center rounded-[12px] border border-[var(--stroke-primary)] bg-[var(--surface-primary)] p-[8px]",
        isUploading ? "gap-[12px]" : "gap-[8px]",
        isError && "border-[var(--color-error-600)]",
        className
      )}
    >
      {isUploading ? (
        <ProgressRing size={32} />
      ) : (
        <div
          className="flex size-[36px] shrink-0 items-center justify-center rounded-[8px] text-white"
          style={{ backgroundColor: isError ? "var(--color-error-600)" : color }}
        >
          <Icon name={iconName} className="size-[20px]" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <p
          className={cn(
            "truncate text-[14px] font-medium leading-[20px]",
            isError ? "text-[var(--color-error-600)]" : "text-[var(--header-primary)]"
          )}
        >
          {file.name}
        </p>
        <p
          className={cn(
            "truncate text-[12px] leading-[16px]",
            isError ? "text-[var(--color-error-600)]" : "text-[var(--text-tertiary)]"
          )}
        >
          {subtext}
        </p>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(file.id)}
          aria-label={isUploading ? labels.cancel : labels.remove}
          className="flex size-[20px] shrink-0 items-center justify-center text-[var(--text-tertiary)] transition-colors hover:text-[var(--header-primary)]"
        >
          <Icon name="xcircle" className="size-[20px]" />
        </button>
      )}
    </div>
  );
}

export function FileUploader({
  size = "xl",
  accept,
  multiple = false,
  maxSize,
  hint,
  disabled = false,
  dir = "ltr",
  className,
  files: controlledFiles,
  defaultFiles,
  onFilesChange,
  onFileSelect,
  simulateUpload = true,
}: FileUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>(defaultFiles ?? []);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles! : internalFiles;
  const isAr = dir === "rtl";
  const labels = isAr ? LABELS.ar : LABELS.en;

  const defaultHint = useMemo(() => {
    if (hint) return hint;
    const parts: string[] = [];
    if (accept) {
      const types = accept
        .split(",")
        .map((t) => t.trim().replace(/^\./, "").replace(/^image\//, "").toUpperCase())
        .filter(Boolean)
        .slice(0, 4);
      if (types.length) parts.push(types.join(", "));
    } else {
      parts.push(isAr ? "SVG، PNG، JPG أو GIF" : "SVG, PNG, JPG or GIF");
    }
    if (maxSize) {
      parts.push(
        isAr
          ? `(حد أقصى ${formatBytes(maxSize)})`
          : `(max. ${formatBytes(maxSize)})`
      );
    }
    return parts.join(" ");
  }, [hint, accept, maxSize, isAr]);

  const updateFiles = useCallback(
    (next: UploadedFile[]) => {
      if (!isControlled) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [isControlled, onFilesChange]
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const raw = Array.from(fileList);
      if (!raw.length) return;
      const accepted: File[] = [];
      const rejected: UploadedFile[] = [];
      for (const f of raw) {
        if (maxSize && f.size > maxSize) {
          rejected.push({
            id: `${f.name}-${Date.now()}-${Math.random()}`,
            name: f.name,
            size: f.size,
            type: f.type,
            status: "error",
            progress: 0,
            error: isAr ? "الملف كبير جدًا" : "File too large",
          });
          continue;
        }
        accepted.push(f);
      }
      const accepted2: UploadedFile[] = accepted.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        name: f.name,
        size: f.size,
        type: f.type,
        status: simulateUpload ? "uploading" : "uploaded",
        progress: simulateUpload ? 0 : 100,
      }));
      const base = multiple ? files : [];
      const next = [...base, ...accepted2, ...rejected];
      updateFiles(next);
      onFileSelect?.(accepted);
    },
    [files, maxSize, multiple, simulateUpload, updateFiles, onFileSelect, isAr]
  );

  useEffect(() => {
    if (!simulateUpload) return;
    const timers: ReturnType<typeof setInterval>[] = [];
    files.forEach((f) => {
      if (f.status !== "uploading") return;
      const timer = setInterval(() => {
        const current = isControlled ? controlledFiles! : internalFiles;
        const target = current.find((x) => x.id === f.id);
        if (!target || target.status !== "uploading") {
          clearInterval(timer);
          return;
        }
        const nextProgress = Math.min(100, target.progress + 12);
        const nextStatus: UploadStatus = nextProgress >= 100 ? "uploaded" : "uploading";
        const next = current.map((x) =>
          x.id === f.id ? { ...x, progress: nextProgress, status: nextStatus } : x
        );
        updateFiles(next);
        if (nextStatus === "uploaded") clearInterval(timer);
      }, 300);
      timers.push(timer);
    });
    return () => {
      timers.forEach((t) => clearInterval(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.map((f) => `${f.id}:${f.status}`).join(",")]);

  const handleRemove = useCallback(
    (id: string) => {
      updateFiles(files.filter((f) => f.id !== id));
    },
    [files, updateFiles]
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const containerHeight = {
    xl: "h-[108px]",
    lg: "h-[64px]",
    md: "h-[36px]",
    sm: "h-[28px]",
  }[size];

  const containerPadding = {
    xl: "px-[16px] py-[12px]",
    lg: "px-[12px] py-[12px]",
    md: "px-[12px] py-[6px]",
    sm: "px-[8px] py-[4px]",
  }[size];

  const rootRadius = size === "md" || size === "sm" ? "rounded-[8px]" : "rounded-[12px]";

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  };

  const renderDropzone = () => {
    const active = isDragging && !disabled;
    const borderClasses = active
      ? "border-solid border-[var(--color-primary-600)]"
      : "border-dashed border-[var(--stroke-primary)]";
    const bgClasses = active
      ? "bg-[var(--color-primary-50)] dark:bg-[color-mix(in_srgb,var(--color-primary-600)_14%,transparent)]"
      : disabled
        ? "bg-[var(--surface-disabled)]"
        : "";
    const cursor = disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer";

    if (size === "xl") {
      return (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label={labels.click}
          onClick={openPicker}
          onKeyDown={onKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-[4px] border outline-none transition-colors",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-primary)]",
            containerHeight,
            containerPadding,
            rootRadius,
            borderClasses,
            bgClasses,
            cursor
          )}
        >
          <div
            className={cn(
              "flex size-[40px] items-center justify-center rounded-[8px] border border-[var(--stroke-primary)]",
              active && "border-[var(--color-primary-600)] text-[var(--color-primary-600)]"
            )}
            style={{ color: active ? undefined : "var(--text-tertiary)" }}
          >
            <Icon name="cloud-arrow-up" className="size-[24px]" />
          </div>
          <div className="flex items-center gap-[4px] text-[14px] leading-[20px]">
            {active ? (
              <span className="font-medium text-[var(--color-primary-600)]">{labels.drop}</span>
            ) : (
              <>
                <span className="font-medium text-[var(--color-primary-600)]">{labels.click}</span>
                <span className="text-[var(--header-primary)]">{labels.drag}</span>
              </>
            )}
          </div>
          {!active && defaultHint && (
            <p className="text-[12px] leading-[16px] text-[var(--text-tertiary)]">{defaultHint}</p>
          )}
        </div>
      );
    }

    if (size === "lg") {
      return (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label={labels.click}
          onClick={openPicker}
          onKeyDown={onKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex w-full items-center gap-[12px] border outline-none transition-colors",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-primary)]",
            containerHeight,
            containerPadding,
            rootRadius,
            borderClasses,
            bgClasses,
            cursor
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <div className="flex items-center gap-[4px] text-[14px] leading-[20px]">
              {active ? (
                <span className="font-medium text-[var(--color-primary-600)]">{labels.drop}</span>
              ) : (
                <>
                  <span className="font-medium text-[var(--color-primary-600)]">{labels.click}</span>
                  <span className="text-[var(--header-primary)]">{labels.drag}</span>
                </>
              )}
            </div>
            {!active && defaultHint && (
              <p className="truncate text-[12px] leading-[16px] text-[var(--text-tertiary)]">
                {defaultHint}
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex size-[40px] shrink-0 items-center justify-center rounded-[8px] border border-[var(--stroke-primary)]",
              active && "border-[var(--color-primary-600)] text-[var(--color-primary-600)]"
            )}
            style={{ color: active ? undefined : "var(--text-tertiary)" }}
          >
            <Icon name="cloud-arrow-up" className="size-[20px]" />
          </div>
        </div>
      );
    }

    const iconSize = size === "md" ? "size-[16px]" : "size-[14px]";
    const textSize = size === "md" ? "text-[14px] leading-[20px]" : "text-[12px] leading-[16px]";

    return (
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label={labels.click}
        onClick={openPicker}
        onKeyDown={onKeyDown}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "flex w-full items-center gap-[8px] border outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-primary)]",
          containerHeight,
          containerPadding,
          rootRadius,
          borderClasses,
          bgClasses,
          cursor
        )}
      >
        <Icon
          name="cloud-arrow-up"
          className={cn(iconSize, "shrink-0")}
          style={{
            color: active ? "var(--color-primary-600)" : "var(--text-tertiary)",
          }}
        />
        <div className={cn("flex min-w-0 flex-1 items-center gap-[4px] truncate", textSize)}>
          {active ? (
            <span className="font-medium text-[var(--color-primary-600)]">{labels.drop}</span>
          ) : (
            <>
              <span className="font-medium text-[var(--color-primary-600)]">{labels.click}</span>
              <span className="truncate text-[var(--header-primary)]">{labels.drag}</span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div dir={dir} className={cn("flex w-full flex-col gap-[12px]", className)}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {renderDropzone()}
      {files.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          {files.map((f) => (
            <UploadItem key={f.id} file={f} onRemove={handleRemove} dir={dir} />
          ))}
        </div>
      )}
    </div>
  );
}
