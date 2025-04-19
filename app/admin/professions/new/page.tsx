"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useState } from "react"
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

export default function NewProfessionPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

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

  return (
    <ProfessionFormProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/professions">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Add New Profession</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save as Draft
            </Button>
            <Button onClick={() => handleSave("published")} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish
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
            Publish
          </Button>
        </div>
      </div>
    </ProfessionFormProvider>
  )
}
