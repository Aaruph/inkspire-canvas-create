
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedDesigns from '@/components/FeaturedDesigns';
import FeaturedArtists from '@/components/FeaturedArtists';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedDesigns />
        <FeaturedArtists />
        
        {/* Call to Action Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ink-accent/30 to-ink-accent2/30 opacity-20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-ink-accent/20 rounded-full filter blur-3xl"></div>
          
          <div className="ink-container relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-display mb-6 text-ink-light">Ready to Express Yourself?</h2>
            <p className="text-lg md:text-xl text-ink-light/80 max-w-xl mx-auto mb-8">
              Create your unique tattoo design today and book an appointment with our talented artists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20 transition-all duration-300"
              >
                <Link to="/customize">Start Designing</Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
              >
                <Link to="/booking">Book Appointment</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-ink-dark border-t border-ink-accent/20 py-12">
          <div className="ink-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ink-accent to-ink-accent2 flex items-center justify-center">
                    <span className="font-display text-ink-dark text-sm">IS</span>
                  </div>
                  <span className="font-display text-xl text-ink-light">Inkspire</span>
                </div>
                <p className="text-ink-light/60 text-sm">
                  Bringing your tattoo ideas to life with skilled artists and innovative designs.
                </p>
              </div>
              
              <div>
                <h3 className="text-ink-light text-lg font-medium mb-4">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/designs" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                      Browse Designs
                    </Link>
                  </li>
                  <li>
                    <Link to="/artists" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                      Our Artists
                    </Link>
                  </li>
                  <li>
                    <Link to="/customize" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                      Customize Tattoo
                    </Link>
                  </li>
                  <li>
                    <Link to="/booking" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                      Book Appointment
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-ink-light text-lg font-medium mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-ink-light/60">
                    123 Ink Street, Tattoo City
                  </li>
                  <li className="text-ink-light/60">
                    info@inkspire.com
                  </li>
                  <li className="text-ink-light/60">
                    (555) 123-4567
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-ink-light text-lg font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-ink-light/60 hover:text-ink-accent transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-ink-accent/10 mt-8 pt-8 text-center text-ink-light/40 text-sm">
              &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
