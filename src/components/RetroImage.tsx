import React from 'react';
import { cn } from '@/lib/utils';

export interface RetroImageProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 'polaroid' | 'card' | 'hero' | 'circular' | 'sticker';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
  rotation?: 'none' | 'slight' | 'random';
  overlay?: boolean;
  caption?: string;
  sticker?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const RetroImage: React.FC<RetroImageProps> = ({
  src,
  alt,
  className,
  variant = 'card',
  size = 'md',
  aspectRatio = 'auto',
  rotation = 'none',
  overlay = false,
  caption,
  sticker,
  onClick,
  style,
}) => {
  // Generate random rotation for 'random' option
  const getRotation = () => {
    if (rotation === 'random') {
      const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-3'];
      return rotations[Math.floor(Math.random() * rotations.length)];
    }
    if (rotation === 'slight') {
      return Math.random() > 0.5 ? 'rotate-1' : '-rotate-1';
    }
    return '';
  };

  const rotationClass = getRotation();

  // Size classes
  const sizeClasses = {
    sm: 'w-24 h-24 md:w-32 md:h-32',
    md: 'w-32 h-32 md:w-48 md:h-48',
    lg: 'w-48 h-48 md:w-64 md:h-64',
    xl: 'w-64 h-64 md:w-80 md:h-80',
    full: 'w-full h-full'
  };

  // Aspect ratio classes
  const aspectClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: ''
  };

  // Variant-specific styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'polaroid':
        return cn(
          'polaroid-frame bg-card p-3 pb-6 transform transition-all duration-300',
          'hover:scale-105 hover:-rotate-1 cursor-pointer group',
          rotationClass
        );
      
      case 'card':
        return cn(
          'retro-card overflow-hidden transform transition-all duration-300',
          'hover:scale-[1.02] hover:-translate-y-1',
          rotationClass
        );
      
      case 'hero':
        return cn(
          'relative overflow-hidden rounded-2xl',
          'transform transition-all duration-500',
          'hover:scale-[1.01]'
        );
      
      case 'circular':
        return cn(
          'rounded-full overflow-hidden border-4 border-card',
          'transform transition-all duration-300 hover:scale-110',
          'shadow-vintage'
        );
      
      case 'sticker':
        return cn(
          'rounded-lg overflow-hidden transform transition-all duration-300',
          'hover:scale-105 hover:rotate-2 cursor-pointer',
          'shadow-polaroid',
          rotationClass
        );
      
      default:
        return '';
    }
  };

  const containerClasses = cn(
    'relative',
    variant !== 'hero' && sizeClasses[size],
    aspectClasses[aspectRatio],
    getVariantClasses(),
    onClick && 'cursor-pointer',
    className
  );

  const imageClasses = cn(
    'w-full h-full object-cover transition-transform duration-300',
    variant === 'polaroid' && 'group-hover:scale-110',
    variant === 'card' && 'hover:scale-105',
    variant === 'hero' && 'hover:scale-[1.02]',
    variant === 'sticker' && 'hover:scale-110'
  );

  return (
    <div className={containerClasses} onClick={onClick} style={style}>
      {/* Sticker overlay */}
      {sticker && (
        <div className="vintage-sticker bg-gradient-sunset text-white text-xs -top-2 -right-2 z-10">
          {sticker}
        </div>
      )}
      
      {/* Image container with optional overlay */}
      <div className={cn(
        'relative overflow-hidden',
        variant === 'polaroid' ? 'rounded-sm' : 'rounded-lg',
        variant === 'circular' && 'rounded-full',
        aspectRatio !== 'auto' && aspectClasses[aspectRatio]
      )}>
        <img
          src={src}
          alt={alt}
          className={imageClasses}
          loading="lazy"
        />
        
        {/* Gradient overlay for hero variant */}
        {overlay && variant === 'hero' && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        )}
        
        {/* Subtle overlay for better text readability */}
        {caption && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
      
      {/* Caption for polaroid variant */}
      {caption && variant === 'polaroid' && (
        <div className="mt-2 space-y-1">
          <p className="retro-handwritten text-muted-foreground text-sm text-center">
            {caption}
          </p>
        </div>
      )}
      
      {/* Hero text overlay */}
      {caption && variant === 'hero' && (
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="retro-heading text-lg md:text-xl mb-2">
            {caption}
          </h3>
        </div>
      )}
    </div>
  );
};

export default RetroImage;