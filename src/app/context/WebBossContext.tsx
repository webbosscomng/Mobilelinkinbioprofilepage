import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Profile as DBProfile, Link as DBLink, Product as DBProduct } from '../../lib/supabase';

export interface Link {
  id: string;
  icon: string;
  label: string;
  url: string;
  clicks: number;
  isVisible: boolean;
  category: 'social' | 'shop' | 'contact' | 'custom';
}

export interface Profile {
  avatar: string;
  name: string;
  bio: string;
  location: string;
}

export interface SocialLinks {
  instagram?: string;
  whatsapp?: string;
  twitter?: string;
  facebook?: string;
}

export interface Theme {
  id: string;
  backgroundColor: string;
  cardColor: string;
  accentColor: string;
  backgroundType: 'solid' | 'gradient' | 'pattern';
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  isVisible: boolean;
  description?: string;
  inventory: number;
}

interface WebBossContextType {
  profile: Profile;
  socialLinks: SocialLinks;
  links: Link[];
  products: Product[];
  theme: Theme;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  updateSocialLinks: (socialLinks: Partial<SocialLinks>) => void;
  addLink: (link: Omit<Link, 'id' | 'clicks'>) => Promise<void>;
  updateLink: (id: string, link: Partial<Link>) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  toggleLinkVisibility: (id: string) => Promise<void>;
  reorderLinks: (links: Link[]) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductVisibility: (id: string) => Promise<void>;
  updateTheme: (theme: Partial<Theme>) => Promise<void>;
  isOnboarded: boolean;
  completeOnboarding: () => void;
  loading: boolean;
  refreshData: () => Promise<void>;
}

const WebBossContext = createContext<WebBossContextType | undefined>(undefined);

export function WebBossProvider({ children }: { children: ReactNode }) {
  const { user, profile: authProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [profile, setProfile] = useState<Profile>({
    avatar: '',
    name: '',
    bio: '',
    location: '',
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [links, setLinks] = useState<Link[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [theme, setTheme] = useState<Theme>({
    id: 'dark',
    backgroundColor: '#0F172A',
    cardColor: '#FFFFFF',
    accentColor: '#22C55E',
    backgroundType: 'solid',
  });

  const [isOnboarded, setIsOnboarded] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webboss_onboarded') === 'true';
    }
    return false;
  });

  // Load data from Supabase
  const loadData = async () => {
    if (!authProfile?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Load profile data
      setProfile({
        avatar: authProfile.profile_image || '',
        name: authProfile.full_name,
        bio: authProfile.bio,
        location: authProfile.location || '',
      });

      // Set theme from profile
      if (authProfile.custom_colors) {
        setTheme({
          id: 'custom',
          backgroundColor: authProfile.custom_colors.background || '#0F172A',
          cardColor: '#FFFFFF',
          accentColor: authProfile.custom_colors.accent || '#22C55E',
          backgroundType: 'solid',
        });
      }

      // Load links
      const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('profile_id', authProfile.id)
        .order('order_index', { ascending: true });

      if (linksError) throw linksError;

      if (linksData) {
        setLinks(linksData.map(link => ({
          id: link.id,
          icon: link.icon || 'Link',
          label: link.title,
          url: link.url,
          clicks: link.clicks,
          isVisible: link.is_active,
          category: 'custom',
        })));
      }

      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('profile_id', authProfile.id)
        .order('order_index', { ascending: true });

      if (productsError) throw productsError;

      if (productsData) {
        setProducts(productsData.map(product => ({
          id: product.id,
          name: product.name,
          price: `₦${product.price.toLocaleString()}`,
          image: product.image_url || '',
          isVisible: product.is_active,
          description: product.description,
          inventory: product.stock_quantity || 0,
        })));
      }

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [authProfile?.id]);

  const refreshData = async () => {
    await loadData();
  };

  const updateProfile = async (newProfile: Partial<Profile>) => {
    if (!authProfile?.id) return;

    try {
      const updates: any = {};
      if (newProfile.name) updates.full_name = newProfile.name;
      if (newProfile.bio) updates.bio = newProfile.bio;
      if (newProfile.location) updates.location = newProfile.location;
      if (newProfile.avatar) updates.profile_image = newProfile.avatar;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authProfile.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, ...newProfile }));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const updateSocialLinks = (newSocialLinks: Partial<SocialLinks>) => {
    setSocialLinks(prev => ({ ...prev, ...newSocialLinks }));
  };

  const addLink = async (link: Omit<Link, 'id' | 'clicks'>) => {
    if (!authProfile?.id) return;

    try {
      const { data, error } = await supabase
        .from('links')
        .insert({
          profile_id: authProfile.id,
          title: link.label,
          url: link.url,
          icon: link.icon,
          is_active: link.isVisible,
          order_index: links.length,
        })
        .select()
        .single();

      if (error) throw error;

      const newLink: Link = {
        id: data.id,
        icon: link.icon,
        label: link.label,
        url: link.url,
        clicks: 0,
        isVisible: link.isVisible,
        category: link.category,
      };
      
      setLinks(prev => [...prev, newLink]);
    } catch (error) {
      console.error('Error adding link:', error);
      throw error;
    }
  };

  const updateLink = async (id: string, linkData: Partial<Link>) => {
    try {
      const updates: any = {};
      if (linkData.label) updates.title = linkData.label;
      if (linkData.url) updates.url = linkData.url;
      if (linkData.icon) updates.icon = linkData.icon;
      if (linkData.isVisible !== undefined) updates.is_active = linkData.isVisible;

      const { error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setLinks(prev => prev.map(link => 
        link.id === id ? { ...link, ...linkData } : link
      ));
    } catch (error) {
      console.error('Error updating link:', error);
      throw error;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLinks(prev => prev.filter(link => link.id !== id));
    } catch (error) {
      console.error('Error deleting link:', error);
      throw error;
    }
  };

  const toggleLinkVisibility = async (id: string) => {
    const link = links.find(l => l.id === id);
    if (!link) return;

    try {
      const { error } = await supabase
        .from('links')
        .update({ is_active: !link.isVisible })
        .eq('id', id);

      if (error) throw error;

      setLinks(prev => prev.map(l =>
        l.id === id ? { ...l, isVisible: !l.isVisible } : l
      ));
    } catch (error) {
      console.error('Error toggling link visibility:', error);
      throw error;
    }
  };

  const reorderLinks = async (newLinks: Link[]) => {
    try {
      // Update order_index for all links
      const updates = newLinks.map((link, index) => ({
        id: link.id,
        order_index: index,
      }));

      for (const update of updates) {
        await supabase
          .from('links')
          .update({ order_index: update.order_index })
          .eq('id', update.id);
      }

      setLinks(newLinks);
    } catch (error) {
      console.error('Error reordering links:', error);
      throw error;
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    if (!authProfile?.id) return;

    try {
      const price = parseFloat(product.price.replace(/[₦,]/g, ''));

      const { data, error } = await supabase
        .from('products')
        .insert({
          profile_id: authProfile.id,
          name: product.name,
          description: product.description,
          price: price,
          currency: 'NGN',
          image_url: product.image,
          stock_quantity: product.inventory,
          is_active: product.isVisible,
          order_index: products.length,
        })
        .select()
        .single();

      if (error) throw error;

      const newProduct: Product = {
        id: data.id,
        name: product.name,
        price: product.price,
        image: product.image,
        isVisible: product.isVisible,
        description: product.description,
        inventory: product.inventory,
      };
      
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      const updates: any = {};
      if (productData.name) updates.name = productData.name;
      if (productData.description) updates.description = productData.description;
      if (productData.price) {
        updates.price = parseFloat(productData.price.replace(/[₦,]/g, ''));
      }
      if (productData.image) updates.image_url = productData.image;
      if (productData.inventory !== undefined) updates.stock_quantity = productData.inventory;
      if (productData.isVisible !== undefined) updates.is_active = productData.isVisible;

      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, ...productData } : p
      ));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const toggleProductVisibility = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.isVisible })
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(p =>
        p.id === id ? { ...p, isVisible: !p.isVisible } : p
      ));
    } catch (error) {
      console.error('Error toggling product visibility:', error);
      throw error;
    }
  };

  const updateTheme = async (newTheme: Partial<Theme>) => {
    if (!authProfile?.id) return;

    try {
      const customColors = {
        background: newTheme.backgroundColor,
        accent: newTheme.accentColor,
      };

      const { error } = await supabase
        .from('profiles')
        .update({ custom_colors: customColors })
        .eq('id', authProfile.id);

      if (error) throw error;

      setTheme(prev => ({ ...prev, ...newTheme }));
    } catch (error) {
      console.error('Error updating theme:', error);
      throw error;
    }
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('webboss_onboarded', 'true');
    }
  };

  return (
    <WebBossContext.Provider
      value={{
        profile,
        socialLinks,
        links,
        products,
        theme,
        updateProfile,
        updateSocialLinks,
        addLink,
        updateLink,
        deleteLink,
        toggleLinkVisibility,
        reorderLinks,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductVisibility,
        updateTheme,
        isOnboarded,
        completeOnboarding,
        loading,
        refreshData,
      }}
    >
      {children}
    </WebBossContext.Provider>
  );
}

export function useWebBoss() {
  const context = useContext(WebBossContext);
  if (!context) {
    throw new Error('useWebBoss must be used within WebBossProvider');
  }
  return context;
}