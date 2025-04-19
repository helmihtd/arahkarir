import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BenefitCard from "@/components/benefit-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-indigo-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">Discover Your Ideal Career Path</h1>
                <p className="text-lg md:text-xl opacity-90">
                  Explore detailed information about professions, requirements, and career paths to make informed
                  decisions about your future.
                </p>
                <div className="relative max-w-md">
                  <form action="/search" className="relative">
                    <Input
                      type="text"
                      name="query"
                      placeholder="Search for a profession or career..."
                      className="pl-4 pr-12 py-6 w-full rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/50"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-1 top-1 h-10 w-10 rounded-full bg-white text-indigo-700 hover:bg-white/90"
                    >
                      <SearchIcon className="h-5 w-5" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </form>
                </div>
                <p className="text-sm opacity-75">Popular: Software Engineer, Doctor, Data Scientist, Teacher</p>
              </div>
              <div className="hidden md:block">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Career exploration illustration"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">500+</p>
                <p className="text-gray-600">Professions</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">10k+</p>
                <p className="text-gray-600">Career Paths</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">250+</p>
                <p className="text-gray-600">Industries</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">50k+</p>
                <p className="text-gray-600">Users</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose ArahKarir</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the benefits of using our platform to explore and plan your career journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <BenefitCard
                icon="Lightbulb"
                title="Comprehensive Information"
                description="Get detailed insights about professions, including requirements, skills, and salary information."
              />
              <BenefitCard
                icon="Route"
                title="Career Path Mapping"
                description="Visualize potential career paths and understand how to progress in your chosen field."
              />
              <BenefitCard
                icon="GraduationCap"
                title="Education Guidance"
                description="Learn about the educational requirements and certifications needed for your dream career."
              />
              <BenefitCard
                icon="Building"
                title="Company Insights"
                description="Discover companies that hire for your target profession and what they look for in candidates."
              />
              <BenefitCard
                icon="Users"
                title="Community Connection"
                description="Connect with professionals and pages to follow for continuous learning and networking."
              />
              <BenefitCard
                icon="TrendingUp"
                title="Salary Transparency"
                description="Access up-to-date salary information to make informed decisions about your career."
              />
            </div>
          </div>
        </section>

        {/* Featured Professions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Explore Popular Professions</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover detailed information about these in-demand careers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Software Engineer",
                "Data Scientist",
                "UX Designer",
                "Digital Marketer",
                "Financial Analyst",
                "Healthcare Administrator",
              ].map((profession, index) => (
                <Link
                  href={`/profession/${profession.toLowerCase().replace(/\s+/g, "-")}`}
                  key={index}
                  className="group block p-6 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors border border-gray-200 hover:border-indigo-200"
                >
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700">{profession}</h3>
                  <p className="mt-2 text-gray-600">Explore career path, skills, and opportunities</p>
                  <div className="mt-4 text-indigo-600 font-medium group-hover:underline">Learn more →</div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link href="/search">View All Professions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Ideal Career?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Create an account to save professions, track your career path, and get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-white/90">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
