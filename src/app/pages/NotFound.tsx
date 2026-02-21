import { Link } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-200 rounded-full mb-6">
            <Search className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-6xl font-bold text-slate-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#16A34A] transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Dashboard
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/signup"
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
            >
              Login
            </Link>
            <Link
              to="/demo"
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
