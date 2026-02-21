import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { ThemeCard } from '../components/dashboard/ThemeCard';
import { LivePreview } from '../components/dashboard/LivePreview';
import { useWebBoss } from '../context/WebBossContext';

interface ThemePreset {
  id: string;
  name: string;
  preview: {
    background: string;
    card: string;
    accent: string;
  };
}

export function Appearance() {
  const { theme, updateTheme } = useWebBoss();
  const [selectedTheme, setSelectedTheme] = useState(theme.id);
  const [backgroundType, setBackgroundType] = useState(theme.backgroundType);
  const [backgroundColor, setBackgroundColor] = useState(theme.backgroundColor);
  const [cardColor, setCardColor] = useState(theme.cardColor);
  const [accentColor, setAccentColor] = useState(theme.accentColor);
  const [selectedFont, setSelectedFont] = useState('default');

  // Update context when colors change
  useEffect(() => {
    updateTheme({
      backgroundColor,
      cardColor,
      accentColor,
      backgroundType,
    });
  }, [backgroundColor, cardColor, accentColor, backgroundType]);

  const themes: ThemePreset[] = [
    {
      id: 'dark',
      name: 'Dark Navy',
      preview: {
        background: '#0F172A',
        card: '#FFFFFF',
        accent: '#22C55E',
      },
    },
    {
      id: 'light',
      name: 'Clean Light',
      preview: {
        background: '#F8FAFC',
        card: '#FFFFFF',
        accent: '#22C55E',
      },
    },
    {
      id: 'brand',
      name: 'Brand Green',
      preview: {
        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
        card: '#FFFFFF',
        accent: '#0F172A',
      },
    },
    {
      id: 'minimal',
      name: 'Minimal Gray',
      preview: {
        background: '#E2E8F0',
        card: '#FFFFFF',
        accent: '#475569',
      },
    },
    {
      id: 'sunset',
      name: 'Sunset Orange',
      preview: {
        background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
        card: '#FFFFFF',
        accent: '#0F172A',
      },
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      preview: {
        background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
        card: '#FFFFFF',
        accent: '#1E293B',
      },
    },
  ];

  const fonts = [
    { id: 'default', name: 'System Default', style: 'font-sans' },
    { id: 'modern', name: 'Modern Sans', style: 'font-sans' },
    { id: 'classic', name: 'Classic Serif', style: 'font-serif' },
    { id: 'mono', name: 'Monospace', style: 'font-mono' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-2">
          Appearance Settings
        </h1>
        <p className="text-slate-600">
          Customize the look and feel of your Link-in-Bio page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Selector */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Choose a Theme</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  name={theme.name}
                  preview={theme.preview}
                  isSelected={selectedTheme === theme.id}
                  onSelect={() => setSelectedTheme(theme.id)}
                />
              ))}
            </div>
          </div>

          {/* Background Type */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Background Type</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['solid', 'gradient', 'pattern'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setBackgroundType(type)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all capitalize ${
                    backgroundType === type
                      ? 'border-[#22C55E] bg-[#22C55E]/5 text-[#22C55E] font-medium'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Custom Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Background
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Card Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Card Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={cardColor}
                    onChange={(e) => setCardColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={cardColor}
                    onChange={(e) => setCardColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Typography</h3>
            <div className="space-y-3">
              {fonts.map((font) => (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font.id)}
                  className={`w-full px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    selectedFont === font.id
                      ? 'border-[#22C55E] bg-[#22C55E]/5'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${font.style}`}>{font.name}</span>
                    {selectedFont === font.id && (
                      <Check className="w-5 h-5 text-[#22C55E]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-medium shadow-sm">
              Save Changes
            </button>
            <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
              Reset
            </button>
          </div>
        </div>

        {/* Right Column - Live Preview */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <LivePreview />
          </div>
        </div>
      </div>
    </div>
  );
}