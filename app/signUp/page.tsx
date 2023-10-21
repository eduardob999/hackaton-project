import { Suspense } from "react";
import TablePlaceholder from "@/components/table-placeholder";
import Link from "next/link";
import ExpandingArrow from "@/components/expanding-arrow";
import { SimpleRegistrationForm } from "@/components/registrationForm";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>Home</p>
        <ExpandingArrow />
      </Link>
      <Suspense fallback={<TablePlaceholder />}>
        <SimpleRegistrationForm />
      </Suspense>
    </main>
  )
}