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
    shortcut: { url: "/icons/quickshelf.png" },
    apple: { url: "/icons/quickshelf.png" },
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/icons/quickshelf.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/icons/quickshelf.png",
      },
    ],
  },
  description:
    "ReadStack is a comprehensive digital library management system that helps you organize, track, and manage your book collection efficiently. Features include book categorization, search functionality, reading progress tracking, and detailed book information management.",
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
      "ReadStack is a comprehensive digital library management system that helps you organize, track, and manage your book collection efficiently. Features include book categorization, search functionality, reading progress tracking, and detailed book information management.",
    type: "website",
    locale: "en_US",
    siteName: "ReadStack",
    images: [
      {
        url: "/icons/quickshelf.png",
        width: 1200,
        height: 628,
        alt: "ReadStack Library Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReadStack",
    description:
      "ReadStack is a comprehensive digital library management system that helps you organize, track, and manage your book collection efficiently. Features include book categorization, search functionality, reading progress tracking, and detailed book information management.",
    images: ["/icons/quickshelf.png"],
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
