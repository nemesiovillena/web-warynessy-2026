import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warynessy CMS - Admin',
  description: 'Panel de administración',
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
