import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Partners from '@/pages/Partners';
import Team from '@/pages/Team';
import Contact from '@/pages/Contact';
import Loans from '@/pages/Loans';
import LoanDetail from '@/pages/LoanDetail';
import Calculators from '@/pages/Calculators';
import Apply from '@/pages/Apply';
import Legal from '@/pages/Legal';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loans/:slug" element={<LoanDetail />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/disclaimer" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
