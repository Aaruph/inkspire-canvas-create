import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Palette, FileText, Calendar, TrendingUp, DollarSign } from "lucide-react";

const statsData = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Active Artists",
    value: "89",
    change: "+5%",
    icon: Palette,
    trend: "up"
  },
  {
    title: "Total Designs",
    value: "2,456",
    change: "+18%",
    icon: FileText,
    trend: "up"
  },
  {
    title: "Bookings This Month",
    value: "345",
    change: "+23%",
    icon: Calendar,
    trend: "up"
  },
  {
    title: "Revenue",
    value: "$12,450",
    change: "+15%",
    icon: DollarSign,
    trend: "up"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.5%",
    icon: TrendingUp,
    trend: "up"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the InkSpire admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New artist application</p>
                  <p className="text-xs text-muted-foreground">Sarah Chen - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Design reported</p>
                  <p className="text-xs text-muted-foreground">Tribal design #234 - 15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Booking completed</p>
                  <p className="text-xs text-muted-foreground">Mike Johnson - 1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Artist Applications</p>
                  <p className="text-xs text-muted-foreground">5 pending review</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Design Reports</p>
                  <p className="text-xs text-muted-foreground">3 awaiting moderation</p>
                </div>
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">User Reports</p>
                  <p className="text-xs text-muted-foreground">2 need attention</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}