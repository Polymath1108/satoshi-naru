"use client"

import { Brain, Code2, Cloud, Award } from "lucide-react"
import { useTranslations } from "next-intl"

const skillIcons = [Brain, Code2, Cloud]

export function SkillsSection() {
  const t = useTranslations("skills")
  const groups = t.raw("groups") as Array<{ title: string; skills: string[] }>
  const certifications = t.raw("certifications") as Array<{ name: string; issuer: string }>

  return (
    <section id="skills" className="py-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">{t("expertise")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{t("title")}</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            {t("intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {groups.map((group, index) => {
            const Icon = skillIcons[index] ?? Brain
            return (
              <div
                key={group.title}
                className="card-light-flow p-0 rounded-xl h-full flex flex-col"
              >
                <div className="card-light-flow-inner p-6 bg-card border border-border rounded-[11px] flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#84c11f]" />
                    </div>
                    <h3 className="font-semibold text-foreground text-base">{group.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill}>
                        <span className="inline-block px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/60 border border-border rounded-md">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card-light-flow rounded-xl">
          <div className="card-light-flow-inner p-6 bg-card border border-border rounded-[11px]">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-[#84c11f]" />
              </div>
              <h3 className="font-semibold text-foreground text-base">{t("certificationsTitle")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="p-4 rounded-lg border border-border bg-muted/30">
                  <p className="text-[15px] font-semibold text-foreground mb-0.5">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
