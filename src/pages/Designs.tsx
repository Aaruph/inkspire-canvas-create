
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, LayoutGrid, LayoutList } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder design data
const designs = [
  {
    id: 1,
    title: "Geometric Wolf",
    artist: "Alex Thompson",
    category: "Geometric",
    tags: ["Animals", "Geometric", "Black & Gray"],
    preview: "wolf-pattern",
  },
  {
    id: 2,
    title: "Floral Sleeve",
    artist: "Jordan Lee",
    category: "Nature",
    tags: ["Floral", "Color", "Sleeve"],
    preview: "floral-pattern",
  },
  {
    id: 3,
    title: "Japanese Dragon",
    artist: "Morgan Chen",
    category: "Traditional",
    tags: ["Asian", "Traditional", "Color"],
    preview: "dragon-pattern",
  },
  {
    id: 4,
    title: "Minimalist Wave",
    artist: "Alex Thompson",
    category: "Minimalist",
    tags: ["Simple", "Black & Gray", "Small"],
    preview: "wave-pattern",
  },
  {
    id: 5,
    title: "Abstract Shapes",
    artist: "Jordan Lee",
    category: "Abstract",
    tags: ["Geometric", "Color", "Modern"],
    preview: "abstract-pattern",
  },
  {
    id: 6,
    title: "Skull & Roses",
    artist: "Morgan Chen",
    category: "Traditional",
    tags: ["Skull", "Floral", "Traditional"],
    preview: "skull-pattern",
  },
  {
    id: 7,
    title: "Celestial Moon",
    artist: "Alex Thompson",
    category: "Celestial",
    tags: ["Moon", "Stars", "Black & Gray"],
    preview: "moon-pattern",
  },
  {
    id: 8,
    title: "Phoenix Rising",
    artist: "Jordan Lee",
    category: "Mythical",
    tags: ["Birds", "Fire", "Color"],
    preview: "phoenix-pattern",
  },
];

const categories = [
  "All",
  "Geometric",
  "Nature",
  "Traditional",
  "Minimalist",
  "Abstract",
  "Celestial",
  "Mythical",
];

const Designs = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDesigns = designs.filter((design) => {
    const matchesCategory = selectedCategory === 'All' || design.category === selectedCategory;
    const matchesSearch = 
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-ink-dark">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-ink-accent/10 to-transparent py-12">
          <div className="ink-container">
            <h1 className="text-4xl md:text-5xl font-display text-ink-light mb-4">Tattoo Designs</h1>
            <p className="text-ink-light/70 max-w-3xl">
              Browse our collection of unique tattoo designs created by talented artists. 
              Find inspiration or use these designs as a starting point for your custom tattoo.
            </p>
          </div>
        </div>
        
        <div className="ink-container py-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search designs, artists, or tags..."
                className="pl-10 bg-card border-ink-accent/30 focus-visible:ring-ink-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-ink-accent text-ink-dark' : 'border-ink-accent/50 text-ink-light hover:bg-ink-accent/10'}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-ink-accent text-ink-dark' : 'border-ink-accent/50 text-ink-light hover:bg-ink-accent/10'}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <Tabs defaultValue="All" className="mb-8" onValueChange={setSelectedCategory}>
            <TabsList className="bg-card border border-border p-1 overflow-x-auto flex flex-nowrap justify-start max-w-full">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-ink-accent data-[state=active]:text-ink-dark whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* Designs Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDesigns.map((design) => (
                <div 
                  key={design.id} 
                  className="bg-card rounded-lg overflow-hidden hover:shadow-xl hover:shadow-ink-accent/10 transition-all duration-300 transform hover:-translate-y-1 border border-border"
                >
                  <div className="h-56 bg-gradient-to-tr from-ink-accent/20 via-ink-accent2/10 to-ink-accent3/10 flex items-center justify-center p-4">
                    <div className="h-full w-full rounded-md border-2 border-dashed border-ink-accent/30 flex items-center justify-center">
                      <span className="text-ink-accent/70">{design.preview}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-ink-light">{design.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">By {design.artist}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {design.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-ink-accent/10 text-ink-accent border border-ink-accent/30 hover:bg-ink-accent/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Button 
                        asChild
                        variant="outline" 
                        className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                      >
                        <Link to={`/designs/${design.id}`}>View</Link>
                      </Button>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20"
                      >
                        <Link to={`/customize?design=${design.id}`}>Customize</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDesigns.map((design) => (
                <div 
                  key={design.id} 
                  className="bg-card rounded-lg overflow-hidden hover:shadow-xl hover:shadow-ink-accent/10 transition-all duration-300 border border-border flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-48 h-48 bg-gradient-to-tr from-ink-accent/20 via-ink-accent2/10 to-ink-accent3/10 flex items-center justify-center p-4 shrink-0">
                    <div className="h-full w-full rounded-md border-2 border-dashed border-ink-accent/30 flex items-center justify-center">
                      <span className="text-ink-accent/70">{design.preview}</span>
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium text-ink-light">{design.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">By {design.artist}</p>
                      </div>
                      <Badge className="bg-ink-accent/20 text-ink-accent border border-ink-accent/30">
                        {design.category}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {design.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-ink-accent/10 text-ink-accent border border-ink-accent/30 hover:bg-ink-accent/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex space-x-3">
                      <Button 
                        asChild
                        variant="outline" 
                        className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                      >
                        <Link to={`/designs/${design.id}`}>View Details</Link>
                      </Button>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20"
                      >
                        <Link to={`/customize?design=${design.id}`}>Customize</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {filteredDesigns.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-ink-light mb-2">No designs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="mt-auto border-t border-ink-accent/20 py-6">
        <div className="ink-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-display text-xl text-ink-light">Inkspire</span>
            </div>
            <div className="text-ink-light/60 text-sm">
              &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Designs;
