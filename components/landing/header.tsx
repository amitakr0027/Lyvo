"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <span className="font-bold text-xl transition-colors duration-300 group-hover:text-primary">Lyvo</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
          >
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105 hover:bg-muted/80">
            Sign In
          </Button>
          <Button size="sm" className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Start Free Trial
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-all duration-300 hover:scale-110 hover:bg-muted/50 p-2 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300 hover:rotate-180" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2 duration-300">
          <nav className="container py-4 space-y-4">
            <Link
              href="#features"
              className="block text-sm font-medium hover:text-primary transition-all duration-300 hover:translate-x-2 hover:bg-muted/50 p-2 rounded-lg"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-sm font-medium hover:text-primary transition-all duration-300 hover:translate-x-2 hover:bg-muted/50 p-2 rounded-lg"
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="block text-sm font-medium hover:text-primary transition-all duration-300 hover:translate-x-2 hover:bg-muted/50 p-2 rounded-lg"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="block text-sm font-medium hover:text-primary transition-all duration-300 hover:translate-x-2 hover:bg-muted/50 p-2 rounded-lg"
            >
              About
            </Link>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
              <Button size="sm" className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Start Free Trial
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
