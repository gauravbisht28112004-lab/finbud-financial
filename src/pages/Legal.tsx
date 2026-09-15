import { useParams } from 'react-router-dom';

const legalContent: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information We Collect', body: 'We collect information you provide directly to us when you fill out application forms, contact us, or use our calculators. This includes your name, email address, phone number, employment details, income information, and loan requirements.' },
      { heading: 'How We Use Your Information', body: 'We use your information to process loan applications, match you with suitable lending partners, communicate with you about your application, and improve our services. We do not sell your personal information to third parties.' },
      { heading: 'Information Sharing', body: 'We share your information with our lending partners (banks and NBFCs) solely for the purpose of processing your loan application. We only share information after you have provided explicit consent.' },
      { heading: 'Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
      { heading: 'Your Rights', body: 'You have the right to access, correct, or request deletion of your personal information. Contact us at hello@finbudfinancial.com to exercise these rights.' },
      { heading: 'Cookies', body: 'Our website may use cookies to improve user experience and analyze website traffic. You can control cookie settings through your browser.' },
      { heading: 'Contact Us', body: 'For any questions about this Privacy Policy, contact us at hello@finbudfinancial.com or +91 98765 43210.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', body: 'By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our website.' },
      { heading: 'Service Description', body: 'FinBud Financial is a financial services platform that connects borrowers with lending partners. We are not a lender and do not directly provide loans. We facilitate the application process and provide guidance.' },
      { heading: 'No Guarantee', body: 'We do not guarantee loan approval, specific interest rates, or loan terms. Final approval and terms are at the sole discretion of the lending partner.' },
      { heading: 'User Responsibilities', body: 'You agree to provide accurate and complete information in all application forms. Providing false or misleading information may result in rejection of your application.' },
      { heading: 'Limitation of Liability', body: 'FinBud Financial shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or the inability to obtain a loan.' },
      { heading: 'Third-Party Links', body: 'Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites.' },
      { heading: 'Changes to Terms', body: 'We reserve the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms.' },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    sections: [
      { heading: 'General Information', body: 'The information provided on this website is for general informational purposes only. While we strive to keep information accurate and up-to-date, we make no representations of any kind about the completeness, accuracy, or reliability of the information.' },
      { heading: 'Not Financial Advice', body: 'The content on this website does not constitute financial, investment, or legal advice. You should consult with a qualified professional before making any financial decisions.' },
      { heading: 'Calculator Accuracy', body: 'Our calculators provide estimates based on the inputs you provide. Actual loan terms, EMIs, and interest rates may vary based on lender policies, your credit profile, and other factors.' },
      { heading: 'Loan Approval', body: 'FinBud Financial does not guarantee loan approval. All loans are subject to credit assessment and approval by the respective lending partner.' },
      { heading: 'Interest Rates', body: 'Interest rates mentioned anywhere on this website are indicative and subject to change. Actual rates depend on the lender, your credit profile, loan amount, and tenure.' },
      { heading: 'No Endorsement', body: 'Mention of any bank, NBFC, or financial institution on this website does not constitute an endorsement by that institution of our services, or by us of all their products.' },
    ],
  },
};

export default function Legal() {
  const { type } = useParams<{ type: string }>();
  const content = legalContent[type || 'privacy'] || legalContent.privacy;

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #073447 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: '#10B981' }} />
        <div className="container-page relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.title}</h1>
          <p className="text-slate-300">Last updated: September 2026</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page max-w-3xl">
          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{section.heading}</h2>
                <p className="text-slate-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
