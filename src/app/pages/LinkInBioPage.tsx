import { ProfileHeader } from '../components/ProfileHeader';
import { LinkCard } from '../components/LinkCard';
import { SocialIcons } from '../components/SocialIcons';
import { ProductGrid } from '../components/ProductGrid';
import { Footer } from '../components/Footer';
import { useWebBoss } from '../context/WebBossContext';
import * as Icons from 'lucide-react';

export function LinkInBioPage() {
  const { profile, socialLinks, links, products, theme } = useWebBoss();

  // Filter only visible links
  const visibleLinks = links.filter(link => link.isVisible);
  
  // Filter only visible products that are in stock
  const visibleProducts = products.filter(product => product.isVisible && product.inventory > 0);

  return (
    <div 
      className="min-h-screen py-8 px-4 flex justify-center items-start overflow-y-auto"
      style={{ background: theme.backgroundColor }}
    >
      {/* Mobile container - 375px max width */}
      <div className="w-full max-w-[375px]">
        {/* Profile Header */}
        <ProfileHeader
          avatar={profile.avatar}
          name={profile.name}
          bio={profile.bio}
          location={profile.location}
        />

        {/* Social Icons */}
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
          <h2 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider opacity-70 px-1">
            Important Links
          </h2>
        )}

        {/* Link Cards */}
        <div className="space-y-3 mb-10">
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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}