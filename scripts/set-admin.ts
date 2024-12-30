import { adminDb } from '../app/config/firebase-admin'

async function setAdmin(email: string) {
  try {
    // Get all users
    const usersSnapshot = await adminDb.collection('users').where('email', '==', email).get()
    
    if (usersSnapshot.empty) {
      console.error('No user found with email:', email)
      process.exit(1)
    }

    // Update the first matching user to be an admin
    const userDoc = usersSnapshot.docs[0]
    await adminDb.collection('users').doc(userDoc.id).update({
      isAdmin: true
    })

    console.log(`Successfully set user ${email} as admin`)
    process.exit(0)
  } catch (error) {
    console.error('Error setting admin:', error)
    process.exit(1)
  }
}

// Get email from command line argument
const email = process.argv[2]
if (!email) {
  console.error('Please provide an email address')
  process.exit(1)
}

setAdmin(email) 