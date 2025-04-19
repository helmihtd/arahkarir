"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Building,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  BadgeCheck,
  TrendingUp,
  PenToolIcon as Tool,
  X,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

interface AdminSidebarProps {
  mobile?: boolean
  collapsed?: boolean
  onToggle?: () => void
  onClose?: () => void
}

export default function AdminSidebar({ mobile = false, collapsed = false, onToggle, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Auto-open submenu based on current path
  useEffect(() => {
    const currentItem = sidebarItems.find(
      (item) => item.submenu?.some((subitem) => pathname === subitem.href) || pathname === item.href,
    )
    if (currentItem?.submenu && !collapsed) {
      setOpenSubmenu(currentItem.title)
    }
  }, [pathname, collapsed])

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Professions",
      href: "/admin/professions",
      icon: <Briefcase className="h-5 w-5" />,
      submenu: [
        { title: "All Professions", href: "/admin/professions" },
        { title: "Add New", href: "/admin/professions/new" },
        { title: "Categories", href: "/admin/professions/categories" },
      ],
    },
    {
      title: "Education",
      href: "/admin/education",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "Skills & Tools",
      href: "/admin/skills",
      icon: <Tool className="h-5 w-5" />,
    },
    {
      title: "Career Paths",
      href: "/admin/career-paths",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Certifications",
      href: "/admin/certifications",
      icon: <BadgeCheck className="h-5 w-5" />,
    },
    {
      title: "Companies",
      href: "/admin/companies",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    if (collapsed) return

    if (openSubmenu === title) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(title)
    }
  }

  const sidebarHeader = (
    <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-800">
      {!collapsed && (
        <Link href="/admin" className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="ArahKarir Logo"
            width={40}
            height={40}
            className="rounded bg-white"
          />
          <span className="text-xl font-bold">ArahKarir</span>
        </Link>
      )}
      {collapsed && (
        <div className="mx-auto">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="ArahKarir Logo"
            width={32}
            height={32}
            className="rounded bg-white"
          />
        </div>
      )}
      {mobile && (
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
          <X className="h-5 w-5" />
        </Button>
      )}
      {!mobile && !collapsed && (
        <Button variant="ghost" size="icon" onClick={onToggle} className="text-white">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
    </div>
  )

  const renderSidebarItems = () => (
    <ScrollArea className="flex-1">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center w-full p-2 rounded-md",
                          pathname.startsWith(item.href)
                            ? "bg-indigo-800 text-white"
                            : "text-indigo-100 hover:bg-indigo-800",
                        )}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md",
                        pathname.startsWith(item.href)
                          ? "bg-indigo-800 text-white"
                          : "text-indigo-100 hover:bg-indigo-800",
                      )}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSubmenu === item.title && "transform rotate-180",
                        )}
                      />
                    </button>
                    {openSubmenu === item.title && (
                      <div className="pl-10 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={subitem.href}
                            className={cn(
                              "block px-3 py-2 text-sm font-medium rounded-md",
                              pathname === subitem.href
                                ? "bg-indigo-800 text-white"
                                : "text-indigo-100 hover:bg-indigo-800",
                            )}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center w-full p-2 rounded-md",
                      pathname === item.href ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-800",
                    )}
                  >
                    {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  pathname === item.href ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-800",
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </ScrollArea>
  )

  const sidebarFooter = (
    <div className="p-4 border-t border-indigo-800">
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full justify-center text-indigo-100 hover:bg-indigo-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Log out</TooltipContent>
        </Tooltip>
      ) : (
        <Button variant="ghost" className="w-full justify-start text-indigo-100 hover:bg-indigo-800 hover:text-white">
          <LogOut className="h-5 w-5 mr-3" />
          Log out
        </Button>
      )}
    </div>
  )

  return (
    <TooltipProvider>
      <div className={cn("flex flex-col h-full bg-indigo-900 text-white", collapsed ? "w-16" : "w-64")}>
        {sidebarHeader}
        {renderSidebarItems()}
        {sidebarFooter}
      </div>
    </TooltipProvider>
  )
}
