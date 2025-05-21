
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 border-b border-ink-accent/20 bg-ink-dark/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="ink-container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-ink-accent to-ink-accent2 animate-pulse-glow flex items-center justify-center">
            <span className="font-display text-ink-dark text-xl">IS</span>
          </div>
          <span className="font-display text-2xl text-ink-light">Inkspire</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/designs" 
            className={({ isActive }) => 
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-ink-accent' : 'text-ink-light hover:text-ink-accent'} link-hover`
            }
          >
            Designs
          </NavLink>
          <NavLink 
            to="/artists" 
            className={({ isActive }) => 
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-ink-accent' : 'text-ink-light hover:text-ink-accent'} link-hover`
            }
          >
            Artists
          </NavLink>
          <NavLink 
            to="/customize" 
            className={({ isActive }) => 
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-ink-accent' : 'text-ink-light hover:text-ink-accent'} link-hover`
            }
          >
            Customize
          </NavLink>
          <Button 
            asChild
            className="bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20 transition-all duration-300"
          >
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-ink-light hover:text-ink-accent"
          onClick={toggleMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-ink-dark border-b border-ink-accent/20 shadow-lg animate-fade-in">
            <div className="flex flex-col p-4 space-y-4">
              <NavLink 
                to="/designs" 
                className={({ isActive }) => 
                  `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-ink-accent/10 text-ink-accent' : 'text-ink-light hover:bg-ink-accent/5 hover:text-ink-accent'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Designs
              </NavLink>
              <NavLink 
                to="/artists" 
                className={({ isActive }) => 
                  `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-ink-accent/10 text-ink-accent' : 'text-ink-light hover:bg-ink-accent/5 hover:text-ink-accent'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </NavLink>
              <NavLink 
                to="/customize" 
                className={({ isActive }) => 
                  `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-ink-accent/10 text-ink-accent' : 'text-ink-light hover:bg-ink-accent/5 hover:text-ink-accent'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Customize
              </NavLink>
              <Button 
                asChild
                className="w-full bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
