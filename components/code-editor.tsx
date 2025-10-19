"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeEditorProps {
  fileName: string
  code: string
  onChange: (code: string) => void
}

export default function CodeEditor({ fileName, code, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [fileName])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lineCount = code.split("\n").length

  return (
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="px-4 py-3 border-b border-border bg-secondary flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">{fileName}</h3>
          <span className="text-xs text-muted-foreground">{lineCount} lines</span>
        </div>
        <Button onClick={handleCopy} variant="ghost" size="sm" className="h-6 w-6 p-0">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>

      {/* Editor Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="bg-muted text-muted-foreground font-mono text-sm px-3 py-4 select-none border-r border-border overflow-hidden">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-6 leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-4 bg-card text-foreground font-mono text-sm resize-none focus:outline-none border-none"
          spellCheck="false"
          style={{
            lineHeight: "1.5",
            tabSize: 2,
          }}
        />
      </div>
    </div>
  )
}
