import React from 'react';
import RetroImage from './RetroImage';
import ImageGallery from './ImageGallery';
import { Button } from './ui/button';

// Example component showing different RetroImage variants
const RetroImageShowcase = () => {
  // Sample images for demonstration
  const sampleImages = [
    {
      id: '1',
      src: '/assets/polaroid-1.webp',
      alt: 'Freshers Welcome Event',
      caption: 'Freshers Welcome 2024',
      sticker: '🎊 Epic!'
    },
    {
      id: '2', 
      src: '/assets/polaroid-2.webp',
      alt: 'Rock Concert Performance',
      caption: 'Rock Concert Night',
      sticker: '🎸 Lit!'
    },
    {
      id: '3',
      src: '/assets/polaroid-3.webp', 
      alt: 'Food Festival Celebration',
      caption: 'Food Festival Fun',
      sticker: '🍕 Yum!'
    }
  ];

  const handleImageClick = (image: any) => {
    console.log('Image clicked:', image);
  };

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="retro-handwritten text-retro-purple text-xl mb-4">
            ~ Dynamic Image Components ~
          </div>
          <h2 className="retro-heading text-4xl md:text-5xl text-foreground mb-6">
            Retro Image Showcase
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reusable image components with retro styling, hover effects, and responsive design
          </p>
        </div>

        {/* Individual Image Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <div className="text-center">
            <h3 className="retro-heading text-lg mb-4">Polaroid Style</h3>
            <RetroImage
              src="/assets/polaroid-1.webp"
              alt="Polaroid example"
              variant="polaroid"
              size="md"
              caption="Vintage Memory"
              sticker="📸 Cool!"
              rotation="slight"
            />
          </div>

          <div className="text-center">
            <h3 className="retro-heading text-lg mb-4">Card Style</h3>
            <RetroImage
              src="/assets/polaroid-2.webp"
              alt="Card example"
              variant="card"
              size="md"
              aspectRatio="square"
            />
          </div>

          <div className="text-center">
            <h3 className="retro-heading text-lg mb-4">Circular</h3>
            <RetroImage
              src="/assets/polaroid-3.webp"
              alt="Circular example"
              variant="circular"
              size="md"
            />
          </div>

          <div className="text-center">
            <h3 className="retro-heading text-lg mb-4">Sticker Style</h3>
            <RetroImage
              src="/assets/polaroid-1.webp"
              alt="Sticker example"
              variant="sticker"
              size="md"
              sticker="✨ New!"
              rotation="slight"
            />
          </div>

          <div className="text-center">
            <h3 className="retro-heading text-lg mb-4">Hero Style</h3>
            <div className="h-32">
              <RetroImage
                src="/assets/hero-collage.webp"
                alt="Hero example"
                variant="hero"
                size="full"
                caption="Hero Overlay"
                overlay
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Gallery Component */}
        <div className="mb-16">
          <h3 className="retro-heading text-2xl text-center mb-8">Gallery Component</h3>
          <ImageGallery
            images={sampleImages}
            variant="polaroid"
            columns={3}
            gap="md"
            onImageClick={handleImageClick}
          />
        </div>

        {/* Masonry Layout */}
        <div className="mb-16">
          <h3 className="retro-heading text-2xl text-center mb-8">Masonry Layout</h3>
          <ImageGallery
            images={[...sampleImages, ...sampleImages]} // Duplicate for demo
            variant="masonry"
            gap="md"
            onImageClick={handleImageClick}
          />
        </div>

        {/* Interactive Demo */}
        <div className="text-center">
          <Button
            size="lg"
            className="btn-retro text-white font-medium px-8"
            style={{
              background: 'var(--gradient-vintage)',
              border: 'none'
            }}
          >
            🖼️ Add More Images
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RetroImageShowcase;