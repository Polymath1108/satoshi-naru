"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex items-center bg-surface pt-14">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* Left: Photo + CTA Buttons */}
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
                View Services
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
                  Download Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Title + Description */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#84c11f]/10 border border-[#84c11f]/20 rounded-full mb-5">
              <div className="w-2 h-2 bg-[#84c11f] rounded-full" />
              <span className="text-[#84c11f] text-sm font-medium">Available for projects</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.1] text-balance">
              Senior Full-Stack
              <br />
              <span className="text-[#84c11f]">AI / ML / LLM</span>
              <br />
              Engineer
            </h1>

            <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-2xl text-pretty">
              10+ years designing, developing, and operating AI models, scalable web applications, and AI-powered systems. Strong background in AI engineering, full-stack development, and cloud-native architecture.
            </p>

            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              <span>Tokyo, Japan</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-14 pt-10 border-t border-border">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "30-45%", label: "Workload Reduction" },
            { value: "20%", label: "Accuracy Improvement" },
            { value: "3", label: "Certifications" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
