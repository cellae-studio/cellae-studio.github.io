import { Geist_Mono, Inter, Syncopate } from "next/font/google"

import { NavbarDemo as Navbar } from "@/components/global/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"
import { Footer } from "@/components/global/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        syncopate.variable
      )}
    >
      <body className="min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <Navbar />
          <main className="flex min-h-svh w-full flex-col items-center justify-start overflow-x-clip">
            <div className="flex w-full min-w-0 flex-col text-sm leading-loose">
              {children}
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
