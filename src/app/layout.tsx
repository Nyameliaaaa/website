import type { Metadata } from "next";
import "./globals.css";

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
          {/* trans flag :3 */}
          <div className="mb-2">
            <div className="grid grid-cols-5">
              <div className="h-4 bg-sapphire"></div>
              <div className="h-4 bg-pink"></div>
              <div className="h-4 latte bg-base"></div>
              <div className="h-4 bg-pink"></div>
              <div className="h-4 bg-sapphire"></div>
            </div>
          </div>

          {/* content */}
          <div className="overflow-y-scroll">
            <div className="mx-auto md:max-w-7xl my-4 px-2 md:px-0">
              {children}
            </div>
          </div>

          {/* footer */}
          <div className="mx-auto md:max-w-7xl px-2 md:px-0">
            <div className="h-1 mb-3 bg-surface0"></div>
            <p className="mb-1 text-subtext1 items-center">
              &copy; copyright amelia rose {new Date().getFullYear()}{" "}
              <span className="text-xs">(not rly but idfc)</span>
            </p>
            <p className="text-subtext1">
              powered by nextjs + cloudflare pages
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
