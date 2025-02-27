import type { Metadata } from "next";
import Image from "next/image";
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

          {/* header :3 */}
          <div className="mx-auto md:max-w-7xl my-4 px-2 md:px-0">
            <div className="flex flex-row items-center justify-center px-4 md:px-24 gap-4 md:gap-0 mb-5">
              <div className="w-1/3">
                <Image
                  alt=""
                  src="/images/amelia.png"
                  className="rounded-full mx-auto"
                  width={128 + 64}
                  height={128 + 64}
                />
              </div>
              <div className="w-2/3">
                <h1 className="text-pink font-bold text-2xl md:text-5xl">
                  amelia rose :3
                </h1>
                <p className="text-md text-subtext0 font-medium md:text-2xl italic">
                  nyamelia
                </p>
                <p className="mt-5 md:mt-7 text-md md:text-2xl font-medium">
                  hi :)
                </p>
              </div>
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
