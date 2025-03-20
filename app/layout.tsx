import type React from "react";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { TimeProvider } from "./provider";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "Wisit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TimeProvider>
            {children}
          </TimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}