"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

const statKeys = ["years", "systems", "reduction", "certs"] as const

export function HeroSection() {
  const t = useTranslations("hero")
  const tStats = useTranslations("hero.stats")

  const stats = [
    { value: "7+", key: statKeys[0] },
    { value: "20+", key: statKeys[1] },
    { value: "30-45%", key: statKeys[2] },
    { value: "3", key: statKeys[3] },
  ]

  return (
    <section className="relative flex items-center bg-surface pt-14">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-2xl border-2 border-border overflow-hidden">
              <img
                src="/professional-ai-engineer-headshot.jpg"
                alt="Satoshi Naru"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <Button
                size="lg"
                className="bg-[#84c11f] hover:bg-[#6fa019] text-[#1E1F22] font-semibold text-base px-6 w-full"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("viewServices")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-muted-foreground hover:border-[#84c11f] hover:text-[#84c11f] bg-transparent text-base px-6 w-full"
                asChild
              >
                <a href="/resume.pdf" download="Satoshi_Naru_Resume.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  {t("downloadResume")}
                </a>
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#84c11f]/10 border border-[#84c11f]/20 rounded-full mb-5">
              <div className="w-2 h-2 bg-[#84c11f] rounded-full" />
              <span className="text-[#84c11f] text-sm font-medium">{t("available")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-[1.1]">
              {t("title")}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-5 font-semibold leading-snug text-balance">
              {t("subtitleLine1")}
              <br />
              <span className="text-[#84c11f]">{t("subtitleLine2")}</span>
              <br />
              {t("subtitleLine3")}
            </p>

            <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-2xl text-pretty">
              {t("bio")}
            </p>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>{t("location")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-14 pt-10 border-t border-border">
          {stats.map((stat) => (
            <div key={stat.key}>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{tStats(stat.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
