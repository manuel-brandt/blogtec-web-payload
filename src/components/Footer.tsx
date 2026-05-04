'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const footerLinks = {
  en: {
    Services: [
      { label: 'SEO Content', href: '/services/seo-content' },
      { label: 'Backlinks', href: '/link-center' },
      { label: 'Website Design', href: '/services/website-design' },
      { label: 'Google Ads', href: '/services/managed-google-ads' },
      { label: 'Technical SEO', href: '/services/technical-seo' },
      { label: 'White Label', href: '/white-label' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/guides' },
    ],
    Support: [
      { label: 'Client Login', href: 'https://app.blogtec.io' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Imprint', href: '/imprint' },
    ],
  },
  de: {
    Leistungen: [
      { label: 'SEO Content', href: '/de/services/seo-content' },
      { label: 'Backlinks', href: '/de/link-center' },
      { label: 'Website Design', href: '/de/services/website-design' },
      { label: 'Google Ads', href: '/de/services/managed-google-ads' },
      { label: 'Technisches SEO', href: '/de/services/technical-seo' },
      { label: 'White Label', href: '/de/white-label' },
    ],
    Unternehmen: [
      { label: 'Über uns', href: '/de/about' },
      { label: 'Fallstudien', href: '/de/case-studies' },
      { label: 'Blog', href: '/de/blog' },
      { label: 'Leitfäden', href: '/de/guides' },
    ],
    Support: [
      { label: 'Kunden-Login', href: 'https://app.blogtec.io' },
      { label: 'Kontakt', href: '/de/contact' },
      { label: 'FAQ', href: '/de/faq' },
      { label: 'Datenschutz', href: '/de/privacy' },
      { label: 'Impressum', href: '/de/imprint' },
    ],
  },
}

const ui = {
  en: {
    tagline: 'Marketing Services, Easily Outsourced. SEO, Backlinks, Content & more.',
    privacy: 'Privacy Policy',
    privacyHref: '/privacy',
    terms: 'Terms of Service',
    termsHref: '/terms',
    imprint: 'Imprint',
    imprintHref: '/imprint',
    allRights: 'All rights reserved.',
  },
  de: {
    tagline: 'Marketing-Leistungen, einfach ausgelagert. SEO, Backlinks, Content & mehr.',
    privacy: 'Datenschutz',
    privacyHref: '/de/privacy',
    terms: 'AGB',
    termsHref: '/de/terms',
    imprint: 'Impressum',
    imprintHref: '/de/imprint',
    allRights: 'Alle Rechte vorbehalten.',
  },
}

export default function Footer() {
  const pathname = usePathname()
  const locale = pathname.startsWith('/de') ? 'de' : 'en'
  const t = ui[locale]
  const links = footerLinks[locale]

  return (
    <footer className="bg-[#0F0F0F] text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-sm leading-relaxed mb-4">
              {t.tagline}
            </p>
            <div className="flex gap-4">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/blogtec' },
                { label: 'YouTube', href: 'https://www.youtube.com/@blogtec' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="font-bold text-white text-sm mb-4">{category}</p>
              <ul className="space-y-2.5">
                {items.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Blogtec GmbH. {t.allRights}</p>
          <div className="flex gap-4">
            <Link href={t.privacyHref} className="hover:text-white transition-colors">{t.privacy}</Link>
            <Link href={t.termsHref} className="hover:text-white transition-colors">{t.terms}</Link>
            <Link href={t.imprintHref} className="hover:text-white transition-colors">{t.imprint}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
