// import { useUserData } from '@/lib/hooks'
import './globals.css'
import { Bodoni_Moda } from 'next/font/google'
import { UserContextProvider } from '@/lib/contexts'

const bodoni = Bodoni_Moda({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={bodoni.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}
