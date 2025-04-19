import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profession Details | ArahKarir",
  description: "Detailed information about professions and career paths",
}

export default function ProfessionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
