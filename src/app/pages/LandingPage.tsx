import { 
  ArrowRight, 
  Check, 
  Zap, 
  BarChart3, 
  Palette, 
  Shield, 
  Globe, 
  Sparkles,
  Crown,
  ShoppingBag,
  TrendingUp,
  Users,
  Rocket,
  Star,
  Play,
  Gift
} from 'lucide-react';
import { Link } from 'react-router';

export function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Setup',
      description: 'Create your Link-in-Bio page in under 2 minutes. No coding required.',
    },
    {
      icon: Palette,
      title: 'Premium Templates',
      description: 'Choose from 18+ free and premium templates with animations and seasonal themes.',
    },
    {
      icon: ShoppingBag,
      title: 'Built-in Store',
      description: 'Sell products directly with WhatsApp integration and inventory tracking.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track clicks, views, and performance with detailed insights and reports.',
    },
    {
      icon: Shield,
      title: 'Reliable & Secure',
      description: 'Your page is always online with 99.9% uptime guarantee and SSL security.',
    },
    {
      icon: Sparkles,
      title: 'Made for Nigeria',
      description: 'Built specifically for Nigerian entrepreneurs with local payment integration.',
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '₦0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Unlimited links',
        'Basic analytics',
        '6 free templates',
        'Mobile optimized',
        'QR code generator',
        'Web Boss branding',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '₦2,500',
      period: 'per month',
      description: 'Best for growing businesses',
      features: [
        'Everything in Free',
        'Remove branding',
        'Advanced analytics',
        'Performance insights',
        'Custom domain',
        'Priority support',
        '20% off premium templates',
        'Product catalog (unlimited)',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Business',
      price: '₦5,000',
      period: 'per month',
      description: 'For established brands',
      features: [
        'Everything in Pro',
        'Multiple team members',
        'API access',
        'White label options',
        'Dedicated support',
        'Custom integrations',
        'All premium templates free',
        'Advanced automation',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      badge: 'Best Value',
    },
  ];

  const testimonials = [
    {
      name: 'Chioma Okafor',
      business: 'Fashion Designer, Lagos',
      image: '👗',
      text: 'Web Boss helped me showcase my collections and increased my WhatsApp orders by 300%!',
      revenue: '+300% orders',
    },
    {
      name: 'Emeka Johnson',
      business: 'Food Business, Abuja',
      image: '🍕',
      text: 'The built-in store feature is amazing. I can track inventory and get orders 24/7.',
      revenue: '₦2M+ monthly',
    },
    {
      name: 'Amara Beauty',
      business: 'Makeup Artist, PH',
      image: '💄',
      text: 'Premium templates make my page look so professional. Clients trust me more now!',
      revenue: '+150% bookings',
    },
  ];

  const premiumTemplates = [
    {
      name: 'Luxury Fashion',
      price: '₦15,000',
      icon: '👗',
      features: ['Animated showcase', 'Lookbook gallery', 'VIP portal'],
    },
    {
      name: 'Gourmet Restaurant',
      price: '₦12,000',
      icon: '🍽️',
      features: ['Digital menu', 'Reservations', 'Photo gallery'],
    },
    {
      name: 'Beauty & Glam',
      price: '₦13,500',
      icon: '✨',
      features: ['Before/after slider', 'Booking calendar', 'Testimonials'],
    },
    {
      name: 'Seasonal Themes',
      price: 'From ₦7,000',
      icon: '🎄',
      features: ['Christmas', 'Valentine', 'Black Friday'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Web Boss</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#templates" className="text-slate-600 hover:text-slate-900 transition-colors">
                Templates
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </a>
              <Link to="/demo" className="text-slate-600 hover:text-slate-900 transition-colors">
                Demo
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#1db954] transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm font-medium text-[#22C55E]">Now with 12 Premium Templates!</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Your Business,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#16A34A]">
                One Beautiful Link
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              The all-in-one Link-in-Bio platform built for Nigerian entrepreneurs. 
              Showcase products, collect orders, and grow your business with premium templates and powerful analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-all hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/demo"
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:border-[#22C55E] hover:text-[#22C55E] transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Play className="w-5 h-5" />
                View Demo
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center text-sm">👩🏾</div>
                  <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center text-sm">👨🏾</div>
                  <div className="w-8 h-8 bg-pink-400 rounded-full border-2 border-white flex items-center justify-center text-sm">👩🏾</div>
                </div>
                <p className="text-sm">
                  <span className="font-semibold text-slate-900">5,000+</span> businesses
                </p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.9/5 rating</span>
              </div>
              <div className="text-sm">
                🇳🇬 <span className="font-semibold">Made in Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From free templates to advanced analytics, we've got all the tools 
              Nigerian businesses need to succeed online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100 group"
                >
                  <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#22C55E] transition-colors">
                    <IconComponent className="w-6 h-6 text-[#22C55E] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Templates Section */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Crown className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Premium Templates</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Stand Out with Professional Design
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose from 6 free templates or upgrade to premium industry-specific, 
              animated, and seasonal designs starting from just ₦7,000.
            </p>
          </div>

          {/* Premium Template Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {premiumTemplates.map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#22C55E] hover:shadow-xl transition-all group"
              >
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-2xl font-bold text-[#22C55E] mb-4">{template.price}</p>
                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="w-full py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-[#22C55E] hover:text-white transition-colors text-center block group-hover:bg-[#22C55E] group-hover:text-white"
                >
                  View Template
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl transition-all font-semibold text-lg"
            >
              <Crown className="w-5 h-5" />
              Browse All Premium Templates
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Success Stories from Nigeria
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of Nigerian entrepreneurs growing their businesses with Web Boss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.business}</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">{testimonial.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free, upgrade as you grow. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white shadow-2xl scale-105 border-4 border-[#22C55E]'
                    : 'bg-white border-2 border-slate-200'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className={`px-4 py-1 rounded-full text-xs font-bold ${
                      plan.highlighted 
                        ? 'bg-amber-400 text-slate-900' 
                        : 'bg-purple-500 text-white'
                    }`}>
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.highlighted ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    plan.highlighted ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className={`text-5xl font-bold ${
                      plan.highlighted ? 'text-white' : 'text-slate-900'
                    }`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    plan.highlighted ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    {plan.period}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-white' : 'text-[#22C55E]'
                      }`} />
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-white' : 'text-slate-700'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                    plan.highlighted
                      ? 'bg-white text-[#22C55E] hover:bg-slate-100'
                      : 'bg-[#22C55E] text-white hover:bg-[#1db954]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Additional Pricing Info */}
          <div className="mt-16 text-center">
            <p className="text-slate-600 mb-4">
              💳 All plans include 14-day free trial • Cancel anytime • No credit card required
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure payments via Paystack</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>5,000+ active users</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F172A] to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of Nigerian entrepreneurs using Web Boss to showcase their products, 
            collect orders, and scale their businesses.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-all hover:shadow-xl font-semibold text-lg"
          >
            Start Your Free Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-slate-400 mt-4">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-white font-semibold">Web Boss</span>
            </div>
            <p className="text-sm">© 2026 Web Boss. Made with ❤️ in Nigeria.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
