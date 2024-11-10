"use client"

import ThemeProvider from './theme-provider'

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
} 