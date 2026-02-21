import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  Globe, 
  Smartphone,
  Shield,
  Download,
  Trash2,
  Check,
  ExternalLink,
  Crown,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useWebBoss } from '../context/WebBossContext';

export function Settings() {
  const { profile, updateProfile, completeOnboarding } = useWebBoss();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'billing' | 'notifications'>('profile');
  
  const resetOnboarding = () => {
    localStorage.removeItem('webboss_onboarded');
    window.location.reload();
  };
  const [profileData, setProfileData] = useState({
    businessName: "Chioma's Fashion Hub",
    email: 'chioma@fashionhub.ng',
    bio: 'Premium African fashion & accessories. Custom orders available.',
    phone: '+234 801 234 5678',
    website: 'https://fashionhub.ng',
    location: 'Lagos, Nigeria',
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    newClicks: true,
    weeklyReport: true,
    productUpdates: false,
    marketing: false,
  });

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'account' as const, label: 'Account', icon: Shield },
    { id: 'billing' as const, label: 'Billing', icon: CreditCard },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">
          Settings
        </h1>
        <p className="text-slate-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-[#22C55E] text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Information */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Profile Information</h2>
                
                {/* Avatar Upload */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                  <div className="w-20 h-20 bg-[#22C55E] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    CF
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium mb-2">
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={profileData.businessName}
                        onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-1">Brief description for your profile</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                  <button className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-medium">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Custom Domain */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800 mb-1">Custom Domain</h2>
                    <p className="text-sm text-slate-600">Use your own domain for your Link-in-Bio page</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                    PRO
                  </span>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Current URL:</span>
                  </div>
                  <p className="text-sm text-slate-900 font-mono">webboss.link/chiomasfashion</p>
                </div>

                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Upgrade to Pro
                </button>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Security */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Security</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-800">Onboarding</p>
                        <p className="text-sm text-slate-600">Re-run the welcome experience</p>
                      </div>
                    </div>
                    <button 
                      onClick={resetOnboarding}
                      className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors text-sm font-medium"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-800">Password</p>
                        <p className="text-sm text-slate-600">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-600">Not enabled</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#1db954] transition-colors text-sm font-medium">
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              {/* Sessions */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Active Sessions</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-[#22C55E]" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">Current Session</p>
                        <p className="text-sm text-slate-600">Lagos, Nigeria • Chrome on Windows</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Active Now
                    </span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-red-800 mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Danger Zone
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-900">Export Your Data</p>
                      <p className="text-sm text-red-700">Download all your data in JSON format</p>
                    </div>
                    <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>

                  <div className="border-t border-red-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900">Delete Account</p>
                        <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Current Plan</p>
                    <h2 className="text-3xl font-bold">Free</h2>
                  </div>
                  <Zap className="w-8 h-8 text-white/80" />
                </div>
                <p className="text-white/90 mb-6">
                  You're currently on the Free plan. Upgrade to unlock more features and remove Web Boss branding.
                </p>
                <button className="w-full sm:w-auto px-6 py-3 bg-white text-[#22C55E] rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  Upgrade to Pro
                </button>
              </div>

              {/* Plan Comparison */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Compare Plans</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Free Plan */}
                  <div className="border-2 border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Free</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Current
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-6">₦0<span className="text-base font-normal text-slate-600">/month</span></p>
                    <ul className="space-y-3">
                      {[
                        'Unlimited links',
                        'Basic analytics',
                        'Mobile optimized',
                        'Web Boss branding',
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#22C55E]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro Plan */}
                  <div className="border-2 border-[#22C55E] rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#22C55E] text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">Pro</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-6">₦2,500<span className="text-base font-normal text-slate-600">/month</span></p>
                    <ul className="space-y-3 mb-6">
                      {[
                        'Everything in Free',
                        'No branding',
                        'Advanced analytics',
                        'Custom domain',
                        'Priority support',
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="w-4 h-4 text-[#22C55E]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full px-4 py-2 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-medium">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">Payment Method</h2>
                  <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                    Add Method
                  </button>
                </div>
                
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">No payment method added</p>
                  <p className="text-sm text-slate-500 mt-1">Add a payment method to upgrade your plan</p>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Billing History</h2>
                
                <div className="text-center py-8">
                  <p className="text-slate-600">No invoices yet</p>
                  <p className="text-sm text-slate-500 mt-1">Your billing history will appear here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Email Notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'emailDigest', label: 'Daily Email Digest', description: 'Get a daily summary of your page performance' },
                    { key: 'newClicks', label: 'New Click Alerts', description: 'Receive notifications when someone clicks your links' },
                    { key: 'weeklyReport', label: 'Weekly Report', description: 'Get a weekly analytics report every Monday' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#22C55E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketing Notifications */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">Marketing & Updates</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'productUpdates', label: 'Product Updates', description: 'Learn about new features and improvements' },
                    { key: 'marketing', label: 'Marketing Emails', description: 'Receive tips, tricks, and promotional offers' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-800">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#22C55E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
