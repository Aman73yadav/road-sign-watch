import { ArrowLeft, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="relative z-10 text-center px-4">
        <div className="text-8xl md:text-9xl font-bold text-gradient-primary mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="glow" asChild>
            <Link to="/">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="glass" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
