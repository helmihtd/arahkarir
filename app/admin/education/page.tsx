"use client"

import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Plus, Search, FileEdit, Trash2, CheckCircle2, School, BookOpen, Layers } from "lucide-react"
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

// Mock data for education programs
const educationPrograms = [
  {
    id: 1,
    name: "Computer Science",
    type: "Degree",
    level: "Bachelor",
    institution: "University of Technology",
    duration: "4 years",
    status: "Active",
  },
  {
    id: 2,
    name: "Data Science and Analytics",
    type: "Degree",
    level: "Master",
    institution: "National University",
    duration: "2 years",
    status: "Active",
  },
  {
    id: 3,
    name: "Web Development Bootcamp",
    type: "Bootcamp",
    level: "Certificate",
    institution: "Code Academy",
    duration: "12 weeks",
    status: "Active",
  },
  {
    id: 4,
    name: "UX/UI Design",
    type: "Course",
    level: "Certificate",
    institution: "Design Institute",
    duration: "6 months",
    status: "Active",
  },
  {
    id: 5,
    name: "Cybersecurity",
    type: "Degree",
    level: "Bachelor",
    institution: "Tech University",
    duration: "4 years",
    status: "Active",
  },
]

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)

  const filteredPrograms = educationPrograms.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSelectedProgram(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the program here
    console.log(`Deleting program with ID: ${selectedProgram}`)
    setDeleteDialogOpen(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Degree":
        return <GraduationCap className="h-4 w-4 mr-1" />
      case "Bootcamp":
        return <Layers className="h-4 w-4 mr-1" />
      case "Course":
        return <BookOpen className="h-4 w-4 mr-1" />
      default:
        return <School className="h-4 w-4 mr-1" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Education Programs</h1>
          <p className="text-muted-foreground">Manage education programs, courses, and certifications</p>
        </div>
        <Button asChild>
          <Link href="/admin/education/new">
            <Plus className="mr-2 h-4 w-4" /> Add Program
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Education Programs</CardTitle>
          <CardDescription>A list of all education programs in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search programs..."
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
                  <SelectItem value="degree">Degree</SelectItem>
                  <SelectItem value="bootcamp">Bootcamp</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
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
                  <TableHead>Level</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No education programs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(program.type)}
                          {program.type}
                        </div>
                      </TableCell>
                      <TableCell>{program.level}</TableCell>
                      <TableCell>{program.institution}</TableCell>
                      <TableCell>{program.duration}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          {program.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/education/${program.id}`}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(program.id)}
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
            Showing <strong>{filteredPrograms.length}</strong> of <strong>{educationPrograms.length}</strong> programs
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this program?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the education program and remove it from our
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
