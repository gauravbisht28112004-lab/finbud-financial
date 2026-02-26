const DEFAULT_REVIEWS = [
  { _id:'r1', reviewerName:'Amit Kumar', city:'Delhi', rating:5, text:'FinBud Financial helped me get my home loan approved in under 7 days! The team was incredibly professional and transparent about every step.', initials:'AK' },
  { _id:'r2', reviewerName:'Sunita Rathi', city:'Mumbai', rating:5, text:'I needed a business loan urgently and FinBud Financial connected me with the right bank partner. The entire process was smooth and the interest rate was the best I found.', initials:'SR' },
  { _id:'r3', reviewerName:'Vijay Patil', city:'Pune', rating:4, text:'Very knowledgeable team. They explained every loan option in detail and helped me choose the one that best suited my financial situation.', initials:'VP' },
  { _id:'r4', reviewerName:'Neha Desai', city:'Bangalore', rating:5, text:'As a first-time borrower I was nervous, but the FinBud Financial team guided me through the entire process with patience and expertise.', initials:'ND' },
  { _id:'r5', reviewerName:'Rohit Gupta', city:'Hyderabad', rating:5, text:'Excellent service from start to finish. FinBud\'s network of bank partners meant I got multiple offers to compare. Saved me lakhs in interest!', initials:'RG' },
  { _id:'r6', reviewerName:'Meera Sinha', city:'Chennai', rating:5, text:'Being part of the Finance Buddha family, FinBud Financial carries immense credibility. Their digital process made applying incredibly convenient.', initials:'MS' },
];

const GRADIENT_POOL = [
  'linear-gradient(135deg,#1B4FD8,#00B4D8)',
  'linear-gradient(135deg,#0A1628,#1B4FD8)',
  'linear-gradient(135deg,#F4A524,#FFD166)',
  'linear-gradient(135deg,#003366,#00B4D8)',
  'linear-gradient(135deg,#1a2a4a,#1B4FD8)',
  'linear-gradient(135deg,#0e2444,#00B4D8)',
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-[#F4A524] text-sm mb-3">
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </div>
  );
}

export default function ReviewsSection({ reviews }: { reviews: any[] }) {
  const list = reviews.length > 0 ? reviews : DEFAULT_REVIEWS;

  return (
    <section id="reviews" className="py-24 px-6 lg:px-20" style={{ background: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-[2.5px] uppercase text-[#00B4D8]">Testimonials</span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-tight mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real stories from real people who trusted FinBud Financial with their financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((r, i) => (
            <div
              key={r._id}
              className="relative p-7 rounded-2xl transition-all hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Quote decoration */}
              <span className="absolute top-4 right-5 font-display text-[80px] leading-none text-[rgba(244,165,36,0.12)] select-none">
                &#8220;
              </span>
              <Stars rating={r.rating} />
              <p className="text-white/75 text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: GRADIENT_POOL[i % GRADIENT_POOL.length] }}
                >
                  {r.initials || r.reviewerName?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{r.reviewerName}</p>
                  <p className="text-white/40 text-xs mt-0.5">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
