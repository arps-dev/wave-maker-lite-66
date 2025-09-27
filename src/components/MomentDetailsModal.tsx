import { useState } from 'react';
import { Heart, MapPin, Calendar, Share2, Bookmark, X, Star, MessageCircle, Eye, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RetroImage from './RetroImage';

interface MomentDetailsModalProps {
  moment: {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    date: string;
    likes: number;
    location: string;
    category: string;
    badge: { text: string; icon: any; color: string };
    tags: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (momentId: number) => void;
  onBookmark: (momentId: number) => void;
  onShare: (moment: any) => void;
  likedMoments: Set<number>;
  bookmarkedMoments: Set<number>;
}

const MomentDetailsModal = ({
  moment,
  isOpen,
  onClose,
  onLike,
  onBookmark,
  onShare,
  likedMoments,
  bookmarkedMoments
}: MomentDetailsModalProps) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');

  if (!moment) return null;

  const BadgeIcon = moment.badge.icon;

  const mockComments = [
    { id: 1, user: 'Sarah M.', comment: 'What an incredible moment! So proud of you! 🎉', time: '2 hours ago', avatar: '👩‍🎓' },
    { id: 2, user: 'Mike R.', comment: 'This gives me chills every time I see it. Pure magic! ✨', time: '5 hours ago', avatar: '🧑‍💻' },
    { id: 3, user: 'Emma K.', comment: 'I was there and it was even more amazing in person!', time: '1 day ago', avatar: '👩‍🎨' }
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment added! 💬",
        description: "Your comment has been shared",
      });
      setNewComment('');
    }
  };

  const handleViewFullImage = () => {
    toast({
      title: "Opening full image...",
      description: "Feature coming soon!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="retro-heading text-2xl font-bold text-foreground mb-2">
                  {moment.title}
                </DialogTitle>
                <p className="text-muted-foreground text-lg italic retro-handwritten">
                  {moment.subtitle}
                </p>
              </div>
              
              {/* Badge */}
              <div className={`${moment.badge.color} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-vintage ml-4`}>
                <BadgeIcon className="h-4 w-4" />
                <span>{moment.badge.text}</span>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group cursor-pointer" onClick={handleViewFullImage}>
                  <RetroImage 
                    src={moment.image} 
                    alt={moment.title} 
                    variant="polaroid" 
                    size="full" 
                    aspectRatio="landscape" 
                    rotation="none"
                    className="w-full hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => onLike(moment.id)}
                    variant="outline"
                    size="lg"
                    className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 ${
                      likedMoments.has(moment.id) 
                        ? 'bg-sunset-orange text-white border-sunset-orange hover:bg-sunset-orange/90' 
                        : 'hover:bg-sunset-orange hover:text-white hover:border-sunset-orange'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${likedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                    <span>{moment.likes + (likedMoments.has(moment.id) ? 1 : 0)}</span>
                  </Button>

                  <Button
                    onClick={() => onBookmark(moment.id)}
                    variant="outline"
                    size="lg"
                    className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 ${
                      bookmarkedMoments.has(moment.id) 
                        ? 'bg-vintage-teal text-white border-vintage-teal hover:bg-vintage-teal/90' 
                        : 'hover:bg-vintage-teal hover:text-white hover:border-vintage-teal'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${bookmarkedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                    <span>Save</span>
                  </Button>

                  <Button
                    onClick={() => onShare(moment)}
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2 hover:bg-retro-purple hover:text-white hover:border-retro-purple transition-all duration-300 hover:scale-105"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Moment Info */}
                <div className="retro-card">
                  <h3 className="retro-heading text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Star className="h-5 w-5 text-sunset-orange" />
                    <span>Moment Details</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-vintage-teal" />
                      <span className="text-foreground">{moment.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-retro-purple" />
                      <span className="text-foreground">{moment.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-4 w-4 text-sunset-orange" />
                      <span className="text-foreground capitalize">{moment.category}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {moment.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gradient-vintage text-white text-xs rounded-full shadow-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="retro-card">
                  <h3 className="retro-heading text-lg font-semibold mb-4 flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-vintage-teal" />
                    <span>Comments ({mockComments.length})</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3 p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl">{comment.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm text-foreground">{comment.user}</span>
                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="text-sm text-foreground/80">{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button 
                      onClick={handleAddComment}
                      size="sm"
                      className="bg-gradient-sunset text-white hover:scale-105 transition-all duration-300"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MomentDetailsModal;