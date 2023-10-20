import { Suspense } from "react";
import TablePlaceholder from "@/components/table-placeholder";
import UserForm from "@/components/UserForm";

export default function Home() {

  const handleUserSubmit = async (name: string, email: string, image: string) => {
    // code here
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<TablePlaceholder />}>
        <UserForm onUserSubmit={handleUserSubmit} />
      </Suspense>
    </main>
  )
}