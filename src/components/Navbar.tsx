
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="py-4 border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="ink-container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/80 animate-pulse-glow flex items-center justify-center">
            <span className="font-display text-primary-foreground text-xl">IS</span>
          </div>
          <span className="font-display text-2xl text-foreground">Inkspire</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/designs" 
            className={({ isActive }) => 
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'} link-hover`
            }
          >
            Designs
          </NavLink>
          <NavLink 
            to="/artists" 
            className={({ isActive }) => 
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'} link-hover`
            }
          >
            Artists
          </NavLink>
          <NavLink 
            to="/customize" 
            className={({ isActive }) => 
              `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'} link-hover`
            }
          >
            Customize
          </NavLink>
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border hover:border-primary">
                  <User className="h-5 w-5 mr-2" />
                  {user?.name || user?.email.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/booking")}>
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:text-primary"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in">
            <div className="flex flex-col p-4 space-y-4">
              <NavLink 
                to="/designs" 
                className={({ isActive }) => 
                  `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Designs
              </NavLink>
              <NavLink 
                to="/artists" 
                className={({ isActive }) => 
                  `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </NavLink>
              <NavLink 
                to="/customize" 
                className={({ isActive }) => 
                  `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Customize
              </NavLink>

              {isAuthenticated ? (
                <>
                  <div className="border-t border-border pt-4">
                    <p className="px-4 text-sm text-muted-foreground">Signed in as {user?.name || user?.email}</p>
                  </div>
                  <NavLink 
                    to="/profile" 
                    className={({ isActive }) => 
                      `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <NavLink 
                    to="/booking" 
                    className={({ isActive }) => 
                      `text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200 ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50 hover:text-accent-foreground'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  asChild
                  className="w-full bg-primary text-primary-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/auth">Login / Sign Up</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
