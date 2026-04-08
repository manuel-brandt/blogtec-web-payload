const defaultStats = [
  { value: '5,000+', label: 'Orders' },
  { value: '4.6/5', label: 'Average Review' },
  { value: '300+', label: 'Agencies & Teams' },
  { value: '10+', label: 'Languages' },
]

export default function StatsBar() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {defaultStats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-3xl lg:text-4xl font-black text-black">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
