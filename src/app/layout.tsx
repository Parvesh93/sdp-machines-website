import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import {
  SitePreloader,
} from "@/components/website/site-preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SDP Machines",
    template: "%s | SDP Machines",
  },

  description:
    "Stone processing machinery engineered and manufactured in Ajmer, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body className={inter.variable}>
          <SitePreloader />
        {children}
      </body>
    </html>
  );
}