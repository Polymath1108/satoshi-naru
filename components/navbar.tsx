"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Download, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav)] backdrop-blur-sm border-b border-[var(--nav-border)]">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-foreground font-bold text-xl tracking-tight">
            Satoshi<span className="text-[#84c11f]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-[#84c11f] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <Button
              className="bg-[#84c11f] hover:bg-[#6fa019] text-[#1E1F22] font-semibold"
              asChild
            >
              <a href="/resume.pdf" download="Satoshi_Naru_Resume.pdf">
                <Download className="mr-1.5 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-[#84c11f] transition-colors py-1.5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="bg-[#84c11f] hover:bg-[#6fa019] text-[#1E1F22] font-semibold w-full mt-2"
              asChild
            >
              <a href="/resume.pdf" download="Satoshi_Naru_Resume.pdf">
                <Download className="mr-1.5 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
