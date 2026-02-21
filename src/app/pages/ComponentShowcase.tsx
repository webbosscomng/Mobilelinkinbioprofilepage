import { 
  Eye, 
  MousePointerClick, 
  ShoppingBag, 
  MessageCircle,
  TrendingUp,
  Link2,
  Palette,
  Zap
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { LinkRow } from '../components/dashboard/LinkRow';
import { ThemeCard } from '../components/dashboard/ThemeCard';
import { EmptyLinksState } from '../components/dashboard/EmptyLinksState';

export function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">Web Boss</h1>
          </div>
          <p className="text-xl text-slate-600">Component Library & Design System</p>
        </div>

        {/* Stat Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Stat Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Eye}
              label="Total Views"
              value="2,847"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              icon={MousePointerClick}
              label="Link Clicks"
              value="1,234"
              trend={{ value: 8.2, isPositive: true }}
            />
            <StatCard
              icon={TrendingUp}
              label="Top Link"
              value="WhatsApp"
              trend={{ value: 3.4, isPositive: false }}
            />
            <StatCard
              icon={Link2}
              label="Active Links"
              value={8}
            />
          </div>
        </section>

        {/* Link Rows */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Link Manager Rows</h2>
          <div className="space-y-3 max-w-4xl">
            <LinkRow
              id="1"
              icon={ShoppingBag}
              label="Shop Our Latest Collection"
              url="https://shop.example.com"
              clicks={234}
              isVisible={true}
              onToggleVisibility={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
            <LinkRow
              id="2"
              icon={MessageCircle}
              label="Order on WhatsApp"
              url="https://wa.me/2348012345678"
              clicks={456}
              isVisible={false}
              onToggleVisibility={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        </section>

        {/* Theme Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Theme Selector Cards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl">
            <ThemeCard
              name="Dark Navy"
              preview={{
                background: '#0F172A',
                card: '#FFFFFF',
                accent: '#22C55E',
              }}
              isSelected={true}
              onSelect={() => {}}
            />
            <ThemeCard
              name="Clean Light"
              preview={{
                background: '#F8FAFC',
                card: '#FFFFFF',
                accent: '#22C55E',
              }}
              isSelected={false}
              onSelect={() => {}}
            />
            <ThemeCard
              name="Brand Green"
              preview={{
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                card: '#FFFFFF',
                accent: '#0F172A',
              }}
              isSelected={false}
              onSelect={() => {}}
            />
            <ThemeCard
              name="Minimal Gray"
              preview={{
                background: '#E2E8F0',
                card: '#FFFFFF',
                accent: '#475569',
              }}
              isSelected={false}
              onSelect={() => {}}
            />
            <ThemeCard
              name="Sunset"
              preview={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                card: '#FFFFFF',
                accent: '#0F172A',
              }}
              isSelected={false}
              onSelect={() => {}}
            />
            <ThemeCard
              name="Ocean Blue"
              preview={{
                background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
                card: '#FFFFFF',
                accent: '#1E293B',
              }}
              isSelected={false}
              onSelect={() => {}}
            />
          </div>
        </section>

        {/* Empty State */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Empty State</h2>
          <div className="max-w-2xl">
            <EmptyLinksState onAddLink={() => {}} />
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <div className="w-full h-24 rounded-xl bg-[#0F172A] mb-2 border border-slate-200" />
              <p className="text-sm font-medium text-slate-700">Navy Background</p>
              <p className="text-xs text-slate-500 font-mono">#0F172A</p>
            </div>
            <div>
              <div className="w-full h-24 rounded-xl bg-[#22C55E] mb-2" />
              <p className="text-sm font-medium text-slate-700">Primary Accent</p>
              <p className="text-xs text-slate-500 font-mono">#22C55E</p>
            </div>
            <div>
              <div className="w-full h-24 rounded-xl bg-white mb-2 border-2 border-slate-200" />
              <p className="text-sm font-medium text-slate-700">Card Background</p>
              <p className="text-xs text-slate-500 font-mono">#FFFFFF</p>
            </div>
            <div>
              <div className="w-full h-24 rounded-xl bg-[#F59E0B] mb-2" />
              <p className="text-sm font-medium text-slate-700">Amber Upgrade</p>
              <p className="text-xs text-slate-500 font-mono">#F59E0B</p>
            </div>
            <div>
              <div className="w-full h-24 rounded-xl bg-slate-100 mb-2 border border-slate-200" />
              <p className="text-sm font-medium text-slate-700">Background Alt</p>
              <p className="text-xs text-slate-500 font-mono">#F1F5F9</p>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Quick Navigation</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <a
                href="/"
                className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Zap className="w-5 h-5 text-[#22C55E]" />
                <span className="font-medium text-slate-800">Landing Page</span>
              </a>
              <a
                href="/profile/chiomasfashion"
                className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Palette className="w-5 h-5 text-[#22C55E]" />
                <span className="font-medium text-slate-800">Profile Page</span>
              </a>
              <a
                href="/demo"
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl hover:shadow-lg transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Live Demo ✨</span>
              </a>
              <a
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <TrendingUp className="w-5 h-5 text-[#22C55E]" />
                <span className="font-medium text-slate-800">Dashboard</span>
              </a>
              <a
                href="/dashboard/links"
                className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Link2 className="w-5 h-5 text-[#22C55E]" />
                <span className="font-medium text-slate-800">Links Manager</span>
              </a>
              <a
                href="/dashboard/appearance"
                className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Palette className="w-5 h-5 text-[#22C55E]" />
                <span className="font-medium text-slate-800">Appearance</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}