'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type Bank = {
  name: string;
  logo: string;
};

const DEFAULT_BANKS: Bank[] = [
  { name: 'SBI', logo: '/banks/sbi.png' },
  { name: 'HDFC Bank', logo: '/banks/hdfc.png' },
  { name: 'ICICI Bank', logo: '/banks/icici.png' },
  { name: 'Axis Bank', logo: '/banks/axis.png' },
  { name: 'Kotak Bank', logo: '/banks/kotak.png' },
  { name: 'PNB', logo: '/banks/pnb.png' },
  { name: 'Bank of Baroda', logo: '/banks/bob.png' },
  { name: 'Canara Bank', logo: '/banks/canara.png' },
  { name: 'IndusInd', logo: '/banks/indusind.png' },
  { name: 'Yes Bank', logo: '/banks/yes.png' },
  { name: 'Bajaj Finserv', logo: '/banks/bajaj.png' },
  { name: 'IDFC First', logo: '/banks/idfc.png' },
];

function BankCard({ bank }: { bank: Bank }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 min-w-[190px] h-[90px] px-6 rounded-2xl transition-all duration-300 cursor-default
                 flex items-center gap-4 justify-center bg-white"
      style={{
        border: `2px solid ${hovered ? '#1B4FD8' : '#E2E8F5'}`,
        transform: hovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 16px 35px rgba(27,79,216,0.22)'
          : '0 6px 18px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* LOGO */}
      <div className="relative w-14 h-14">
        <Image
          src={bank.logo}
          alt={bank.name}
          fill
          sizes="56px"
          className="object-contain"
          priority
        />
      </div>

      {/* NAME */}
      <span
        className="font-bold text-sm tracking-wide whitespace-nowrap"
        style={{ color: '#0A1628' }}
      >
        {bank.name}
      </span>
    </div>
  );
}

export default function BanksSection({ banks }: { banks?: any[] }) {
  const list: Bank[] = useMemo(() => {
    if (banks && banks.length > 0) {
      return banks.map((b: any) => ({
        name: b.name,
        logo:
          b.logo ||
          DEFAULT_BANKS.find(
            (x) => x.name.toLowerCase() === String(b.name).toLowerCase()
          )?.logo ||
          '/banks/sbi.png',
      }));
    }
    return DEFAULT_BANKS;
  }, [banks]);

  const doubled = [...list, ...list];

  return (
    <section id="banks" className="py-24 px-6 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto mb-14 text-center">
        <span className="text-xs font-bold tracking-[2.5px] uppercase text-[#1B4FD8]">
          Our Network
        </span>
        <h2 className="font-display font-black text-4xl lg:text-5xl text-[#0A1628] leading-tight mt-2 mb-4">
          We Collaborate With <br /> Leading Banks
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Access the best loan offers across India’s top financial institutions
          through our trusted network.
        </p>
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg,transparent 0%,black 12%,black 88%,transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg,transparent 0%,black 12%,black 88%,transparent 100%)',
        }}
      >
        <div className="marquee-track flex gap-6">
          {doubled.map((bank, i) => (
            <BankCard key={`${bank.name}-${i}`} bank={bank} />
          ))}
        </div>
      </div>
    </section>
  );
}
