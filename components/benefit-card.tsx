import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface BenefitCardProps {
  icon: string
  title: string
  description: string
}

export default function BenefitCard({ icon, title, description }: BenefitCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
        {IconComponent && <IconComponent size={24} />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
