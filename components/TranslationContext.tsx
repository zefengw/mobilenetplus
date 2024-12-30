'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../app/utils/translations'

type Language = 'English' | 'Français' | '中文'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [languageState, setLanguageState] = useState<Language>('English')

  const setLanguage = (lang: Language) => {
    localStorage.setItem('preferredLanguage', lang)
    setLanguageState(lang)
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = translations[languageState]
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value
  }

  return (
    <TranslationContext.Provider value={{ language: languageState, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

