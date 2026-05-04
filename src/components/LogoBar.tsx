import Image from 'next/image'

const logos = [
  { name: 'Wise', src: '/images/wise.svg', width: 80, height: 20, badge: null },
  { name: 'BioTechUSA', src: '/images/biotech.svg', width: 100, height: 26, badge: 'case-study' },
  { name: 'Typology', src: '/images/typology.svg', width: 95, height: 24, badge: 'case-study' },
  { name: 'SE Ranking', src: '/images/se-ranking.svg', width: 105, height: 24, badge: null },
  { name: 'Recruitee', src: '/images/recruitee.svg', width: 95, height: 22, badge: null },
  { name: 'FOCUS MAGAZIN', src: '/images/focus-magazin.svg', width: 115, height: 20, badge: null },
]

const ui = {
  en: { tagline: 'Trusted by', highlight: '300+ Agencies & Teams', caseStudy: 'Case Study' },
  de: { tagline: 'Vertraut von über', highlight: '300 Agenturen & Teams', caseStudy: 'Fallstudie' },
}

export default function LogoBar({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const t = ui[locale]

  return (
    <section className="bg-[#F5EFE8] border-t border-[#e8e0d8] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-600 text-sm mb-8">
          {t.tagline} <strong>{t.highlight}</strong>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {logos.map((logo) => (
            <div key={logo.name} className="flex flex-col items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
              {logo.badge === 'case-study' && (
                <span className="text-[10px] text-gray-500 border border-gray-300 rounded px-1.5 py-0.5 uppercase tracking-wide">
                  {t.caseStudy}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
