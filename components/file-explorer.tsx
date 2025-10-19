"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, File, ChevronRight, ChevronDown, Folder } from "lucide-react"

interface FileExplorerProps {
  files: Record<string, any>
  selectedFile: string
  onSelectFile: (fileName: string) => void
  onCreateFile: (fileName: string) => void
  onDeleteFile: (fileName: string) => void
  onRenameFile: (oldName: string, newName: string) => void
}

export default function FileExplorer({
  files,
  selectedFile,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
}: FileExplorerProps) {
  const [newFileName, setNewFileName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [renamingFile, setRenamingFile] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "public"]))

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onCreateFile(newFileName)
      setNewFileName("")
      setIsCreating(false)
    }
  }

  const handleRename = (oldName: string) => {
    if (renameValue.trim() && renameValue !== oldName) {
      onRenameFile(oldName, renameValue)
      setRenamingFile(null)
      setRenameValue("")
    }
  }

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpandedFolders(newExpanded)
  }

  const organizeFiles = () => {
    const organized: Record<string, any> = {}
    const rootFiles: string[] = []

    Object.keys(files).forEach((fileName) => {
      if (fileName.includes("/")) {
        const parts = fileName.split("/")
        const folder = parts[0]
        if (!organized[folder]) {
          organized[folder] = []
        }
        organized[folder].push(fileName)
      } else {
        rootFiles.push(fileName)
      }
    })

    return { organized, rootFiles }
  }

  const { organized, rootFiles } = organizeFiles()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Files</h2>
        <Button onClick={() => setIsCreating(true)} variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Create New File */}
      {isCreating && (
        <div className="px-3 py-2 border-b border-border">
          <input
            type="text"
            placeholder="filename.js"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateFile()
              if (e.key === "Escape") setIsCreating(false)
            }}
            autoFocus
            className="w-full px-2 py-1 bg-input text-foreground text-sm rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {/* Root Files */}
        {rootFiles.map((fileName) => (
          <FileItem
            key={fileName}
            fileName={fileName}
            isSelected={selectedFile === fileName}
            isRenaming={renamingFile === fileName}
            renameValue={renameValue}
            onSelect={() => onSelectFile(fileName)}
            onRename={() => handleRename(fileName)}
            onDelete={() => onDeleteFile(fileName)}
            onStartRename={() => {
              setRenamingFile(fileName)
              setRenameValue(fileName)
            }}
            onRenameValueChange={setRenameValue}
          />
        ))}

        {/* Folders */}
        {Object.entries(organized).map(([folder, folderFiles]) => (
          <div key={folder}>
            <button
              onClick={() => toggleFolder(folder)}
              className="w-full px-3 py-2 hover:bg-muted transition-colors flex items-center gap-2 text-foreground"
            >
              {expandedFolders.has(folder) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Folder className="w-4 h-4" />
              <span className="text-sm">{folder}</span>
            </button>

            {/* Folder Contents */}
            {expandedFolders.has(folder) &&
              folderFiles.map((fileName: string) => (
                <FileItem
                  key={fileName}
                  fileName={fileName}
                  isSelected={selectedFile === fileName}
                  isRenaming={renamingFile === fileName}
                  renameValue={renameValue}
                  onSelect={() => onSelectFile(fileName)}
                  onRename={() => handleRename(fileName)}
                  onDelete={() => onDeleteFile(fileName)}
                  onStartRename={() => {
                    setRenamingFile(fileName)
                    setRenameValue(fileName)
                  }}
                  onRenameValueChange={setRenameValue}
                  isNested
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

interface FileItemProps {
  fileName: string
  isSelected: boolean
  isRenaming: boolean
  renameValue: string
  onSelect: () => void
  onRename: () => void
  onDelete: () => void
  onStartRename: () => void
  onRenameValueChange: (value: string) => void
  isNested?: boolean
}

function FileItem({
  fileName,
  isSelected,
  isRenaming,
  renameValue,
  onSelect,
  onRename,
  onDelete,
  onStartRename,
  onRenameValueChange,
  isNested,
}: FileItemProps) {
  const displayName = fileName.includes("/") ? fileName.split("/").pop() : fileName

  return (
    <div
      className={`group px-3 py-2 hover:bg-muted cursor-pointer transition-colors ${
        isSelected ? "bg-primary text-primary-foreground" : ""
      } ${isNested ? "pl-8" : ""}`}
    >
      {isRenaming ? (
        <input
          type="text"
          value={renameValue}
          onChange={(e) => onRenameValueChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRename()
            if (e.key === "Escape") onRenameValueChange("")
          }}
          autoFocus
          className="w-full px-2 py-1 bg-input text-foreground text-sm rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
        />
      ) : (
        <div className="flex items-center justify-between" onClick={onSelect}>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <File className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm truncate">{displayName}</span>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onStartRename()
              }}
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
