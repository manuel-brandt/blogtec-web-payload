'use client'

import { useState } from 'react'

const tabs = {
  en: [
    {
      label: 'Managed Content',
      items: [
        { title: 'Managed SEO', href: '/services/managed-seo' },
        { title: 'Managed Google Ads', href: '/services/managed-google-ads' },
        { title: 'Managed SEO Content', href: '/services/managed-seo-content' },
        { title: 'Managed Backlinks', href: '/services/managed-backlinks' },
      ],
    },
    {
      label: 'SEO',
      items: [
        { title: 'SEO Content', href: '/services/seo-content' },
        { title: 'SEO Translation', href: '/services/seo-translation' },
        { title: 'Content Optimization', href: '/services/content-optimization' },
        { title: 'SEO & GEO Audit', href: '/services/seo-audit' },
        { title: 'Technical SEO', href: '/services/technical-seo' },
        { title: 'Keyword Research', href: '/services/keyword-research' },
        { title: 'Content Plan', href: '/services/content-plan' },
      ],
    },
    {
      label: 'Backlinks & PR',
      items: [
        { title: 'Link Center', href: '/link-center' },
        { title: 'Business Directories', href: '/services/directories' },
        { title: 'Press Release', href: '/services/press-release' },
        { title: 'Community Links', href: '/services/community-links' },
      ],
    },
    {
      label: 'Design & Tech',
      items: [
        { title: 'Website Design', href: '/services/website-design' },
        { title: 'Design to Website', href: '/services/design-to-website' },
        { title: 'Individual Projects', href: '/services/projects' },
      ],
    },
  ],
  de: [
    {
      label: 'Managed Content',
      items: [
        { title: 'Managed SEO', href: '/de/services/managed-seo' },
        { title: 'Managed Google Ads', href: '/de/services/managed-google-ads' },
        { title: 'Managed SEO Content', href: '/de/services/managed-seo-content' },
        { title: 'Managed Backlinks', href: '/de/services/managed-backlinks' },
      ],
    },
    {
      label: 'SEO',
      items: [
        { title: 'SEO Content', href: '/de/services/seo-content' },
        { title: 'SEO-Übersetzung', href: '/de/services/seo-translation' },
        { title: 'Content-Optimierung', href: '/de/services/content-optimization' },
        { title: 'SEO & GEO Audit', href: '/de/services/seo-audit' },
        { title: 'Technisches SEO', href: '/de/services/technical-seo' },
        { title: 'Keyword-Recherche', href: '/de/services/keyword-research' },
        { title: 'Content-Plan', href: '/de/services/content-plan' },
      ],
    },
    {
      label: 'Backlinks & PR',
      items: [
        { title: 'Link Center', href: '/de/link-center' },
        { title: 'Branchenverzeichnisse', href: '/de/services/directories' },
        { title: 'Pressemitteilung', href: '/de/services/press-release' },
        { title: 'Community Links', href: '/de/services/community-links' },
      ],
    },
    {
      label: 'Design & Tech',
      items: [
        { title: 'Website Design', href: '/de/services/website-design' },
        { title: 'Design zu Website', href: '/de/services/design-to-website' },
        { title: 'Individuelle Projekte', href: '/de/services/projects' },
      ],
    },
  ],
}

const ui = {
  en: {
    heading: 'We Offer A Wide Range of Services',
    subheading: 'From SEO content to link building and design — everything you need to grow online.',
    learnMore: 'Learn more',
  },
  de: {
    heading: 'Wir bieten ein breites Leistungsangebot',
    subheading: 'Von SEO-Content über Linkaufbau bis hin zu Design – alles, was du brauchst, um online zu wachsen.',
    learnMore: 'Mehr erfahren',
  },
}

export default function ServicesSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const localeTabs = tabs[locale]
  const [activeTab, setActiveTab] = useState(localeTabs[0].label)
  const activeItems = localeTabs.find((t) => t.label === activeTab)?.items ?? []
  const t = ui[locale]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-black text-black text-center mb-3">
          {t.heading}
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          {t.subheading}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {localeTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-5 py-2.5 rounded-pill text-sm font-semibold transition-all ${
                activeTab === tab.label
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeItems.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group bg-[#F5EFE8] hover:bg-[#E9204F] border border-transparent hover:border-[#E9204F] rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800 group-hover:text-white transition-colors">
                  {service.title}
                </p>
                <span className="text-gray-400 group-hover:text-white transition-colors text-lg">→</span>
              </div>
              <p className="text-sm text-[#E9204F] group-hover:text-red-100 font-medium mt-2 transition-colors">
                {t.learnMore}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
