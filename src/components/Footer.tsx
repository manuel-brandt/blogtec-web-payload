import Link from "next/link";

const footerLinks = {
  Leistungen: [
    { label: "SEO-Texte", href: "/leistungen/seo-texte" },
    { label: "Backlinks", href: "/link-center" },
    { label: "Website-Design", href: "/leistungen/website-design" },
    { label: "Google Ads", href: "/leistungen/google-ads" },
    { label: "Technisches SEO", href: "/leistungen/technisches-seo" },
  ],
  Unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "White Label", href: "/white-label" },
    { label: "Ressourcen", href: "/ressourcen" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Kunden-Login", href: "/login" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "FAQ", href: "/faq" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Impressum", href: "/impressum" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#E9204F] rounded-full flex items-center justify-center">
                <span className="text-white text-base">🚀</span>
              </div>
              <span className="text-xl font-black text-white">Blogtec</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Marketing Leistungen, einfach ausgelagert. SEO, Backlinks,
              Content und mehr.
            </p>
            <div className="flex gap-3">
              {["LinkedIn", "Instagram", "YouTube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-bold text-white text-sm mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Blogtec GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
