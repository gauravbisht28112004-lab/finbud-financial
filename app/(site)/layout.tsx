import Footer from '@/components/sections/Footer';
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';

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

async function getSettings() {
  try {
    await connectDB();
    const s = await Settings.findOne().lean();
    return s ?? defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}