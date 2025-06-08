import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fashion CRM - Kiyim-Kechak Biznes Boshqaruvi",
  description: "Kiyim-kechak biznesini boshqarish uchun CRM tizimi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body className={inter.className + " bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900 dark:to-indigo-800"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 bg-transparent">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
