// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { TimeProvider } from "./provider";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Wisit",
  icons: {
    icon: [
      { url: "/wisit.svg", type: "image/svg+xml" },
      { url: "/wisit-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/wisit-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/wisit.svg",
  },
  themeColor: "#111214",
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
