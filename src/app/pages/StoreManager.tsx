import { useState } from 'react';
import { Package, Plus, ShoppingBag, Search, ExternalLink } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useWebBoss, Product } from "../context/WebBossContext";
import { ProductRow } from "../components/dashboard/ProductRow";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

export function StoreManager() {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductVisibility } = useWebBoss();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    isVisible: true,
    inventory: 1
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description || '',
        isVisible: product.isVisible,
        inventory: product.inventory
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        image: '',
        description: '',
        isVisible: true,
        inventory: 1
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      toast.success('Product updated');
    } else {
      addProduct(formData);
      toast.success('Product added to your store');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast.success('Product deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Store Manager</h1>
          <p className="text-slate-500">Manage your products and showcase them on your profile</p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
          onClick={() => handleOpenModal()}
        >
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Products</CardTitle>
                <div className="relative w-full max-w-[240px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      onEdit={handleOpenModal}
                      onDelete={handleDelete}
                      onToggleVisibility={toggleProductVisibility}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="text-slate-300" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mt-2">
                    {searchTerm ? "Try searching with a different term." : "Start adding products to your mini-store to showcase them to your customers."}
                  </p>
                  {!searchTerm && (
                    <Button 
                      variant="outline" 
                      className="mt-6 border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleOpenModal()}
                    >
                      Add Your First Product
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-green-50 border-green-100">
            <CardHeader>
              <CardTitle className="text-green-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Store Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-green-800 space-y-3">
              <p>• High-quality images increase trust and conversions.</p>
              <p>• Include clear prices in Naira (₦) for Nigerian customers.</p>
              <p>• When customers click "Buy" on your page, they'll be sent straight to your WhatsApp.</p>
              <p>• Products with 0 stock are automatically hidden from your public profile.</p>
              <p>• You can temporarily hide products that are out of stock using the toggle.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <CardDescription>How your store looks to visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-950 rounded-2xl p-4 aspect-[9/16] overflow-hidden relative">
                <div className="w-full h-full bg-[#0F172A] rounded-xl flex flex-col items-center p-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 mb-2"></div>
                  <div className="w-20 h-2 bg-slate-800 rounded-full mb-1"></div>
                  <div className="w-32 h-1.5 bg-slate-800/50 rounded-full mb-6"></div>
                  
                  <div className="w-full space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {products.filter(p => p.isVisible).slice(0, 4).map(p => (
                        <div key={p.id} className="bg-white rounded-lg p-1.5 shadow-sm">
                          <div className="aspect-square bg-slate-100 rounded-md mb-1 overflow-hidden">
                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full mb-1"></div>
                          <div className="w-1/2 h-1 bg-green-500 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              Enter the details of your product below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input 
                id="name" 
                placeholder="e.g. Handmade Leather Bag" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price *</Label>
                <Input 
                  id="price" 
                  placeholder="₦ 0.00" 
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inventory">Stock Level</Label>
                <Input 
                  id="inventory" 
                  type="number"
                  placeholder="0" 
                  value={formData.inventory}
                  onChange={(e) => setFormData(prev => ({ ...prev, inventory: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                placeholder="https://..." 
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Tell customers more about this item..." 
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
