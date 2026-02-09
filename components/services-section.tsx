import { ArrowRight, Rocket, CreditCard, Brain, Workflow, Smartphone, Server } from "lucide-react"

const services = [
  {
    icon: Rocket,
    title: "Rapid POC / MVP Building",
    subtitle: "1 Week Sprint",
    description:
      "Validate your AI product idea fast. Functional prototypes and MVPs in one-week sprints to test market fit and iterate before committing to full development.",
    skills: ["Webflow", "Bese44", "Webflow CMS", "Google Analytics", "Next.js/Supabase", "Python", "Docker", "Vercel"],
    projectAnchor: "poc-mvp",
  },
  {
    icon: CreditCard,
    title: "SaaS App Development",
    subtitle: "Stripe & Subscriptions",
    description:
      "End-to-end SaaS development with payment processing, subscription management, authentication, and analytics dashboards. Production-ready from day one.",
    skills: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "OAuth", "Redis", "Tailwind CSS", "GraphQL"],
    projectAnchor: "saas",
  },
  {
    icon: Brain,
    title: "ML Solutions for Business",
    subtitle: "Forecasting, Prediction & Detection",
    description:
      "Custom ML models for price forecasting, sales prediction, fraud detection, and recommendation systems. Production-grade with evaluation pipelines.",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Hugging Face", "MLflow", "Pandas", "SageMaker"],
    projectAnchor: "ml-solutions",
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    subtitle: "AI-Powered Process Optimization",
    description:
      "Automate repetitive workflows with AI agents and intelligent pipelines. Document processing, customer support chatbots, reducing manual workload by 30-45%.",
    skills: ["LangChain", "RAG", "GPT-4", "Prompt Engineering", "Kafka", "Celery", "Node.js", "Zapier API"],
    projectAnchor: "automation",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile App Development",
    subtitle: "Full-Stack Cross-Platform",
    description:
      "Modern responsive web and mobile applications with clean architecture. From landing pages to complex platforms with real-time features and scalability.",
    skills: ["React", "Next.js", "Vue.js", "React Native", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
    projectAnchor: "web-mobile",
  },
  {
    icon: Server,
    title: "DevOps & AWS Automation",
    subtitle: "Terraform & CI/CD",
    description:
      "Infrastructure as code, automated deployment pipelines, and cloud architecture on AWS. Kubernetes orchestration, containerization, and monitoring.",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "CloudWatch", "GCP"],
    projectAnchor: "devops",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">What I Do</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Services</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            End-to-end AI and software engineering services, from rapid prototyping to production deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="card-light-flow group rounded-xl flex flex-col"
            >
              <div className="card-light-flow-inner p-6 border border-border rounded-[11px] flex flex-col bg-card flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#84c11f]/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="h-5 w-5 text-[#84c11f]" />
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
                View Projects
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
