"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, X } from "lucide-react"
import type { Project } from "@/types"

interface ProjectManagerProps {
  projects: Project[]
  currentProjectId: string
  onLoadProject: (projectId: string) => void
  onDeleteProject: (projectId: string) => void
  onRenameProject: (projectId: string, newName: string) => void
  onClose: () => void
}

export default function ProjectManager({
  projects,
  currentProjectId,
  onLoadProject,
  onDeleteProject,
  onRenameProject,
  onClose,
}: ProjectManagerProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState("")

  const handleRename = (projectId: string) => {
    if (renameValue.trim()) {
      onRenameProject(projectId, renameValue)
      setRenamingId(null)
      setRenameValue("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-96 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Projects</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="h-6 w-6 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto">
          {projects.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">No projects yet</div>
          ) : (
            <div className="divide-y divide-border">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`px-6 py-4 hover:bg-muted transition-colors ${
                    project.id === currentProjectId ? "bg-primary/10" : ""
                  }`}
                >
                  {renamingId === project.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(project.id)
                          if (e.key === "Escape") setRenamingId(null)
                        }}
                        autoFocus
                        className="flex-1 px-2 py-1 bg-input text-foreground text-sm rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <Button
                        onClick={() => handleRename(project.id)}
                        size="sm"
                        className="bg-primary text-primary-foreground"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div onClick={() => onLoadProject(project.id)} className="flex-1 cursor-pointer">
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-xs text-muted-foreground">{Object.keys(project.files).length} files</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setRenamingId(project.id)
                            setRenameValue(project.name)
                          }}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => onDeleteProject(project.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
