
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, MapPin, Clock, Award, Instagram, Facebook, Phone, Mail } from 'lucide-react';

// Mock artist data with portfolio details
const artistsData = [
  {
    id: '1',
    name: "Alex Thompson",
    specialty: ["Geometric", "Blackwork", "Fine Line"],
    experience: "8 years",
    location: "New York",
    rating: 4.9,
    reviewCount: 124,
    availability: "Available May 30",
    bio: "Specializing in geometric and blackwork designs with 8 years of experience creating unique, personalized pieces. My work focuses on clean lines, mathematical precision, and bold visual impact.",
    phone: "+1 (555) 123-4567",
    email: "alex@inkspire.com",
    instagram: "@alexthompsonink",
    certifications: ["Licensed Tattoo Artist - NY", "Bloodborne Pathogen Certified", "CPR Certified"],
    portfolio: [
      { id: 1, title: "Geometric Wolf", category: "Geometric", image: "geometric-wolf-1" },
      { id: 2, title: "Sacred Geometry Mandala", category: "Geometric", image: "mandala-1" },
      { id: 3, title: "Minimalist Tree", category: "Fine Line", image: "tree-1" },
      { id: 4, title: "Abstract Blackwork", category: "Blackwork", image: "abstract-1" },
      { id: 5, title: "Geometric Mountains", category: "Geometric", image: "mountains-1" },
      { id: 6, title: "Fine Line Portrait", category: "Fine Line", image: "portrait-1" },
    ],
    testimonials: [
      { name: "Sarah M.", rating: 5, text: "Alex created the most amazing geometric piece for me. The precision and attention to detail is incredible!" },
      { name: "Mike R.", rating: 5, text: "Professional, clean, and talented. Highly recommend for anyone looking for geometric work." },
      { name: "Emma L.", rating: 5, text: "The healing process was smooth and the final result exceeded my expectations." },
    ]
  },
  {
    id: '2',
    name: "Jordan Lee",
    specialty: ["Japanese", "Traditional", "Color"],
    experience: "12 years",
    location: "Los Angeles",
    rating: 4.8,
    reviewCount: 167,
    availability: "Available June 5",
    bio: "With over a decade of experience in traditional Japanese tattooing, I create bold, vibrant pieces that tell a story. My work honors traditional techniques while adding modern flair.",
    phone: "+1 (555) 234-5678",
    email: "jordan@inkspire.com",
    instagram: "@jordanleeink",
    certifications: ["Licensed Tattoo Artist - CA", "Japanese Traditional Certified", "Color Theory Specialist"],
    portfolio: [
      { id: 1, title: "Koi Dragon", category: "Japanese", image: "koi-dragon-1" },
      { id: 2, title: "Cherry Blossom Sleeve", category: "Japanese", image: "cherry-blossom-1" },
      { id: 3, title: "Traditional Rose", category: "Traditional", image: "rose-1" },
      { id: 4, title: "Samurai Mask", category: "Japanese", image: "samurai-1" },
      { id: 5, title: "Ocean Wave", category: "Japanese", image: "wave-1" },
      { id: 6, title: "Phoenix Rising", category: "Color", image: "phoenix-1" },
    ],
    testimonials: [
      { name: "David K.", rating: 5, text: "Jordan's Japanese style is authentic and beautiful. The colors are vibrant and the details are perfect." },
      { name: "Lisa T.", rating: 5, text: "Amazing artist with deep knowledge of traditional Japanese tattooing. Highly professional." },
      { name: "Chris B.", rating: 4, text: "Great experience overall. The tattoo healed perfectly and looks amazing." },
    ]
  },
  // Add more artists as needed
];

const ArtistProfile = () => {
  const { id } = useParams();
  const artist = artistsData.find(a => a.id === id);

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col bg-ink-dark">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink-light mb-4">Artist Not Found</h1>
            <Button asChild variant="outline" className="border-ink-accent/50 text-ink-light hover:bg-ink-accent/10">
              <Link to="/artists">Back to Artists</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ink-dark">
      <Navbar />
      
      <main className="flex-grow">
        <div className="ink-container py-8">
          {/* Back Button */}
          <Button 
            asChild
            variant="ghost" 
            className="text-ink-light hover:bg-ink-accent/10 mb-6"
          >
            <Link to="/artists" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Artists
            </Link>
          </Button>

          {/* Artist Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-ink-accent/20 via-ink-accent2/10 to-ink-accent3/10 flex items-center justify-center border-2 border-ink-accent/50">
                  <span className="text-ink-light text-4xl font-display">{artist.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-4xl font-display text-ink-light">{artist.name}</h1>
                    <div className="flex items-center bg-ink-accent/10 px-3 py-1 rounded">
                      <Star className="w-5 h-5 text-ink-accent mr-1 fill-ink-accent" />
                      <span className="text-lg font-medium text-ink-light">{artist.rating}</span>
                      <span className="text-ink-light/60 ml-1">({artist.reviewCount} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-ink-light/70 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{artist.location}</span>
                    <Clock className="w-4 h-4 mr-2 ml-6" />
                    <span>{artist.experience} experience</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artist.specialty.map((specialty, index) => (
                      <Badge 
                        key={index} 
                        className="bg-ink-accent/10 text-ink-accent border border-ink-accent/30"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-ink-light/80 mb-6">{artist.bio}</p>
                  
                  <div className="flex gap-4">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20"
                    >
                      <Link to={`/booking?artist=${artist.id}`}>Book Consultation</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-ink-light flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-ink-light/60 text-sm">Phone</p>
                  <p className="text-ink-light">{artist.phone}</p>
                </div>
                <div>
                  <p className="text-ink-light/60 text-sm">Email</p>
                  <p className="text-ink-light">{artist.email}</p>
                </div>
                <div>
                  <p className="text-ink-light/60 text-sm">Instagram</p>
                  <p className="text-ink-accent">{artist.instagram}</p>
                </div>
                <div>
                  <p className="text-ink-light/60 text-sm">Availability</p>
                  <p className="text-ink-accent">{artist.availability}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-display text-ink-light mb-8">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.portfolio.map((piece) => (
                <Card key={piece.id} className="bg-card border-border overflow-hidden hover:shadow-lg hover:shadow-ink-accent/10 transition-all duration-300">
                  <div className="aspect-square bg-ink-accent/5 flex items-center justify-center">
                    <div className="w-full h-full border-2 border-dashed border-ink-accent/30 rounded flex items-center justify-center">
                      <span className="text-ink-light/70 text-center">{piece.image}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium text-ink-light mb-1">{piece.title}</h3>
                    <Badge variant="secondary" className="bg-ink-accent/10 text-ink-accent border border-ink-accent/30">
                      {piece.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-display text-ink-light mb-8">Certifications & Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artist.certifications.map((cert, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-4 flex items-center">
                    <Award className="w-6 h-6 text-ink-accent mr-3" />
                    <span className="text-ink-light">{cert}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-3xl font-display text-ink-light mb-8">Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-ink-accent">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-ink-accent" />
                        ))}
                      </div>
                      <span className="ml-2 text-ink-light font-medium">{testimonial.name}</span>
                    </div>
                    <p className="text-ink-light/80 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
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

export default ArtistProfile;
