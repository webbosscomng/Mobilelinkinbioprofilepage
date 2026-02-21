import { useState, useEffect } from 'react';
import { 
  Zap, 
  Check, 
  ExternalLink,
  Settings as SettingsIcon,
  Mail,
  ShoppingBag,
  MessageCircle,
  Video,
  Calendar,
  CreditCard,
  TrendingUp,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'marketing' | 'commerce' | 'communication' | 'analytics' | 'payments';
  isConnected: boolean;
  isPremium: boolean;
  color: string;
}

interface DBIntegration {
  id: string;
  service_name: string;
  is_active: boolean;
  config: any;
  created_at: string;
}

export function Integrations() {
  const { profile: authProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [connectedIntegrations, setConnectedIntegrations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Available integrations catalog
  const integrationsCatalog: Integration[] = [
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync your audience data with Mailchimp mailing lists',
      icon: Mail,
      category: 'marketing',
      isConnected: true,
      isPremium: false,
      color: '#FFE01B',
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to showcase products',
      icon: ShoppingBag,
      category: 'commerce',
      isConnected: false,
      isPremium: true,
      color: '#96BF48',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Enable WhatsApp chat widget on your page',
      icon: MessageCircle,
      category: 'communication',
      isConnected: true,
      isPremium: false,
      color: '#25D366',
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Add booking links for Zoom meetings',
      icon: Video,
      category: 'communication',
      isConnected: false,
      isPremium: false,
      color: '#2D8CFF',
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Allow visitors to book appointments directly',
      icon: Calendar,
      category: 'communication',
      isConnected: false,
      isPremium: false,
      color: '#006BFF',
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Accept payments directly on your page',
      icon: CreditCard,
      category: 'payments',
      isConnected: true,
      isPremium: false,
      color: '#00C3F7',
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      description: 'Process payments with Flutterwave',
      icon: CreditCard,
      category: 'payments',
      isConnected: false,
      isPremium: false,
      color: '#F5A623',
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track detailed visitor analytics with GA4',
      icon: TrendingUp,
      category: 'analytics',
      isConnected: false,
      isPremium: true,
      color: '#E37400',
    },
    {
      id: 'facebook-pixel',
      name: 'Facebook Pixel',
      description: 'Track conversions for Facebook ads',
      icon: TrendingUp,
      category: 'analytics',
      isConnected: false,
      isPremium: true,
      color: '#1877F2',
    },
  ];

  // Fetch connected integrations from the database
  useEffect(() => {
    const fetchConnectedIntegrations = async () => {
      if (!authProfile) return;
      const { data, error } = await supabase
        .from('integrations')
        .select('service_name')
        .eq('user_id', authProfile.id)
        .eq('is_active', true);

      if (error) {
        toast.error('Failed to fetch connected integrations');
        setLoading(false);
        return;
      }

      const connectedIds = new Set(data.map((integration: DBIntegration) => integration.service_name));
      setConnectedIntegrations(connectedIds);
      setLoading(false);
    };

    fetchConnectedIntegrations();
  }, [authProfile]);

  const categories = [
    { id: 'all', label: 'All', count: integrationsCatalog.length },
    { id: 'marketing', label: 'Marketing', count: integrationsCatalog.filter(i => i.category === 'marketing').length },
    { id: 'commerce', label: 'E-commerce', count: integrationsCatalog.filter(i => i.category === 'commerce').length },
    { id: 'communication', label: 'Communication', count: integrationsCatalog.filter(i => i.category === 'communication').length },
    { id: 'analytics', label: 'Analytics', count: integrationsCatalog.filter(i => i.category === 'analytics').length },
    { id: 'payments', label: 'Payments', count: integrationsCatalog.filter(i => i.category === 'payments').length },
  ];

  const filteredIntegrations = integrationsCatalog.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrationsCatalog.filter(i => connectedIntegrations.has(i.id)).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">
          Integrations
        </h1>
        <p className="text-slate-600">
          Connect your favorite tools and extend Web Boss functionality
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#22C55E]" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{integrationsCatalog.length}</p>
          </div>
          <p className="text-sm text-slate-600">Available Integrations</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{connectedCount}</p>
          </div>
          <p className="text-sm text-slate-600">Connected</p>
        </div>

        <div className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">Coming Soon</p>
          </div>
          <p className="text-sm text-white/90">More integrations</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-[#22C55E] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category.label}
                <span className="ml-2 opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#22C55E]/50 hover:shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${integration.color}20` }}
              >
                <integration.icon 
                  className="w-6 h-6" 
                  style={{ color: integration.color }}
                />
              </div>
              {connectedIntegrations.has(integration.id) ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                  <Check className="w-3 h-3" />
                  Connected
                </div>
              ) : integration.isPremium ? (
                <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold">
                  PRO
                </div>
              ) : null}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {integration.name}
            </h3>
            <p className="text-sm text-slate-600 mb-6 line-clamp-2">
              {integration.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {connectedIntegrations.has(integration.id) ? (
                <>
                  <button className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <SettingsIcon className="w-4 h-4" />
                    Configure
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                    Disconnect
                  </button>
                </>
              ) : (
                <button 
                  className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                    integration.isPremium
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                      : 'bg-[#22C55E] text-white hover:bg-[#1db954]'
                  }`}
                >
                  {integration.isPremium ? 'Upgrade to Connect' : 'Connect'}
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIntegrations.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No integrations found</h3>
          <p className="text-slate-600 mb-6">
            Try adjusting your search or filter to find what you're looking for
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-6 py-2 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Request Integration */}
      <div className="mt-8 bg-gradient-to-r from-slate-50 to-[#22C55E]/5 rounded-2xl p-8 border border-slate-200 text-center">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Can't find what you need?
        </h3>
        <p className="text-slate-600 mb-6">
          Let us know which integration you'd like to see next
        </p>
        <button className="px-6 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-medium">
          Request an Integration
        </button>
      </div>
    </div>
  );
}