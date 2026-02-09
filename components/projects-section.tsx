"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const projectCategories = [
  {
    id: "poc-mvp",
    label: "POC / MVP",
    projects: [
      {
        title: "Multimodal AI Agent Platform",
        description:
          "Production-scale multimodal AI agent combining LLMs, computer vision, and real-time data pipelines for autonomous decision-making across e-commerce, fintech, and operations.",
        tech: ["LLM", "Computer Vision", "FastAPI", "React", "Docker"],
        image: "/ai-document-processing-dashboard.png",
      },
    ],
  },
  {
    id: "saas",
    label: "SaaS",
    projects: [
      {
        title: "AI Chatbot Platform",
        description:
          "Enterprise chatbot using transformer models (GPT, Gemini) for customer support with analytics dashboard, conversation management, and multi-tenant Stripe billing.",
        tech: ["Next.js", "TypeScript", "GPT-4", "Stripe", "PostgreSQL"],
        image: "/sentiment-analysis-dashboard.png",
      },
    ],
  },
  {
    id: "ml-solutions",
    label: "ML Solutions",
    projects: [
      {
        title: "E-Commerce Recommendation & Fraud Detection",
        description:
          "ML recommendation engine and fraud detection for Rakuten e-commerce. Improved conversion and reduced fraud using ensemble methods and deep learning.",
        tech: ["PyTorch", "XGBoost", "Scikit-learn", "Redis", "AWS"],
        image: "/code-review-ai-interface.jpg",
      },
      {
        title: "Computer Vision for Robotics & Healthcare",
        description:
          "Deep learning pipelines for large-scale datasets in robotics and healthcare at Preferred Networks with transfer learning and reinforcement learning.",
        tech: ["TensorFlow", "OpenCV", "Kubernetes", "MLflow", "Python"],
        image: "/ai-document-processing-dashboard.png",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    projects: [
      {
        title: "Enterprise Document Processing Pipeline",
        description:
          "AI document processing reducing manual workload by 30-45% and improving accuracy by 20%. Automated extraction, classification, and routing.",
        tech: ["LangChain", "GPT-4", "Kafka", "FastAPI", "Docker"],
        image: "/sentiment-analysis-dashboard.png",
      },
    ],
  },
  {
    id: "web-mobile",
    label: "Web & Mobile",
    projects: [
      {
        title: "NLP-Integrated Web & Mobile Applications",
        description:
          "Full-stack applications integrating NLP and image recognition for e-commerce and fintech at Rakuten. Optimized database performance and scalability.",
        tech: ["React", "React Native", "Node.js", "GraphQL", "MongoDB"],
        image: "/code-review-ai-interface.jpg",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    projects: [
      {
        title: "LLMOps & MLOps Standards Platform",
        description:
          "Organization-wide LLMOps/MLOps standards with automated evaluation pipelines, model versioning, shadow deployments, and cost-aware inference routing.",
        tech: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        image: "/ai-document-processing-dashboard.png",
      },
    ],
  },
]

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("poc-mvp")
  const activeCategory = projectCategories.find((c) => c.id === activeTab) || projectCategories[0]

  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Selected Projects</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            Real-world AI and software solutions delivering measurable business impact.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              id={`projects-${category.id}`}
              type="button"
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === category.id
                  ? "bg-[#84c11f] text-[#1E1F22]"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeCategory.projects.map((project) => (
            <div
              key={project.title}
              className="border border-border rounded-xl overflow-hidden flex flex-col bg-card hover:border-[#84c11f]/40 transition-colors"
            >
              <div className="h-48 overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h4 className="text-lg font-bold text-foreground mb-2">{project.title}</h4>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs bg-[#84c11f]/10 text-[#84c11f] rounded-md font-mono leading-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-muted-foreground hover:border-[#84c11f] hover:text-[#84c11f] bg-transparent"
                    asChild
                  >
                    <a href="#">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      Demo
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-[#84c11f]"
                    asChild
                  >
                    <a href="#">
                      <Github className="mr-1.5 h-3.5 w-3.5" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
