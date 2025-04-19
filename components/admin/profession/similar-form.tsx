"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface SimilarProfessionItem {
  id: string
  title: string
  similarity: string
  description: string
}

export default function ProfessionSimilarForm() {
  const [similarProfessions, setSimilarProfessions] = useState<SimilarProfessionItem[]>([
    {
      id: "1",
      title: "",
      similarity: "",
      description: "",
    },
  ])

  const addSimilarProfession = () => {
    setSimilarProfessions([
      ...similarProfessions,
      {
        id: Date.now().toString(),
        title: "",
        similarity: "",
        description: "",
      },
    ])
  }

  const removeSimilarProfession = (id: string) => {
    if (similarProfessions.length > 1) {
      setSimilarProfessions(similarProfessions.filter((item) => item.id !== id))
    }
  }

  const updateSimilarProfession = (id: string, field: string, value: string) => {
    setSimilarProfessions(similarProfessions.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Similar Professions</h2>
        <p className="text-sm text-gray-500">Add professions that are similar or related to this one.</p>
      </div>

      <div className="space-y-4">
        {similarProfessions.map((profession, index) => (
          <Card key={profession.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Similar Profession {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                onClick={() => removeSimilarProfession(profession.id)}
                disabled={similarProfessions.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor={`similar-title-${profession.id}`}>Profession Title</Label>
                <Input
                  id={`similar-title-${profession.id}`}
                  placeholder="e.g. Front-End Developer, UX Designer"
                  value={profession.title}
                  onChange={(e) => updateSimilarProfession(profession.id, "title", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`similar-similarity-${profession.id}`}>Similarity Level</Label>
                <Select
                  value={profession.similarity}
                  onValueChange={(value) => updateSimilarProfession(profession.id, "similarity", value)}
                >
                  <SelectTrigger id={`similar-similarity-${profession.id}`}>
                    <SelectValue placeholder="Select similarity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Very High">Very High</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`similar-description-${profession.id}`}>Description</Label>
                <Textarea
                  id={`similar-description-${profession.id}`}
                  placeholder="Briefly describe how this profession relates to the main one"
                  rows={3}
                  value={profession.description}
                  onChange={(e) => updateSimilarProfession(profession.id, "description", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full" onClick={addSimilarProfession}>
          <Plus className="h-4 w-4 mr-2" />
          Add Similar Profession
        </Button>
      </div>
    </div>
  )
}
