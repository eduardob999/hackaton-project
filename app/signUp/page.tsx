"use client"
import { Suspense } from "react";
import TablePlaceholder from "@/components/table-placeholder";
import { SimpleRegistrationForm } from "@/components/registrationForm";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center col-span-2">
      <Suspense fallback={<TablePlaceholder />}>
        <SimpleRegistrationForm />
      </Suspense>
    </main>
  )
}