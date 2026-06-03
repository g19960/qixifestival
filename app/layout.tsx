import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '七夕贺卡 | Qixi Greeting Card',
  description: '制作一份浪漫的七夕电子贺卡，送给你的女神。Create a romantic Qixi Festival greeting card.',
  openGraph: {
    title: '七夕贺卡 | Qixi Greeting Card',
    description: '制作一份浪漫的七夕电子贺卡，送给你的女神',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${dancingScript.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
