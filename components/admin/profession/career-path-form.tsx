"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"

interface CareerPathItem {
  id: string
  title: string
  years: string
  description: string
}

interface AlternativePathItem {
  id: string
  title: string
  description: string
}

export default function ProfessionCareerPathForm() {
  const [careerPath, setCareerPath] = useState<CareerPathItem[]>([
    {
      id: "1",
      title: "",
      years: "",
      description: "",
    },
  ])

  const [alternativePaths, setAlternativePaths] = useState<AlternativePathItem[]>([
    {
      id: "1",
      title: "",
      description: "",
    },
  ])

  const addCareerPathItem = () => {
    setCareerPath([
      ...careerPath,
      {
        id: Date.now().toString(),
        title: "",
        years: "",
        description: "",
      },
    ])
  }

  const removeCareerPathItem = (id: string) => {
    if (careerPath.length > 1) {
      setCareerPath(careerPath.filter((item) => item.id !== id))
    }
  }

  const updateCareerPathItem = (id: string, field: string, value: string) => {
    setCareerPath(careerPath.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const moveCareerPathItem = (id: string, direction: "up" | "down") => {
    const index = careerPath.findIndex((item) => item.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === careerPath.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newCareerPath = [...careerPath]
    const item = newCareerPath[index]
    newCareerPath.splice(index, 1)
    newCareerPath.splice(newIndex, 0, item)
    setCareerPath(newCareerPath)
  }

  const addAlternativePath = () => {
    setAlternativePaths([
      ...alternativePaths,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
      },
    ])
  }

  const removeAlternativePath = (id: string) => {
    if (alternativePaths.length > 1) {
      setAlternativePaths(alternativePaths.filter((item) => item.id !== id))
    }
  }

  const updateAlternativePath = (id: string, field: string, value: string) => {
    setAlternativePaths(alternativePaths.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Career Paths</h2>
        <p className="text-sm text-gray-500">
          Define the career progression and alternative paths for this profession.
        </p>
      </div>

      <Tabs defaultValue="main-path" className="space-y-4">
        <TabsList>
          <TabsTrigger value="main-path">Main Career Path</TabsTrigger>
          <TabsTrigger value="alternative-paths">Alternative Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="main-path" className="space-y-4">
          {careerPath.map((item, index) => (
            <Card key={item.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">Step {index + 1}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={() => moveCareerPathItem(item.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span className="sr-only">Move Up</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={() => moveCareerPathItem(item.id, "down")}
                    disabled={index === careerPath.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                    <span className="sr-only">Move Down</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={() => removeCareerPathItem(item.id)}
                    disabled={careerPath.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor={`title-${item.id}`}>Position Title</Label>
                  <Input
                    id={`title-${item.id}`}
                    placeholder="e.g. Junior Developer, Senior Engineer"
                    value={item.title}
                    onChange={(e) => updateCareerPathItem(item.id, "title", e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor={`years-${item.id}`}>Experience Range</Label>
                  <Input
                    id={`years-${item.id}`}
                    placeholder="e.g. 0-2 years, 3-5 years"
                    value={item.years}
                    onChange={(e) => updateCareerPathItem(item.id, "years", e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <Textarea
                    id={`description-${item.id}`}
                    placeholder="Describe the responsibilities and expectations for this career stage"
                    rows={3}
                    value={item.description}
                    onChange={(e) => updateCareerPathItem(item.id, "description", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={addCareerPathItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Career Step
          </Button>
        </TabsContent>

        <TabsContent value="alternative-paths" className="space-y-4">
          {alternativePaths.map((item, index) => (
            <Card key={item.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">Alternative Path {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500"
                  onClick={() => removeAlternativePath(item.id)}
                  disabled={alternativePaths.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor={`alt-title-${item.id}`}>Alternative Profession</Label>
                  <Input
                    id={`alt-title-${item.id}`}
                    placeholder="e.g. Product Manager, UX Designer"
                    value={item.title}
                    onChange={(e) => updateAlternativePath(item.id, "title", e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor={`alt-description-${item.id}`}>Description</Label>
                  <Textarea
                    id={`alt-description-${item.id}`}
                    placeholder="Describe how this alternative path relates to the main profession"
                    rows={3}
                    value={item.description}
                    onChange={(e) => updateAlternativePath(item.id, "description", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={addAlternativePath}>
            <Plus className="h-4 w-4 mr-2" />
            Add Alternative Path
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
