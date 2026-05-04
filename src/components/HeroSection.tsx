import Image from 'next/image'
import Link from 'next/link'

const ui = {
  en: {
    badge: '✦ New: Design & Development',
    heading1: 'Marketing Services,',
    heading2: 'Easily Outsourced.',
    subheading: 'SEO, Google Ads, Design & Development services with excellent flexibility and reliability.',
    signUp: 'SIGN UP FREE',
    consultation: 'BOOK CONSULTATION',
    signUpHref: 'https://app.blogtec.io/register/',
    consultationHref: '/consultation',
  },
  de: {
    badge: '✦ Neu: Design & Entwicklung',
    heading1: 'Marketing-Leistungen,',
    heading2: 'einfach ausgelagert.',
    subheading: 'SEO, Google Ads, Design & Entwicklung – mit hervorragender Flexibilität und Zuverlässigkeit.',
    signUp: 'KOSTENLOS REGISTRIEREN',
    consultation: 'BERATUNG BUCHEN',
    signUpHref: 'https://app.blogtec.io/register/',
    consultationHref: '/de/consultation',
  },
}

export default function HeroSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const t = ui[locale]

  return (
    <section className="bg-[#F5EFE8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="space-y-6">
          <span className="inline-block bg-white text-[#E9204F] text-xs font-bold px-3 py-1.5 rounded-pill border border-red-100 shadow-sm">
            {t.badge}
          </span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-[1.08] tracking-tight">
            {t.heading1}{' '}
            <span className="block">{t.heading2}</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-md leading-relaxed">
            {t.subheading}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={t.signUpHref}
              className="bg-[#E9204F] text-white rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors shadow-lg"
            >
              {t.signUp}
            </Link>
            <Link
              href={t.consultationHref}
              className="border border-black text-black rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-white/50 transition-colors"
            >
              {t.consultation}
            </Link>
          </div>
        </div>

        {/* Right: real app screenshot + blob */}
        <div className="relative hidden lg:block h-[460px]">
          {/* Blob background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/Laptop-blob-2023.svg"
              alt=""
              width={500}
              height={480}
              className="w-full max-w-[500px] opacity-50"
              aria-hidden
            />
          </div>

          {/* Floating badges */}
          <div className="absolute top-4 right-16 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 z-20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold">TW</div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Writer</span>
          </div>
          <div className="absolute top-1/3 -right-2 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 z-20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 flex items-center justify-center text-white text-[10px] font-bold">DS</div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Designer</span>
          </div>
          <div className="absolute bottom-8 left-2 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 z-20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-red-400 flex items-center justify-center text-white text-[10px] font-bold">SE</div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">SEO Expert</span>
          </div>

          {/* App screenshot */}
          <div className="relative z-10 mt-6 ml-6">
            <Image
              src="/images/Blogtec-App.webp"
              alt="Blogtec Platform"
              width={560}
              height={380}
              className="rounded-3xl shadow-2xl w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
