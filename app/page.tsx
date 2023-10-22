import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import TablePlaceholder from '@/components/table-placeholder'
import FullWidthIframe from '@/components/FullWidthIframe'
import ArrowLink from '@/components/widgets/arrowLink'
import ExpandingArrow from '@/components/expanding-arrow.tsx'

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
      <Link
        href="/signUp"
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-20 py-4 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>¡Ingresa ahora!</p>
        <ExpandingArrow />
      </Link>
      <p className="font-light text-gray-600 w-full max-w-lg text-center mt-6">
        Desarrollado para{' '}
        <Link
          href="https://laconga.redclara.net/hackathon/#/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          HACKATON Co-Afina 2023
        </Link>
        .
      </p>
      <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
        <Link
          href="https://github.com/eduardob999/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Eduardo Bogado
        </Link>
        <Link
          href="https://github.com/ARAZANIBM77/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Arazani Balcazar
        </Link>
        <Link
          href="https://github.com/leober-ramos33/"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Leober Ramos
        </Link>
      </div>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link
          href="https://github.com/eduardob999/hackaton-project/"
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