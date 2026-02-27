import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getDocsByCategory } from "@/lib/docs";
import { Sidebar } from "@/components/Sidebar";
import { SearchCmd } from "@/components/SearchCmd";
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
  title: "42.space Knowledge Base",
  description: "42.space 知识库",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getDocsByCategory()

  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <Sidebar categories={categories} />
        <SearchCmd />
        <main className="pl-64 min-h-screen">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
