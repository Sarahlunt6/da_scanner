import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Authority Scanner | Opkie",
  description: "Find out why high-value patients aren't finding you—and what the top 5% of practices do differently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
