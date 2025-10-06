import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SiShopify, SiSlack, SiStripe, SiMailchimp, SiWoocommerce, SiBigcommerce, SiMagento, SiPaypal, SiMeta, SiAmazon, SiDiscord } from "react-icons/si";
import { FaHeadset, FaCreditCard, FaEnvelope } from "react-icons/fa";

const IntegrationsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const integrations = [
    { name: "WooCommerce", icon: <SiWoocommerce className="w-5 h-5" />, color: "text-purple-600" },
    { name: "BigCommerce", icon: <SiBigcommerce className="w-5 h-5" />, color: "text-blue-600" },
    { name: "Magento", icon: <SiMagento className="w-5 h-5" />, color: "text-orange-600" },
    { name: "Stripe", icon: <SiStripe className="w-5 h-5" />, color: "text-purple-600" },
    { name: "PayPal", icon: <SiPaypal className="w-5 h-5" />, color: "text-blue-600" },
    { name: "Square", icon: <FaCreditCard className="w-5 h-5" />, color: "text-gray-700" },
    { name: "Shopify", icon: <SiShopify className="w-5 h-5" />, color: "text-green-600" },
    { name: "Zendesk", icon: <FaHeadset className="w-5 h-5" />, color: "text-green-600" },
    { name: "Slack", icon: <SiSlack className="w-5 h-5" />, color: "text-purple-600" },
    { name: "Klaviyo", icon: <FaEnvelope className="w-5 h-5" />, color: "text-orange-600" },
    { name: "Mailchimp", icon: <SiMailchimp className="w-5 h-5" />, color: "text-yellow-600" },
    { name: "Meta", icon: <SiMeta className="w-5 h-5" />, color: "text-blue-600" },
    { name: "Amazon", icon: <SiAmazon className="w-5 h-5" />, color: "text-orange-600" },
    { name: "Discord", icon: <SiDiscord className="w-5 h-5" />, color: "text-indigo-600" },
  ];

  // Duplicate the array for seamless loop
  const allIntegrations = [...integrations, ...integrations];

  return (
    <section ref={ref} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center text-foreground mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Integrate with your favorite apps
        </h2>
        <p 
          className={`text-center text-muted-foreground mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Connect seamlessly with the tools you already use
        </p>
        
        <div 
          className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Sliding container */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll hover:pause-animation">
              {allIntegrations.map((app, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 px-6 py-4 bg-card border border-border rounded-xl hover:border-highlight hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${app.color} group-hover:scale-110 transition-transform shadow-sm`}>
                      {app.icon}
                    </div>
                    <span className="text-foreground font-semibold whitespace-nowrap">
                      {app.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
