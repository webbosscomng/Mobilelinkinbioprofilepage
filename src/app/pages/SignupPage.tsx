import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, User, Sparkles, AtSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await signUp(formData.email, formData.password, formData.fullName, formData.username);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#22C55E]/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-2xl font-bold text-slate-800">Web Boss</span>
        </Link>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h1>
          <p className="text-slate-600 mb-8">Start building your Link-in-Bio page for free</p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Business Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Chioma's Fashion Hub"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="chioma_fashion"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 text-[#22C55E] rounded mt-0.5" required />
              <span className="text-sm text-slate-600">
                I agree to the{' '}
                <Link to="/terms" className="text-[#22C55E] hover:text-[#1db954]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#22C55E] hover:text-[#1db954]">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-semibold"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-slate-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#22C55E] hover:text-[#1db954] font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}