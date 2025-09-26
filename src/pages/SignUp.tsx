import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Mail, Lock, User, Phone, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful signup
    toast({
      title: "Welcome to Memories! 🎉",
      description: "Your account has been created successfully. Welcome to the community!",
    });
    
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <CardTitle className="text-2xl retro-heading">Join Our Community</CardTitle>
          <CardDescription className="retro-handwritten text-base">
            ~ Start capturing your fest memories ~
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                required
                className="retro-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@college.edu"
                required
                className="retro-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="retro-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="college" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>College/University</span>
              </Label>
              <Input
                id="college"
                value={formData.college}
                onChange={(e) => handleInputChange("college", e.target.value)}
                placeholder="Enter your college name"
                required
                className="retro-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a strong password"
                required
                className="retro-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Confirm Password</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                required
                className="retro-input"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full btn-retro text-white font-medium py-3 text-lg"
              style={{
                background: 'var(--gradient-sunset)',
                border: 'none'
              }}
            >
              🚀 Create Account
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="retro-handwritten text-muted-foreground">
              Already have an account?
            </div>
            <Link 
              to="/profile" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign In Here
            </Link>
          </div>

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

export default SignUp;