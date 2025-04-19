import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Login | ArahKarir",
  description: "Log in to your ArahKarir account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-600 mt-1">Log in to your ArahKarir account</p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Facebook logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Facebook
                </Button>
              </div>

              <p className="text-center mt-6 text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Sign up
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
