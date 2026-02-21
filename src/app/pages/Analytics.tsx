import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  MousePointerClick, 
  Users, 
  Clock,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  ExternalLink
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts';

export function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Mock data for charts
  const viewsData = [
    { date: 'Mon', views: 245, clicks: 89 },
    { date: 'Tue', views: 312, clicks: 124 },
    { date: 'Wed', views: 428, clicks: 167 },
    { date: 'Thu', views: 389, clicks: 142 },
    { date: 'Fri', views: 502, clicks: 201 },
    { date: 'Sat', views: 634, clicks: 267 },
    { date: 'Sun', views: 556, clicks: 198 },
  ];

  const linkPerformance = [
    { name: 'WhatsApp Order', clicks: 456, ctr: 16.2 },
    { name: 'Shop Collection', clicks: 234, ctr: 8.3 },
    { name: 'View Catalog', clicks: 189, ctr: 6.7 },
    { name: 'Book Fitting', clicks: 87, ctr: 3.1 },
    { name: 'Instagram', clicks: 67, ctr: 2.4 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 72, color: '#22C55E' },
    { name: 'Desktop', value: 23, color: '#3B82F6' },
    { name: 'Tablet', value: 5, color: '#F59E0B' },
  ];

  const trafficSources = [
    { name: 'Instagram', value: 45, color: '#E1306C' },
    { name: 'Direct', value: 28, color: '#22C55E' },
    { name: 'WhatsApp', value: 18, color: '#25D366' },
    { name: 'Twitter', value: 9, color: '#1DA1F2' },
  ];

  const topLocations = [
    { city: 'Lagos', views: 1247, percentage: 43.8 },
    { city: 'Abuja', views: 623, percentage: 21.9 },
    { city: 'Port Harcourt', views: 412, percentage: 14.5 },
    { city: 'Ibadan', views: 298, percentage: 10.5 },
    { city: 'Others', views: 267, percentage: 9.3 },
  ];

  const hourlyActivity = [
    { hour: '12am', activity: 12 },
    { hour: '4am', activity: 8 },
    { hour: '8am', activity: 45 },
    { hour: '12pm', activity: 123 },
    { hour: '4pm', activity: 178 },
    { hour: '8pm', activity: 234 },
  ];

  const stats = [
    {
      icon: Eye,
      label: 'Total Views',
      value: '3,066',
      change: '+12.5%',
      positive: true,
      description: 'vs last week',
    },
    {
      icon: MousePointerClick,
      label: 'Total Clicks',
      value: '1,188',
      change: '+8.2%',
      positive: true,
      description: 'vs last week',
    },
    {
      icon: Users,
      label: 'Click Rate',
      value: '38.7%',
      change: '-2.3%',
      positive: false,
      description: 'vs last week',
    },
    {
      icon: Clock,
      label: 'Avg. Time on Page',
      value: '2m 34s',
      change: '+15.2%',
      positive: true,
      description: 'vs last week',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">
            Analytics
          </h1>
          <p className="text-slate-600">
            Track your page performance and audience insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
          {[
            { label: 'Last 7 days', value: '7d' as const },
            { label: 'Last 30 days', value: '30d' as const },
            { label: 'Last 90 days', value: '90d' as const },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === option.value
                  ? 'bg-[#22C55E] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                stat.positive ? 'bg-[#22C55E]/10' : 'bg-amber-50'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.positive ? 'text-[#22C55E]' : 'text-amber-600'
                }`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                stat.positive 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-amber-50 text-amber-700'
              }`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
            <p className="text-sm text-slate-600">{stat.label}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Views & Clicks Over Time */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Views & Clicks Over Time</h2>
            <p className="text-sm text-slate-600">Daily performance for the last 7 days</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#22C55E] rounded-full" />
              <span className="text-sm text-slate-600">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full" />
              <span className="text-sm text-slate-600">Clicks</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area type="monotone" dataKey="views" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="clicks" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Link Performance */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Top Links</h2>
              <p className="text-sm text-slate-600">Most clicked links this week</p>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {linkPerformance.map((link, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#22C55E]">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{link.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-[#22C55E] rounded-full"
                        style={{ width: `${(link.clicks / 456) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{link.ctr}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{link.clicks}</p>
                  <p className="text-xs text-slate-500">clicks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Device Breakdown</h2>
              <p className="text-sm text-slate-600">How visitors access your page</p>
            </div>
            <Smartphone className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex items-center gap-8">
            <div className="h-48 flex-shrink-0">
              <ResponsiveContainer width={200} height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="text-sm text-slate-700">{device.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{device.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Traffic Sources</h2>
              <p className="text-sm text-slate-600">Where your visitors come from</p>
            </div>
            <Globe className="w-5 h-5 text-slate-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSources} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" />
                <YAxis dataKey="name" type="category" stroke="#64748B" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-1">Top Locations</h2>
              <p className="text-sm text-slate-600">Cities with most visitors</p>
            </div>
            <MapPin className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {topLocations.map((location, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-slate-700">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-900">{location.city}</p>
                    <p className="text-sm font-semibold text-slate-900">{location.views}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-[#22C55E] rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-12 text-right">{location.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Activity */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">Peak Activity Hours</h2>
            <p className="text-sm text-slate-600">When your audience is most active</p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="hour" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="activity" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
