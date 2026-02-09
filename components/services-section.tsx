"use client"

import { ArrowRight, Rocket, CreditCard, Brain, Workflow, Smartphone, Server } from "lucide-react"
import { useTranslations } from "next-intl"

const serviceIcons = [
  Rocket,
  CreditCard,
  Brain,
  Workflow,
  Smartphone,
  Server,
]

export function ServicesSection() {
  const t = useTranslations("services")
  const items = t.raw("items") as Array<{
    title: string
    subtitle: string
    description: string
    skills: string[]
    projectAnchor: string
  }>

  return (
    <section id="services" className="py-20 bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">{t("whatIDo")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{t("title")}</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            {t("intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((service, index) => {
            const Icon = serviceIcons[index] ?? Rocket
            return (
              <div
                key={service.title}
                className="card-light-flow group rounded-xl flex flex-col"
              >
                <div className="card-light-flow-inner p-6 border border-border rounded-[11px] flex flex-col bg-card flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#84c11f]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-snug">{service.title}</h3>
                      <p className="text-sm text-[#84c11f] font-medium mt-0.5">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-4 flex-1">{service.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs bg-[var(--skill-bg)] text-[var(--skill-text)] border border-[var(--skill-border)] rounded-md font-mono leading-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`#projects-${service.projectAnchor}`}
                    className="inline-flex items-center text-xs font-semibold text-foreground hover:text-[#84c11f] transition-colors mt-auto"
                  >
                    {t("viewProjects")}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
