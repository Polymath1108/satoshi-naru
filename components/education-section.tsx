import { GraduationCap } from "lucide-react"

const education = [
  {
    degree: "Master of Information Science and Technology (MIST)",
    university: "The University of Tokyo",
    period: "2021 - 2023",
  },
  {
    degree: "Bachelor's Degree in Computer Science",
    university: "Nagoya University",
    period: "2013 - 2017",
  },
]

export function EducationSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">Background</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Education</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {education.map((edu) => (
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
