import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureBlock from "@/components/FeatureBlock";
import MigrationSection from "@/components/MigrationSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import CTASection from "@/components/CTASection";
import RevolutionaryPricingSection from "@/components/RevolutionaryPricingSection";
import aiContextImg from "@/assets/ai-context.jpg";
import automationImg from "@/assets/automation.jpg";
import costSavingsImg from "@/assets/cost-savings.jpg";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <MigrationSection />
      
      <IntegrationsSection />
      
      <RevolutionaryPricingSection />
      
      <div id="features">
        <FeatureBlock
          title="AI that understands context."
          description="dooza uses advanced AI to resolve tickets faster and more accurately than zendesk, making every interaction seamless."
          imageUrl={aiContextImg}
          reverse={false}
        />
      </div>
      
      <div id="comparison">
        <FeatureBlock
          title="Superior automation tools."
          description="Automate repetitive tasks with smarter workflows and reduce manual effort, saving your team valuable time."
          imageUrl={automationImg}
          reverse={true}
        />
      </div>
      
      <div id="pricing">
        <FeatureBlock
          title="Significantly lower cost."
          description="Get all the powerful features you need at a fraction of zendesk's cost, delivering unbeatable value for growing businesses."
          imageUrl={costSavingsImg}
          reverse={false}
        />
      </div>
      
      <CTASection />
    </div>
  );
};

export default Index;
