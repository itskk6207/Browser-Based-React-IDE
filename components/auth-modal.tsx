"use client"

import { useState } from "react"
import { X } from "lucide-react"
import LoginForm from "@/components/login-form"
import RegisterForm from "@/components/register-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "register"
}

export default function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-muted rounded transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {mode === "login"
              ? "Sign in to access your projects"
              : "Join CipherStudio to save your projects in the cloud"}
          </p>
        </div>

        {mode === "login" ? (
          <LoginForm onSuccess={onClose} onSwitchToRegister={() => setMode("register")} />
        ) : (
          <RegisterForm onSuccess={onClose} onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  )
}
