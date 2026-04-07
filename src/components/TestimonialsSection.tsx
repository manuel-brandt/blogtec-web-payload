"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  initials?: string;
  color?: string;
}

interface Props {
  data?: Testimonial[];
}

const COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
];

const defaultTestimonials: Testimonial[] = [
  {
    name: "Marcus Rothermel",
    role: "Agenturinhaber",
    company: "Kivi Studio",
    initials: "MR",
    color: "bg-blue-500",
    text: "Ich kann den Service und die Qualität nur jedem empfehlen. Wir haben oft mit verschiedenen Branchen und Zielgruppen zu tun und die Redakteure verstehen immer sofort sich in die Leser hineinzuversetzen. Das spiegelt sich auch in der organischen Sichtbarkeit in unseren Projekten wieder.",
  },
  {
    name: "Cynthia Pucheanu",
    role: "Marketing Manager",
    company: "Trimble",
    initials: "CP",
    color: "bg-purple-500",
    text: "Das Preis-Leistungs-Verhältnis ist hervorragend und macht ihre Leistungen zu einer sehr guten Investition. Sie liefern Text und Links, die gezielt auf die Verbesserung der organischen Performance ausgerichtet sind und behalten dabei stets unsere KPIs im Blick.",
  },
  {
    name: "Joachim Mahr",
    role: "Agenturinhaber",
    company: "Jomox Media",
    initials: "JM",
    color: "bg-green-500",
    text: "Von Anfang an wurde ich herzlich und professionell behandelt. Die Qualität der Arbeit ist herausragend und übertraf meine Erwartungen bei weitem. Besonders beeindruckt hat mich die Liebe zum Detail und die freundliche Art des Teams.",
  },
  {
    name: "Marcel Speckmann",
    role: "Agenturinhaber",
    company: "Speckmann Webdesign",
    initials: "MS",
    color: "bg-orange-500",
    text: "Ich bin sehr zufrieden mit Blogtec, weil Blogtec einen sehr hohen Serviceanspruch hat, die Texte sehr gut geschrieben sind und meine Kunden gute Rankings aufbauen. Ich kann jeder Agentur, die überlegt SEO auszulagern, Blogtec nur empfehlen.",
  },
  {
    name: "Sara Nikoletti",
    role: "SEO Manager",
    company: "BioTechUSA",
    initials: "SN",
    color: "bg-pink-500",
    text: "Wir arbeiten seit Jahren mit Blogtec zusammen, um SEO-Texte zu erstellen und Backlinks aufzubauen. Sie schicken uns immer qualitativ hochwertige Texte, sind immer pünktlich und sehr flexibel. Ich bin sehr froh, dass ich sie gefunden habe.",
  },
  {
    name: "Nico Winter",
    role: "Agenturinhaber",
    company: "Webmarketiere",
    initials: "NW",
    color: "bg-indigo-500",
    text: "Ich hatte und habe weiterhin das große Vergnügen, mit Blogtec an mehreren bedeutenden Projekten zusammenzuarbeiten, und war von Anfang an tief beeindruckt. Ihre außerordentliche Zuverlässigkeit und die herausragende Qualität ihrer Ergebnisse haben mich vollständig überzeugt.",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialsSection({ data }: Props) {
  const testimonials = data && data.length > 0 ? data : defaultTestimonials;
  const [startIndex, setStartIndex] = useState(0);
  const visible = 3;

  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setStartIndex((prev) => Math.min(testimonials.length - visible, prev + 1));

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + visible);

  return (
    <section className="bg-[#F5EFE8] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-black text-black text-center mb-12">
          Was andere Kunden sagen
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((t, idx) => {
            const initials = t.initials ?? getInitials(t.name);
            const color = t.color ?? COLORS[idx % COLORS.length];
            return (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#F9E90A] text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div
                    className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">{t.name}</p>
                    <p className="text-xs text-gray-500">
                      {t.role} – {t.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex >= testimonials.length - visible}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
