# FinBud Financial

FinBud Financial is a modern, responsive financial services platform designed to help individuals and businesses find the right loans — personal, home, business, and overdraft facilities. 

A proud initiative inspired by Finance Buddha's visual identity, this project connects borrowers with top lending partners across India through a streamlined, premium user interface.

## 🚀 Features

- **Premium UI/UX**: Designed with a sleek, trustworthy financial aesthetic featuring custom color palettes, smooth animations, and optimized components.
- **Smart Calculators**: Includes dynamic tools for users to plan their finances:
  - EMI Calculator
  - Loan Eligibility Calculator
  - Overdraft Calculator
- **Dynamic Partner Integrations**: Infinite scrolling marquee featuring India's top Banks and NBFCs.
- **Form Handling**: Integrated contact and application forms backed by Supabase.
- **Fully Responsive**: Built mobile-first to ensure a flawless experience across all devices.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/)

## 📦 Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/gauravbisht28112004-lab/finbud-financial.git
   cd finbud-financial
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials to enable form submissions:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🏗️ Building for Production

To create a production-ready optimized build, run:
```bash
npm run build
```
The output will be available in the `dist` directory, ready to be deployed to platforms like Vercel, Netlify, or AWS.

## 📁 Project Structure

```text
finbud-financial/
├── public/                 # Static assets (logos, favicons)
├── src/
│   ├── components/         # Reusable UI components (Logo, Header, Footer)
│   │   └── calculators/    # Financial calculator components
│   ├── data/               # Static site data and configuration (site.ts, loans.ts)
│   ├── lib/                # Library configurations (Supabase client)
│   ├── pages/              # Route pages (Home, About, Contact, etc.)
│   ├── App.tsx             # Main routing component
│   ├── index.css           # Global CSS variables and Tailwind imports
│   └── main.tsx            # React application entry point
├── tailwind.config.js      # Tailwind configuration and theme extension
└── package.json            # Project dependencies and scripts
```

## 📄 License

This project is proprietary and confidential. All rights reserved by FinBud Financial.
