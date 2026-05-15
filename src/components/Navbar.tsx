'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Users, FileText, Link2, BarChart2, ChevronRight, Info, BookOpen } from 'lucide-react'
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
        { label: 'Managed Backlinks', href: '/services/managed-backlinks' },
        { label: 'Managed SEO Content', href: '/services/managed-seo-content' },
        { label: 'Managed Google Ads', href: '/services/managed-google-ads' },
      ],
    },
    {
      icon: Link2,
      title: 'Backlinks & PR',
      description: 'Various backlink options to build authority.',
      items: [
        {
          label: 'Link Center',
          href: '/link-center',
          popular: true,
          subtext: 'Guest Posts · Link Insertion · Advertorials',
        },
        { label: 'Business Directories', href: '/services/directories' },
        { label: 'Press Release', href: '/services/press-release' },
        { label: 'Community Links', href: '/services/community-links' },
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
        { label: 'Managed Backlinks', href: '/de/services/managed-backlinks' },
        { label: 'Managed SEO Content', href: '/de/services/managed-seo-content' },
        { label: 'Managed Google Ads', href: '/de/services/managed-google-ads' },
      ],
    },
    {
      icon: Link2,
      title: 'Backlinks & PR',
      description: 'Verschiedene Backlink-Optionen zur Stärkung deiner Autorität.',
      items: [
        {
          label: 'Link Center',
          href: '/de/link-center',
          popular: true,
          subtext: 'Guest Posts · Link Insertion · Advertorials',
        },
        { label: 'Branchenverzeichnisse', href: '/de/services/directories' },
        { label: 'Pressemitteilung', href: '/de/services/press-release' },
        { label: 'Community Links', href: '/de/services/community-links' },
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

// ─── Resources mega-menu data ───────────────────────────────────────────────

const resourcesMenu = {
  en: {
    columns: [
      {
        icon: Info,
        title: 'General',
        description: 'Learn more about Blogtec and our team.',
        items: [
          { label: 'About Us 👋', href: '/about' },
          { label: 'Affiliate Program', href: '/affiliate' },
          { label: 'Careers', href: '/careers' },
        ],
      },
      {
        icon: BookOpen,
        title: 'Knowledge',
        description: 'Guides and resources to grow your SEO.',
        items: [
          { label: 'Blog', href: '/blog' },
          { label: 'Guide: White Label SEO', href: '/guides/white-label-seo' },
        ],
      },
    ],
    featured: {
      label: 'Free Guide',
      title: 'White Label SEO',
      subtitle: 'How Agencies Outsource SEO Services Effectively',
      cta: 'DOWNLOAD GUIDE',
      href: '/guides/white-label-seo',
    },
  },
  de: {
    columns: [
      {
        icon: Info,
        title: 'Allgemein',
        description: 'Erfahre mehr über Blogtec und unser Team.',
        items: [
          { label: 'Über uns 👋', href: '/de/about' },
          { label: 'Affiliate-Programm', href: '/de/affiliate' },
          { label: 'Karriere', href: '/de/careers' },
        ],
      },
      {
        icon: BookOpen,
        title: 'Wissen',
        description: 'Guides und Ressourcen für dein SEO-Wachstum.',
        items: [
          { label: 'Blog', href: '/de/blog' },
          { label: 'Guide: White Label SEO', href: '/de/guides/white-label-seo' },
        ],
      },
    ],
    featured: {
      label: 'Kostenloser Guide',
      title: 'White Label SEO',
      subtitle: 'Wie Agenturen SEO-Dienste effektiv auslagern',
      cta: 'GUIDE HERUNTERLADEN',
      href: '/de/guides/white-label-seo',
    },
  },
}

const navLinks = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Link Center', href: '/link-center', hasDropdown: false },
  { label: 'White Label', href: '/white-label', hasDropdown: false },
  { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
  { label: 'Resources', href: '/resources', hasDropdown: true },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isGerman = pathname.startsWith('/de')
  const servicesData = isGerman ? servicesMenu.de : servicesMenu.en
  const resourcesData = isGerman ? resourcesMenu.de : resourcesMenu.en

  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resourcesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openServices = () => {
    if (servicesTimer.current) clearTimeout(servicesTimer.current)
    setResourcesOpen(false)
    setServicesOpen(true)
  }
  const scheduleCloseServices = () => {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 120)
  }

  const openResources = () => {
    if (resourcesTimer.current) clearTimeout(resourcesTimer.current)
    setServicesOpen(false)
    setResourcesOpen(true)
  }
  const scheduleCloseResources = () => {
    resourcesTimer.current = setTimeout(() => setResourcesOpen(false), 120)
  }

  return (
    <header
      ref={headerRef}
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
            if (link.label === 'Services') {
              return (
                <li key={link.label}>
                  <button
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                      servicesOpen ? 'text-[#E9204F]' : 'text-gray-700 hover:text-black'
                    }`}
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                    onClick={() => (servicesOpen ? setServicesOpen(false) : openServices())}
                    aria-expanded={servicesOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </li>
              )
            }
            if (link.label === 'Resources') {
              return (
                <li key={link.label}>
                  <button
                    className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                      resourcesOpen ? 'text-[#E9204F]' : 'text-gray-700 hover:text-black'
                    }`}
                    onMouseEnter={openResources}
                    onMouseLeave={scheduleCloseResources}
                    onClick={() => (resourcesOpen ? setResourcesOpen(false) : openResources())}
                    aria-expanded={resourcesOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </li>
              )
            }
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
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
            CONTACT US
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

      {/* ── Services mega menu panel ── */}
      <div
        className={`absolute inset-x-0 top-full hidden lg:block transition-all duration-200 origin-top ${
          servicesOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={openServices}
        onMouseLeave={scheduleCloseServices}
      >
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="bg-[#FAF8F5] rounded-2xl border border-gray-200 shadow-2xl px-8 py-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              {isGerman ? 'Leistungen' : 'Services'}
            </p>
            <div className="grid grid-cols-4 gap-10">
              {servicesData.map((col) => {
                const Icon = col.icon
                return (
                  <div key={col.title} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] flex items-center justify-center">
                        <Icon size={26} className="text-[#E9204F]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-base">{col.title}</p>
                        <p className="text-sm text-gray-500 mt-1 leading-snug">{col.description}</p>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <ul className="flex flex-col gap-2.5">
                      {col.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="flex flex-col gap-0.5 text-[15px] text-gray-600 hover:text-[#E9204F] transition-colors group"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="flex items-center gap-2">
                              <span className="group-hover:underline">{item.label}</span>
                              {'popular' in item && item.popular && (
                                <span className="text-[10px] font-bold text-white bg-[#E9204F] px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">
                                  Popular
                                </span>
                              )}
                            </span>
                            {'subtext' in item && item.subtext && (
                              <span className="text-[13px] text-gray-400 leading-tight">
                                {(item.subtext as string).split('·').map((part, i, arr) => (
                                  <span key={i}>
                                    {part.trim()}
                                    {i < arr.length - 1 && (
                                      <span className="text-[#E9204F] mx-1">·</span>
                                    )}
                                  </span>
                                ))}
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
          </div>
        </div>
      </div>

      {/* ── Resources mega menu panel ── */}
      <div
        className={`absolute inset-x-0 top-full hidden lg:block transition-all duration-200 origin-top ${
          resourcesOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={openResources}
        onMouseLeave={scheduleCloseResources}
      >
        <div className="max-w-7xl mx-auto px-4 pb-3">
          <div className="bg-[#FAF8F5] rounded-2xl border border-gray-200 shadow-2xl px-8 py-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              {isGerman ? 'Ressourcen' : 'Resources'}
            </p>
            <div className="flex gap-10">
              {/* Content columns */}
              <div className="grid grid-cols-2 gap-10 flex-1">
                {resourcesData.columns.map((col) => {
                  const Icon = col.icon
                  return (
                    <div key={col.title} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] flex items-center justify-center">
                          <Icon size={26} className="text-[#E9204F]" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{col.title}</p>
                          <p className="text-sm text-gray-500 mt-1 leading-snug">{col.description}</p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-200" />
                      <ul className="flex flex-col gap-2.5">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-2 text-[15px] text-gray-600 hover:text-[#E9204F] transition-colors group"
                              onClick={() => setResourcesOpen(false)}
                            >
                              <span className="group-hover:underline">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              {/* Featured card */}
              <div className="w-72 shrink-0">
                <Link
                  href={resourcesData.featured.href}
                  onClick={() => setResourcesOpen(false)}
                  className="group flex flex-col h-full bg-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col gap-4 p-7 flex-1">
                    <span className="text-xs font-bold text-[#E9204F] uppercase tracking-widest">
                      {resourcesData.featured.label}
                    </span>
                    <div>
                      <p className="text-2xl font-bold text-white leading-tight">
                        {resourcesData.featured.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-2 leading-snug">
                        {resourcesData.featured.subtitle}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <span className="inline-block bg-[#E9204F] text-white text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-full group-hover:bg-[#d01a44] transition-colors">
                        {resourcesData.featured.cta}
                      </span>
                    </div>
                  </div>
                  {/* Decorative bottom strip */}
                  <div className="h-2 bg-[#E9204F]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            if (link.label === 'Services') {
              return (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-black py-2"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    {link.label}
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 pb-2 space-y-5">
                      {servicesData.map((col) => {
                        const Icon = col.icon
                        return (
                          <div key={col.title}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-lg bg-[#FFF0F3] flex items-center justify-center">
                                <Icon size={14} className="text-[#E9204F]" />
                              </div>
                              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">{col.title}</p>
                            </div>
                            <ul className="space-y-2 pl-9">
                              {col.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    className="flex flex-col gap-0.5 text-sm text-gray-600 hover:text-[#E9204F] transition-colors"
                                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false) }}
                                  >
                                    <span className="flex items-center gap-2">
                                      {item.label}
                                      {'popular' in item && item.popular && (
                                        <span className="text-[10px] font-bold text-white bg-[#E9204F] px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">
                                          Popular
                                        </span>
                                      )}
                                    </span>
                                    {'subtext' in item && item.subtext && (
                                      <span className="text-[13px] text-gray-400 leading-tight">
                                        {(item.subtext as string).split('·').map((part, i, arr) => (
                                          <span key={i}>
                                            {part.trim()}
                                            {i < arr.length - 1 && (
                                              <span className="text-[#E9204F] mx-1">·</span>
                                            )}
                                          </span>
                                        ))}
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

            if (link.label === 'Resources') {
              return (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-black py-2"
                    onClick={() => setMobileResourcesOpen((v) => !v)}
                  >
                    {link.label}
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {mobileResourcesOpen && (
                    <div className="pl-4 pb-2 space-y-5">
                      {resourcesData.columns.map((col) => {
                        const Icon = col.icon
                        return (
                          <div key={col.title}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-lg bg-[#FFF0F3] flex items-center justify-center">
                                <Icon size={14} className="text-[#E9204F]" />
                              </div>
                              <p className="text-xs font-bold text-gray-800 uppercase tracking-wide">{col.title}</p>
                            </div>
                            <ul className="space-y-2 pl-9">
                              {col.items.map((item) => (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-600 hover:text-[#E9204F] transition-colors block"
                                    onClick={() => { setMobileOpen(false); setMobileResourcesOpen(false) }}
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                      {/* Featured guide link in mobile */}
                      <Link
                        href={resourcesData.featured.href}
                        className="flex items-center gap-2 text-sm font-semibold text-[#E9204F] pl-0"
                        onClick={() => { setMobileOpen(false); setMobileResourcesOpen(false) }}
                      >
                        ↓ {resourcesData.featured.cta}
                      </Link>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="block text-sm font-semibold text-gray-700 hover:text-black py-2"
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
              CONTACT US
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
