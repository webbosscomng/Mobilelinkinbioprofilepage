import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <div className="mt-8 mb-6 flex justify-center">
      <a
        href="https://webboss.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <Zap className="w-4 h-4 text-[#22C55E]" fill="#22C55E" />
        <span className="text-xs text-slate-600">
          Powered by <span className="font-semibold text-slate-800">Web Boss</span>
        </span>
      </a>
    </div>
  );
}
