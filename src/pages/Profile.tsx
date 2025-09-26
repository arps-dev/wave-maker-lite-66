import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, Phone, MapPin, Calendar, Trophy, Star, Heart, Upload, Edit, Settings, LogOut, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    display_name: "",
    bio: "",
    avatar_url: ""
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Update local profile data when profile changes
  useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username || "",
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || ""
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const { error } = await updateProfile(profileData);
      
      if (error) {
        toast({
          title: "Update Failed",
          description: error.message || "Failed to update profile.",
          variant: "destructive"
        });
        return;
      }

      setIsEditing(false);
      toast({
        title: "Profile Updated! ✨",
        description: "Your profile changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        toast({
          title: "Logout Failed",
          description: error.message || "Failed to log out.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Logged out successfully! 👋",
        description: "See you next time!",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const achievements = [
    { id: 1, name: "First Upload", icon: Upload, count: profile.total_uploads >= 1 },
    { id: 2, name: "Photo Enthusiast", icon: Camera, count: profile.total_uploads >= 10 },
    { id: 3, name: "Popular Creator", icon: Heart, count: profile.total_likes_received >= 100 },
    { id: 4, name: "Community Member", icon: Star, count: profile.total_likes_received >= 50 }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
          <div className="flex space-x-2">
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="retro-card border-2 mb-8">
          <CardContent className="pt-8">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-32 w-32 border-4 border-white shadow-retro">
                  <AvatarImage src={profileData.avatar_url || undefined} alt="Profile" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-sunset text-white">
                    {(profileData.display_name || profileData.username || user.email || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="retro-heading text-3xl text-foreground mb-2">
                    {profileData.display_name || profileData.username || 'User'}
                  </h1>
                  <p className="text-muted-foreground text-lg mb-1">
                    @{profileData.username || 'user'}
                  </p>
                  <p className="text-muted-foreground flex items-center justify-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </p>
                </div>

                <div className="retro-handwritten text-center text-muted-foreground text-lg leading-relaxed max-w-md">
                  {profileData.bio || "No bio added yet. Tell us about yourself!"}
                </div>

                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-retro text-white font-medium"
                    style={{
                      background: 'var(--gradient-sunset)',
                      border: 'none'
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="retro-card text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Upload className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold retro-heading">{profile.total_uploads}</span>
                    </div>
                    <p className="text-muted-foreground">Photos Uploaded</p>
                  </CardContent>
                </Card>
                
                <Card className="retro-card text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-2xl font-bold retro-heading">{profile.total_likes_received}</span>
                    </div>
                    <p className="text-muted-foreground">Total Likes</p>
                  </CardContent>
                </Card>
                
                <Card className="retro-card text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold retro-heading">{profile.achievements.length}</span>
                    </div>
                    <p className="text-muted-foreground">Achievements</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card className="retro-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    <Input
                      id="display_name"
                      value={profileData.display_name}
                      onChange={(e) => handleInputChange("display_name", e.target.value)}
                      disabled={!isEditing}
                      className="retro-input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      disabled={!isEditing}
                      className="retro-input"
                      placeholder="@username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email || ""}
                      disabled={true}
                      className="retro-input bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed from here</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatar_url">Avatar URL</Label>
                    <Input
                      id="avatar_url"
                      value={profileData.avatar_url}
                      onChange={(e) => handleInputChange("avatar_url", e.target.value)}
                      disabled={!isEditing}
                      className="retro-input"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      className="retro-input min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 pt-4">
                      <Button 
                        onClick={handleSave}
                        className="btn-retro text-white font-medium"
                        style={{
                          background: 'var(--gradient-vintage)',
                          border: 'none'
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button 
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-6">
            <Card className="retro-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Your Achievements</span>
                </CardTitle>
                <CardDescription>
                  Track your progress and unlock new badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 flex items-center space-x-4 ${
                          achievement.count 
                            ? 'border-green-300 bg-green-50 dark:bg-green-950/20' 
                            : 'border-border bg-muted/50'
                        }`}
                      >
                        <div className={`p-3 rounded-full ${
                          achievement.count ? 'bg-green-500' : 'bg-muted'
                        }`}>
                          <IconComponent className={`h-6 w-6 ${
                            achievement.count ? 'text-white' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{achievement.name}</h3>
                          <Badge variant={achievement.count ? "default" : "secondary"}>
                            {achievement.count ? "Earned" : "Not Earned"}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;