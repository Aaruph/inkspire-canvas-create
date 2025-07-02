
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Calendar, 
  Upload, 
  Clock, 
  Star, 
  User, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';
import ThemeToggle from '@/components/ThemeToggle';

interface ArtistLayoutProps {
  children: React.ReactNode;
}

const ArtistLayout = ({ children }: ArtistLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/artist', icon: LayoutDashboard },
    { name: 'Bookings', href: '/artist/bookings', icon: Calendar },
    { name: 'Portfolio', href: '/artist/portfolio', icon: Upload },
    { name: 'Availability', href: '/artist/availability', icon: Clock },
    { name: 'Reviews', href: '/artist/reviews', icon: Star },
    { name: 'Profile', href: '/artist/profile', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/artist') {
      return location.pathname === '/artist';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-sidebar-border fixed top-0 left-0 right-0 z-40 bg-background shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-display text-primary-foreground text-sm">IS</span>
          </div>
          <span className="font-display text-xl text-foreground">Inkspire Artist</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-foreground"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Fixed Sidebar */}
        <div className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden shadow-lg`}>
          
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-display text-primary-foreground text-xl">IS</span>
                </div>
                <div>
                  <span className="font-display text-xl block text-sidebar-foreground">Inkspire</span>
                  <span className="text-sm text-muted-foreground">Artist Panel</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 font-medium group ${
                      isActive(item.href)
                        ? 'bg-sidebar-active text-sidebar-active-foreground shadow-sm'
                        : 'text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 transition-transform duration-200 ${
                      isActive(item.href) ? '' : 'group-hover:scale-110'
                    }`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="mb-4 p-2 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="font-medium text-sidebar-foreground truncate">{user?.name || user?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-64 pt-16 lg:pt-0 bg-background min-h-screen">
          {children}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ArtistLayout;
