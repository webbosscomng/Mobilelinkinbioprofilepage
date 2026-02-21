import { ProfileHeader } from '../ProfileHeader';
import { LinkCard } from '../LinkCard';
import { SocialIcons } from '../SocialIcons';
import { ProductGrid } from '../ProductGrid';
import { Footer } from '../Footer';
import { useWebBoss } from '../../context/WebBossContext';
import * as Icons from 'lucide-react';

export function LivePreview() {
  const { profile, socialLinks, links, products, theme } = useWebBoss();

  // Filter only visible links
  const visibleLinks = links.filter(link => link.isVisible);
  
  // Filter only visible products that are in stock
  const visibleProducts = products.filter(product => product.isVisible && product.inventory > 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">Live Preview</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-xs text-slate-500">Live</span>
        </div>
      </div>

      {/* Phone Frame */}
      <div className="bg-slate-100 rounded-3xl p-4 mx-auto" style={{ maxWidth: '320px' }}>
        <div 
          className="rounded-2xl overflow-hidden" 
          style={{ 
            height: '600px',
            background: theme.backgroundColor 
          }}
        >
          <div className="h-full overflow-y-auto p-4 custom-scrollbar">
            <div className="w-full max-w-[280px] mx-auto">
              <ProfileHeader
                avatar={profile.avatar}
                name={profile.name}
                bio={profile.bio}
                location={profile.location}
              />

              <SocialIcons
                instagram={socialLinks.instagram}
                whatsapp={socialLinks.whatsapp}
                twitter={socialLinks.twitter}
                facebook={socialLinks.facebook}
              />

              {/* Product Grid Section */}
              {visibleProducts.length > 0 && (
                <ProductGrid 
                  products={visibleProducts} 
                  whatsappNumber={socialLinks.whatsapp}
                />
              )}

              {/* Section Title for links if there are products */}
              {visibleProducts.length > 0 && visibleLinks.length > 0 && (
                <h2 className="text-white text-[10px] font-semibold mb-3 uppercase tracking-wider opacity-70 px-1 text-center">
                  Important Links
                </h2>
              )}

              <div className="space-y-3 mb-6">
                {visibleLinks.map((link) => {
                  const IconComponent = Icons[link.icon as keyof typeof Icons] as any;
                  return (
                    <LinkCard
                      key={link.id}
                      icon={IconComponent}
                      label={link.label}
                      href={link.url}
                      category={link.category}
                    />
                  );
                })}
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}