import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lilian Bischung",
  description: "Portfolio de Lilian Bischung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <title>Lilian Bischung</title>
        <meta name="description" content="Portfolio de Lilian Bischung" />
        <meta name="keywords" content="Lilian Bischung, portfolio, developpeur, full stack, javascript, react, node.js, express, mongodb, sql, no-sql" />
        <meta name="author" content="Lilian Bischung" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${inter.variable} ${bricolage.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
