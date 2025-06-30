
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Design data with tattoo images
const designs = [
  {
    id: 1,
    title: "Geometric Wolf",
    category: "Geometric",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop&crop=center",
  },
  {
    id: 2,
    title: "Floral Sleeve",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center",
  },
  {
    id: 3,
    title: "Japanese Dragon",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=300&h=300&fit=crop&crop=center",
  },
  {
    id: 4,
    title: "Minimalist Wave",
    category: "Minimalist",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=300&h=300&fit=crop&crop=center",
  }
];

const FeaturedDesigns = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-ink-dark to-ink-dark/95">
      <div className="ink-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-4xl font-display text-ink-light mb-2">Popular Designs</h2>
            <p className="text-ink-light/70 max-w-xl">Discover trending tattoo designs from our curated collection</p>
          </div>
          <Button 
            asChild
            variant="link" 
            className="text-ink-accent flex items-center mt-4 md:mt-0"
          >
            <Link to="/designs" className="group">
              View All Designs
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {designs.map((design) => (
            <div 
              key={design.id} 
              className="bg-card rounded-lg overflow-hidden hover:shadow-xl hover:shadow-ink-accent/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-ink-accent uppercase tracking-wider">{design.category}</span>
                <h3 className="text-lg font-medium text-ink-light mt-1">{design.title}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <Button 
                    asChild
                    variant="ghost" 
                    size="sm" 
                    className="text-ink-accent hover:text-ink-accent hover:bg-ink-accent/10"
                  >
                    <Link to={`/designs/${design.id}`}>View Details</Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm" 
                    className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                  >
                    <Link to={`/customize?design=${design.id}`}>Customize</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;
