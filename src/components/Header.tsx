import { Camera, Home, Image, Clock, Search, User, Menu, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleUpload = () => {
    navigate("/upload");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/gallery", icon: Image, label: "Gallery" },
    { to: "/golden-moments", icon: Clock, label: "Golden Moments" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-sunset p-2 rounded-full group-hover:scale-110 transition-transform duration-200">
                <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent">
                Memories
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:rounded-md px-2 py-1 ${
                    isActiveRoute(to)
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <Button 
              onClick={handleUpload}
              className="hidden lg:flex btn-retro text-white font-medium hover:scale-105 transition-transform duration-200"
              style={{
                background: 'var(--gradient-sunset)',
                border: 'none'
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>

            {/* Tablet Navigation (md to lg) */}
            <nav className="hidden md:flex lg:hidden items-center space-x-3">
              {navigationItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-1 transition-colors duration-200 px-2 py-1 text-xs xl:text-sm ${
                    isActiveRoute(to)
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  <Icon className="h-3 w-3 xl:h-4 xl:w-4" />
                  <span className="font-medium hidden xl:inline">{label}</span>
                </Link>
              ))}
              <Button 
                onClick={handleUpload}
                size="sm"
                className="btn-retro text-white font-medium ml-2"
                style={{
                  background: 'var(--gradient-sunset)',
                  border: 'none'
                }}
              >
                <Upload className="h-3 w-3 xl:h-4 xl:w-4" />
                <span className="hidden xl:inline ml-1">Upload</span>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden hover:bg-accent"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/98 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActiveRoute(to)
                      ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
              
              {/* Mobile Upload Button */}
              <Button 
                onClick={handleUpload}
                className="w-full mt-4 btn-retro text-white font-medium py-3"
                style={{
                  background: 'var(--gradient-sunset)',
                  border: 'none'
                }}
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Photos
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;