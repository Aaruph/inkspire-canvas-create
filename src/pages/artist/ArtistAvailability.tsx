
import { useState } from 'react';
import ArtistLayout from '@/components/artist/ArtistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Plus, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ArtistAvailability = () => {
  const [availabilityData, setAvailabilityData] = useState({
    monday: { enabled: true, slots: ['09:00', '14:00', '16:00'] },
    tuesday: { enabled: true, slots: ['10:00', '15:00'] },
    wednesday: { enabled: false, slots: [] },
    thursday: { enabled: true, slots: ['09:00', '13:00', '17:00'] },
    friday: { enabled: true, slots: ['10:00', '14:00'] },
    saturday: { enabled: true, slots: ['11:00', '16:00'] },
    sunday: { enabled: false, slots: [] },
  });

  const [newSlot, setNewSlot] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const toggleDay = (day: string) => {
    setAvailabilityData(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        enabled: !prev[day as keyof typeof prev].enabled
      }
    }));
  };

  const addTimeSlot = (day: string, time: string) => {
    setAvailabilityData(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        slots: [...prev[day as keyof typeof prev].slots, time].sort()
      }
    }));
    toast.success(`Added ${time} to ${day}`);
  };

  const removeTimeSlot = (day: string, time: string) => {
    setAvailabilityData(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        slots: prev[day as keyof typeof prev].slots.filter(slot => slot !== time)
      }
    }));
    toast.success(`Removed ${time} from ${day}`);
  };

  const saveAvailability = () => {
    // In a real app, this would save to backend
    toast.success('Availability updated successfully!');
  };

  return (
    <ArtistLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Set Availability</h1>
          <p className="text-gray-400">
            Configure your available days and time slots for client bookings.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gray-900 border-white/20">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <p className="text-2xl font-bold text-white">
                  {Object.values(availabilityData).filter(day => day.enabled).length}
                </p>
                <p className="text-sm text-gray-400">Active Days</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-white/20">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p className="text-2xl font-bold text-white">
                  {Object.values(availabilityData).reduce((total, day) => total + day.slots.length, 0)}
                </p>
                <p className="text-sm text-gray-400">Total Slots</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-white/20">
              <CardContent className="p-4 text-center">
                <div className="h-8 w-8 mx-auto mb-2 bg-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">%</span>
                </div>
                <p className="text-2xl font-bold text-white">85%</p>
                <p className="text-sm text-gray-400">Booking Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Availability Configuration */}
          <Card className="bg-gray-900 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {daysOfWeek.map(({ key, label }) => (
                <div key={key} className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={availabilityData[key as keyof typeof availabilityData].enabled}
                        onCheckedChange={() => toggleDay(key)}
                      />
                      <h3 className="font-semibold text-white">{label}</h3>
                    </div>
                    <Badge variant={availabilityData[key as keyof typeof availabilityData].enabled ? "default" : "secondary"}>
                      {availabilityData[key as keyof typeof availabilityData].enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  {availabilityData[key as keyof typeof availabilityData].enabled && (
                    <div className="space-y-3">
                      {/* Current time slots */}
                      <div className="flex flex-wrap gap-2">
                        {availabilityData[key as keyof typeof availabilityData].slots.map((slot) => (
                          <div key={slot} className="flex items-center bg-white/10 rounded-lg px-3 py-1">
                            <span className="text-sm text-white mr-2">{slot}</span>
                            <button
                              onClick={() => removeTimeSlot(key, slot)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add new time slot */}
                      <div className="flex flex-wrap gap-2">
                        {timeSlots
                          .filter(time => !availabilityData[key as keyof typeof availabilityData].slots.includes(time))
                          .map((time) => (
                            <button
                              key={time}
                              onClick={() => addTimeSlot(key, time)}
                              className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded border border-white/20 transition-colors"
                            >
                              + {time}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <Button onClick={saveAvailability} className="bg-white text-black hover:bg-gray-200">
                  Save Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ArtistLayout>
  );
};

export default ArtistAvailability;
