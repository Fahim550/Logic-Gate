import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LogicLab | Interactive Logic Gate & Circuit Simulator',
  description:
    'Visual digital logic simulator featuring realistic animated circuits, incandescent bulb glow, live truth tables, step-by-step signal flow, and bilingual learning in English and Bangla.',
  keywords: [
    'logic gates',
    'circuit simulator',
    'truth table',
    'AND gate',
    'OR gate',
    'NOT gate',
    'NAND gate',
    'NOR gate',
    'XOR gate',
    'XNOR gate',
    'digital logic simulator',
    'electronics learning',
    'লজিক গেট',
  ],
  authors: [{ name: 'LogicLab Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
