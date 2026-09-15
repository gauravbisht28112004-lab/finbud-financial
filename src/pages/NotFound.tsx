import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="container-page text-center">
        <div className="text-8xl font-bold text-[var(--brand-primary)] mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link to="/apply" className="btn-outline">
            Apply Now
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
