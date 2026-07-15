import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carlgergi.vercel.app"),
  title: "Carl Gergi — CS + Economics, University of Toronto",
  description:
    "Computer Science and Economics at the University of Toronto. Software development, consulting, and AI.",
  keywords: [
    "Carl Gergi",
    "University of Toronto",
    "Computer Science",
    "Economics",
    "Software Developer",
    "AI",
    "Full-stack",
  ],
  authors: [{ name: "Carl Gergi" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://carlgergi.vercel.app",
    title: "Carl Gergi — CS + Economics, University of Toronto",
    description:
      "Computer Science and Economics at the University of Toronto. Software development, consulting, and AI.",
    siteName: "Carl Gergi",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Carl Gergi — CS + Economics, University of Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carl Gergi — CS + Economics, University of Toronto",
    description:
      "Computer Science and Economics at the University of Toronto. Software development, consulting, and AI.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the pre-paint theme script may add `.light`
    // to <html> before React hydrates — that class mismatch is intentional
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}>
        {/* Runs before paint of anything below — no light-mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
