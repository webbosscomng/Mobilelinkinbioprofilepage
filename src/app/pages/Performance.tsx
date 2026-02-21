import { 
  Zap, 
  Smartphone, 
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Clock,
  Gauge,
  FileText,
  Image as ImageIcon,
  Link2,
  Shield,
  Activity
} from 'lucide-react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export function Performance() {
  // Mock Lighthouse-style scores
  const performanceScore = 87;
  const mobileScore = 82;
  const seoScore = 91;
  const accessibilityScore = 94;

  const scoreData = [
    { name: 'Performance', score: performanceScore, color: '#22C55E' },
    { name: 'Mobile', score: mobileScore, color: '#3B82F6' },
    { name: 'SEO', score: seoScore, color: '#8B5CF6' },
    { name: 'Accessibility', score: accessibilityScore, color: '#F59E0B' },
  ];

  // Core Web Vitals
  const webVitals = [
    {
      name: 'LCP',
      label: 'Largest Contentful Paint',
      value: '1.8s',
      status: 'good' as const,
      description: 'Fast loading',
      threshold: 'Good: < 2.5s',
    },
    {
      name: 'FID',
      label: 'First Input Delay',
      value: '45ms',
      status: 'good' as const,
      description: 'Responsive to interactions',
      threshold: 'Good: < 100ms',
    },
    {
      name: 'CLS',
      label: 'Cumulative Layout Shift',
      value: '0.08',
      status: 'good' as const,
      description: 'Stable layout',
      threshold: 'Good: < 0.1',
    },
    {
      name: 'FCP',
      label: 'First Contentful Paint',
      value: '1.2s',
      status: 'good' as const,
      description: 'Fast initial render',
      threshold: 'Good: < 1.8s',
    },
  ];

  // Page metrics
  const pageMetrics = [
    { metric: 'Page Size', value: '248 KB', status: 'good' as const },
    { metric: 'Requests', value: '12', status: 'good' as const },
    { metric: 'Load Time', value: '1.8s', status: 'good' as const },
    { metric: 'Time to Interactive', value: '2.1s', status: 'good' as const },
  ];

  // SEO Recommendations
  const seoChecklist = [
    {
      category: 'Meta Tags',
      items: [
        { label: 'Page title is present', status: 'pass' as const },
        { label: 'Meta description is optimized', status: 'pass' as const },
        { label: 'Title length is optimal (50-60 chars)', status: 'pass' as const },
        { label: 'Meta description length is optimal', status: 'warning' as const, message: 'Could be longer (current: 87 chars, optimal: 150-160)' },
      ],
    },
    {
      category: 'Content & Structure',
      items: [
        { label: 'H1 tag is present and unique', status: 'pass' as const },
        { label: 'Images have alt text', status: 'pass' as const },
        { label: 'Links are descriptive', status: 'pass' as const },
        { label: 'Content is mobile-friendly', status: 'pass' as const },
      ],
    },
    {
      category: 'Technical SEO',
      items: [
        { label: 'HTTPS is enabled', status: 'pass' as const },
        { label: 'Mobile viewport is configured', status: 'pass' as const },
        { label: 'Canonical URL is set', status: 'warning' as const, message: 'Consider adding canonical tag' },
        { label: 'Structured data (Schema.org)', status: 'fail' as const, message: 'Add LocalBusiness schema for better local SEO' },
      ],
    },
    {
      category: 'Social Media',
      items: [
        { label: 'Open Graph tags present', status: 'pass' as const },
        { label: 'Twitter Card tags present', status: 'pass' as const },
        { label: 'Social share image optimized', status: 'pass' as const },
      ],
    },
  ];

  // Mobile performance insights
  const mobileInsights = [
    {
      icon: Smartphone,
      label: 'Mobile Readability',
      score: 95,
      status: 'excellent' as const,
      description: 'Text is easy to read on mobile devices',
    },
    {
      icon: Activity,
      label: 'Touch Target Size',
      score: 88,
      status: 'good' as const,
      description: 'Most buttons are easy to tap',
    },
    {
      icon: ImageIcon,
      label: 'Image Optimization',
      score: 78,
      status: 'moderate' as const,
      description: 'Some images could be compressed further',
    },
    {
      icon: Zap,
      label: 'Mobile Speed',
      score: 82,
      status: 'good' as const,
      description: 'Good performance on 4G networks',
    },
  ];

  // Optimization suggestions
  const optimizations = [
    {
      priority: 'high' as const,
      icon: ImageIcon,
      title: 'Optimize Images',
      description: 'Compress product images to improve load time on slow networks',
      impact: '+15% faster load time',
    },
    {
      priority: 'medium' as const,
      icon: FileText,
      title: 'Add Schema Markup',
      description: 'Add LocalBusiness structured data for better Google visibility',
      impact: 'Better local search rankings',
    },
    {
      priority: 'medium' as const,
      icon: Link2,
      title: 'Reduce External Links',
      description: 'Minimize requests to external domains',
      impact: '+5% faster load time',
    },
    {
      priority: 'low' as const,
      icon: Shield,
      title: 'Add Security Headers',
      description: 'Implement CSP and other security headers',
      impact: 'Improved security score',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#22C55E]';
    if (score >= 70) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-[#22C55E]/10';
    if (score >= 70) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'excellent':
        return 'text-[#22C55E] bg-[#22C55E]/10';
      case 'moderate':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
            <Gauge className="w-5 h-5 text-[#22C55E]" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800">
            Performance & SEO
          </h1>
        </div>
        <p className="text-slate-600">
          Monitor your page speed, mobile performance, and SEO health
        </p>
      </div>

      {/* Overall Scores */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {scoreData.map((item) => (
          <div key={item.name} className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-col items-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(item.score)}`}>
                {item.score}
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.score}%`, backgroundColor: item.color }}
                />
              </div>
              <p className="text-sm font-medium text-slate-700">{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-[#22C55E]" />
          <h2 className="text-lg font-semibold text-slate-800">Core Web Vitals</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {webVitals.map((vital) => (
            <div key={vital.name} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {vital.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{vital.value}</div>
              <p className="text-sm text-slate-600 mb-2">{vital.label}</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span>{vital.threshold}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Performance Insights */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Smartphone className="w-5 h-5 text-[#3B82F6]" />
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Mobile Performance</h2>
            <p className="text-sm text-slate-600">Critical for Nigerian mobile users</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mobileInsights.map((insight, index) => (
            <div key={index} className="p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getScoreBg(insight.score)}`}>
                  <insight.icon className={`w-5 h-5 ${getScoreColor(insight.score)}`} />
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(insight.status)}`}>
                  {insight.score}
                </div>
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">{insight.label}</p>
              <p className="text-xs text-slate-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Page Metrics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-[#8B5CF6]" />
          <h2 className="text-lg font-semibold text-slate-800">Page Metrics</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pageMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-slate-50">
              <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
              <p className="text-sm text-slate-600">{metric.metric}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-[#8B5CF6]" />
          <div>
            <h2 className="text-lg font-semibold text-slate-800">SEO Recommendations</h2>
            <p className="text-sm text-slate-600">Optimize for better search rankings</p>
          </div>
        </div>
        <div className="space-y-6">
          {seoChecklist.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                {section.category}
              </h3>
              <div className="space-y-2 ml-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">{item.label}</p>
                      {item.message && (
                        <p className="text-xs text-slate-600 mt-1">{item.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Optimization Suggestions</h2>
            <p className="text-sm text-slate-600">Actionable steps to improve performance</p>
          </div>
        </div>
        <div className="space-y-4">
          {optimizations.map((opt, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                <opt.icon className="w-6 h-6 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900">{opt.title}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getPriorityColor(opt.priority)}`}>
                    {opt.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{opt.description}</p>
                <div className="flex items-center gap-1 text-xs text-[#22C55E] font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {opt.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
