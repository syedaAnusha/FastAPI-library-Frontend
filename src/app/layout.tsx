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
    template: "%s | Library Management",
    default: "Library Management System",
  },
  description:
    "A modern library management system for managing books and their metadata",
  keywords: ["library", "books", "management", "reading", "literature"],
  authors: [{ name: "Library Team" }],
  openGraph: {
    title: "Library Management System",
    description:
      "A modern library management system for managing books and their metadata",
    type: "website",
    locale: "en_US",
    siteName: "Library Management",
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
