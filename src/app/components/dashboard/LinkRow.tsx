import { GripVertical, Eye, EyeOff, Edit2, Trash2, LucideIcon } from 'lucide-react';

interface LinkRowProps {
  id: string;
  icon: LucideIcon;
  label: string;
  url: string;
  clicks: number;
  isVisible: boolean;
  onToggleVisibility: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LinkRow({
  id,
  icon: Icon,
  label,
  url,
  clicks,
  isVisible,
  onToggleVisibility,
  onEdit,
  onDelete,
}: LinkRowProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button className="text-slate-400 hover:text-slate-600 cursor-move">
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center text-[#22C55E] flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-slate-800 truncate">{label}</h4>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
              {clicks} clicks
            </span>
          </div>
          <p className="text-sm text-slate-500 truncate">{url}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onToggleVisibility(id)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isVisible
                ? 'text-[#22C55E] bg-[#22C55E]/10 hover:bg-[#22C55E]/20'
                : 'text-slate-400 bg-slate-50 hover:bg-slate-100'
            }`}
            title={isVisible ? 'Hide link' : 'Show link'}
          >
            {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onEdit(id)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
            title="Edit link"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
