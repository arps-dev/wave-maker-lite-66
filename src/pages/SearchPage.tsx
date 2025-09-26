import { useState, useRef, useEffect, useCallback } from 'react';
// Fixed Timeline import issue - using Clock instead
import { Search, Filter, Grid, List, Heart, MapPin, Calendar, Clock, User, Star, ArrowUp, Eye, Bookmark, Share2, Sparkles, Tag, SortAsc, TrendingUp, X, Users, Mic, MicOff, Download, BarChart3, History, Sliders, Map, Settings, RefreshCw, Globe, Zap, Target, Layers, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RetroImage from '@/components/RetroImage';
import heroCollage from '@/assets/hero-collage.webp';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [likedResults, setLikedResults] = useState<Set<number>>(new Set([1, 3]));
  const [bookmarkedResults, setBookmarkedResults] = useState<Set<number>>(new Set([2]));
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['Tech Fest', 'Graduation', 'Cultural Night', 'Alumni Meet', 'Sports Day']);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateRange, setDateRange] = useState([2020, 2024]);
  const [minLikes, setMinLikes] = useState([0]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [searchAnalytics, setSearchAnalytics] = useState({
    totalSearches: 127,
    avgResults: 8.3,
    popularTerm: 'Graduation'
  });
  const [recentSearches, setRecentSearches] = useState<string[]>(['Tech Symposium', 'Dance Competition', 'Final Year']);
  const [trendingSearches, setTrendingSearches] = useState(['Cultural Fest 2024', 'Placement Drive', 'Sports Tournament']);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchWithinResults, setSearchWithinResults] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [searchProgress, setSearchProgress] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    toast
  } = useToast();

  // Enhanced search suggestions with AI-powered recommendations
  const searchSuggestions = ['College Fest 2023', 'Graduation Ceremony', 'Tech Symposium', 'Cultural Night', 'Sports Day', 'Freshers Party', 'Alumni Meet', 'Dance Competition', 'Annual Day', 'Farewell Party', 'Hackathon 2023', 'Library Study Sessions', 'Canteen Memories', 'Lab Experiments', 'Group Projects', 'Campus Tours', 'Guest Lectures', 'Workshop Series', 'Talent Show', 'Debate Competition'];

  // Advanced filter options
  const locations = ['all', 'Main Campus', 'Library', 'Sports Complex', 'Auditorium', 'Cafeteria', 'Hostel', 'Lab Building'];
  const sortOptions = [{
    value: 'relevance',
    label: 'Most Relevant',
    icon: Target
  }, {
    value: 'date-new',
    label: 'Newest First',
    icon: Calendar
  }, {
    value: 'date-old',
    label: 'Oldest First',
    icon: History
  }, {
    value: 'popularity',
    label: 'Most Popular',
    icon: Heart
  }, {
    value: 'engagement',
    label: 'Most Engaging',
    icon: Zap
  }, {
    value: 'alphabetical',
    label: 'A-Z',
    icon: SortAsc
  }];

  // Popular search terms
  const popularSearches = [{
    term: 'College Fest',
    emoji: '🎓',
    gradient: 'bg-gradient-sunset'
  }, {
    term: 'Graduation',
    emoji: '🎉',
    gradient: 'bg-gradient-vintage'
  }, {
    term: 'Friends',
    emoji: '👥',
    gradient: 'bg-gradient-retro'
  }, {
    term: 'Cultural Events',
    emoji: '🎭',
    gradient: 'bg-gradient-sunset'
  }, {
    term: 'Sports',
    emoji: '⚽',
    gradient: 'bg-gradient-vintage'
  }, {
    term: 'Memories',
    emoji: '📸',
    gradient: 'bg-gradient-retro'
  }];

  // Enhanced scroll handling with search progress
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${y * 0.05}px) scale(1.1)`;
      }
      setShowScrollTop(y > 500);

      // Update search progress based on scroll
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = y / documentHeight * 100;
      setSearchProgress(Math.min(scrollProgress, 100));
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate AI-powered search suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      const suggestions = searchSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);
      setAiSuggestions(suggestions);
    } else {
      setAiSuggestions([]);
    }
  }, [searchTerm]);

  // Voice search setup
  const startVoiceSearch = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onstart = () => {
        setIsVoiceSearchActive(true);
        toast({
          title: "Voice search started",
          description: "Speak now..."
        });
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        toast({
          title: "Voice captured",
          description: `Searching for: ${transcript}`
        });
      };
      recognition.onerror = () => {
        toast({
          title: "Voice search error",
          description: "Please try again",
          variant: "destructive"
        });
      };
      recognition.onend = () => {
        setIsVoiceSearchActive(false);
      };
      recognition.start();
    } else {
      toast({
        title: "Not supported",
        description: "Voice search not available in this browser",
        variant: "destructive"
      });
    }
  }, [toast]);
  const searchResults = {
    moments: [{
      id: 1,
      title: 'Graduation Ceremony 2023',
      image: polaroid1,
      caption: 'Four years of memories culminating in this moment',
      description: 'The culmination of four incredible years filled with learning, friendships, and unforgettable experiences.',
      date: 'June 20, 2023',
      likes: 247,
      location: 'Grand Auditorium',
      author: 'Sarah Johnson',
      tags: ['graduation', 'ceremony', 'milestone'],
      type: 'moment'
    }, {
      id: 2,
      title: 'Cultural Fest Performance',
      image: polaroid2,
      caption: 'An unforgettable evening of music and dance',
      description: 'A spectacular showcase of talent that brought the entire college community together in celebration.',
      date: 'March 15, 2023',
      likes: 189,
      location: 'Main Stage',
      author: 'Mike Chen',
      tags: ['cultural', 'performance', 'music'],
      type: 'moment'
    }, {
      id: 3,
      title: 'Friendship Forever',
      image: polaroid3,
      caption: 'Bonds that will last beyond college',
      description: 'The special connections formed during college that will continue to enrich our lives forever.',
      date: 'December 10, 2022',
      likes: 156,
      location: 'Campus Garden',
      author: 'Emma Davis',
      tags: ['friendship', 'memories', 'bonds'],
      type: 'moment'
    }, {
      id: 7,
      title: 'Sports Day Victory',
      image: polaroid1,
      caption: 'Champions at last! 🏆',
      description: 'The thrilling victory that brought pride and joy to our entire college community.',
      date: 'October 5, 2022',
      likes: 198,
      location: 'Sports Complex',
      author: 'Alex Rodriguez',
      tags: ['sports', 'victory', 'championship'],
      type: 'moment'
    }],
    people: [{
      id: 4,
      title: 'Sarah Chen',
      image: polaroid1,
      caption: 'Computer Science • Class of 2023',
      description: 'Brilliant coder and amazing friend who always brought innovation to every project.',
      date: 'Active Today',
      likes: 89,
      location: 'Mumbai, India',
      author: 'Profile',
      tags: ['classmate', 'computer science', 'friend'],
      type: 'person'
    }, {
      id: 5,
      title: 'Raj Patel',
      image: polaroid2,
      caption: 'Mechanical Engineering • Class of 2023',
      description: 'Engineering genius with a heart of gold, always ready to help fellow students.',
      date: 'Active Yesterday',
      likes: 76,
      location: 'Delhi, India',
      author: 'Profile',
      tags: ['classmate', 'engineering', 'friend'],
      type: 'person'
    }, {
      id: 8,
      title: 'Priya Sharma',
      image: polaroid3,
      caption: 'Arts & Literature • Class of 2023',
      description: 'Creative soul who brought poetry and passion to everything she touched.',
      date: 'Active 2 days ago',
      likes: 92,
      location: 'Chennai, India',
      author: 'Profile',
      tags: ['classmate', 'arts', 'creative'],
      type: 'person'
    }],
    events: [{
      id: 6,
      title: 'Tech Symposium 2023',
      image: polaroid3,
      caption: 'Innovation and technology showcase',
      description: 'A groundbreaking event featuring the latest in technology and innovation from our brightest minds.',
      date: 'February 18, 2023',
      likes: 234,
      location: 'Innovation Hub',
      author: 'Event Team',
      tags: ['technology', 'symposium', 'innovation'],
      type: 'event'
    }, {
      id: 9,
      title: 'Annual Food Festival',
      image: polaroid2,
      caption: 'Flavors from around the world',
      description: 'A delicious celebration of global cuisine brought together by our diverse student community.',
      date: 'November 12, 2022',
      likes: 167,
      location: 'Campus Grounds',
      author: 'Cultural Committee',
      tags: ['food', 'festival', 'culture'],
      type: 'event'
    }]
  };
  const getAllResults = () => {
    return [...searchResults.moments, ...searchResults.people, ...searchResults.events];
  };
  const getFilteredResults = () => {
    let results = [];
    switch (activeTab) {
      case 'moments':
        results = searchResults.moments;
        break;
      case 'people':
        results = searchResults.people;
        break;
      case 'events':
        results = searchResults.events;
        break;
      default:
        results = getAllResults();
    }

    // Apply advanced filters
    results = results.filter(result => {
      const yearMatch = dateRange[0] <= new Date(result.date).getFullYear() && new Date(result.date).getFullYear() <= dateRange[1];
      const likesMatch = result.likes >= minLikes[0];
      const locationMatch = selectedLocation === 'all' || result.location.includes(selectedLocation);
      const searchWithinMatch = !searchWithinResults || result.title.toLowerCase().includes(searchWithinResults.toLowerCase()) || result.description.toLowerCase().includes(searchWithinResults.toLowerCase());
      return yearMatch && likesMatch && locationMatch && searchWithinMatch;
    });

    // Apply sorting
    switch (sortBy) {
      case 'date-new':
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date-old':
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popularity':
        results.sort((a, b) => b.likes - a.likes);
        break;
      case 'alphabetical':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'engagement':
        results.sort((a, b) => b.likes + (bookmarkedResults.has(b.id) ? 50 : 0) - (a.likes + (bookmarkedResults.has(a.id) ? 50 : 0)));
        break;
      default:
        // relevance
        break;
    }
    return results;
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearching(true);
      // Add to search history
      if (!searchHistory.includes(searchTerm)) {
        setSearchHistory(prev => [searchTerm, ...prev.slice(0, 9)]);
      }
      if (!recentSearches.includes(searchTerm)) {
        setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)]);
      }
      setTimeout(() => {
        setHasSearched(true);
        setIsSearching(false);
        // Update analytics
        setSearchAnalytics(prev => ({
          ...prev,
          totalSearches: prev.totalSearches + 1,
          popularTerm: searchTerm
        }));
        toast({
          title: "Search completed",
          description: `Found ${getFilteredResults().length} results for "${searchTerm}"`
        });
      }, 1200);
    }
  };
  const exportResults = () => {
    const results = getFilteredResults();
    const data = exportFormat === 'json' ? JSON.stringify(results, null, 2) : results.map(r => `${r.title}\t${r.type}\t${r.date}\t${r.location}`).join('\n');
    const blob = new Blob([data], {
      type: exportFormat === 'json' ? 'application/json' : 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-results.${exportFormat === 'json' ? 'json' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Export completed",
      description: `Results exported as ${exportFormat.toUpperCase()}`
    });
  };
  const clearSearchHistory = () => {
    setSearchHistory([]);
    setRecentSearches([]);
    toast({
      title: "History cleared",
      description: "Search history has been cleared"
    });
  };
  const handleLike = (resultId: number) => {
    const newLiked = new Set(likedResults);
    if (newLiked.has(resultId)) {
      newLiked.delete(resultId);
      toast({
        title: "Removed from favorites",
        description: "Item removed from favorites"
      });
    } else {
      newLiked.add(resultId);
      toast({
        title: "Added to favorites",
        description: "Item added to favorites"
      });
    }
    setLikedResults(newLiked);
  };
  const handleBookmark = (resultId: number) => {
    const newBookmarked = new Set(bookmarkedResults);
    if (newBookmarked.has(resultId)) {
      newBookmarked.delete(resultId);
      toast({
        title: "Removed bookmark",
        description: "Item removed from bookmarks"
      });
    } else {
      newBookmarked.add(resultId);
      toast({
        title: "Bookmarked",
        description: "Item bookmarked for later"
      });
    }
    setBookmarkedResults(newBookmarked);
  };
  const handleShare = (result: any) => {
    const shareText = `Check out this ${result.type}: ${result.title}`;
    const shareUrl = `${window.location.origin}/search`;
    if (navigator.share) {
      navigator.share({
        title: result.title,
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: "Link copied",
        description: "Link copied to clipboard"
      });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const filteredResults = getFilteredResults();
  return <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div ref={heroRef} className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out" style={{
      backgroundImage: `url(${heroCollage})`,
      transform: 'translateZ(0) scale(1.1)'
    }}>
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-purple/20 via-transparent to-sunset-orange/20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
            <div className="space-y-6">
              <div className="retro-handwritten text-sunset-orange text-2xl mb-4">
                Discover Your Memories
              </div>
              
              <h1 className="retro-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight transition-all duration-300 cursor-default">
                Search
                <br />
                <span className="bg-gradient-sunset bg-clip-text text-transparent">
                  & Explore
                </span>
              </h1>
              
              <p className="text-warm-cream text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500 font-medium" style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
                Find moments, connect with friends, and rediscover the memories that matter most to you.
              </p>

              {/* Search Stats */}
              <div className="flex justify-center space-x-8 mt-8 animate-fade-in delay-700">
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">500+</div>
                  <div className="text-warm-cream text-sm font-medium">Moments</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">200+</div>
                  <div className="text-warm-cream text-sm font-medium">People</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">50+</div>
                  <div className="text-warm-cream text-sm font-medium">Events</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar with Voice & AI */}
          <div className="max-w-5xl mx-auto mb-12 animate-fade-in delay-300">
            <form onSubmit={handleSearch} className="relative">
              <div className="group flex items-center gap-3 shadow-retro border border-white/20 px-6 py-4 bg-white/95 backdrop-blur-md hover:shadow-vintage hover:scale-[1.02] focus-within:shadow-vintage focus-within:scale-[1.02] transition-all duration-300 rounded-2xl">
                <Search className="h-6 w-6 text-gray-400 flex-shrink-0" />
                
                <div className="flex-1 relative">
                  <input ref={searchInputRef} type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search memories, people, events... (Try voice search!)" className="w-full text-base border-0 focus:outline-none focus:ring-0 placeholder-gray-400 text-black bg-transparent font-medium" />
                </div>

                {/* Voice Search Button */}
                <Button type="button" onClick={startVoiceSearch} disabled={isVoiceSearchActive} variant="ghost" size="sm" className={`flex-shrink-0 p-2 ${isVoiceSearchActive ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'}`}>
                  {isVoiceSearchActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>

                {/* Advanced Filters Toggle */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600">
                      <Sliders className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="flex items-center">
                        <Filter className="h-5 w-5 mr-2" />
                        Advanced Filters
                      </SheetTitle>
                      <SheetDescription>
                        Refine your search with advanced options
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="space-y-6 mt-6">
                      {/* Date Range */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Date Range</Label>
                        <div className="px-3">
                          <Slider value={dateRange} onValueChange={setDateRange} max={2024} min={2020} step={1} className="w-full" />
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{dateRange[0]}</span>
                            <span>{dateRange[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Minimum Likes */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Minimum Likes: {minLikes[0]}</Label>
                        <Slider value={minLikes} onValueChange={setMinLikes} max={300} min={0} step={10} className="w-full" />
                      </div>

                      {/* Location Filter */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map(location => <SelectItem key={location} value={location}>
                                {location === 'all' ? 'All Locations' : location}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Sort Options */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Sort By</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sortOptions.map(option => <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center">
                                  <option.icon className="h-4 w-4 mr-2" />
                                  {option.label}
                                </div>
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Button type="submit" disabled={isSearching || !searchTerm.trim()} className="bg-gradient-sunset hover:scale-105 transition-all duration-300 rounded-xl font-medium text-white shadow-lg flex-shrink-0 px-6 py-3 disabled:opacity-70">
                  {isSearching ? <>
                      <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Searching...
                    </> : <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>}
                </Button>
              </div>
            </form>

            {/* Search Progress Bar */}
            {isSearching && <div className="mt-4">
                <Progress value={searchProgress} className="h-2" />
                <p className="text-center text-sm text-white/80 mt-2">
                  Analyzing memories and connections...
                </p>
              </div>}
          </div>

          {/* Enhanced Search Results with Analytics */}
          {hasSearched && <div className="max-w-7xl mx-auto animate-fade-in delay-500">
              {/* Search Analytics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="group relative overflow-hidden bg-gradient-to-br from-sunset-orange/20 via-sunset-orange/10 to-transparent backdrop-blur-xl border border-sunset-orange/30 hover:border-sunset-orange/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in">
                  <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-sunset-orange/20 backdrop-blur-sm rounded-full border border-sunset-orange/30 group-hover:bg-sunset-orange/30 transition-all duration-300">
                        <BarChart3 className="h-6 w-6 text-sunset-orange drop-shadow-sm" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70 font-medium mb-1">Total Results</p>
                        <p className="text-3xl font-bold text-white drop-shadow-md retro-heading">{getFilteredResults().length}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-sunset-orange rounded-full mr-2 animate-pulse" />
                        Live Results
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="group relative overflow-hidden bg-gradient-to-br from-vintage-teal/20 via-vintage-teal/10 to-transparent backdrop-blur-xl border border-vintage-teal/30 hover:border-vintage-teal/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-vintage-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-vintage-teal/20 backdrop-blur-sm rounded-full border border-vintage-teal/30 group-hover:bg-vintage-teal/30 transition-all duration-300">
                        <TrendingUp className="h-6 w-6 text-vintage-teal drop-shadow-sm" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70 font-medium mb-1">Avg. Likes</p>
                        <p className="text-3xl font-bold text-white drop-shadow-md retro-heading">
                          {Math.round(getFilteredResults().reduce((acc, r) => acc + r.likes, 0) / getFilteredResults().length) || 0}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-vintage-teal rounded-full mr-2 animate-pulse" />
                        Engagement Score
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden bg-gradient-to-br from-retro-purple/20 via-retro-purple/10 to-transparent backdrop-blur-xl border border-retro-purple/30 hover:border-retro-purple/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-retro-purple/20 backdrop-blur-sm rounded-full border border-retro-purple/30 group-hover:bg-retro-purple/30 transition-all duration-300">
                        <Clock className="h-6 w-6 text-retro-purple drop-shadow-sm" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70 font-medium mb-1">Search Time</p>
                        <p className="text-3xl font-bold text-white drop-shadow-md retro-heading">0.8s</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        Lightning Fast
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                        <Sparkles className="h-6 w-6 text-white drop-shadow-sm" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70 font-medium mb-1">Match Score</p>
                        <p className="text-3xl font-bold text-white drop-shadow-md retro-heading">94%</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                        AI Powered
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Controls */}
              <div className="relative mb-8 animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
                <div className="absolute inset-0 bg-gradient-to-r from-retro-purple/10 via-vintage-teal/10 to-sunset-orange/10 rounded-2xl blur-xl" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      {/* Filter Tabs */}
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                        <TabsList className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-1 shadow-lg">
                          <TabsTrigger value="all" className="rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-hero data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/10">
                            All ({getAllResults().length})
                          </TabsTrigger>
                          <TabsTrigger value="moments" className="rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-sunset data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/10">
                            Moments ({searchResults.moments.length})
                          </TabsTrigger>
                          <TabsTrigger value="people" className="rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-vintage data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/10">
                            People ({searchResults.people.length})
                          </TabsTrigger>
                          <TabsTrigger value="events" className="rounded-full py-2 px-4 text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-retro data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/10">
                            Events ({searchResults.events.length})
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      {/* Search within results */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-vintage-teal/20 to-sunset-orange/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden hover:border-white/40 transition-colors duration-300">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                          <input type="text" placeholder="Search within results..." value={searchWithinResults} onChange={e => setSearchWithinResults(e.target.value)} className="pl-10 pr-4 py-2 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 w-64 transition-all duration-300" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* View Toggle */}
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-1 shadow-lg">
                        <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}>
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}>
                          <List className="h-4 w-4" />
                        </Button>
                        <Button variant={showTimeline ? 'default' : 'ghost'} size="sm" onClick={() => setShowTimeline(!showTimeline)} className={`p-2 rounded-full transition-all duration-300 ${showTimeline ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}>
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button variant={showMap ? 'default' : 'ghost'} size="sm" onClick={() => setShowMap(!showMap)} className={`p-2 rounded-full transition-all duration-300 ${showMap ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}>
                          <Map className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Export Options */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-4 py-2 shadow-lg hover:shadow-xl hover:scale-105">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-black/90 backdrop-blur-xl border border-white/20">
                          <DialogHeader>
                            <DialogTitle className="text-white">Export Search Results</DialogTitle>
                            <DialogDescription className="text-white/70">
                              Choose format to download your search results
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select value={exportFormat} onValueChange={setExportFormat}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20">
                                <SelectItem value="json">JSON Format</SelectItem>
                                <SelectItem value="csv">CSV Format</SelectItem>
                                <SelectItem value="txt">Text Format</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button onClick={exportResults} className="w-full bg-gradient-sunset hover:bg-gradient-sunset/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                              <Download className="h-4 w-4 mr-2" />
                              Download ({getFilteredResults().length} items)
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="retro-heading text-2xl font-semibold text-white mb-2">
                    Search Results for "{searchTerm}"
                  </h3>
                  <p className="text-warm-cream/80 text-sm">
                    Found {getFilteredResults().length} results • Sorted by {sortOptions.find(s => s.value === sortBy)?.label}
                  </p>
                </div>
                
                {/* Trending Terms */}
                <div className="text-right">
                  <p className="text-sm text-warm-cream/60 mb-2">Trending Now:</p>
                  <div className="flex space-x-2">
                    {trendingSearches.slice(0, 2).map((term, idx) => <Badge key={idx} variant="secondary" className="bg-gradient-sunset/20 text-white cursor-pointer hover:bg-gradient-sunset/40 transition-colors" onClick={() => {
                  setSearchTerm(term);
                  handleSearch({
                    preventDefault: () => {}
                  } as React.FormEvent);
                }}>
                        {term}
                      </Badge>)}
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
                {filteredResults.map((result, index) => <div key={result.id} className="group animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                    <div className={`retro-card hover:shadow-retro transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${viewMode === 'list' ? 'flex space-x-6' : ''}`}>
                      {/* Type Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${result.type === 'moment' ? 'bg-gradient-sunset' : result.type === 'person' ? 'bg-gradient-vintage' : 'bg-gradient-retro'}`}>
                          {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                        </span>
                      </div>

                      {/* Image */}
                      <div className={`relative ${viewMode === 'list' ? 'flex-shrink-0 w-32' : 'mb-6'}`}>
                        <RetroImage src={result.image} alt={result.title} variant="polaroid" size={viewMode === 'list' ? 'sm' : 'full'} aspectRatio="square" rotation="slight" className="w-full" />
                        
                        {/* Action Buttons */}
                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                          <button onClick={() => handleLike(result.id)} className={`p-2 rounded-full shadow-vintage transition-all duration-300 hover:scale-105 ${likedResults.has(result.id) ? 'bg-sunset-orange text-white' : 'bg-white/90 backdrop-blur-sm hover:bg-white text-sunset-orange'}`}>
                            <Heart className={`h-4 w-4 ${likedResults.has(result.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button onClick={() => handleBookmark(result.id)} className={`p-2 rounded-full shadow-vintage transition-all duration-300 hover:scale-105 ${bookmarkedResults.has(result.id) ? 'bg-vintage-teal text-white' : 'bg-white/90 backdrop-blur-sm hover:bg-white text-vintage-teal'}`}>
                            <Bookmark className={`h-4 w-4 ${bookmarkedResults.has(result.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button onClick={() => handleShare(result)} className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-vintage hover:bg-white transition-all duration-300 hover:scale-105 text-retro-purple">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div>
                          <h3 className="retro-heading text-foreground text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-muted-foreground text-base italic retro-handwritten font-medium">
                            {result.caption}
                          </p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between">
                          <button onClick={() => handleLike(result.id)} className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 font-medium ${likedResults.has(result.id) ? 'text-sunset-orange' : 'text-muted-foreground hover:text-sunset-orange'}`}>
                            <Heart className={`h-5 w-5 ${likedResults.has(result.id) ? 'fill-current' : ''}`} />
                            <span>{result.likes + (likedResults.has(result.id) ? 1 : 0)}</span>
                          </button>
                        </div>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1 hover:text-vintage-teal transition-colors">
                            <Calendar className="h-4 w-4" />
                            <span>{result.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-retro-purple transition-colors">
                            <MapPin className="h-4 w-4" />
                            <span>{result.location}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag, tagIndex) => <span key={tagIndex} className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full hover:bg-muted transition-colors cursor-pointer">
                              #{tag}
                            </span>)}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* No Results Message */}
              {filteredResults.length === 0 && <div className="text-center py-12">
                  <div className="retro-card max-w-md mx-auto">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="retro-heading text-xl font-semibold text-foreground mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </div>
                </div>}
            </div>}

          {/* Enhanced Default State with Multiple Sections */}
          {!hasSearched && <div className="max-w-7xl mx-auto animate-fade-in delay-700 space-y-16">
              {/* Quick Search Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="group relative overflow-hidden bg-gradient-to-br from-sunset-orange/20 via-sunset-orange/10 to-transparent backdrop-blur-xl border border-sunset-orange/30 hover:border-sunset-orange/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-center animate-fade-in">
                  <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className="p-4 bg-sunset-orange/20 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 border border-sunset-orange/30 group-hover:bg-sunset-orange/30 transition-all duration-300">
                      <BarChart3 className="h-8 w-8 text-sunset-orange mx-auto mt-1 drop-shadow-sm" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 retro-heading drop-shadow-md">{searchAnalytics.totalSearches}</h3>
                    <p className="text-white/80 text-sm font-medium">Total Searches Today</p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-sunset-orange rounded-full mr-2 animate-pulse" />
                        Live Updates
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden bg-gradient-to-br from-vintage-teal/20 via-vintage-teal/10 to-transparent backdrop-blur-xl border border-vintage-teal/30 hover:border-vintage-teal/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-center animate-fade-in" style={{
              animationDelay: '0.1s'
            }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-vintage-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className="p-4 bg-vintage-teal/20 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 border border-vintage-teal/30 group-hover:bg-vintage-teal/30 transition-all duration-300">
                      <TrendingUp className="h-8 w-8 text-vintage-teal mx-auto mt-1 drop-shadow-sm" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 retro-heading drop-shadow-md">{searchAnalytics.avgResults}</h3>
                    <p className="text-white/80 text-sm font-medium">Avg Results per Search</p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-vintage-teal rounded-full mr-2 animate-pulse" />
                        Quality Results
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group relative overflow-hidden bg-gradient-to-br from-retro-purple/20 via-retro-purple/10 to-transparent backdrop-blur-xl border border-retro-purple/30 hover:border-retro-purple/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-center animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <div className="p-4 bg-retro-purple/20 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 border border-retro-purple/30 group-hover:bg-retro-purple/30 transition-all duration-300">
                      <Star className="h-8 w-8 text-retro-purple mx-auto mt-1 drop-shadow-sm" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 retro-heading drop-shadow-md">{searchAnalytics.popularTerm}</h3>
                    <p className="text-white/80 text-sm font-medium">Most Popular Search</p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-center text-xs text-white/60">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                        Trending Term
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trending Searches */}
              <div className="relative animate-fade-in" style={{
            animationDelay: '0.3s'
          }}>
                <div className="absolute inset-0 bg-gradient-to-r from-sunset-orange/10 via-retro-purple/10 to-vintage-teal/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-3 bg-sunset-orange/20 backdrop-blur-sm rounded-full border border-sunset-orange/30 mr-3">
                        <TrendingUp className="h-6 w-6 text-sunset-orange" />
                      </div>
                      <h2 className="retro-heading text-4xl font-bold text-white drop-shadow-lg">
                        Trending Now
                      </h2>
                    </div>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                      What everyone is searching for right now
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {trendingSearches.map((term, idx) => <Button key={idx} variant="outline" onClick={() => {
                  setSearchTerm(term);
                  setHasSearched(true);
                }} className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 rounded-full px-6 py-3 shadow-lg hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-sunset-orange/20 to-vintage-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                          <Zap className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                          {term}
                        </div>
                      </Button>)}
                  </div>
                </div>
              </div>

              {/* Search History */}
              {searchHistory.length > 0 && <div className="relative animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-vintage-teal/10 via-retro-purple/10 to-sunset-orange/10 rounded-3xl blur-2xl" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center mb-6">
                        <div className="p-3 bg-vintage-teal/20 backdrop-blur-sm rounded-full border border-vintage-teal/30 mr-3 bg-slate-50">
                          <History className="h-6 w-6 text-vintage-teal bg-[#2eacd6]/0" />
                        </div>
                        <h2 className="retro-heading text-4xl font-bold text-white drop-shadow-lg">
                          Your Search History
                        </h2>
                        <Button variant="ghost" size="sm" onClick={clearSearchHistory} className="ml-4 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-full">
                          <X className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                      {searchHistory.map((term, idx) => <Badge key={idx} variant="secondary" className="group relative overflow-hidden cursor-pointer transition-all duration-300 px-4 py-2 rounded-full hover:scale-105" onClick={() => {
                  setSearchTerm(term);
                  setHasSearched(true);
                }}>
                          <div className="absolute inset-0 bg-gradient-to-r from-vintage-teal/10 to-retro-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative">{term}</span>
                        </Badge>)}
                    </div>
                  </div>
                </div>}

              {/* Popular Categories */}
              <div className="text-center mb-12 animate-fade-in" style={{
            animationDelay: '0.5s'
          }}>
                <h2 className="retro-heading text-4xl font-bold text-white mb-6 drop-shadow-lg">
                  Popular Categories
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                  Discover trending moments and connect with your college community
                </p>
              </div>

              {/* Popular Search Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{
            animationDelay: '0.6s'
          }}>
                <div className="group relative overflow-hidden bg-gradient-to-br from-sunset-orange/20 via-sunset-orange/10 to-transparent backdrop-blur-xl border border-sunset-orange/30 hover:border-sunset-orange/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-center rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-8">
                    <div className="bg-gradient-sunset p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-sunset-orange/30">
                      <Clock className="h-10 w-10 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="retro-heading text-xl font-semibold text-white mb-3 drop-shadow-md">
                      Golden Moments
                    </h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      Discover the most cherished memories from your college years
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {
                  setSearchTerm('graduation');
                  setHasSearched(true);
                }} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:scale-105">
                      Explore Moments
                    </Button>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-vintage-teal/20 via-vintage-teal/10 to-transparent backdrop-blur-xl border border-vintage-teal/30 hover:border-vintage-teal/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-center rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-vintage-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-8">
                    <div className="bg-gradient-vintage p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-vintage-teal/30">
                      <User className="h-10 w-10 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="retro-heading text-xl font-semibold text-white mb-3 drop-shadow-md">
                      Find Friends
                    </h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      Reconnect with classmates and discover new connections
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {
                  setSearchTerm('classmates');
                  setActiveTab('people');
                  setHasSearched(true);
                }} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:scale-105">
                      Find People
                    </Button>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-gradient-to-br from-retro-purple/20 via-retro-purple/10 to-transparent backdrop-blur-xl border border-retro-purple/30 hover:border-retro-purple/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-center rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-retro-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-8">
                    <div className="bg-gradient-retro p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-retro-purple/30">
                      <Star className="h-10 w-10 text-white drop-shadow-sm" />
                    </div>
                    <h3 className="retro-heading text-xl font-semibold text-white mb-3 drop-shadow-md">
                      Special Events
                    </h3>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      Browse memorable events and celebrations from campus life
                    </p>
                    <Button variant="outline" size="sm" onClick={() => {
                  setSearchTerm('cultural fest');
                  setActiveTab('events');
                  setHasSearched(true);
                }} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:scale-105">
                      Browse Events
                    </Button>
                  </div>
                </div>
              </div>
            </div>}

          {/* Enhanced Action Buttons */}
          <div className="fixed bottom-8 right-8 flex flex-col space-y-3 z-50">
            {/* Search Analytics Toggle */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="group relative overflow-hidden bg-gradient-vintage backdrop-blur-xl border border-vintage-teal/30 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-r from-vintage-teal/20 to-sunset-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <BarChart3 className="h-6 w-6 relative z-10 drop-shadow-sm" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-black/90 backdrop-blur-xl border border-white/20">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-white">
                    <BarChart3 className="h-6 w-6 mr-2" />
                    Search Analytics
                  </DialogTitle>
                  <DialogDescription className="text-white/70">
                    Insights about your search patterns and trends
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Card className="bg-white/5 backdrop-blur-sm border-white/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Search Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Total Searches:</span>
                        <span className="font-semibold text-white">{searchAnalytics.totalSearches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Avg Results:</span>
                        <span className="font-semibold text-white">{searchAnalytics.avgResults}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Popular Term:</span>
                        <span className="font-semibold text-white">{searchAnalytics.popularTerm}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border-white/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {recentSearches.map((search, idx) => <div key={idx} className="text-sm p-2 rounded">
                            {search}
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>

            {/* Quick Actions */}
            <Button onClick={() => {
            setSearchTerm('');
            setHasSearched(false);
            setActiveTab('all');
            toast({
              title: "Search reset",
              description: "Ready for a new search!"
            });
          }} className="group relative overflow-hidden bg-gradient-retro backdrop-blur-xl border border-retro-purple/30 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-retro-purple/20 to-vintage-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <RefreshCw className="h-6 w-6 relative z-10 drop-shadow-sm" />
            </Button>

            {/* Scroll to Top */}
            {showScrollTop && <Button onClick={scrollToTop} className="group relative overflow-hidden bg-gradient-sunset backdrop-blur-xl border border-sunset-orange/30 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-sunset-orange/20 to-retro-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowUp className="h-6 w-6 relative z-10 drop-shadow-sm" />
              </Button>}
          </div>
        </main>

        <Footer />
      </div>
    </div>;
};
export default SearchPage;