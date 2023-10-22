import { Suspense } from "react"
import TablePlaceholder from "@/components/table-placeholder"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<TablePlaceholder />}>
      </Suspense>
    </main>
  )
}