export interface FileNode {
  code: string
  type: "file" | "folder"
}

export interface Project {
  id: string
  name: string
  files: Record<string, FileNode>
}

export interface User {
  id: string
  email: string
  username: string
}
