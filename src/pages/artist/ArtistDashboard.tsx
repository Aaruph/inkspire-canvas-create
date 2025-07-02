
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
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Welcome back, {user?.name || 'Artist'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your bookings today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted/70 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{booking.clientName}</h3>
                    <p className="text-sm text-muted-foreground">{booking.design}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{booking.date}</p>
                    <p className="text-sm text-muted-foreground">{booking.time}</p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
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
