import Link from "next/link";

const benefits = [
  "Zuverlässiger Service & konstante Qualität",
  "Erhalte einen festen Ansprechpartner",
  "Leistungen anpassbar an deine Bedürfnisse",
  "Qualität in verschiedenen Branchen und Sprachen",
  "Keine Verträge oder Mindestlaufzeiten",
  "Monatliche Pakete ab 250 €/Monat",
  "Flexible Einzelleistungen",
  "Jederzeit kündbar",
];

const agencyBenefits = [
  "Gratis Strategien für deine Kunden",
  "Alles in White-Label erhältlich",
];

export default function OutsourcingSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: general outsourcing */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-black mb-8">
              Outsourcing war nie einfacher
            </h2>
            <Link
              href="/register"
              className="inline-block bg-[#E9204F] text-white rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors mb-10"
            >
              GRATIS ANMELDEN
            </Link>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: agency-specific */}
          <div>
            <p className="text-sm font-bold text-[#E9204F] uppercase tracking-widest mb-2">
              Optimiert für Agenturen
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-black mb-6">
              Zuverlässiges Outsourcing mit einem White-Label-Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Erweitere dein Portfolio oder werde flexibler und fokussierter, wenn
              du diese Leistungen bereits anbietest.
            </p>
            <ul className="space-y-3 mb-8">
              {agencyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span>Unbegrenzte kostenlose SEO-Strategien für deine Kunden.</span>
              </li>
            </ul>
            <Link
              href="/white-label"
              className="inline-block border border-black text-black rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-gray-50 transition-colors"
            >
              MEHR ERFAHREN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
