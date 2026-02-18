import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aether Weather",
  description: "Premium Weather Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen relative overflow-x-hidden text-white selection:bg-cyan-500/30">
          {/* Dynamic Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 animate-gradient-xy" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-50" />
          </div>

          {/* Content */}
          <main className="relative z-10 w-full min-h-screen flex flex-col p-6 pb-24 md:pb-6">
            <div className="w-full max-w-7xl mx-auto flex-1">
              {children}
            </div>
          </main>

          <Navigation />
        </div>
      </body>
    </html>
  );
}
