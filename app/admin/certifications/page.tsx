"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, FileEdit, Trash2, CheckCircle2, Award, Building } from "lucide-react"
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

// Mock data for certifications
const certifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    category: "Cloud Computing",
    difficulty: "Advanced",
    validity: "3 years",
    status: "Active",
  },
  {
    id: 2,
    name: "Certified Information Systems Security Professional (CISSP)",
    provider: "ISC²",
    category: "Cybersecurity",
    difficulty: "Expert",
    validity: "3 years",
    status: "Active",
  },
  {
    id: 3,
    name: "Project Management Professional (PMP)",
    provider: "Project Management Institute",
    category: "Project Management",
    difficulty: "Intermediate",
    validity: "3 years",
    status: "Active",
  },
  {
    id: 4,
    name: "Google Professional Data Engineer",
    provider: "Google Cloud",
    category: "Data Engineering",
    difficulty: "Advanced",
    validity: "2 years",
    status: "Active",
  },
  {
    id: 5,
    name: "Certified ScrumMaster (CSM)",
    provider: "Scrum Alliance",
    category: "Agile & Scrum",
    difficulty: "Beginner",
    validity: "2 years",
    status: "Active",
  },
]

export default function CertificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  const filteredCerts = certifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSelectedCert(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the certification here
    console.log(`Deleting certification with ID: ${selectedCert}`)
    setDeleteDialogOpen(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-50 text-green-700 border-green-200"
      case "Intermediate":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Advanced":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Expert":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">Manage professional certifications and credentials</p>
        </div>
        <Button asChild>
          <Link href="/admin/certifications/new">
            <Plus className="mr-2 h-4 w-4" /> Add Certification
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Certifications</CardTitle>
          <CardDescription>A list of all professional certifications in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search certifications..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cloud">Cloud Computing</SelectItem>
                  <SelectItem value="security">Cybersecurity</SelectItem>
                  <SelectItem value="project">Project Management</SelectItem>
                  <SelectItem value="data">Data Engineering</SelectItem>
                  <SelectItem value="agile">Agile & Scrum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certification Name</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCerts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No certifications found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCerts.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-2 text-indigo-500" />
                          {cert.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1 text-gray-500" />
                          {cert.provider}
                        </div>
                      </TableCell>
                      <TableCell>{cert.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getDifficultyColor(cert.difficulty)}>
                          {cert.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{cert.validity}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/certifications/${cert.id}`}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(cert.id)}
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
            Showing <strong>{filteredCerts.length}</strong> of <strong>{certifications.length}</strong> certifications
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this certification?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the certification and remove it from our
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
