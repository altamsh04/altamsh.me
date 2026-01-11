"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 p-0 rounded-full flex items-center justify-center border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-900/90 transition-colors shadow-md"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 p-0 rounded-full flex items-center justify-center border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-900/90 hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors shadow-md"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
