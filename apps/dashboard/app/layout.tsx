import type { Metadata } from 'next'
import './globals.css'
import PlatformNav from '@kinetic/ui'

export const metadata: Metadata = {
  title: 'Assessment Results Viewer',
  description: 'View and analyze assessment results',
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
      <body className="bg-gray-50 text-gray-900">
        <PlatformNav currentApp="dashboard" />
        {children}
      </body>
    </html>
  )
}