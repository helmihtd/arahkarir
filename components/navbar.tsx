"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="ArahKarir Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="text-xl font-bold text-indigo-700">ArahKarir</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-indigo-700 font-medium">
              Home
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-indigo-700 font-medium">
              Explore
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-700 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-700 font-medium">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 space-y-3">
            <Link
              href="/"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Log In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
