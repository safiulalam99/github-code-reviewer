"use client"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Github } from "lucide-react"
import { Button } from "./ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold hidden sm:inline">GitHub Code Review</span>
          <span className="font-bold sm:hidden">GCR</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link 
              href="https://github.com/safiulalam99/github-code-reviewer" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 