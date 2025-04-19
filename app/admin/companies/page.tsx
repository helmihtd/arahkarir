"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Plus, Search, FileEdit, Trash2, CheckCircle2, Globe, MapPin, Users } from "lucide-react"
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

// Mock data for companies
const companies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    location: "San Francisco, CA",
    size: "Large (1000+ employees)",
    website: "techcorp.com",
    status: "Active",
  },
  {
    id: 2,
    name: "FinanceHub",
    industry: "Finance",
    location: "New York, NY",
    size: "Large (1000+ employees)",
    website: "financehub.com",
    status: "Active",
  },
  {
    id: 3,
    name: "DesignStudio",
    industry: "Design",
    location: "Los Angeles, CA",
    size: "Medium (100-999 employees)",
    website: "designstudio.com",
    status: "Active",
  },
  {
    id: 4,
    name: "HealthPlus",
    industry: "Healthcare",
    location: "Boston, MA",
    size: "Medium (100-999 employees)",
    website: "healthplus.com",
    status: "Active",
  },
  {
    id: 5,
    name: "GreenEnergy",
    industry: "Energy",
    location: "Austin, TX",
    size: "Small (10-99 employees)",
    website: "greenenergy.com",
    status: "Active",
  },
]

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    setSelectedCompany(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would delete the company here
    console.log(`Deleting company with ID: ${selectedCompany}`)
    setDeleteDialogOpen(false)
  }

  const getSizeIcon = (size: string) => {
    if (size.includes("Small")) {
      return <Users className="h-4 w-4 mr-1" />
    } else if (size.includes("Medium")) {
      return <Users className="h-4 w-4 mr-1" />
    } else {
      return <Users className="h-4 w-4 mr-1" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage companies and organizations</p>
        </div>
        <Button asChild>
          <Link href="/admin/companies/new">
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Companies</CardTitle>
          <CardDescription>A list of all companies and organizations in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
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
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No companies found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                            <Building className="h-4 w-4 text-gray-500" />
                          </div>
                          {company.name}
                        </div>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {company.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getSizeIcon(company.size)}
                          {company.size}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-1 text-blue-500" />
                          <a
                            href={`https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {company.website}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/companies/${company.id}`}>
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(company.id)}
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
            Showing <strong>{filteredCompanies.length}</strong> of <strong>{companies.length}</strong> companies
          </div>
        </CardFooter>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this company?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the company and remove it from our servers.
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
