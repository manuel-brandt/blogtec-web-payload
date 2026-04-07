interface Stat {
  value: string;
  label: string;
}

interface Props {
  data?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "5.000+", label: "Bestellungen" },
  { value: "4.6/5", label: "Ø Bewertung" },
  { value: "300+", label: "Agenturen & Teams" },
  { value: "10+", label: "Sprachen" },
];

export default function StatsBar({ data }: Props) {
  const stats = data && data.length > 0 ? data : defaultStats;

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-3xl lg:text-4xl font-black text-black">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
