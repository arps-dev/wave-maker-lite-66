import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Search, Share, Heart } from "lucide-react";

const HowItWorks = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground">
              Simple steps to preserve and share your college memories
            </p>
          </div>

          <div className="space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-gradient-sunset p-6 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">1. Upload Your Photos</h2>
                <p className="text-muted-foreground mb-4">
                  Start by uploading your favorite fest photos. Our platform supports various formats and automatically optimizes them for the best viewing experience.
                </p>
                <p className="text-muted-foreground">
                  Add tags, descriptions, and event details to make your memories easily searchable and organized.
                </p>
              </div>
              <div className="md:w-1/2 bg-gradient-warm p-8 rounded-lg">
                <div className="retro-handwritten text-retro-purple text-lg">
                  "Every photo has a story..."
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-gradient-vintage p-6 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">2. Discover & Explore</h2>
                <p className="text-muted-foreground mb-4">
                  Browse through our vintage-inspired gallery to discover memories from various college events and festivals.
                </p>
                <p className="text-muted-foreground">
                  Use our smart search features to find specific moments, people, or events that matter to you.
                </p>
              </div>
              <div className="md:w-1/2 bg-gradient-retro p-8 rounded-lg">
                <div className="retro-handwritten text-vintage-teal text-lg">
                  "Find your moments in time..."
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-gradient-retro p-6 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <Share className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">3. Share & Connect</h2>
                <p className="text-muted-foreground mb-4">
                  Share your favorite memories with friends and the college community. Create shareable links for specific photos or collections.
                </p>
                <p className="text-muted-foreground">
                  Connect with classmates and relive those unforgettable college moments together.
                </p>
              </div>
              <div className="md:w-1/2 bg-gradient-sunset p-8 rounded-lg">
                <div className="retro-handwritten text-white text-lg">
                  "Memories are better when shared..."
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-gradient-warm p-6 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <Heart className="h-10 w-10 text-retro-purple" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">4. Cherish Forever</h2>
                <p className="text-muted-foreground mb-4">
                  Your memories are safely stored and beautifully presented in our vintage-inspired interface.
                </p>
                <p className="text-muted-foreground">
                  Revisit your college days anytime and keep those precious moments alive for years to come.
                </p>
              </div>
              <div className="md:w-1/2 bg-gradient-vintage p-8 rounded-lg">
                <div className="retro-handwritten text-white text-lg">
                  "Create a legacy of memories..."
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students who are already preserving their college memories with us.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default HowItWorks;