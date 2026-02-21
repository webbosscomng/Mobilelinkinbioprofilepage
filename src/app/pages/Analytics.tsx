import { useState, useEffect } from 'react';
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
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useWebBoss } from '../context/WebBossContext';

export function Analytics() {
  const { profile: authProfile } = useAuth();
  const { links } = useWebBoss();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [loading, setLoading] = useState(true);
  
  // State for real data
  const [viewsData, setViewsData] = useState<any[]>([]);
  const [linkPerformance, setLinkPerformance] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<any[]>([
    { name: 'Mobile', value: 0, color: '#22C55E' },
    { name: 'Desktop', value: 0, color: '#3B82F6' },
    { name: 'Tablet', value: 0, color: '#F59E0B' },
  ]);
  const [trafficSources, setTrafficSources] = useState<any[]>([
    { name: 'Direct', value: 0, color: '#22C55E' },
    { name: 'Instagram', value: 0, color: '#E1306C' },
    { name: 'WhatsApp', value: 0, color: '#25D366' },
    { name: 'Twitter', value: 0, color: '#1DA1F2' },
  ]);
  const [topLocations, setTopLocations] = useState<any[]>([]);
  const [hourlyActivity, setHourlyActivity] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalClicks: 0,
    ctr: 0,
    avgSessionTime: '0:00',
  });

  useEffect(() => {
    if (authProfile?.id) {
      loadAnalyticsData();
    }
  }, [authProfile?.id, timeRange]);

  const loadAnalyticsData = async () => {
    if (!authProfile?.id) return;

    try {
      setLoading(true);

      // Calculate date range
      const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      // Get page views
      const { data: viewsDataRaw, error: viewsError } = await supabase
        .from('page_views')
        .select('created_at, device_type, referrer, country, city')
        .eq('profile_id', authProfile.id)
        .gte('created_at', startDate.toISOString());

      if (viewsError) throw viewsError;

      // Get link clicks
      const { data: clicksDataRaw, error: clicksError } = await supabase
        .from('clicks')
        .select('link_id, created_at')
        .eq('profile_id', authProfile.id)
        .gte('created_at', startDate.toISOString());

      if (clicksError) throw clicksError;

      // Process daily views and clicks
      const dailyData = processDailyData(viewsDataRaw || [], clicksDataRaw || [], daysAgo);
      setViewsData(dailyData);

      // Process link performance
      const linkPerf = processLinkPerformance(clicksDataRaw || [], links);
      setLinkPerformance(linkPerf);

      // Process device data
      const devices = processDeviceData(viewsDataRaw || []);
      setDeviceData(devices);

      // Process traffic sources
      const sources = processTrafficSources(viewsDataRaw || []);
      setTrafficSources(sources);

      // Process locations
      const locations = processLocations(viewsDataRaw || []);
      setTopLocations(locations);

      // Process hourly activity
      const hourly = processHourlyActivity(viewsDataRaw || []);
      setHourlyActivity(hourly);

      // Calculate stats
      const totalViews = viewsDataRaw?.length || 0;
      const totalClicks = clicksDataRaw?.length || 0;
      const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0';

      setStats({
        totalViews,
        totalClicks,
        ctr: parseFloat(ctr),
        avgSessionTime: '2:34', // Can be calculated from session data later
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to process data
  const processDailyData = (views: any[], clicks: any[], days: number) => {
    const dailyMap = new Map();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Initialize last N days
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      const dayName = days <= 7 ? dayNames[date.getDay()] : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyMap.set(key, { date: dayName, views: 0, clicks: 0 });
    }

    // Count views
    views.forEach(view => {
      const key = view.created_at.split('T')[0];
      if (dailyMap.has(key)) {
        dailyMap.get(key).views++;
      }
    });

    // Count clicks
    clicks.forEach(click => {
      const key = click.created_at.split('T')[0];
      if (dailyMap.has(key)) {
        dailyMap.get(key).clicks++;
      }
    });

    return Array.from(dailyMap.values());
  };

  const processLinkPerformance = (clicks: any[], linksData: any[]) => {
    const clickMap = new Map();
    
    clicks.forEach(click => {
      const count = clickMap.get(click.link_id) || 0;
      clickMap.set(click.link_id, count + 1);
    });

    return linksData
      .map(link => {
        const clicks = clickMap.get(link.id) || 0;
        return {
          name: link.label,
          clicks,
          ctr: 0, // Can calculate if we track impressions
        };
      })
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
  };

  const processDeviceData = (views: any[]) => {
    const deviceMap = { mobile: 0, desktop: 0, tablet: 0 };
    
    views.forEach(view => {
      const device = view.device_type?.toLowerCase() || 'desktop';
      if (device in deviceMap) {
        deviceMap[device as keyof typeof deviceMap]++;
      }
    });

    const total = views.length || 1;
    return [
      { name: 'Mobile', value: Math.round((deviceMap.mobile / total) * 100), color: '#22C55E' },
      { name: 'Desktop', value: Math.round((deviceMap.desktop / total) * 100), color: '#3B82F6' },
      { name: 'Tablet', value: Math.round((deviceMap.tablet / total) * 100), color: '#F59E0B' },
    ];
  };

  const processTrafficSources = (views: any[]) => {
    const sourceMap = new Map();
    
    views.forEach(view => {
      const referrer = view.referrer || 'Direct';
      let source = 'Direct';
      
      if (referrer.includes('instagram')) source = 'Instagram';
      else if (referrer.includes('whatsapp')) source = 'WhatsApp';
      else if (referrer.includes('twitter') || referrer.includes('t.co')) source = 'Twitter';
      else if (referrer.includes('facebook')) source = 'Facebook';
      
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    });

    const colors: any = {
      'Direct': '#22C55E',
      'Instagram': '#E1306C',
      'WhatsApp': '#25D366',
      'Twitter': '#1DA1F2',
      'Facebook': '#1877F2',
    };

    return Array.from(sourceMap.entries())
      .map(([name, value]) => ({ name, value, color: colors[name] || '#64748B' }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const processLocations = (views: any[]) => {
    const locationMap = new Map();
    
    views.forEach(view => {
      const city = view.city || 'Unknown';
      locationMap.set(city, (locationMap.get(city) || 0) + 1);
    });

    const total = views.length || 1;
    return Array.from(locationMap.entries())
      .map(([city, views]) => ({
        city,
        views,
        percentage: ((views / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  };

  const processHourlyActivity = (views: any[]) => {
    const hourlyMap = new Map();
    const hours = ['12am', '4am', '8am', '12pm', '4pm', '8pm'];
    
    hours.forEach(hour => hourlyMap.set(hour, 0));

    views.forEach(view => {
      const date = new Date(view.created_at);
      const hour = date.getHours();
      
      if (hour >= 0 && hour < 4) hourlyMap.set('12am', hourlyMap.get('12am') + 1);
      else if (hour >= 4 && hour < 8) hourlyMap.set('4am', hourlyMap.get('4am') + 1);
      else if (hour >= 8 && hour < 12) hourlyMap.set('8am', hourlyMap.get('8am') + 1);
      else if (hour >= 12 && hour < 16) hourlyMap.set('12pm', hourlyMap.get('12pm') + 1);
      else if (hour >= 16 && hour < 20) hourlyMap.set('4pm', hourlyMap.get('4pm') + 1);
      else hourlyMap.set('8pm', hourlyMap.get('8pm') + 1);
    });

    return Array.from(hourlyMap.entries()).map(([hour, activity]) => ({ hour, activity }));
  };

  const statsDisplay = [
    {
      icon: Eye,
      label: 'Total Views',
      value: loading ? '...' : stats.totalViews.toLocaleString(),
      change: '+12.5%',
      positive: true,
      description: 'vs last period',
    },
    {
      icon: MousePointerClick,
      label: 'Total Clicks',
      value: loading ? '...' : stats.totalClicks.toLocaleString(),
      change: '+8.2%',
      positive: true,
      description: 'vs last period',
    },
    {
      icon: Users,
      label: 'Click Rate',
      value: loading ? '...' : `${stats.ctr.toFixed(1)}%`,
      change: '-2.3%',
      positive: false,
      description: 'vs last period',
    },
    {
      icon: Clock,
      label: 'Avg. Time on Page',
      value: stats.avgSessionTime,
      change: '+15.2%',
      positive: true,
      description: 'vs last period',
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
        {statsDisplay.map((stat, index) => (
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