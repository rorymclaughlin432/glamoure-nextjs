import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glamouré",
  description: "Glamouré Shopping - Buy now, Keep Forever",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SessionProvider>
            <Navbar />
            <main className="flex-grow px-4 py-8">
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
