'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth, db } from '@/app/config/firebase-client'
import { doc, setDoc, getDoc, Firestore } from 'firebase/firestore'

export interface AuthContextType {
  user: User | null
  isAdmin: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {}
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth || !db) return

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user?.email)
      setUser(user)
      if (user) {
        const userDoc = await getDoc(doc(db as Firestore, 'users', user.uid))
        const userData = userDoc.data()
        console.log('User data:', userData)
        setIsAdmin(userData?.isAdmin || false)
        console.log('Is admin:', userData?.isAdmin)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function signup(email: string, password: string) {
    if (!auth || !db) throw new Error('Firebase not initialized')

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Store user data in Firestore
    const isDefaultAdmin = email === 'admin@mobilenetplus.com'
    await setDoc(doc(db as Firestore, 'users', user.uid), {
      email: user.email,
      isAdmin: isDefaultAdmin,
      createdAt: new Date()
    })
    
    setUser(user)
    setIsAdmin(isDefaultAdmin)
  }

  async function login(email: string, password: string) {
    if (!auth || !db) throw new Error('Firebase not initialized')

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const userDoc = await getDoc(doc(db as Firestore, 'users', user.uid))
    const userData = userDoc.data()
    console.log('Login - User data:', userData)
    const adminStatus = userData?.isAdmin || false
    console.log('Login - Setting admin status:', adminStatus)
    setIsAdmin(adminStatus)
    setUser(user)
  }

  async function logout() {
    if (!auth) throw new Error('Firebase not initialized')

    await signOut(auth)
    setUser(null)
    setIsAdmin(false)
  }

  const value = {
    user,
    isAdmin,
    signUp: signup,
    signIn: login,
    signOut: logout
  }

  console.log('AuthContext value:', { email: user?.email, isAdmin })

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
} 