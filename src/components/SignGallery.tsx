import { useState } from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { Button } from "./ui/button";

// Import all sign images
import sign00 from "@/assets/signs/sign-00.png";
import sign01 from "@/assets/signs/sign-01.png";
import sign02 from "@/assets/signs/sign-02.png";
import sign03 from "@/assets/signs/sign-03.png";
import sign04 from "@/assets/signs/sign-04.png";
import sign05 from "@/assets/signs/sign-05.png";
import sign06 from "@/assets/signs/sign-06.png";
import sign07 from "@/assets/signs/sign-07.png";
import sign08 from "@/assets/signs/sign-08.png";
import sign09 from "@/assets/signs/sign-09.png";
import sign10 from "@/assets/signs/sign-10.png";
import sign11 from "@/assets/signs/sign-11.png";
import sign12 from "@/assets/signs/sign-12.png";
import sign13 from "@/assets/signs/sign-13.png";
import sign14 from "@/assets/signs/sign-14.png";
import sign15 from "@/assets/signs/sign-15.png";
import sign16 from "@/assets/signs/sign-16.png";
import sign17 from "@/assets/signs/sign-17.png";
import sign18 from "@/assets/signs/sign-18.png";
import sign19 from "@/assets/signs/sign-19.png";
import sign20 from "@/assets/signs/sign-20.png";
import sign21 from "@/assets/signs/sign-21.png";
import sign22 from "@/assets/signs/sign-22.png";
import sign23 from "@/assets/signs/sign-23.png";
import sign24 from "@/assets/signs/sign-24.png";
import sign25 from "@/assets/signs/sign-25.png";
import sign26 from "@/assets/signs/sign-26.png";
import sign27 from "@/assets/signs/sign-27.png";
import sign28 from "@/assets/signs/sign-28.png";
import sign29 from "@/assets/signs/sign-29.png";
import sign30 from "@/assets/signs/sign-30.png";
import sign31 from "@/assets/signs/sign-31.png";
import sign32 from "@/assets/signs/sign-32.png";
import sign33 from "@/assets/signs/sign-33.png";
import sign34 from "@/assets/signs/sign-34.png";
import sign35 from "@/assets/signs/sign-35.png";
import sign36 from "@/assets/signs/sign-36.png";
import sign37 from "@/assets/signs/sign-37.png";
import sign38 from "@/assets/signs/sign-38.png";
import sign39 from "@/assets/signs/sign-39.png";
import sign40 from "@/assets/signs/sign-40.png";
import sign41 from "@/assets/signs/sign-41.png";
import sign42 from "@/assets/signs/sign-42.png";

// All 43 GTSRB traffic sign categories with actual images
const gtsrbSigns = [
  { id: 0, name: "Speed Limit 20", category: "Speed Limit", image: sign00 },
  { id: 1, name: "Speed Limit 30", category: "Speed Limit", image: sign01 },
  { id: 2, name: "Speed Limit 50", category: "Speed Limit", image: sign02 },
  { id: 3, name: "Speed Limit 60", category: "Speed Limit", image: sign03 },
  { id: 4, name: "Speed Limit 70", category: "Speed Limit", image: sign04 },
  { id: 5, name: "Speed Limit 80", category: "Speed Limit", image: sign05 },
  { id: 6, name: "End of 80 Limit", category: "Speed Limit", image: sign06 },
  { id: 7, name: "Speed Limit 100", category: "Speed Limit", image: sign07 },
  { id: 8, name: "Speed Limit 120", category: "Speed Limit", image: sign08 },
  { id: 9, name: "No Passing", category: "Prohibitory", image: sign09 },
  { id: 10, name: "No Passing >3.5t", category: "Prohibitory", image: sign10 },
  { id: 11, name: "Priority Road", category: "Priority", image: sign11 },
  { id: 12, name: "Yield", category: "Priority", image: sign12 },
  { id: 13, name: "Stop", category: "Priority", image: sign13 },
  { id: 14, name: "No Vehicles", category: "Prohibitory", image: sign14 },
  { id: 15, name: "No Trucks", category: "Prohibitory", image: sign15 },
  { id: 16, name: "No Entry", category: "Prohibitory", image: sign16 },
  { id: 17, name: "General Caution", category: "Warning", image: sign17 },
  { id: 18, name: "Left Curve", category: "Warning", image: sign18 },
  { id: 19, name: "Right Curve", category: "Warning", image: sign19 },
  { id: 20, name: "Double Curve", category: "Warning", image: sign20 },
  { id: 21, name: "Bumpy Road", category: "Warning", image: sign21 },
  { id: 22, name: "Slippery Road", category: "Warning", image: sign22 },
  { id: 23, name: "Road Narrows Right", category: "Warning", image: sign23 },
  { id: 24, name: "Road Work", category: "Warning", image: sign24 },
  { id: 25, name: "Traffic Signals", category: "Warning", image: sign25 },
  { id: 26, name: "Pedestrians", category: "Warning", image: sign26 },
  { id: 27, name: "Children Crossing", category: "Warning", image: sign27 },
  { id: 28, name: "Bicycles Crossing", category: "Warning", image: sign28 },
  { id: 29, name: "Ice/Snow", category: "Warning", image: sign29 },
  { id: 30, name: "Wild Animals", category: "Warning", image: sign30 },
  { id: 31, name: "End All Limits", category: "Other", image: sign31 },
  { id: 32, name: "Turn Right Ahead", category: "Mandatory", image: sign32 },
  { id: 33, name: "Turn Left Ahead", category: "Mandatory", image: sign33 },
  { id: 34, name: "Ahead Only", category: "Mandatory", image: sign34 },
  { id: 35, name: "Go Straight or Right", category: "Mandatory", image: sign35 },
  { id: 36, name: "Go Straight or Left", category: "Mandatory", image: sign36 },
  { id: 37, name: "Keep Right", category: "Mandatory", image: sign37 },
  { id: 38, name: "Keep Left", category: "Mandatory", image: sign38 },
  { id: 39, name: "Roundabout", category: "Mandatory", image: sign39 },
  { id: 40, name: "End No Passing", category: "Other", image: sign40 },
  { id: 41, name: "End No Passing >3.5t", category: "Other", image: sign41 },
  { id: 42, name: "Priority for Oncoming", category: "Priority", image: sign42 },
];

const categories = ["All", "Speed Limit", "Prohibitory", "Warning", "Mandatory", "Priority", "Other"];

interface SignGalleryProps {
  onSelectSign?: (sign: typeof gtsrbSigns[0]) => void;
}

const SignGallery = ({ onSelectSign }: SignGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSigns = gtsrbSigns.filter((sign) => {
    const matchesCategory = selectedCategory === "All" || sign.category === selectedCategory;
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSignClick = (sign: typeof gtsrbSigns[0]) => {
    setSelectedSign(sign.id);
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      if (onSelectSign) {
        onSelectSign(sign);
      }
    }, 800);
  };

  return (
    <section id="gallery" className="py-24 relative">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Traffic Sign <span className="text-gradient-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse all 43 GTSRB traffic sign categories. Click any sign to test the recognition system.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search signs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-all min-w-[180px]"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-card border border-border shadow-xl z-20 animate-fade-in">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-muted/50 transition-colors flex items-center justify-between ${
                      selectedCategory === cat ? "text-primary" : ""
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <span className="text-sm text-muted-foreground">
            Showing {filteredSigns.length} of {gtsrbSigns.length} signs
          </span>
        </div>

        {/* Sign Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-3">
          {filteredSigns.map((sign) => (
            <button
              key={sign.id}
              onClick={() => handleSignClick(sign)}
              className={`group relative aspect-square rounded-xl glass p-2 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
                selectedSign === sign.id ? "border-primary ring-2 ring-primary/30" : ""
              }`}
            >
              {/* Sign Image */}
              <img
                src={sign.image}
                alt={sign.name}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Loading Overlay */}
              {isAnalyzing && selectedSign === sign.id && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              )}

              {/* Hover Tooltip */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-popover text-popover-foreground text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap border border-border">
                  <div className="font-medium">{sign.name}</div>
                  <div className="text-muted-foreground">Class {sign.id}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* No Results */}
        {filteredSigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No signs found matching your criteria.</p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { label: "Speed Limit", count: 9 },
            { label: "Warning", count: 14 },
            { label: "Mandatory", count: 8 },
            { label: "Prohibitory", count: 5 },
            { label: "Priority", count: 4 },
            { label: "Other", count: 3 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setSelectedCategory(item.label)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedCategory === item.label
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs opacity-70">({item.count})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignGallery;
