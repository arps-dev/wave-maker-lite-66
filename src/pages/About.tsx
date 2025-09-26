import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, Users, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              About Memories
            </h1>
            <p className="text-xl text-muted-foreground">
              Preserving college fest moments in a vintage-inspired digital album
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Memories was born from the simple idea that every college fest moment deserves to be preserved and celebrated. We combine the nostalgia of vintage photography with modern technology to create a unique platform for students to share and relive their most precious memories.
              </p>
              <p className="text-muted-foreground">
                Whether it's a candid laugh with friends, a spectacular performance, or a quiet moment of reflection, every photo tells a story worth remembering.
              </p>
            </div>
            <div className="bg-gradient-warm p-8 rounded-lg">
              <div className="retro-handwritten text-retro-purple text-lg mb-4">
                "Capturing moments, creating memories"
              </div>
              <p className="text-sm text-muted-foreground">
                Our mission is to help college communities preserve their most treasured moments in a beautiful, accessible format that celebrates both the past and present.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-gradient-sunset p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Capture</h3>
              <p className="text-muted-foreground">Upload and organize your fest photos with our intuitive interface</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-vintage p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-muted-foreground">Connect with your college community and share memorable moments</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-retro p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cherish</h3>
              <p className="text-muted-foreground">Relive your favorite memories with our vintage-inspired gallery</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-6">
              Be part of a growing community of college students who value memories and connections. Share your moments, discover new perspectives, and celebrate the best of college life.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default About;