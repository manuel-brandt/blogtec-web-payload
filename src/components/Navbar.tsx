'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { BlogtecLogo } from './BlogtecLogo'
import { LanguageSwitcher } from './LanguageSwitcher'

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Link Center', href: '/link-center', hasDropdown: false },
  { label: 'White Label', href: '/white-label', hasDropdown: false },
  { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
  { label: 'Resources', href: '/resources', hasDropdown: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isGerman = pathname.startsWith('/de')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-[#F5EFE8]'
      }`}
    >
      {/* Top bar — collapses on scroll */}
      <div
        className={`bg-[#EADCC4] overflow-hidden transition-[max-height,opacity] duration-200 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="px-4 py-2 flex justify-between items-center gap-4 text-sm max-w-7xl mx-auto">
          <Link
            href="https://app.blogtec.io"
            className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
          >
            <span className="text-xs">🔒</span>
            <span>{isGerman ? 'Kunden-Login' : 'Client Login'}</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main nav */}
      <nav className="px-4 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <BlogtecLogo />

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
