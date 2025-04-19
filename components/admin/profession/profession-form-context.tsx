"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define types for all profession data
export interface ProfessionFormData {
  // Basic Info
  title: string
  category: string
  description: string
  longDescription: string

  // Education
  education: {
    id: string
    level: string
    field: string
    description: string
  }[]

  // Skills & Tools
  skills: {
    id: string
    name: string
    description: string
  }[]
  tools: {
    id: string
    name: string
    examples: string
  }[]

  // Career Path
  careerPath: {
    id: string
    title: string
    years: string
    description: string
  }[]
  alternativePaths: {
    id: string
    title: string
    description: string
  }[]

  // Salary
  salary: {
    entry: string
    mid: string
    senior: string
    average: string
    currency: string
  }

  // Certifications
  certifications: {
    id: string
    name: string
    provider: string
    level: string
  }[]

  // People to Follow
  peopleToFollow: {
    id: string
    name: string
    platform: string
    handle: string
    expertise: string
  }[]

  // Companies
  companies: {
    id: string
    name: string
    industry: string
    size: string
  }[]

  // Similar Professions
  similarProfessions: {
    id: string
    title: string
    similarity: string
    description: string
  }[]

  // Images
  images: {
    id: string
    url: string
    alt: string
    file?: File
  }[]

  // Status
  status: "draft" | "published"
}

// Default empty form data
const defaultFormData: ProfessionFormData = {
  title: "",
  category: "",
  description: "",
  longDescription: "",
  education: [{ id: "1", level: "", field: "", description: "" }],
  skills: [{ id: "1", name: "", description: "" }],
  tools: [{ id: "1", name: "", examples: "" }],
  careerPath: [{ id: "1", title: "", years: "", description: "" }],
  alternativePaths: [{ id: "1", title: "", description: "" }],
  salary: {
    entry: "",
    mid: "",
    senior: "",
    average: "",
    currency: "USD",
  },
  certifications: [{ id: "1", name: "", provider: "", level: "" }],
  peopleToFollow: [{ id: "1", name: "", platform: "", handle: "", expertise: "" }],
  companies: [{ id: "1", name: "", industry: "", size: "" }],
  similarProfessions: [{ id: "1", title: "", similarity: "", description: "" }],
  images: [{ id: "1", url: "/placeholder.svg?height=200&width=300", alt: "" }],
  status: "draft",
}

// Create context
interface ProfessionFormContextType {
  formData: ProfessionFormData
  updateFormData: (section: keyof ProfessionFormData, data: any) => void
  updateBasicInfo: (field: string, value: string) => void
  updateSalary: (field: string, value: string) => void
  saveFormData: (status?: "draft" | "published") => Promise<boolean>
  isLoading: boolean
  errors: Record<string, string[]>
  validateForm: () => boolean
  resetForm: () => void
}

const ProfessionFormContext = createContext<ProfessionFormContextType | undefined>(undefined)

export function ProfessionFormProvider({
  children,
  initialData,
  professionId,
}: {
  children: React.ReactNode
  initialData?: Partial<ProfessionFormData>
  professionId?: string
}) {
  const [formData, setFormData] = useState<ProfessionFormData>({
    ...defaultFormData,
    ...initialData,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  // Load data if editing an existing profession
  useEffect(() => {
    if (professionId) {
      setIsLoading(true)
      // This would be replaced with an actual API call
      setTimeout(() => {
        // Mock data loading
        if (initialData) {
          setFormData({
            ...defaultFormData,
            ...initialData,
          })
        }
        setIsLoading(false)
      }, 500)
    }
  }, [professionId, initialData])

  const updateFormData = (section: keyof ProfessionFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const updateBasicInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateSalary = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value,
      },
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string[]> = {}

    // Basic validation
    if (!formData.title) {
      newErrors.title = ["Profession title is required"]
    }

    if (!formData.category) {
      newErrors.category = ["Category is required"]
    }

    if (!formData.description) {
      newErrors.description = ["Description is required"]
    }

    // Validate education items
    formData.education.forEach((item, index) => {
      if (!item.level) {
        newErrors[`education[${index}].level`] = ["Education level is required"]
      }
    })

    // Add more validation as needed

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveFormData = async (status: "draft" | "published" = "draft") => {
    if (!validateForm()) {
      return false
    }

    setIsLoading(true)

    try {
      // This would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update status
      setFormData((prev) => ({
        ...prev,
        status,
      }))

      console.log("Form data saved:", { ...formData, status })
      return true
    } catch (error) {
      console.error("Error saving form data:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(defaultFormData)
    setErrors({})
  }

  return (
    <ProfessionFormContext.Provider
      value={{
        formData,
        updateFormData,
        updateBasicInfo,
        updateSalary,
        saveFormData,
        isLoading,
        errors,
        validateForm,
        resetForm,
      }}
    >
      {children}
    </ProfessionFormContext.Provider>
  )
}

export function useProfessionForm() {
  const context = useContext(ProfessionFormContext)
  if (context === undefined) {
    throw new Error("useProfessionForm must be used within a ProfessionFormProvider")
  }
  return context
}
