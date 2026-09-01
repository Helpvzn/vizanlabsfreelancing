export const runtime = 'edge';
import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "VizanLabs — Free Freelance Marketplace",
    template: "%s | VizanLabs",
  },
  description:
    "Post projects for free. Find freelance work for free. Connect with clients and freelancers on VizanLabs.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
