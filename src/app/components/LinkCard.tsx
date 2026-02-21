import { ChevronRight, LucideIcon } from 'lucide-react';

interface LinkCardProps {
  icon: LucideIcon;
  label: string;
  href: string;
  category?: 'social' | 'shop' | 'contact' | 'custom';
}

export function LinkCard({ icon: Icon, label, href, category = 'custom' }: LinkCardProps) {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex items-center gap-4 group"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
        <Icon className="w-5 h-5" />
      </div>

      {/* Label */}
      <span className="flex-1 text-slate-800 text-center">
        {label}
      </span>

      {/* Arrow */}
      <div className="flex-shrink-0 text-slate-400 group-hover:text-[#22C55E] group-hover:translate-x-0.5 transition-all">
        <ChevronRight className="w-5 h-5" />
      </div>
    </button>
  );
}
