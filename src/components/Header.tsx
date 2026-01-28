import { Activity, Eye, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center glow-primary">
                <Eye className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">TSR</span>
              <span className="text-[10px] text-muted-foreground -mt-1">Traffic Sign Recognition</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Gallery
            </a>
            <a href="#simulation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              3D Simulation
            </a>
            <a href="#demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Live Demo
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
              <Activity className="w-3 h-3 text-success" />
              <span className="text-xs text-success font-medium">System Online</span>
            </div>
            <Button variant="glow" size="sm">
              Try Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="#simulation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                3D Simulation
              </a>
              <a href="#demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Live Demo
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <Button variant="glow" className="mt-2">
                Try Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
