import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, resetPassword, user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    displayName: ""
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(signUpData.email, signUpData.password, {
      username: signUpData.username,
      display_name: signUpData.displayName
    });

    if (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome to Memories! 🎉",
        description: "Please check your email to verify your account.",
      });
    }

    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back! 👋",
        description: "You've been signed in successfully.",
      });
      navigate("/");
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await resetPassword(forgotPasswordEmail);

    if (error) {
      toast({
        title: "Reset Failed",
        description: error.message || "Failed to send reset email.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Reset Email Sent 📧",
        description: "Check your email for password reset instructions.",
      });
    }

    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-sunset opacity-20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-vintage opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-retro opacity-20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 retro-card border-2">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-gradient-sunset p-3 rounded-full">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent">
              Memories
            </h1>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <div className="text-center space-y-2">
                <CardTitle className="text-xl retro-heading">Welcome Back</CardTitle>
                <CardDescription className="retro-handwritten text-base">
                  ~ Sign in to your account ~
                </CardDescription>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@college.edu"
                    required
                    className="retro-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      value={signInData.password}
                      onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      required
                      className="retro-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn-retro text-white font-medium py-3 text-lg"
                  style={{
                    background: 'var(--gradient-sunset)',
                    border: 'none'
                  }}
                >
                  {isLoading ? "Signing In..." : "🚀 Sign In"}
                </Button>
              </form>

              <Tabs defaultValue="" className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="forgot">Forgot Password?</TabsTrigger>
                </TabsList>
                
                <TabsContent value="forgot" className="space-y-4 mt-4">
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email Address</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        placeholder="your.email@college.edu"
                        required
                        className="retro-input"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      variant="outline"
                      className="w-full"
                    >
                      {isLoading ? "Sending..." : "Send Reset Email"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="text-center space-y-2">
                <CardTitle className="text-xl retro-heading">Join Our Community</CardTitle>
                <CardDescription className="retro-handwritten text-base">
                  ~ Start capturing your memories ~
                </CardDescription>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Username</span>
                    </Label>
                    <Input
                      id="username"
                      value={signUpData.username}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="cooluser123"
                      required
                      className="retro-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={signUpData.displayName}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Cool User"
                      required
                      className="retro-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@college.edu"
                    required
                    className="retro-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a strong password"
                      required
                      className="retro-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Confirm Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      required
                      className="retro-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn-retro text-white font-medium py-3 text-lg"
                  style={{
                    background: 'var(--gradient-sunset)',
                    border: 'none'
                  }}
                >
                  {isLoading ? "Creating Account..." : "🚀 Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-border">
            <Link 
              to="/" 
              className="flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>← Back to Home</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;