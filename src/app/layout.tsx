import type { Metadata } from "next";
import { Syne, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Carl Gergi — CS + Economics, University of Toronto",
  description:
    "Computer Science and Economics at the University of Toronto. Software development, consulting, and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${beVietnam.variable}`}>
        {children}
      </body>
    </html>
  );
}
