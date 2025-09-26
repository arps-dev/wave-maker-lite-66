import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MapPin, Calendar, Filter, Grid3X3, List, Eye, Download, Share2, Sparkles, ArrowUp, MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RetroImage from '@/components/RetroImage';
import ImageViewerModal, { ImageData } from '@/components/ImageViewerModal';
import { useUploadedImages } from '@/hooks/useUploadedImages';
import heroCollage from '@/assets/hero-collage.webp';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';

const Gallery = () => {
  const { imageId } = useParams();
  const { uploadedImages, updateImageStats } = useUploadedImages();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [loadedItems, setLoadedItems] = useState(6);
  const [commentModal, setCommentModal] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [imageViewerModal, setImageViewerModal] = useState<ImageData | null>(null);
  const [itemComments, setItemComments] = useState<{[key: string]: Array<{id: number, text: string, author: string, time: string}>}>({
    "1": [
      { id: 1, text: "Such a beautiful moment! 📸", author: "Emma R.", time: "1 hour ago" },
      { id: 2, text: "This brings back so many memories!", author: "Jake M.", time: "3 hours ago" }
    ],
    "2": [
      { id: 3, text: "Amazing ceremony! 🎓", author: "Sarah L.", time: "2 hours ago" }
    ],
    "3": [
      { id: 4, text: "Squad goals forever! ✨", author: "Alex K.", time: "4 hours ago" }
    ]
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Parallax and scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${y * 0.05}px) scale(1.1)`;
      }
      setShowScrollTop(y > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Action handlers
  const handleLike = (itemId: string) => {
    const newLiked = new Set(likedItems);
    const isCurrentlyLiked = newLiked.has(itemId);
    
    if (isCurrentlyLiked) {
      newLiked.delete(itemId);
      toast({
        title: "Removed from favorites",
        description: "Photo removed from your favorites",
      });
    } else {
      newLiked.add(itemId);
      toast({
        title: "Added to favorites ❤️",
        description: "Photo added to your favorites",
      });
    }
    
    setLikedItems(newLiked);
    
    // Update uploaded image stats if it's an uploaded image
    const uploadedImg = uploadedImages.find(img => img.id === itemId);
    if (uploadedImg) {
      const newLikes = isCurrentlyLiked ? uploadedImg.likes - 1 : uploadedImg.likes + 1;
      updateImageStats(itemId, { likes: newLikes });
    }
  };

  const handleComment = (itemId: string) => {
    setCommentModal(itemId);
    setCommentText("");
  };

  const handleAddComment = (itemId: string) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "You",
      time: "Just now"
    };
    
    setItemComments(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), newComment]
    }));
    
    // Update uploaded image stats if it's an uploaded image
    const uploadedImg = uploadedImages.find(img => img.id === itemId);
    if (uploadedImg) {
      updateImageStats(itemId, { comments: uploadedImg.comments + 1 });
    }
    
    setCommentText("");
    setCommentModal(null);
    
    toast({
      title: "Comment added! 💬",
      description: "Your comment has been shared",
    });
  };

  const handleImageClick = (item: any) => {
    const imageData: ImageData = {
      id: item.id.toString(),
      src: item.image,
      alt: item.title,
      title: item.title,
      description: item.caption,
      likes: item.likes,
      comments: itemComments[item.id]?.length || item.comments || 0,
      uniqueUrl: item.uniqueUrl || `gallery-${item.id}`,
      uploadedBy: item.uploadedBy,
      uploadedAt: item.uploadedAt || item.date
    };
    
    setImageViewerModal(imageData);
    
    // Update view count for uploaded images
    const uploadedImg = uploadedImages.find(img => img.id === item.id);
    if (uploadedImg) {
      updateImageStats(item.id, { views: uploadedImg.views + 1 });
    }
  };

  const handleShare = async (item: any) => {
    const shareUrl = `${window.location.origin}/gallery/${item.id}`;
    
    // Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied! 📋",
        description: "Photo link copied to clipboard",
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Link copied! 📋",
        description: "Photo link copied to clipboard",
      });
    }
  };

  const handleDownload = (item: any) => {
    // Create download link
    const link = document.createElement('a');
    link.href = item.image;
    link.download = `${item.title || 'image'}.jpg`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started 📥",
      description: `Downloading ${item.title}...`,
    });
  };

  const loadMore = () => {
    setLoadedItems(prev => prev + 6);
    toast({
      title: "Loading more memories ✨",
      description: "More photos loaded successfully",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', name: 'All Photos', count: 156, gradient: 'bg-gradient-sunset' },
    { id: 'events', name: 'College Events', count: 45, gradient: 'bg-gradient-vintage' },
    { id: 'friends', name: 'Friends', count: 67, gradient: 'bg-gradient-retro' },
    { id: 'graduation', name: 'Graduation', count: 23, gradient: 'bg-gradient-sunset' },
    { id: 'sports', name: 'Sports Day', count: 21, gradient: 'bg-gradient-vintage' }
  ];

  const filters = [
    { value: 'all', label: 'All Time' },
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Most Liked' },
    { value: 'favorites', label: 'Favorites' }
  ];

  const galleryItems = [
    {
      id: "1",
      title: 'College Fest 2023',
      image: polaroid1,
      caption: 'Best day ever! 🎉',
      date: 'March 15, 2023',
      likes: 128,
      views: 1247,
      location: 'Main Campus',
      category: 'events',
      tags: ['fest', 'music', 'friends'],
      uniqueUrl: 'gallery-1',
      comments: 0
    },
    {
      id: "2",
      title: 'Graduation Ceremony',
      image: polaroid2,
      caption: 'Finally made it! 🎓',
      date: 'June 20, 2023',
      likes: 256,
      views: 2341,
      location: 'Grand Hall',
      category: 'graduation',
      tags: ['graduation', 'ceremony', 'achievement'],
      uniqueUrl: 'gallery-2',
      comments: 0
    },
    {
      id: "3",
      title: 'Squad Goals',
      image: polaroid3,
      caption: 'Forever friends ✨',
      date: 'April 12, 2023',
      likes: 89,
      views: 892,
      location: 'College Cafeteria',
      category: 'friends',
      tags: ['friends', 'memories', 'love'],
      uniqueUrl: 'gallery-3',
      comments: 0
    },
    {
      id: "4",
      title: 'Victory Celebration',
      image: polaroid1,
      caption: 'Champions! 🏆',
      date: 'February 8, 2023',
      likes: 174,
      views: 1563,
      location: 'Sports Ground',
      category: 'sports',
      tags: ['sports', 'victory', 'team'],
      uniqueUrl: 'gallery-4',
      comments: 0
    },
    {
      id: "5",
      title: 'Cultural Night Magic',
      image: polaroid2,
      caption: 'Dance like nobody\'s watching 💃',
      date: 'November 25, 2022',
      likes: 203,
      views: 1789,
      location: 'Auditorium',
      category: 'events',
      tags: ['cultural', 'dance', 'performance'],
      uniqueUrl: 'gallery-5',
      comments: 0
    },
    {
      id: "6",
      title: 'First Day Memories',
      image: polaroid3,
      caption: 'New beginnings 🌟',
      date: 'August 15, 2022',
      likes: 67,
      views: 654,
      location: 'Main Gate',
      category: 'friends',
      tags: ['first day', 'nervous', 'excited'],
      uniqueUrl: 'gallery-6',
      comments: 0
    }
  ];

  let filteredItems = [...galleryItems];
  
  // Add uploaded images to the gallery
  const uploadedGalleryItems = uploadedImages.map(img => ({
    id: img.id,
    title: img.title,
    image: img.src,
    caption: img.description || "",
    date: img.date,
    likes: img.likes,
    views: img.views,
    location: img.location || "",
    category: 'uploaded',
    tags: img.tags,
    uniqueUrl: img.uniqueUrl,
    uploadedBy: img.uploadedBy,
    uploadedAt: img.uploadedAt,
    comments: img.comments
  }));

  if (selectedCategory === 'uploaded') {
    filteredItems = uploadedGalleryItems;
  } else if (selectedCategory === 'all') {
    filteredItems = [...galleryItems, ...uploadedGalleryItems];
  } else {
    filteredItems = galleryItems.filter(item => item.category === selectedCategory);
  }

  // Apply sorting based on filter
  if (selectedFilter === 'recent') {
    filteredItems = [...filteredItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (selectedFilter === 'popular') {
    filteredItems = [...filteredItems].sort((a, b) => b.likes - a.likes);
  } else if (selectedFilter === 'favorites') {
    filteredItems = filteredItems.filter(item => likedItems.has(item.id));
  }

  const displayedItems = filteredItems.slice(0, loadedItems);

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
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="absolute inset-0 bg-card/25 rounded-3xl -mx-4 sm:-mx-8 -my-8 sm:-my-12 shadow-2xl animate-scale-in"></div>
            
            <div className="relative z-10 px-6 sm:px-8 py-8 sm:py-12">
              <div className="retro-handwritten text-sunset-orange text-xl mb-4 animate-wiggle">
                ~ Your Photo Collection ~
              </div>
              
              <h1 className="retro-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight hover:scale-105 transition-all duration-500 cursor-default">
                Memory
                <br />
                <span className="bg-gradient-sunset bg-clip-text text-transparent hover:animate-pulse">
                  Gallery
                </span>
              </h1>
              
              <p className="text-warm-cream text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-500" 
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                Relive your college memories through our beautifully curated photo collections
              </p>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-8 sm:mb-12 animate-fade-in delay-300">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    ${category.gradient} 
                    ${selectedCategory === category.id ? 'scale-105 shadow-retro' : 'hover:scale-105 hover:shadow-vintage'}
                    text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base
                    transition-all duration-300 transform hover:-translate-y-1 
                    focus:outline-none focus:ring-2 focus:ring-white/50
                    border border-white/30 flex items-center space-x-2
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span>{category.name}</span>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Controls */}
          <div className="retro-card mb-8 animate-fade-in delay-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="retro-heading text-foreground text-xl font-semibold mb-2">
                  {selectedCategory === 'all' ? 'All Photos' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {filteredItems.length} photos • Updated just now
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Filter Dropdown */}
                <div className="relative">
                  <select 
                    value={selectedFilter} 
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="bg-secondary/80 border border-border rounded-lg px-4 py-2 text-secondary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none pr-8"
                  >
                    {filters.map(filter => (
                      <option key={filter.value} value={filter.value} className="bg-background text-foreground">
                        {filter.label}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                
                {/* View Toggle */}
                <button 
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="bg-secondary/80 border border-border rounded-lg p-2 text-secondary-foreground hover:bg-secondary transition-colors duration-200"
                >
                  {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid3X3 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8' : 'space-y-4'} animate-fade-in delay-700`}>
            {displayedItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`gallery-item animate-fade-in ${viewMode === 'grid' ? '' : 'flex items-center space-x-4 bg-card/80 rounded-xl p-4 border border-border/50'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="retro-card hover:shadow-retro transition-all duration-300 hover:-translate-y-2 relative group">
                    <div className="relative z-10" onClick={() => handleImageClick(item)}>
                      <RetroImage 
                        src={item.image} 
                        alt={item.title} 
                        variant="polaroid" 
                        size="full" 
                        aspectRatio="square" 
                        rotation="random" 
                        caption={item.caption} 
                        className="mb-4 cursor-pointer" 
                      />
                    </div>
                    
                     {/* Overlay Actions - Only Share and Download on hover */}
                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2 transform translate-x-2 group-hover:translate-x-0 z-20">
                       <button 
                         onClick={() => handleShare(item)}
                         className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                       >
                         <Share2 className="h-4 w-4 text-vintage-teal" />
                       </button>
                       <button 
                         onClick={() => handleDownload(item)}
                         className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                       >
                         <Download className="h-4 w-4 text-retro-purple" />
                       </button>
                     </div>
                    
                    <div className="space-y-3 relative z-10">
                      <h3 className="retro-heading text-foreground font-semibold text-lg">{item.title}</h3>
                      
                       {/* Like, Comment, Views - Always visible and accessible */}
                       <div className="flex items-center justify-between text-sm relative z-20">
                         <div className="flex items-center space-x-3 text-muted-foreground">
                           <button
                             onClick={() => handleLike(item.id)}
                             className={`flex items-center space-x-1 transition-colors hover:scale-105 z-30 relative ${
                               likedItems.has(item.id) 
                                 ? 'text-sunset-orange' 
                                 : 'text-muted-foreground hover:text-sunset-orange'
                             }`}
                           >
                             <Heart className={`h-4 w-4 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                             <span>{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                           </button>
                           <button
                             onClick={() => handleComment(item.id)}
                             className="flex items-center space-x-1 text-muted-foreground hover:text-vintage-teal transition-colors hover:scale-105 z-30 relative"
                           >
                             <MessageCircle className="h-4 w-4" />
                             <span>{itemComments[item.id]?.length || item.comments || 0}</span>
                           </button>
                           <div className="flex items-center space-x-1">
                             <Eye className="h-4 w-4 text-vintage-teal" />
                             <span>{item.views}</span>
                           </div>
                         </div>
                       </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gradient-vintage text-white text-xs rounded-full shadow-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <>
                    <RetroImage 
                      src={item.image} 
                      alt={item.title} 
                      variant="polaroid" 
                      size="sm" 
                      aspectRatio="square" 
                      rotation="slight" 
                      className="flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="retro-heading text-foreground font-semibold mb-2 truncate">{item.title}</h3>
                      <p className="retro-handwritten text-muted-foreground text-sm mb-2 italic">{item.caption}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3 text-sunset-orange" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3 text-vintage-teal" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-0.5 bg-gradient-vintage text-white text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{item.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          {displayedItems.length < filteredItems.length && (
            <div className="text-center mt-12 animate-fade-in delay-1000">
              <Button 
                onClick={loadMore}
                className="px-8 py-4 text-base font-medium text-white rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center space-x-2 mx-auto"
                style={{
                  background: 'var(--gradient-sunset)',
                  boxShadow: 'var(--shadow-vintage)'
                }}
              >
                <Sparkles className="h-5 w-5" />
                <span>Load More Memories ({filteredItems.length - displayedItems.length} remaining)</span>
              </Button>
            </div>
          )}

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-gradient-sunset text-white p-3 rounded-full shadow-retro hover:shadow-vintage transition-all duration-300 hover:scale-110 z-50 animate-fade-in"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          )}
        </main>

        <Footer />
      </div>

      {/* Comment Modal */}
      {commentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">
                Comments - {galleryItems.find(item => item.id === commentModal)?.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCommentModal(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comments List */}
              <div className="max-h-60 overflow-y-auto space-y-3">
                {itemComments[commentModal]?.map((comment) => (
                  <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                ))}
                {(!itemComments[commentModal] || itemComments[commentModal].length === 0) && (
                  <p className="text-center text-muted-foreground text-sm py-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
              
              {/* Add Comment */}
              <div className="flex gap-2 pt-4 border-t">
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(commentModal)}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleAddComment(commentModal)}
                  disabled={!commentText.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Gallery;