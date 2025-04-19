import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchIcon, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Search Results | ArahKarir",
  description: "Find your ideal profession and career path",
}

// Mock data for search results
const mockProfessions = [
  {
    id: 1,
    title: "Software Engineer",
    category: "Technology",
    salary: "$70,000 - $150,000",
    education: "Bachelor's Degree",
    description: "Design, develop, and maintain software systems and applications.",
    skills: ["JavaScript", "Python", "Problem Solving", "Algorithms"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Data Scientist",
    category: "Technology",
    salary: "$80,000 - $160,000",
    education: "Master's Degree",
    description: "Analyze and interpret complex data to help guide business decisions.",
    skills: ["Python", "Statistics", "Machine Learning", "SQL"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "UX Designer",
    category: "Design",
    salary: "$60,000 - $130,000",
    education: "Bachelor's Degree",
    description: "Create meaningful and relevant experiences for users interacting with products.",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Marketing Manager",
    category: "Marketing",
    salary: "$65,000 - $120,000",
    education: "Bachelor's Degree",
    description: "Develop and implement marketing strategies to promote products or services.",
    skills: ["Digital Marketing", "Campaign Management", "Analytics", "Communication"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Financial Analyst",
    category: "Finance",
    salary: "$60,000 - $110,000",
    education: "Bachelor's Degree",
    description: "Analyze financial data and provide insights to guide investment decisions.",
    skills: ["Financial Modeling", "Excel", "Data Analysis", "Reporting"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Registered Nurse",
    category: "Healthcare",
    salary: "$65,000 - $110,000",
    education: "Bachelor's Degree",
    description: "Provide and coordinate patient care in various healthcare settings.",
    skills: ["Patient Care", "Medical Knowledge", "Critical Thinking", "Communication"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || ""

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {query ? `Search Results for "${query}"` : "Explore Professions"}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <form action="/search" className="relative">
                  <Input
                    type="text"
                    name="query"
                    placeholder="Search for a profession or career..."
                    defaultValue={query}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Education Level */}
                <div>
                  <label className="block text-sm font-medium mb-2">Education Level</label>
                  <div className="space-y-2">
                    {["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "PhD"].map(
                      (level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`edu-${level}`} />
                          <label htmlFor={`edu-${level}`} className="text-sm">
                            {level}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">Salary Range</label>
                  <div className="px-2">
                    <Slider defaultValue={[50000, 150000]} min={0} max={300000} step={5000} />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>$0</span>
                      <span>$300k+</span>
                    </div>
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior", "Executive"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox id={`exp-${level}`} />
                        <label htmlFor={`exp-${level}`} className="text-sm">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium mb-2">Skills</label>
                  <div className="space-y-2">
                    {["Programming", "Design", "Communication", "Leadership", "Analysis"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox id={`skill-${skill}`} />
                        <label htmlFor={`skill-${skill}`} className="text-sm">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>

            {/* Search Results */}
            <div className="md:col-span-3 space-y-6">
              {/* Results Count */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing <span className="font-medium">{mockProfessions.length}</span> results
                </p>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {mockProfessions.map((profession) => (
                  <Link
                    href={`/profession/${profession.id}`}
                    key={profession.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={profession.image || "/placeholder.svg"}
                      alt={profession.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{profession.title}</h3>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          {profession.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{profession.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {profession.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {profession.skills.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            +{profession.skills.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-gray-500">Education:</span> {profession.education}
                        </div>
                        <div className="font-medium text-indigo-700">{profession.salary}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm">
                    8
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
