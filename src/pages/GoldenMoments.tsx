import { useState, useRef, useEffect } from 'react';
import { Star, Heart, MapPin, Calendar, Crown, Sparkles, Trophy, Medal, Zap, ArrowUp, Share2, Bookmark, Camera, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RetroImage from '@/components/RetroImage';
import MomentDetailsModal from '@/components/MomentDetailsModal';
import CreateMomentModal from '@/components/CreateMomentModal';
import heroCollage from '@/assets/hero-collage.webp';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';

// Golden moments data - moved outside component to avoid recreation
const goldenMoments = [{
  id: 1,
  title: 'Graduation Day Glory',
  subtitle: 'Four years of hard work finally paid off',
  image: polaroid2,
  date: 'June 20, 2023',
  likes: 1247,
  location: 'Grand Auditorium',
  category: 'legendary',
  badge: {
    text: 'Most Liked',
    icon: Heart,
    color: 'bg-gradient-sunset'
  },
  tags: ['graduation', 'achievement', 'milestone']
}, {
  id: 2,
  title: 'Championship Victory',
  subtitle: 'Brought home the trophy after 5 years',
  image: polaroid1,
  date: 'March 15, 2023',
  likes: 892,
  location: 'Sports Complex',
  category: 'achievements',
  badge: {
    text: 'Champion',
    icon: Trophy,
    color: 'bg-gradient-vintage'
  },
  tags: ['sports', 'victory', 'team']
}, {
  id: 3,
  title: 'Cultural Fest Standing Ovation',
  subtitle: 'A performance that resonated with everyone',
  image: polaroid3,
  date: 'November 12, 2022',
  likes: 654,
  location: 'Main Auditorium',
  category: 'legendary',
  badge: {
    text: 'Legendary',
    icon: Crown,
    color: 'bg-gradient-retro'
  },
  tags: ['cultural', 'performance', 'legendary']
}, {
  id: 4,
  title: 'First Day Friendships',
  subtitle: 'The beginning of lifelong bonds',
  image: polaroid1,
  date: 'August 15, 2022',
  likes: 445,
  location: 'College Entrance',
  category: 'milestones',
  badge: {
    text: 'Milestone',
    icon: Medal,
    color: 'bg-gradient-sunset'
  },
  tags: ['friendship', 'first day', 'memories']
}, {
  id: 5,
  title: 'Tech Fest Innovation Award',
  subtitle: 'When dedication meets innovation',
  image: polaroid2,
  date: 'February 28, 2023',
  likes: 723,
  location: 'Innovation Lab',
  category: 'achievements',
  badge: {
    text: 'Innovation',
    icon: Zap,
    color: 'bg-gradient-vintage'
  },
  tags: ['technology', 'innovation', 'award']
}, {
  id: 6,
  title: 'Farewell Tears & Cheers',
  subtitle: 'A goodbye that felt like see you later',
  image: polaroid3,
  date: 'May 30, 2023',
  likes: 1089,
  location: 'College Grounds',
  category: 'legendary',
  badge: {
    text: 'Emotional',
    icon: Heart,
    color: 'bg-gradient-sunset'
  },
  tags: ['farewell', 'emotions', 'memories']
}];

const GoldenMoments = () => {
  const { momentId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likedMoments, setLikedMoments] = useState<Set<number>>(new Set([1, 3, 6]));
  const [bookmarkedMoments, setBookmarkedMoments] = useState<Set<number>>(new Set([2, 4]));
  const [selectedMoment, setSelectedMoment] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();

  // Check for shared moment URL and open modal
  useEffect(() => {
    if (momentId) {
      const sharedMoment = goldenMoments.find(moment => moment.id === parseInt(momentId));
      if (sharedMoment) {
        setSelectedMoment(sharedMoment);
        setShowDetailsModal(true);
      } else {
        // If moment not found, redirect to main page
        navigate('/golden-moments', { replace: true });
      }
    }
  }, [momentId, navigate]);

  // Parallax and scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${y * 0.05}px) scale(1.1)`;
      }
      setShowScrollTop(y > 500);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLike = (momentId: number) => {
    const newLiked = new Set(likedMoments);
    if (newLiked.has(momentId)) {
      newLiked.delete(momentId);
      toast({
        title: "Removed from favorites",
        description: "Golden moment removed from favorites"
      });
    } else {
      newLiked.add(momentId);
      toast({
        title: "Added to favorites ❤️",
        description: "Golden moment added to favorites"
      });
    }
    setLikedMoments(newLiked);
  };
  const handleBookmark = (momentId: number) => {
    const newBookmarked = new Set(bookmarkedMoments);
    if (newBookmarked.has(momentId)) {
      newBookmarked.delete(momentId);
      toast({
        title: "Removed bookmark",
        description: "Golden moment removed from bookmarks"
      });
    } else {
      newBookmarked.add(momentId);
      toast({
        title: "Bookmarked! 🔖",
        description: "Golden moment bookmarked for later"
      });
    }
    setBookmarkedMoments(newBookmarked);
  };
  const handleShare = async (moment: any) => {
    const shareText = `Check out this golden moment: ${moment.title} - ${moment.subtitle}`;
    const shareUrl = `${window.location.origin}/golden-moment/${moment.id}`;
    
    // Check if Web Share API is available and supported
    if (navigator.share && navigator.canShare && navigator.canShare({ url: shareUrl })) {
      try {
        await navigator.share({
          title: moment.title,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        // If share fails, fall through to clipboard
        console.log('Share failed, falling back to clipboard');
      }
    }
    
    // Fallback to clipboard - only copy URL
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied! 📋",
        description: "Golden moment link copied to clipboard"
      });
    } catch (err) {
      // Final fallback - create text area and copy only URL
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Link copied! 📋",
        description: "Golden moment link copied to clipboard"
      });
    }
  };
  const handleViewDetails = (moment: any) => {
    setSelectedMoment(moment);
    setShowDetailsModal(true);
    // Update URL without triggering a page reload
    navigate(`/golden-moment/${moment.id}`, { replace: true });
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedMoment(null);
    // Return to main golden moments page
    navigate('/golden-moments', { replace: true });
  };
  const handleCreateMoment = () => {
    setShowCreateModal(true);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const categories = [{
    id: 'all',
    name: 'All Moments',
    icon: Sparkles,
    count: 25,
    gradient: 'bg-gradient-hero'
  }, {
    id: 'legendary',
    name: 'Legendary',
    icon: Crown,
    count: 8,
    gradient: 'bg-gradient-sunset'
  }, {
    id: 'achievements',
    name: 'Achievements',
    icon: Trophy,
    count: 10,
    gradient: 'bg-gradient-vintage'
  }, {
    id: 'milestones',
    name: 'Milestones',
    icon: Medal,
    count: 7,
    gradient: 'bg-gradient-retro'
  }];
  const filteredMoments = goldenMoments.filter(moment => selectedCategory === 'all' || moment.category === selectedCategory);
  return <div className="min-h-screen relative overflow-hidden">
      {/* Funky Animated Background */}
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
                Celebrating Life's Best Moments
              </div>
              
              <h1 className="retro-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight transition-all duration-300 cursor-default">
                Golden
                <br />
                <span className="bg-gradient-sunset bg-clip-text text-transparent">
                  Moments
                </span>
              </h1>
              
              <p className="text-warm-cream text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500 font-medium" style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
                A curated collection of meaningful memories that define our college journey - from personal achievements to milestone moments worth remembering.
              </p>

              {/* Fun Stats */}
              <div className="flex justify-center space-x-8 mt-8 animate-fade-in delay-700">
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">25+</div>
                  <div className="text-warm-cream text-sm font-medium">Memorable Moments</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">15K+</div>
                  <div className="text-warm-cream text-sm font-medium">Total Likes</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">4</div>
                  <div className="text-warm-cream text-sm font-medium">Years of Memories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="mb-12 animate-fade-in delay-300">
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {categories.map((category, index) => {
              const IconComponent = category.icon;
              return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`
                      ${category.gradient} 
                      ${selectedCategory === category.id ? 'scale-105 shadow-retro ring-2 ring-white/30' : 'hover:scale-105 hover:shadow-vintage hover:-translate-y-1'}
                      text-white px-8 py-6 rounded-full font-bold text-base
                      transition-all duration-300 transform
                      focus:outline-none backdrop-blur-sm border-2 border-white/40 
                      flex items-center space-x-3 min-w-[160px] justify-center
                      relative overflow-hidden group
                    `} style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    
                    <IconComponent className="h-6 w-6" />
                    <span className="relative z-10">{category.name}</span>
                    <span className="bg-white/30 text-sm px-3 py-1 rounded-full font-bold">{category.count}</span>
                  </button>;
            })}
            </div>
          </div>

          {/* Golden Moments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in delay-500">
            {filteredMoments.map((moment, index) => {
            const BadgeIcon = moment.badge.icon;
            return <div key={moment.id} className="group animate-scale-in" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <div className="retro-card hover:shadow-retro transition-all duration-500 hover:-translate-y-2 relative overflow-hidden transform-gpu">
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className={`${moment.badge.color} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-vintage transform hover:scale-105 transition-all duration-300`}>
                        <BadgeIcon className="h-4 w-4" />
                        <span>{moment.badge.text}</span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative mb-6 group-hover:scale-102 transition-all duration-500">
                      <RetroImage src={moment.image} alt={moment.title} variant="polaroid" size="full" aspectRatio="landscape" rotation="slight" className="w-full" />
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                        <button onClick={() => handleLike(moment.id)} className={`p-3 rounded-full shadow-vintage transition-all duration-300 hover:scale-105 ${likedMoments.has(moment.id) ? 'bg-sunset-orange text-white' : 'bg-white/90 backdrop-blur-sm hover:bg-white text-sunset-orange'}`}>
                          <Heart className={`h-5 w-5 ${likedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={() => handleBookmark(moment.id)} className={`p-3 rounded-full shadow-vintage transition-all duration-300 hover:scale-105 ${bookmarkedMoments.has(moment.id) ? 'bg-vintage-teal text-white' : 'bg-white/90 backdrop-blur-sm hover:bg-white text-vintage-teal'}`}>
                          <Bookmark className={`h-5 w-5 ${bookmarkedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={() => handleShare(moment)} className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-vintage hover:bg-white transition-all duration-300 hover:scale-105 text-retro-purple">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <Button onClick={() => handleViewDetails(moment)} className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 hover:bg-white/30 hover:scale-105 transition-all duration-300 rounded-full px-6 py-3 font-bold">
                          <Star className="h-5 w-5 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="retro-heading text-foreground text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {moment.title}
                        </h3>
                        <p className="text-muted-foreground text-base italic retro-handwritten font-medium">
                          {moment.subtitle}
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between">
                        <button onClick={() => handleLike(moment.id)} className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 font-medium ${likedMoments.has(moment.id) ? 'text-sunset-orange' : 'text-muted-foreground hover:text-sunset-orange'}`}>
                          <Heart className={`h-5 w-5 ${likedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                          <span>{moment.likes + (likedMoments.has(moment.id) ? 1 : 0)}</span>
                        </button>
                      </div>

                      {/* Date and Location with icons */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1 hover:text-vintage-teal transition-colors">
                          <Calendar className="h-4 w-4" />
                          <span>{moment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-retro-purple transition-colors">
                          <MapPin className="h-4 w-4" />
                          <span>{moment.location}</span>
                        </div>
                      </div>

                      {/* Funky Tags */}
                      <div className="flex flex-wrap gap-2">
                        {moment.tags.map((tag, tagIndex) => <span key={tagIndex} className="px-3 py-1 bg-gradient-vintage text-white text-xs rounded-full shadow-sm font-bold hover:scale-110 transition-all duration-300 cursor-pointer">
                            #{tag}
                          </span>)}
                      </div>
                    </div>
                  </div>
                </div>;
          })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="retro-card max-w-3xl mx-auto bg-gradient-hero text-white relative overflow-hidden">
              
              <div className="text-center relative z-10">
                <div className="flex justify-center space-x-4 mb-6">
                  <Award className="h-12 w-12 text-sunset-orange" />
                  <Camera className="h-12 w-12 text-vintage-teal" />
                  <Star className="h-12 w-12 text-retro-purple" />
                </div>
                
                <h3 className="retro-heading text-3xl font-bold mb-4">
                  Create Your Golden Moment
                </h3>
                <p className="text-warm-cream mb-8 leading-relaxed text-lg font-medium">
                  Every memory has the potential to become golden. Share your meaningful moments and inspire others.
                </p>
                <Button onClick={handleCreateMoment} className="px-10 py-5 text-lg font-bold bg-white text-foreground rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-retro focus:outline-none focus:ring-4 focus:ring-white/50">
                  <Camera className="h-6 w-6 mr-3" />
                  Share Your Moment
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          {showScrollTop && <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-gradient-sunset text-white p-4 rounded-full shadow-retro hover:shadow-vintage transition-all duration-300 hover:scale-105 z-50">
              <ArrowUp className="h-6 w-6" />
            </button>}
        </main>

        <Footer />

        {/* Modals */}
        <MomentDetailsModal moment={selectedMoment} isOpen={showDetailsModal} onClose={handleCloseModal} onLike={handleLike} onBookmark={handleBookmark} onShare={handleShare} likedMoments={likedMoments} bookmarkedMoments={bookmarkedMoments} />

        <CreateMomentModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      </div>
    </div>;
};
export default GoldenMoments;