import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, GraduationCap, Building, TrendingUp, BadgeCheck, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  // Mock statistics for the dashboard
  const stats = [
    {
      title: "Total Professions",
      value: "156",
      change: "+12% from last month",
      icon: <Briefcase className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Users",
      value: "2,845",
      change: "+18% from last month",
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Education Paths",
      value: "89",
      change: "+5% from last month",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Companies",
      value: "324",
      change: "+8% from last month",
      icon: <Building className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-700",
    },
  ]

  // Mock recent activities
  const recentActivities = [
    {
      action: "Added new profession",
      item: "UX Researcher",
      user: "Admin User",
      time: "2 hours ago",
    },
    {
      action: "Updated career path",
      item: "Software Engineer",
      user: "Admin User",
      time: "5 hours ago",
    },
    {
      action: "Added new certification",
      item: "Google Cloud Professional Architect",
      user: "Content Manager",
      time: "Yesterday",
    },
    {
      action: "Updated salary information",
      item: "Data Scientist",
      user: "Admin User",
      time: "2 days ago",
    },
    {
      action: "Added new company",
      item: "TechCorp Inc.",
      user: "Content Manager",
      time: "3 days ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last updated: Today, 10:30 AM</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.color} p-2 rounded-full`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/professions/new">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Add New Profession</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/career-paths">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Manage Career Paths</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/certifications">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Manage Certifications</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <BadgeCheck className="h-8 w-8 text-indigo-600" />
              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/companies">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Manage Companies</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Building className="h-8 w-8 text-indigo-600" />
              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions performed in the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-gray-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {activity.action}: <span className="text-indigo-600">{activity.item}</span>
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{activity.user}</span>
                    <span className="mx-1">•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
