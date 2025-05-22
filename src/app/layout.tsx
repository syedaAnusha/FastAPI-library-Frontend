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
  description:
    "QuickShelf is a modern library system to manage, search, and organize your book collection with ease.",
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
    title: "QuickShelf",
    description:
      "QuickShelf is a modern library system to manage, search, and organize your book collection with ease.",
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
