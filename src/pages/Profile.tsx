import { useState, useRef, useEffect } from 'react';
import { User, Heart, Image, Star, MapPin, Calendar, Edit3, Settings, Camera, Award, Trophy, Zap, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RetroImage from '@/components/RetroImage';
import heroCollage from '@/assets/hero-collage.webp';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax background
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${y * 0.05}px) scale(1.1)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userProfile = {
    name: 'Alex Johnson',
    username: '@alexj2023',
    bio: 'Computer Science Graduate • Photography Enthusiast • Memory Collector 📸',
    location: 'Delhi, India',
    joinDate: 'August 2022',
    graduationYear: '2023',
    course: 'B.Tech Computer Science',
    avatar: polaroid1,
    stats: {
      photos: 156,
      likes: 2847,
      followers: 324,
      following: 198
    }
  };

  const achievements = [
    { 
      title: 'Photography Master', 
      description: 'Uploaded 100+ photos', 
      icon: Camera, 
      gradient: 'bg-gradient-sunset',
      earned: true
    },
    { 
      title: 'Social Butterfly', 
      description: 'Got 1000+ total likes', 
      icon: Heart, 
      gradient: 'bg-gradient-vintage',
      earned: true
    },
    { 
      title: 'Memory Keeper', 
      description: 'Active for 1+ year', 
      icon: Star, 
      gradient: 'bg-gradient-retro',
      earned: true
    },
    { 
      title: 'Trendsetter', 
      description: 'Top photo of the month', 
      icon: Trophy, 
      gradient: 'bg-gradient-sunset',
      earned: false
    }
  ];

  const recentPhotos = [
    {
      id: 1,
      image: polaroid1,
      title: 'Graduation Day',
      likes: 256,
      date: '2 days ago'
    },
    {
      id: 2,
      image: polaroid2,
      title: 'College Fest',
      likes: 189,
      date: '1 week ago'
    },
    {
      id: 3,
      image: polaroid3,
      title: 'Friends Forever',
      likes: 145,
      date: '2 weeks ago'
    },
    {
      id: 4,
      image: polaroid1,
      title: 'Sports Day',
      likes: 98,
      date: '3 weeks ago'
    }
  ];

  const favoriteMemories = [
    {
      id: 1,
      title: 'First Day Jitters',
      image: polaroid2,
      description: 'The nervous excitement of starting college',
      date: 'August 15, 2022'
    },
    {
      id: 2,
      title: 'Late Night Study Sessions',
      image: polaroid3,
      description: 'Coffee-fueled exam preparations with friends',
      date: 'December 10, 2022'
    },
    {
      id: 3,
      title: 'Farewell Emotions',
      image: polaroid1,
      description: 'Bittersweet goodbye to the best 4 years',
      date: 'May 30, 2023'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with parallax */}
      <div 
        ref={heroRef} 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${heroCollage})`,
          transform: 'translateZ(0) scale(1.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-white/8" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Profile Header */}
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="retro-card relative">
              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-retro">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-sunset p-3 rounded-full shadow-vintage">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 text-center sm:text-left space-y-4">
                  <div>
                    <h1 className="retro-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                      {userProfile.name}
                    </h1>
                    <p className="text-muted-foreground text-lg retro-handwritten">
                      {userProfile.username}
                    </p>
                    <p className="text-foreground/80 text-base mt-2">
                      {userProfile.bio}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center sm:justify-start space-x-8">
                    <div className="text-center">
                      <div className="retro-heading text-2xl font-bold text-foreground">{userProfile.stats.photos}</div>
                      <div className="text-sm text-muted-foreground">Photos</div>
                    </div>
                    <div className="text-center">
                      <div className="retro-heading text-2xl font-bold text-foreground">{userProfile.stats.likes}</div>
                      <div className="text-sm text-muted-foreground">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="retro-heading text-2xl font-bold text-foreground">{userProfile.stats.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="retro-heading text-2xl font-bold text-foreground">{userProfile.stats.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center sm:justify-start space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center sm:justify-start space-x-3">
                    <Button 
                      className="px-6 py-3 text-sm font-medium text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
                      style={{ background: 'var(--gradient-sunset)' }}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button 
                      variant="outline"
                      className="px-6 py-3 text-sm font-medium rounded-full border-2 border-primary/30 hover:border-primary/50 transition-all duration-300"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="max-w-6xl mx-auto mb-12 animate-fade-in delay-300">
            <h2 className="retro-heading text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              Achievements & Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={index}
                    className={`retro-card text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${!achievement.earned ? 'opacity-60' : 'hover:shadow-retro'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {!achievement.earned && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
                        <span className="text-white/80 text-sm font-medium">Not Earned</span>
                      </div>
                    )}
                    
                    <div className={`${achievement.gradient} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-vintage`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="retro-heading text-lg font-semibold text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {achievement.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Tabs */}
          <div className="max-w-6xl mx-auto animate-fade-in delay-500">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full p-1">
                <TabsTrigger 
                  value="photos" 
                  className="rounded-full py-3 px-6 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-sunset data-[state=active]:text-white"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Recent Photos
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites" 
                  className="rounded-full py-3 px-6 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-vintage data-[state=active]:text-white"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="rounded-full py-3 px-6 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-retro data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photos" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentPhotos.map((photo, index) => (
                    <div 
                      key={photo.id}
                      className="group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="retro-card hover:shadow-retro transition-all duration-300 hover:-translate-y-2">
                        <RetroImage 
                          src={photo.image} 
                          alt={photo.title} 
                          variant="polaroid" 
                          size="full" 
                          aspectRatio="square" 
                          rotation="random" 
                          className="mb-4" 
                        />
                        <div className="space-y-2">
                          <h3 className="retro-heading text-foreground font-semibold">{photo.title}</h3>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Heart className="h-4 w-4 text-sunset-orange" />
                              <span>{photo.likes}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">{photo.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {favoriteMemories.map((memory, index) => (
                    <div 
                      key={memory.id}
                      className="group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="retro-card hover:shadow-retro transition-all duration-300 hover:-translate-y-2">
                        <div className="flex space-x-4">
                          <RetroImage 
                            src={memory.image} 
                            alt={memory.title} 
                            variant="polaroid" 
                            size="sm" 
                            aspectRatio="square" 
                            rotation="slight" 
                            className="flex-shrink-0" 
                          />
                          <div className="space-y-3">
                            <div>
                              <h3 className="retro-heading text-lg font-semibold text-foreground mb-2">
                                {memory.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {memory.description}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{memory.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Academic Info */}
                  <div className="retro-card animate-fade-in">
                    <h3 className="retro-heading text-xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                      <Award className="h-5 w-5 text-vintage-teal" />
                      <span>Academic Journey</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Course</label>
                        <p className="text-foreground font-medium">{userProfile.course}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
                        <p className="text-foreground font-medium">{userProfile.graduationYear}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">College Experience</label>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          Four amazing years filled with learning, friendships, and unforgettable memories. 
                          From nervous freshman days to confident graduation moments.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Personal Interests */}
                  <div className="retro-card animate-fade-in delay-200">
                    <h3 className="retro-heading text-xl font-semibold text-foreground mb-6 flex items-center space-x-2">
                      <Star className="h-5 w-5 text-sunset-orange" />
                      <span>Interests & Hobbies</span>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {['Photography', 'Coding', 'Music', 'Sports', 'Travel', 'Art'].map((interest, index) => (
                          <span 
                            key={index}
                            className="px-3 py-2 bg-gradient-vintage text-white text-sm rounded-full shadow-sm font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Favorite Quote</label>
                        <p className="text-foreground/80 text-sm italic retro-handwritten mt-1">
                          "Collect moments, not things. Every photo tells a story worth remembering."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;