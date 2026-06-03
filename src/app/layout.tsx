import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritika Sakhi ",
  description:
    "A beautiful tribute website dedicated to Diksha Mam — memories, gratitude, gallery, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
