import Navbar from '@/components/sections/Navbar';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BanksSection from '@/components/sections/BanksSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

import Image from 'next/image';

export default async function HomePage() {
  // ✅ No DB: safe default content so nothing breaks
  const settings: any = {};
  const slides: any[] = [];
  const hr: any[] = [];
  const managers: any[] = [];
  const leaders: any[] = [];
  const banks: any[] = [];
  const reviews: any[] = [];

  const s = settings;

  // ✅ Family images (must exist inside /public/family)
  const familyImages = [
    { src: '/family/img1.jpg', alt: 'FinBud Family 1' },
    { src: '/family/img2.jpg', alt: 'FinBud Family 2' },
    { src: '/family/img3.jpg', alt: 'FinBud Family 3' },
    { src: '/family/img4.jpg', alt: 'FinBud Family 4' },
    { src: '/family/img5.jpg', alt: 'FinBud Family 5' },
    { src: '/family/img6.jpg', alt: 'FinBud Family 6' },
    { src: '/family/img7.jpg', alt: 'FinBud Family 7' },
    { src: '/family/img8.jpg', alt: 'FinBud Family 8' },
  ];

  return (
    <>
      <Navbar />

      <HeroSection slides={slides} hr={hr} managers={managers} settings={s} />

      <ScrollReveal>
        <AboutSection settings={s} />
      </ScrollReveal>

      <ScrollReveal>
        <BanksSection banks={banks} />
      </ScrollReveal>

      <ScrollReveal>
        <ReviewsSection reviews={reviews} />
      </ScrollReveal>

      <ScrollReveal>
        <TeamSection leaders={leaders} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="family" className="py-24 bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center">
              FinBud Family
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-center text-slate-300">
              Welcome to the FinBud Family! Take a look at our team in action,
              enjoying fun activities and celebrating together.
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {familyImages.map((img) => (
                <div
                  key={img.src}
                  className="relative h-48 md:h-56 rounded-xl overflow-hidden bg-white/10 ring-1 ring-white/10"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <ContactSection settings={s} />
      </ScrollReveal>
    </>
  );
}