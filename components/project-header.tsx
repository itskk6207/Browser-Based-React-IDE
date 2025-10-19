"use client"

import { Button } from "@/components/ui/button"
import { Save, Plus, Code, FolderOpen } from "lucide-react"

interface ProjectHeaderProps {
  projectName: string
  isSaved: boolean
  onSave: () => void
  onNewProject: () => void
  onShowProjects: () => void
  projectCount: number
}

export default function ProjectHeader({
  projectName,
  isSaved,
  onSave,
  onNewProject,
  onShowProjects,
  projectCount,
}: ProjectHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Code className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-xl font-bold text-foreground">{projectName}</h1>
          <p className="text-xs text-muted-foreground">
            {isSaved ? "All changes saved" : "Unsaved changes"} • {projectCount} project{projectCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onShowProjects} variant="outline" size="sm" className="gap-2 bg-transparent">
          <FolderOpen className="w-4 h-4" />
          Projects
        </Button>
        <Button onClick={onSave} variant="outline" size="sm" className="gap-2 bg-transparent">
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button onClick={onNewProject} variant="outline" size="sm" className="gap-2 bg-transparent">
          <Plus className="w-4 h-4" />
          New
        </Button>
      </div>
    </header>
  )
}
