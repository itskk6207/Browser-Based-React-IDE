"use client"

import { useState, useEffect } from "react"
import { Sandpack } from "@codesandbox/sandpack-react"
import FileExplorer from "@/components/file-explorer"
import CodeEditor from "@/components/code-editor"
import ProjectHeader from "@/components/project-header"
import ProjectManager from "@/components/project-manager"
import type { Project } from "@/types"

const DEFAULT_PROJECT: Project = {
  id: "default-project",
  name: "My React App",
  files: {
    "App.jsx": {
      code: `export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Welcome to CipherStudio</h1>
      <p>Edit the code and see changes live!</p>
    </div>
  )
}`,
      type: "file",
    },
    "index.js": {
      code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
      type: "file",
    },
  },
}

export default function Home() {
  const [project, setProject] = useState<Project>(DEFAULT_PROJECT)
  const [selectedFile, setSelectedFile] = useState<string>("App.jsx")
  const [isSaved, setIsSaved] = useState(true)
  const [showProjectManager, setShowProjectManager] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  // Load projects from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cipherstudio-projects")
    if (saved) {
      try {
        const loadedProjects = JSON.parse(saved)
        setProjects(loadedProjects)
        if (loadedProjects.length > 0) {
          setProject(loadedProjects[0])
          setSelectedFile(Object.keys(loadedProjects[0].files)[0] || "")
        }
      } catch (e) {
        console.error("Failed to load projects:", e)
      }
    } else {
      setProjects([DEFAULT_PROJECT])
    }
  }, [])

  // Auto-save project
  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedProjects = projects.map((p) => (p.id === project.id ? project : p))
      localStorage.setItem("cipherstudio-projects", JSON.stringify(updatedProjects))
      setProjects(updatedProjects)
      setIsSaved(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [project])

  const handleFileChange = (fileName: string, code: string) => {
    setProject((prev) => ({
      ...prev,
      files: {
        ...prev.files,
        [fileName]: {
          ...prev.files[fileName],
          code,
        },
      },
    }))
    setIsSaved(false)
  }

  const handleCreateFile = (fileName: string) => {
    if (!project.files[fileName]) {
      setProject((prev) => ({
        ...prev,
        files: {
          ...prev.files,
          [fileName]: {
            code: "// New file",
            type: "file",
          },
        },
      }))
      setSelectedFile(fileName)
    }
  }

  const handleDeleteFile = (fileName: string) => {
    setProject((prev) => {
      const newFiles = { ...prev.files }
      delete newFiles[fileName]
      return { ...prev, files: newFiles }
    })
    if (selectedFile === fileName) {
      const remaining = Object.keys(project.files).filter((f) => f !== fileName)
      setSelectedFile(remaining[0] || "")
    }
  }

  const handleRenameFile = (oldName: string, newName: string) => {
    if (!project.files[newName]) {
      setProject((prev) => {
        const newFiles = { ...prev.files }
        newFiles[newName] = newFiles[oldName]
        delete newFiles[oldName]
        return { ...prev, files: newFiles }
      })
      if (selectedFile === oldName) {
        setSelectedFile(newName)
      }
    }
  }

  const handleSaveProject = () => {
    const updatedProjects = projects.map((p) => (p.id === project.id ? project : p))
    localStorage.setItem("cipherstudio-projects", JSON.stringify(updatedProjects))
    setProjects(updatedProjects)
    setIsSaved(true)
  }

  const handleNewProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: `Project ${projects.length + 1}`,
      files: {
        "App.jsx": {
          code: `export default function App() {
  return <div>Hello World</div>
}`,
          type: "file",
        },
      },
    }
    const updatedProjects = [newProject, ...projects]
    setProjects(updatedProjects)
    setProject(newProject)
    setSelectedFile("App.jsx")
    localStorage.setItem("cipherstudio-projects", JSON.stringify(updatedProjects))
  }

  const handleLoadProject = (projectId: string) => {
    const loaded = projects.find((p) => p.id === projectId)
    if (loaded) {
      setProject(loaded)
      setSelectedFile(Object.keys(loaded.files)[0] || "")
      setShowProjectManager(false)
    }
  }

  const handleDeleteProject = (projectId: string) => {
    const updated = projects.filter((p) => p.id !== projectId)
    setProjects(updated)
    localStorage.setItem("cipherstudio-projects", JSON.stringify(updated))
    if (project.id === projectId && updated.length > 0) {
      setProject(updated[0])
      setSelectedFile(Object.keys(updated[0].files)[0] || "")
    }
  }

  const handleRenameProject = (projectId: string, newName: string) => {
    const updated = projects.map((p) => (p.id === projectId ? { ...p, name: newName } : p))
    setProjects(updated)
    if (project.id === projectId) {
      setProject({ ...project, name: newName })
    }
    localStorage.setItem("cipherstudio-projects", JSON.stringify(updated))
  }

  const currentFile = project.files[selectedFile]

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <ProjectHeader
        projectName={project.name}
        isSaved={isSaved}
        onSave={handleSaveProject}
        onNewProject={handleNewProject}
        onShowProjects={() => setShowProjectManager(true)}
        projectCount={projects.length}
      />

      {/* Project Manager Modal */}
      {showProjectManager && (
        <ProjectManager
          projects={projects}
          currentProjectId={project.id}
          onLoadProject={handleLoadProject}
          onDeleteProject={handleDeleteProject}
          onRenameProject={handleRenameProject}
          onClose={() => setShowProjectManager(false)}
        />
      )}

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 border-r border-border bg-card overflow-y-auto">
          <FileExplorer
            files={project.files}
            selectedFile={selectedFile}
            onSelectFile={setSelectedFile}
            onCreateFile={handleCreateFile}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
          />
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r border-border">
          <CodeEditor
            fileName={selectedFile}
            code={currentFile?.code || ""}
            onChange={(code) => handleFileChange(selectedFile, code)}
          />
        </div>

        {/* Live Preview */}
        <div className="w-1/3 border-l border-border bg-card overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-border bg-secondary">
              <h3 className="text-sm font-semibold text-foreground">Preview</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <Sandpack
                template="react"
                files={project.files}
                options={{
                  showTabs: false,
                  showLineNumbers: false,
                  wrapContent: true,
                  editorHeight: "100%",
                }}
                theme="dark"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
