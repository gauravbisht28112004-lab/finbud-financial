import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinBud Financial | A Finance Buddha Initiative',
  description:
    'FinBud Financial — Smart, transparent financial solutions. Personal loans, business loans, home loans. A proud part of Finance Buddha.',
  keywords: 'loans, personal loan, business loan, home loan, FinBud, Finance Buddha',
  openGraph: {
    title: 'FinBud Financial',
    description: 'Your Trusted Financial Partner — A Finance Buddha Initiative',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'FinBud Financial',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0A1628',
              color: '#fff',
              border: '1px solid rgba(27,79,216,0.3)',
              fontFamily: 'DM Sans, sans-serif',
            },
            success: { iconTheme: { primary: '#F4A524', secondary: '#0A1628' } },
          }}
        />
      </body>
    </html>
  );
}
