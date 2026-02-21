import {
  Eye,
  MousePointerClick,
  Users,
  TrendingUp,
  ArrowRight,
  Share2,
  QrCode,
  Download,
  Gauge,
  Sparkles,
  Crown,
  Copy
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { LivePreview } from '../components/dashboard/LivePreview';
import { QRCodeGenerator } from '../components/dashboard/QRCodeGenerator';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useWebBoss } from '../context/WebBossContext';
import { toast } from 'sonner';

export function Overview() {
  const { profile: authProfile } = useAuth();
  const { links, profile } = useWebBoss();
  const [stats, setStats] = useState({
    totalViews: 0,
    linkClicks: 0,
    topLink: { title: 'N/A', clicks: 0 },
    profileVisits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [authProfile?.id]);

  const loadStats = async () => {
    if (!authProfile?.id) return;

    try {
      setLoading(true);

      // Get total page views
      const { count: viewsCount } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', authProfile.id);

      // Get total link clicks
      const { data: clicksData } = await supabase
        .from('clicks')
        .select('link_id')
        .eq('profile_id', authProfile.id);

      // Get top performing link
      const { data: linksData } = await supabase
        .from('links')
        .select('title, clicks')
        .eq('profile_id', authProfile.id)
        .order('clicks', { ascending: false })
        .limit(1);

      setStats({
        totalViews: viewsCount || 0,
        linkClicks: clicksData?.length || 0,
        topLink: linksData?.[0] || { title: 'N/A', clicks: 0 },
        profileVisits: viewsCount || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    {
      icon: Eye,
      label: 'Total Views',
      value: loading ? '...' : stats.totalViews.toLocaleString(),
      trend: { value: 12.5, isPositive: true },
    },
    {
      icon: MousePointerClick,
      label: 'Link Clicks',
      value: loading ? '...' : stats.linkClicks.toLocaleString(),
      trend: { value: 8.2, isPositive: true },
    },
    {
      icon: TrendingUp,
      label: 'Top Link',
      value: stats.topLink.title,
      trend: { value: stats.topLink.clicks, isPositive: true },
    },
    {
      icon: Share2,
      label: 'Profile Visits',
      value: loading ? '...' : stats.profileVisits.toLocaleString(),
      trend: { value: 3.4, isPositive: false },
    },
  ];

  const profileUrl = `https://webboss.link/${authProfile?.username || ''}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Link copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: profile.name || 'My Link-in-Bio',
        url: profileUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleViewPage = () => {
    window.open(`/profile/${authProfile?.username}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">
          Welcome back, {profile.name || authProfile?.full_name || 'there'} 👋
        </h1>
        <p className="text-slate-600">
          Here's how your Link-in-Bio page is performing today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleViewPage}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors shadow-sm"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">View Live Page</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share Link</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-colors border border-slate-200"
        >
          <Copy className="w-4 h-4" />
          <span className="text-sm font-medium">Copy URL</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statsDisplay.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Your Link */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Your Link-in-Bio URL</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <p className="text-sm text-slate-600 font-mono">
                  webboss.link/chiomasfashion
                </p>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Copy</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Link clicked', detail: 'Shop Our Latest Collection', time: '2 mins ago' },
                { action: 'Profile view', detail: 'From Lagos, Nigeria', time: '5 mins ago' },
                { action: 'Link clicked', detail: 'Order on WhatsApp', time: '12 mins ago' },
                { action: 'Profile view', detail: 'From Abuja, Nigeria', time: '23 mins ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links to New Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/dashboard/performance" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Performance & SEO
                </h3>
                <p className="text-sm text-slate-700">
                  Check your page speed, mobile score, and SEO recommendations
                </p>
              </div>
            </Link>

            <Link to="/dashboard/templates" className="group">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Templates Library
                </h3>
                <p className="text-sm text-slate-700">
                  Browse industry-specific themes and customize your page instantly
                </p>
              </div>
            </Link>

            <Link to="/dashboard/premium-templates" className="group">
              <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 rounded-2xl p-6 border-2 border-gradient-to-r from-pink-200 to-orange-200 hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-xs font-bold">
                  NEW
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-pink-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Premium Templates
                </h3>
                <p className="text-sm text-slate-700">
                  Unlock animated & seasonal templates from ₦7k
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column - Live Preview */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 space-y-6">
            <LivePreview />
            <QRCodeGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}