/** @format */
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playlist Master",
  description: "collection of best you tube videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar data={metadata} />
        {children}
      </body>
    </html>
  );
}
