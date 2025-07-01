
import { useState } from 'react';
import ArtistLayout from '@/components/artist/ArtistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, User, Calendar, MapPin } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ArtistBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.j@email.com',
      date: '2024-07-02',
      time: '2:00 PM',
      design: 'Floral Sleeve',
      location: 'Forearm',
      status: 'pending',
      notes: 'Looking for a colorful floral design with roses and peonies',
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      clientEmail: 'mike.chen@email.com',
      date: '2024-07-03',
      time: '10:00 AM',
      design: 'Geometric Pattern',
      location: 'Upper Back',
      status: 'confirmed',
      notes: 'Interested in black and grey geometric mandala',
    },
    {
      id: 3,
      clientName: 'Emma Davis',
      clientEmail: 'emma.davis@email.com',
      date: '2024-07-04',
      time: '4:00 PM',
      design: 'Custom Portrait',
      location: 'Shoulder',
      status: 'pending',
      notes: 'Portrait of beloved pet, realistic style preferred',
    },
    {
      id: 4,
      clientName: 'James Wilson',
      clientEmail: 'j.wilson@email.com',
      date: '2024-06-28',
      time: '1:00 PM',
      design: 'Tribal Design',
      location: 'Calf',
      status: 'completed',
      notes: 'Traditional Polynesian tribal pattern',
    },
  ]);

  const handleStatusChange = (bookingId: number, newStatus: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      )
    );
    
    const action = newStatus === 'confirmed' ? 'accepted' : 'rejected';
    toast.success(`Booking ${action}`, {
      description: `The appointment has been ${action}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <ArtistLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Bookings</h1>
          <p className="text-gray-400">
            Manage your appointment requests and confirmed bookings.
          </p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="bg-gray-900 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{booking.clientName}</span>
                  </CardTitle>
                  <Badge className={getStatusColor(booking.status)}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1">{booking.status.toUpperCase()}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.design} on {booking.location}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      <strong>Email:</strong> {booking.clientEmail}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-medium mb-1">Client Notes:</h4>
                      <p className="text-gray-400 text-sm">{booking.notes}</p>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(booking.id, 'rejected')}
                          className="border-red-500 text-red-400 hover:bg-red-500/10"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ArtistLayout>
  );
};

export default ArtistBookings;
