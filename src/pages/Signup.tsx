import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { apiCall } from "@/config/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      // Submit email to backend API
      const response = await apiCall('emails', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Email submitted successfully:', email);
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit email:', result.error);
        alert('Failed to submit email. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent pointer-events-none animate-pulse" />
        
        {/* Floating success animation */}
        <div className="w-full max-w-lg relative z-10 animate-bounce-in">
          <div className="bg-white/95 backdrop-blur-lg border border-white/30 rounded-3xl p-12 text-center shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up text-green-700">
              dooza.
            </h1>
            
            <h2 className="text-2xl font-bold text-foreground mb-4 animate-fade-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
              Welcome!
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              Check your email to get started
            </p>
            
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="w-full h-12 rounded-full animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards] hover:scale-110 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Back to Home
            </Button>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-green-700/60 rounded-full animate-ping [animation-delay:1s]" />
        <div className="absolute top-20 right-20 w-2 h-2 bg-accent/60 rounded-full animate-ping [animation-delay:2s]" />
        <div className="absolute bottom-20 left-20 w-2.5 h-2.5 bg-green-700/40 rounded-full animate-ping [animation-delay:3s]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent pointer-events-none" />
      
      {/* Floating background elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-green-700/5 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="w-full max-w-lg relative z-10 animate-slide-up">
        <div className="bg-white/95 backdrop-blur-lg border border-white/30 rounded-3xl p-12 shadow-2xl">
          
          {/* Back button */}
          <div className="flex items-center gap-2 mb-10 animate-fade-in">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
              className="p-3 hover:bg-accent/10 rounded-full transition-all hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Main content */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up text-green-700">
              dooza.
            </h1>
            
            <h2 className="text-2xl font-bold text-foreground mb-4 animate-fade-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
              Start Free Trial
            </h2>
            
            <p className="text-lg text-muted-foreground animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
              No credit card required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="animate-fade-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-16 text-xl rounded-2xl border-2 focus:border-green-700 transition-all duration-300 focus:scale-105 shadow-lg"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-16 text-xl font-semibold rounded-2xl transition-all duration-300 hover:scale-110 shadow-glow hover:shadow-xl animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Setting up...
                </div>
              ) : (
                "Get Started"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
