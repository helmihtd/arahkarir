"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface SkillItem {
  id: string
  name: string
  description: string
}

interface ToolItem {
  id: string
  name: string
  examples: string
}

export default function ProfessionSkillsForm() {
  const [skills, setSkills] = useState<SkillItem[]>([
    {
      id: "1",
      name: "",
      description: "",
    },
  ])

  const [tools, setTools] = useState<ToolItem[]>([
    {
      id: "1",
      name: "",
      examples: "",
    },
  ])

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
      },
    ])
  }

  const removeSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter((item) => item.id !== id))
    }
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setSkills(skills.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addTool = () => {
    setTools([
      ...tools,
      {
        id: Date.now().toString(),
        name: "",
        examples: "",
      },
    ])
  }

  const removeTool = (id: string) => {
    if (tools.length > 1) {
      setTools(tools.filter((item) => item.id !== id))
    }
  }

  const updateTool = (id: string, field: string, value: string) => {
    setTools(tools.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Skills & Tools</h2>
        <p className="text-sm text-gray-500">Add the required skills and tools for this profession.</p>
      </div>

      <Tabs defaultValue="skills" className="space-y-4">
        <TabsList>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          {skills.map((skill, index) => (
            <Card key={skill.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">Skill {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500"
                  onClick={() => removeSkill(skill.id)}
                  disabled={skills.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor={`skill-name-${skill.id}`}>Skill Name</Label>
                  <Input
                    id={`skill-name-${skill.id}`}
                    placeholder="e.g. Programming, Communication, Problem Solving"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor={`skill-desc-${skill.id}`}>Description</Label>
                  <Textarea
                    id={`skill-desc-${skill.id}`}
                    placeholder="Describe what this skill entails and why it's important"
                    rows={3}
                    value={skill.description}
                    onChange={(e) => updateSkill(skill.id, "description", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={addSkill}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          {tools.map((tool, index) => (
            <Card key={tool.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">Tool/Technology {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500"
                  onClick={() => removeTool(tool.id)}
                  disabled={tools.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor={`tool-name-${tool.id}`}>Tool Category</Label>
                  <Input
                    id={`tool-name-${tool.id}`}
                    placeholder="e.g. Programming Languages, Design Software, Analytics Tools"
                    value={tool.name}
                    onChange={(e) => updateTool(tool.id, "name", e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor={`tool-examples-${tool.id}`}>Examples</Label>
                  <Input
                    id={`tool-examples-${tool.id}`}
                    placeholder="e.g. JavaScript, Python, Figma, Adobe XD, Google Analytics"
                    value={tool.examples}
                    onChange={(e) => updateTool(tool.id, "examples", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full" onClick={addTool}>
            <Plus className="h-4 w-4 mr-2" />
            Add Tool Category
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
