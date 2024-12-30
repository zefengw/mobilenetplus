import { NextResponse } from 'next/server'
import { adminDb } from '@/app/config/firebase-admin'

export async function POST(request: Request) {
  try {
    const { userId, isAdmin } = await request.json()

    // Don't allow modifying the default admin
    const userDoc = await adminDb.collection('users').doc(userId).get()
    if (userDoc.data()?.email === 'admin@mobilenetplus.com') {
      return NextResponse.json(
        { error: 'Cannot modify default admin status' },
        { status: 403 }
      )
    }

    // Update admin status
    await adminDb.collection('users').doc(userId).update({
      isAdmin
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating admin status:', error)
    return NextResponse.json(
      { error: 'Failed to update admin status' },
      { status: 500 }
    )
  }
} 