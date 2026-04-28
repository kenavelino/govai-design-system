import type { Metadata } from "next";
import { ThemeProvider } from "@/components/docs/theme-provider";
import { AgentationDev } from "@/components/agentation-dev";
import "./globals.css";

export const metadata: Metadata = {
  title: "GovAI Design System",
  description:
    "The official design system for GovAI products — building consistent, accessible, and scalable AI-native government interfaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <AgentationDev />
      </body>
    </html>
  );
}
