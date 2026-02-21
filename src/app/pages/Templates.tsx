import { useState } from 'react';
import { useWebBoss } from '../context/WebBossContext';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { 
  Palette, 
  Check, 
  Sparkles,
  ShoppingBag,
  Coffee,
  Scissors,
  Briefcase,
  Laptop,
  Heart,
  Zap,
  Crown,
  ArrowRight
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  icon: typeof ShoppingBag;
  description: string;
  backgroundColor: string;
  cardColor: string;
  accentColor: string;
  backgroundType: 'solid' | 'gradient' | 'pattern';
  preview: {
    profileName: string;
    bio: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export function Templates() {
  const { theme, updateTheme, updateProfile } = useWebBoss();
  const [selectedTemplate, setSelectedTemplate] = useState<string>(theme.id);

  const templates: Template[] = [
    {
      id: 'fashion',
      name: 'Fashion & Style',
      category: 'Retail',
      icon: ShoppingBag,
      description: 'Bold and elegant design perfect for fashion boutiques and clothing brands',
      backgroundColor: '#1A0B2E',
      cardColor: '#FFFFFF',
      accentColor: '#FF6B9D',
      backgroundType: 'solid',
      preview: {
        profileName: "Chioma's Fashion Hub",
        bio: 'Premium African fashion & accessories',
        primaryColor: '#FF6B9D',
        secondaryColor: '#1A0B2E',
      },
    },
    {
      id: 'food',
      name: 'Food & Restaurant',
      category: 'Food Service',
      icon: Coffee,
      description: 'Warm and inviting design for restaurants, cafes, and food businesses',
      backgroundColor: '#FFF8E7',
      cardColor: '#FFFFFF',
      accentColor: '#FF6B35',
      backgroundType: 'solid',
      preview: {
        profileName: 'Mama Ada Kitchen',
        bio: 'Authentic Nigerian cuisine delivered fresh',
        primaryColor: '#FF6B35',
        secondaryColor: '#2D1B00',
      },
    },
    {
      id: 'beauty',
      name: 'Beauty & Salon',
      category: 'Beauty',
      icon: Scissors,
      description: 'Luxurious and sophisticated design for beauty salons and wellness',
      backgroundColor: '#FFE8F0',
      cardColor: '#FFFFFF',
      accentColor: '#D946EF',
      backgroundType: 'solid',
      preview: {
        profileName: 'Glam Beauty Lounge',
        bio: 'Professional makeup & bridal services',
        primaryColor: '#D946EF',
        secondaryColor: '#701A75',
      },
    },
    {
      id: 'professional',
      name: 'Professional Services',
      category: 'Business',
      icon: Briefcase,
      description: 'Clean and trustworthy design for consultants and professional services',
      backgroundColor: '#F8FAFC',
      cardColor: '#FFFFFF',
      accentColor: '#0EA5E9',
      backgroundType: 'solid',
      preview: {
        profileName: 'Tunde Consultancy',
        bio: 'Business strategy & financial consulting',
        primaryColor: '#0EA5E9',
        secondaryColor: '#0C4A6E',
      },
    },
    {
      id: 'tech',
      name: 'Tech & Digital',
      category: 'Technology',
      icon: Laptop,
      description: 'Modern and sleek design for tech services and digital products',
      backgroundColor: '#0F172A',
      cardColor: '#1E293B',
      accentColor: '#22C55E',
      backgroundType: 'solid',
      preview: {
        profileName: 'CodeCraft Studios',
        bio: 'Web development & digital solutions',
        primaryColor: '#22C55E',
        secondaryColor: '#334155',
      },
    },
    {
      id: 'wellness',
      name: 'Health & Wellness',
      category: 'Wellness',
      icon: Heart,
      description: 'Calm and nurturing design for health and wellness professionals',
      backgroundColor: '#F0FDFA',
      cardColor: '#FFFFFF',
      accentColor: '#14B8A6',
      backgroundType: 'solid',
      preview: {
        profileName: 'Zen Wellness Center',
        bio: 'Yoga, meditation & holistic healing',
        primaryColor: '#14B8A6',
        secondaryColor: '#0F766E',
      },
    },
  ];

  const handleApplyTemplate = (template: Template) => {
    setSelectedTemplate(template.id);
    updateTheme({
      id: template.id,
      backgroundColor: template.backgroundColor,
      cardColor: template.cardColor,
      accentColor: template.accentColor,
      backgroundType: template.backgroundType,
    });
    
    // Show success feedback
    toast.success(`${template.name} template applied successfully!`);
  };

  const isCurrentTemplate = (templateId: string) => {
    return selectedTemplate === templateId;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#22C55E]" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800">
            Templates Library
          </h1>
        </div>
        <p className="text-slate-600">
          Choose from professionally designed templates for your industry
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#22C55E]/10 to-blue-50 rounded-2xl p-6 mb-8 border border-[#22C55E]/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              One-Click Customization
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Each template is optimized for Nigerian businesses with industry-specific colors, 
              layouts, and styling. Apply any template instantly and customize further in Appearance settings.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                Mobile Optimized
              </span>
              <span className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                Fast Loading
              </span>
              <span className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                Professional Design
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Templates Banner */}
      <Link to="/dashboard/premium-templates" className="block mb-8 group">
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    Unlock Premium Templates
                  </h3>
                  <p className="text-white/90 text-sm">
                    12 exclusive templates with animations & advanced features
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  ⚡ Animated Effects
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  🎨 Seasonal Themes
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  🏆 Industry-Specific
                </span>
              </div>
              <p className="text-white/80 text-sm">
                Starting from <span className="font-bold text-xl">₦7,000</span> • Premium quality designs
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 group-hover:bg-white/20 transition-all">
              <span className="font-semibold text-lg">Browse Premium</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>

      {/* Free Templates Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Free Templates</h2>
        <p className="text-slate-600">Start with these professionally designed templates at no cost</p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          const isCurrent = isCurrentTemplate(template.id);
          
          return (
            <div
              key={template.id}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg ${
                isCurrent 
                  ? 'border-[#22C55E] shadow-lg' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Preview */}
              <div 
                className="relative h-48 p-6 flex flex-col items-center justify-center"
                style={{ backgroundColor: template.backgroundColor }}
              >
                {/* Preview Card */}
                <div 
                  className="w-full max-w-[200px] rounded-xl p-4 shadow-lg"
                  style={{ backgroundColor: template.cardColor }}
                >
                  {/* Profile Preview */}
                  <div className="flex flex-col items-center text-center mb-3">
                    <div 
                      className="w-12 h-12 rounded-full mb-2"
                      style={{ backgroundColor: template.preview.primaryColor }}
                    />
                    <div 
                      className="h-2 w-20 rounded-full mb-1"
                      style={{ 
                        backgroundColor: template.backgroundColor === '#FFFFFF' || template.backgroundColor === '#F8FAFC' || template.backgroundColor === '#FFF8E7' || template.backgroundColor === '#FFE8F0' || template.backgroundColor === '#F0FDFA'
                          ? '#1E293B'
                          : template.cardColor === '#1E293B'
                            ? '#F1F5F9'
                            : '#94A3B8'
                      }}
                    />
                    <div 
                      className="h-1.5 w-16 rounded-full"
                      style={{ 
                        backgroundColor: template.backgroundColor === '#FFFFFF' || template.backgroundColor === '#F8FAFC' || template.backgroundColor === '#FFF8E7' || template.backgroundColor === '#FFE8F0' || template.backgroundColor === '#F0FDFA'
                          ? '#CBD5E1'
                          : template.cardColor === '#1E293B'
                            ? '#64748B'
                            : '#CBD5E1'
                      }}
                    />
                  </div>
                  {/* Link Preview */}
                  <div className="space-y-2">
                    <div 
                      className="h-8 rounded-lg"
                      style={{ backgroundColor: template.preview.primaryColor }}
                    />
                    <div 
                      className="h-8 rounded-lg opacity-80"
                      style={{ backgroundColor: template.preview.primaryColor }}
                    />
                  </div>
                </div>

                {/* Current Badge */}
                {isCurrent && (
                  <div className="absolute top-3 right-3 bg-[#22C55E] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Current
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: `${template.accentColor}20`,
                      color: template.accentColor,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">
                      {template.category}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">
                  {template.description}
                </p>

                {/* Color Swatches */}
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.backgroundColor }}
                  />
                  <div 
                    className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.cardColor }}
                  />
                  <div 
                    className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: template.accentColor }}
                  />
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => handleApplyTemplate(template)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl font-medium transition-all ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                      : 'bg-[#22C55E] text-white hover:bg-[#16A34A] active:scale-95'
                  }`}
                >
                  {isCurrent ? 'Currently Applied' : 'Apply Template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Design CTA */}
      <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center border border-slate-700">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-4">
          <Palette className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Need a Custom Design?
        </h3>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          All templates can be fully customized in the Appearance settings. 
          Change colors, layouts, fonts, and more to match your brand perfectly.
        </p>
        <Link 
          to="/dashboard/appearance"
          className="px-6 py-3 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-100 transition-colors"
        >
          Customize Appearance
        </Link>
      </div>
    </div>
  );
}