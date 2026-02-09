const experiences = [
  {
    company: "Preferred Networks",
    role: "Senior AI Engineer",
    period: "Aug 2023 - Aug 2025",
    location: "Tokyo, Japan",
    highlights: [
      "Led ML models development for computer vision and NLP tasks",
      "Built and optimized deep learning pipelines for large-scale datasets in robotics and healthcare",
      "Applied transfer learning, reinforcement learning, and state-of-the-art transformers in production",
      "Mentored junior engineers and conducted internal workshops on advanced ML topics",
    ],
  },
  {
    company: "Rakuten Group, Inc.",
    role: "Senior Full-Stack AI Engineer",
    period: "Jan 2021 - Jul 2023",
    location: "Tokyo, Japan",
    highlights: [
      "Developed AI-powered applications for e-commerce and fintech using ML for recommendations and fraud detection",
      "Led development of an AI chatbot platform using transformer-based models (GPT, Gemini)",
      "Integrated NLP and image recognition into web and mobile applications",
      "Optimized database performance and system scalability",
    ],
  },
  {
    company: "SCSK Corporation",
    role: "Full-Stack Engineer",
    period: "Apr 2018 - Nov 2020",
    location: "Tokyo, Japan",
    highlights: [
      "Developed full-stack web applications using JavaScript, Java, and Python",
      "Participated in requirement analysis, system design, and code reviews",
      "Supported long-term customer projects with continuous improvements",
    ],
  },
  {
    company: "LINE Corporation",
    role: "Junior Full-Stack Developer",
    period: "Jun 2017 - Mar 2018",
    location: "Tokyo, Japan",
    highlights: [
      "Developed frontend and backend features under senior supervision",
      "Learned the full software development lifecycle and coding standards",
      "Built solid foundations in web technologies and programming principles",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Experience</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            10+ years of progressive growth from junior developer to senior AI engineer.
          </p>
        </div>

        {/* Timeline container: vertical line + items */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#84c11f] via-[#84c11f]/60 to-[#84c11f]/20"
            aria-hidden
          />

          <ul className="space-y-0">
            {experiences.map((exp) => (
              <li key={exp.company + exp.role} className="relative flex gap-6 sm:gap-8 pb-12 last:pb-0">
                {/* Timeline node (dot) */}
                <div
                  className="relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#84c11f] bg-background shadow-[0_0_0_4px_hsl(var(--background))] ring-2 ring-[#84c11f]/30 transition-all duration-300 hover:scale-110 hover:ring-[#84c11f]/50"
                  aria-hidden
                >
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#84c11f]" />
                </div>

                {/* Card content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="card-light-flow rounded-xl transition-shadow duration-300 hover:shadow-md">
                    <div className="card-light-flow-inner rounded-[11px] border border-border bg-card p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                      <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-[#84c11f] font-medium text-[15px] mb-3">
                      {exp.company}
                      <span className="text-muted-foreground font-normal text-sm ml-2">
                        {exp.location}
                      </span>
                    </p>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-[15px] text-muted-foreground leading-relaxed flex"
                        >
                          <span className="text-[#84c11f] mr-2.5 flex-shrink-0 mt-0.5">-</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
