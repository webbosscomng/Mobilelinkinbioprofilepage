import { useState } from 'react';
import { Plus } from 'lucide-react';
import { LinkRow } from '../components/dashboard/LinkRow';
import { AddLinkModal } from '../components/dashboard/AddLinkModal';
import { EmptyLinksState } from '../components/dashboard/EmptyLinksState';
import { useWebBoss, Link } from '../context/WebBossContext';
import * as Icons from 'lucide-react';

export function LinksManager() {
  const { links, toggleLinkVisibility, updateLink, deleteLink, addLink } = useWebBoss();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const handleToggleVisibility = (id: string) => {
    toggleLinkVisibility(id);
  };

  const handleEdit = (id: string) => {
    const link = links.find(l => l.id === id);
    if (link) {
      setEditingLink(link);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      deleteLink(id);
    }
  };

  const handleSaveLink = (linkData: { label: string; url: string; icon: string }) => {
    if (editingLink) {
      updateLink(editingLink.id, linkData);
      setEditingLink(null);
    } else {
      addLink({
        ...linkData,
        isVisible: true,
        category: 'custom',
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">
            Manage Links
          </h1>
          <p className="text-slate-600">
            Add, edit, and organize your links. Drag to reorder.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">Add New Link</span>
          <span className="sm:hidden text-sm font-medium">Add</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600 mb-1">Total Links</p>
          <p className="text-2xl font-semibold text-slate-800">{links.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600 mb-1">Active Links</p>
          <p className="text-2xl font-semibold text-slate-800">
            {links.filter(l => l.isVisible).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600 mb-1">Total Clicks</p>
          <p className="text-2xl font-semibold text-slate-800">
            {links.reduce((sum, link) => sum + link.clicks, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <p className="text-sm text-slate-600 mb-1">Top Performer</p>
          <p className="text-2xl font-semibold text-slate-800">
            {links.sort((a, b) => b.clicks - a.clicks)[0]?.clicks || 0}
          </p>
        </div>
      </div>

      {/* Links List */}
      {links.length === 0 ? (
        <EmptyLinksState onAddLink={() => setIsModalOpen(true)} />
      ) : (
        <div className="space-y-3">
          {links.map((link) => {
            const IconComponent = Icons[link.icon as keyof typeof Icons] as any;
            return (
              <LinkRow
                key={link.id}
                id={link.id}
                icon={IconComponent}
                label={link.label}
                url={link.url}
                clicks={link.clicks}
                isVisible={link.isVisible}
                onToggleVisibility={handleToggleVisibility}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}

      {/* Add/Edit Link Modal */}
      <AddLinkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLink}
        editingLink={editingLink}
      />
    </div>
  );
}