import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePosts, Post } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import RetroImage from './RetroImage';

interface PostCardProps {
  post: Post;
  onCommentClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onCommentClick }) => {
  const { user } = useAuth();
  const { toggleLike, toggleSave, sharePost } = usePosts();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title || 'Check out this post',
          text: post.description || '',
          url: shareUrl
        });
        await sharePost(post.id);
      } catch (err) {
        // Fallback to copying URL
        await navigator.clipboard.writeText(shareUrl);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <Card className="retro-card group hover:shadow-retro transition-all duration-300">
      <CardContent className="p-0">
        {/* Image */}
        {post.media_url && (
          <div className="relative mb-4">
            <RetroImage 
              src={post.media_url} 
              alt={post.title || 'Post image'} 
              variant="polaroid" 
              size="full" 
              aspectRatio="landscape"
              className="w-full"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {post.title && (
            <h3 className="retro-heading text-xl font-bold text-foreground mb-2">
              {post.title}
            </h3>
          )}

          {post.description && (
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {post.description}
            </p>
          )}

          {post.content && (
            <p className="text-foreground mb-4">
              {post.content}
            </p>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            {post.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{post.location}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-gradient-vintage text-white text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLike(post.id)}
              className={`flex items-center space-x-2 transition-colors ${
                post.user_liked 
                  ? 'text-sunset-orange hover:text-sunset-orange/80' 
                  : 'text-muted-foreground hover:text-sunset-orange'
              }`}
            >
              <Heart className={`h-5 w-5 ${post.user_liked ? 'fill-current' : ''}`} />
              <span>{post.likes_count || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onCommentClick}
              className="flex items-center space-x-2 text-muted-foreground hover:text-vintage-teal transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments_count || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-muted-foreground hover:text-retro-purple transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span>{post.shares_count || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSave(post.id)}
              className={`flex items-center space-x-2 transition-colors ${
                post.user_saved 
                  ? 'text-vintage-teal hover:text-vintage-teal/80' 
                  : 'text-muted-foreground hover:text-vintage-teal'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${post.user_saved ? 'fill-current' : ''}`} />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;