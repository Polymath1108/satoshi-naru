"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"

export function ContactSection() {
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
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">Get Started</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Get In Touch</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            {"Let's discuss how AI can solve your business challenges."}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 p-6 bg-card border border-border rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-[#84c11f] h-11"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-[#84c11f] h-11"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
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
                Send Message
              </Button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "satoshinaru213@gmail.com",
                href: "mailto:satoshinaru213@gmail.com",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "/in/naru-satoshi",
                href: "https://www.linkedin.com/in/naru-satoshi-2856923a0/",
                external: true,
              },
              {
                icon: Github,
                label: "GitHub",
                value: "@polymath1108",
                href: "https://github.com/polymath1108",
                external: true,
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Tokyo, Japan",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 bg-card border border-border rounded-xl hover:border-[#84c11f]/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-[#84c11f]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-[15px] text-foreground hover:text-[#84c11f] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[15px] text-foreground">{item.value}</p>
                    )}
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
