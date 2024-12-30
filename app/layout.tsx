import './globals.css'
import { TranslationProvider } from '../components/TranslationContext'
import ClientLayout from './components/ClientLayout'

export const metadata = {
  title: 'MobileNet Plus',
  description: 'Your one-stop solution for mobile, internet, TV, and security services.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TranslationProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </TranslationProvider>
      </body>
    </html>
  )
}

