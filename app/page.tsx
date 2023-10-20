import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import Api from '@/components/api'
import FullWidthIframe from '@/components/FullWidthIframe'
import UserForm from '@/components/UserForm'

export const dynamic = 'force-dynamic'

export default function Home() {

  const handleUserSubmit = async (name: string, email: string, image: string) => {
  try {
    // Use Prisma to create a new user entry
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        image,
      },
    });

    console.log('New user created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

  const api1Props = {
    apiName: 'testApi1',
    apiUrl: '/api/utils/testApi1',
    queryParameters: {
      param1: 'value1',
      param2: 'value2',
    },
  };

  const api2Props = {
    apiName: 'LlamaAiAPI',
    apiUrl: '/api/utils/testApi2',
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div>
        <Link
          href="/"
          className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          <p>Home</p>
          <ExpandingArrow />
        </Link>
        <Link
          href="/signUp"
          className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          <p>SignUp</p>
          <ExpandingArrow />
        </Link>
      </div>
      <Link
        href="https://vercel.com/templates/next.js/postgres-prisma"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>page.tsx</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Hackaton Project
      </h1>
      <FullWidthIframe url="https://eduardob999.github.io/hackaton-slides/" />
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>
      <Suspense fallback={<TablePlaceholder />}>
        <Api key={1} {...api1Props} />
      </Suspense>
      {/* deactivated component */ false && <Suspense fallback={<TablePlaceholder />}>
        <Api key={2} {...api2Props} />
      </Suspense>}
      {/* deactivated component */ false && <Suspense fallback={<TablePlaceholder />}>
        <UserForm onUserSubmit={handleUserSubmit} />
      </Suspense>}
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        <Link
          href="https://vercel.com/postgres"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Vercel Postgres
        </Link>{' '}
        demo with{' '}
        <Link
          href="https://prisma.io"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Prisma
        </Link>{' '}
        as the ORM. <br /> Built with{' '}
        <Link
          href="https://nextjs.org/docs"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Next.js App Router
        </Link>
        .
      </p>

      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
        <Link
          href="https://postgres-starter.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Starter
        </Link>
        <Link
          href="https://postgres-kysely.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Kysely
        </Link>
        <Link
          href="https://postgres-drizzle.vercel.app/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Drizzle
        </Link>
      </div>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  )
}
