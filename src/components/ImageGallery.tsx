import React from 'react';
import RetroImage from './RetroImage';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  sticker?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  variant?: 'polaroid' | 'card' | 'masonry';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  onImageClick?: (image: GalleryImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  variant = 'polaroid',
  gap = 'md',
  className,
  onImageClick
}) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12'
  };

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const containerClasses = cn(
    'grid',
    columnClasses[columns],
    gapClasses[gap],
    variant === 'masonry' && 'masonry-grid',
    className
  );

  return (
    <div className="w-full">
      {variant === 'masonry' ? (
        // Masonry layout for varied image sizes
        <div className={cn('columns-1 md:columns-2 lg:columns-3', gapClasses[gap])}>
          {images.map((image, index) => (
            <div key={image.id} className="break-inside-avoid mb-4 md:mb-6">
              <RetroImage
                src={image.src}
                alt={image.alt}
                variant="card"
                size="full"
                aspectRatio="auto"
                rotation="random"
                caption={image.caption}
                sticker={image.sticker}
                onClick={() => onImageClick?.(image)}
                className="w-full animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            </div>
          ))}
        </div>
      ) : (
        // Regular grid layout
        <div className={containerClasses}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RetroImage
                src={image.src}
                alt={image.alt}
                variant={variant}
                size="full"
                aspectRatio="square"
                rotation={variant === 'polaroid' ? 'random' : 'none'}
                caption={image.caption}
                sticker={image.sticker}
                onClick={() => onImageClick?.(image)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;