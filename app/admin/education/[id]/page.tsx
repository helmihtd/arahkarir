"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// Mock education data
const mockEducation = {
  id: "1",
  name: "Computer Science",
  type: "degree",
  level: "bachelor",
  institution: "University of Technology",
  description: "A comprehensive program covering algorithms, data structures, software engineering, and more.",
  duration: "4 years",
}

export default function EditEducationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [level, setLevel] = useState("")
  const [institution, setInstitution] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the education data from an API
    const fetchEducation = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

        // Use mock data for now
        setName(mockEducation.name)
        setType(mockEducation.type)
        setLevel(mockEducation.level)
        setInstitution(mockEducation.institution)
        setDescription(mockEducation.description)
        setDuration(mockEducation.duration)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load education data.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEducation()
  }, [id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would call an API to update the education
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Education updated",
        description: "The education has been successfully updated.",
      })

      router.push("/admin/education")
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the education.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Edit Education</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Education Details</CardTitle>
            <CardDescription>Edit the education path or qualification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degree">Degree</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={level} onValueChange={setLevel} required>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate</SelectItem>
                    <SelectItem value="bachelor">Bachelor's</SelectItem>
                    <SelectItem value="master">Master's</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/education")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Education
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
