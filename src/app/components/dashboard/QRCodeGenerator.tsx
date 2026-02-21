import { useState } from 'react';
import { QrCode, Download, Share2, Copy, Check } from 'lucide-react';

export function QRCodeGenerator() {
  const [copied, setCopied] = useState(false);
  const profileUrl = 'https://webboss.link/chiomasfashion';

  // Mock QR code - in real app, use a QR code library
  const qrCodeSvg = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="10" y="10" width="30" height="30" fill="black"/>
      <rect x="50" y="10" width="10" height="10" fill="black"/>
      <rect x="70" y="10" width="10" height="10" fill="black"/>
      <rect x="90" y="10" width="10" height="10" fill="black"/>
      <rect x="110" y="10" width="10" height="10" fill="black"/>
      <rect x="130" y="10" width="10" height="10" fill="black"/>
      <rect x="160" y="10" width="30" height="30" fill="black"/>
      <rect x="10" y="50" width="10" height="10" fill="black"/>
      <rect x="30" y="50" width="10" height="10" fill="black"/>
      <rect x="50" y="50" width="30" height="30" fill="black"/>
      <rect x="90" y="50" width="10" height="10" fill="black"/>
      <rect x="110" y="50" width="30" height="30" fill="black"/>
      <rect x="160" y="50" width="10" height="10" fill="black"/>
      <rect x="180" y="50" width="10" height="10" fill="black"/>
      <rect x="10" y="70" width="10" height="10" fill="black"/>
      <rect x="30" y="70" width="10" height="10" fill="black"/>
      <rect x="90" y="70" width="10" height="10" fill="black"/>
      <rect x="160" y="70" width="10" height="10" fill="black"/>
      <rect x="180" y="70" width="10" height="10" fill="black"/>
      <rect x="10" y="90" width="10" height="10" fill="black"/>
      <rect x="30" y="90" width="10" height="10" fill="black"/>
      <rect x="50" y="90" width="10" height="10" fill="black"/>
      <rect x="70" y="90" width="70" height="10" fill="black"/>
      <rect x="160" y="90" width="10" height="10" fill="black"/>
      <rect x="180" y="90" width="10" height="10" fill="black"/>
      <rect x="10" y="110" width="10" height="10" fill="black"/>
      <rect x="30" y="110" width="10" height="10" fill="black"/>
      <rect x="50" y="110" width="10" height="10" fill="black"/>
      <rect x="70" y="110" width="10" height="10" fill="black"/>
      <rect x="90" y="110" width="30" height="30" fill="black"/>
      <rect x="130" y="110" width="10" height="10" fill="black"/>
      <rect x="160" y="110" width="10" height="10" fill="black"/>
      <rect x="180" y="110" width="10" height="10" fill="black"/>
      <rect x="10" y="160" width="30" height="30" fill="black"/>
      <rect x="50" y="160" width="10" height="10" fill="black"/>
      <rect x="70" y="160" width="10" height="10" fill="black"/>
      <rect x="90" y="160" width="10" height="10" fill="black"/>
      <rect x="110" y="160" width="10" height="10" fill="black"/>
      <rect x="130" y="160" width="10" height="10" fill="black"/>
      <rect x="160" y="160" width="30" height="30" fill="black"/>
      <rect x="50" y="180" width="10" height="10" fill="black"/>
      <rect x="70" y="180" width="10" height="10" fill="black"/>
      <rect x="90" y="180" width="10" height="10" fill="black"/>
      <rect x="110" y="180" width="10" height="10" fill="black"/>
      <rect x="130" y="180" width="10" height="10" fill="black"/>
    </svg>
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Create blob and download
    const blob = new Blob([qrCodeSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webboss-qr-code.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chioma's Fashion Hub",
          url: profileUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
          <QrCode className="w-5 h-5 text-[#22C55E]" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Your QR Code</h3>
          <p className="text-sm text-slate-600">Share your page offline</p>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="bg-slate-50 rounded-xl p-8 mb-6 flex justify-center">
        <div className="w-48 h-48 bg-white rounded-xl p-4 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
        </div>
      </div>

      {/* URL Display */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-mono text-slate-700 truncate flex-1">
            {profileUrl}
          </p>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-[#1db954] transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs font-semibold text-blue-900 mb-1">💡 Pro Tip</p>
        <p className="text-xs text-blue-700">
          Print this QR code on business cards, flyers, or product packaging to drive traffic to your page!
        </p>
      </div>
    </div>
  );
}
