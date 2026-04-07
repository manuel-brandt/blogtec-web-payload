import Link from "next/link";

interface AnnouncementBarData {
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  enabled?: boolean;
}

interface Props {
  data?: AnnouncementBarData;
}

const defaults: Required<AnnouncementBarData> = {
  text: "Kaufe Backlinks günstiger denn je mit unserem Link Center",
  ctaText: "MEHR ERFAHREN",
  ctaLink: "#link-center",
  enabled: true,
};

export default function AnnouncementBar({ data }: Props) {
  const text = data?.text ?? defaults.text;
  const ctaText = data?.ctaText ?? defaults.ctaText;
  const ctaLink = data?.ctaLink ?? defaults.ctaLink;
  const enabled = data?.enabled ?? defaults.enabled;

  if (!enabled) return null;

  return (
    <div className="bg-[#1A1A1A] text-white text-center py-3 px-4 flex items-center justify-center gap-3 text-sm">
      <span className="text-[#F9E90A]">🔗</span>
      <span>{text}</span>
      <Link
        href={ctaLink}
        className="bg-[#F9E90A] text-black font-bold px-4 py-1.5 rounded-pill text-xs uppercase tracking-wide hover:bg-yellow-300 transition-colors whitespace-nowrap"
      >
        {ctaText}
      </Link>
    </div>
  );
}
