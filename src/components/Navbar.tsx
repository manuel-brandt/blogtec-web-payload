'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Users, FileText, Link2, BarChart2, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { BlogtecLogo } from './BlogtecLogo'
import { LanguageSwitcher } from './LanguageSwitcher'

// ─── Services mega-menu data ────────────────────────────────────────────────

const servicesMenu = {
  en: [
    {
      icon: Users,
      title: 'Managed',
      description: 'Give us a budget and we make most out of it.',
      items: [
        { label: 'Managed SEO', href: '/services/managed-seo' },
        { label: 'Managed Google Ads', href: '/services/managed-google-ads' },
        { label: 'Managed SEO Content', href: '/services/managed-seo-content' },
        { label: 'Managed Backlinks', href: '/services/managed-backlinks' },
      ],
    },
    {
      icon: FileText,
      title: 'Content & Design',
      description: 'Quality content and design services from real humans.',
      items: [
        { label: 'SEO Content', href: '/services/seo-content', popular: true },
        { label: 'Content Optimization', href: '/services/content-optimization' },
        { label: 'Web Design', href: '/services/website-design' },
      ],
    },
    {
      icon: Link2,
      title: 'Backlinks & PR',
      description: 'Various backlink options to build authority.',
      items: [
        { label: 'Link Center', href: '/link-center', popular: true },
        { label: 'Business Directories', href: '/services/directories' },
        { label: 'Press Release', href: '/services/press-release' },
        { label: 'Community Links', href: '/services/community-links' },
      ],
    },
    {
      icon: BarChart2,
      title: 'SEO',
      description: 'Flexible technical and keyword SEO services.',
      items: [
        { label: 'SEO & GEO Audit', href: '/services/seo-audit', popular: true },
        { label: 'Technical SEO', href: '/services/technical-seo' },
        { label: 'Keyword Research', href: '/services/keyword-research' },
        { label: 'Content Plan', href: '/services/content-plan' },
      ],
    },
  ],
  de: [
    {
      icon: Users,
      title: 'Managed',
      description: 'Wir übernehmen dein Budget und holen das Maximum heraus.',
      items: [
        { label: 'Managed SEO', href: '/de/services/managed-seo' },
        { label: 'Managed Google Ads', href: '/de/services/managed-google-ads' },
        { label: 'Managed SEO Content', href: '/de/services/managed-seo-content' },
        { label: 'Managed Backlinks', href: '/de/services/managed-backlinks' },
      ],
    },
    {
      icon: FileText,
      title: 'Content & Design',
      description: 'Hochwertiger Content und Design von echten Menschen.',
      items: [
        { label: 'SEO Content', href: '/de/services/seo-content', popular: true },
        { label: 'Content-Optimierung', href: '/de/services/content-optimization' },
        { label: 'Website Design', href: '/de/services/website-design' },
      ],
    },
    {
      icon: Link2,
      title: 'Backlinks & PR',
      description: 'Verschiedene Backlink-Optionen zur Stärkung deiner Autorität.',
      items: [
        { label: 'Link Center', href: '/de/link-center', popular: true },
        { label: 'Branchenverzeichnisse', href: '/de/services/directories' },
        { label: 'Pressemitteilung', href: '/de/services/press-release' },
        { label: 'Community Links', href: '/de/services/community-links' },
      ],
    },
    {
      icon: BarChart2,
      title: 'SEO',
      description: 'Flexible technische und Keyword-SEO-Leistungen.',
      items: [
        { label: 'SEO & GEO Audit', href: '/de/services/seo-audit', popular: true },
        { label: 'Technisches SEO', href: '/de/services/technical-seo' },
        { label: 'Keyword-Recherche', href: '/de/services/keyword-research' },
        { label: 'Content-Plan', href: '/de/services/content-plan' },
      ],
    },
  ],
}

// ─── Nav links ───────────────────────────────────────────────────────────────

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Link Center', href: '/link-center', hasDropdown: false },
  { label: 'White Label', href: '/white-label', hasDropdown: false },
  { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
  { label: 'Resources', href: '/resources', hasDropdown: false },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isGerman = pathname.startsWith('/de')
  const menuData = isGerman ? servicesMenu.de : servicesMenu.en
  const servicesRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-[#F5EFE8]'
      }`}
    >
      {/* Top bar */}
      <div
        className={`bg-[#EADCC4] transition-[max-height,opacity] duration-200 ${
          scrolled ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-12 opacity-100 overflow-visible'
        }`}
      >
        <div className="px-4 py-2 flex justify-end items-center gap-5 text-sm max-w-7xl mx-auto">
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
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <li key={link.label} ref={servicesRef} className="relative">
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    onMouseEnter={() => setServicesOpen(true)}
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Mega menu panel */}
                  {servicesOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[820px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-4 gap-4"
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {menuData.map((col) => {
                        const Icon = col.icon
                        return (
                          <div key={col.title} className="flex flex-col gap-3">
                            {/* Column header */}
                            <div className="flex flex-col gap-1.5">
                              <div className="w-10 h-10 rounded-xl bg-[#F5EFE8] flex items-center justify-center">
                                <Icon size={20} className="text-[#E9204F]" />
                              </div>
                              <p className="font-bold text-gray-900 text-sm leading-tight">{col.title}</p>
                              <p className="text-xs text-gray-500 leading-snug">{col.description}</p>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100" />

                            {/* Links */}
                            <ul className="flex flex-col gap-1.5">
                              {col.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#E9204F] transition-colors"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    {item.label}
                                    {'popular' in item && item.popular && (
                                      <span className="text-[10px] font-bold text-[#E9204F] uppercase tracking-wide ml-1">
                                        Popular
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            }

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
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
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-black py-2"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    {link.label}
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="pl-4 pb-2 space-y-4">
                      {menuData.map((col) => {
                        const Icon = col.icon
                        return (
                          <div key={col.title}>
                            <div className="flex items-center gap-2 mb-2">
                              <Icon size={16} className="text-[#E9204F]" />
                              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">{col.title}</p>
                            </div>
                            <ul className="space-y-1 pl-6">
                              {col.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#E9204F] py-0.5 transition-colors"
                                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                                  >
                                    {item.label}
                                    {'popular' in item && item.popular && (
                                      <span className="text-[10px] font-bold text-[#E9204F] uppercase tracking-wide ml-1">
                                        Popular
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="block text-sm font-medium text-gray-700 hover:text-black py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}

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
