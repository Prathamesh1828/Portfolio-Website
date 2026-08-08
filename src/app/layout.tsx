import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { SocialBar } from "@/components/ui/SocialBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prathamesh Jaiswar | AI Engineer",
  description: "AI Engineer focused on Generative AI, AI Agents, Backend Engineering, and Intelligent Automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <CursorGlow />
        <SocialBar />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
