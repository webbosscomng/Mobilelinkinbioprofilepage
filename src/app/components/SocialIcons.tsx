import { Instagram, MessageCircle, Twitter, Facebook } from 'lucide-react';

interface SocialIconsProps {
  instagram?: string;
  whatsapp?: string;
  twitter?: string;
  facebook?: string;
}

export function SocialIcons({ instagram, whatsapp, twitter, facebook }: SocialIconsProps) {
  const socials = [
    { icon: Instagram, url: instagram, label: 'Instagram' },
    { icon: MessageCircle, url: whatsapp, label: 'WhatsApp' },
    { icon: Twitter, url: twitter, label: 'Twitter' },
    { icon: Facebook, url: facebook, label: 'Facebook' },
  ].filter(social => social.url);

  if (socials.length === 0) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-6">
      <div className="flex justify-center gap-4">
        {socials.map(({ icon: Icon, url, label }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
}
