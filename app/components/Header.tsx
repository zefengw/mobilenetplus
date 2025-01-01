import Link from 'next/link'
import Image from 'next/image'

import { useAuth } from '@/app/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { UserCircle } from 'lucide-react'

export function Header() {
  const { user, isAdmin, signOut } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-2xl font-bold text-primary">
            MobileNet Plus
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/mobile" className="text-gray-600 hover:text-gray-900">
              Mobile
            </Link>
            <Link href="/internet" className="text-gray-600 hover:text-gray-900">
              Internet
            </Link>
            <Link href="/tv" className="text-gray-600 hover:text-gray-900">
              TV
            </Link>
            <Link href="/security" className="text-gray-600 hover:text-gray-900">
              Home Security
            </Link>
            <Link href="/accessories" className="text-gray-600 hover:text-gray-900">
              Accessories
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 