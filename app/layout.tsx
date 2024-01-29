import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Navigation } from "@/components/Navigation";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={cn(montserrat.className, "bg-slate-800 text-gray-300")}>
        <ScreenContainer className="mt-4 ">
          <Navigation />
          {children}
        </ScreenContainer>
      </body>
    </html>
  );
}
