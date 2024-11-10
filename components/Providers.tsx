"use client";

import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      {children}
      <Toaster />
    </ThemeProvider>
  );
} 