"use client"

import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">TravelTools</h3>
            <p className="text-sm text-gray-400">
              Your trusted platform for booking exclusive travel packages and discovering amazing destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/packages" className="hover:text-orange-400 transition-colors">
                  Browse Packages
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/tours-and-travels" className="hover:text-orange-400 transition-colors">
                  Tours & Travels
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-orange-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="hover:text-orange-400 transition-colors">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@traveltools.com" className="hover:text-orange-400 transition-colors">
                  info@traveltools.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {currentYear} TravelTools. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms
              </Link>
              <Link href="/cookies-policy" className="hover:text-orange-400 transition-colors">
                Cookies
              </Link>
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
