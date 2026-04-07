import Link from "next/link";

const features = [
  {
    icon: "🎯",
    title: "Transparent",
    description:
      "Hochwertige Backlinks, von dir ausgewählt. Finde Webseiten, die genau zu deiner Nische, Sprache und Qualität passen. Gib deine Bestellung mit nur wenigen Klicks auf. Keine vagen Pakete. Kein Rätselraten.",
  },
  {
    icon: "💰",
    title: "Bestpreise",
    description:
      "Die günstigsten Preise, garantiert! Kaufe Backlinks von über 10.000 Partner-Webseiten und sichere dir die garantiert besten Preise am Markt!",
  },
];

export default function LinkCenterSection() {
  return (
    <section id="link-center" className="bg-[#F5EFE8] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-[#E9204F] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-pill">
            Neue Version Live
          </span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-black text-black text-center mb-4">
          Link Center für einfachen Linkaufbau
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-black text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/link-center"
            className="bg-[#E9204F] text-white rounded-pill px-8 py-4 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors inline-block"
          >
            KOSTENLOS REGISTRIEREN
          </Link>
        </div>
      </div>
    </section>
  );
}
