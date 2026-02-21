import { Link } from 'react-router';
import { Home, Zap, Clock } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-[#22C55E] rounded-xl flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" fill="white" />
          </div>
          <span className="text-2xl font-bold text-white">Web Boss</span>
        </Link>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22C55E]/20 border border-[#22C55E]/30 rounded-full mb-6">
          <Clock className="w-4 h-4 text-[#22C55E]" />
          <span className="text-sm font-medium text-[#22C55E]">Coming Soon</span>
        </div>

        {/* Content */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#22C55E] text-white rounded-xl hover:bg-[#16A34A] transition-colors font-semibold shadow-lg shadow-[#22C55E]/20"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-colors font-semibold backdrop-blur-sm"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Features Preview */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-4">
            We're working hard to bring you this feature. In the meantime, explore:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/dashboard/templates"
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm backdrop-blur-sm border border-white/10"
            >
              Templates
            </Link>
            <Link
              to="/dashboard/performance"
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm backdrop-blur-sm border border-white/10"
            >
              Performance
            </Link>
            <Link
              to="/dashboard/store"
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm backdrop-blur-sm border border-white/10"
            >
              Store Manager
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
