
import { useState } from 'react';
import ArtistLayout from '@/components/artist/ArtistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Upload, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

const ArtistPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: 'Japanese Dragon',
      description: 'Traditional Japanese dragon with cherry blossoms',
      category: 'Traditional',
      imageUrl: 'https://images.unsplash.com/photo-1590246814695-c5bfd1cf6152?w=400&h=400&fit=crop',
      tags: ['Japanese', 'Dragon', 'Traditional', 'Color'],
    },
    {
      id: 2,
      title: 'Geometric Mandala',
      description: 'Intricate geometric mandala design',
      category: 'Geometric',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      tags: ['Geometric', 'Mandala', 'Black & Grey'],
    },
    {
      id: 3,
      title: 'Floral Sleeve',
      description: 'Colorful floral sleeve with roses and peonies',
      category: 'Floral',
      imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2a6e87?w=400&h=400&fit=crop',
      tags: ['Floral', 'Sleeve', 'Color', 'Roses'],
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageFile: null as File | null,
    tags: '',
  });

  const categories = ['Traditional', 'Geometric', 'Floral', 'Portrait', 'Abstract', 'Tribal', 'Minimalist'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newItem: PortfolioItem = {
      id: editingItem ? editingItem.id : Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      imageUrl: editingItem ? editingItem.imageUrl : 'https://images.unsplash.com/photo-1565058379802-bbe93b2a6e87?w=400&h=400&fit=crop',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (editingItem) {
      setPortfolioItems(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
      toast.success('Portfolio item updated successfully');
    } else {
      setPortfolioItems(prev => [...prev, newItem]);
      toast.success('Portfolio item added successfully');
    }

    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ title: '', description: '', category: '', imageFile: null, tags: '' });
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imageFile: null,
      tags: item.tags.join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
    toast.success('Portfolio item deleted');
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: '', imageFile: null, tags: '' });
    setEditingItem(null);
  };

  return (
    <ArtistLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Portfolio</h1>
            <p className="text-muted-foreground">
              Showcase your best work to attract new clients.
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Work
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border text-card-foreground max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-card-foreground">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-background border-border text-foreground"
                    placeholder="Enter tattoo title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-card-foreground">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-background border-border text-foreground"
                    placeholder="Describe your tattoo design"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-card-foreground">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {categories.map(category => (
                        <SelectItem key={category} value={category} className="text-card-foreground">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tags" className="text-card-foreground">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="bg-background border-border text-foreground"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image" className="text-card-foreground">Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData(prev => ({ ...prev, imageFile: e.target.files?.[0] || null }))}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                    {editingItem ? 'Update' : 'Add'} Portfolio Item
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="border-border text-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="bg-card border-border overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-card-foreground">{item.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(item)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-border text-muted-foreground text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ArtistLayout>
  );
};

export default ArtistPortfolio;
