import { Header } from "@/components/docs/header";
import { Sidebar } from "@/components/docs/sidebar";
import { PagePagination } from "@/components/docs/page-pagination";
import { PageActions } from "@/components/docs/page-actions";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface-default)]">
      <Header />
      <Sidebar />
      <main className="pt-[64px] lg:pl-[250px] xl:pr-[200px]">
        <div className="mx-auto max-w-[960px] px-[24px] pt-[80px] pb-[40px] md:px-[40px] lg:px-[48px]">
          <PageActions />
          {children}
          <PagePagination />
        </div>
      </main>
      {/* Top fade — content fades out as it scrolls under the header */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 top-[64px] z-20 h-[40px] bg-gradient-to-b from-[var(--surface-default)] to-transparent lg:left-[250px] xl:right-[200px]"
      />
      {/* Bottom fade — content fades out at the viewport bottom */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 bottom-0 z-20 h-[40px] bg-gradient-to-t from-[var(--surface-default)] to-transparent lg:left-[250px] xl:right-[200px]"
      />
    </div>
  );
}
