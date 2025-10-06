import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RevolutionaryPricingSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        
        {/* Main Heading */}
        <h2 
          className={`text-4xl md:text-6xl font-bold text-foreground mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Revolutionary Pricing Model
        </h2>
        
        {/* Blue Subheading */}
        <p 
          className={`text-2xl md:text-4xl font-bold text-blue-600 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          Only Pay for AI, Not for Human Usage
        </p>

        {/* Action Buttons */}
        <div 
          className={`transition-all duration-700 flex flex-col sm:flex-row gap-4 justify-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Button 
            variant="default" 
            size="lg" 
            className="rounded-full transition-all duration-300 hover:scale-110 shadow-glow hover:shadow-xl"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full transition-all duration-300 hover:scale-110 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => navigate('/pricing')}
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RevolutionaryPricingSection;
