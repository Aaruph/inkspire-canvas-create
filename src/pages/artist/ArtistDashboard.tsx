
import { useAuth } from '@/hooks/useAuth';
import ArtistLayout from '@/components/artist/ArtistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Star, TrendingUp, Users } from 'lucide-react';

const ArtistDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Upcoming Bookings',
      value: '3',
      description: 'Next 7 days',
      icon: Calendar,
      color: 'text-blue-400',
    },
    {
      title: 'Total Bookings',
      value: '24',
      description: 'This month',
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      title: 'Average Rating',
      value: '4.8',
      description: 'From 15 reviews',
      icon: Star,
      color: 'text-yellow-400',
    },
    {
      title: 'Active Clients',
      value: '18',
      description: 'Regular customers',
      icon: Users,
      color: 'text-purple-400',
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      date: '2024-07-02',
      time: '2:00 PM',
      design: 'Floral Sleeve',
      status: 'confirmed',
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      date: '2024-07-03',
      time: '10:00 AM',
      design: 'Geometric Pattern',
      status: 'pending',
    },
    {
      id: 3,
      clientName: 'Emma Davis',
      date: '2024-07-04',
      time: '4:00 PM',
      design: 'Custom Portrait',
      status: 'confirmed',
    },
  ];

  return (
    <ArtistLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'Artist'}!
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your bookings today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-gray-900 border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <Card className="bg-gray-900 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{booking.clientName}</h3>
                    <p className="text-sm text-gray-400">{booking.design}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{booking.date}</p>
                    <p className="text-sm text-gray-400">{booking.time}</p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ArtistLayout>
  );
};

export default ArtistDashboard;
