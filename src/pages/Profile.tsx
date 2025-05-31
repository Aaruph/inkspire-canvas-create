
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Mock bookings data
const mockBookings = [
  {
    id: 1,
    artistName: 'ALEX MORGAN',
    date: '2024-06-15',
    time: '2:00 PM',
    status: 'CONFIRMED',
    design: 'GEOMETRIC MANDALA',
    location: 'ARM',
  },
  {
    id: 2,
    artistName: 'SARAH CHEN',
    date: '2024-07-22',
    time: '10:00 AM',
    status: 'PENDING',
    design: 'FLORAL SLEEVE',
    location: 'FOREARM',
  },
  {
    id: 3,
    artistName: 'MIKE RODRIGUEZ',
    date: '2024-05-10',
    time: '4:00 PM',
    status: 'COMPLETED',
    design: 'TRIBAL DESIGN',
    location: 'SHOULDER',
  },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || user?.email?.split('@')[0] || '',
      email: user?.email || '',
      phone: '',
      bio: '',
    },
  });

  // Redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // In a real app, this would update the user profile via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('PROFILE UPDATED', {
        description: 'YOUR PROFILE HAS BEEN SUCCESSFULLY UPDATED.',
      });
      
      setIsEditing(false);
    } catch (error) {
      toast.error('UPDATE FAILED', {
        description: 'FAILED TO UPDATE PROFILE. PLEASE TRY AGAIN.',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-green-400';
      case 'PENDING':
        return 'text-yellow-400';
      case 'COMPLETED':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold uppercase mb-2">MY PROFILE</h1>
            <p className="text-gray-400">MANAGE YOUR ACCOUNT AND VIEW YOUR BOOKINGS</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-white/20">
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-white data-[state=active]:text-black uppercase font-bold"
              >
                PROFILE
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="data-[state=active]:bg-white data-[state=active]:text-black uppercase font-bold"
              >
                BOOKINGS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card className="bg-gray-900 border-white/20 text-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-2xl uppercase">PROFILE INFORMATION</CardTitle>
                      <CardDescription className="text-gray-400">
                        UPDATE YOUR PERSONAL DETAILS
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-black uppercase"
                    >
                      {isEditing ? 'CANCEL' : 'EDIT'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white uppercase font-bold">NAME</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isEditing}
                                className="bg-black border-white/30 text-white disabled:opacity-50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white uppercase font-bold">EMAIL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                disabled={!isEditing}
                                className="bg-black border-white/30 text-white disabled:opacity-50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white uppercase font-bold">PHONE</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isEditing}
                                placeholder="(555) 123-4567"
                                className="bg-black border-white/30 text-white disabled:opacity-50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white uppercase font-bold">BIO</FormLabel>
                            <FormControl>
                              <textarea
                                {...field}
                                disabled={!isEditing}
                                rows={4}
                                placeholder="TELL US ABOUT YOURSELF..."
                                className="w-full px-3 py-2 bg-black border border-white/30 text-white disabled:opacity-50 rounded-md resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {isEditing && (
                        <Button
                          type="submit"
                          className="bg-white text-black hover:bg-gray-200 uppercase font-bold"
                        >
                          SAVE CHANGES
                        </Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <Card className="bg-gray-900 border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl uppercase">MY BOOKINGS</CardTitle>
                  <CardDescription className="text-gray-400">
                    VIEW AND MANAGE YOUR TATTOO APPOINTMENTS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-white/20 rounded-lg p-4 bg-black"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold uppercase">{booking.design}</h3>
                            <p className="text-gray-400">ARTIST: {booking.artistName}</p>
                            <p className="text-gray-400">LOCATION: {booking.location}</p>
                            <p className="text-gray-400">
                              {booking.date} AT {booking.time}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-bold uppercase ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white hover:text-black uppercase"
                          >
                            VIEW DETAILS
                          </Button>
                          {booking.status === 'PENDING' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white uppercase"
                            >
                              CANCEL
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      onClick={() => navigate('/booking')}
                      className="bg-white text-black hover:bg-gray-200 uppercase font-bold"
                    >
                      BOOK NEW APPOINTMENT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
