import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CardLightFlowInit } from "@/components/card-light-flow-init"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Satoshi Naru | Senior Full-Stack AI / ML / LLM Engineer",
  description:
    "Portfolio of Satoshi Naru - Senior Full-Stack AI/ML/LLM Engineer with 10+ years of experience building AI-powered systems, scalable web applications, and production-grade ML solutions.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CardLightFlowInit />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
