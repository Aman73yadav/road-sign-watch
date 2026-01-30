import { useCallback, useRef, useState } from "react";
import { Camera, Loader2, RotateCcw, Upload, Video, Zap } from "lucide-react";
import { Button } from "./ui/button";
import ImageUploadPanel from "./recognition/ImageUploadPanel";
import BulkResultsPanel, { ImageResult, RecognitionResult } from "./recognition/BulkResultsPanel";

// Sample traffic sign categories from GTSRB
const signCategories: Record<string, { name: string; category: string; description: string }> = {
  "speed_20": { name: "Speed Limit 20", category: "Prohibitory", description: "Maximum speed limit of 20 km/h" },
  "speed_30": { name: "Speed Limit 30", category: "Prohibitory", description: "Maximum speed limit of 30 km/h" },
  "speed_50": { name: "Speed Limit 50", category: "Prohibitory", description: "Maximum speed limit of 50 km/h" },
  "speed_60": { name: "Speed Limit 60", category: "Prohibitory", description: "Maximum speed limit of 60 km/h" },
  "speed_70": { name: "Speed Limit 70", category: "Prohibitory", description: "Maximum speed limit of 70 km/h" },
  "speed_80": { name: "Speed Limit 80", category: "Prohibitory", description: "Maximum speed limit of 80 km/h" },
  "stop": { name: "Stop Sign", category: "Prohibitory", description: "Complete stop required" },
  "yield": { name: "Yield Sign", category: "Priority", description: "Give way to other traffic" },
  "no_entry": { name: "No Entry", category: "Prohibitory", description: "Entry not permitted" },
  "turn_right": { name: "Turn Right Ahead", category: "Mandatory", description: "Right turn mandatory ahead" },
  "warning": { name: "General Warning", category: "Warning", description: "Caution - hazard ahead" },
  "pedestrian": { name: "Pedestrian Crossing", category: "Warning", description: "Watch for pedestrians" },
};

const RecognitionDemo = () => {
  const [mode, setMode] = useState<"camera" | "upload">("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraResult, setCameraResult] = useState<RecognitionResult | null>(null);
  
  // Bulk upload state
  const [uploadedImages, setUploadedImages] = useState<{ id: string; src: string; name: string }[]>([]);
  const [imageResults, setImageResults] = useState<ImageResult[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [processedCount, setProcessedCount] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simulate AI recognition
  const simulateRecognition = useCallback((): RecognitionResult => {
    const signs = Object.keys(signCategories);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    const signData = signCategories[randomSign];
    return {
      sign: signData.name,
      confidence: 85 + Math.random() * 14,
      category: signData.category,
      description: signData.description,
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera access denied. Please enable camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    setCameraResult(null);
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsProcessing(true);
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
    }

    setTimeout(() => {
      setCameraResult(simulateRecognition());
      setIsProcessing(false);
    }, 500);
  };

  // Bulk upload handlers
  const handleImagesUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    let loadedCount = 0;
    const newImages: { id: string; src: string; name: string }[] = [];
    const newResults: ImageResult[] = [];
    
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const src = e.target?.result as string;
        
        if (src) {
          newImages.push({ id, src, name: file.name });
          newResults.push({
            id,
            name: file.name,
            src,
            status: "pending",
            result: null,
          });
        }
        
        loadedCount++;
        
        // Update state when all files are read
        if (loadedCount === fileArray.length && newImages.length > 0) {
          setUploadedImages((prev) => [...prev, ...newImages]);
          setImageResults((prev) => [...prev, ...newResults]);
          setSelectedImageId((prev) => prev || newImages[0].id);
        }
      };
      reader.onerror = () => {
        loadedCount++;
        console.error(`Failed to read file: ${file.name}`);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSelectImage = (id: string) => {
    setSelectedImageId(id);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    setImageResults((prev) => prev.filter((r) => r.id !== id));
    if (selectedImageId === id) {
      const remaining = uploadedImages.filter((img) => img.id !== id);
      setSelectedImageId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleClearAll = () => {
    setUploadedImages([]);
    setImageResults([]);
    setSelectedImageId(null);
    setProcessedCount(0);
  };

  const processAllImages = async () => {
    if (imageResults.length === 0) return;
    
    setIsProcessing(true);
    setProcessedCount(0);
    
    for (let i = 0; i < imageResults.length; i++) {
      const item = imageResults[i];
      
      // Update status to processing
      setImageResults((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, status: "processing" as const } : r))
      );
      
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));
      
      // Update with result
      const result = simulateRecognition();
      setImageResults((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, status: "complete" as const, result } : r
        )
      );
      setProcessedCount(i + 1);
    }
    
    setIsProcessing(false);
  };

  const resetDemo = () => {
    handleClearAll();
    setCameraResult(null);
    stopCamera();
  };

  const hasPendingImages = imageResults.some((r) => r.status === "pending");

  return (
    <section id="demo" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live <span className="text-gradient-secondary">Detection Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try our traffic sign recognition system. Upload multiple images for bulk analysis or use your camera for real-time detection.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={mode === "upload" ? "glow" : "glass"}
            onClick={() => { setMode("upload"); stopCamera(); }}
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </Button>
          <Button
            variant={mode === "camera" ? "glowSecondary" : "glass"}
            onClick={() => { setMode("camera"); handleClearAll(); }}
          >
            <Video className="w-4 h-4" />
            Live Camera
          </Button>
        </div>

        {/* Demo Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              {mode === "upload" ? (
                <>
                  <ImageUploadPanel
                    images={uploadedImages}
                    selectedImageId={selectedImageId}
                    onImagesUpload={handleImagesUpload}
                    onSelectImage={handleSelectImage}
                    onRemoveImage={handleRemoveImage}
                    onClearAll={handleClearAll}
                  />
                  
                  {/* Process button */}
                  {uploadedImages.length > 0 && hasPendingImages && (
                    <Button
                      variant="glow"
                      className="w-full mt-4"
                      onClick={processAllImages}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                      {isProcessing ? "Processing..." : `Analyze ${uploadedImages.length} Image${uploadedImages.length !== 1 ? "s" : ""}`}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Camera Feed</h3>
                    {isStreaming && (
                      <Button variant="ghost" size="sm" onClick={resetDemo}>
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </Button>
                    )}
                  </div>

                  <div className="aspect-video rounded-xl bg-muted/50 border border-border overflow-hidden relative flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
                      playsInline
                      muted
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {!isStreaming && (
                      <div className="text-center p-8">
                        <Camera className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">Camera not active</p>
                        <Button variant="glow" onClick={startCamera}>
                          <Camera className="w-4 h-4" />
                          Start Camera
                        </Button>
                      </div>
                    )}

                    {/* Scanning overlay */}
                    {isStreaming && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-4 border-2 border-secondary/50 rounded-lg" />
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-secondary" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-secondary" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-secondary" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-secondary" />
                      </div>
                    )}

                    {/* Processing overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                          <p className="text-sm text-muted-foreground">Analyzing image...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {isStreaming && (
                    <Button variant="glow" className="w-full mt-4" onClick={captureFrame} disabled={isProcessing}>
                      <Camera className="w-4 h-4" />
                      Capture & Analyze
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Results Panel */}
            <div className="glass rounded-2xl p-6">
              {mode === "upload" ? (
                <BulkResultsPanel
                  results={imageResults}
                  selectedImageId={selectedImageId}
                  onSelectImage={handleSelectImage}
                  isProcessing={isProcessing}
                  processedCount={processedCount}
                />
              ) : (
                <>
                  <h3 className="font-semibold mb-4">Recognition Result</h3>
                  {cameraResult ? (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <span className="text-2xl font-bold text-gradient-primary">
                            {cameraResult.confidence.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-3 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full gradient-primary rounded-full transition-all duration-500"
                            style={{ width: `${cameraResult.confidence}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-muted/50">
                          <div className="text-sm text-muted-foreground mb-1">Detected Sign</div>
                          <div className="text-xl font-semibold">{cameraResult.sign}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-muted/50">
                            <div className="text-sm text-muted-foreground mb-1">Category</div>
                            <div className="font-medium text-secondary">{cameraResult.category}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/50">
                            <div className="text-sm text-muted-foreground mb-1">Status</div>
                            <div className="font-medium text-success">Verified</div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-muted/50">
                          <div className="text-sm text-muted-foreground mb-1">Description</div>
                          <div className="text-sm">{cameraResult.description}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <Camera className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">
                        Start the camera and capture a frame to analyze
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecognitionDemo;
