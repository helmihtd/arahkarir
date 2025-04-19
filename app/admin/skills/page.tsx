"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, FileEdit, Trash2, CheckCircle2, Code, Wrench, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock data for skills and tools
const skillsAndTools = [
  {
    id: 1,
    name: "JavaScript",
    type: "Skill",
    category: "Programming",
    level: "Advanced",
    popularity: "High",
    status: "Active",
  },
  {
    id: 2,
    name: "Figma",
    type: "Tool",
    category: "Design",
    level: "Intermediate",
    popularity: "High",
    status: "Active",
  },
  {
    id: 3,
    name: "Project Management",
    type: "Skill",
    category: "Management",
    level: "Advanced",
    popularity: "Medium",
    status: "Active",
  },
  {
    id: 4,
    name: "Adobe Photoshop",
    type: "Tool",
    category: "Design",
    level: "Advanced",
    popularity: "High",
    status: "Active",
  },
  {
    id: 5,
    name: "Python",
    type: "Skill",
    category: "Programming",
    level: "Intermediate",
    popularity: "High",
    status: "Active",
  },
]

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const filteredItems = skillsAndTools.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSelectedItem(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the item here
    console.log(`Deleting item with ID: ${selectedItem}`)
    setDeleteDialogOpen(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Skill":
        return <Code className="h-4 w-4 mr-1" />
      case "Tool":
        return <Wrench className="h-4 w-4 mr-1" />
      default:
        return <Layers className="h-4 w-4 mr-1" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Skills & Tools</h1>
          <p className="text-muted-foreground">Manage skills, tools, and technologies</p>
        </div>
        <Button asChild>
          <Link href="/admin/skills/new">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Skills & Tools</CardTitle>
          <CardDescription>A list of all skills and tools in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search skills and tools..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="skill">Skills</SelectItem>
                  <SelectItem value="tool">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No skills or tools found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(item.type)}
                          {item.type}
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.level}</TableCell>
                      <TableCell>{item.popularity}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/skills/${item.id}`}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredItems.length}</strong> of <strong>{skillsAndTools.length}</strong> items
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the skill or tool and remove it from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
