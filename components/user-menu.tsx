"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-context"
import { LogOut, User, ChevronDown } from "lucide-react"

export default function UserMenu() {
  const { user, logout, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAuthenticated || !user) return null

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="sm" className="gap-2 bg-transparent">
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">{user.username}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">{user.username}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 rounded-none text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
}
