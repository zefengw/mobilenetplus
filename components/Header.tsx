'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Circle, User } from 'lucide-react'
import { useTranslation } from './TranslationContext'

type Language = 'English' | 'Français' | '中文';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { language, setLanguage, t } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language)
    setIsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold text-primary">{t('nav.home')}</Link>
          <Link href="/mobile" className="text-gray-600 hover:text-primary">{t('nav.mobile')}</Link>
          <Link href="/internet" className="text-gray-600 hover:text-primary">{t('nav.internet')}</Link>
          <Link href="/tv" className="text-gray-600 hover:text-primary">{t('nav.tv')}</Link>
          <Link href="/security" className="text-gray-600 hover:text-primary">{t('nav.security')}</Link>
          <Link href="/accessories" className="text-gray-600 hover:text-primary">Accessories</Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">{t('nav.contact')}</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="flex items-center text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              {language} <ChevronDown className="ml-1" />
            </button>
            <ul 
              className={`absolute right-0 mt-[27px] w-40 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              {['English', 'Français', '中文'].map((lang) => (
                <li key={lang}>
                  <button 
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${language === lang ? 'bg-gray-100 font-semibold' : ''}`} 
                    onClick={() => handleLanguageChange(lang as Language)}
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-gray-400 p-2 cursor-not-allowed">
            <Circle className="w-6 h-6" />
          </div>
          <button
            className="text-primary hover:text-primary-dark p-2"
            onClick={() => router.push('/login')}
            aria-label={t('nav.login')}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header

