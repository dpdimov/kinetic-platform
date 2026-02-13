import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import PlatformNav from '@kinetic/ui'

export const metadata: Metadata = {
  title: 'Style Assessment App',
  description: 'Kinetic Style Assessment Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <Analytics />
        <PlatformNav currentApp="assessment" />
        {children}
      </body>
    </html>
  )
}