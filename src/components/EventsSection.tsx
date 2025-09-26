import { Calendar, Clock, MapPin, Users, Upload, Eye, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

const upcomingEvents = [
  {
    id: 1,
    title: "Spring Fest 2024",
    date: "March 15-17",
    location: "Main Campus",
    attendees: 500,
    type: "Music Festival"
  },
  {
    id: 2,
    title: "Tech Symposium", 
    date: "April 5-6",
    location: "Tech Block",
    attendees: 200,
    type: "Conference"
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "April 20",
    location: "Auditorium",
    attendees: 300,
    type: "Cultural"
  }
];

const recentUploads = [
  { id: 1, title: "Farewell Party", count: 45, time: "2 hours ago", likes: 23, views: 156, uploader: "Sarah M." },
  { id: 2, title: "Sports Day", count: 78, time: "5 hours ago", likes: 45, views: 234, uploader: "Mike R." },
  { id: 3, title: "Debate Competition", count: 23, time: "1 day ago", likes: 12, views: 87, uploader: "Emma L." },
  { id: 4, title: "Art Exhibition", count: 56, time: "2 days ago", likes: 67, views: 289, uploader: "Alex K." }
];

const EventsSection = () => {
  const navigate = useNavigate();
  const [likedUploads, setLikedUploads] = useState<Set<number>>(new Set());
  
  const handleEventClick = (eventTitle: string) => {
    navigate("/events");
  };

  const handleViewCalendar = () => {
    navigate("/events");
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  const handleUploadClick = useCallback((uploadId: number) => {
    navigate(`/gallery?collection=${uploadId}`);
  }, [navigate]);

  const handleLikeUpload = useCallback((uploadId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedUploads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(uploadId)) {
        newSet.delete(uploadId);
      } else {
        newSet.add(uploadId);
      }
      return newSet;
    });
  }, []);

  const handleShareUpload = useCallback((uploadTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Check out ${uploadTitle}`,
        text: `Amazing photos from ${uploadTitle}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const handleViewAllUploads = () => {
    navigate("/gallery");
  };
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <div>
            <div className="mb-8">
              <div className="retro-handwritten text-vintage-teal text-xl mb-4">
                ~ What's Coming ~
              </div>
              <h2 className="retro-heading text-3xl md:text-4xl text-foreground mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Don't miss out on these amazing upcoming college events
              </p>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <Card 
                  key={event.id} 
                  onClick={() => handleEventClick(event.title)}
                  className="retro-card hover:shadow-retro transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {event.type}
                        </CardDescription>
                      </div>
                      <div className="bg-gradient-sunset p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Button 
                onClick={handleViewCalendar}
                className="btn-retro text-white font-medium"
                style={{
                  background: 'var(--gradient-retro)',
                  border: 'none'
                }}
              >
                📅 View Full Calendar
              </Button>
            </div>
          </div>

          {/* Recent Uploads */}
          <div>
            <div className="mb-8">
              <div className="retro-handwritten text-sunset-orange text-xl mb-4">
                ~ Fresh Captures ~
              </div>
              <h2 className="retro-heading text-3xl md:text-4xl text-foreground mb-4">
                Recent Uploads
              </h2>
              <p className="text-muted-foreground">
                Latest memories shared by your college community
              </p>
            </div>

            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div 
                  key={upload.id}
                  onClick={() => handleUploadClick(upload.id)}
                  className="retro-card hover:shadow-vintage transition-all duration-300 cursor-pointer group p-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleUploadClick(upload.id)}
                  aria-label={`View ${upload.title} photos`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-vintage p-3 rounded-full">
                        <Upload className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {upload.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {upload.count} photos • {upload.time}
                        </p>
                        <p className="text-xs text-muted-foreground/80">
                          by {upload.uploader}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{upload.views}</span>
                        </div>
                        <button
                          onClick={(e) => handleLikeUpload(upload.id, e)}
                          className={`flex items-center space-x-1 transition-colors hover:text-red-500 ${
                            likedUploads.has(upload.id) ? 'text-red-500' : ''
                          }`}
                          aria-label={`${likedUploads.has(upload.id) ? 'Unlike' : 'Like'} ${upload.title}`}
                        >
                          <Heart className={`h-3 w-3 ${likedUploads.has(upload.id) ? 'fill-current' : ''}`} />
                          <span>{upload.likes + (likedUploads.has(upload.id) ? 1 : 0)}</span>
                        </button>
                        <button
                          onClick={(e) => handleShareUpload(upload.title, e)}
                          className="flex items-center space-x-1 transition-colors hover:text-blue-500"
                          aria-label={`Share ${upload.title}`}
                        >
                          <Share2 className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-2xl group-hover:scale-110 transition-transform">
                        📸
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleViewAllUploads}
                variant="outline"
                className="w-full btn-retro border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Recent Uploads
              </Button>
            </div>

            {/* Quick Upload */}
            <Card className="retro-card mt-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors cursor-pointer group">
              <CardContent className="text-center py-8">
                <div className="bg-gradient-sunset p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Upload Your Memories</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Share your fest photos with the community
                </p>
                <Button 
                  size="sm"
                  onClick={handleUpload}
                  className="btn-retro text-white"
                  style={{
                    background: 'var(--gradient-sunset)',
                    border: 'none'
                  }}
                >
                  📤 Upload Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;