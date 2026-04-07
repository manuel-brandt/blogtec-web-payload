const logos = [
  { name: "Wise", display: "Wise", isCaseStudy: false, style: "font-black text-lg" },
  { name: "BioTechUSA", display: "BioTechUSA", isCaseStudy: true, style: "font-bold text-sm" },
  { name: "Typology", display: "Typology.", isCaseStudy: true, style: "font-semibold text-base" },
  { name: "SE Ranking", display: "SE Ranking", isCaseStudy: false, style: "font-bold text-sm" },
  { name: "Recruitee", display: "recruitee", isCaseStudy: false, style: "font-black text-base" },
  { name: "Focus Magazin", display: "FOCUS MAGAZIN", isCaseStudy: false, style: "font-bold text-xs tracking-widest" },
];

export default function LogoBar() {
  return (
    <section className="bg-[#F5EFE8] border-t border-[#e8e0d8] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-600 text-base mb-8">
          Geschätzt von <strong>300+ Agenturen und Teams</strong>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {logos.map((logo) => (
            <div key={logo.name} className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
              <span className={`text-gray-800 ${logo.style}`}>{logo.display}</span>
              {logo.isCaseStudy && (
                <span className="text-[10px] text-gray-500 border border-gray-300 rounded px-1.5 py-0.5 uppercase tracking-wide">
                  Case Study
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
