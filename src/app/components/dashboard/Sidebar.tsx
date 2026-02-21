import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  Link2, 
  Palette, 
  BarChart3, 
  Settings,
  Zap,
  Crown,
  Plug,
  ShoppingBag,
  Gauge,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface SidebarProps {
  businessName: string;
  businessAvatar: string;
}

export function Sidebar({ businessName, businessAvatar }: SidebarProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await signOut();
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Link2, label: 'Links', path: '/dashboard/links' },
    { icon: ShoppingBag, label: 'Store', path: '/dashboard/store' },
    { icon: Palette, label: 'Appearance', path: '/dashboard/appearance' },
    { icon: Sparkles, label: 'Templates', path: '/dashboard/templates' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Gauge, label: 'Performance', path: '/dashboard/performance' },
    { icon: Plug, label: 'Integrations', path: '/dashboard/integrations' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-lg font-semibold text-slate-800">Web Boss</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#22C55E]/10 text-[#22C55E]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade Badge */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Crown className="w-4 h-4 text-amber-900" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-1">Upgrade to Pro</h3>
              <p className="text-xs text-amber-700 mb-3">Unlock analytics & custom domains</p>
              <button className="w-full bg-amber-900 text-white text-xs py-2 rounded-lg hover:bg-amber-800 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={businessAvatar}
            alt={businessName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{businessName}</p>
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}