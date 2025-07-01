
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Customize from "./pages/Customize";
import Designs from "./pages/Designs";
import DesignDetails from "./pages/DesignDetails";
import Artists from "./pages/Artists";
import ArtistProfile from "./pages/ArtistProfile";
import Booking from "./pages/Booking";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import ArtistBookings from "./pages/artist/ArtistBookings";
import ArtistPortfolio from "./pages/artist/ArtistPortfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/designs" element={<Designs />} />
              <Route path="/designs/:id" element={<DesignDetails />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Artist Routes */}
              <Route path="/artist" element={<ArtistDashboard />} />
              <Route path="/artist/bookings" element={<ArtistBookings />} />
              <Route path="/artist/portfolio" element={<ArtistPortfolio />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
