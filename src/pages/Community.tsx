import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, MessageSquare, Calendar, Trophy } from "lucide-react";

const Community = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              Join Our Community
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect with fellow students and celebrate college memories together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-sunset p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Active Members</h3>
              <p className="text-muted-foreground mb-4">
                Join over 10,000+ college students who are actively sharing and preserving their memories on our platform.
              </p>
              <div className="retro-handwritten text-retro-purple">
                "Growing every day..."
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-vintage p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Guidelines</h3>
              <p className="text-muted-foreground mb-4">
                We believe in creating a positive, respectful environment where everyone can share their memories safely.
              </p>
              <div className="retro-handwritten text-vintage-teal">
                "Respect & kindness first..."
              </div>
            </div>
          </div>

          <div className="bg-gradient-warm p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Community Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-retro-purple" />
                <h4 className="font-semibold mb-2">Event Updates</h4>
                <p className="text-sm text-muted-foreground">Stay updated with upcoming college events and festivals</p>
              </div>
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-3 text-retro-purple" />
                <h4 className="font-semibold mb-2">Memory Contests</h4>
                <p className="text-sm text-muted-foreground">Participate in monthly photo contests and win prizes</p>
              </div>
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 text-retro-purple" />
                <h4 className="font-semibold mb-2">Discussion Forums</h4>
                <p className="text-sm text-muted-foreground">Connect with students from different colleges and events</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Community Rules</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Respect all community members and their memories</li>
                <li>• Only upload photos you have permission to share</li>
                <li>• Keep content appropriate and family-friendly</li>
                <li>• No spam, harassment, or inappropriate behavior</li>
                <li>• Help others discover and enjoy college memories</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
              <p className="text-muted-foreground mb-4">
                There are many ways to be an active part of our community:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Share your favorite college memories</li>
                <li>• Comment and react to others' photos</li>
                <li>• Participate in community events and contests</li>
                <li>• Help new members get started</li>
                <li>• Report any issues or suggest improvements</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center bg-gradient-retro p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Ready to Connect?</h3>
            <p className="text-white/90 mb-6">
              Join our vibrant community today and start sharing your college memories!
            </p>
            <div className="retro-handwritten text-white text-lg">
              "Your memories, our community"
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Community;