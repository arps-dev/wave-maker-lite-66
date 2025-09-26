import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroCollage from "@/assets/hero-collage.webp";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleExploreGallery = () => {
    navigate("/gallery");
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroCollage})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating Retro Elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <div className="vintage-sticker bg-gradient-retro text-white animate-float">
          ✨ New!
        </div>
      </div>
      
      <div className="absolute top-32 right-16 hidden lg:block">
        <div className="vintage-sticker bg-gradient-vintage text-white animate-float" style={{ animationDelay: '1s' }}>
          📸 Fest '24
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="retro-handwritten text-sunset-orange text-lg md:text-xl mb-4 animate-wiggle">
          ~ College Fest Memories ~
        </div>
        
        <h1 className="retro-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
          Relive Your
          <br />
          <span className="bg-gradient-sunset bg-clip-text text-transparent">
            Fest Memories
          </span>
        </h1>
        
        <p className="text-warm-cream text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Step into a nostalgic journey through your college fest moments. 
          Discover, share, and cherish every captured memory in our retro-styled digital album.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={handleSignUp}
            className="btn-retro text-white font-medium px-8 py-4 text-lg"
            style={{
              background: 'var(--gradient-sunset)',
              border: 'none'
            }}
          >
            🚀 Sign Up Now
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={handleExploreGallery}
            className="border-2 border-white/80 text-foreground bg-white/90 hover:bg-white hover:text-foreground font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-colors duration-200 backdrop-blur-sm"
          >
            🔍 Explore Gallery
          </Button>
        </div>

        {/* Retro Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">5K+</div>
            <div className="text-warm-cream text-sm">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
            <div className="text-warm-cream text-sm">Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">1K+</div>
            <div className="text-warm-cream text-sm">Students</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;