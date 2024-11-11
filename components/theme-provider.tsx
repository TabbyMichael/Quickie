'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
} & Parameters<typeof NextThemeProvider>[0]) {
  return (
    <NextThemeProvider {...props}>
      {children}
    </NextThemeProvider>
  );
}