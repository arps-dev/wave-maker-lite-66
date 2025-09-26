import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, HelpCircle, Book, MessageSquare, Video, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              Help Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to your questions and learn how to make the most of Memories
            </p>
          </div>

          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help articles..." 
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="bg-gradient-sunset p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                Learn the basics of uploading, organizing, and sharing your memories
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="bg-gradient-vintage p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">
                Watch step-by-step video guides for all major features
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="bg-gradient-retro p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Our support team is here to help
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  How do I upload photos to Memories?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  To upload photos, navigate to the Upload page from the main menu. You can drag and drop multiple files or click to browse your device. Add titles, descriptions, and tags to make your photos easily discoverable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Can I share my photos with friends?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Each photo has a share button that generates a unique link. You can also create collections of photos to share multiple memories at once. Your friends don't need an account to view shared photos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  How do I organize my photos?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You can organize photos using tags, event names, and dates. The search feature helps you find specific photos quickly. You can also create custom albums for different events or themes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Is my data safe and private?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! We use industry-standard encryption to protect your photos and data. You control who can see your photos - they're private by default unless you choose to share them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What file formats are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We support all common image formats including JPEG, PNG, GIF, and WebP. For best quality, we recommend uploading high-resolution images - we'll automatically optimize them for viewing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  How can I delete photos or my account?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You can delete individual photos from your gallery at any time. To delete your account, go to Profile Settings and select "Delete Account". This action is permanent and cannot be undone.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-warm p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-retro-purple" />
                Documentation
              </h3>
              <p className="text-muted-foreground mb-4">
                Detailed guides and tutorials for advanced features and customization options.
              </p>
              <div className="retro-handwritten text-retro-purple">
                "Everything you need to know..."
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                Still Need Help?
              </h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is ready to help you out.
              </p>
              <p className="text-sm text-accent">
                Average response time: 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Help;