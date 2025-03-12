import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const dosis = Dosis({
  weight: '400',
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Our Only Earth",
  description: "Our Planet, Our Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dosis.className}>{children}</body>
    </html>
  )
}
