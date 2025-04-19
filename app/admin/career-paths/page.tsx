"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, Plus, Search, FileEdit, Trash2, CheckCircle2, Briefcase } from "lucide-react"
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

// Mock data for career paths
const careerPaths = [
  {
    id: 1,
    name: "Software Engineer to CTO",
    startingRole: "Junior Developer",
    endingRole: "Chief Technology Officer",
    steps: 5,
    industry: "Technology",
    status: "Active",
  },
  {
    id: 2,
    name: "Marketing Specialist to CMO",
    startingRole: "Marketing Assistant",
    endingRole: "Chief Marketing Officer",
    steps: 4,
    industry: "Marketing",
    status: "Active",
  },
  {
    id: 3,
    name: "Financial Analyst to CFO",
    startingRole: "Junior Financial Analyst",
    endingRole: "Chief Financial Officer",
    steps: 6,
    industry: "Finance",
    status: "Active",
  },
  {
    id: 4,
    name: "UX Designer to Design Director",
    startingRole: "Junior UX Designer",
    endingRole: "Design Director",
    steps: 4,
    industry: "Design",
    status: "Active",
  },
  {
    id: 5,
    name: "Data Analyst to Data Science Director",
    startingRole: "Data Analyst",
    endingRole: "Director of Data Science",
    steps: 5,
    industry: "Data Science",
    status: "Active",
  },
]

export default function CareerPathsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPath, setSelectedPath] = useState<number | null>(null)

  const filteredPaths = careerPaths.filter(
    (path) =>
      path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.startingRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.endingRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.industry.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSelectedPath(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the path here
    console.log(`Deleting career path with ID: ${selectedPath}`)
    setDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Career Paths</h1>
          <p className="text-muted-foreground">Manage career progression paths and trajectories</p>
        </div>
        <Button asChild>
          <Link href="/admin/career-paths/new">
            <Plus className="mr-2 h-4 w-4" /> Add Career Path
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Career Paths</CardTitle>
          <CardDescription>A list of all career progression paths in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search career paths..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Path Name</TableHead>
                  <TableHead>Starting Role</TableHead>
                  <TableHead>Ending Role</TableHead>
                  <TableHead>Steps</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaths.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No career paths found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPaths.map((path) => (
                    <TableRow key={path.id}>
                      <TableCell className="font-medium">{path.name}</TableCell>
                      <TableCell>{path.startingRole}</TableCell>
                      <TableCell>{path.endingRole}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-indigo-500" />
                          {path.steps} steps
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          <Briefcase className="h-3.5 w-3.5 mr-1" />
                          {path.industry}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          {path.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/career-paths/${path.id}`}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(path.id)}
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
            Showing <strong>{filteredPaths.length}</strong> of <strong>{careerPaths.length}</strong> career paths
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this career path?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the career path and remove it from our servers.
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
