"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useProfessionForm } from "./profession-form-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function ProfessionEducationForm() {
  const { formData, updateFormData, errors } = useProfessionForm()
  const { education } = formData

  const addEducationItem = () => {
    updateFormData("education", [
      ...education,
      {
        id: Date.now().toString(),
        level: "",
        field: "",
        description: "",
      },
    ])
  }

  const removeEducationItem = (id: string) => {
    if (education.length > 1) {
      updateFormData(
        "education",
        education.filter((item) => item.id !== id),
      )
    }
  }

  const updateEducationItem = (id: string, field: string, value: string) => {
    updateFormData(
      "education",
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Education Requirements</h2>
        <p className="text-sm text-gray-500">Add the educational paths and requirements for this profession.</p>
      </div>

      <div className="space-y-4">
        {education.map((item, index) => (
          <Card key={item.id} className="relative">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Education Path {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                onClick={() => removeEducationItem(item.id)}
                disabled={education.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor={`level-${item.id}`} className="flex items-center gap-1">
                  Education Level
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`level-${item.id}`}
                  placeholder="e.g. Bachelor's Degree, Master's Degree, Bootcamp"
                  value={item.level}
                  onChange={(e) => updateEducationItem(item.id, "level", e.target.value)}
                  className={errors[`education[${index}].level`] ? "border-red-500" : ""}
                />
                {errors[`education[${index}].level`] && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors[`education[${index}].level`][0]}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`field-${item.id}`}>Field of Study</Label>
                <Input
                  id={`field-${item.id}`}
                  placeholder="e.g. Computer Science, Business Administration"
                  value={item.field}
                  onChange={(e) => updateEducationItem(item.id, "field", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`description-${item.id}`}>Description</Label>
                <Textarea
                  id={`description-${item.id}`}
                  placeholder="Describe what this education path provides for the profession"
                  rows={3}
                  value={item.description}
                  onChange={(e) => updateEducationItem(item.id, "description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full" onClick={addEducationItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Education Path
        </Button>
      </div>
    </div>
  )
}
