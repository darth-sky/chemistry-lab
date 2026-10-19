import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pembelajaran Alat Laboratorium Kimia 3D | Media Praktikum Sains Interaktif",
  description:
    "Platform pembelajaran kimia interaktif berbasis model 3D (.FBX). Pelajari fungsi, SOP penggunaan, pembacaan miniskus, dan K3 alat laboratorium secara mandiri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-[#1c2233] antialiased">
        {children}
      </body>
    </html>
  );
}
