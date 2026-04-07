import Link from "next/link";

interface HeroData {
  headline?: string;
  subheadline?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

interface Props {
  data?: HeroData;
}

const defaults: Required<HeroData> = {
  headline: "Marketing Leistungen, einfach ausgelagert.",
  subheadline:
    "SEO, Google-Ads, Design und Entwicklung mit hervorragender Flexibilität und Zuverlässigkeit.",
  ctaPrimaryText: "GRATIS ANMELDEN",
  ctaPrimaryLink: "/register",
  ctaSecondaryText: "BERATUNG BUCHEN",
  ctaSecondaryLink: "/beratung",
};

// Floating UI badge components for the hero illustration
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 text-sm font-semibold whitespace-nowrap ${className}`}
    >
      {children}
    </div>
  );
}

function ProductCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 min-w-[180px]">
      <p className="font-bold text-sm mb-2">Produkte</p>
      <ul className="space-y-1.5 text-sm text-gray-700">
        <li className="flex items-center gap-2">
          <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">📝</span>
          SEO-Texte
        </li>
        <li className="flex items-center gap-2">
          <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">🔗</span>
          Backlinks
        </li>
        <li className="flex items-center gap-2">
          <span className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-xs">🎨</span>
          Website-Design
        </li>
        <li className="text-[#E9204F] text-xs font-medium">Und mehr...</li>
      </ul>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        <div className="bg-gray-800 rounded-t-2xl p-3 shadow-2xl">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-400 border">
                app.blogtec.io
              </div>
            </div>
            <div className="p-4 bg-gray-50 min-h-[220px]">
              <p className="text-xs font-bold text-gray-800 mb-1">Welcome John Doe!</p>
              <p className="text-[10px] text-gray-500 mb-3">We are very happy to welcome you at Blogtec.</p>
              <p className="text-[10px] font-semibold text-gray-700 mb-2">Manage Projects</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {["Create Project", "My Projects", "Client Strategy"].map((item) => (
                  <div key={item} className="bg-white rounded-lg p-2 border shadow-sm">
                    <p className="text-[9px] font-semibold text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-2 border shadow-sm">
                <p className="text-[10px] font-bold text-gray-700 mb-1">Link Center</p>
                <div className="space-y-1">
                  {["Cheapest prices on the market, promised", "10,000+ websites to choose"].map((item) => (
                    <div key={item} className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                      <p className="text-[9px] text-gray-500 truncate">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 h-3 rounded-b-xl w-full" />
        <div className="bg-gray-600 h-1 rounded-b-xl w-3/4 mx-auto" />
      </div>

      <Badge className="absolute top-4 right-0 animate-float-slow">
        <div className="w-7 h-7 rounded-full bg-orange-200 flex items-center justify-center text-xs overflow-hidden">
          👩
        </div>
        TEXTER
      </Badge>

      <Badge className="absolute top-1/3 right-[-20px] animate-float-medium">
        <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-xs overflow-hidden">
          👨
        </div>
        DESIGNER
      </Badge>

      <Badge className="absolute bottom-1/3 left-0 bg-[#E9204F] text-white animate-float-slow">
        <span className="text-base">+</span>
        PROJEKT ERSTELLEN
      </Badge>

      <Badge className="absolute bottom-4 left-8 animate-float-medium">
        <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center text-xs overflow-hidden">
          🧑
        </div>
        SEO-EXPERTE
      </Badge>

      <div className="absolute bottom-0 right-4 animate-float-slow">
        <ProductCard />
      </div>
    </div>
  );
}

export default function HeroSection({ data }: Props) {
  const headline = data?.headline ?? defaults.headline;
  const subheadline = data?.subheadline ?? defaults.subheadline;
  const ctaPrimaryText = data?.ctaPrimaryText ?? defaults.ctaPrimaryText;
  const ctaPrimaryLink = data?.ctaPrimaryLink ?? defaults.ctaPrimaryLink;
  const ctaSecondaryText = data?.ctaSecondaryText ?? defaults.ctaSecondaryText;
  const ctaSecondaryLink = data?.ctaSecondaryLink ?? defaults.ctaSecondaryLink;

  // Split headline on comma to allow two-line rendering
  const [headlineLine1, headlineLine2] = headline.includes(",")
    ? [headline.split(",")[0] + ",", headline.split(",").slice(1).join(",").trim()]
    : [headline, ""];

  return (
    <section className="bg-[#F5EFE8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-black text-black leading-tight">
            {headlineLine1}
            {headlineLine2 && <span className="block">{headlineLine2}</span>}
          </h1>
          <p className="text-lg text-gray-700 max-w-md leading-relaxed">{subheadline}</p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={ctaPrimaryLink}
              className="bg-[#E9204F] text-white rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-[#d01a44] transition-colors"
            >
              {ctaPrimaryText}
            </Link>
            <Link
              href={ctaSecondaryLink}
              className="border border-black text-black rounded-pill px-7 py-3.5 font-bold uppercase tracking-wide text-sm hover:bg-white/50 transition-colors"
            >
              {ctaSecondaryText}
            </Link>
          </div>
        </div>

        <div className="relative h-[480px] hidden lg:block">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
