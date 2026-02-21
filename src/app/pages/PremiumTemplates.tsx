import { useState } from 'react';
import { Link } from 'react-router';
import { useWebBoss } from '../context/WebBossContext';
import { toast } from 'sonner';
import { 
  Sparkles,
  Crown,
  ShoppingBag,
  Coffee,
  Scissors,
  Briefcase,
  Laptop,
  Heart,
  Flame,
  Zap,
  Star,
  Check,
  X,
  Play,
  Gift,
  Calendar,
  TrendingUp,
  Filter,
  Search,
  ArrowLeft,
  Lock,
  Unlock,
  Eye,
  Download
} from 'lucide-react';

interface PremiumTemplate {
  id: string;
  name: string;
  category: 'industry' | 'animated' | 'seasonal';
  industry?: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  previewUrl: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  icon: any;
  badge?: string;
  popular?: boolean;
  animated?: boolean;
  downloads: number;
}

const premiumTemplates: PremiumTemplate[] = [
  // Industry-Specific Templates
  {
    id: 'luxury-fashion',
    name: 'Luxury Fashion Pro',
    category: 'industry',
    industry: 'Fashion',
    price: 15000,
    originalPrice: 20000,
    description: 'Elegant template designed for high-end fashion brands and boutiques',
    features: [
      'Animated product showcase',
      'Instagram feed integration',
      'Lookbook gallery',
      'VIP customer portal',
      'Seasonal collection rotator'
    ],
    previewUrl: '/preview/luxury-fashion',
    colors: {
      primary: '#000000',
      secondary: '#D4AF37',
      accent: '#FFFFFF',
      background: '#F5F5F5'
    },
    icon: Scissors,
    badge: '25% OFF',
    popular: true,
    animated: true,
    downloads: 342
  },
  {
    id: 'gourmet-restaurant',
    name: 'Gourmet Restaurant',
    category: 'industry',
    industry: 'Food & Beverage',
    price: 12000,
    description: 'Premium template for upscale restaurants and food businesses',
    features: [
      'Digital menu integration',
      'Table reservation system',
      'Chef\'s specials carousel',
      'Photo gallery with lightbox',
      'WhatsApp direct ordering'
    ],
    previewUrl: '/preview/gourmet',
    colors: {
      primary: '#8B4513',
      secondary: '#FFD700',
      accent: '#FF6347',
      background: '#FFF8DC'
    },
    icon: Coffee,
    animated: false,
    downloads: 267
  },
  {
    id: 'beauty-glam',
    name: 'Beauty & Glam Studio',
    category: 'industry',
    industry: 'Beauty & Wellness',
    price: 13500,
    originalPrice: 18000,
    description: 'Stunning template for beauty salons and makeup artists',
    features: [
      'Before/after slider',
      'Service pricing table',
      'Booking calendar',
      'Portfolio gallery',
      'Customer testimonials carousel'
    ],
    previewUrl: '/preview/beauty-glam',
    colors: {
      primary: '#FF1493',
      secondary: '#FFB6C1',
      accent: '#FFD700',
      background: '#FFF0F5'
    },
    icon: Sparkles,
    badge: '33% OFF',
    animated: true,
    downloads: 421
  },
  {
    id: 'corporate-executive',
    name: 'Corporate Executive',
    category: 'industry',
    industry: 'Professional Services',
    price: 14000,
    description: 'Professional template for consultants and corporate services',
    features: [
      'Client case studies',
      'Service packages',
      'Team profiles',
      'Downloadable resources',
      'Contact form integration'
    ],
    previewUrl: '/preview/corporate',
    colors: {
      primary: '#003366',
      secondary: '#0066CC',
      accent: '#00BFFF',
      background: '#F0F8FF'
    },
    icon: Briefcase,
    popular: true,
    animated: false,
    downloads: 298
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup Pro',
    category: 'industry',
    industry: 'Technology',
    price: 15000,
    description: 'Modern template for tech startups and digital agencies',
    features: [
      'Animated logo showcase',
      'Product demo videos',
      'Pricing comparison',
      'Newsletter signup',
      'Live chat integration'
    ],
    previewUrl: '/preview/tech-startup',
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      background: '#0F172A'
    },
    icon: Laptop,
    animated: true,
    downloads: 389
  },

  // Animated Templates
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'animated',
    price: 10000,
    originalPrice: 15000,
    description: 'Eye-catching template with neon animations and glow effects',
    features: [
      'Neon text animations',
      'Glow hover effects',
      'Particle background',
      'Smooth transitions',
      'Custom cursor effects'
    ],
    previewUrl: '/preview/neon-glow',
    colors: {
      primary: '#FF00FF',
      secondary: '#00FFFF',
      accent: '#FFFF00',
      background: '#0A0A0A'
    },
    icon: Zap,
    badge: '33% OFF',
    popular: true,
    animated: true,
    downloads: 567
  },
  {
    id: 'parallax-motion',
    name: 'Parallax Motion',
    category: 'animated',
    price: 11000,
    description: 'Dynamic template with parallax scrolling and motion effects',
    features: [
      'Parallax scrolling',
      'Motion on scroll',
      'Fade-in animations',
      'Floating elements',
      'Video backgrounds'
    ],
    previewUrl: '/preview/parallax',
    colors: {
      primary: '#4F46E5',
      secondary: '#7C3AED',
      accent: '#EC4899',
      background: '#1E1B4B'
    },
    icon: TrendingUp,
    animated: true,
    downloads: 445
  },
  {
    id: 'glassmorphism-pro',
    name: 'Glassmorphism Pro',
    category: 'animated',
    price: 9500,
    description: 'Modern glassmorphism design with blur and transparency effects',
    features: [
      'Glass card effects',
      'Backdrop blur',
      'Gradient animations',
      'Smooth hover states',
      'Responsive layouts'
    ],
    previewUrl: '/preview/glassmorphism',
    colors: {
      primary: '#FFFFFF',
      secondary: '#E0E7FF',
      accent: '#818CF8',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    icon: Sparkles,
    animated: true,
    downloads: 523
  },

  // Seasonal Templates
  {
    id: 'christmas-festive',
    name: 'Christmas Festive',
    category: 'seasonal',
    price: 8000,
    originalPrice: 12000,
    description: 'Festive template perfect for holiday season promotions',
    features: [
      'Snowfall animation',
      'Holiday countdown timer',
      'Gift promotion banners',
      'Festive color scheme',
      'Special offers section'
    ],
    previewUrl: '/preview/christmas',
    colors: {
      primary: '#C41E3A',
      secondary: '#165B33',
      accent: '#FFD700',
      background: '#FFFFFF'
    },
    icon: Gift,
    badge: '33% OFF',
    animated: true,
    downloads: 678
  },
  {
    id: 'valentine-romance',
    name: 'Valentine Romance',
    category: 'seasonal',
    price: 7500,
    description: 'Romantic template for Valentine\'s Day campaigns',
    features: [
      'Heart animations',
      'Romantic color palette',
      'Love quotes rotator',
      'Gift guide section',
      'Couples testimonials'
    ],
    previewUrl: '/preview/valentine',
    colors: {
      primary: '#FF1493',
      secondary: '#FF69B4',
      accent: '#FFB6C1',
      background: '#FFF0F5'
    },
    icon: Heart,
    animated: true,
    downloads: 421
  },
  {
    id: 'black-friday',
    name: 'Black Friday Rush',
    category: 'seasonal',
    price: 9000,
    description: 'High-energy template for Black Friday and sales events',
    features: [
      'Countdown timer',
      'Flash sale banners',
      'Deal of the day',
      'Limited stock indicators',
      'Urgency animations'
    ],
    previewUrl: '/preview/black-friday',
    colors: {
      primary: '#000000',
      secondary: '#FF0000',
      accent: '#FFD700',
      background: '#1A1A1A'
    },
    icon: Flame,
    popular: true,
    animated: true,
    downloads: 892
  },
  {
    id: 'summer-vibes',
    name: 'Summer Vibes',
    category: 'seasonal',
    price: 7000,
    description: 'Bright and cheerful template for summer promotions',
    features: [
      'Beach-themed graphics',
      'Bright color schemes',
      'Summer collection showcase',
      'Vacation mode banner',
      'Sun animation effects'
    ],
    previewUrl: '/preview/summer',
    colors: {
      primary: '#FFD700',
      secondary: '#FF6347',
      accent: '#00CED1',
      background: '#FFF8DC'
    },
    icon: Star,
    animated: false,
    downloads: 356
  }
];

export function PremiumTemplates() {
  const { updateProfile } = useWebBoss();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'industry' | 'animated' | 'seasonal'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<PremiumTemplate | null>(null);
  const [purchasedTemplates, setPurchasedTemplates] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Templates', icon: Sparkles },
    { id: 'industry', name: 'Industry-Specific', icon: ShoppingBag },
    { id: 'animated', name: 'Animated', icon: Zap },
    { id: 'seasonal', name: 'Seasonal', icon: Calendar }
  ];

  const industries = ['all', 'Fashion', 'Food & Beverage', 'Beauty & Wellness', 'Professional Services', 'Technology'];

  const filteredTemplates = premiumTemplates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const industryMatch = selectedIndustry === 'all' || template.industry === selectedIndustry;
    const searchMatch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && industryMatch && searchMatch;
  });

  const handlePurchase = (template: PremiumTemplate) => {
    // Mock purchase flow
    toast.success(`${template.name} purchased successfully! ✨`, {
      description: 'Template has been added to your collection'
    });
    setPurchasedTemplates([...purchasedTemplates, template.id]);
    setPreviewTemplate(null);
  };

  const handleApplyTemplate = (template: PremiumTemplate) => {
    if (!purchasedTemplates.includes(template.id)) {
      toast.error('Please purchase this template first');
      return;
    }
    
    updateProfile({
      themeColors: {
        primary: template.colors.primary,
        secondary: template.colors.secondary,
        accent: template.colors.accent,
        background: template.colors.background
      }
    });
    
    toast.success(`${template.name} applied successfully! 🎨`, {
      description: 'Your page has been updated'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Premium Templates</h1>
              <p className="text-slate-600">Professional templates to elevate your brand</p>
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/templates"
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Free Templates
        </Link>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-900">{premiumTemplates.length}</p>
              <p className="text-sm text-purple-700">Premium Templates</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">5,000+</p>
              <p className="text-sm text-green-700">Total Downloads</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-900">4.9/5</p>
              <p className="text-sm text-amber-700">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
            {/* Category Pills */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry Filter */}
            {selectedCategory === 'industry' && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Industry</p>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedIndustry === industry
                          ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {industry === 'all' ? 'All Industries' : industry}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          const isPurchased = purchasedTemplates.includes(template.id);
          
          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Preview Image */}
              <div 
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ background: typeof template.colors.background === 'string' && template.colors.background.startsWith('linear-gradient') ? template.colors.background : template.colors.background }}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {template.badge && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      {template.badge}
                    </span>
                  )}
                  {template.popular && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" fill="white" />
                      Popular
                    </span>
                  )}
                  {template.animated && (
                    <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Play className="w-3 h-3" fill="white" />
                      Animated
                    </span>
                  )}
                </div>

                {/* Icon Preview */}
                <div className="relative">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2"
                    style={{ 
                      backgroundColor: `${template.colors.primary}20`,
                      borderColor: template.colors.primary
                    }}
                  >
                    <IconComponent 
                      className="w-12 h-12" 
                      style={{ color: template.colors.primary }}
                    />
                  </div>
                </div>

                {/* Lock/Unlock Icon */}
                <div className="absolute top-3 right-3">
                  {isPurchased ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Unlock className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{template.name}</h3>
                    <p className="text-sm text-slate-500">
                      {template.industry || template.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">
                      ₦{(template.price / 1000).toFixed(1)}k
                    </p>
                    {template.originalPrice && (
                      <p className="text-sm text-slate-400 line-through">
                        ₦{(template.originalPrice / 1000).toFixed(1)}k
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {template.description}
                </p>

                {/* Features */}
                <div className="mb-4 space-y-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                      <span className="line-clamp-1">{feature}</span>
                    </div>
                  ))}
                  {template.features.length > 3 && (
                    <p className="text-xs text-slate-500 ml-6">
                      +{template.features.length - 3} more features
                    </p>
                  )}
                </div>

                {/* Downloads */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                  <Download className="w-4 h-4" />
                  <span>{template.downloads} downloads</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  {isPurchased ? (
                    <button
                      onClick={() => handleApplyTemplate(template)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-[#22C55E] text-white rounded-xl hover:bg-[#16A34A] transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Apply
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(template)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Buy
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No templates found</h3>
          <p className="text-slate-600">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${previewTemplate.colors.primary}20` }}
                >
                  <previewTemplate.icon 
                    className="w-6 h-6" 
                    style={{ color: previewTemplate.colors.primary }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{previewTemplate.name}</h2>
                  <p className="text-slate-600">{previewTemplate.description}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Preview Image */}
              <div 
                className="h-80 rounded-2xl flex items-center justify-center"
                style={{ background: typeof previewTemplate.colors.background === 'string' && previewTemplate.colors.background.startsWith('linear-gradient') ? previewTemplate.colors.background : previewTemplate.colors.background }}
              >
                <div 
                  className="w-32 h-32 rounded-3xl flex items-center justify-center backdrop-blur-sm border-4"
                  style={{ 
                    backgroundColor: `${previewTemplate.colors.primary}30`,
                    borderColor: previewTemplate.colors.primary
                  }}
                >
                  <previewTemplate.icon 
                    className="w-16 h-16" 
                    style={{ color: previewTemplate.colors.primary }}
                  />
                </div>
              </div>

              {/* Features List */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Included Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {previewTemplate.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Color Palette</h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div 
                      className="h-20 rounded-xl mb-2"
                      style={{ backgroundColor: previewTemplate.colors.primary }}
                    ></div>
                    <p className="text-xs text-slate-600 text-center">Primary</p>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-20 rounded-xl mb-2"
                      style={{ backgroundColor: previewTemplate.colors.secondary }}
                    ></div>
                    <p className="text-xs text-slate-600 text-center">Secondary</p>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-20 rounded-xl mb-2"
                      style={{ backgroundColor: previewTemplate.colors.accent }}
                    ></div>
                    <p className="text-xs text-slate-600 text-center">Accent</p>
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      ₦{(previewTemplate.price / 1000).toFixed(1)}k
                    </p>
                    {previewTemplate.originalPrice && (
                      <p className="text-slate-500 line-through">
                        ₦{(previewTemplate.originalPrice / 1000).toFixed(1)}k
                      </p>
                    )}
                  </div>
                  {previewTemplate.badge && (
                    <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full">
                      {previewTemplate.badge}
                    </span>
                  )}
                </div>

                {purchasedTemplates.includes(previewTemplate.id) ? (
                  <button
                    onClick={() => {
                      handleApplyTemplate(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                    className="w-full py-4 bg-[#22C55E] text-white rounded-xl font-semibold hover:bg-[#16A34A] transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Apply This Template
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(previewTemplate)}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Purchase Template
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
