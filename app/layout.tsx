import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Authority Scanner | HR4Sight",
  description: "Discover why 95% of businesses are invisible online—and what the top 5% do differently to attract high-value clients.",
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
  },
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
