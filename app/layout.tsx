import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LaunchLoop",
  description:
    "A platform that guides students and first-time founders from a rough idea to real validation through actionable micro-sprints.",
  keywords: ["startup", "validation", "founder", "mvp", "hypothesis", "lean startup"],
  openGraph: {
    title: "LaunchLoop",
    description: "From idea to validated MVP in 5 structured sprints.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0B1224] text-slate-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
