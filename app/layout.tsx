import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import { Toaster } from '@/components/ui/sonner';

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
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeProvider>
          {children}
          <Toaster />
        </ClientThemeProvider>
      </body>
    </html>
  );
}