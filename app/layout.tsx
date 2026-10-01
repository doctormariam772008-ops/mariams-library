import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariam's Library",
  description: "Your personal digital library",
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
