
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder artist data
const artists = [
  {
    id: 1,
    name: "Alex Thompson",
    specialty: ["Geometric", "Blackwork", "Fine Line"],
    experience: "8 years",
    location: "New York",
    rating: 4.9,
    reviewCount: 124,
    availability: "Available May 30",
    bio: "Specializing in geometric and blackwork designs with 8 years of experience creating unique, personalized pieces.",
  },
  {
    id: 2,
    name: "Jordan Lee",
    specialty: ["Japanese", "Traditional", "Color"],
    experience: "12 years",
    location: "Los Angeles",
    rating: 4.8,
    reviewCount: 167,
    availability: "Available June 5",
    bio: "With over a decade of experience in traditional Japanese tattooing, Jordan creates bold, vibrant pieces that tell a story.",
  },
  {
    id: 3,
    name: "Morgan Chen",
    specialty: ["Watercolor", "Minimalist", "Abstract"],
    experience: "5 years",
    location: "San Francisco",
    rating: 4.7,
    reviewCount: 93,
    availability: "Available May 25",
    bio: "Morgan's watercolor technique creates ethereal, one-of-a-kind tattoos that flow naturally with the body's contours.",
  },
  {
    id: 4,
    name: "Taylor Reyes",
    specialty: ["Realism", "Portrait", "Black & Gray"],
    experience: "10 years",
    location: "Chicago",
    rating: 4.9,
    reviewCount: 145,
    availability: "Available June 15",
    bio: "Renowned for hyperrealistic portraits and detailed black and gray work that captures every nuance and emotion.",
  },
  {
    id: 5,
    name: "Riley Johnson",
    specialty: ["Neo-Traditional", "Color", "Animal"],
    experience: "7 years",
    location: "Austin",
    rating: 4.6,
    reviewCount: 87,
    availability: "Available May 28",
    bio: "Riley's neo-traditional style combines bold lines with vibrant colors for tattoos that pop with personality.",
  },
  {
    id: 6,
    name: "Cameron Park",
    specialty: ["Tribal", "Polynesian", "Ornamental"],
    experience: "15 years",
    location: "Honolulu",
    rating: 4.8,
    reviewCount: 203,
    availability: "Available June 10",
    bio: "Drawing from traditional Polynesian influences, Cameron creates meaningful tribal designs with cultural significance.",
  },
];

const specialties = [
  "All",
  "Geometric",
  "Blackwork",
  "Japanese",
  "Traditional",
  "Watercolor",
  "Minimalist",
  "Realism",
  "Neo-Traditional",
  "Tribal",
];

const locations = [
  "All Locations",
  "New York",
  "Los Angeles",
  "San Francisco",
  "Chicago",
  "Austin",
  "Honolulu",
];

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch = 
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      artist.specialty.some(s => s.toLowerCase() === selectedSpecialty.toLowerCase());
    
    const matchesLocation = 
      selectedLocation === 'All Locations' || 
      artist.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col bg-ink-dark">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-ink-accent/10 to-transparent py-12">
          <div className="ink-container">
            <h1 className="text-4xl md:text-5xl font-display text-ink-light mb-4">Our Artists</h1>
            <p className="text-ink-light/70 max-w-3xl">
              Meet our talented tattoo artists, each with their own unique style and expertise.
              Book a session with your favorite artist and bring your tattoo vision to life.
            </p>
          </div>
        </div>
        
        <div className="ink-container py-8">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artists..."
                className="pl-10 bg-card border-ink-accent/30 focus-visible:ring-ink-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="bg-card border border-ink-accent/30 rounded-md p-2 text-ink-light focus:ring-ink-accent focus:border-ink-accent"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty} Style</option>
              ))}
            </select>
            
            <select 
              className="bg-card border border-ink-accent/30 rounded-md p-2 text-ink-light focus:ring-ink-accent focus:border-ink-accent"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <div 
                key={artist.id} 
                className="bg-card rounded-lg overflow-hidden hover:shadow-xl hover:shadow-ink-accent/10 transition-all duration-300 transform hover:-translate-y-1 border border-border flex flex-col"
              >
                <div className="h-48 bg-gradient-to-tr from-ink-accent/20 via-ink-accent2/10 to-ink-accent3/10 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center border-2 border-ink-accent/50">
                    <span className="text-ink-light text-2xl font-display">{artist.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-ink-light">{artist.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{artist.location} • {artist.experience}</p>
                    </div>
                    <div className="flex items-center bg-ink-accent/10 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-ink-accent mr-1 fill-ink-accent" />
                      <span className="text-sm font-medium text-ink-light">{artist.rating}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-ink-light/80 text-sm line-clamp-2">{artist.bio}</p>
                  
                  <div className="mt-4">
                    <p className="text-xs uppercase text-muted-foreground tracking-wider">Specialties</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {artist.specialty.map((specialty, index) => (
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
                </div>
                
                <div className="p-6 pt-0 mt-auto">
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      asChild
                      variant="outline" 
                      className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                    >
                      <Link to={`/artists/${artist.id}`}>View Portfolio</Link>
                    </Button>
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20"
                    >
                      <Link to={`/booking?artist=${artist.id}`}>Book Session</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredArtists.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-ink-light mb-2">No artists found</h3>
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

export default Artists;
