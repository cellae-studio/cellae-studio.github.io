import { Geist_Mono, Inter, Syncopate } from "next/font/google"

import { NavbarDemo as Navbar } from "@/components/global/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

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
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="flex min-h-svh w-full justify-center p-6">
            <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-4 text-sm leading-loose">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
