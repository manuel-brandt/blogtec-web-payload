import Image from 'next/image'
import Link from 'next/link'

const resources = {
  en: [
    {
      type: 'Case Study',
      title: 'Top 3 Positions for Local Pest Controller',
      href: '/case-studies/pest-controller',
      color: 'bg-orange-100 text-orange-700',
      image: '/images/resources/pest-controller.jpg',
    },
    {
      type: 'Guide',
      title: 'How to Offer SEO with White Label Services',
      href: '/guides/white-label-seo',
      color: 'bg-blue-100 text-blue-700',
      image: '/images/resources/white-label-guide.jpg',
    },
    {
      type: 'Case Study',
      title: '+30,000 Visitors for Online Shop',
      href: '/case-studies/online-shop',
      color: 'bg-orange-100 text-orange-700',
      image: '/images/resources/online-shop.jpg',
    },
    {
      type: 'Video',
      title: 'Blogtec Introduction for Agencies',
      href: '/resources/intro-video',
      color: 'bg-red-100 text-red-700',
      image: '/images/resources/intro-video.jpg',
    },
    {
      type: 'Blog Article',
      title: 'Guide on GEO & The Future of SEO',
      href: '/blog/geo-future-of-seo',
      color: 'bg-green-100 text-green-700',
      image: '/images/resources/geo-guide.jpg',
    },
  ],
  de: [
    {
      type: 'Fallstudie',
      title: 'Top-3-Positionen für lokalen Schädlingsbekämpfer',
      href: '/de/case-studies/pest-controller',
      color: 'bg-orange-100 text-orange-700',
      image: '/images/resources/pest-controller.jpg',
    },
    {
      type: 'Leitfaden',
      title: 'SEO-Leistungen mit White-Label-Services anbieten',
      href: '/de/guides/white-label-seo',
      color: 'bg-blue-100 text-blue-700',
      image: '/images/resources/white-label-guide.jpg',
    },
    {
      type: 'Fallstudie',
      title: '+30.000 Besucher für Online-Shop',
      href: '/de/case-studies/online-shop',
      color: 'bg-orange-100 text-orange-700',
      image: '/images/resources/online-shop.jpg',
    },
    {
      type: 'Video',
      title: 'Blogtec-Einführung für Agenturen',
      href: '/de/resources/intro-video',
      color: 'bg-red-100 text-red-700',
      image: '/images/resources/intro-video.jpg',
    },
    {
      type: 'Blogartikel',
      title: 'Leitfaden zu GEO & die Zukunft der SEO',
      href: '/de/blog/geo-future-of-seo',
      color: 'bg-green-100 text-green-700',
      image: '/images/resources/geo-guide.jpg',
    },
  ],
}

const ui = {
  en: {
    heading: 'Discover Our Resources',
    subheading: 'Guides, case studies, and insights to help you grow',
    learnMore: 'Learn More ➜',
  },
  de: {
    heading: 'Entdecke unsere Ressourcen',
    subheading: 'Leitfäden, Fallstudien und Insights für dein Wachstum',
    learnMore: 'Mehr erfahren ➜',
  },
}

export default function ResourcesSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const t = ui[locale]
  const items = resources[locale]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-black text-black text-center mb-4">
          {t.heading}
        </h2>
        <p className="text-gray-500 text-center mb-12">
          {t.subheading}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {items.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-[#E9204F] transition-all flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <span className={`inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full w-fit ${r.color}`}>
                  {r.type}
                </span>
                <h3 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-[#E9204F] transition-colors">
                  {r.title}
                </h3>
                <span className="text-[#E9204F] text-sm font-medium mt-auto">
                  {t.learnMore}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
