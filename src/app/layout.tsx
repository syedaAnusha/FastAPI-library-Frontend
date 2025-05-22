import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | QuickShelf",
    default: "QuickShelf",
  },
  icons: {
    icon: "/icons/quickshelf.png",
  },
  description: "A modern library management system for managing books.",
  keywords: ["library", "books", "management", "reading", "literature"],
  authors: [{ name: "Anusha Syeda" }],
  openGraph: {
    title: "QuickShelf",
    description: "A modern library management system for managing books.",
    type: "website",
    locale: "en_US",
    siteName: "QuickShelf",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
