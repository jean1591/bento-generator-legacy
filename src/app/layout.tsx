import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";

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
    <html lang="fr">
      <body className={inter.className}>
        <div className="bg-polo-blue-100 text-polo-blue-600 min-h-screen">
          <div className="py-8 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
