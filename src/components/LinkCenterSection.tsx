import Image from 'next/image'
import Link from 'next/link'

const ui = {
  en: {
    badge: '✦ New Version Live',
    heading: 'Build Backlinks with Our Link Center',
    feature1Title: 'High-Quality Backlinks, Chosen by You.',
    feature1Text: 'Find websites that match your niche, language, and quality level. Then place orders in a few clicks. No vague packages. No guessing.',
    feature2Title: 'The Cheapest Prices, Guaranteed!',
    feature2Text: 'Buy backlinks from our over 10,000 partner websites, and enjoy the best prices on the market.',
    cta: 'SIGN UP FREE',
    ctaHref: 'https://app.blogtec.io/register/',
  },
  de: {
    badge: '✦ Neue Version live',
    heading: 'Backlinks aufbauen mit unserem Link Center',
    feature1Title: 'Hochwertige Backlinks, von dir ausgewählt.',
    feature1Text: 'Finde Websites, die zu deiner Nische, Sprache und Qualitätsstufe passen. Dann bestelle in wenigen Klicks. Keine vagen Pakete. Kein Rätselraten.',
    feature2Title: 'Die günstigsten Preise – garantiert!',
    feature2Text: 'Kaufe Backlinks von unseren über 10.000 Partnerwebsites und genieße die besten Preise auf dem Markt.',
    cta: 'KOSTENLOS REGISTRIEREN',
    ctaHref: 'https://app.blogtec.io/register/',
  },
}

export default function LinkCenterSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const t = ui[locale]

  return (
    <section id="link-center" className="bg-[#F5EFE8] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-block bg-[#E9204F] text-white text-xs font-bold px-3 py-1.5 rounded-pill mb-5">
              {t.badge}
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-black leading-tight mb-6">
              {t.heading}
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-black text-black mb-2">
                  {t.feature1Title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.feature1Text}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-black mb-2">
                  {t.feature2Title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.feature2Text}
                </p>
              </div>
            </div>

            <Link
              href={t.ctaHref}
              className="inline-block bg-[#E9204F] text-white rounded-pill px-8 py-4 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors"
            >
              {t.cta}
            </Link>
          </div>

          {/* Right: Link Center screenshot */}
          <div>
            <Image
              src="/images/link-center-screenshot.png"
              alt="Blogtec Link Center"
              width={620}
              height={430}
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
