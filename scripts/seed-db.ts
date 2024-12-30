import * as dotenv from 'dotenv'
import { join } from 'path'
import { seedDatabase } from '../app/lib/seed-data'

// Load environment variables from .env.local
dotenv.config({ path: join(process.cwd(), '.env.local') })

async function main() {
  console.log('Environment variables:', {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.slice(0, 20) + '...',
  })
  
  console.log('Starting database seeding...')
  await seedDatabase()
  console.log('Database seeding completed!')
  process.exit(0)
}

main().catch(error => {
  console.error('Error seeding database:', error)
  process.exit(1)
}) 