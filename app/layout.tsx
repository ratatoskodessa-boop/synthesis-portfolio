import './globals.css'
import { Syne, Inter } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Synthesis | Syngenta Digital Studio',
  description: 'Where ideas come together.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable} font-inter bg-background text-foreground overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}
