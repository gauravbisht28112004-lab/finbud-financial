'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { UserCircle2, X } from 'lucide-react';

type Leader = {
  _id: string;
  name: string;
  role: string;
  department?: string;
  photoUrl?: string;
  bio?: string;
};

const DEFAULT_LEADERS: Leader[] = [
  {
    _id: 'bh1',
    name: 'Nilamber Dutta',
    role: 'Business Head',
    department: '',
    photoUrl: '/team/business-head.jpg',
    bio:
      'As the Business Head of FinBud Financial, Nilamber Dutta leads overall strategic planning, high-value partnerships, and long-term growth initiatives. With strong expertise in financial advisory and team leadership, he ensures that every client receives transparent, reliable, and result-driven financial solutions. His vision is to position FinBud Financial as a trusted name in India’s loan advisory sector.',
  },
  {
    _id: 'm1',
    name: 'Akash Deep Kohli',
    role: 'Branch Manager',
    department: '',
    photoUrl: '/team/manager.jpg',
    bio:
      'Akash Deep Kohli oversees branch operations and ensures smooth execution of financial services. With a strong focus on performance, client satisfaction, and operational excellence, he plays a key role in maintaining service quality standards. His leadership ensures timely approvals, effective coordination, and a seamless customer experience.',
  },
  {
    _id: 'hr1',
    name: 'Anjali Bisht',
    role: 'HR Manager',
    department: '',
    photoUrl: '/team/hr.jpg',
    bio:
      'Anjali Bisht leads the Human Resources function at FinBud Financial, managing recruitment, employee engagement, and performance development. She is dedicated to building a motivated and high-performing team culture. Her people-first approach ensures a supportive work environment that drives productivity and long-term organizational growth.',
  },
  {
    _id: 'tl1',
    name: 'Mansi Dewvedi',
    role: 'Assistant Manager',
    department: '',
    photoUrl: '/team/tl1.jpg',
    bio:
      'Mansi Dewvedi supports operational and team management activities while ensuring strong client communication and lead conversion efficiency. She works closely with the leadership team to maintain service standards and drive performance across departments.',
  },
  {
    _id: 'tl2',
    name: 'Prashant Saini',
    role: 'Senior Team Leader',
    department: '',
    photoUrl: '/team/tl2.jpg',
    bio:
      'Prashant Saini leads sales coordination and team performance initiatives. With deep knowledge of loan processing and customer handling, he ensures efficient follow-ups and improved conversion ratios while maintaining a customer-centric approach.',
  },
  {
    _id: 'tl3',
    name: 'Neha Kohli',
    role: 'Manager',
    department: '',
    photoUrl: '/team/tl3.jpg',
    bio:
      'With over 10 years of experience in the financial services sector, Neha has been a driving force at Finance Buddha since 2015. As a Manager, she leads with clarity, builds empowered teams, and ensures sustainable business growth. Her disciplined approach, client-centric mindset, and commitment to performance make her a key pillar of the organization.',
  },
  {
    _id: 'tl4',
    name: 'Sandarbh Goswami',
    role: 'Sales Manager',
    department: '',
    photoUrl: '/team/tl4.jpg',
    bio:
      'Sandarbh Goswami specializes in sales strategy and revenue growth initiatives. He ensures efficient lead allocation, performance monitoring, and team target achievement. His analytical approach helps improve sales outcomes and overall business performance.',
  },
  {
    _id: 'tl5',
    name: 'Bhawna Puri',
    role: 'Senior Team Leader',
    department: '',
    photoUrl: '/team/tl5.jpg',
    bio:
      'Bhawna Puri plays a key role in strengthening team coordination and customer relationship management. She focuses on improving service delivery, ensuring client trust, and maintaining high operational standards across the sales process.',
  },
];

function LeaderCard({
  member,
  onClick,
  big = false,
}: {
  member: Leader;
  onClick: () => void;
  big?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group bg-white rounded-2xl p-6 text-center transition-all hover:-translate-y-1.5 relative overflow-hidden
        ${big ? 'w-full max-w-[520px]' : 'w-full'}`}
      style={{ boxShadow: '0 2px 12px rgba(27,79,216,0.08)', border: '1.5px solid #EFF2F9' }}
    >
      {/* Accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg,#1B4FD8,#00B4D8)' }}
      />

      <div className="flex flex-col items-center">
        <div
          className={`${big ? 'w-24 h-24' : 'w-20 h-20'} rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden transition-all group-hover:ring-2 group-hover:ring-[#00B4D8]`}
          style={{ background: 'linear-gradient(135deg,#EFF2F9,#D8DFEF)', border: '3px solid #EFF2F9' }}
        >
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.name}
              width={big ? 96 : 80}
              height={big ? 96 : 80}
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <UserCircle2 size={big ? 38 : 32} className="text-[#1B4FD8]" />
          )}
        </div>

        <p className={`${big ? 'text-base' : 'text-sm'} font-bold text-[#0A1628] mb-1 text-center w-full`}>
          {member.name}
        </p>
        <p className="text-[#1B4FD8] font-semibold text-xs text-center w-full">{member.role}</p>

        <p className="text-[11px] text-gray-400 mt-2 text-center w-full">Click to view profile</p>
      </div>
    </button>
  );
}

export default function TeamSection({ leaders }: { leaders: Leader[] }) {
  const base = useMemo(() => (leaders?.length ? leaders : DEFAULT_LEADERS), [leaders]);
  const [selected, setSelected] = useState<Leader | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ✅ Layout like your sketch
  const businessHead =
    base.find((m) => (m.role || '').toLowerCase().includes('business head')) || base[0];

  const akash = base.find((m) => (m.role || '').toLowerCase() === 'branch manager');
  const anjali = base.find((m) => (m.role || '').toLowerCase() === 'hr manager');
  const mansi = base.find((m) => (m.name || '').toLowerCase().includes('mansi'));

  const row2Fixed = [akash, anjali, mansi].filter(Boolean) as Leader[];

  // pick 4th card for row 2 automatically (next senior/manager)
  const used = new Set([businessHead?._id, ...row2Fixed.map((x) => x._id)].filter(Boolean) as string[]);
  const extraRow2 =
    base.find(
      (m) =>
        !used.has(m._id) &&
        ((m.role || '').toLowerCase().includes('senior') || (m.role || '').toLowerCase().includes('manager'))
    ) || base.find((m) => !used.has(m._id));

  const row2 = [...row2Fixed, ...(extraRow2 ? [extraRow2] : [])].slice(0, 4);

  const used2 = new Set([businessHead?._id, ...row2.map((x) => x._id)].filter(Boolean) as string[]);
  const rest = base.filter((m) => !used2.has(m._id));

  return (
    <section id="team" className="py-24 px-6 lg:px-20" style={{ background: '#F8FAFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-[2.5px] uppercase text-[#1B4FD8]">
            The People Behind It
          </span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-[#0A1628] leading-tight mt-2 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Meet the experts dedicated to making your financial journey a success.
          </p>
        </div>

        {/* ✅ Row 1: Nilamber only (big + centered) */}
        {businessHead && (
          <div className="flex justify-center mb-8">
            <LeaderCard member={businessHead} onClick={() => setSelected(businessHead)} big />
          </div>
        )}

        {/* ✅ Row 2: Akash, Anjali, Mansi, (auto 4th) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {row2.map((member) => (
            <LeaderCard key={member._id} member={member} onClick={() => setSelected(member)} />
          ))}
        </div>

        {/* ✅ Row 3+: rest */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rest.map((member) => (
            <LeaderCard key={member._id} member={member} onClick={() => setSelected(member)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: 'rgba(10,22,40,0.65)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              background: 'white',
              boxShadow: '0 30px 90px rgba(0,0,0,0.35)',
              border: '1px solid rgba(27,79,216,0.12)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg,#0A1628,#0d2252)' }}
            >
              <div>
                <p className="text-white font-bold text-lg">{selected.name}</p>
                <p className="text-white/70 text-sm">{selected.role}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Close"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-5">
              <div
                className="w-[120px] h-[120px] rounded-2xl overflow-hidden relative mx-auto sm:mx-0"
                style={{ background: '#F1F5FF', border: '1.5px solid #E6ECFF' }}
              >
                {selected.photoUrl ? (
                  <Image src={selected.photoUrl} alt={selected.name} fill className="object-cover" sizes="120px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserCircle2 size={42} className="text-[#1B4FD8]" />
                  </div>
                )}
              </div>

              <div>
                <p className="text-[#0A1628] font-semibold mb-2">Introduction</p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {selected.bio || 'Profile introduction not added yet. Add a bio for this member in TeamSection.tsx.'}
                </p>

                <div className="mt-4">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: '#F8FAFF', border: '1px solid #E6ECFF', color: '#1B4FD8' }}
                  >
                    FinBud Financial
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg,#F4A524,#FFD166)',
                  color: '#0A1628',
                  boxShadow: '0 4px 20px rgba(244,165,36,0.25)',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
