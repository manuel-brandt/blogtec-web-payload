import Link from 'next/link'
import { BlogtecLogo } from './BlogtecLogo'

const footerLinks = {
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
}

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              <BlogtecLogo dark href="/" size={34} />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Marketing Services, Easily Outsourced. SEO, Backlinks, Content &amp; more.
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
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-bold text-white text-sm mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
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
          <p>© {new Date().getFullYear()} Blogtec GmbH. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/imprint" className="hover:text-white transition-colors">Imprint</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
