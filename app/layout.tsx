import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Navigation } from "@/components/Navigation";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie platform",
  description: "Movie platorm that lets you research and watch movies in great quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-800 text-gray-300")}>
        <ScreenContainer>
            <Navigation />
            {children}
        </ScreenContainer>
      </body>
    </html>
  );
}
