import Image from 'next/image'
import Link from 'next/link'

const HERO_IMAGES = {
  app: 'https://blogtec.io/wp-content/uploads/2026/03/Blogtec-App-1536x962.webp',
  writer: 'https://blogtec.io/wp-content/uploads/2025/11/texter.png',
  seoExpert: 'https://blogtec.io/wp-content/uploads/2025/11/seo-experte.png',
  designer: 'https://blogtec.io/wp-content/uploads/2025/11/Group-203.png',
  createProject: 'https://blogtec.io/wp-content/uploads/2022/12/create-a-project-asset-1-min.png',
  productsWidget: 'https://blogtec.io/wp-content/uploads/2025/11/Products-widget.png',
}

const ui = {
  en: {
    heading1: 'SEO Services,',
    heading2: 'Easily Outsourced.',
    subheading:
      'SEO, backlinks, Google Ads, and web design with excellent flexibility and reliability. Tailored to agencies and marketing teams.',
    signUp: 'SIGN UP FREE',
    signUpHref: 'https://app.blogtec.io/register/',
  },
  de: {
    heading1: 'SEO-Leistungen,',
    heading2: 'einfach ausgelagert.',
    subheading:
      'SEO, Backlinks, Google Ads und Webdesign – mit hervorragender Flexibilität und Zuverlässigkeit. Maßgeschneidert für Agenturen und Marketing-Teams.',
    signUp: 'KOSTENLOS REGISTRIEREN',
    signUpHref: 'https://app.blogtec.io/register/',
  },
}

export default function HeroSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const t = ui[locale]

  return (
    <section className="bg-[#F5EFE8] overflow-hidden rounded-b-[48px]">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: copy */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-black leading-[1.05] tracking-tight">
            {t.heading1}
            <span className="block">{t.heading2}</span>
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-sm leading-relaxed">
            {t.subheading}
          </p>
          <div className="pt-1">
            <Link
              href={t.signUpHref}
              className="inline-block bg-[#E9204F] text-white rounded-full px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors"
            >
              {t.signUp}
            </Link>
          </div>
        </div>

        {/* Right: app screenshot + floating elements */}
        <div className="relative hidden lg:flex items-center justify-center h-[500px]">

          {/* Main app screenshot */}
          <div className="relative z-10 w-full max-w-[560px]">
            <Image
              src={HERO_IMAGES.app}
              alt="Blogtec Platform"
              width={1536}
              height={962}
              className="rounded-2xl shadow-2xl w-full"
              priority
            />
          </div>

          {/* WRITER badge — top center */}
          <div className="absolute top-2 left-1/2 -translate-x-8 z-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2.5">
            <Image src={HERO_IMAGES.writer} alt="Writer" width={36} height={36} className="rounded-full object-cover w-9 h-9" />
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Writer</span>
          </div>

          {/* CREATE PROJECT badge — middle left, overlapping laptop edge */}
          <div className="absolute left-0 top-[42%] z-20">
            <Image src={HERO_IMAGES.createProject} alt="Create Project" width={180} height={48} className="drop-shadow-xl" />
          </div>

          {/* SEO EXPERT badge — bottom left */}
          <div className="absolute bottom-8 left-4 z-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2.5">
            <Image src={HERO_IMAGES.seoExpert} alt="SEO Expert" width={36} height={36} className="rounded-full object-cover w-9 h-9" />
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">SEO Expert</span>
          </div>

          {/* DESIGNER badge — right side */}
          <div className="absolute right-0 top-[30%] z-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2.5">
            <Image src={HERO_IMAGES.designer} alt="Designer" width={36} height={36} className="rounded-full object-cover w-9 h-9" />
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Designer</span>
          </div>

          {/* Products widget — bottom right corner */}
          <div className="absolute bottom-4 right-0 z-20">
            <Image src={HERO_IMAGES.productsWidget} alt="Products" width={180} height={130} className="drop-shadow-xl" />
          </div>
        </div>

      </div>
    </section>
  )
}
