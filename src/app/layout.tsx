import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "amelia rose :3",
  description: "satisfying your mom since 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-base text-text">
        <div className="h-[100vh] w-[100vw] overflow-hidden bg-gradient-to-br from-mantle via-crust to-mantle">
          <div className="mb-2">
            <div className="grid grid-cols-5">
              <div className="h-4 bg-sapphire"></div>
              <div className="h-4 bg-pink"></div>
              <div className="h-4 latte bg-base"></div>
              <div className="h-4 bg-pink"></div>
              <div className="h-4 bg-sapphire"></div>
            </div>
          </div>
          <div className="overflow-y-scroll">{children}</div>
        </div>
      </body>
    </html>
  );
}
