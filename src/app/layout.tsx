import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";
import { StoreProvider } from "./lib/store/storeProvider";
import { classNames } from "@/utils";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bento Generator - Jean Robertou",
  description: "Generate bento design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={classNames(
            inter.className,
            "bg-polo-blue-100/50 dark:bg-polo-blue-800 text-polo-blue-600 dark:text-polo-blue-200 transition ease-in-out duration-500"
          )}
        >
          <ThemeProvider attribute="class">
            <div className="py-8 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
