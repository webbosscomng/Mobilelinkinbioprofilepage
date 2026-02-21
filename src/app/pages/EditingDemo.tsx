import { useState } from 'react';
import { ArrowRight, Edit2, Eye, Palette, Plus } from 'lucide-react';
import { useWebBoss } from '../context/WebBossContext';
import { LivePreview } from '../components/dashboard/LivePreview';
import { LinkRow } from '../components/dashboard/LinkRow';
import { AddLinkModal } from '../components/dashboard/AddLinkModal';
import * as Icons from 'lucide-react';

export function EditingDemo() {
  const { links, toggleLinkVisibility, updateLink, deleteLink, addLink, theme, updateTheme } = useWebBoss();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [demoStep, setDemoStep] = useState(0);

  const handleEdit = (id: string) => {
    const link = links.find(l => l.id === id);
    if (link) {
      setEditingLink(link);
      setIsModalOpen(true);
    }
  };

  const handleSaveLink = (linkData: { label: string; url: string; icon: string }) => {
    if (editingLink) {
      updateLink(editingLink.id, linkData);
      setEditingLink(null);
      setDemoStep(3);
      setTimeout(() => setDemoStep(0), 3000);
    } else {
      addLink({
        ...linkData,
        isVisible: true,
        category: 'custom',
      });
      setDemoStep(3);
      setTimeout(() => setDemoStep(0), 3000);
    }
  };

  const demoSteps = [
    { title: 'Step 1: View Your Links', description: 'Manage all your links in one place' },
    { title: 'Step 2: Edit Link Details', description: 'Click edit to change label, URL, or icon' },
    { title: 'Step 3: See Changes Live', description: 'The preview updates instantly!' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">Live Editing Demo</h1>
          </div>
          <p className="text-xl text-slate-600 mb-6">
            Watch how changes in the dashboard instantly update your Link-in-Bio page
          </p>
          
          {/* Demo Steps Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {demoSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all ${
                    demoStep >= index + 1
                      ? 'bg-[#22C55E] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < demoSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            ))}
          </div>

          {demoStep > 0 && (
            <div className="bg-[#22C55E]/10 border border-[#22C55E] rounded-xl p-4 max-w-md mx-auto">
              <p className="text-sm font-semibold text-[#22C55E] mb-1">
                {demoSteps[demoStep - 1].title}
              </p>
              <p className="text-xs text-slate-600">
                {demoSteps[demoStep - 1].description}
              </p>
            </div>
          )}
        </div>

        {/* Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Dashboard Editor */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white p-4 flex items-center gap-3">
                <Edit2 className="w-5 h-5" />
                <h2 className="font-semibold">Dashboard - Links Manager</h2>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-slate-600">
                    Click on any link to edit it
                  </p>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setDemoStep(1);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#1db954] transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Link
                  </button>
                </div>

                <div className="space-y-3">
                  {links.slice(0, 4).map((link) => {
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
                        onToggleVisibility={(id) => {
                          toggleLinkVisibility(id);
                          setDemoStep(2);
                          setTimeout(() => setDemoStep(3), 500);
                          setTimeout(() => setDemoStep(0), 3000);
                        }}
                        onEdit={(id) => {
                          handleEdit(id);
                          setDemoStep(1);
                        }}
                        onDelete={deleteLink}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Color Picker Demo */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mt-6">
              <div className="bg-slate-800 text-white p-4 flex items-center gap-3">
                <Palette className="w-5 h-5" />
                <h2 className="font-semibold">Appearance Settings</h2>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4">
                  Change the background color
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.backgroundColor}
                    onChange={(e) => {
                      updateTheme({ backgroundColor: e.target.value });
                      setDemoStep(2);
                      setTimeout(() => setDemoStep(3), 500);
                      setTimeout(() => setDemoStep(0), 3000);
                    }}
                    className="w-16 h-16 rounded-xl border-2 border-slate-200 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 mb-1">Background Color</p>
                    <input
                      type="text"
                      value={theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Quick Theme Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[
                    { name: 'Navy', color: '#0F172A' },
                    { name: 'Purple', color: '#6B21A8' },
                    { name: 'Blue', color: '#1E40AF' },
                    { name: 'Pink', color: '#DB2777' },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        updateTheme({ backgroundColor: preset.color });
                        setDemoStep(2);
                        setTimeout(() => setDemoStep(3), 500);
                        setTimeout(() => setDemoStep(0), 3000);
                      }}
                      className="px-3 py-2 rounded-lg border border-slate-200 hover:border-[#22C55E] transition-all text-xs"
                      style={{ background: `linear-gradient(135deg, ${preset.color} 0%, ${preset.color}dd 100%)`, color: 'white' }}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden lg:sticky lg:top-8">
              <div className="bg-[#22C55E] text-white p-4 flex items-center gap-3">
                <Eye className="w-5 h-5" />
                <h2 className="font-semibold">Live Preview - Your Page</h2>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs">Updates in real-time</span>
                </div>
              </div>
              
              <div className="p-6">
                <LivePreview />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#22C55E]/10 to-blue-50 rounded-2xl p-8 border border-[#22C55E]/20">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Try It Yourself!</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E] text-white flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-slate-800 mb-1">Edit a Link</p>
                  <p className="text-sm text-slate-600">Click the edit icon on any link card</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E] text-white flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-slate-800 mb-1">Change Colors</p>
                  <p className="text-sm text-slate-600">Try different background colors</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#22C55E] text-white flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-slate-800 mb-1">Watch Updates</p>
                  <p className="text-sm text-slate-600">See changes appear instantly on the right</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AddLinkModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLink(null);
          if (demoStep === 1) setDemoStep(0);
        }}
        onSave={handleSaveLink}
        editingLink={editingLink}
      />
    </div>
  );
}
