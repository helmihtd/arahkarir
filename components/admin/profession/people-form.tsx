"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface PersonItem {
  id: string
  name: string
  platform: string
  handle: string
  expertise: string
}

export default function ProfessionPeopleForm() {
  const [people, setPeople] = useState<PersonItem[]>([
    {
      id: "1",
      name: "",
      platform: "",
      handle: "",
      expertise: "",
    },
  ])

  const addPerson = () => {
    setPeople([
      ...people,
      {
        id: Date.now().toString(),
        name: "",
        platform: "",
        handle: "",
        expertise: "",
      },
    ])
  }

  const removePerson = (id: string) => {
    if (people.length > 1) {
      setPeople(people.filter((item) => item.id !== id))
    }
  }

  const updatePerson = (id: string, field: string, value: string) => {
    setPeople(people.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">People to Follow</h2>
        <p className="text-sm text-gray-500">
          Add influential people or pages that professionals in this field should follow.
        </p>
      </div>

      <div className="space-y-4">
        {people.map((person, index) => (
          <Card key={person.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Person/Page {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                onClick={() => removePerson(person.id)}
                disabled={people.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor={`person-name-${person.id}`}>Name</Label>
                <Input
                  id={`person-name-${person.id}`}
                  placeholder="e.g. Jane Smith, Tech Career Hub"
                  value={person.name}
                  onChange={(e) => updatePerson(person.id, "name", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`person-platform-${person.id}`}>Platform</Label>
                <Select value={person.platform} onValueChange={(value) => updatePerson(person.id, "platform", value)}>
                  <SelectTrigger id={`person-platform-${person.id}`}>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Substack">Substack</SelectItem>
                    <SelectItem value="GitHub">GitHub</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Website">Website/Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`person-handle-${person.id}`}>Handle/Username</Label>
                <Input
                  id={`person-handle-${person.id}`}
                  placeholder="e.g. @janesmith, linkedin.com/in/janesmith"
                  value={person.handle}
                  onChange={(e) => updatePerson(person.id, "handle", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`person-expertise-${person.id}`}>Area of Expertise</Label>
                <Input
                  id={`person-expertise-${person.id}`}
                  placeholder="e.g. Career Advice, Technical Tutorials"
                  value={person.expertise}
                  onChange={(e) => updatePerson(person.id, "expertise", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full" onClick={addPerson}>
          <Plus className="h-4 w-4 mr-2" />
          Add Person/Page
        </Button>
      </div>
    </div>
  )
}
