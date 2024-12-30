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
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push('/login')
    }
  }, [user, isAdmin, router])

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
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
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
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout 