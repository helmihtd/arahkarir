import type { Metadata } from "next"
import ProfessionPageClient from "./ProfessionPageClient"

export const metadata: Metadata = {
  title: "Profession Details | ArahKarir",
  description: "Detailed information about professions and career paths",
}

export default function ProfessionPage({ params }: { params: { id: string } }) {
  return <ProfessionPageClient params={params} />
}
