import Image from "next/image";
import { ShieldCheck, Heart, Zap, Lock } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, label: "Transparent" },
  { icon: Heart, label: "Client-First" },
  { icon: Zap, label: "Fast Approvals" },
  { icon: Lock, label: "Secure & Trusted" },
];

// ✅ Save these 3 images in: public/about/
// 1) public/about/office-building.jpg
// 2) public/about/partnership.jpg
// 3) public/about/growth-chart.jpg
const defaultImages = [
  { src: "/about/office-building.jpg", alt: "FinBud Office Building" },
  { src: "/about/partnership.jpg", alt: "Trusted Partnerships" },
  { src: "/about/growth-chart.jpg", alt: "Financial Growth" },
];

export default function AboutSection({ settings }: { settings: any }) {
  const about = settings?.about ?? {};

  // Optional: if you later store custom images in settings, you can use these:
  const img1 = about?.image1 || defaultImages[0].src;
  const img2 = about?.image2 || defaultImages[1].src;
  const img3 = about?.image3 || defaultImages[2].src;

  return (
    <section
      id="about"
      className="py-24 px-6 lg:px-20"
      style={{ background: "#F8FAFF" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Images + Video */}
        <div className="mt-10 lg:mt-16">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            {/* Big Left Image */}
            <div
              className="rounded-2xl row-span-2 overflow-hidden shadow-brand-sm relative"
              style={{ minHeight: 280 }}
            >
              <Image
                src={img1}
                alt={defaultImages[0].alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
              {/* subtle overlay for premium look */}
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Top Right Image */}
            <div
              className="rounded-2xl overflow-hidden shadow-brand-sm relative"
              style={{ minHeight: 130 }}
            >
              <Image
                src={img2}
                alt={defaultImages[1].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Bottom Right Image */}
            <div
              className="rounded-2xl overflow-hidden shadow-brand-sm relative"
              style={{ minHeight: 130 }}
            >
              <Image
                src={img3}
                alt={defaultImages[2].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* ✅ Introduction Video */}
          <div className="mt-6 rounded-2xl overflow-hidden shadow-brand-sm border border-black/10 bg-white">
            <video
              controls
              preload="metadata"
              className="w-full h-auto"
              poster="/about/intro-poster.jpg"
            >
              <source src="/about/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Optional small caption bar */}
            <div className="px-4 py-3 text-sm font-semibold text-[#0A1628] bg-white">
              FinBud Financial — Introduction Video
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-0.5 rounded-full bg-[#F4A524]" />
            <span className="text-xs font-bold tracking-[2.5px] uppercase text-[#1B4FD8]">
              Who We Are
            </span>
          </div>

          <h2 className="font-display font-black text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-6 whitespace-pre-line">
            {about.heading || "A Trusted Name in\nFinancial Services"}
          </h2>

          <p className="text-gray-500 leading-relaxed mb-4">
            <strong className="text-[#0A1628]">FinBud Financial</strong> is a
            dedicated sub-initiative of{" "}
            <a
              href="https://www.financebuddha.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B4FD8] font-semibold"
            >
              Finance Buddha
            </a>{" "}
            — one of India's most trusted loan advisory platforms. We carry the
            same commitment to transparency and client-first values in every
            interaction.
          </p>

          <p className="text-gray-500 leading-relaxed mb-4">
            {about.body ||
              "Our mission is simple: make financial products accessible, understandable, and actionable for every Indian. We work closely with leading banks and NBFCs to offer competitive loan options tailored to your unique needs."}
          </p>

          <p className="text-gray-500 leading-relaxed mb-8">
            Whether you're planning your dream home, expanding your business, or
            managing personal expenses — FinBud Financial is your dedicated
            financial companion every step of the way.
          </p>

          {/* Pillars */}
          <div className="flex flex-wrap gap-3 mb-8">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-[#1B4FD8] shadow-brand-sm"
              >
                <Icon size={14} className="text-[#F4A524]" />
                {label}
              </div>
            ))}
          </div>

          <a
            href="https://www.financebuddha.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg,#F4A524,#FFD166)",
              color: "#0A1628",
              boxShadow: "0 4px 20px rgba(244,165,36,0.35)",
            }}
          >
            Visit Finance Buddha →
          </a>
        </div>
      </div>
    </section>
  );
}