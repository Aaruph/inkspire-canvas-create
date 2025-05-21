
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Placeholder artist data
const artists = [
  {
    id: 1,
    name: "Alex Thompson",
    specialty: "Geometric, Blackwork",
    location: "New York",
    rating: 4.9,
    availability: "Available May 30",
  },
  {
    id: 2,
    name: "Jordan Lee",
    specialty: "Japanese, Traditional",
    location: "Los Angeles",
    rating: 4.8,
    availability: "Available June 5",
  },
  {
    id: 3,
    name: "Morgan Chen",
    specialty: "Watercolor, Minimalist",
    location: "San Francisco",
    rating: 4.7,
    availability: "Available May 25",
  }
];

const FeaturedArtists = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-ink-dark/95 to-ink-dark">
      <div className="ink-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-4xl font-display text-ink-light mb-2">Featured Artists</h2>
            <p className="text-ink-light/70 max-w-xl">Connect with top tattoo artists ready to bring your vision to life</p>
          </div>
          <Button 
            asChild
            variant="link" 
            className="text-ink-accent flex items-center mt-4 md:mt-0"
          >
            <Link to="/artists" className="group">
              View All Artists
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div 
              key={artist.id} 
              className="bg-card rounded-lg overflow-hidden hover:shadow-xl hover:shadow-ink-accent/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-tr from-ink-accent/20 via-ink-accent2/10 to-ink-accent3/10 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center border-2 border-ink-accent/50">
                  <span className="text-ink-light/70 text-lg font-display">{artist.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-ink-light">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{artist.location}</p>
                  </div>
                  <div className="flex items-center bg-ink-accent/10 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-ink-accent mr-1 fill-ink-accent" />
                    <span className="text-sm font-medium text-ink-light">{artist.rating}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs uppercase text-muted-foreground tracking-wider">Specialties</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {artist.specialty.split(', ').map((specialty, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-ink-accent/10 text-ink-accent border border-ink-accent/30 hover:bg-ink-accent/20"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-ink-accent mt-4">{artist.availability}</p>
                
                <div className="mt-6 flex space-x-3">
                  <Button 
                    asChild
                    className="flex-1 bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20"
                  >
                    <Link to={`/booking?artist=${artist.id}`}>Book Session</Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="flex-1 border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                  >
                    <Link to={`/artists/${artist.id}`}>View Profile</Link>
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

export default FeaturedArtists;
