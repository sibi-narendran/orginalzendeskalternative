import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Generate slider values: 1-10 by 1, 10-100 by 20, 100-2000 by 200
const generateSliderValues = () => {
  const values = [];
  for (let i = 1; i <= 10; i++) values.push(i);
  for (let i = 30; i <= 100; i += 20) values.push(i);
  for (let i = 300; i <= 2000; i += 200) values.push(i);
  return values;
};

const sliderValues = generateSliderValues();

const Pricing = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const navigate = useNavigate();
  const tickets = sliderValues[sliderIndex];
  const cost = tickets * 0.2;
  const isContactSales = tickets >= 2000;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Simple, Fair Pricing
          </h1>
          <div className="bg-gradient-accent rounded-3xl p-12 shadow-soft space-y-8">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                Human usage forever free
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                AI Cost Calculator
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg text-muted-foreground">
                  <span>Auto-solved tickets per month</span>
                  <span className="font-bold text-foreground">{tickets}</span>
                </div>
                <Slider
                  value={[sliderIndex]}
                  onValueChange={(value) => setSliderIndex(value[0])}
                  max={sliderValues.length - 1}
                  step={1}
                  className="w-full"
                />
                <div className="pt-4 border-t border-border">
                  {isContactSales ? (
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-primary">
                        Contact Sales
                      </p>
                      <p className="text-sm text-muted-foreground">
                        For enterprise pricing
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Monthly cost
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        ${cost.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        $0.20 per auto-solved ticket
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 pt-8">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
              onClick={() => window.open('https://cal.com/sibinarendran/demo', '_blank')}
            >
              Book a Call
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="rounded-full"
              onClick={() => navigate('/signup')}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
