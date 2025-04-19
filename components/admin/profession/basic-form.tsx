"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProfessionForm } from "./profession-form-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ProfessionBasicForm() {
  const { formData, updateBasicInfo, errors } = useProfessionForm()

  const handleChange = (field: string, value: string) => {
    updateBasicInfo(field, value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <p className="text-sm text-gray-500">Enter the basic details about this profession.</p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="title" className="flex items-center gap-1">
            Profession Title
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g. Software Engineer"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.title[0]}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="category" className="flex items-center gap-1">
            Category
            <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="arts">Arts & Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.category[0]}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="description" className="flex items-center gap-1">
            Short Description
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Brief description of the profession (1-2 sentences)"
            rows={2}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={errors.description ? "border-red-500" : ""}
          />
          <p className="text-xs text-gray-500">This will appear in search results and cards. Keep it concise.</p>
          {errors.description && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.description[0]}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="longDescription">Detailed Description</Label>
          <Textarea
            id="longDescription"
            placeholder="Comprehensive description of the profession"
            rows={6}
            value={formData.longDescription}
            onChange={(e) => handleChange("longDescription", e.target.value)}
          />
          <p className="text-xs text-gray-500">
            This will appear in the "About This Profession" section of the detail page.
          </p>
        </div>
      </div>
    </div>
  )
}
