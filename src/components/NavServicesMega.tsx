'use client'

import Link from 'next/link'
import { Users, FileText, Link2, BarChart2 } from 'lucide-react'

type ServiceItem = {
  title: string
  href: string
  popular?: boolean
  subtext?: string
}

type ServiceColumn = {
  title: string
  description: string
  icon: React.ElementType
  items: ServiceItem[]
}

function getColumns(prefix: string): ServiceColumn[] {
  return [
    {
      title: 'Managed',
      description: 'Give us a budget and we make most out of it.',
      icon: Users,
      items: [
        { title: 'Managed SEO', href: `${prefix}/services/managed-seo` },
        { title: 'Managed Backlinks', href: `${prefix}/services/managed-backlinks` },
        { title: 'Managed SEO Content', href: `${prefix}/services/managed-seo-content` },
        { title: 'Managed Google Ads', href: `${prefix}/services/managed-google-ads` },
      ],
    },
    {
      title: 'Backlinks & PR',
      description: 'Various backlink options to build authority.',
      icon: Link2,
      items: [
        {
          title: 'Link Center',
          href: `${prefix}/link-center`,
          popular: true,
          subtext: 'Guest Posts · Link Insertion · Advertorials',
        },
        { title: 'Business Directories', href: `${prefix}/services/directories` },
        { title: 'Press Release', href: `${prefix}/services/press-release` },
        { title: 'Community Links', href: `${prefix}/services/community-links` },
      ],
    },
    {
      title: 'Content & Design',
      description: 'Quality content and design services from real humans.',
      icon: FileText,
      items: [
        { title: 'SEO Content', href: `${prefix}/services/seo-content`, popular: true },
        { title: 'Content Optimization', href: `${prefix}/services/content-optimization` },
        { title: 'Web Design', href: `${prefix}/services/website-design` },
      ],
    },
    {
      title: 'SEO',
      description: 'Flexible technical and keyword SEO services.',
      icon: BarChart2,
      items: [
        { title: 'SEO & GEO Audit', href: `${prefix}/services/seo-audit`, popular: true },
        { title: 'Technical SEO', href: `${prefix}/services/technical-seo` },
        { title: 'Keyword Research', href: `${prefix}/services/keyword-research` },
        { title: 'Content Plan', href: `${prefix}/services/content-plan` },
      ],
    },
  ]
}

export function NavServicesMega({ isGerman }: { isGerman: boolean }) {
  const prefix = isGerman ? '/de' : ''
  const columns = getColumns(prefix)

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[900px] max-w-[calc(100vw-2rem)] bg-[#F5EFE8] rounded-2xl shadow-xl border border-[#e8dfd4] py-8 px-8 grid grid-cols-4 gap-6">
      {columns.map((col) => {
        const Icon = col.icon
        return (
          <div key={col.title}>
            {/* Column header */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#fce8ed] flex items-center justify-center">
                <Icon size={18} className="text-[#E9204F]" />
              </div>
              <p className="font-bold text-gray-900 text-sm leading-tight">{col.title}</p>
              <p className="text-xs text-gray-500 leading-snug">{col.description}</p>
            </div>

            <div className="border-t border-[#ddd5c8] mb-3" />

            {/* Items */}
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex flex-col gap-0.5 hover:text-[#E9204F] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm text-gray-800 group-hover:text-[#E9204F] transition-colors">
                        {item.title}
                      </span>
                      {item.popular && (
                        <span className="bg-[#E9204F] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                          POPULAR
                        </span>
                      )}
                    </span>
                    {item.subtext && (
                      <span className="text-[11px] text-gray-400 leading-tight">
                        {item.subtext.split('·').map((part, i, arr) => (
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
  )
}
