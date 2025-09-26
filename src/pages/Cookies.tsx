import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cookie, Settings, BarChart, Shield } from "lucide-react";

const Cookies = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn about how we use cookies to improve your experience
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 26, 2024
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-sunset p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <Cookie className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">What Are Cookies?</h3>
              <p className="text-muted-foreground">
                Cookies are small text files stored on your device that help us provide a better, more personalized experience on Memories.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-vintage p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Your Control</h3>
              <p className="text-muted-foreground">
                You have full control over cookie settings and can manage your preferences through your browser or our cookie settings.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground mb-6">
                We use cookies to enhance your experience on Memories in several ways:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-retro p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground">Required for basic site functionality and security</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-warm p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-retro-purple" />
                  </div>
                  <h3 className="font-semibold mb-2">Preference Cookies</h3>
                  <p className="text-sm text-muted-foreground">Remember your settings and customizations</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-sunset p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">Help us understand how you use the site</p>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-500" />
                    Essential Cookies (Always Active)
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Authentication and session management</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Load balancing and performance</li>
                    <li>• Basic site functionality</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-500" />
                    Preference Cookies
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies remember your choices and preferences to provide a personalized experience.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Theme and display preferences</li>
                    <li>• Language settings</li>
                    <li>• Layout customizations</li>
                    <li>• Notification preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                    Analytics Cookies
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Page views and user journeys</li>
                    <li>• Feature usage statistics</li>
                    <li>• Performance monitoring</li>
                    <li>• Error tracking and debugging</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground mb-4">
                You have several options for managing cookies:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Browser Settings</h3>
                  <p className="text-muted-foreground">
                    Most browsers allow you to control cookies through their settings. You can choose to accept, reject, or be notified about cookies.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cookie Banner</h3>
                  <p className="text-muted-foreground">
                    When you first visit Memories, you'll see a cookie banner where you can accept or customize your cookie preferences.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                  <p className="text-muted-foreground">
                    Logged-in users can manage cookie preferences through their account settings page.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party services that set their own cookies:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Analytics providers (Google Analytics, etc.)</li>
                <li>• Social media integrations</li>
                <li>• Content delivery networks</li>
                <li>• Customer support tools</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These third parties have their own privacy policies and cookie practices. We recommend reviewing their policies for more information.
              </p>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Impact of Disabling Cookies</h2>
              <p className="text-muted-foreground mb-4">
                If you disable certain cookies, some features may not work properly:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You may need to log in repeatedly</li>
                <li>• Your preferences may not be saved</li>
                <li>• Some personalized features may be unavailable</li>
                <li>• Site performance may be affected</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Essential cookies cannot be disabled as they're required for basic functionality.
              </p>
            </section>

            <section className="bg-gradient-warm p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Questions About Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <p className="text-muted-foreground">
                Email: privacy@memories.college
              </p>
              <div className="retro-handwritten text-retro-purple text-lg mt-4">
                "Transparency in every cookie"
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Cookies;