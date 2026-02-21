import { Outlet } from 'react-router';
import { Sidebar } from '../components/dashboard/Sidebar';
import { MobileNav } from '../components/dashboard/MobileNav';
import { useWebBoss } from '../context/WebBossContext';
import { OnboardingFlow } from '../components/OnboardingFlow';

export function DashboardLayout() {
  const { profile, isOnboarded } = useWebBoss();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Onboarding Flow Overlay */}
      {!isOnboarded && <OnboardingFlow />}

      {/* Desktop Sidebar */}
      <Sidebar businessName={profile.name} businessAvatar={profile.avatar} />

      {/* Mobile Navigation */}
      <MobileNav businessName={profile.name} businessAvatar={profile.avatar} />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
