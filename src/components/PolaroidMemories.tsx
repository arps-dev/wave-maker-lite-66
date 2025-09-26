import polaroid1 from "@/assets/polaroid-1.webp";
import polaroid2 from "@/assets/polaroid-2.webp";
import polaroid3 from "@/assets/polaroid-3.webp";
import { Heart, MessageCircle, Share2, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RetroImage from "@/components/RetroImage";

const memories = [
  {
    id: 1,
    image: polaroid1,
    title: "Welcome Celebration 2024",
    caption: "A memorable evening",
    likes: 127,
    comments: 23,
    rotation: "rotate-2",
    sticker: "New!"
  },
  {
    id: 2,
    image: polaroid2,
    title: "Music Concert",
    caption: "An inspiring performance",
    likes: 89,
    comments: 15,
    rotation: "-rotate-1",
    sticker: "Popular"
  },
  {
    id: 3,
    image: polaroid3,
    title: "Food Festival",
    caption: "Culinary excellence",
    likes: 156,
    comments: 31,
    rotation: "rotate-1",
    sticker: "Featured"
  }
];

interface PolaroidMemoriesProps {
  sharedMemoryId?: string;
}

const PolaroidMemories = ({ sharedMemoryId }: PolaroidMemoriesProps) => {
  const navigate = useNavigate();
  const [likedMemories, setLikedMemories] = useState<Set<number>>(new Set());
  const [commentModal, setCommentModal] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [imageModal, setImageModal] = useState<number | null>(null);
  const [memoryComments, setMemoryComments] = useState<{[key: number]: Array<{id: number, text: string, author: string, time: string}>}>({
    1: [
      { id: 1, text: "What an amazing event! 🎉", author: "Sarah M.", time: "2 hours ago" },
      { id: 2, text: "Loved every moment of it!", author: "Mike R.", time: "4 hours ago" }
    ],
    2: [
      { id: 3, text: "The music was incredible! 🎵", author: "Emma L.", time: "1 day ago" }
    ],
    3: [
      { id: 4, text: "Best food festival ever! 🍕", author: "Alex K.", time: "3 hours ago" },
      { id: 5, text: "So many delicious options!", author: "Lisa P.", time: "5 hours ago" }
    ]
  });
  const [memoryLikes, setMemoryLikes] = useState<{[key: number]: number}>({
    1: 127,
    2: 89,
    3: 156
  });

  // Auto-open image modal for shared memories
  useEffect(() => {
    if (sharedMemoryId) {
      const memoryId = parseInt(sharedMemoryId);
      if (memories.find(m => m.id === memoryId)) {
        setImageModal(memoryId);
      }
    }
  }, [sharedMemoryId]);

  const handleShare = async (memory: any) => {
    const shareUrl = `${window.location.origin}/memory/${memory.id}`;
    
    // Check if Web Share API is available and supported
    if (navigator.share && navigator.canShare && navigator.canShare({ url: shareUrl })) {
      try {
        await navigator.share({
          title: `Check out this memory: ${memory.title}`,
          url: shareUrl,
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
        title: "Link copied! 🔗",
        description: `Share this amazing memory: ${memory.title}`,
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
        title: "Link copied! 🔗",
        description: `Share this amazing memory: ${memory.title}`,
      });
    }
  };

  const handleLike = (memoryId: number) => {
    const newLiked = new Set(likedMemories);
    let newLikes = { ...memoryLikes };
    
    if (newLiked.has(memoryId)) {
      newLiked.delete(memoryId);
      newLikes[memoryId] = Math.max(0, newLikes[memoryId] - 1);
      toast({
        title: "Like removed",
        description: "You unliked this memory",
      });
    } else {
      newLiked.add(memoryId);
      newLikes[memoryId] = newLikes[memoryId] + 1;
      toast({
        title: "Memory liked! ❤️",
        description: "You liked this amazing moment",
      });
    }
    
    setLikedMemories(newLiked);
    setMemoryLikes(newLikes);
  };

  const handleComment = (memoryId: number) => {
    setCommentModal(memoryId);
    setCommentText("");
  };

  const handleCloseModal = () => {
    setCommentModal(null);
    setCommentText("");
  };

  const handleCloseImageModal = () => {
    setImageModal(null);
    // Return to main page
    navigate('/', { replace: true });
  };

  const handleAddComment = (memoryId: number) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "You",
      time: "Just now"
    };
    
    setMemoryComments(prev => ({
      ...prev,
      [memoryId]: [...(prev[memoryId] || []), newComment]
    }));
    
    setCommentText("");
    
    toast({
      title: "Comment added! 💬",
      description: "Your comment has been shared",
    });
  };

  const handleViewAll = () => {
    navigate("/golden-moments");
  };
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="retro-handwritten text-retro-purple text-xl mb-4">
            ~ Featured Highlights ~
          </div>
          <h2 className="retro-heading text-4xl md:text-5xl text-foreground mb-6">
            Golden Moments
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dive into our curated collection of the most cherished memories from college fests
          </p>
        </div>

        {/* Polaroid Board */}
        <div className="relative">
          {/* Cork Board Background Effect */}
          <div className="bg-sepia-brown/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Pin Effects */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-primary rounded-full shadow-lg"></div>
            <div className="absolute top-4 right-8 w-3 h-3 bg-accent rounded-full shadow-lg"></div>
            <div className="absolute bottom-4 left-8 w-3 h-3 bg-retro-purple rounded-full shadow-lg"></div>
            <div className="absolute bottom-4 right-8 w-3 h-3 bg-vintage-teal rounded-full shadow-lg"></div>

            {/* Polaroid Grid */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {memories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <RetroImage
                    src={memory.image}
                    alt={memory.title}
                    variant="polaroid"
                    size="full"
                    aspectRatio="square"
                    rotation="random"
                    sticker={memory.sticker}
                    className="animate-fade-in"
                  />
                  
                  {/* Stats overlay */}
                  <div className="absolute bottom-2 left-2 right-2 bg-card/80 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-foreground text-sm mb-1">{memory.title}</h3>
                    <p className="retro-handwritten text-muted-foreground text-xs mb-2">
                      {memory.caption}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(memory.id)}
                          className={`flex items-center space-x-1 text-xs transition-colors ${
                            likedMemories.has(memory.id) 
                              ? 'text-sunset-orange' 
                              : 'text-muted-foreground hover:text-sunset-orange'
                          }`}
                        >
                          <Heart className={`h-3 w-3 ${likedMemories.has(memory.id) ? 'fill-current' : ''}`} />
                          <span>{memoryLikes[memory.id] || memory.likes}</span>
                        </button>
                        <button
                          onClick={() => handleComment(memory.id)}
                          className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-vintage-teal transition-colors"
                        >
                          <MessageCircle className="h-3 w-3" />
                          <span>{memoryComments[memory.id]?.length || memory.comments}</span>
                        </button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-1 h-auto text-muted-foreground hover:text-retro-purple"
                        onClick={() => handleShare(memory)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:block absolute -top-4 left-1/3 transform -rotate-12">
              <div className="w-16 h-4 bg-sunset-orange/20 rounded-full"></div>
            </div>
            <div className="hidden lg:block absolute -bottom-2 right-1/4 transform rotate-6">
              <div className="w-20 h-4 bg-vintage-teal/20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            onClick={handleViewAll}
            className="btn-retro text-white font-medium px-8"
            style={{
              background: 'var(--gradient-vintage)',
              border: 'none'
            }}
          >
            View All Memories
          </Button>
        </div>
      </div>

      {/* Comment Modal */}
      {commentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">
                Comments - {memories.find(m => m.id === commentModal)?.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comments List */}
              <div className="max-h-60 overflow-y-auto space-y-3">
                {memoryComments[commentModal]?.map((comment) => (
                  <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                ))}
                {(!memoryComments[commentModal] || memoryComments[commentModal].length === 0) && (
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

      {/* Image Modal */}
      {imageModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseImageModal}
              className="absolute top-4 right-4 z-10 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            
            {memories.find(m => m.id === imageModal) && (
              <div className="bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
                <div className="space-y-4">
                  <RetroImage
                    src={memories.find(m => m.id === imageModal)?.image || ""}
                    alt={memories.find(m => m.id === imageModal)?.title || ""}
                    variant="polaroid"
                    size="full"
                    aspectRatio="square"
                    className="w-full max-w-md mx-auto"
                  />
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {memories.find(m => m.id === imageModal)?.title}
                    </h3>
                    <p className="text-gray-600 retro-handwritten">
                      {memories.find(m => m.id === imageModal)?.caption}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <div className="flex items-center space-x-2 text-sunset-orange">
                        <Heart className="h-5 w-5 fill-current" />
                        <span className="font-medium">{memoryLikes[imageModal] || memories.find(m => m.id === imageModal)?.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-vintage-teal">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">{memoryComments[imageModal]?.length || memories.find(m => m.id === imageModal)?.comments}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-3 pt-4">
                      <Button
                        onClick={() => handleLike(imageModal)}
                        variant={likedMemories.has(imageModal) ? "default" : "outline"}
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <Heart className={`h-4 w-4 ${likedMemories.has(imageModal) ? 'fill-current' : ''}`} />
                        <span>Like</span>
                      </Button>
                      <Button
                        onClick={() => {
                          setImageModal(null);
                          handleComment(imageModal);
                        }}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Comment</span>
                      </Button>
                      <Button
                        onClick={() => handleShare(memories.find(m => m.id === imageModal))}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PolaroidMemories;