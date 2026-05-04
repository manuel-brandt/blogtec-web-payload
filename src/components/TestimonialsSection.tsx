'use client'

import { useState } from 'react'

const testimonials = [
  {
    name: 'Marcel Speckmann',
    role: 'Agency Owner',
    roleDe: 'Agenturinhaber',
    company: 'Speckmann Webdesign',
    initials: 'MS',
    color: 'bg-orange-500',
    text: "I am very satisfied with Blogtec because they have a very high service standard. The content is very well written, and my clients achieve strong rankings. I can only recommend Blogtec to any agency considering outsourcing SEO and look forward to many more years together.",
  },
  {
    name: 'Sara Nikoletti',
    role: 'SEO Manager',
    roleDe: 'SEO Managerin',
    company: 'BioTechUSA',
    initials: 'SN',
    color: 'bg-pink-500',
    text: "We have been working with Blogtec for years on SEO content creation and link building. They always send high quality articles even though we have specific topics to write about. They are always on time and very flexible. I'm very happy to found them and really grateful for their work.",
  },
  {
    name: 'Nico Winter',
    role: 'Agency Owner',
    roleDe: 'Agenturinhaber',
    company: 'Webmarketiere',
    initials: 'NW',
    color: 'bg-indigo-500',
    text: "I had the pleasure of working with Blogtec on several projects, and from the very beginning, I was thoroughly impressed. Their reliability and the high quality of their results have consistently convinced me of their excellence. The entire process is exceptionally well-structured, ensuring everything runs smoothly and efficiently.",
  },
  {
    name: 'Joachim Mahr',
    role: 'Agency Owner',
    roleDe: 'Agenturinhaber',
    company: 'Jomox Media',
    initials: 'JM',
    color: 'bg-green-500',
    text: "I was treated warmly and professionally right from the start. The quality of the work is outstanding and far exceeded my expectations. I was particularly impressed by the attention to detail and the friendly nature of the team. If you are looking for excellent service in a pleasant atmosphere, this is the place for you!",
  },
  {
    name: 'Marcus Rothermel',
    role: 'Agency Owner',
    roleDe: 'Agenturinhaber',
    company: 'Kivi Studio',
    initials: 'MR',
    color: 'bg-blue-500',
    text: "I highly recommend the service and quality to anyone. We work with different industries and target groups, and the writers always quickly understand how to put themselves in the readers' position. This is also reflected in the organic visibility results of our projects.",
  },
  {
    name: 'Cynthia Pucheanu',
    role: 'Marketing Manager',
    roleDe: 'Marketing Managerin',
    company: 'Trimble',
    initials: 'CP',
    color: 'bg-purple-500',
    text: "The price-to-quality ratio is great, making their services a great investment. They deliver content and links that are truly geared towards improving organic performance, so always keeping our KPIs top of mind.",
  },
  {
    name: 'Marco Meneghin',
    role: 'Agency Owner',
    roleDe: 'Agenturinhaber',
    company: 'OMGroup',
    initials: 'MM',
    color: 'bg-teal-500',
    text: "We have been working with Blogtec for some time now and are truly impressed! The team's response time is incredibly fast, and collaborating with them is a real pleasure. We're especially impressed by how precisely they stick to agreed deadlines – absolutely reliable and professional.",
  },
]

const ui = {
  en: {
    heading: 'What Other Customers Say',
    subheading: 'Join 300+ agencies and teams who trust Blogtec',
  },
  de: {
    heading: 'Was andere Kunden sagen',
    subheading: 'Schließe dich 300+ Agenturen und Teams an, die Blogtec vertrauen',
  },
}

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-[#F9E90A] text-sm">★</span>
      ))}
    </div>
  )
}

export default function TestimonialsSection({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = testimonials[activeIndex]
  const t = ui[locale]

  return (
    <section className="bg-[#F5EFE8] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-black text-black text-center mb-4">
          {t.heading}
        </h2>
        <p className="text-gray-500 text-center mb-12">
          {t.subheading}
        </p>

        {/* Featured testimonial */}
        <div className="bg-white rounded-3xl p-8 mb-8 max-w-3xl mx-auto shadow-sm">
          <StarRating />
          <blockquote className="text-gray-700 text-lg leading-relaxed my-4 italic">
            &ldquo;{active.text}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${active.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
              {active.initials}
            </div>
            <div>
              <p className="font-bold text-black">{active.name}</p>
              <p className="text-sm text-gray-500">{locale === 'de' ? active.roleDe : active.role} – {active.company}</p>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActiveIndex(i)}
              className={`text-left bg-white rounded-2xl p-6 shadow-sm transition-all hover:shadow-md ${
                i === activeIndex ? 'ring-2 ring-[#E9204F]' : ''
              }`}
            >
              <StarRating />
              <p className="text-gray-600 text-sm mt-3 mb-4 line-clamp-3 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
