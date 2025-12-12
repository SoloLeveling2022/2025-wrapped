"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const updateTheme = () => {
      const now = new Date()
      const hour = now.getHours()

      // Dark mode from 6 PM (18:00) to 9 AM (9:00)
      // Light mode from 9 AM to 6 PM
      const shouldBeDark = hour >= 18 || hour < 9

      const newTheme = shouldBeDark ? "dark" : "light"
      setTheme(newTheme)

      // Update document class
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      console.log("[v0] Theme updated:", newTheme, "at", hour + ":00")
    }

    // Initial theme set
    updateTheme()

    // Update theme every minute to catch transitions
    const interval = setInterval(updateTheme, 60000)

    return () => clearInterval(interval)
  }, [])

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
