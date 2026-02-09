import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

type Props = { params: Promise<{ locale: string }> }

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
