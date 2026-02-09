"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, Menu, X } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"

const navHrefs = [
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
] as const

export function Navbar() {
  const t = useTranslations("nav")
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav)] backdrop-blur-sm border-b border-[var(--nav-border)]">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-foreground font-bold text-xl tracking-tight">
            Satoshi<span className="text-[#84c11f]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navHrefs.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-sm text-muted-foreground hover:text-[#84c11f] transition-colors"
              >
                {t(key)}
              </a>
            ))}
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              className="bg-[#84c11f] hover:bg-[#6fa019] text-[#1E1F22] font-semibold"
              asChild
            >
              <a href="/resume.pdf" download="Satoshi_Naru_Resume.pdf">
                <Download className="mr-1.5 h-4 w-4" />
                {t("resume")}
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navHrefs.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-muted-foreground hover:text-[#84c11f] transition-colors py-1.5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </a>
            ))}
            <Button
              className="bg-[#84c11f] hover:bg-[#6fa019] text-[#1E1F22] font-semibold w-full mt-2"
              asChild
            >
              <a href="/resume.pdf" download="Satoshi_Naru_Resume.pdf">
                <Download className="mr-1.5 h-4 w-4" />
                {t("downloadResume")}
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

function LanguageSwitcher() {
  const locale = useLocale()

  return (
    <div className="flex items-center gap-0.5 text-sm">
      <Link
        href="/"
        locale="en"
        className={`px-2 py-1 rounded font-medium transition-colors ${
          locale === "en" ? "bg-[#84c11f]/20 text-[#84c11f]" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </Link>
      <span className="text-muted-foreground/50">|</span>
      <Link
        href="/"
        locale="ja"
        className={`px-2 py-1 rounded font-medium transition-colors ${
          locale === "ja" ? "bg-[#84c11f]/20 text-[#84c11f]" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        JA
      </Link>
    </div>
  )
}
