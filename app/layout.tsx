import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuizMaster - Master Web Development & Data Analysis',
  description: 'Challenge yourself with expert quizzes in Web Development and Data Analysis. Test your knowledge and improve your skills.',
  generator: 'v0.app',

}
export const viewport: Viewport = {

  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,

}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased dark">{children}</body>
    </html>
  )
}
