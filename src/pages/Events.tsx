import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Filter, Search, Plus, User, Mail, Phone, X, Camera, Heart, Share2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const allEvents = [
  {
    id: 1,
    title: "Spring Fest 2024",
    date: "March 15-17, 2024",
    time: "10:00 AM - 11:00 PM",
    location: "Main Campus Ground",
    attendees: 500,
    type: "Music Festival",
    status: "upcoming",
    description: "The biggest musical extravaganza of the year featuring top artists and bands.",
    tags: ["music", "outdoor", "festival"],
    organizer: "Cultural Committee"
  },
  {
    id: 2,
    title: "Tech Symposium 2024", 
    date: "April 5-6, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Technology Block Auditorium",
    attendees: 200,
    type: "Conference",
    status: "upcoming",
    description: "Explore the latest in technology with industry experts and innovators.",
    tags: ["technology", "indoor", "conference"],
    organizer: "Tech Club"
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "April 20, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Main Auditorium",
    attendees: 300,
    type: "Cultural",
    status: "upcoming",
    description: "A night celebrating diverse cultures with performances, food, and art.",
    tags: ["culture", "performance", "indoor"],
    organizer: "Cultural Society"
  },
  {
    id: 4,
    title: "Sports Championship",
    date: "May 10-12, 2024",
    time: "8:00 AM - 8:00 PM",
    location: "Sports Complex",
    attendees: 400,
    type: "Sports",
    status: "upcoming",
    description: "Annual inter-college sports championship with multiple events.",
    tags: ["sports", "outdoor", "competition"],
    organizer: "Sports Committee"
  },
  {
    id: 5,
    title: "Farewell Party 2024",
    date: "February 28, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "College Lawn",
    attendees: 250,
    type: "Social",
    status: "completed",
    description: "A memorable evening bidding farewell to our graduating seniors.",
    tags: ["farewell", "social", "outdoor"],
    organizer: "Student Council"
  },
  {
    id: 6,
    title: "Art Exhibition",
    date: "February 15, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Art Gallery",
    attendees: 150,
    type: "Exhibition",
    status: "completed",
    description: "Showcasing creative works by our talented students.",
    tags: ["art", "exhibition", "indoor"],
    organizer: "Art Club"
  }
];

const eventMemories = {
  5: [ // Farewell Party 2024
    {
      id: 1,
      url: "/api/placeholder/400/300",
      caption: "Final group photo with the graduating class",
      uploader: "Sarah M.",
      likes: 45,
      timestamp: "2024-02-28T20:30:00Z"
    },
    {
      id: 2,
      url: "/api/placeholder/400/300", 
      caption: "Emotional speeches and heartfelt moments",
      uploader: "Mike R.",
      likes: 32,
      timestamp: "2024-02-28T19:45:00Z"
    },
    {
      id: 3,
      url: "/api/placeholder/400/300",
      caption: "Dance floor was on fire! 🔥",
      uploader: "Emma L.",
      likes: 28,
      timestamp: "2024-02-28T21:15:00Z"
    },
    {
      id: 4,
      url: "/api/placeholder/400/300",
      caption: "Memory wall with everyone's signatures",
      uploader: "Alex K.",
      likes: 56,
      timestamp: "2024-02-28T18:30:00Z"
    }
  ],
  6: [ // Art Exhibition
    {
      id: 5,
      url: "/api/placeholder/400/300",
      caption: "Beautiful painting showcase by students",
      uploader: "Lisa P.",
      likes: 23,
      timestamp: "2024-02-15T14:20:00Z"
    },
    {
      id: 6,
      url: "/api/placeholder/400/300",
      caption: "Sculpture section was absolutely stunning",
      uploader: "David T.",
      likes: 19,
      timestamp: "2024-02-15T15:45:00Z"
    },
    {
      id: 7,
      url: "/api/placeholder/400/300",
      caption: "Digital art corner with interactive displays",
      uploader: "Maya J.",
      likes: 34,
      timestamp: "2024-02-15T16:10:00Z"
    }
  ]
};

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(allEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [registrationModal, setRegistrationModal] = useState(false);
  const [memoriesModal, setMemoriesModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set());
  const [likedMemories, setLikedMemories] = useState<Set<number>>(new Set());
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    department: "",
    specialRequirements: ""
  });

  // Filter events based on search and filters - optimized with useMemo
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = filterType === "all" || event.type.toLowerCase() === filterType.toLowerCase();
      const matchesStatus = filterStatus === "all" || event.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, searchQuery, filterType, filterStatus]);

  const handleEventClick = (event: any) => {
    toast({
      title: `${event.title} 🎉`,
      description: event.description,
    });
  };

  const handleRegister = (event: any) => {
    setSelectedEvent(event);
    setRegistrationModal(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationForm.name || !registrationForm.email) {
      toast({
        title: "Missing Information ❌",
        description: "Please fill in all required fields (Name and Email).",
        variant: "destructive"
      });
      return;
    }

    // Add to registered events
    setRegisteredEvents(prev => new Set([...prev, selectedEvent.id]));
    
    // Close modal and reset form
    setRegistrationModal(false);
    setRegistrationForm({
      name: "",
      email: "",
      phone: "",
      year: "",
      department: "",
      specialRequirements: ""
    });

    toast({
      title: "Registration Successful! ✅",
      description: `You've been registered for ${selectedEvent.title}. Check your email for confirmation.`,
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setRegistrationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewMemories = (event: any) => {
    setSelectedEvent(event);
    setMemoriesModal(true);
  };

  const handleLikeMemory = (memoryId: number) => {
    setLikedMemories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(memoryId)) {
        newSet.delete(memoryId);
      } else {
        newSet.add(memoryId);
      }
      return newSet;
    });
  };

  const handleShareMemory = (memory: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Memory from ${selectedEvent?.title}`,
        text: memory.caption,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied! 🔗",
        description: "Memory link copied to clipboard",
      });
    }
  };

  const handleViewAllMemories = () => {
    navigate("/gallery");
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: "default",
      completed: "secondary",
      ongoing: "destructive"
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      "Music Festival": "bg-gradient-sunset text-white",
      "Conference": "bg-gradient-retro text-white", 
      "Cultural": "bg-gradient-vintage text-white",
      "Sports": "bg-gradient-warm text-white",
      "Social": "bg-primary text-white",
      "Exhibition": "bg-secondary text-white"
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || "bg-muted text-foreground"}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-warm py-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-8">
          <div className="retro-handwritten text-vintage-teal text-xl mb-4">
            ~ College Events Hub ~
          </div>
          <h1 className="text-4xl md:text-5xl font-bold retro-heading text-foreground mb-4">
            Events Calendar
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover, register, and never miss out on amazing college events and activities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto">
          <Card className="retro-card border-2 mb-8">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events, tags, or descriptions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 retro-input"
                    />
                  </div>
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="retro-input">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="music festival">Music Festival</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="exhibition">Exhibition</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="retro-input">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredEvents.length} of {events.length} events
            </p>
            <Button 
              className="btn-retro text-white font-medium"
              style={{
                background: 'var(--gradient-sunset)',
                border: 'none'
              }}
              onClick={() => toast({
                title: "Create Event 📅",
                description: "Event creation feature coming soon! Contact admin to add your event.",
              })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredEvents.map((event, index) => (
              <Card 
                key={event.id}
                className="retro-card hover:shadow-retro transition-all duration-300 cursor-pointer group border-2 animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleEventClick(event)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(event.status)}
                        {getTypeBadge(event.type)}
                      </div>
                    </div>
                    <div className="bg-gradient-sunset p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Organizer */}
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Organized by <span className="font-medium text-foreground">{event.organizer}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    {event.status === "upcoming" ? (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event);
                        }}
                        className={`flex-1 btn-retro text-white font-medium ${
                          registeredEvents.has(event.id) ? 'opacity-75' : ''
                        }`}
                        style={{
                          background: registeredEvents.has(event.id) 
                            ? 'var(--gradient-vintage)' 
                            : 'var(--gradient-retro)',
                          border: 'none'
                        }}
                        disabled={registeredEvents.has(event.id)}
                      >
                        {registeredEvents.has(event.id) ? '✅ Registered' : '🎟️ Register Now'}
                      </Button>
                    ) : (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMemories(event);
                        }}
                        variant="outline"
                        className="flex-1 animate-fade-in"
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        📸 View Memories
                      </Button>
                    )}
                    
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (navigator.share) {
                          navigator.share({
                            title: event.title,
                            text: event.description,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "Link Copied! 🔗",
                            description: "Event link copied to clipboard",
                          });
                        }
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredEvents.length === 0 && (
            <Card className="retro-card text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Events Found</h3>
                <p className="text-muted-foreground">
                  No events match your current search criteria. Try adjusting your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <Button variant="outline" size="lg">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog open={registrationModal} onOpenChange={setRegistrationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Register for Event</span>
            </DialogTitle>
            <DialogDescription>
              {selectedEvent && (
                <>Complete your registration for <strong>{selectedEvent.title}</strong></>
              )}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={registrationForm.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  placeholder="your.email@college.edu"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={registrationForm.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-sm font-medium">
                  Year of Study
                </Label>
                <Select value={registrationForm.year} onValueChange={(value) => handleFormChange("year", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="department" className="text-sm font-medium">
                Department
              </Label>
              <Input
                id="department"
                value={registrationForm.department}
                onChange={(e) => handleFormChange("department", e.target.value)}
                placeholder="e.g., Computer Science, Business, etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="requirements" className="text-sm font-medium">
                Special Requirements
              </Label>
              <Textarea
                id="requirements"
                value={registrationForm.specialRequirements}
                onChange={(e) => handleFormChange("specialRequirements", e.target.value)}
                placeholder="Any dietary restrictions, accessibility needs, etc."
                className="mt-1 min-h-[80px]"
                rows={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRegistrationModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-retro text-white font-medium"
                style={{
                  background: 'var(--gradient-retro)',
                  border: 'none'
                }}
              >
                Complete Registration
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Memories Modal */}
      <Dialog open={memoriesModal} onOpenChange={setMemoriesModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-primary" />
              <span>Event Memories</span>
            </DialogTitle>
            <DialogDescription>
              {selectedEvent && (
                <>Beautiful moments captured from <strong>{selectedEvent.title}</strong></>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[70vh] pr-2">
            {selectedEvent && eventMemories[selectedEvent.id as keyof typeof eventMemories] ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventMemories[selectedEvent.id as keyof typeof eventMemories].map((memory, index) => (
                  <Card 
                    key={memory.id} 
                    className="retro-card overflow-hidden group hover:shadow-vintage transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={memory.url}
                        alt={memory.caption}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
                        <button
                          onClick={() => handleLikeMemory(memory.id)}
                          className={`transition-colors ${
                            likedMemories.has(memory.id) ? 'text-red-500' : 'text-white hover:text-red-400'
                          }`}
                          aria-label={`${likedMemories.has(memory.id) ? 'Unlike' : 'Like'} memory`}
                        >
                          <Heart className={`h-4 w-4 ${likedMemories.has(memory.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-foreground mb-2">
                        {memory.caption}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span>by {memory.uploader}</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{memory.likes + (likedMemories.has(memory.id) ? 1 : 0)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleShareMemory(memory)}
                          className="flex items-center space-x-1 hover:text-primary transition-colors"
                          aria-label="Share memory"
                        >
                          <Share2 className="h-3 w-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Memories Yet</h3>
                <p className="text-muted-foreground mb-4">
                  This event doesn't have any memories uploaded yet.
                </p>
                <Button
                  onClick={() => navigate("/upload")}
                  className="btn-retro text-white"
                  style={{
                    background: 'var(--gradient-sunset)',
                    border: 'none'
                  }}
                >
                  Upload Memories
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleViewAllMemories}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>View All Gallery</span>
            </Button>
            <Button
              onClick={() => setMemoriesModal(false)}
              className="btn-retro text-white"
              style={{
                background: 'var(--gradient-retro)',
                border: 'none'
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;