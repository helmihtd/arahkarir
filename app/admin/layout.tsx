"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Handle window resize to auto-close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"
        }`}
      >
        <AdminSidebar collapsed={!sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar mobile onClose={() => setMobileOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}>
        <div className="flex flex-col min-h-screen">
          {/* Top Navigation */}
          <header className="sticky top-0 z-30 bg-white border-b h-16 flex items-center px-6 shadow-sm">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="lg:hidden mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hidden lg:flex"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-700">A</span>
                    </div>
                    <span className="hidden md:inline-block">Admin User</span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6">{children}</main>

          {/* Footer */}
          <footer className="border-t py-4 px-6">
            <div className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ArahKarir Admin Dashboard
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
