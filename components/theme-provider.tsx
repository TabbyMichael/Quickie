import { createContext, useContext, useEffect, useState } from "react"
import { useTheme as useNextTheme } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
} & Parameters<typeof useNextTheme>[0]) {
  return <>{children}</>
}