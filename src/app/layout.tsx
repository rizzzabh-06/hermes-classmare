import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hermes · Classroom Intelligence",
  description: "AI-powered CBSE assessment intelligence — evaluate answers, detect misconceptions, and generate weekly teaching plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
