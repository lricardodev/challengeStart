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
  title: "LaunchLoop • Mi entrega para el Challenge START Lima",
  description:
    "Una plataforma diseñada para guiarte paso a paso desde una idea hasta su validación real a través de 5 sprints accionables.",
  keywords: ["startup", "validación", "founder", "mvp", "hipótesis", "lean startup"],
  openGraph: {
    title: "LaunchLoop • Mi entrega para el Challenge START Lima",
    description: "De la idea al MVP validado en 5 sprints estructurados.",
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
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#020617] text-slate-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
