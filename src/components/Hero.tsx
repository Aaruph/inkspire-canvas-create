
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-accent/10 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#9b87f510,_transparent_70%)]"></div>
      
      <div className="ink-container py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display leading-tight">
              <span className="block text-ink-light">Your Body.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ink-accent via-ink-accent2 to-ink-accent3">Your Canvas.</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-light/80 max-w-md">
              Discover unique tattoo designs, customize your perfect ink, and book your session with top artists in your area.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20 transition-all duration-300"
              >
                <Link to="/customize">Customize Design</Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
              >
                <Link to="/designs">Browse Gallery</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto">
            <div className="w-full h-[400px] rounded-lg bg-gradient-to-tr from-ink-accent/20 via-ink-accent2/20 to-ink-accent3/20 shadow-xl flex items-center justify-center overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-ink-accent/30 filter blur-3xl"></div>
              <div className="absolute bottom-[-30px] left-[-30px] w-[150px] h-[150px] rounded-full bg-ink-accent2/30 filter blur-3xl"></div>
              
              {/* Placeholder for tattoo image - in a real app, we'd use an actual image */}
              <div className="relative z-10 max-w-[80%] p-8">
                <div className="w-full h-[250px] border-2 border-dashed border-ink-accent/50 rounded-lg flex items-center justify-center">
                  <span className="text-ink-accent/70 text-lg">Featured Tattoo Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
