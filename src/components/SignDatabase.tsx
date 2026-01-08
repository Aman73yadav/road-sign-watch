import { AlertTriangle, Ban, ChevronRight, Info, Navigation } from "lucide-react";

const signCategories = [
  {
    name: "Speed Limits",
    icon: Ban,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    signs: ["20 km/h", "30 km/h", "50 km/h", "60 km/h", "70 km/h", "80 km/h", "100 km/h", "120 km/h"],
    count: 8,
  },
  {
    name: "Warning Signs",
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    signs: ["Curve Ahead", "Slippery Road", "Pedestrians", "Children", "Road Work", "Animals", "Bump", "Traffic Signals"],
    count: 15,
  },
  {
    name: "Mandatory Signs",
    icon: Navigation,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    signs: ["Turn Right", "Turn Left", "Go Straight", "Keep Right", "Roundabout", "Pass Right", "Pass Left", "Straight or Right"],
    count: 8,
  },
  {
    name: "Prohibitory Signs",
    icon: Ban,
    color: "text-primary",
    bgColor: "bg-primary/10",
    signs: ["No Entry", "No Vehicles", "No Trucks", "No Overtaking", "Stop", "Yield", "No Parking", "End of Limit"],
    count: 12,
  },
];

const SignDatabase = () => {
  return (
    <section id="signs" className="py-24 relative">
      {/* Background */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">43 Sign Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our system recognizes all traffic sign classes from the German Traffic Sign Recognition Benchmark (GTSRB) dataset.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {signCategories.map((category, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center shrink-0`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{category.name}</h3>
                    <span className="text-sm text-muted-foreground">{category.count} signs</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {category.signs.slice(0, 4).map((sign, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground">
                        {sign}
                      </span>
                    ))}
                    {category.signs.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground">
                        +{category.signs.length - 4} more
                      </span>
                    )}
                  </div>
                  <button className="flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all">
                    View all <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">About GTSRB Dataset</h4>
              <p className="text-sm text-muted-foreground">
                The German Traffic Sign Recognition Benchmark (GTSRB) is a multi-class image classification benchmark 
                containing over 50,000 images of traffic signs belonging to 43 classes. Our CNN model is trained and 
                validated on this dataset to achieve industry-leading accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignDatabase;
