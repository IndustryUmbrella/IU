import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { StoreProvider } from "./store/StoreProvider";
import FetchUserData from "@/components/auth/fetchUserData";
import Footer from "@/components/general/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IU Home | Industry Umbrella",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary`}
        >
          <FetchUserData />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
