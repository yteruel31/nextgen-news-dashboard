import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/_header/header";
import { TooltipProvider } from "@/components/_ui/Tooltip";
import { Toaster } from "@/components/_ui/Toaster";
import QueryProvider from "@/components/query-provider";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { ProgressBarProvider } from "@/components/_ui/ProgressBarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextGen News Dashboard",
  description: "A dashboard for the latest news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <QueryProvider>
          <TooltipProvider>
            <ProgressBarProvider>
              <Header />
              {children}
              <Footer />
            </ProgressBarProvider>
          </TooltipProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
