import { createContext, useContext, useEffect, useState } from "react"
import { useTheme as useNextTheme } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
} & Parameters<typeof NextThemesProvider>[0]) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}