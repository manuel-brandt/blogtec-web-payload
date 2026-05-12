const stats = {
  en: [
    { icon: '📦', value: '5,000+', label: 'Orders' },
    { icon: '⭐', value: '4.6/5', label: 'Average Review' },
    { icon: '🏢', value: '300+', label: 'Agencies & Teams' },
    { icon: '🌍', value: '10+', label: 'Languages' },
  ],
  de: [
    { icon: '📦', value: '5.000+', label: 'Bestellungen' },
    { icon: '⭐', value: '4,6/5', label: 'Ø Bewertung' },
    { icon: '🏢', value: '300+', label: 'Agenturen & Teams' },
    { icon: '🌍', value: '10+', label: 'Sprachen' },
  ],
}

export default function StatsBar({ locale = 'en' }: { locale?: 'en' | 'de' }) {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats[locale].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-3xl lg:text-4xl font-black text-black">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
