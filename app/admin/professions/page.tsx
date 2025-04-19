"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, Search, Edit, Trash2, Eye, Filter, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

// Mock data for professions
const mockProfessions = [
  {
    id: 1,
    title: "Software Engineer",
    category: "Technology",
    status: "Published",
    lastUpdated: "2023-10-15",
  },
  {
    id: 2,
    title: "Data Scientist",
    category: "Technology",
    status: "Published",
    lastUpdated: "2023-10-12",
  },
  {
    id: 3,
    title: "UX Designer",
    category: "Design",
    status: "Published",
    lastUpdated: "2023-10-10",
  },
  {
    id: 4,
    title: "Marketing Manager",
    category: "Marketing",
    status: "Draft",
    lastUpdated: "2023-10-08",
  },
  {
    id: 5,
    title: "Financial Analyst",
    category: "Finance",
    status: "Published",
    lastUpdated: "2023-10-05",
  },
  {
    id: 6,
    title: "Product Manager",
    category: "Product",
    status: "Published",
    lastUpdated: "2023-10-03",
  },
  {
    id: 7,
    title: "HR Specialist",
    category: "Human Resources",
    status: "Draft",
    lastUpdated: "2023-09-28",
  },
  {
    id: 8,
    title: "Content Writer",
    category: "Content",
    status: "Published",
    lastUpdated: "2023-09-25",
  },
  {
    id: 9,
    title: "Sales Representative",
    category: "Sales",
    status: "Published",
    lastUpdated: "2023-09-20",
  },
  {
    id: 10,
    title: "Graphic Designer",
    category: "Design",
    status: "Draft",
    lastUpdated: "2023-09-18",
  },
]

export default function ProfessionsPage() {
  const [professions, setProfessions] = useState(mockProfessions)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [professionToDelete, setProfessionToDelete] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    // Simulate API call to fetch professions
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProfessions(mockProfessions)
      } catch (error) {
        console.error("Error fetching professions:", error)
        toast({
          title: "Error",
          description: "Failed to load professions. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDeleteClick = (id: number) => {
    setProfessionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (professionToDelete === null) return

    // Simulate API call to delete profession
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProfessions(professions.filter((p) => p.id !== professionToDelete))
      toast({
        title: "Profession deleted",
        description: "The profession has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting profession:", error)
      toast({
        title: "Error",
        description: "Failed to delete profession. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setProfessionToDelete(null)
    }
  }

  // Filter professions based on search query, category, and status
  const filteredProfessions = professions.filter((profession) => {
    const matchesSearch =
      profession.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profession.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || profession.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || profession.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredProfessions.length / itemsPerPage)
  const paginatedProfessions = filteredProfessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Professions</h1>
        <Button asChild>
          <Link href="/admin/professions/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Profession
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search professions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="human resources">Human Resources</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Professions Table */}
      <div className="border rounded-md">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-gray-500">Loading professions...</p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProfessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No professions found. Try adjusting your filters or add a new profession.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProfessions.map((profession) => (
                  <TableRow key={profession.id}>
                    <TableCell className="font-medium">{profession.title}</TableCell>
                    <TableCell>{profession.category}</TableCell>
                    <TableCell>
                      <Badge variant={profession.status === "Published" ? "default" : "secondary"}>
                        {profession.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{profession.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/profession/${profession.id}`} target="_blank">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/professions/${profession.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteClick(profession.id)}
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
        )}
      </div>

      {/* Pagination */}
      {!isLoading && filteredProfessions.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredProfessions.length)}</span> of{" "}
            <span className="font-medium">{filteredProfessions.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the profession and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
