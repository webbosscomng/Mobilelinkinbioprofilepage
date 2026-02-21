import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ icon: Icon, label, value, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#22C55E]" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-semibold text-slate-800 mb-1">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}
