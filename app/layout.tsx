import './globals.css'
import { Inter } from 'next/font/google'
import { NavbarSimple } from '@/components/widgets/navbar'

export const metadata = {
  metadataBase: new URL('https://postgres-prisma.vercel.app'),
  title: 'IntiTex',
  description:
    'Interpretador de texto basado en IA',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div>
          <NavbarSimple />
        </div>
        <div className={inter.variable + " bg-cyan-50"} >
          {children}
        </div>
      </body>
    </html>
  )
}
