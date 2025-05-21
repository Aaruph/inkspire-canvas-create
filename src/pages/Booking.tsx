
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Placeholder artist data
const artists = [
  {
    id: "1",
    name: "Alex Thompson",
    specialty: ["Geometric", "Blackwork", "Fine Line"],
  },
  {
    id: "2",
    name: "Jordan Lee",
    specialty: ["Japanese", "Traditional", "Color"],
  },
  {
    id: "3",
    name: "Morgan Chen",
    specialty: ["Watercolor", "Minimalist", "Abstract"],
  },
  {
    id: "4",
    name: "Taylor Reyes", 
    specialty: ["Realism", "Portrait", "Black & Gray"],
  },
  {
    id: "5",
    name: "Riley Johnson",
    specialty: ["Neo-Traditional", "Color", "Animal"],
  },
  {
    id: "6",
    name: "Cameron Park",
    specialty: ["Tribal", "Polynesian", "Ornamental"],
  },
];

// Placeholder time slots
const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const artistIdFromUrl = searchParams.get('artist');
  
  const [selectedArtist, setSelectedArtist] = useState(artistIdFromUrl || '');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedArtist || !selectedDate || !selectedTime) {
      toast.error("Please select an artist, date, and time");
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would submit the booking to a backend
    toast.success("Your appointment has been booked!");
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      description: '',
    });
  };

  const isFormComplete = () => {
    return (
      selectedArtist && 
      selectedDate && 
      selectedTime && 
      formData.name && 
      formData.email && 
      formData.phone
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-ink-dark">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-ink-accent/10 to-transparent py-12">
          <div className="ink-container">
            <h1 className="text-4xl md:text-5xl font-display text-ink-light mb-4">Book Your Appointment</h1>
            <p className="text-ink-light/70 max-w-3xl">
              Schedule a session with one of our talented artists to bring your tattoo vision to life.
            </p>
          </div>
        </div>
        
        <div className="ink-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Booking Form */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-2xl font-display text-ink-light mb-6">Appointment Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Artist Selection */}
                <div>
                  <label className="block text-ink-light mb-2">Select Artist*</label>
                  <select 
                    className="w-full bg-card border border-ink-accent/30 rounded-md p-2 text-ink-light focus:ring-ink-accent focus:border-ink-accent"
                    value={selectedArtist}
                    onChange={(e) => setSelectedArtist(e.target.value)}
                    required
                  >
                    <option value="">Choose an artist</option>
                    {artists.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name} - {artist.specialty.join(', ')}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Date Selection */}
                <div>
                  <label className="block text-ink-light mb-2">Select Date*</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left border-ink-accent/30 bg-card text-ink-light hover:bg-ink-accent/10",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-ink-accent/30">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable past dates and Sundays
                          return (
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            date.getDay() === 0
                          );
                        }}
                        className="bg-card text-ink-light"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Time Selection */}
                <div>
                  <label className="block text-ink-light mb-2">Select Time*</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={
                          selectedTime === time
                            ? "bg-ink-accent text-ink-dark hover:bg-ink-accent/90"
                            : "border-ink-accent/30 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                        }
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-ink-light">Contact Information</h3>
                  
                  <div>
                    <label className="block text-ink-light mb-2">Full Name*</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-card border-ink-accent/30 text-ink-light focus-visible:ring-ink-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-ink-light mb-2">Email*</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-card border-ink-accent/30 text-ink-light focus-visible:ring-ink-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-ink-light mb-2">Phone Number*</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-card border-ink-accent/30 text-ink-light focus-visible:ring-ink-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-ink-light mb-2">Tattoo Description (Optional)</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="bg-card border-ink-accent/30 text-ink-light focus-visible:ring-ink-accent min-h-[100px]"
                      placeholder="Describe your tattoo idea, size, placement, etc."
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20 transition-all duration-300"
                  disabled={!isFormComplete()}
                >
                  Book Appointment
                </Button>
              </form>
            </div>
            
            {/* Right side - Info and Guidelines */}
            <div>
              <div className="p-6 bg-card rounded-lg border border-border mb-6">
                <h2 className="text-2xl font-display text-ink-light mb-4">Booking Information</h2>
                
                <div className="space-y-4 text-ink-light/80">
                  <p>
                    Please arrive 15 minutes before your scheduled appointment time.
                    A valid ID is required for all tattoo services.
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-medium text-ink-light mb-2">Deposits & Cancellations</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>A non-refundable deposit of $50 is required to secure your appointment.</li>
                      <li>Cancellations with less than 48 hours notice will forfeit the deposit.</li>
                      <li>Rescheduling can be done up to 72 hours before your appointment.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-ink-light mb-2">Preparation</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Get a good night's sleep before your appointment.</li>
                      <li>Eat a meal 1-2 hours before your session.</li>
                      <li>Stay hydrated but avoid alcohol for 24 hours before.</li>
                      <li>Wear comfortable clothing that provides easy access to the tattoo area.</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-ink-accent/20 to-ink-accent2/10 rounded-lg border border-ink-accent/30">
                <h3 className="text-xl font-medium text-ink-light mb-3">Bring Your Design</h3>
                <p className="text-ink-light/80 mb-4">
                  Have you created a custom tattoo in our design studio? Bring your design ID or save it to your profile for easy access during your appointment.
                </p>
                <Button 
                  variant="outline" 
                  className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
                  onClick={() => window.location.href = '/customize'}
                >
                  Create a Design
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
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

export default Booking;
