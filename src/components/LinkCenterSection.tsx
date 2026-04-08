import Image from 'next/image'
import Link from 'next/link'

export default function LinkCenterSection() {
  return (
    <section id="link-center" className="bg-[#F5EFE8] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-block bg-[#E9204F] text-white text-xs font-bold px-3 py-1.5 rounded-pill mb-5">
              ✦ New Version Live
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-black leading-tight mb-6">
              Build Backlinks with Our Link Center
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-black text-black mb-2">
                  High-Quality Backlinks, Chosen by You.
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find websites that match your niche, language, and quality level. Then place
                  orders in a few clicks. No vague packages. No guessing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-black mb-2">
                  The Cheapest Prices, Guaranteed!
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Buy backlinks from our over 10,000 partner websites, and enjoy the best prices
                  on the market.
                </p>
              </div>
            </div>

            <Link
              href="https://app.blogtec.io/register/"
              className="inline-block bg-[#E9204F] text-white rounded-pill px-8 py-4 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors"
            >
              SIGN UP FREE
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
