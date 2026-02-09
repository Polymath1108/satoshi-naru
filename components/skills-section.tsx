import { Brain, Code2, Cloud, Award } from "lucide-react"

const skillGroups = [
  {
    icon: Brain,
    title: "AI / Machine Learning",
    skills: [
      "Machine Learning", "Deep Learning", "NLP", "LLMs", "RAG",
      "Prompt Engineering", "Transformers", "Fine-tuning", "Model Evaluation",
      "Forecasting", "Recommendation Systems", "TensorFlow", "Keras",
      "Hugging Face", "LangChain", "Scikit-learn", "XGBoost",
    ],
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    skills: [
      "React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS",
      "Node.js", "FastAPI", "Django", "Java", "RESTful / GraphQL",
      "SQL", "MongoDB", "Redis", "OAuth",
    ],
  },
  {
    icon: Cloud,
    title: "MLOps & Cloud",
    skills: [
      "Docker", "Kubernetes", "MLflow", "CI/CD", "AWS", "GCP",
      "Azure", "Terraform", "GitHub Actions",
    ],
  },
]

const certifications = [
  { name: "Deep Learning Specialization", issuer: "Coursera / DeepLearning.AI" },
  { name: "Generative AI with LLMs", issuer: "Coursera / DeepLearning.AI" },
  { name: "AWS Certified ML - Specialty", issuer: "Amazon Web Services" },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Skills & Certifications</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            Technical proficiency across the full AI and software development lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="p-6 bg-card border border-border rounded-xl hover:border-[#84c11f]/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#84c11f]/10 flex items-center justify-center">
                  <group.icon className="h-5 w-5 text-[#84c11f]" />
                </div>
                <h3 className="font-bold text-foreground text-base">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-[var(--skill-bg)] text-[var(--skill-text)] border border-[var(--skill-border)] rounded-lg font-mono leading-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#84c11f]/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-[#84c11f]" />
            </div>
            <h3 className="font-bold text-foreground text-base">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="p-4 bg-secondary rounded-lg">
                <p className="text-[15px] font-semibold text-foreground mb-1">{cert.name}</p>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
