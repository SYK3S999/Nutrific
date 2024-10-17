import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nutriffics - Votre chemin vers une vie plus saine',
  description: 'Des plans nutritionnels personnalisés et des conseils d\'experts pour vous aider à atteindre vos objectifs de santé.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}