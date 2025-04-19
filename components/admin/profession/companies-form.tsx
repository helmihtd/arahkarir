"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface CompanyItem {
  id: string
  name: string
  industry: string
  size: string
}

export default function ProfessionCompaniesForm() {
  const [companies, setCompanies] = useState<CompanyItem[]>([
    {
      id: "1",
      name: "",
      industry: "",
      size: "",
    },
  ])

  const addCompany = () => {
    setCompanies([
      ...companies,
      {
        id: Date.now().toString(),
        name: "",
        industry: "",
        size: "",
      },
    ])
  }

  const removeCompany = (id: string) => {
    if (companies.length > 1) {
      setCompanies(companies.filter((item) => item.id !== id))
    }
  }

  const updateCompany = (id: string, field: string, value: string) => {
    setCompanies(companies.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Related Companies</h2>
        <p className="text-sm text-gray-500">Add companies that typically hire professionals in this field.</p>
      </div>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <Card key={company.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Company {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                onClick={() => removeCompany(company.id)}
                disabled={companies.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor={`company-name-${company.id}`}>Company Name</Label>
                <Input
                  id={`company-name-${company.id}`}
                  placeholder="e.g. Google, Microsoft, Acme Inc."
                  value={company.name}
                  onChange={(e) => updateCompany(company.id, "name", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`company-industry-${company.id}`}>Industry</Label>
                <Input
                  id={`company-industry-${company.id}`}
                  placeholder="e.g. Technology, Healthcare, Finance"
                  value={company.industry}
                  onChange={(e) => updateCompany(company.id, "industry", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`company-size-${company.id}`}>Company Size</Label>
                <Select value={company.size} onValueChange={(value) => updateCompany(company.id, "size", value)}>
                  <SelectTrigger id={`company-size-${company.id}`}>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small (1-50 employees)</SelectItem>
                    <SelectItem value="Medium">Medium (51-500 employees)</SelectItem>
                    <SelectItem value="Large">Large (501+ employees)</SelectItem>
                    <SelectItem value="Enterprise">Enterprise (1000+ employees)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full" onClick={addCompany}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>
    </div>
  )
}
