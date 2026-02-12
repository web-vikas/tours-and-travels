"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/about", label: "About Us" },
    { href: "/tours-and-travels", label: "Tours & Travels" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl font-bold text-orange-600">TravelTools</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href) ? "text-orange-600 font-semibold" : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Admin and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin")}
              className="hidden sm:inline-flex border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Admin
            </Button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-orange-50 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-orange-100 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                router.push("/admin")
                setIsOpen(false)
              }}
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Admin Panel
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
