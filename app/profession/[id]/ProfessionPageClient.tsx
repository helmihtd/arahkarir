"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  BookOpen,
  Briefcase,
  Building,
  BadgeIcon as Certificate,
  ChevronRight,
  GraduationCap,
  Heart,
  Share2,
  Star,
  PenToolIcon as Tool,
  TrendingUp,
  Users,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProfessionNav from "@/components/profession-nav"

// Mock data for profession details
const professionData = {
  id: 1,
  title: "Software Engineer",
  category: "Technology",
  description:
    "Software engineers design, develop, and maintain software systems and applications. They work across various industries to create solutions that meet user needs and business requirements.",
  longDescription:
    "Software engineers are responsible for developing and maintaining software applications and systems. They analyze user needs, design software solutions, write and test code, and ensure software quality and performance. Software engineers often work in teams and collaborate with other professionals such as product managers, designers, and quality assurance specialists. They need to stay updated with the latest technologies and programming languages to remain competitive in the field.",
  salary: {
    entry: "$70,000 - $90,000",
    mid: "$90,000 - $120,000",
    senior: "$120,000 - $150,000+",
    average: "$105,000",
  },
  education: [
    {
      level: "Bachelor's Degree",
      field: "Computer Science, Software Engineering, or related field",
      description:
        "A bachelor's degree provides fundamental knowledge in programming, algorithms, data structures, and software design principles.",
    },
    {
      level: "Master's Degree (Optional)",
      field: "Computer Science, Software Engineering, or specialized field",
      description:
        "A master's degree can provide advanced knowledge and specialization in areas such as artificial intelligence, cybersecurity, or data science.",
    },
    {
      level: "Bootcamps (Alternative)",
      field: "Software Development, Web Development",
      description:
        "Coding bootcamps offer intensive, short-term training programs focused on practical skills needed for entry-level positions.",
    },
  ],
  skills: [
    {
      name: "Programming Languages",
      description:
        "Proficiency in languages such as JavaScript, Python, Java, C++, or others depending on specialization.",
    },
    {
      name: "Data Structures & Algorithms",
      description: "Understanding of fundamental data structures and algorithms for efficient problem-solving.",
    },
    {
      name: "Software Design",
      description: "Knowledge of design patterns, architecture principles, and system design.",
    },
    {
      name: "Version Control",
      description: "Experience with Git or other version control systems for collaborative development.",
    },
    {
      name: "Testing & Debugging",
      description: "Skills in writing tests, debugging code, and ensuring software quality.",
    },
    {
      name: "Problem Solving",
      description: "Strong analytical and problem-solving abilities to address complex technical challenges.",
    },
    {
      name: "Communication",
      description:
        "Ability to communicate technical concepts clearly to both technical and non-technical stakeholders.",
    },
    {
      name: "Continuous Learning",
      description: "Commitment to staying updated with new technologies and industry trends.",
    },
  ],
  tools: [
    { name: "IDEs", examples: "Visual Studio Code, IntelliJ IDEA, Eclipse" },
    { name: "Version Control", examples: "Git, GitHub, GitLab, Bitbucket" },
    { name: "Project Management", examples: "Jira, Trello, Asana" },
    { name: "CI/CD Tools", examples: "Jenkins, CircleCI, GitHub Actions" },
    { name: "Containerization", examples: "Docker, Kubernetes" },
    { name: "Cloud Platforms", examples: "AWS, Azure, Google Cloud" },
  ],
  careerPath: [
    {
      title: "Junior Software Engineer",
      years: "0-2 years",
      description:
        "Entry-level position focusing on learning and implementing basic programming tasks under supervision.",
    },
    {
      title: "Software Engineer",
      years: "2-5 years",
      description: "Independently handling programming tasks and contributing to project design and implementation.",
    },
    {
      title: "Senior Software Engineer",
      years: "5-8 years",
      description: "Leading development efforts, mentoring junior engineers, and making architectural decisions.",
    },
    {
      title: "Lead Engineer / Tech Lead",
      years: "8-12 years",
      description: "Managing a team of engineers, overseeing technical direction, and ensuring project success.",
    },
    {
      title: "Software Architect",
      years: "10-15+ years",
      description:
        "Designing system architecture, making high-level technical decisions, and setting technical standards.",
    },
    {
      title: "Engineering Manager / Director",
      years: "12+ years",
      description:
        "Managing multiple teams, setting department strategy, and aligning technical goals with business objectives.",
    },
    {
      title: "CTO",
      years: "15+ years",
      description: "Executive role responsible for the overall technical vision and strategy of the organization.",
    },
  ],
  alternativePaths: [
    { title: "DevOps Engineer", description: "Focus on deployment, automation, and infrastructure management." },
    {
      title: "Quality Assurance Engineer",
      description: "Specialize in testing, quality control, and ensuring software reliability.",
    },
    {
      title: "Product Manager",
      description: "Transition to a role that bridges technical and business aspects of product development.",
    },
    {
      title: "Data Scientist",
      description: "Leverage programming skills to analyze data and build predictive models.",
    },
    {
      title: "Technical Writer",
      description: "Create documentation, tutorials, and technical content for software products.",
    },
  ],
  certifications: [
    { name: "AWS Certified Developer", provider: "Amazon Web Services", level: "Associate" },
    { name: "Microsoft Certified: Azure Developer Associate", provider: "Microsoft", level: "Associate" },
    { name: "Google Associate Cloud Engineer", provider: "Google Cloud", level: "Associate" },
    {
      name: "Certified Kubernetes Application Developer (CKAD)",
      provider: "Cloud Native Computing Foundation",
      level: "Professional",
    },
    { name: "Oracle Certified Professional: Java SE Programmer", provider: "Oracle", level: "Professional" },
  ],
  peopleToFollow: [
    { name: "Martin Fowler", platform: "Twitter/X", handle: "@martinfowler", expertise: "Software Design" },
    { name: "Kent C. Dodds", platform: "Twitter/X", handle: "@kentcdodds", expertise: "JavaScript, React" },
    { name: "Kelsey Hightower", platform: "Twitter/X", handle: "@kelseyhightower", expertise: "Kubernetes, Cloud" },
    { name: "Sarah Drasner", platform: "Twitter/X", handle: "@sarah_edo", expertise: "Web Development, Vue.js" },
    { name: "The Pragmatic Engineer", platform: "Substack", handle: "Gergely Orosz", expertise: "Engineering Career" },
  ],
  companies: [
    { name: "Google", industry: "Technology", size: "Large" },
    { name: "Microsoft", industry: "Technology", size: "Large" },
    { name: "Amazon", industry: "Technology/E-commerce", size: "Large" },
    { name: "Stripe", industry: "Financial Technology", size: "Medium" },
    { name: "Shopify", industry: "E-commerce", size: "Medium" },
    { name: "Atlassian", industry: "Software", size: "Medium" },
    { name: "Startups", industry: "Various", size: "Small" },
  ],
  similarProfessions: [
    {
      title: "Front-End Developer",
      similarity: "High",
      description: "Specializes in building user interfaces and client-side functionality.",
    },
    {
      title: "Back-End Developer",
      similarity: "High",
      description: "Focuses on server-side logic, databases, and application architecture.",
    },
    {
      title: "Full-Stack Developer",
      similarity: "Very High",
      description: "Works on both front-end and back-end aspects of software development.",
    },
    {
      title: "Mobile App Developer",
      similarity: "Medium",
      description: "Creates applications specifically for mobile devices.",
    },
    { title: "Game Developer", similarity: "Medium", description: "Develops video games for various platforms." },
    {
      title: "DevOps Engineer",
      similarity: "Medium",
      description: "Manages deployment, infrastructure, and operational aspects of software.",
    },
  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
}

export default function ProfessionPageClient({ params }: { params: { id: string } }) {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-indigo-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <Link href="/search" className="text-gray-500 hover:text-indigo-600">
              Professions
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <span className="text-gray-900 font-medium">{professionData.title}</span>
          </div>
          {/* Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                    {professionData.category}
                  </span>
                  <span className="text-yellow-500 flex items-center">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                    <span className="ml-1 text-gray-600 text-sm">(4.2)</span>
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{professionData.title}</h1>
                <p className="text-gray-600 max-w-3xl">{professionData.description}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </div>
          {/* Image Gallery */}
          <div className="mb-8">
            <Carousel className="w-full">
              <CarouselContent>
                {professionData.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${professionData.title} - Image ${index + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-[400px] object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sticky Navigation */}
            <div className="md:w-64 lg:w-72 shrink-0">
              <div className="sticky top-20">
                <ProfessionNav />
              </div>
            </div>
            {/* Main Content Column */}
            <div className="flex-1 space-y-8">
              {/* About Section */}
              <section id="about" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">About This Profession</h2>
                </div>
                <p className="text-gray-700 mb-4">{professionData.longDescription}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-1">Average Salary</h3>
                    <p className="text-indigo-700 font-bold">{professionData.salary.average}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-1">Category</h3>
                    <p className="text-indigo-700 font-bold">{professionData.category}</p>
                  </div>
                </div>
              </section>

              {/* Education Requirements */}
              <section id="education" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Education Requirements</h2>
                </div>
                <div className="space-y-6">
                  {professionData.education.map((edu, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-lg">{edu.level}</h3>
                      <p className="text-indigo-700 font-medium mb-2">{edu.field}</p>
                      <p className="text-gray-600">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills & Tools */}
              <section id="skills" className="bg-white rounded-lg border border-gray-200 p-6">
                <Tabs defaultValue="skills">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Tool className="h-5 w-5 text-indigo-600" />
                      <h2 className="text-xl font-bold">Required Skills & Tools</h2>
                    </div>
                    <TabsList>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="tools">Tools</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="skills" className="space-y-4">
                    {professionData.skills.map((skill, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <p className="text-gray-600 text-sm">{skill.description}</p>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="tools" className="space-y-4">
                    {professionData.tools.map((tool, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <p className="text-gray-600 text-sm">{tool.examples}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </section>

              {/* Career Path */}
              <section id="career-path" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Career Path</h2>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>

                  {/* Timeline items */}
                  <div className="space-y-8">
                    {professionData.careerPath.map((step, index) => (
                      <div key={index} className="relative pl-12">
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-indigo-700">{index + 1}</span>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                            <h3 className="font-bold text-lg">{step.title}</h3>
                            <span className="text-sm text-indigo-600 font-medium">{step.years}</span>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Alternative Career Paths */}
              <section id="alternative-paths" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Alternative Career Paths</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  If you have skills and experience in this field, you might also consider these related professions:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {professionData.alternativePaths.map((path, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                    >
                      <h3 className="font-semibold mb-1">{path.title}</h3>
                      <p className="text-gray-600 text-sm">{path.description}</p>
                      <Link
                        href={`/profession/${path.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-indigo-600 text-sm font-medium mt-2 inline-block hover:underline"
                      >
                        Learn more →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Salary Information */}
              <section id="salary" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Salary Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm text-gray-500">Entry Level</h3>
                    <p className="font-semibold text-lg">{professionData.salary.entry}</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm text-gray-500">Mid-Level</h3>
                    <p className="font-semibold text-lg">{professionData.salary.mid}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Senior Level</h3>
                    <p className="font-semibold text-lg">{professionData.salary.senior}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="text-sm text-gray-500">Average Salary</h3>
                  <p className="font-bold text-xl text-indigo-700">{professionData.salary.average}</p>
                </div>
              </section>

              {/* Recommended Certifications */}
              <section id="certifications" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Certificate className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Recommended Certifications</h2>
                </div>

                <div className="space-y-4">
                  {professionData.certifications.map((cert, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                      <h3 className="font-medium">{cert.name}</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{cert.provider}</span>
                        <span className="text-indigo-600">{cert.level}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Certifications
                </Button>
              </section>

              {/* People/Pages to Follow */}
              <section id="people" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">People to Follow</h2>
                </div>

                <div className="space-y-4">
                  {professionData.peopleToFollow.map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{person.name}</h3>
                        <div className="flex text-sm">
                          <span className="text-gray-600">{person.platform}: </span>
                          <span className="text-indigo-600 ml-1">{person.handle}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Companies */}
              <section id="companies" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Related Companies</h2>
                </div>

                <div className="space-y-3">
                  {professionData.companies.map((company, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                    >
                      <span className="font-medium">{company.name}</span>
                      <span className="text-sm text-gray-600">{company.industry}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Companies
                </Button>
              </section>

              {/* Similar Professions */}
              <section id="similar" className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-bold">Similar Professions</h2>
                </div>

                <div className="space-y-3">
                  {professionData.similarProfessions.map((profession, index) => (
                    <Link
                      key={index}
                      href={`/profession/${profession.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0 hover:text-indigo-700"
                    >
                      <span className="font-medium">{profession.title}</span>
                      <div className="flex items-center">
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                          {profession.similarity}
                        </span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>{" "}
            {/* Close the main content column */}
          </div>{" "}
          {/* Close the flex container */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
