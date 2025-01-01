import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="mb-4">
              <Image
                src="/img/logo.png"
                alt="MobileNet Plus"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">Your one-stop solution for all your telecommunication needs</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/mobile" className="text-gray-600 hover:text-primary">Mobile Plans</Link></li>
              <li><Link href="/internet" className="text-gray-600 hover:text-primary">Internet Plans</Link></li>
              <li><Link href="/tv" className="text-gray-600 hover:text-primary">TV Plans</Link></li>
              <li><Link href="/security" className="text-gray-600 hover:text-primary">Home Security</Link></li>
              <li><Link href="/accessories" className="text-gray-600 hover:text-primary">Accessories</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/mobilenetplusdotcom/" className="text-gray-600 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://attachments.office.net/owa/j88wang%40uwaterloo.ca/service.svc/s/GetAttachmentThumbnail?id=AAMkAGI5OTIwYTA4LTBkZjMtNDcwNC05YzRiLTk0MGVjMWJlOWE2ZABGAAAAAADgUWoPIOxsQINRvJZZtV68BwCfxVStLTRWSan4eMMk3XdVAAAAAAEMAACfxVStLTRWSan4eMMk3XdVAAJcRZ8qAAABEgAQAKxPcZ%2FpSORBsLB2iEHCTCA%3D&thumbnailType=2&token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkEzMDVCMkU1Q0ZERjFGQTFBODgyNTU2MzM3NDhCQkNBRTAxNUU5OTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJvd1d5NWNfZkg2R29nbFZqTjBpN3l1QVY2WkkifQ.eyJvcmlnaW4iOiJodHRwczovL291dGxvb2sub2ZmaWNlLmNvbSIsInVjIjoiYTk3MWI4NWE3YjE2NGM4NjkzNTg2YWM1MGQ4YWEwZTkiLCJzaWduaW5fc3RhdGUiOiJrbXNpIiwidmVyIjoiRXhjaGFuZ2UuQ2FsbGJhY2suVjEiLCJhcHBjdHhzZW5kZXIiOiJPd2FEb3dubG9hZEA3MjNhNWE4Ny1mMzlhLTRhMjItOTI0Ny0zZmMyNDBjMDEzOTYiLCJpc3NyaW5nIjoiV1ciLCJhcHBjdHgiOiJ7XCJtc2V4Y2hwcm90XCI6XCJvd2FcIixcInB1aWRcIjpcIjExNTM4MDExMjI2MTI3NjA2MTlcIixcInNjb3BlXCI6XCJPd2FEb3dubG9hZFwiLFwib2lkXCI6XCJhNDFhMTI2OS1kZjhiLTRlYTgtODFkYS04YmU3NzAzMmFhN2RcIixcInByaW1hcnlzaWRcIjpcIlMtMS01LTIxLTM5NzE5NTY3OC0xOTY5Njg2MjMxLTIyMjY0NjU5MC0zOTgyMDE0NVwifSIsIm5iZiI6MTczNTY5NzczNiwiZXhwIjoxNzM1Njk4MDM2LCJpc3MiOiIwMDAwMDAwMi0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDBANzIzYTVhODctZjM5YS00YTIyLTkyNDctM2ZjMjQwYzAxMzk2IiwiYXVkIjoiMDAwMDAwMDItMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2F0dGFjaG1lbnRzLm9mZmljZS5uZXRANzIzYTVhODctZjM5YS00YTIyLTkyNDctM2ZjMjQwYzAxMzk2IiwiaGFwcCI6Im93YSJ9.dN3u_Hto0ZyOvaXcCgV8HCR8XD2a3wG7fF_SSylF27dJ0C9szIECKBp3R7sTaXL4522x-KUY4qC3pHNO2q4XBbHdwN0q0UxvHNJgjccgwEMVKQBd8QNvINfQPOK4BQdQYc2KfI5J__zQYOtyXrgdJO-_NOzBNf1um1yquXZhJAlIRGZunsliqyX1C-E7mW0Rm-GQ7-k5n6sAgku28TAhCk5jNIjvndnp9Cc5DszX_2F6tXeZThBq5y-faQ3WoAJ-xcyl9HtFRKrbKrQldEQQsiwezTTm4YRQAPfuIEqAbyiDvs-tczA_th8TbXL8OxCxS4y57LAKmqzjSAV5O4Gkng&X-OWA-CANARY=wTQ4TRGoAfAAAAAAAAAAAKDSDUMKKt0YixZkt7GDJEAq5qnXy9Rq8vAPog2yOJI59pFWOwQoiqg.&owa=outlook.office.com&scriptVer=20241213002.10&clientId=8FAC0E2DE60748ED8AECDDD7BF3FFA13&animation=true" className="text-gray-600 hover:text-primary">
                <span className="sr-only">WeChat</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.691 2C4.306 2 1 5.307 1 9.691c0 2.23.942 4.126 2.478 5.5.124.112.255.217.39.317l-.679 2.314 2.314-.679c.514.14 1.048.239 1.602.239h.144c-.087-.321-.144-.655-.144-1.003 0-3.516 3.382-6.194 6.894-6.194.321 0 .637.025.942.074C14.216 6.921 11.696 2 8.691 2zM6 8.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm5 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
                  <path d="M22.781 15.045c0-3.516-3.382-6.194-6.894-6.194-3.816 0-6.894 2.678-6.894 6.194S12.07 21.24 15.887 21.24c.787 0 1.549-.112 2.255-.317l2.041.598-.598-2.041c1.536-1.374 2.478-3.271 2.478-5.5v.065zm-9.142-1.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm5 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Speak with an Agent
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center py-2">&copy; 2024 MobileNet Plus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

