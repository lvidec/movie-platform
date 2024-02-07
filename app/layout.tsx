import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { Navigation } from "@/components/navigation/Navigation";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/app/ReactQueryProvider";
import { Footer } from "@/components/layout/Footer";

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
      <body className={cn(montserrat.className, "bg-slate-900 text-gray-300")}>
        <ReactQueryProvider>
          <Navigation />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
