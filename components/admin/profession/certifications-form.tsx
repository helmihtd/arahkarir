"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface CertificationItem {
  id: string
  name: string
  provider: string
  level: string
}

export default function ProfessionCertificationsForm() {
  const [certifications, setCertifications] = useState<CertificationItem[]>([
    {
      id: "1",
      name: "",
      provider: "",
      level: "",
    },
  ])

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: Date.now().toString(),
        name: "",
        provider: "",
        level: "",
      },
    ])
  }

  const removeCertification = (id: string) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((item) => item.id !== id))
    }
  }

  const updateCertification = (id: string, field: string, value: string) => {
    setCertifications(certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Recommended Certifications</h2>
        <p className="text-sm text-gray-500">Add certifications that are valuable for this profession.</p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <Card key={cert.id}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-medium">Certification {index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                onClick={() => removeCertification(cert.id)}
                disabled={certifications.length === 1}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
                <Input
                  id={`cert-name-${cert.id}`}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`cert-provider-${cert.id}`}>Provider</Label>
                <Input
                  id={`cert-provider-${cert.id}`}
                  placeholder="e.g. Amazon Web Services, Microsoft"
                  value={cert.provider}
                  onChange={(e) => updateCertification(cert.id, "provider", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor={`cert-level-${cert.id}`}>Level</Label>
                <Select value={cert.level} onValueChange={(value) => updateCertification(cert.id, "level", value)}>
                  <SelectTrigger id={`cert-level-${cert.id}`}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Associate">Associate</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button variant="outline" className="w-full" onClick={addCertification}>
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>
    </div>
  )
}
