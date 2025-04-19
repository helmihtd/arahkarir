import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Sign Up | ArahKarir",
  description: "Create your ArahKarir account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
                <p className="text-gray-600 mt-1">Join ArahKarir to explore and plan your career journey</p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" required />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>

                  {/* Birth Date */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Birth Date</Label>
                    <Input id="birthDate" type="date" required />
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup defaultValue="male" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="cursor-pointer">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="cursor-pointer">
                          Female
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="cursor-pointer">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Current Profession */}
                  <div className="space-y-2">
                    <Label htmlFor="profession">Current Profession</Label>
                    <Select>
                      <SelectTrigger id="profession">
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="software-engineer">Software Engineer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="marketing">Marketing Professional</SelectItem>
                        <SelectItem value="finance">Finance Professional</SelectItem>
                        <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                        <SelectItem value="education">Education Professional</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                    <p className="text-xs text-gray-500">
                      Must be at least 8 characters with a number and a special character
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" required />
                  </div>
                </div>

                {/* Terms and Privacy */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" required />
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                      I agree to the{" "}
                      <Link href="/terms" className="text-indigo-600 hover:text-indigo-800">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="newsletter" className="mt-1" />
                    <label htmlFor="newsletter" className="text-sm text-gray-600 leading-tight">
                      I want to receive emails about career opportunities, tips, and updates
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>

              <p className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
