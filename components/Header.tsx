'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Circle, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useTranslation } from './TranslationContext'
import { useAuth } from '@/app/contexts/AuthContext'

type Language = 'English' | 'Français' | '中文';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const router = useRouter()
  const { language, setLanguage, t } = useTranslation()
  const { user, isAdmin, signOut, signIn } = useAuth()

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as Language)
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password)
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      // Handle error appropriately
    }
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
          {/* TODO: Add language dropdown */}
          {/* <div className="relative">
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
          </div> */}
          {/* TODO: Add Spin the Wheel */}
          {/* <div className="text-gray-400 p-2 cursor-not-allowed">
            <Circle className="w-6 h-6" />
          </div> */}
          <div className="relative">
            {user ? (
              <>
                <button 
                  className="flex items-center text-primary hover:text-primary-dark p-2"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label="User menu"
                >
                  <User className="w-6 h-6" />
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <ul 
                  className={`absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
                    isUserMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {isAdmin && (
                    <li>
                      <Link 
                        href="/admin"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={signOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <button
                className="text-primary hover:text-primary-dark p-2"
                onClick={() => router.push('/login')}
                aria-label={t('nav.login')}
              >
                <User className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

