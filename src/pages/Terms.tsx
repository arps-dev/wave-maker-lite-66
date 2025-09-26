import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Users, AlertTriangle, Scale } from "lucide-react";

const Terms = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using Memories
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: December 26, 2024
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-sunset p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">User Agreement</h3>
              <p className="text-muted-foreground">
                By using Memories, you agree to these terms and our community guidelines for sharing college memories.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="bg-gradient-vintage p-4 rounded-full w-16 h-16 mb-4 flex items-center justify-center">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fair Use</h3>
              <p className="text-muted-foreground">
                These terms ensure fair use of our platform while protecting the rights of all users and their content.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using the Memories platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of any changes.
              </p>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Users className="h-6 w-6 mr-3 text-primary" />
                User Responsibilities
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Security</h3>
                  <p className="text-muted-foreground">
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Content Ownership</h3>
                  <p className="text-muted-foreground">
                    You must own or have permission to upload any photos or content you share. You are solely responsible for ensuring you have the right to share all uploaded content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Appropriate Use</h3>
                  <p className="text-muted-foreground">
                    You agree to use the service only for lawful purposes and in accordance with our community guidelines. Harassment, spam, or inappropriate content is strictly prohibited.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Content Policy</h2>
              <p className="text-muted-foreground mb-4">
                By uploading content to Memories, you agree that:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You own the rights to the content or have permission to share it</li>
                <li>• The content does not violate any laws or third-party rights</li>
                <li>• The content is appropriate for a college community platform</li>
                <li>• You grant us a license to store, display, and share your content as per your privacy settings</li>
                <li>• You will not upload content that is offensive, harmful, or inappropriate</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive to provide a reliable service, but we cannot guarantee:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Uninterrupted access to the service</li>
                <li>• Error-free operation at all times</li>
                <li>• Compatibility with all devices or browsers</li>
                <li>• Permanent storage of content (though we make best efforts)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We recommend keeping backups of important photos and content.
              </p>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-primary" />
                Prohibited Activities
              </h2>
              <p className="text-muted-foreground mb-4">
                The following activities are strictly prohibited:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Uploading content that violates copyright or other intellectual property rights</li>
                <li>• Sharing personal information of others without consent</li>
                <li>• Using the service to harass, bully, or harm others</li>
                <li>• Attempting to hack, disrupt, or compromise the service</li>
                <li>• Creating fake accounts or impersonating others</li>
                <li>• Uploading malicious code or spam content</li>
                <li>• Commercial use without explicit permission</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The Memories platform, including its design, features, and code, is protected by intellectual property laws. Users retain ownership of their uploaded content but grant us necessary licenses to operate the service.
              </p>
              <p className="text-muted-foreground">
                Respect the intellectual property rights of others and only upload content you have the right to share.
              </p>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                Memories is provided "as is" without warranties of any kind. We shall not be liable for any damages arising from the use or inability to use the service, including but not limited to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Loss of data or content</li>
                <li>• Service interruptions or downtime</li>
                <li>• Unauthorized access to your account</li>
                <li>• Actions of other users</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account if you violate these terms. You may also delete your account at any time through your profile settings.
              </p>
              <p className="text-muted-foreground">
                Upon termination, your access to the service will cease, and we may delete your content after a reasonable grace period.
              </p>
            </section>

            <section className="bg-gradient-warm p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: legal@memories.college
              </p>
              <div className="retro-handwritten text-retro-purple text-lg mt-4">
                "Fair terms for everyone"
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Terms;