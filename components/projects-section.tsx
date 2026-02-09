"use client"

import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const projectCategories = [
  {
    id: "poc-mvp",
    label: "POC / MVP",
    projects: [
      {
        title: "Agent Smith",
        description:
          "AI-powered startup platform for building and scaling ventures. End-to-end tooling and automation for founders and teams.",
        tech: ["AI", "Next.js", "React", "TypeScript", "Vercel"],
        images: ["/img/poc-mvp/agent-smith-1.png", "/img/poc-mvp/agent-smith-2.png"],
        link: "https://agentsmith.world",
      },
      {
        title: "Real Estate Property Management Platform",
        description:
          "Full-stack property management platform for listings, tenant management, and operations. Built for rapid POC validation.",
        tech: ["React", "Node.js", "PostgreSQL", "Docker"],
        images: ["/img/poc-mvp/property-mgnt-1.png", "/img/poc-mvp/property-mgnt-2.png"],
      },
      {
        title: "Night Club Web & Mobile",
        description:
          "Web and mobile experience for nightlife: events, ticketing, and venue management. Cross-platform POC.",
        tech: ["React", "React Native", "Firebase", "Stripe"],
        images: ["/img/poc-mvp/night-club-1.png", "/img/poc-mvp/night-club-2.png", "/img/poc-mvp/night-club-3.png"],
      },
    ],
  },
  {
    id: "saas",
    label: "SaaS",
    projects: [
      {
        title: "Hollynest",
        description:
          "The Hollynest marketing and portal site: Next.js app with Supabase auth, Stripe subscriptions, embedded chatbot (RAG + session/analytics), and user dashboard—about, blog, pricing, creators, FAQ, and contact.",
        features: [
          "Marketing & content: About, blog, FAQ, pricing, creators, contact; privacy/terms",
          "Auth: Login, register, forgot-password; Supabase Auth; OAuth callback",
          "User dashboard: Profile, change-password, delete-account; user-profile pages with embedded chatbot",
          "Subscriptions: Stripe checkout (Basic/Premium/VIP), customer portal, webhooks",
          "Chatbot: Embedded chat UI; API routes for chat, session, analytics; RAG/session logic",
          "STT / TTS: Speech-to-text and text-to-speech API routes",
          "Forms & security: EmailJS, hCaptcha, reCAPTCHA",
        ],
        tech: ["Next.js 15", "TypeScript", "Supabase", "Stripe", "Tailwind CSS", "Radix UI", "TanStack Query", "React Hook Form", "Zod"],
        images: ["/img/sass/hollynest%20(1).png", "/img/sass/hollynest%20(2).png", "/img/sass/hollynest%20(3).png"],
        link: "https://hollynest.com",
      },
      {
        title: "Paperclue",
        description:
          "Paperclue.AI frontend and backend: a platform for managing and analyzing research papers. Next.js app for paper upload, AI analysis, semantic search, and subscriptions; FastAPI backend with Mistral/OpenAI, semantic search, journal formatting, proofreading, and Stripe billing.",
        features: [
          "Paper management: Upload, view, organize research papers; full-text and semantic search",
          "AI analysis: Summaries, insights, citations via Mistral/OpenAI; proofreader & humanization",
          "Journal APIs: Crossref, DOAJ, Elsevier, IEEE, OpenAlex, PMC; format manuscripts to journal guidelines",
          "Frontend: Responsive UI (Tailwind, Shadcn), i18n, dark mode; Jotai, TanStack Query",
          "Backend: FastAPI, PostgreSQL, SQLAlchemy, Alembic; auth (JWT/OAuth), Stripe, Brevo email",
        ],
        tech: ["Next.js 15", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Mistral AI", "OpenAI", "Stripe", "Tailwind CSS", "Shadcn/ui", "Jotai", "TanStack Query"],
        images: ["/img/sass/paperclue%20(1).png", "/img/sass/paperclue%20(2).png", "/img/sass/paperclue%20(3).png"],
        link: "https://paperclue.ai",
      },
      {
        title: "Suisei",
        description:
          "All-in-one platform to create AI agents and manage your knowledge base—powered by the latest LLMs. Build, deploy, and orchestrate agents; sync your knowledge; and automate workflows in natural language. No code, no hassle: AI assistance in-browser via Chrome extension with strong security and privacy.",
        features: [
          "AI Agents: Build, manage, and deploy agents in one platform",
          "Knowledge Base: Sync and empower agents with up-to-date information",
          "AI Workflows: Automate tasks through natural language (coming soon)",
          "Chrome Extension: AI assistance anywhere in the browser",
          "Security: No training on your data; end-to-end encryption",
        ],
        tech: ["Next.js", "LLM", "GPT", "Claude", "Gemini", "Chrome Extension"],
        images: ["/img/sass/suisei%20(1).png", "/img/sass/suisei%20(2).png"],
        link: "https://suisei.ai",
      },
      {
        title: "AshesPos",
        description:
          "Ashpos is a cannabis dispensary point-of-sale and inventory system. Frontend: Next.js (Turborepo) for multi-org, multi-store retail—inventory, orders, customers, loyalty, barcode scanning, reports; optional Electron desktop. Backend: GraphQL API (Hapi + Apollo) with Prisma and PostgreSQL—organizations, dispensaries, products, packages, orders, customers, Metrc integration, JWT auth.",
        features: [
          "Multi-org / multi-store: Route by organization and store; org-access and per-store dashboards",
          "POS & orders: Order creation, checkout; customer queue; products, packages, barcode scanning (Dynamsoft)",
          "Inventory: Drawers, transfers, adjustments; Metrc-oriented package status and sync",
          "Customers & loyalty: Customer list/search, loyalty programs, loyalty history",
          "Reports & analytics: Reports, charts (Chart.js, ApexCharts, Recharts), Excel exports",
          "Backend: GraphQL (Hapi, Apollo, Prisma, PostgreSQL); JWT auth; SendGrid, Twilio; node-cron jobs",
        ],
        tech: ["Next.js 14", "TypeScript", "Turborepo", "GraphQL", "Apollo", "Hapi", "Prisma", "PostgreSQL", "JWT", "Tailwind CSS", "Mantine", "Dynamsoft", "Electron"],
        images: ["/img/sass/ashpos%20(1).png", "/img/sass/ashpos%20(2).png", "/img/sass/ashpos%20(3).png", "/img/sass/ashpos%20(4).png"],
        link: "https://ashespos.com",
      },
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
          "ML recommendation engine and fraud detection for Rakuten e-commerce using ensemble methods (XGBoost, LightGBM) and deep learning (PyTorch) for ranking and anomaly detection. MLOps: data pipelines (Airflow) for feature and label backfills; MLflow for experiment tracking, model versioning, and registry; CI/CD (GitHub Actions) for training and validation; Docker + Kubernetes for online serving with shadow deployment and A/B testing; Redis for low-latency feature and candidate caching; monitoring (Prometheus/Grafana) for latency, throughput, and model drift. Results: +18% click-through rate on recommended items; ~25% reduction in fraud-related chargebacks; p99 inference under 50ms.",
        tech: ["PyTorch", "XGBoost", "Scikit-learn", "MLflow", "Airflow", "Kubernetes", "Redis", "AWS"],
        image: "/img/mlops/rakuten-ecommerce.png",
      },
      {
        title: "Time Series Forecasting",
        description:
          "End-to-end time series forecasting for demand, capacity, and resource planning using ARIMA, Prophet, and deep learning (LSTM/Transformer). MLOps: scheduled data ingestion and feature computation (Airflow); MLflow for tracking metrics (MAE, RMSE, MAPE) and registering champion/challenger models; automated retraining on a cadence and on drift; Dockerized serving with FastAPI; validation gates (backtest and holdout) before production promotion; monitoring for forecast bias and residual distribution. Results: MAPE under 12% on 4-week demand forecasts; reduced overstock by ~15%; automated retraining kept accuracy stable across seasonality shifts.",
        tech: ["Python", "Prophet", "LSTM", "TensorFlow", "Pandas", "MLflow", "Airflow", "Docker"],
        image: "/img/mlops/time-series-forecasting.png",
      },
      {
        title: "Sales and Production Prediction",
        description:
          "ML models for sales volume and production output prediction to support inventory, staffing, and supply chain. Feature engineering from historical sales, promotions, and external signals; XGBoost/Scikit-learn with rigorous train/validation splits. MLOps: feature store and pipeline (Airflow); MLflow for experiments and model registry; CI/CD for training and evaluation; FastAPI services in Docker on AWS (ECS/Lambda); scheduled retraining and performance dashboards; alerts on MAE/RMSE degradation and data drift. Results: sales forecast MAE within 5% of actuals; production prediction reduced planning errors by ~20%; clearer visibility into demand drivers.",
        tech: ["Python", "XGBoost", "Scikit-learn", "Pandas", "FastAPI", "MLflow", "Airflow", "AWS"],
        image: "/img/mlops/sales-prediction.png",
      },
      {
        title: "Sentiment Analysis from Chatting Tools",
        description:
          "NLP pipeline for sentiment and intent analysis from chat and messaging data (Slack, support tickets, social). Transformer-based classifiers (Hugging Face) with custom fine-tuning. MLOps: labeled data versioning and train/eval splits; MLflow for experiment tracking and model registry; FastAPI inference in Docker; CI/CD for model updates; PostgreSQL for predictions and aggregates; dashboards for accuracy, latency, and label distribution; periodic retraining on new labeled data. Results: over 88% accuracy on sentiment; intent classification F1 ~0.85; real-time inference under 100ms; customer satisfaction trends surfaced weekly.",
        tech: ["Python", "Transformers", "Hugging Face", "FastAPI", "MLflow", "PostgreSQL", "Docker"],
        image: "/img/mlops/sentiment-analysis.png",
      },
      {
        title: "Travel Recommendation System (Neo4j)",
        description:
          "Graph-based travel recommendation engine using Neo4j: destinations, activities, and itineraries as nodes and relationships; personalized suggestions from user preferences and collaborative patterns via Cypher and graph algorithms. MLOps: graph ETL and schema versioning; MLflow for any auxiliary ML (e.g. ranking); FastAPI + Neo4j in Docker; blue/green deployment for graph and API; latency and cache-hit monitoring; periodic graph updates and index tuning. Results: over 30% improvement in recommendation relevance (offline NDCG); under 50ms p95 for recommendation API; higher engagement on suggested itineraries.",
        tech: ["Neo4j", "Python", "Cypher", "FastAPI", "MLflow", "Docker", "Graph Algorithms"],
        image: "/img/mlops/travel-recommendation.png",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    projects: [
      {
        title: "OpenAI Transcribe Audio + Summarize + Save to Google Drive",
        description:
          "Eliminates manual transcription work by automatically converting audio files into organized text documents with AI analysis, while maintaining human oversight through approval workflows. Triggers when new .m4a files appear in Google Drive; uses OpenAI Whisper for accurate transcription; requires email approval before processing with a 45-minute response window and escalation options; generates structured JSON reports (key points, action items, sentiment analysis); stores raw transcripts and reports in Google Drive.",
        features: [
          "Triggers when new .m4a files appear in Google Drive",
          "Uses OpenAI Whisper for accurate transcription",
          "Requires email approval before processing",
          "45-minute response window with escalation options",
          "Generates structured JSON reports: key points & action items, sentiment analysis",
          "Stores raw transcripts + reports in Google Drive",
        ],
        tech: ["OpenAI Whisper", "Google Drive API", "n8n", "GPT-4", "JSON", "Email workflow"],
        image: "/img/automation/openai-transcribe.png",
      },
      {
        title: "RAG Chatbot using n8n",
        description:
          "Retrieval-augmented generation (RAG) chatbot built with n8n: connects your documents and data to an AI assistant for accurate, source-grounded answers. Workflow automates ingestion, embedding, and retrieval; chat interface queries the vector store and generates responses with citations. Deployable as internal or customer-facing Q&A without manual transcription or copy-paste.",
        tech: ["n8n", "OpenAI", "Embeddings", "Vector Store", "RAG", "Workflow automation"],
        images: ["/img/automation/n8n-rag/RAG_workflow.png", "/img/automation/n8n-rag/screenshot_20250422_201446.png", "/img/automation/n8n-rag/screenshot_20250422_201601.png"],
      },
      {
        title: "Enterprise Document Processing Pipeline",
        description:
          "AI document processing reducing manual workload by 30-45% and improving accuracy by 20%. Automated extraction, classification, and routing.",
        tech: ["LangChain", "GPT-4", "Kafka", "FastAPI", "Docker"],
        image: "/img/automation/document-processing.png",
      },
    ],
  },
  {
    id: "web-mobile",
    label: "Web & Mobile",
    projects: [
      {
        title: "BANNER LIBRARY (Design Library)",
        description:
          "Gallery site for quality banner and web design reference. BANNER LIBRARY (design-library.jp) curates seasonal and category-based designs—fashion, beauty, food, travel, campaigns—with filters by taste, topic, shape, and color. Responsive web with search, favorites, and rankings; part of a design resource group (UI LIBRARY, MAIL LIBRARY, EC LIBRARY, CSS LABORATORY).",
        tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WordPress"],
        images: ["/img/web-mobile/design-library%20(1).png", "/img/web-mobile/design-library%20(2).png"],
        link: "https://design-library.jp/topic/spring",
      },
      {
        title: "Taprize",
        description:
          "Online gacha platform for limited and collaboration prizes. Taprize (taprize.jp) lets users play gacha to win exclusive physical and digital goods; creators get customizable sales pages, end-to-end production and fulfillment, and credit-card checkout. Free sign-up, play-by-purchase flow, and automatic shipping or digital delivery.",
        tech: ["React", "Ruby on Rails", "Stripe", "PostgreSQL", "Docker"],
        images: ["/img/web-mobile/taprize%20(1).png", "/img/web-mobile/taprize%20(2).png"],
        link: "https://taprize.jp/",
      },
      {
        title: "Klook",
        description:
          "Web and mobile travel platform for activities, attractions, hotels, and experiences. Klook (klook.com) lets users discover and book from local escapes to far-flung adventures—skip-the-line tickets, tours, transfers, eSIMs, and more. Responsive web and native apps; free cancellation, instant confirmation, Klook credits, and reviews. Your world of joy, anytime, anywhere.",
        tech: ["React", "React Native", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
        images: ["/img/web-mobile/klook%20(1).png", "/img/web-mobile/klook%20(2%20).png", "/img/web-mobile/klook%20(3).png"],
        link: "https://www.klook.com/",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    projects: [
      {
        title: "AWS Terraform Automation",
        description:
          "Multi-brand, multi-environment AWS automation with Terraform and Bash. Infrastructure: create, destroy, update, and validate environments (Terraform workspaces, namespaced resources). Deployment: automated deploy script that (1) validates prerequisites (AWS CLI, Terraform, jq), (2) reads Terraform outputs (RDS secret ARN, Redis, S3, Elastic Beanstalk app/env), (3) fetches DB and API credentials from AWS Secrets Manager, (4) builds .env from Terraform + secrets, (5) packages the app, (6) configures EB environment variables, (7) deploys to Elastic Beanstalk. Monitoring: health checks, log viewing, and report generation. Supports multiple brands and environments (e.g. staging, production) with a single script interface.",
        features: [
          "Infrastructure: create-environment, destroy-environment, update-environment, validate-environment (Terraform >= 1.6)",
          "Deployment: deploy.sh—Terraform outputs → Secrets Manager (DB, API keys) → .env generation → zip package → EB deploy",
          "Multi-brand: parameterized by brand and environment; resources namespaced {brand}-{environment}-{resource}",
          "Secrets: DB credentials and API keys (Stripe, Auth0, Plivo, Mailgun, etc.) from AWS Secrets Manager with .env fallback",
          "Monitoring: check-health, view-logs, generate-report scripts",
          "CI/CD-ready: prerequisite checks, workspace selection, optional non-interactive mode",
        ],
        tech: ["AWS", "Terraform", "Elastic Beanstalk", "Secrets Manager", "S3", "Redis", "Bash", "jq", "EB CLI"],
        image: "/img/devops/aws-automation.png",
      },
      {
        title: "LLMOps & MLOps Standards",
        description:
          "Organization-wide LLMOps/MLOps standards with automated evaluation pipelines, model versioning, shadow deployments, and cost-aware inference routing.",
        tech: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        image: "/img/devops/llm_ops.png",
      },
    ],
  },
]

type ProjectItem = {
  title: string
  description: string
  features?: string[]
  tech: string[]
  image?: string | string[]
  images?: string[]
  link?: string
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("poc-mvp")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const activeCategory = projectCategories.find((c) => c.id === activeTab) || projectCategories[0]

  function getProjectImageSrc(project: ProjectItem): string {
    if ("images" in project && project.images?.length) return project.images[0]
    if ("image" in project && project.image)
      return Array.isArray(project.image) ? project.image[0] : project.image
    return "/placeholder.svg"
  }

  function getProjectImages(project: ProjectItem): string[] | null {
    if ("images" in project && project.images?.length) return project.images
    if ("image" in project && project.image && Array.isArray(project.image)) return project.image
    return null
  }

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

        <div className="border-b border-border mb-8">
            <div
              className="flex flex-wrap gap-0 -mb-px"
              role="tablist"
              aria-label="Project categories"
            >
              {projectCategories.map((category) => (
                <button
                  key={category.id}
                  id={`projects-${category.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === category.id}
                  aria-controls="projects-panel"
                  onClick={() => setActiveTab(category.id)}
                  className={`relative px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === category.id
                      ? "border-[#84c11f] text-foreground font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
        </div>

        <div id="projects-panel" role="tabpanel" aria-labelledby={`projects-${activeTab}`} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeCategory.projects.map((project) => {
            const projectItem = project as ProjectItem
            const imageList = getProjectImages(projectItem)
            const singleSrc = getProjectImageSrc(projectItem)
            return (
              <div
                key={project.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(projectItem)}
                onKeyDown={(e) => e.key === "Enter" && setSelectedProject(projectItem)}
                className="border border-border rounded-xl overflow-hidden flex flex-col bg-card hover:border-[#84c11f]/40 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84c11f]/50"
              >
                <div className="h-48 overflow-hidden bg-secondary relative flex-shrink-0">
                  {imageList && imageList.length > 0 ? (
                    <Carousel opts={{ loop: true }} className="h-full w-full">
                      <CarouselContent className="ml-0 h-full">
                        {imageList.map((src, i) => (
                          <CarouselItem key={src} className="pl-0 h-full">
                            <img
                              src={src}
                              alt={`${project.title} screenshot ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 size-7 border-border bg-background/80 hover:bg-background" />
                      <CarouselNext className="right-2 size-7 border-border bg-background/80 hover:bg-background" />
                    </Carousel>
                  ) : (
                    <img
                      src={singleSrc}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-foreground mb-2">{project.title}</h4>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/80 border border-border rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl pr-10">{selectedProject.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  {getProjectImages(selectedProject) && (
                    <div className="h-64 sm:h-80 rounded-xl overflow-hidden bg-secondary border border-border">
                      <Carousel opts={{ loop: true }} className="h-full w-full">
                        <CarouselContent className="ml-0 h-full">
                          {getProjectImages(selectedProject)!.map((src, i) => (
                            <CarouselItem key={src} className="pl-0 h-full">
                              <img
                                src={src}
                                alt={`${selectedProject.title} screenshot ${i + 1}`}
                                className="w-full h-full object-contain bg-secondary"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3 size-8 border-border bg-background/90 hover:bg-background" />
                        <CarouselNext className="right-3 size-8 border-border bg-background/90 hover:bg-background" />
                      </Carousel>
                    </div>
                  )}
                  {!getProjectImages(selectedProject) && (
                    <div className="h-64 sm:h-80 rounded-xl overflow-hidden bg-secondary border border-border">
                      <img
                        src={getProjectImageSrc(selectedProject)}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain bg-secondary"
                      />
                    </div>
                  )}
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Features</p>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-[#84c11f] mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted/80 border border-border rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
