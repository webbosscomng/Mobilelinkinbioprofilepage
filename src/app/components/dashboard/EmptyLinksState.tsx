import { Link2 } from 'lucide-react';

export function EmptyLinksState({ onAddLink }: { onAddLink: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Link2 className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">No links yet</h3>
      <p className="text-slate-600 mb-6 max-w-sm mx-auto">
        Start building your Link-in-Bio page by adding your first link. You can add links to your shop, social media, or anywhere you want to drive traffic.
      </p>
      <button
        onClick={onAddLink}
        className="px-6 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors inline-flex items-center gap-2"
      >
        <Link2 className="w-4 h-4" />
        <span>Add Your First Link</span>
      </button>
    </div>
  );
}
