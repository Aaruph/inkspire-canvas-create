import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, MapPin, Clock, Award, Instagram, Facebook, Phone, Mail } from 'lucide-react';

// Mock artist data with portfolio details - Updated to match Artists page IDs
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
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Specializing in geometric and blackwork designs with 8 years of experience creating unique, personalized pieces. My work focuses on clean lines, mathematical precision, and bold visual impact.",
    phone: "+1 (555) 123-4567",
    email: "alex@inkspire.com",
    instagram: "@alexthompsonink",
    certifications: ["Licensed Tattoo Artist - NY", "Bloodborne Pathogen Certified", "CPR Certified"],
    portfolio: [
      { id: 1, title: "Geometric Wolf", category: "Geometric", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center" },
      { id: 2, title: "Sacred Geometry Mandala", category: "Geometric", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
      { id: 3, title: "Minimalist Tree", category: "Fine Line", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop&crop=center" },
      { id: 4, title: "Abstract Blackwork", category: "Blackwork", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center" },
      { id: 5, title: "Geometric Mountains", category: "Geometric", image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=400&h=400&fit=crop&crop=center" },
      { id: 6, title: "Fine Line Portrait", category: "Fine Line", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center" },
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
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "With over a decade of experience in traditional Japanese tattooing, I create bold, vibrant pieces that tell a story. My work honors traditional techniques while adding modern flair.",
    phone: "+1 (555) 234-5678",
    email: "jordan@inkspire.com",
    instagram: "@jordanleeink",
    certifications: ["Licensed Tattoo Artist - CA", "Japanese Traditional Certified", "Color Theory Specialist"],
    portfolio: [
      { id: 1, title: "Japanese Dragon", category: "Japanese", image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=400&h=400&fit=crop&crop=center" },
      { id: 2, title: "Cherry Blossom Sleeve", category: "Japanese", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center" },
      { id: 3, title: "Traditional Rose", category: "Traditional", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
      { id: 4, title: "Samurai Mask", category: "Japanese", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center" },
      { id: 5, title: "Ocean Wave", category: "Japanese", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop&crop=center" },
      { id: 6, title: "Phoenix Rising", category: "Color", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center" },
    ],
    testimonials: [
      { name: "David K.", rating: 5, text: "Jordan's Japanese style is authentic and beautiful. The colors are vibrant and the details are perfect." },
      { name: "Lisa T.", rating: 5, text: "Amazing artist with deep knowledge of traditional Japanese tattooing. Highly professional." },
      { name: "Chris B.", rating: 4, text: "Great experience overall. The tattoo healed perfectly and looks amazing." },
    ]
  },
  {
    id: '3',
    name: "Morgan Chen",
    specialty: ["Watercolor", "Minimalist", "Abstract"],
    experience: "5 years",
    location: "San Francisco",
    rating: 4.7,
    reviewCount: 93,
    availability: "Available May 25",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Morgan's watercolor technique creates ethereal, one-of-a-kind tattoos that flow naturally with the body's contours.",
    phone: "+1 (555) 345-6789",
    email: "morgan@inkspire.com",
    instagram: "@morganchenink",
    certifications: ["Licensed Tattoo Artist - CA", "Watercolor Specialist", "Fine Arts Degree"],
    portfolio: [
      { id: 1, title: "Watercolor Bird", category: "Watercolor", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center" },
      { id: 2, title: "Abstract Flow", category: "Abstract", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
      { id: 3, title: "Minimalist Mountain", category: "Minimalist", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop&crop=center" },
      { id: 4, title: "Watercolor Flowers", category: "Watercolor", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center" },
      { id: 5, title: "Abstract Waves", category: "Abstract", image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=400&h=400&fit=crop&crop=center" },
      { id: 6, title: "Simple Line Art", category: "Minimalist", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center" },
    ],
    testimonials: [
      { name: "Alex P.", rating: 5, text: "Morgan's watercolor style is absolutely stunning. The colors blend perfectly!" },
      { name: "Jamie S.", rating: 5, text: "Beautiful minimalist work that captures exactly what I wanted." },
      { name: "Taylor K.", rating: 4, text: "Great artist with a unique style. Very professional and clean studio." },
    ]
  },
  {
    id: '4',
    name: "Taylor Reyes",
    specialty: ["Realism", "Portrait", "Black & Gray"],
    experience: "10 years",
    location: "Chicago",
    rating: 4.9,
    reviewCount: 145,
    availability: "Available June 15",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Renowned for hyperrealistic portraits and detailed black and gray work that captures every nuance and emotion.",
    phone: "+1 (555) 456-7890",
    email: "taylor@inkspire.com",
    instagram: "@taylorreyesink",
    certifications: ["Licensed Tattoo Artist - IL", "Portrait Specialist", "Realism Master Class"],
    portfolio: [
      { id: 1, title: "Realistic Portrait", category: "Portrait", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center" },
      { id: 2, title: "Black & Gray Lion", category: "Black & Gray", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
      { id: 3, title: "Photorealistic Eye", category: "Realism", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop&crop=center" },
      { id: 4, title: "Memorial Portrait", category: "Portrait", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center" },
      { id: 5, title: "Realistic Rose", category: "Realism", image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=400&h=400&fit=crop&crop=center" },
      { id: 6, title: "Black & Gray Skull", category: "Black & Gray", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center" },
    ],
    testimonials: [
      { name: "Maria L.", rating: 5, text: "Taylor's realism work is incredible. The portrait looks exactly like the photo!" },
      { name: "John D.", rating: 5, text: "Amazing detail and skill. The black and gray work is phenomenal." },
      { name: "Sophie R.", rating: 5, text: "Professional, talented, and the result exceeded all expectations." },
    ]
  },
  {
    id: '5',
    name: "Riley Johnson",
    specialty: ["Neo-Traditional", "Color", "Animal"],
    experience: "7 years",
    location: "Austin",
    rating: 4.6,
    reviewCount: 87,
    availability: "Available May 28",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616c28ca2ca?w=400&h=400&fit=crop&crop=face",
    bio: "Riley's neo-traditional style combines bold lines with vibrant colors for tattoos that pop with personality.",
    phone: "+1 (555) 567-8901",
    email: "riley@inkspire.com",
    instagram: "@rileyjohnsonink",
    certifications: ["Licensed Tattoo Artist - TX", "Neo-Traditional Specialist", "Color Theory Expert"],
    portfolio: [
      { id: 1, title: "Neo-Traditional Tiger", category: "Neo-Traditional", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center" },
      { id: 2, title: "Colorful Owl", category: "Color", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
      { id: 3, title: "Wolf Portrait", category: "Animal", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop&crop=center" },
      { id: 4, title: "Neo-Traditional Rose", category: "Neo-Traditional", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center" },
      { id: 5, title: "Vibrant Peacock", category: "Color", image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=400&h=400&fit=crop&crop=center" },
      { id: 6, title: "Eagle Design", category: "Animal", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center" },
    ],
    testimonials: [
      { name: "Casey M.", rating: 5, text: "Riley's use of color is amazing! The neo-traditional style is perfect." },
      { name: "Jordan P.", rating: 4, text: "Great work on my animal piece. Very detailed and vibrant." },
      { name: "Sam T.", rating: 5, text: "Professional service and beautiful results. Highly recommend!" },
    ]
  },
  {
    id: '6',
    name: "Cameron Park",
    specialty: ["Tribal", "Polynesian", "Ornamental"],
    experience: "15 years",
    location: "Honolulu",
    rating: 4.8,
    reviewCount: 203,
    availability: "Available June 10",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Drawing from traditional Polynesian influences, Cameron creates meaningful tribal designs with cultural significance.",
    phone: "+1 (555) 678-9012",
    email: "cameron@inkspire.com",
    instagram: "@cameronparkink",
    certifications: ["Licensed Tattoo Artist - HI", "Polynesian Traditional Master", "Cultural Arts Certified"],
    portfolio: [
      { id: 1, title: "Maori Tribal", category: "Tribal", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center" },
      { id: 2, title: "Polynesian Sleeve", category: "Polynesian", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
      { id: 3, title: "Ornamental Mandala", category: "Ornamental", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop&crop=center" },
      { id: 4, title: "Hawaiian Tribal", category: "Tribal", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center" },
      { id: 5, title: "Samoan Pattern", category: "Polynesian", image: "https://images.unsplash.com/photo-1578662997406-0c79e66b7e12?w=400&h=400&fit=crop&crop=center" },
      { id: 6, title: "Sacred Geometry", category: "Ornamental", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop&crop=center" },
    ],
    testimonials: [
      { name: "Kai L.", rating: 5, text: "Cameron's knowledge of Polynesian culture is deep and authentic. Beautiful work!" },
      { name: "Leilani H.", rating: 5, text: "Respectful approach to traditional designs with modern execution." },
      { name: "Mike S.", rating: 4, text: "Great tribal work with cultural significance. Very professional." },
    ]
  },
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
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-ink-accent/50">
                  <img 
                    src={artist.profileImage} 
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
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
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={piece.image}
                      alt={piece.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
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
