"use client"
import { Suspense } from "react";
import TablePlaceholder from "@/components/table-placeholder";
import Link from "next/link";
import ExpandingArrow from "@/components/expanding-arrow";
import UserForm from "@/components/UserForm";

export default function Home() {
  const handleUserSubmit = (name: string, email: string, image: string) => {
    // Here, you can send the user data to your Prisma API or perform other actions.
    // For simplicity, we'll just log the data to the console.
    console.log('Submitted user data:', { name, email, image });
  };
  
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
        <UserForm onUserSubmit={handleUserSubmit} />
      </Suspense>
    </main>
  )
}