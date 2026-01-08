import { useState } from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { Button } from "./ui/button";

// All 43 GTSRB traffic sign categories
const gtsrbSigns = [
  { id: 0, name: "Speed Limit 20", category: "Speed Limit", symbol: "20", color: "bg-red-500" },
  { id: 1, name: "Speed Limit 30", category: "Speed Limit", symbol: "30", color: "bg-red-500" },
  { id: 2, name: "Speed Limit 50", category: "Speed Limit", symbol: "50", color: "bg-red-500" },
  { id: 3, name: "Speed Limit 60", category: "Speed Limit", symbol: "60", color: "bg-red-500" },
  { id: 4, name: "Speed Limit 70", category: "Speed Limit", symbol: "70", color: "bg-red-500" },
  { id: 5, name: "Speed Limit 80", category: "Speed Limit", symbol: "80", color: "bg-red-500" },
  { id: 6, name: "End of 80 Limit", category: "Speed Limit", symbol: "80̶", color: "bg-gray-400" },
  { id: 7, name: "Speed Limit 100", category: "Speed Limit", symbol: "100", color: "bg-red-500" },
  { id: 8, name: "Speed Limit 120", category: "Speed Limit", symbol: "120", color: "bg-red-500" },
  { id: 9, name: "No Passing", category: "Prohibitory", symbol: "⊘", color: "bg-red-500" },
  { id: 10, name: "No Passing >3.5t", category: "Prohibitory", symbol: "🚛⊘", color: "bg-red-500" },
  { id: 11, name: "Priority Road", category: "Priority", symbol: "◇", color: "bg-yellow-400" },
  { id: 12, name: "Yield", category: "Priority", symbol: "△", color: "bg-red-500" },
  { id: 13, name: "Stop", category: "Priority", symbol: "STOP", color: "bg-red-600" },
  { id: 14, name: "No Vehicles", category: "Prohibitory", symbol: "⊘", color: "bg-red-500" },
  { id: 15, name: "No Trucks", category: "Prohibitory", symbol: "🚛", color: "bg-red-500" },
  { id: 16, name: "No Entry", category: "Prohibitory", symbol: "⊝", color: "bg-red-600" },
  { id: 17, name: "General Caution", category: "Warning", symbol: "!", color: "bg-yellow-400" },
  { id: 18, name: "Left Curve", category: "Warning", symbol: "↰", color: "bg-yellow-400" },
  { id: 19, name: "Right Curve", category: "Warning", symbol: "↱", color: "bg-yellow-400" },
  { id: 20, name: "Double Curve", category: "Warning", symbol: "⤭", color: "bg-yellow-400" },
  { id: 21, name: "Bumpy Road", category: "Warning", symbol: "⏦", color: "bg-yellow-400" },
  { id: 22, name: "Slippery Road", category: "Warning", symbol: "⌇", color: "bg-yellow-400" },
  { id: 23, name: "Road Narrows Right", category: "Warning", symbol: "⊳", color: "bg-yellow-400" },
  { id: 24, name: "Road Work", category: "Warning", symbol: "🔧", color: "bg-yellow-400" },
  { id: 25, name: "Traffic Signals", category: "Warning", symbol: "🚦", color: "bg-yellow-400" },
  { id: 26, name: "Pedestrians", category: "Warning", symbol: "🚶", color: "bg-yellow-400" },
  { id: 27, name: "Children Crossing", category: "Warning", symbol: "👧", color: "bg-yellow-400" },
  { id: 28, name: "Bicycles Crossing", category: "Warning", symbol: "🚲", color: "bg-yellow-400" },
  { id: 29, name: "Ice/Snow", category: "Warning", symbol: "❄", color: "bg-yellow-400" },
  { id: 30, name: "Wild Animals", category: "Warning", symbol: "🦌", color: "bg-yellow-400" },
  { id: 31, name: "End All Limits", category: "Other", symbol: "⊘̶", color: "bg-gray-400" },
  { id: 32, name: "Turn Right Ahead", category: "Mandatory", symbol: "→", color: "bg-blue-500" },
  { id: 33, name: "Turn Left Ahead", category: "Mandatory", symbol: "←", color: "bg-blue-500" },
  { id: 34, name: "Ahead Only", category: "Mandatory", symbol: "↑", color: "bg-blue-500" },
  { id: 35, name: "Go Straight or Right", category: "Mandatory", symbol: "↗", color: "bg-blue-500" },
  { id: 36, name: "Go Straight or Left", category: "Mandatory", symbol: "↖", color: "bg-blue-500" },
  { id: 37, name: "Keep Right", category: "Mandatory", symbol: "⇨", color: "bg-blue-500" },
  { id: 38, name: "Keep Left", category: "Mandatory", symbol: "⇦", color: "bg-blue-500" },
  { id: 39, name: "Roundabout", category: "Mandatory", symbol: "↻", color: "bg-blue-500" },
  { id: 40, name: "End No Passing", category: "Other", symbol: "⊘̶", color: "bg-gray-400" },
  { id: 41, name: "End No Passing >3.5t", category: "Other", symbol: "🚛̶", color: "bg-gray-400" },
  { id: 42, name: "Priority for Oncoming", category: "Priority", symbol: "⇅", color: "bg-red-500" },
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

  const getSignShape = (category: string) => {
    switch (category) {
      case "Warning":
        return "clip-triangle";
      case "Priority":
        return "clip-diamond";
      case "Mandatory":
        return "rounded-full";
      default:
        return "rounded-full";
    }
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
          {filteredSigns.map((sign) => (
            <button
              key={sign.id}
              onClick={() => handleSignClick(sign)}
              className={`group relative aspect-square rounded-xl glass p-3 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
                selectedSign === sign.id ? "border-primary ring-2 ring-primary/30" : ""
              }`}
            >
              {/* Sign Visual */}
              <div
                className={`w-full h-full flex items-center justify-center ${sign.color} ${
                  sign.category === "Warning" ? "rounded-sm rotate-45" : 
                  sign.category === "Priority" && sign.id === 11 ? "rotate-45 rounded-sm" :
                  sign.category === "Priority" && sign.id === 12 ? "rounded-t-full" :
                  "rounded-full"
                } ${sign.id === 13 ? "!rounded-lg" : ""}`}
              >
                <span
                  className={`text-white font-bold text-xs ${
                    sign.category === "Warning" ? "-rotate-45" :
                    sign.category === "Priority" && (sign.id === 11 || sign.id === 12) ? "-rotate-45" : ""
                  }`}
                >
                  {sign.symbol}
                </span>
              </div>

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
            { label: "Speed Limit", color: "bg-red-500" },
            { label: "Warning", color: "bg-yellow-400" },
            { label: "Mandatory", color: "bg-blue-500" },
            { label: "Prohibitory", color: "bg-red-600" },
            { label: "Other", color: "bg-gray-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignGallery;
