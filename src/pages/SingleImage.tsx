import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Download, Share2, Copy, Check, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useUploadedImages } from '@/hooks/useUploadedImages';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import polaroid1 from '@/assets/polaroid-1.webp';
import polaroid2 from '@/assets/polaroid-2.webp';
import polaroid3 from '@/assets/polaroid-3.webp';

const SingleImage = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const { uploadedImages, updateImageStats } = useUploadedImages();
  const [image, setImage] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{[key: string]: Array<{id: number, text: string, author: string, time: string}>}>({
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
      comments: 0,
      uploadedBy: 'Sarah Johnson',
      uploadedAt: 'March 15, 2023'
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
      comments: 0,
      uploadedBy: 'Mike Chen',
      uploadedAt: 'June 20, 2023'
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
      comments: 0,
      uploadedBy: 'Emma Rodriguez',
      uploadedAt: 'April 12, 2023'
    }
  ];

  useEffect(() => {
    if (imageId) {
      // Find image in both static gallery items and uploaded images
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
      
      const allItems = [...galleryItems, ...uploadedGalleryItems];
      const foundItem = allItems.find(item => item.id === imageId);
      
      if (foundItem) {
        setImage(foundItem);
        // Update view count for uploaded images
        const uploadedImg = uploadedImages.find(img => img.id === imageId);
        if (uploadedImg) {
          updateImageStats(imageId, { views: uploadedImg.views + 1 });
        }
      } else {
        // Image not found, redirect to gallery
        navigate('/gallery');
      }
    }
  }, [imageId, uploadedImages, navigate]);

  const handleLike = () => {
    if (!image) return;
    
    setIsLiked(!isLiked);
    const newLikes = isLiked ? image.likes - 1 : image.likes + 1;
    setImage({ ...image, likes: newLikes });
    
    // Update uploaded image stats if it's an uploaded image
    const uploadedImg = uploadedImages.find(img => img.id === image.id);
    if (uploadedImg) {
      updateImageStats(image.id, { likes: newLikes });
    }
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites ❤️",
      description: isLiked ? "Photo removed from your favorites" : "Photo added to your favorites",
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/gallery/${image.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.caption || `Check out this amazing photo: ${image.title}`,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fall through to clipboard
      }
    }
    
    copyToClipboard(shareUrl);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Link copied! 🔗",
        description: "Image link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    if (!image) return;
    
    const link = document.createElement('a');
    link.href = image.image;
    link.download = `${image.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started 📥",
      description: `Downloading ${image.title}...`,
    });
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !image) return;
    
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: "You",
      time: "Just now"
    };
    
    setComments(prev => ({
      ...prev,
      [image.id]: [...(prev[image.id] || []), newComment]
    }));
    
    // Update comment count in image
    setImage(prev => ({ ...prev, comments: prev.comments + 1 }));
    
    // Update uploaded image stats if it's an uploaded image
    const uploadedImg = uploadedImages.find(img => img.id === image.id);
    if (uploadedImg) {
      updateImageStats(image.id, { comments: uploadedImg.comments + 1 });
    }
    
    setCommentText("");
    
    toast({
      title: "Comment added! 💬",
      description: "Your comment has been shared",
    });
  };

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/gallery/${image.id}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/gallery')}
          variant="ghost"
          className="mb-6 hover:bg-secondary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Gallery
        </Button>

        {/* Image Display */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Image Section */}
            <div className="relative">
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="retro-heading text-3xl font-bold text-foreground mb-2">
                  {image.title}
                </h1>
                
                {image.caption && (
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    {image.caption}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center space-x-6 mb-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-colors hover:scale-105 ${
                      isLiked 
                        ? 'text-sunset-orange' 
                        : 'text-muted-foreground hover:text-sunset-orange'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-lg font-medium">{image.likes}</span>
                  </button>
                  
                  <button
                    onClick={handleComment}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-vintage-teal transition-colors hover:scale-105"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-lg font-medium">{image.comments}</span>
                  </button>
                </div>

                {/* Upload Info */}
                <div className="bg-card/50 rounded-lg p-4 space-y-2">
                  {image.uploadedBy && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Uploaded by:</span> {image.uploadedBy}
                    </div>
                  )}
                  {image.uploadedAt && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Date:</span> {image.uploadedAt}
                    </div>
                  )}
                  {image.location && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Location:</span> {image.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Share URL Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Share this image
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      readOnly
                      value={shareUrl}
                      className="font-mono text-xs"
                    />
                    <Button
                      onClick={() => copyToClipboard(shareUrl)}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Comments Section */}
              {showComments && (
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Comments ({comments[image.id]?.length || 0})</h3>
                      <Button
                        onClick={() => setShowComments(false)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Add Comment */}
                    <div className="mb-6">
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="mb-3 resize-none"
                        rows={3}
                      />
                      <Button
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        size="sm"
                        className="w-full"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {comments[image.id]?.map((comment) => (
                        <div key={comment.id} className="flex space-x-3 p-3 bg-secondary/50 rounded-lg">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-sm text-foreground">{comment.text}</p>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center py-8 text-muted-foreground">
                          No comments yet. Be the first to comment!
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleImage;