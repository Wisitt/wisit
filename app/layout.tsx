import type React from "react";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { TimeProvider } from "./provider";
import { ThemeProvider } from "./theme-provider";
import CustomCursor from '@/components/custom-cursor';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "Wisit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system">
        <CustomCursor/>
          <TimeProvider>
            {children}
          </TimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}