import { Brain, Clock, Eye, Layers, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Deep Learning CNN",
    description: "Powered by Convolutional Neural Networks trained on the German Traffic Sign Recognition Benchmark (GTSRB) dataset.",
  },
  {
    icon: Clock,
    title: "Real-Time Processing",
    description: "Lightning-fast inference with sub-50ms response times for live video stream analysis and instant results.",
  },
  {
    icon: Eye,
    title: "43 Sign Categories",
    description: "Comprehensive recognition covering speed limits, warnings, mandatory signs, and prohibitory traffic signs.",
  },
  {
    icon: Shield,
    title: "Robust Detection",
    description: "Handles varying lighting conditions, weather, occlusion, and background complexity with high accuracy.",
  },
  {
    icon: Layers,
    title: "Multi-Scale Analysis",
    description: "Advanced preprocessing with normalization, histogram equalization, and data augmentation techniques.",
  },
  {
    icon: Sparkles,
    title: "98.5% Accuracy",
    description: "Industry-leading classification accuracy validated on benchmark test sets with low false positive rates.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced <span className="text-gradient-primary">AI Technology</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge deep learning techniques for reliable and accurate traffic sign recognition in real-world conditions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
