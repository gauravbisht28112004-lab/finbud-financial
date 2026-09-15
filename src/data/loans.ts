export interface LoanProduct {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  benefits: string[];
  suitableFor: string;
  eligibility: string[];
  documents: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
  features: { title: string; description: string }[];
}

export const loanProducts: LoanProduct[] = [
  {
    slug: 'personal-loan',
    name: 'Personal Loan',
    shortName: 'Personal Loan',
    tagline: 'Quick funds for life\'s moments',
    description:
      'Whether it\'s a wedding, a dream vacation, medical expenses, or consolidating debt, our personal loans offer flexible amounts with transparent terms and no hidden charges.',
    icon: 'User',
    benefits: [
      'Loan amounts from ₹50,000 to ₹25,00,000',
      'Tenure from 12 to 60 months',
      'Minimal documentation',
      'Quick approval and disbursal',
      'No collateral required',
      'Flexible repayment options',
    ],
    suitableFor:
      'Salaried and self-employed individuals needing funds for personal expenses — weddings, travel, medical, home renovation, or debt consolidation.',
    eligibility: [
      'Age: 21 to 60 years',
      'Minimum monthly income: ₹15,000',
      'Employment: Salaried or self-employed',
      'Minimum credit score: 685',
      'Indian residency required',
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Latest 3 months salary slips',
      'Bank statements for last 6 months',
      'Address proof (utility bill or rental agreement)',
    ],
    process: [
      { step: 'Apply Online', detail: 'Fill out the application form with your details' },
      { step: 'Document Verification', detail: 'Our team verifies your submitted documents' },
      { step: 'Approval', detail: 'Receive approval confirmation within 24–48 hours' },
      { step: 'Disbursal', detail: 'Funds transferred directly to your bank account' },
    ],
    faqs: [
      {
        q: 'What is the interest rate for a personal loan?',
        a: 'Interest rates vary based on your credit profile, income, and loan amount. Contact us for a personalised quote.',
      },
      {
        q: 'Is there a prepayment penalty?',
        a: 'Prepayment terms depend on the lender. We help you find options with minimal or no prepayment charges.',
      },
      {
        q: 'How long does approval take?',
        a: 'Approval typically takes 24–48 hours after document verification is complete.',
      },
    ],
    features: [
      { title: 'No Collateral', description: 'Unsecured loans — no need to pledge assets' },
      { title: 'Fast Processing', description: 'Quick verification and disbursal' },
      { title: 'Flexible Tenure', description: 'Choose repayment period that suits you' },
    ],
  },
  {
    slug: 'home-loan',
    name: 'Home Loan',
    shortName: 'Home Loan',
    tagline: 'Build the home you\'ve always wanted',
    description:
      'Turn your dream of owning a home into reality. Our home loans come with competitive rates, long tenures, and guidance through every step of the process.',
    icon: 'Home',
    benefits: [
      'Loan amounts up to ₹5,00,00,000',
      'Tenure up to 30 years',
      'Competitive interest rates',
      'Tax benefits under Section 80C and 24(b)',
      'Balance transfer facility',
      'Top-up loan options',
    ],
    suitableFor:
      'Individuals and families looking to purchase, construct, or renovate a residential property in India.',
    eligibility: [
      'Age: 21 to 65 years',
      'Minimum annual income: ₹3,00,000',
      'Employment: Salaried or self-employed with stable income',
      'Minimum credit score: 700',
      'Property must be approved by local authority',
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Income proof (salary slips or ITR for 3 years)',
      'Bank statements for last 6 months',
      'Property documents (sale agreement, title deed)',
      'Employment proof',
    ],
    process: [
      { step: 'Application', detail: 'Submit your application with property details' },
      { step: 'Property Evaluation', detail: 'Property is assessed and valued' },
      { step: 'Legal Verification', detail: 'Legal team verifies property documents' },
      { step: 'Sanction & Disbursal', detail: 'Loan sanctioned and disbursed as per milestones' },
    ],
    faqs: [
      {
        q: 'What is the maximum tenure for a home loan?',
        a: 'Home loans can have tenure up to 30 years, subject to your age at loan maturity.',
      },
      {
        q: 'Can I transfer my existing home loan?',
        a: 'Yes, balance transfer is available. We help you find better rates on your existing home loan.',
      },
      {
        q: 'Are there tax benefits on home loans?',
        a: 'Yes, principal repayment qualifies under Section 80C and interest under Section 24(b) of the Income Tax Act.',
      },
    ],
    features: [
      { title: 'Long Tenure', description: 'Up to 30 years for comfortable EMIs' },
      { title: 'Tax Benefits', description: 'Save under Section 80C and 24(b)' },
      { title: 'Balance Transfer', description: 'Switch to better rates anytime' },
    ],
  },
  {
    slug: 'business-loan',
    name: 'Business Loan',
    shortName: 'Business Loan',
    tagline: 'Fuel your business growth',
    description:
      'Whether you\'re expanding operations, purchasing inventory, or managing cash flow, our business loans provide the capital you need with terms designed for enterprises.',
    icon: 'Briefcase',
    benefits: [
      'Loan amounts from ₹1,00,000 to ₹1,00,00,000',
      'Tenure from 12 to 60 months',
      'Minimal documentation',
      'Quick processing',
      'No collateral for loans up to ₹10,00,000',
      'Flexible usage of funds',
    ],
    suitableFor:
      'Proprietorships, partnerships, private limited companies, and self-employed professionals looking to grow or manage their business.',
    eligibility: [
      'Business vintage: Minimum 2 years',
      'Annual turnover: Minimum ₹10,00,000',
      'Age: 23 to 65 years',
      'Business should be profitable',
      'GST registration preferred',
    ],
    documents: [
      'PAN card (business and individual)',
      'GST registration certificate',
      'ITR for last 2 years',
      'Bank statements for last 12 months',
      'Business address proof',
      'Ownership proof',
    ],
    process: [
      { step: 'Eligibility Check', detail: 'We assess your business profile and requirements' },
      { step: 'Documentation', detail: 'Submit required business documents' },
      { step: 'Credit Assessment', detail: 'Financial health and repayment capacity evaluated' },
      { step: 'Disbursal', detail: 'Funds released to your business account' },
    ],
    faqs: [
      {
        q: 'Do I need collateral for a business loan?',
        a: 'Loans up to ₹10,00,000 are typically unsecured. Larger amounts may require collateral.',
      },
      {
        q: 'How quickly can I get a business loan?',
        a: 'Processing typically takes 3–5 working days after all documents are submitted.',
      },
      {
        q: 'Can startups apply?',
        a: 'A minimum business vintage of 2 years is generally required, but we can explore specialised options.',
      },
    ],
    features: [
      { title: 'Unsecured Options', description: 'No collateral needed up to ₹10L' },
      { title: 'Quick Processing', description: '3–5 working days' },
      { title: 'Flexible Usage', description: 'Use for any business need' },
    ],
  },
  {
    slug: 'overdraft-facility',
    name: 'Overdraft Facility',
    shortName: 'Overdraft',
    tagline: 'Flexible credit line when you need it',
    description:
      'An overdraft facility gives you a pre-approved credit limit that you can draw from as needed. You pay interest only on the amount you use — not the entire limit. It\'s the smart way to manage short-term cash flow gaps.',
    icon: 'CreditCard',
    benefits: [
      'Pre-approved credit limit based on your profile',
      'Interest only on the utilised amount, not the full limit',
      'Repay and redraw anytime within the facility period',
      'No EMI pressure — flexible repayment',
      'Instant access to funds when needed',
      'Dropline OD available with reducing limit',
    ],
    suitableFor:
      'Business owners, self-employed professionals, and salaried individuals who need flexible access to short-term credit without fixed EMI commitments.',
    eligibility: [
      'Age: 21 to 65 years',
      'Stable income source (salaried or business)',
      'Minimum credit score: 700',
      'Existing banking relationship preferred',
      'For dropline OD: minimum annual income ₹5,00,000',
    ],
    documents: [
      'PAN card',
      'Aadhaar card',
      'Income proof (salary slips or ITR)',
      'Bank statements for last 12 months',
      'Business proof (for self-employed)',
      'Existing loan details (if any)',
    ],
    process: [
      { step: 'Limit Assessment', detail: 'We evaluate your profile to determine the credit limit' },
      { step: 'Documentation', detail: 'Submit required documents for verification' },
      { step: 'Sanction', detail: 'Overdraft limit is sanctioned and linked to your account' },
      { step: 'Usage', detail: 'Draw funds as needed — interest charged only on utilised amount' },
    ],
    faqs: [
      {
        q: 'How is overdraft different from a regular loan?',
        a: 'In a loan, you receive a lump sum and pay EMI on the entire amount. In an overdraft, you get a credit limit and pay interest only on what you actually use.',
      },
      {
        q: 'What is a dropline overdraft?',
        a: 'A dropline OD starts with a maximum limit that reduces by a fixed percentage each year. This means your available credit gradually decreases over the facility period.',
      },
      {
        q: 'How is overdraft interest calculated?',
        a: 'Interest is calculated daily on the utilised amount. For example, if you have a ₹5,00,000 limit but use only ₹2,00,000 for 10 days, interest is charged on ₹2,00,000 for those 10 days only.',
      },
      {
        q: 'Can I prepay the overdraft?',
        a: 'Yes, you can deposit money back into the overdraft account anytime to reduce the utilised amount and the interest charged.',
      },
    ],
    features: [
      { title: 'Pay Only for What You Use', description: 'Interest on utilised amount only' },
      { title: 'Flexible Repayment', description: 'No fixed EMI — repay on your terms' },
      { title: 'Dropline Option', description: 'Reducing limit for disciplined borrowing' },
    ],
  },
];

export function getLoanBySlug(slug: string): LoanProduct | undefined {
  return loanProducts.find((l) => l.slug === slug);
}
