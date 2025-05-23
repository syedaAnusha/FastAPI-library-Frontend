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
    template: "%s | ReadStack",
    default: "ReadStack",
  },
  icons: {
    icon: "/icons/quickshelf.png",
  },
  description:
    "ReadStack: A modern library management system for managing books.",
  keywords: [
    "library system",
    "book management",
    "online library",
    "digital bookshelf",
    "QuickShelf",
    "book search",
    "library software",
    "reading tracker",
  ],
  authors: [{ name: "Anusha Syeda" }],
  openGraph: {
    title: "ReadStack",
    description:
      "ReadStack: A modern library management system for managing books.",
    type: "website",
    locale: "en_US",
    siteName: "ReadStack",
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
