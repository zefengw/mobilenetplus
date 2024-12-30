'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/AuthContext'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Smartphone, 
  Wifi, 
  Tv, 
  Shield, 
  Package, 
  Users
} from 'lucide-react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated or not admin
    if (!user) {
      router.push('/login')
    } else if (!isAdmin) {
      router.push('/')
    }
  }, [user, isAdmin, router])

  // Don't render anything until we check authentication
  if (!user || !isAdmin) {
    return null
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Smartphone, label: 'Mobile', href: '/admin/mobile' },
    { icon: Wifi, label: 'Internet', href: '/admin/internet' },
    { icon: Tv, label: 'TV', href: '/admin/tv' },
    { icon: Shield, label: 'Security', href: '/admin/security' },
    { icon: Package, label: 'Accessories', href: '/admin/accessories' },
    { icon: Users, label: 'Users', href: '/admin/users' }
  ]

  return (
    <div className="flex h-screen bg-gray-100 pt-14">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <nav className="pt-8">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout 