
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
    <div className="min-h-screen bg-black text-white">
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/20 fixed top-0 left-0 right-0 z-40 bg-black">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="font-display text-black text-sm">IS</span>
          </div>
          <span className="font-display text-xl">Inkspire Artist</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className="flex">
        {/* Fixed Sidebar */}
        <div className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-white/20 flex flex-col overflow-hidden`}>
          
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="font-display text-black text-xl">IS</span>
              </div>
              <div>
                <span className="font-display text-xl block">Inkspire</span>
                <span className="text-sm text-gray-400">Artist Panel</span>
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
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-white text-black'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-white/20">
            <div className="mb-4">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="font-medium">{user?.name || user?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-64 pt-16 lg:pt-0">
          {children}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ArtistLayout;
