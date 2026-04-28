"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { IconContext } from "@phosphor-icons/react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <IconContext.Provider value={{ weight: "regular" }}>
        {children}
      </IconContext.Provider>
    </NextThemesProvider>
  );
}
