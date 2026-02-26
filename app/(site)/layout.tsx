import Footer from '@/components/sections/Footer';
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';

async function getSettings() {
  try {
    await connectDB();
    let s = await Settings.findOne().lean();
    if (!s) s = {};
    return s;
  } catch {
    return {};
  }
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = (await getSettings()) as any;

  return (
    <>
      {/* ✅ Navbar removed from layout */}
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}