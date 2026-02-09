"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

const contactItems = [
  { key: "email" as const, icon: Mail, valueKey: "emailValue", href: "mailto:satoshinaru213@gmail.com", external: false },
  { key: "linkedin" as const, icon: Linkedin, valueKey: "linkedinValue", href: "https://www.linkedin.com/in/naru-satoshi-2856923a0/", external: true },
  { key: "github" as const, icon: Github, valueKey: "githubValue", href: "https://github.com/polymath1108", external: true },
  { key: "location" as const, icon: MapPin, valueKey: "locationValue", href: null, external: false },
]

export function ContactSection() {
  const t = useTranslations("contact")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">{t("getStarted")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{t("title")}</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            {t("intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-stretch">
          <div className="md:col-span-3 card-light-flow rounded-xl h-full flex flex-col">
            <div className="card-light-flow-inner p-6 bg-card border border-border rounded-[11px] flex-1 min-h-0 flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("name")}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-[#84c11f] h-11"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-[#84c11f] h-11"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    {t("message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-[#84c11f] min-h-[140px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#84c11f] hover:bg-[#6fa019] text-[#1E1F22] font-semibold text-base"
                >
                  {t("sendMessage")}
                </Button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            {contactItems.map((item) => (
              <div
                key={item.key}
                className="card-light-flow rounded-xl"
              >
                <div className="card-light-flow-inner p-5 bg-card border border-border rounded-[11px]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-[#84c11f]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t(item.key)}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="text-[15px] text-foreground hover:text-[#84c11f] transition-colors"
                        >
                          {item.key === "email" ? "satoshinaru213@gmail.com" : item.key === "linkedin" ? "/in/naru-satoshi" : item.key === "github" ? "@polymath1108" : t("locationValue")}
                        </a>
                      ) : (
                        <p className="text-[15px] text-foreground">{t("locationValue")}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
