
import { useState } from 'react';
import ArtistLayout from '@/components/artist/ArtistLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter,
  Save,
  Edit
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

const ArtistProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Marcus Rivera',
    email: user?.email || 'marcus@inkspire.com',
    bio: 'Professional tattoo artist with 8+ years of experience specializing in realistic portraits, traditional designs, and custom artwork. Passionate about bringing your vision to life with precision and artistry.',
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    specialties: ['Realistic Portraits', 'Traditional', 'Black & Gray', 'Custom Designs'],
    experience: '8+ years',
    instagram: '@marcus_ink',
    facebook: 'MarcusInkArt',
    twitter: '@marcus_tattoos',
    profilePicture: '/placeholder.svg',
    portfolio: {
      totalDesigns: 156,
      categories: 8,
      featured: 12
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecialtyChange = (index: number, value: string) => {
    const newSpecialties = [...profileData.specialties];
    newSpecialties[index] = value;
    setProfileData(prev => ({
      ...prev,
      specialties: newSpecialties
    }));
  };

  const addSpecialty = () => {
    setProfileData(prev => ({
      ...prev,
      specialties: [...prev.specialties, '']
    }));
  };

  const removeSpecialty = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <ArtistLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Artist Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile information and portfolio details.
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="text-foreground border-border"
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center relative">
                  <User className="h-12 w-12 text-muted-foreground" />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                      <Camera className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-bold text-card-foreground mb-2">{profileData.name}</h2>
              <p className="text-muted-foreground mb-4">{profileData.email}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {profileData.location}
                </div>
                <div className="flex items-center justify-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {profileData.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Experience</p>
                <Badge className="bg-secondary text-secondary-foreground">
                  {profileData.experience}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-card-foreground">Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-card-foreground">Email</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-card-foreground">Phone</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-card-foreground">Location</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.location}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="text-card-foreground">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="bg-background border-border text-foreground mt-1"
                      rows={4}
                    />
                  ) : (
                    <p className="text-muted-foreground mt-1 leading-relaxed">{profileData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-3">
                    {profileData.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={specialty}
                          onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                          className="bg-background border-border text-foreground"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeSpecialty(index)}
                          className="text-destructive border-destructive hover:bg-destructive/10"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addSpecialty}
                      className="text-foreground border-border"
                    >
                      Add Specialty
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-foreground border-border">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-card-foreground flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.instagram}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-card-foreground flex items-center">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.facebook}
                        onChange={(e) => handleInputChange('facebook', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.facebook}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-card-foreground flex items-center">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        className="bg-background border-border text-foreground"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-1">{profileData.twitter}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleCancel} className="text-foreground border-border">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
};

export default ArtistProfile;
