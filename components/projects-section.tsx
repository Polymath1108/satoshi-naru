"use client"

import { useState, useEffect, useMemo } from "react"
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
import { ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { PROJECT_ASSETS } from "@/lib/project-assets"

type ProjectItem = {
  title: string
  description: string
  features?: string[]
  tech: string[]
  image?: string
  images?: string[]
  link?: string
}

type CategoryType = {
  id: string
  label: string
  projects: Array<{ title: string; description: string; features?: string[]; tech: string[] }>
}

function getCategoryIdFromHash(validIds: Set<string>): string | null {
  if (typeof window === "undefined") return null
  const hash = window.location.hash.slice(1)
  if (!hash.startsWith("projects-")) return null
  const id = hash.replace("projects-", "")
  return validIds.has(id) ? id : null
}

function getProjectImageSrc(project: ProjectItem): string {
  if (project.images?.length) return project.images[0]
  if (project.image) return project.image
  return "/placeholder.svg"
}

function getProjectImages(project: ProjectItem): string[] | null {
  if (project.images?.length) return project.images
  return null
}

export function ProjectsSection() {
  const t = useTranslations("projects")
  const categoriesRaw = t.raw("categories") as CategoryType[]
  const categories = useMemo(() => {
    return categoriesRaw.map((cat) => ({
      ...cat,
      projects: cat.projects.map((proj, idx) => {
        const assets = PROJECT_ASSETS[cat.id]?.[idx] ?? {}
        return {
          ...proj,
          images: assets.images,
          image: assets.image,
          link: assets.link,
        } as ProjectItem
      }),
    }))
  }, [categoriesRaw])

  const validCategoryIds = useMemo(() => new Set(categories.map((c) => c.id)), [categories])
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? "poc-mvp")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const activeCategory = categories.find((c) => c.id === activeTab) ?? categories[0]

  useEffect(() => {
    const syncTabFromHash = () => {
      const id = getCategoryIdFromHash(validCategoryIds)
      if (id) setActiveTab(id)
    }
    syncTabFromHash()
    window.addEventListener("hashchange", syncTabFromHash)
    return () => window.removeEventListener("hashchange", syncTabFromHash)
  }, [validCategoryIds])

  if (!activeCategory) return null

  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#84c11f] uppercase tracking-wider mb-2">{t("portfolio")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{t("title")}</h2>
          <p className="text-base text-muted-foreground max-w-2xl text-pretty">
            {t("intro")}
          </p>
        </div>

        <div className="border-b border-border mb-8">
          <div
            className="flex flex-wrap gap-0 -mb-px"
            role="tablist"
            aria-label={t("categoriesLabel")}
          >
            {categories.map((category) => (
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
                className="card-light-flow rounded-xl overflow-hidden flex flex-col flex-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84c11f]/50"
              >
                <div className="card-light-flow-inner flex flex-col min-w-0 rounded-[11px] border border-border bg-card overflow-hidden flex-1">
                  <div className="h-48 overflow-hidden bg-secondary relative flex-shrink-0">
                    {projectItem.link && (
                      <a
                        href={projectItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-background/90 hover:bg-background border border-border text-muted-foreground hover:text-[#84c11f] transition-colors"
                        aria-label="Open project link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
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
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-lg font-bold text-foreground leading-tight">{project.title}</h4>
                      {projectItem.link && (
                        <a
                          href={projectItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-[#84c11f] hover:bg-[#84c11f]/10 transition-colors"
                          aria-label="Open project link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
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
              </div>
            )
          })}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl pr-10 flex items-center gap-2 flex-wrap">
                    <span className="min-w-0">{selectedProject.title}</span>
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-2 rounded-lg text-muted-foreground hover:text-[#84c11f] hover:bg-[#84c11f]/10 transition-colors flex-shrink-0"
                        aria-label="Open project link"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-5">
                  {getProjectImages(selectedProject) && (
                    <div className="h-80 sm:h-[28rem] lg:h-[32rem] rounded-xl overflow-hidden bg-secondary border border-border">
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
                    <div className="h-80 sm:h-[28rem] lg:h-[32rem] rounded-xl overflow-hidden bg-secondary border border-border">
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
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">{t("features")}</p>
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
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">{t("stack")}</p>
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
