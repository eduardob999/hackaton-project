import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import TablePlaceholder from '@/components/table-placeholder'
import FullWidthIframe from '@/components/FullWidthIframe'
import ArrowLink from '@/components/widgets/arrowLink'

export const dynamic = 'force-dynamic'

export default function Home() {

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
      <Suspense fallback={<TablePlaceholder />}>
        <FullWidthIframe url='https://slides.com/arazanibalcazar/palette-ff6f30/embed' />
      </Suspense>
      <br/>
      <ArrowLink />
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        Built with{' '}
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