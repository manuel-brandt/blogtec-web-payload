import Link from 'next/link'

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-gray-700">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span>{text}</span>
    </li>
  )
}

const ui = {
  en: {
    heading: 'Outsourcing Has Never Been Easier',
    subheading: 'Get backlinks, content, or other services done — without having to grow your team.',
    signUp: 'SIGN UP FREE',
    signUpHref: 'https://app.blogtec.io/register/',
    featureGroups: [
      {
        title: 'Reliable Service & Quality',
        items: [
          'Get a Dedicated Contact Person',
          'Services Can Be Adapted to Your Needs',
          'Constant Quality in Various Niches & Languages',
        ],
      },
      {
        title: 'No Contracts or Minimums',
        items: [
          'Monthly Packages from €250/Month',
          'Flexible Single Services',
          'Cancel Any Time',
        ],
      },
      {
        title: 'Optimized for Agencies',
        items: [
          'Request FREE Strategies for Clients',
          'Get Everything White Label',
        ],
      },
    ],
    wlHeading: 'Reliable Outsourcing with a White Label Partner',
    wlBody: 'Add more services to your portfolio or become more flexible and focused if you already offer them.',
    wlItems: [
      'Get a reliable partner while staying flexible.',
      'Everything right in your branding.',
      'Unlimited free SEO strategies for your clients.',
    ],
    wlCta: 'LEARN MORE',
    wlCtaHref: '/white-label',
    testimonialQuote: 'I have had the pleasure of working with Blogtec on several projects, and from the very beginning, I was thoroughly impressed. Their reliability and the high quality of their results have consistently convinced me of their excellence. The entire process is exceptionally well-structured, ensuring everything runs smoothly and efficiently.',
    testimonialRole: 'Agency Owner, Webmarketiere',
  },
  de: {
    heading: 'Outsourcing war noch nie so einfach',
    subheading: 'Lass Backlinks, Content und andere Leistungen erledigen – ohne dein Team vergrößern zu müssen.',
    signUp: 'KOSTENLOS REGISTRIEREN',
    signUpHref: 'https://app.blogtec.io/register/',
    featureGroups: [
      {
        title: 'Zuverlässiger Service & Qualität',
        items: [
          'Dein persönlicher Ansprechpartner',
          'Leistungen individuell anpassbar',
          'Gleichbleibende Qualität in verschiedenen Nischen & Sprachen',
        ],
      },
      {
        title: 'Keine Verträge oder Mindestbestellwerte',
        items: [
          'Monatliche Pakete ab 250 €/Monat',
          'Flexible Einzelleistungen',
          'Jederzeit kündbar',
        ],
      },
      {
        title: 'Optimiert für Agenturen',
        items: [
          'Kostenlose Strategien für Kunden anfordern',
          'Alles als White Label verfügbar',
        ],
      },
    ],
    wlHeading: 'Zuverlässiges Outsourcing mit einem White-Label-Partner',
    wlBody: 'Erweitere dein Portfolio oder werde flexibler und fokussierter, wenn du bereits entsprechende Leistungen anbietest.',
    wlItems: [
      'Ein zuverlässiger Partner – mit maximaler Flexibilität.',
      'Alles in deinem Branding.',
      'Unbegrenzte kostenlose SEO-Strategien für deine Kunden.',
    ],
    wlCta: 'MEHR ERFAHREN',
    wlCtaHref: '/de/white-label',
    testimonialQuote: 'Ich hatte das Vergnügen, mit Blogtec an mehreren Projekten zusammenzuarbeiten, und war von Anfang an sehr beeindruckt. Die Zuverlässigkeit und die hohe Qualität der Ergebnisse haben mich stets überzeugt. Der gesamte Prozess ist hervorragend strukturiert und läuft reibungslos und effizient.',
    testimonialRole: 'Agenturinhaber, Webmarketiere',
  },
}

export default function OutsourcingSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const t = ui[locale]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: outsourcing benefits */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-black mb-4">
              {t.heading}
            </h2>
            <p className="text-gray-500 mb-8">
              {t.subheading}
            </p>
            <Link
              href={t.signUpHref}
              className="inline-block bg-[#E9204F] text-white rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors mb-10"
            >
              {t.signUp}
            </Link>
            <div className="space-y-4">
              {t.featureGroups.map((group) => (
                <div key={group.title} className="bg-[#F5EFE8] rounded-2xl p-5">
                  <h3 className="font-black text-black text-base mb-3">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: White Label pitch */}
          <div>
            <span className="inline-block bg-white text-[#E9204F] text-xs font-bold px-3 py-1.5 rounded-pill mb-4 border border-red-100">
              🏷️ White Label
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-black mb-6">
              {t.wlHeading}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t.wlBody}
            </p>
            <ul className="space-y-3 mb-8">
              {t.wlItems.map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                href={t.wlCtaHref}
                className="inline-block border border-black text-black rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-gray-50 transition-colors"
              >
                {t.wlCta}
              </Link>
            </div>

            {/* Nico Winter testimonial */}
            <div className="mt-10 bg-[#F5EFE8] rounded-3xl p-7">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-5 italic text-sm">
                &ldquo;{t.testimonialQuote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  NW
                </div>
                <div>
                  <p className="font-bold text-black text-sm">Nico Winter</p>
                  <p className="text-xs text-gray-500">{t.testimonialRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
