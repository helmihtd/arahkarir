"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { ProfessionFormProvider } from "@/components/admin/profession/profession-form-context"
import ProfessionBasicForm from "@/components/admin/profession/basic-form"
import ProfessionEducationForm from "@/components/admin/profession/education-form"
import ProfessionSkillsForm from "@/components/admin/profession/skills-form"
import ProfessionCareerPathForm from "@/components/admin/profession/career-path-form"
import ProfessionSalaryForm from "@/components/admin/profession/salary-form"
import ProfessionCertificationsForm from "@/components/admin/profession/certifications-form"
import ProfessionPeopleForm from "@/components/admin/profession/people-form"
import ProfessionCompaniesForm from "@/components/admin/profession/companies-form"
import ProfessionSimilarForm from "@/components/admin/profession/similar-form"
import ProfessionImagesForm from "@/components/admin/profession/images-form"

// Mock data for testing
const mockProfessionData = {
  title: "Software Engineer",
  category: "technology",
  description: "Design, develop, and maintain software systems and applications.",
  longDescription:
    "Software engineers are responsible for developing and maintaining software applications and systems. They analyze user needs, design software solutions, write and test code, and ensure software quality and performance.",
  education: [
    {
      id: "1",
      level: "Bachelor's Degree",
      field: "Computer Science, Software Engineering, or related field",
      description:
        "A bachelor's degree provides fundamental knowledge in programming, algorithms, data structures, and software design principles.",
    },
    {
      id: "2",
      level: "Master's Degree (Optional)",
      field: "Computer Science, Software Engineering, or specialized field",
      description:
        "A master's degree can provide advanced knowledge and specialization in areas such as artificial intelligence, cybersecurity, or data science.",
    },
  ],
  salary: {
    entry: "$70,000 - $90,000",
    mid: "$90,000 - $120,000",
    senior: "$120,000 - $150,000+",
    average: "$105,000",
    currency: "USD",
  },
  status: "published",
}

export default function EditProfessionPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [professionData, setProfessionData] = useState(mockProfessionData)
  const router = useRouter()

  useEffect(() => {
    // Simulate API call to fetch profession data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProfessionData(mockProfessionData)
      } catch (error) {
        console.error("Error fetching profession data:", error)
        toast({
          title: "Error",
          description: "Failed to load profession data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleSave = async (status: "draft" | "published") => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)

    toast({
      title: status === "published" ? "Profession published" : "Draft saved",
      description: "Your changes have been saved successfully.",
    })

    // Redirect to professions list
    router.push("/admin/professions")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-500">Loading profession data...</p>
        </div>
      </div>
    )
  }

  return (
    <ProfessionFormProvider initialData={professionData} professionId={params.id}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/professions">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Edit Profession</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save as Draft
            </Button>
            <Button onClick={() => handleSave("published")} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex min-w-max h-auto">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="career"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Career Path
              </TabsTrigger>
              <TabsTrigger
                value="salary"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Salary
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Certifications
              </TabsTrigger>
              <TabsTrigger
                value="people"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                People
              </TabsTrigger>
              <TabsTrigger
                value="companies"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Companies
              </TabsTrigger>
              <TabsTrigger
                value="similar"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Similar
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
              >
                Images
              </TabsTrigger>
            </TabsList>
          </div>

          <Card>
            <CardContent className="pt-6">
              <TabsContent value="basic">
                <ProfessionBasicForm />
              </TabsContent>

              <TabsContent value="education">
                <ProfessionEducationForm />
              </TabsContent>

              <TabsContent value="skills">
                <ProfessionSkillsForm />
              </TabsContent>

              <TabsContent value="career">
                <ProfessionCareerPathForm />
              </TabsContent>

              <TabsContent value="salary">
                <ProfessionSalaryForm />
              </TabsContent>

              <TabsContent value="certifications">
                <ProfessionCertificationsForm />
              </TabsContent>

              <TabsContent value="people">
                <ProfessionPeopleForm />
              </TabsContent>

              <TabsContent value="companies">
                <ProfessionCompaniesForm />
              </TabsContent>

              <TabsContent value="similar">
                <ProfessionSimilarForm />
              </TabsContent>

              <TabsContent value="images">
                <ProfessionImagesForm />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save as Draft
          </Button>
          <Button onClick={() => handleSave("published")} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update
          </Button>
        </div>
      </div>
    </ProfessionFormProvider>
  )
}
