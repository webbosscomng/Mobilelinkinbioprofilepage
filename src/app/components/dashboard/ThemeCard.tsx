import { Check } from 'lucide-react';

interface ThemeCardProps {
  name: string;
  preview: {
    background: string;
    card: string;
    accent: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function ThemeCard({ name, preview, isSelected, onSelect }: ThemeCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
        isSelected ? 'border-[#22C55E]' : 'border-slate-200'
      }`}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Mini Preview */}
      <div
        className="w-full aspect-[3/4] p-3"
        style={{ background: preview.background }}
      >
        <div
          className="w-full h-8 rounded-lg mb-2"
          style={{ background: preview.card }}
        />
        <div
          className="w-3/4 h-4 rounded mb-1.5"
          style={{ background: preview.card }}
        />
        <div
          className="w-full h-4 rounded mb-1.5"
          style={{ background: preview.card }}
        />
        <div
          className="w-full h-4 rounded"
          style={{ background: preview.card }}
        />
      </div>

      {/* Theme Name */}
      <div className="bg-white px-3 py-2 border-t border-slate-200">
        <p className="text-xs font-medium text-slate-700">{name}</p>
      </div>
    </button>
  );
}
