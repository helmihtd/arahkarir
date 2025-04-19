"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProfessionForm } from "./profession-form-context"

export default function ProfessionSalaryForm() {
  const { formData, updateSalary } = useProfessionForm()
  const { salary } = formData

  const handleChange = (field: string, value: string) => {
    updateSalary(field, value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Salary Information</h2>
        <p className="text-sm text-gray-500">Enter salary ranges for different experience levels.</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Salary Ranges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="currency">Currency</Label>
            <Select value={salary.currency} onValueChange={(value) => handleChange("currency", value)}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="CAD">CAD (C$)</SelectItem>
                <SelectItem value="AUD">AUD (A$)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="entry">Entry Level Salary Range</Label>
            <Input
              id="entry"
              placeholder="e.g. $50,000 - $70,000"
              value={salary.entry}
              onChange={(e) => handleChange("entry", e.target.value)}
            />
            <p className="text-xs text-gray-500">Typical salary range for 0-2 years of experience</p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mid">Mid-Level Salary Range</Label>
            <Input
              id="mid"
              placeholder="e.g. $70,000 - $100,000"
              value={salary.mid}
              onChange={(e) => handleChange("mid", e.target.value)}
            />
            <p className="text-xs text-gray-500">Typical salary range for 3-5 years of experience</p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="senior">Senior Level Salary Range</Label>
            <Input
              id="senior"
              placeholder="e.g. $100,000 - $150,000+"
              value={salary.senior}
              onChange={(e) => handleChange("senior", e.target.value)}
            />
            <p className="text-xs text-gray-500">Typical salary range for 6+ years of experience</p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="average">Average Salary</Label>
            <Input
              id="average"
              placeholder="e.g. $85,000"
              value={salary.average}
              onChange={(e) => handleChange("average", e.target.value)}
            />
            <p className="text-xs text-gray-500">Overall average salary for this profession</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
