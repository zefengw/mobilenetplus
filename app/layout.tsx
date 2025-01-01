import './globals.css'
import { TranslationProvider } from '../components/TranslationContext'
import { AuthProvider } from './contexts/AuthContext'
import ClientLayout from './components/ClientLayout'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'MobileNet Plus',
  description: 'Your one-stop solution for mobile, internet, TV, and security services.',
  icons: {
    icon: '/img/logo.png',
    shortcut: '/img/logo.png',
    apple: '/img/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/logo.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <TranslationProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </TranslationProvider>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}

