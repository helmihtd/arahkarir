"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  label: string
}

export default function ProfessionNav() {
  const [activeSection, setActiveSection] = useState<string>("about")

  const navItems: NavItem[] = [
    { id: "about", label: "About This Profession" },
    { id: "education", label: "Education Requirements" },
    { id: "skills", label: "Skills & Tools" },
    { id: "career-path", label: "Career Path" },
    { id: "alternative-paths", label: "Alternative Career Paths" },
    { id: "salary", label: "Salary Information" },
    { id: "certifications", label: "Recommended Certifications" },
    { id: "people", label: "People to Follow" },
    { id: "companies", label: "Related Companies" },
    { id: "similar", label: "Similar Professions" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      navItems.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  return (
    <nav className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="font-bold text-lg mb-4">Page Navigation</h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1.5 px-2 rounded transition-colors",
                activeSection === item.id
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
