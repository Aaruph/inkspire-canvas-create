
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Share2, Download } from 'lucide-react';

// Mock design data (in a real app, this would come from an API)
const designsData = [
  {
    id: '1',
    title: "Geometric Wolf",
    artist: "Alex Thompson",
    category: "Geometric",
    tags: ["Animals", "Geometric", "Black & Gray"],
    description: "A stunning geometric interpretation of a wolf, featuring clean lines and modern design elements. Perfect for those who appreciate minimalist art with bold impact.",
    price: "$200 - $400",
    size: "Medium (4-6 inches)",
    placement: "Forearm, Shoulder, Back",
    timeEstimate: "2-3 hours",
    difficulty: "Intermediate",
    preview: "geometric-wolf-pattern",
  },
  {
    id: '2',
    title: "Floral Sleeve",
    artist: "Jordan Lee",
    category: "Nature",
    tags: ["Floral", "Color", "Sleeve"],
    description: "An intricate floral sleeve design featuring roses, peonies, and delicate foliage. This design flows beautifully around the arm with vibrant colors.",
    price: "$800 - $1200",
    size: "Large (Full Sleeve)",
    placement: "Full Arm",
    timeEstimate: "8-12 hours (multiple sessions)",
    difficulty: "Advanced",
    preview: "floral-sleeve-pattern",
  },
  {
    id: '3',
    title: "Japanese Dragon",
    artist: "Morgan Chen",
    category: "Traditional",
    tags: ["Asian", "Traditional", "Color"],
    description: "A traditional Japanese dragon design with clouds and waves. Rich in cultural symbolism and executed in classic Japanese tattoo style.",
    price: "$600 - $900",
    size: "Large (8-12 inches)",
    placement: "Back, Chest, Thigh",
    timeEstimate: "6-8 hours",
    difficulty: "Advanced",
    preview: "japanese-dragon-pattern",
  },
  {
    id: '4',
    title: "Minimalist Wave",
    artist: "Alex Thompson",
    category: "Minimalist",
    tags: ["Simple", "Black & Gray", "Small"],
    description: "A simple yet elegant wave design that captures the essence of water movement in minimal strokes. Perfect for first-time tattoo enthusiasts.",
    price: "$100 - $200",
    size: "Small (2-3 inches)",
    placement: "Wrist, Ankle, Behind Ear",
    timeEstimate: "1-2 hours",
    difficulty: "Beginner",
    preview: "minimalist-wave-pattern",
  },
];

const DesignDetails = () => {
  const { id } = useParams();
  const design = designsData.find(d => d.id === id);

  if (!design) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Design Not Found</h1>
            <Button asChild variant="outline" className="border-white/50 text-white hover:bg-white/10">
              <Link to="/designs">Back to Designs</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Back Button */}
          <Button 
            asChild
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-6"
          >
            <Link to="/designs" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Designs
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Design Preview */}
            <div className="space-y-4">
              <div className="aspect-square bg-white/5 border border-white/20 rounded-lg flex items-center justify-center p-8">
                <div className="w-full h-full border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                  <span className="text-white/70 text-center">{design.preview}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* Design Information */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-white/10 text-white border border-white/30 mb-3">
                  {design.category}
                </Badge>
                <h1 className="text-4xl font-bold text-white mb-2">{design.title}</h1>
                <p className="text-white/70">By {design.artist}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-white/80">{design.description}</p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {design.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="bg-white/10 text-white border border-white/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold">Price Range</h4>
                    <p className="text-white/80">{design.price}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Size</h4>
                    <p className="text-white/80">{design.size}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Time Estimate</h4>
                    <p className="text-white/80">{design.timeEstimate}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Difficulty</h4>
                    <p className="text-white/80">{design.difficulty}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Recommended Placement</h4>
                  <p className="text-white/80">{design.placement}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  asChild
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  <Link to={`/customize?design=${design.id}`}>
                    Customize This Design
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/booking">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-display text-xl text-white">Inkspire</span>
            </div>
            <div className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignDetails;
