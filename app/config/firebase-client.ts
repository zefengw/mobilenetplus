'use client'

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let firebase = {
  app: undefined as FirebaseApp | undefined,
  db: undefined as Firestore | undefined,
  auth: undefined as Auth | undefined,
}

if (typeof window !== 'undefined') {
  firebase.app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  firebase.db = getFirestore(firebase.app)
  firebase.auth = getAuth(firebase.app)
}

export const { app, db, auth } = firebase 