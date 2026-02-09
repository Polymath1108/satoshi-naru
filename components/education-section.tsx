"use client"

import { GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"

export function EducationSection() {
  const t = useTranslations("education")
  const items = t.raw("items") as Array<{
    degree: string
    university: string
    period: string
  }>

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">{t("background")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{t("title")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((edu) => (
            <div
              key={edu.degree}
              className="card-light-flow rounded-xl"
            >
              <div className="card-light-flow-inner p-6 border border-border rounded-[11px] bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap className="h-5 w-5 text-[#84c11f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">{edu.degree}</h3>
                    <p className="text-[15px] text-muted-foreground">{edu.university}</p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">{edu.period}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
