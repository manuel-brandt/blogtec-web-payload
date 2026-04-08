'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Link Center', href: '/link-center', hasDropdown: false },
  { label: 'White Label', href: '/white-label', hasDropdown: false },
  { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
  { label: 'Resources', href: '/resources', hasDropdown: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-gray-100 px-4 py-2 flex justify-end items-center gap-4 text-sm max-w-7xl mx-auto">
        <Link
          href="https://app.blogtec.io"
          className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors"
        >
          <span className="text-xs">🔒</span>
          <span>Client Login</span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="px-4 py-4 max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-[#E9204F] rounded-full flex items-center justify-center">
            <span className="text-white font-black text-base">B</span>
          </div>
          <span className="text-xl font-black text-black tracking-tight">Blogtec</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} />}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/consultation"
            className="border border-black text-black rounded-pill px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
          >
            BOOK CONSULTATION
          </Link>
          <Link
            href="https://app.blogtec.io/register/"
            className="bg-[#E9204F] text-white rounded-pill px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-[#d01a44] transition-colors"
          >
            SIGN UP FREE
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-gray-700 hover:text-black py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3 border-t border-gray-100">
            <Link
              href="/consultation"
              className="block text-center border border-black text-black rounded-pill px-5 py-2.5 text-sm font-bold uppercase tracking-wide"
            >
              BOOK CONSULTATION
            </Link>
            <Link
              href="https://app.blogtec.io/register/"
              className="block text-center bg-[#E9204F] text-white rounded-pill px-5 py-2.5 text-sm font-bold uppercase tracking-wide"
            >
              SIGN UP FREE
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
