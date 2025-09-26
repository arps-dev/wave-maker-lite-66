import React, { useState } from 'react';
import { X, Heart, MessageCircle, Share2, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  likes: number;
  comments: number;
  uniqueUrl: string;
  uploadedBy?: string;
  uploadedAt?: string;
}

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageData | null;
  onLike?: (imageId: string) => void;
  onComment?: (imageId: string) => void;
  isLiked?: boolean;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  image,
  onLike,
  onComment,
  isLiked = false
}) => {
  const [copied, setCopied] = useState(false);

  if (!image) return null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/gallery/${image.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description || `Check out this amazing photo: ${image.title}`,
          url: shareUrl
        });
      } catch (err) {
        // Fallback to copying URL
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
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
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started 📥",
      description: `Downloading ${image.title}...`,
    });
  };

  const shareUrl = `${window.location.origin}/gallery/${image.id}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
        <DialogTitle className="sr-only">{image.title}</DialogTitle>
        
        {/* Header with close button */}
        <div className="absolute top-4 right-4 z-50">
          <Button
            onClick={onClose}
            variant="secondary"
            size="sm"
            className="rounded-full w-8 h-8 p-0 bg-background/80 hover:bg-background"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 h-[80vh] max-h-[600px]">
          {/* Image Section */}
          <div className="relative bg-background flex items-center justify-center p-4">
            <img
              src={image.src}
              alt={image.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-6 bg-card/50">
            {/* Title and Description */}
            <div className="flex-1">
              <h2 className="retro-heading text-2xl font-bold text-foreground mb-2">
                {image.title}
              </h2>
              
              {image.description && (
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {image.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => onLike?.(image.id)}
                  className={`flex items-center space-x-1 transition-colors hover:scale-105 ${
                    isLiked 
                      ? 'text-sunset-orange' 
                      : 'text-muted-foreground hover:text-sunset-orange'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{image.likes}</span>
                </button>
                
                <button
                  onClick={() => onComment?.(image.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-vintage-teal transition-colors hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{image.comments}</span>
                </button>
              </div>

              {/* Upload Info */}
              {(image.uploadedBy || image.uploadedAt) && (
                <div className="text-sm text-muted-foreground mb-6 space-y-1">
                  {image.uploadedBy && <div>Uploaded by: {image.uploadedBy}</div>}
                  {image.uploadedAt && <div>Date: {image.uploadedAt}</div>}
                </div>
              )}
            </div>

            {/* Share URL Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Unique Image URL
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;