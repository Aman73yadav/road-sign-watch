import { useState, useCallback, lazy, Suspense } from "react";
import { Play, Pause, RotateCcw, Eye, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

// Lazy load the 3D scene for better performance
const SimulationScene = lazy(() => import("./simulation/SimulationScene"));

interface Detection {
  name: string;
  classNumber: number;
  timestamp: number;
  confidence: number;
}

const Simulation3D = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isNightMode, setIsNightMode] = useState(true);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [latestDetection, setLatestDetection] = useState<Detection | null>(null);

  const handleDetection = useCallback((detection: Detection) => {
    setLatestDetection(detection);
    setDetections((prev) => [detection, ...prev].slice(0, 10));
  }, []);

  const handleReset = () => {
    setDetections([]);
    setLatestDetection(null);
  };

  return (
    <section id="simulation" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            3D <span className="text-gradient-primary">Road Simulation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience real-time traffic sign detection in an interactive 3D driving environment. 
            Watch as our AI identifies signs as you travel down the road.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* 3D Scene */}
            <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium">Live Simulation</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isNightMode ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {isNightMode ? 'Night' : 'Day'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsNightMode(!isNightMode)}
                    className="gap-1"
                  >
                    {isNightMode ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-blue-400" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRunning(!isRunning)}
                  >
                    {isRunning ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="aspect-video relative">
                <Suspense
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading 3D Scene...</p>
                      </div>
                    </div>
                  }
                >
                  {isRunning && <SimulationScene onDetection={handleDetection} isNightMode={isNightMode} />}
                </Suspense>
                
                {!isRunning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="text-center">
                      <Pause className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Simulation Paused</p>
                      <Button variant="glow" className="mt-4" onClick={() => setIsRunning(true)}>
                        <Play className="w-4 h-4" />
                        Resume
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Detection overlay */}
                {latestDetection && isRunning && (
                  <div className="absolute top-4 left-4 glass rounded-lg p-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-secondary text-xs font-mono mb-1">
                      <Eye className="w-3 h-3" />
                      DETECTED
                    </div>
                    <div className="text-foreground font-semibold">{latestDetection.name}</div>
                    <div className="text-muted-foreground text-xs">
                      Class {latestDetection.classNumber} • {latestDetection.confidence.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Drag to rotate view • Scroll to zoom • Click ☀️/🌙 to toggle day/night
                </p>
              </div>
            </div>

            {/* Detection Log */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary" />
                Detection Log
              </h3>
              
              {detections.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {detections.map((detection, index) => (
                    <div
                      key={detection.timestamp}
                      className={`p-3 rounded-xl bg-muted/50 border border-border/50 transition-all ${
                        index === 0 ? "border-secondary/50 glow-secondary" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{detection.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Class {detection.classNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden mr-2">
                          <div
                            className="h-full gradient-secondary rounded-full"
                            style={{ width: `${detection.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-secondary">
                          {detection.confidence.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Signs will appear here as they are detected
                  </p>
                </div>
              )}
              
              {detections.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Detected</span>
                    <span className="font-semibold text-primary">{detections.length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulation3D;
