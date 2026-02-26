# FinBud Financial Website

> A Finance Buddha sub-brand initiative — Full Stack Next.js 14 website with Admin Dashboard.

---

## 🗂 Project Structure

```
finbud-financial/
├── app/
│   ├── (site)/                  ← Public website (grouped route)
│   │   ├── layout.tsx           ← Navbar + Footer wrapper
│   │   └── page.tsx             ← Homepage (fetches all DB data)
│   ├── admin/
│   │   ├── login/page.tsx       ← Admin login page
│   │   └── dashboard/page.tsx   ← Full admin panel (all CRUD)
│   ├── api/
│   │   ├── auth/login/route.ts  ← POST /api/auth/login
│   │   ├── auth/logout/route.ts ← POST /api/auth/logout
│   │   ├── contact/route.ts     ← GET (admin) / POST (public)
│   │   ├── contact/[id]/route.ts
│   │   ├── reviews/route.ts
│   │   ├── reviews/[id]/route.ts
│   │   ├── team/route.ts
│   │   ├── team/[id]/route.ts
│   │   ├── banks/route.ts
│   │   ├── banks/[id]/route.ts
│   │   ├── slideshow/route.ts
│   │   ├── slideshow/[id]/route.ts
│   │   └── settings/route.ts
│   ├── globals.css
│   └── layout.tsx               ← Root layout + Toaster
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx      ← Slideshow + HR/Manager cards
│   │   ├── AboutSection.tsx
│   │   ├── BanksSection.tsx     ← Infinite marquee
│   │   ├── ReviewsSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ContactSection.tsx   ← Form + Social links
│   │   └── Footer.tsx
│   └── ui/
│       └── ScrollReveal.tsx     ← Intersection Observer wrapper
├── lib/
│   ├── db.ts                    ← MongoDB connection (cached)
│   ├── auth.ts                  ← JWT sign/verify helpers
│   └── utils.ts                 ← Shared utilities
├── middleware.ts                 ← Route protection for /admin
├── models/
│   ├── Admin.ts
│   ├── Bank.ts
│   ├── Contact.ts
│   ├── Review.ts
│   ├── Settings.ts
│   ├── Slideshow.ts
│   └── Staff.ts                 ← Covers HR, Manager, Team Leaders
├── scripts/
│   └── seed.js                  ← DB seeder with demo data
├── public/
│   ├── slides/                  ← Drop slideshow images here
│   ├── avatars/                 ← Drop staff photos here
│   └── logos/                   ← Drop bank logos here
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## ⚡ Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:
```env
MONGODB_URI=mongodb://localhost:27017/finbud
JWT_SECRET=your_super_long_random_secret_here
ADMIN_EMAIL=admin@finbudfinancial.com
ADMIN_PASSWORD=FinBud@Admin2025
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **MongoDB Atlas?** Use your Atlas connection string:
> `mongodb+srv://<user>:<password>@cluster.mongodb.net/finbud`

### 3. Seed the database

```bash
node scripts/seed.js
```

This creates:
- 1 admin account
- 5 slideshow slides
- HR, Manager, and 6 Team Leader profiles
- 12 bank partners
- 6 client reviews
- Default site settings

### 4. Run development server

```bash
npm run dev
```

Open: http://localhost:3000

Admin panel: http://localhost:3000/admin/login

---

## 🔑 Admin Credentials (after seeding)

| Field    | Value                          |
|----------|-------------------------------|
| Email    | `admin@finbudfinancial.com`    |
| Password | `FinBud@Admin2025`             |

**Change these in `.env` before deploying!**

---

## 📸 Adding Real Photos

Place your photos in the `public/` folder, then update via the Admin panel:

| Photo Type        | Folder            | Example URL          |
|-------------------|-------------------|----------------------|
| Staff/HR/Manager  | `public/avatars/` | `/avatars/priya.jpg` |
| Slideshow images  | `public/slides/`  | `/slides/slide1.jpg` |
| Bank logos        | `public/logos/`   | `/logos/sbi.png`     |

In the Admin Dashboard → HR & Team → Edit member → paste the Photo URL.

---

## 🚀 Production Deployment

### Build

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Deploy to any VPS (PM2)

```bash
npm run build
npm install -g pm2
pm2 start npm --name "finbud" -- start
pm2 save
pm2 startup
```

---

## 🛠 Admin Dashboard Features

| Section       | What you can do                                        |
|---------------|--------------------------------------------------------|
| Overview      | See counts of all content at a glance                  |
| Slideshow     | Add / edit / delete hero carousel slides               |
| HR & Team     | Manage HR, Manager, and Team Leader cards              |
| Banks         | Add / edit / delete bank partner logos                 |
| Reviews       | Full CRUD for client testimonials                      |
| Submissions   | View, mark read, delete contact form entries           |
| Settings      | Edit address, phone, email, social links, About text   |

---

## 🎨 Customization

- **Colors**: Edit CSS variables in `app/globals.css`
- **Fonts**: Already using Playfair Display + DM Sans via Google Fonts
- **Brand name**: Search & replace `FinBud Financial` across files
- **Finance Buddha link**: Update `https://www.financebuddha.com/` in Navbar and Footer

---

## 📦 Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | Next.js 14 (App Router) + React 18 |
| Styling    | Tailwind CSS + CSS variables  |
| Backend    | Next.js API Routes            |
| Database   | MongoDB + Mongoose            |
| Auth       | JWT (HTTP-only cookies)       |
| Animations | CSS + IntersectionObserver    |
| Icons      | Lucide React                  |
| Toasts     | react-hot-toast               |
