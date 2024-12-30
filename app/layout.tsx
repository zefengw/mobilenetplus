import { TranslationProvider } from '../components/TranslationContext'
import ClientLayout from './components/ClientLayout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </TranslationProvider>
      </body>
    </html>
  )
}

