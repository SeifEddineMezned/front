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
  title: "XowME | The Future is Visual",
  description: "XowME is an AI-powered visual assistant that helps you see, understand, and do more with reality. A cinematic product experience.",
  keywords: ["AI", "Visual Assistant", "Computer Vision", "XowME", "Future Tech"],
  authors: [{ name: "XowME Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
