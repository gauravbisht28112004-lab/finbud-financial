'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Images, Users, Star, Building2, Settings, Mail,
  LogOut, Plus, Trash2, Edit3, Save, X, ChevronDown
} from 'lucide-react';

type Tab = 'overview' | 'slideshow' | 'staff' | 'banks' | 'reviews' | 'contacts' | 'settings';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'slideshow', label: 'Slideshow', icon: Images },
  { id: 'staff', label: 'HR & Team', icon: Users },
  { id: 'banks', label: 'Banks', icon: Building2 },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'contacts', label: 'Submissions', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

/* ── helpers ── */
const apiFetch = (url: string, opts?: RequestInit) =>
  fetch(url, { credentials: 'include', ...opts }).then((r) => r.json());

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="w-full max-w-md rounded-2xl p-6" style={{ background: '#0d1e3a', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white text-lg">{title}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wider">{label}</label>
      <input {...props} className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none placeholder:text-white/25"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
    </div>
  );
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wider">{label}</label>
      <textarea {...props} className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none resize-vertical placeholder:text-white/25 font-sans"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', minHeight: 80 }} />
    </div>
  );
}

function Btn({ children, variant = 'gold', ...props }: { variant?: 'gold' | 'red' | 'ghost' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    gold: { background: 'linear-gradient(135deg,#F4A524,#FFD166)', color: '#0A1628' },
    red: { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' },
    ghost: { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' },
  };
  return (
    <button {...props} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-40 ${props.className ?? ''}`}
      style={styles[variant]}>
      {children}
    </button>
  );
}

/* ── TABS ── */
function SlideshowTab() {
  const [slides, setSlides] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: any }>({ open: false, data: {} });

  const load = useCallback(async () => {
    const r = await apiFetch('/api/slideshow');
    if (r.success) setSlides(r.data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const isEdit = !!modal.data._id;
    const url = isEdit ? `/api/slideshow/${modal.data._id}` : '/api/slideshow';
    const method = isEdit ? 'PATCH' : 'POST';
    const r = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
    if (r.success) { toast.success('Saved!'); setModal({ open: false, data: {} }); load(); }
    else toast.error(r.message);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    await apiFetch(`/api/slideshow/${id}`, { method: 'DELETE' });
    load();
    toast.success('Deleted');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-lg">Slideshow Slides</h2>
        <Btn onClick={() => setModal({ open: true, data: {} })}><Plus size={14} /> Add Slide</Btn>
      </div>
      <div className="space-y-3">
        {slides.map((s) => (
          <div key={s._id} className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="font-semibold text-white text-sm">{s.title}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => setModal({ open: true, data: { ...s } })}><Edit3 size={12} /></Btn>
              <Btn variant="red" onClick={() => del(s._id)}><Trash2 size={12} /></Btn>
            </div>
          </div>
        ))}
        {slides.length === 0 && <p className="text-white/30 text-sm">No slides yet.</p>}
      </div>

      {modal.open && (
        <Modal title={modal.data._id ? 'Edit Slide' : 'Add Slide'} onClose={() => setModal({ open: false, data: {} })}>
          <Input label="Title" value={modal.data.title || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, title: e.target.value } }))} />
          <Input label="Subtitle" value={modal.data.subtitle || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, subtitle: e.target.value } }))} />
          <Input label="Image URL" placeholder="/uploads/slide1.jpg" value={modal.data.imageUrl || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, imageUrl: e.target.value } }))} />
          <Input label="Fallback Gradient" placeholder="linear-gradient(135deg,#1B4FD8,#00B4D8)" value={modal.data.gradient || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, gradient: e.target.value } }))} />
          <Input label="Order" type="number" value={modal.data.order ?? 0} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, order: +e.target.value } }))} />
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="ghost" onClick={() => setModal({ open: false, data: {} })}>Cancel</Btn>
            <Btn onClick={save}><Save size={12} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StaffTab() {
  const [staff, setStaff] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: any }>({ open: false, data: {} });
  const [filterType, setFilterType] = useState('all');

  const load = useCallback(async () => {
    const r = await apiFetch('/api/team');
    if (r.success) setStaff(r.data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const isEdit = !!modal.data._id;
    const url = isEdit ? `/api/team/${modal.data._id}` : '/api/team';
    const method = isEdit ? 'PATCH' : 'POST';
    const r = await apiFetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
    if (r.success) { toast.success('Saved!'); setModal({ open: false, data: {} }); load(); }
    else toast.error(r.message);
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await apiFetch(`/api/team/${id}`, { method: 'DELETE' });
    load(); toast.success('Deleted');
  };

  const filtered = filterType === 'all' ? staff : staff.filter((s) => s.type === filterType);
  const typeLabel: Record<string, string> = { hr: 'HR', manager: 'Manager', leader: 'Team Leader' };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="font-bold text-white text-lg">HR, Managers & Team Leaders</h2>
        <div className="flex gap-2">
          {['all', 'hr', 'manager', 'leader'].map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
              style={{ background: filterType === t ? 'linear-gradient(135deg,#F4A524,#FFD166)' : 'rgba(255,255,255,0.06)', color: filterType === t ? '#0A1628' : 'rgba(255,255,255,0.6)' }}>
              {t === 'all' ? 'All' : typeLabel[t]}
            </button>
          ))}
          <Btn onClick={() => setModal({ open: true, data: { type: 'leader' } })}><Plus size={14} /> Add Member</Btn>
        </div>
      </div>
      <div className="space-y-3">
        {filtered.map((m) => (
          <div key={m._id} className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="font-semibold text-white text-sm">{m.name}</p>
              <p className="text-[#00B4D8] text-xs">{m.role} · {m.department}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white/50"
                style={{ background: 'rgba(255,255,255,0.06)' }}>{typeLabel[m.type]}</span>
            </div>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => setModal({ open: true, data: { ...m } })}><Edit3 size={12} /></Btn>
              <Btn variant="red" onClick={() => del(m._id)}><Trash2 size={12} /></Btn>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-white/30 text-sm">No members found.</p>}
      </div>

      {modal.open && (
        <Modal title={modal.data._id ? 'Edit Member' : 'Add Member'} onClose={() => setModal({ open: false, data: {} })}>
          <Input label="Name" value={modal.data.name || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, name: e.target.value } }))} />
          <Input label="Role / Title" value={modal.data.role || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, role: e.target.value } }))} />
          <Input label="Department" value={modal.data.department || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, department: e.target.value } }))} />
          <div className="mb-3">
            <label className="block text-xs text-white/50 mb-1.5 font-semibold uppercase tracking-wider">Type</label>
            <select value={modal.data.type || 'leader'} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, type: e.target.value } }))}
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="leader">Team Leader</option>
            </select>
          </div>
          <Input label="Photo URL" placeholder="/uploads/photo.jpg" value={modal.data.photoUrl || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, photoUrl: e.target.value } }))} />
          <Input label="Order" type="number" value={modal.data.order ?? 0} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, order: +e.target.value } }))} />
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="ghost" onClick={() => setModal({ open: false, data: {} })}>Cancel</Btn>
            <Btn onClick={save}><Save size={12} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function BanksTab() {
  const [banks, setBanks] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: any }>({ open: false, data: {} });

  const load = useCallback(async () => {
    const r = await apiFetch('/api/banks');
    if (r.success) setBanks(r.data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const isEdit = !!modal.data._id;
    const url = isEdit ? `/api/banks/${modal.data._id}` : '/api/banks';
    const r = await apiFetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
    if (r.success) { toast.success('Saved!'); setModal({ open: false, data: {} }); load(); }
    else toast.error(r.message);
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await apiFetch(`/api/banks/${id}`, { method: 'DELETE' });
    load(); toast.success('Deleted');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-lg">Bank Partners</h2>
        <Btn onClick={() => setModal({ open: true, data: {} })}><Plus size={14} /> Add Bank</Btn>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {banks.map((b) => (
          <div key={b._id} className="p-4 rounded-xl flex items-center justify-between"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="font-semibold text-white text-sm">{b.name}</span>
            <div className="flex gap-1">
              <Btn variant="ghost" onClick={() => setModal({ open: true, data: { ...b } })}><Edit3 size={11} /></Btn>
              <Btn variant="red" onClick={() => del(b._id)}><Trash2 size={11} /></Btn>
            </div>
          </div>
        ))}
      </div>
      {banks.length === 0 && <p className="text-white/30 text-sm">No banks yet.</p>}

      {modal.open && (
        <Modal title={modal.data._id ? 'Edit Bank' : 'Add Bank'} onClose={() => setModal({ open: false, data: {} })}>
          <Input label="Bank Name" value={modal.data.name || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, name: e.target.value } }))} />
          <Input label="Logo URL" placeholder="/uploads/sbi.png" value={modal.data.logoUrl || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, logoUrl: e.target.value } }))} />
          <Input label="Website" placeholder="https://sbi.co.in" value={modal.data.website || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, website: e.target.value } }))} />
          <Input label="Order" type="number" value={modal.data.order ?? 0} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, order: +e.target.value } }))} />
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="ghost" onClick={() => setModal({ open: false, data: {} })}>Cancel</Btn>
            <Btn onClick={save}><Save size={12} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ReviewsTab() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [modal, setModal] = useState<{ open: boolean; data: any }>({ open: false, data: {} });

  const load = useCallback(async () => {
    const r = await apiFetch('/api/reviews');
    if (r.success) setReviews(r.data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    const isEdit = !!modal.data._id;
    const url = isEdit ? `/api/reviews/${modal.data._id}` : '/api/reviews';
    const r = await apiFetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(modal.data) });
    if (r.success) { toast.success('Saved!'); setModal({ open: false, data: {} }); load(); }
    else toast.error(r.message);
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await apiFetch(`/api/reviews/${id}`, { method: 'DELETE' });
    load(); toast.success('Deleted');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-lg">Client Reviews</h2>
        <Btn onClick={() => setModal({ open: true, data: { rating: 5 } })}><Plus size={14} /> Add Review</Btn>
      </div>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-white text-sm">{r.reviewerName} — {r.city}</p>
                <p className="text-[#F4A524] text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</p>
                <p className="text-white/50 text-xs mt-1 line-clamp-2">{r.text}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Btn variant="ghost" onClick={() => setModal({ open: true, data: { ...r } })}><Edit3 size={12} /></Btn>
                <Btn variant="red" onClick={() => del(r._id)}><Trash2 size={12} /></Btn>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-white/30 text-sm">No reviews yet.</p>}
      </div>

      {modal.open && (
        <Modal title={modal.data._id ? 'Edit Review' : 'Add Review'} onClose={() => setModal({ open: false, data: {} })}>
          <Input label="Reviewer Name" value={modal.data.reviewerName || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, reviewerName: e.target.value } }))} />
          <Input label="City" value={modal.data.city || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, city: e.target.value } }))} />
          <Input label="Rating (1-5)" type="number" min={1} max={5} value={modal.data.rating ?? 5} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, rating: +e.target.value } }))} />
          <Textarea label="Review Text" value={modal.data.text || ''} onChange={(e) => setModal((m) => ({ ...m, data: { ...m.data, text: e.target.value } }))} />
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="ghost" onClick={() => setModal({ open: false, data: {} })}>Cancel</Btn>
            <Btn onClick={save}><Save size={12} /> Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ContactsTab() {
  const [contacts, setContacts] = useState<any[]>([]);

  const load = useCallback(async () => {
    const r = await apiFetch('/api/contact');
    if (r.success) setContacts(r.data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const markRead = async (id: string) => {
    await apiFetch(`/api/contact/${id}`, { method: 'PATCH' });
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete submission?')) return;
    await apiFetch(`/api/contact/${id}`, { method: 'DELETE' });
    load(); toast.success('Deleted');
  };

  const unread = contacts.filter((c) => !c.isRead).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-white text-lg">Contact Form Submissions
          {unread > 0 && <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#F4A524', color: '#0A1628' }}>{unread} new</span>}
        </h2>
      </div>
      <div className="space-y-3">
        {contacts.map((c) => (
          <div key={c._id} className="p-4 rounded-xl"
            style={{ background: c.isRead ? 'rgba(255,255,255,0.03)' : 'rgba(27,79,216,0.12)', border: `1px solid ${c.isRead ? 'rgba(255,255,255,0.06)' : 'rgba(27,79,216,0.3)'}` }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-white text-sm">{c.name} <span className="text-white/40 font-normal">— {c.email}</span></p>
                {c.phone && <p className="text-white/40 text-xs">{c.phone}</p>}
                <p className="text-white/60 text-xs mt-2 leading-relaxed">{c.message}</p>
                <p className="text-white/25 text-[10px] mt-2">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 ml-4 flex-shrink-0">
                {!c.isRead && <Btn variant="ghost" onClick={() => markRead(c._id)}>Mark Read</Btn>}
                <Btn variant="red" onClick={() => del(c._id)}><Trash2 size={12} /></Btn>
              </div>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-white/30 text-sm">No submissions yet.</p>}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch('/api/settings').then((r) => { if (r.success) setData(r.data); });
  }, []);

  const save = async () => {
    setLoading(true);
    const r = await apiFetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setLoading(false);
    if (r.success) toast.success('Settings saved!');
    else toast.error(r.message);
  };

  const set = (section: string, key: string, val: string) =>
    setData((d: any) => ({ ...d, [section]: { ...(d[section] ?? {}), [key]: val } }));

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h3 className="font-bold text-white mb-4">Contact Details</h3>
        <Input label="Address" value={data.contact?.address || ''} onChange={(e) => set('contact', 'address', e.target.value)} />
        <Input label="Phone" value={data.contact?.phone || ''} onChange={(e) => set('contact', 'phone', e.target.value)} />
        <Input label="Email" value={data.contact?.email || ''} onChange={(e) => set('contact', 'email', e.target.value)} />
      </div>
      <div>
        <h3 className="font-bold text-white mb-4">Social Links</h3>
        <Input label="Instagram URL" value={data.social?.instagram || ''} onChange={(e) => set('social', 'instagram', e.target.value)} />
        <Input label="Facebook URL" value={data.social?.facebook || ''} onChange={(e) => set('social', 'facebook', e.target.value)} />
        <Input label="WhatsApp Number" placeholder="+919999999999" value={data.social?.whatsapp || ''} onChange={(e) => set('social', 'whatsapp', e.target.value)} />
        <Input label="LinkedIn URL" value={data.social?.linkedin || ''} onChange={(e) => set('social', 'linkedin', e.target.value)} />
      </div>
      <div>
        <h3 className="font-bold text-white mb-4">About Section</h3>
        <Input label="Section Heading" value={data.about?.heading || ''} onChange={(e) => set('about', 'heading', e.target.value)} />
        <Textarea label="Body Text" value={data.about?.body || ''} onChange={(e) => set('about', 'body', e.target.value)} />
        <Textarea label="Mission" value={data.about?.mission || ''} onChange={(e) => set('about', 'mission', e.target.value)} />
        <Textarea label="Vision" value={data.about?.vision || ''} onChange={(e) => set('about', 'vision', e.target.value)} />
      </div>
      <Btn onClick={save} className="px-6 py-2.5 text-sm" variant="gold">
        {loading ? 'Saving...' : <><Save size={14} /> Save All Settings</>}
      </Btn>
    </div>
  );
}

/* ── OVERVIEW ── */
function OverviewTab() {
  const [stats, setStats] = useState({ slides: 0, staff: 0, banks: 0, reviews: 0, contacts: 0 });

  useEffect(() => {
    Promise.all([
      apiFetch('/api/slideshow'),
      apiFetch('/api/team'),
      apiFetch('/api/banks'),
      apiFetch('/api/reviews'),
      apiFetch('/api/contact'),
    ]).then(([s, t, b, r, c]) => {
      setStats({
        slides: s.data?.length ?? 0,
        staff: t.data?.length ?? 0,
        banks: b.data?.length ?? 0,
        reviews: r.data?.length ?? 0,
        contacts: c.data?.length ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: 'Slides', value: stats.slides, color: '#1B4FD8' },
    { label: 'Staff Members', value: stats.staff, color: '#00B4D8' },
    { label: 'Bank Partners', value: stats.banks, color: '#F4A524' },
    { label: 'Reviews', value: stats.reviews, color: '#10b981' },
    { label: 'Contact Forms', value: stats.contacts, color: '#8b5cf6' },
  ];

  return (
    <div>
      <h2 className="font-bold text-white text-lg mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="p-5 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="font-display font-black text-3xl" style={{ color: c.color }}>{c.value}</p>
            <p className="text-white/40 text-xs mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-white/50 text-sm">Use the sidebar tabs to manage slideshow slides, HR/team profiles, bank partners, reviews, contact submissions, and site settings.</p>
      </div>
    </div>
  );
}

/* ── MAIN DASHBOARD ── */
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const TAB_CONTENT: Record<Tab, React.ReactNode> = {
    overview: <OverviewTab />,
    slideshow: <SlideshowTab />,
    staff: <StaffTab />,
    banks: <BanksTab />,
    reviews: <ReviewsTab />,
    contacts: <ContactsTab />,
    settings: <SettingsTab />,
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#080f1e' }}>
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col py-6"
        style={{ background: '#0A1628', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-5 mb-8">
          <div className="font-display font-black text-xl" style={{ background: 'linear-gradient(135deg,#F4A524,#00B4D8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            FinBud Admin
          </div>
          <p className="text-white/30 text-[10px] mt-0.5 uppercase tracking-widest">Control Panel</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all"
              style={{
                background: tab === id ? 'rgba(27,79,216,0.2)' : 'transparent',
                color: tab === id ? '#F4A524' : 'rgba(255,255,255,0.55)',
                border: tab === id ? '1px solid rgba(27,79,216,0.4)' : '1px solid transparent',
              }}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 mt-4">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {TAB_CONTENT[tab]}
        </div>
      </main>
    </div>
  );
}
