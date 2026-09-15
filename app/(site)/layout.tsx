import Footer from '@/components/sections/Footer';

const defaultSettings = {
  about: {},
  contact: {},
  social: {},
  hero: {},
  reviews: [],
  partners: [],
  family: [],
  team: [],
  achievements: [],
  banks: [],
  footer: {},
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Footer settings={defaultSettings} />
    </>
  );
}