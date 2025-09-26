import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, Database } from "lucide-react";

const Privacy = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 26, 2024
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-sunset p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Protection</h3>
              <p className="text-muted-foreground">
                We use industry-standard security measures to protect your personal information and photos from unauthorized access.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-vintage p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in being transparent about what data we collect, how we use it, and who we share it with.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Database className="h-6 w-6 mr-3 text-primary" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                  <p className="text-muted-foreground">
                    When you create an account, we collect your name, email address, and profile information you choose to provide.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Photos and Content</h3>
                  <p className="text-muted-foreground">
                    We store the photos you upload along with any captions, tags, or metadata you add to help organize your memories.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Usage Data</h3>
                  <p className="text-muted-foreground">
                    We collect information about how you use our service, including pages visited, features used, and interaction patterns.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-3 text-primary" />
                How We Use Your Information
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Provide and maintain our photo sharing service</li>
                <li>• Process and store your uploaded photos securely</li>
                <li>• Improve our service based on usage patterns</li>
                <li>• Send important service updates and notifications</li>
                <li>• Provide customer support when you need help</li>
                <li>• Ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information to third parties. We may share your information only in these limited circumstances:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• With your explicit consent</li>
                <li>• To comply with legal obligations</li>
                <li>• To protect against fraud or security threats</li>
                <li>• With service providers who help us operate our platform (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have control over your data and privacy. Your rights include:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Access your personal information we have stored</li>
                <li>• Request corrections to your personal information</li>
                <li>• Delete your photos and account at any time</li>
                <li>• Control who can see your shared photos</li>
                <li>• Opt out of non-essential communications</li>
                <li>• Download your data in a portable format</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• End-to-end encryption for data transmission</li>
                <li>• Secure data centers with 24/7 monitoring</li>
                <li>• Regular security audits and updates</li>
                <li>• Access controls and authentication requirements</li>
                <li>• Incident response procedures</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to improve your experience:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Essential cookies for site functionality</li>
                <li>• Analytics cookies to understand usage patterns</li>
                <li>• Preference cookies to remember your settings</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="bg-gradient-warm p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Questions About Privacy?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us.
              </p>
              <p className="text-muted-foreground">
                Email: privacy@memories.college
              </p>
              <div className="retro-handwritten text-retro-purple text-lg mt-4">
                "Your privacy, our priority"
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Privacy;