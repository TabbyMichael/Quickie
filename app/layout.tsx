import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from "@/components/Providers";
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quickie - Find Your Perfect Match',
  description: 'Modern dating made simple and meaningful',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}