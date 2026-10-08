import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokémon Explorer",
  description:
    "A responsive Pokémon explorer web application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-900 text-slate-100 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center py-6 text-xs text-slate-500 border-t border-slate-800">
          Built with Next.js & Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
