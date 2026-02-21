import { useState } from 'react';
import { X } from 'lucide-react';
import * as Icons from 'lucide-react';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: { label: string; url: string; icon: string }) => void;
  editingLink?: { id: string; label: string; url: string; icon: string } | null;
}

export function AddLinkModal({ isOpen, onClose, onSave, editingLink }: AddLinkModalProps) {
  const [label, setLabel] = useState(editingLink?.label || '');
  const [url, setUrl] = useState(editingLink?.url || '');
  const [selectedIcon, setSelectedIcon] = useState(editingLink?.icon || 'Link');

  const iconOptions = [
    'Link', 'ShoppingBag', 'Package', 'MessageCircle', 'Calendar',
    'Mail', 'Phone', 'Globe', 'FileText', 'Video', 'Music', 'Image'
  ];

  const handleSave = () => {
    if (label && url) {
      onSave({ label, url, icon: selectedIcon });
      setLabel('');
      setUrl('');
      setSelectedIcon('Link');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">
            {editingLink ? 'Edit Link' : 'Add New Link'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Link Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Shop Our Collection"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Destination URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
            />
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Choose Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((iconName) => {
                const IconComponent = Icons[iconName as keyof typeof Icons] as any;
                return (
                  <button
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all ${
                      selectedIcon === iconName
                        ? 'bg-[#22C55E] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!label || !url}
            className="flex-1 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingLink ? 'Save Changes' : 'Add Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
