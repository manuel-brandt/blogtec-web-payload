import Link from 'next/link'

const highlights = [
  'Get backlinks, content, or other services done — without having to grow your team.',
  'Flexible single services and packages.',
  'Managed SEO service from only 500 EUR/month.',
  'Proven results in a variety of niches.',
]

export default function CtaSection() {
  return (
    <section className="bg-[#1A1A1A] text-white py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-black mb-4">
          Get Results Without Hiring More Staff
        </h2>
        <ul className="space-y-2 my-8 text-left max-w-xl mx-auto">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
              <span className="text-[#F9E90A] mt-0.5 flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/consultation"
          className="inline-block bg-[#E9204F] text-white rounded-pill px-8 py-4 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors"
        >
          BOOK FREE CONSULTATION
        </Link>
      </div>
    </section>
  )
}
