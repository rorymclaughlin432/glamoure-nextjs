import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import SessionProvider from './SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flowmazon',
  description: 'Flowmazon Shopping - Buy now, Keep Forever',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Navbar />
        <main className="container m-auto min-w-[300px] px-4 py-8">{children}</main>
        <Footer />
        </SessionProvider>
        </body>
    </html>
  )
}
