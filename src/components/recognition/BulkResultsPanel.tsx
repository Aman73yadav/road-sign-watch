import { Camera, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export interface RecognitionResult {
  sign: string;
  confidence: number;
  category: string;
  description: string;
}

export interface ImageResult {
  id: string;
  name: string;
  src: string;
  status: "pending" | "processing" | "complete";
  result: RecognitionResult | null;
}

interface BulkResultsPanelProps {
  results: ImageResult[];
  selectedImageId: string | null;
  onSelectImage: (id: string) => void;
  isProcessing: boolean;
  processedCount: number;
}

const BulkResultsPanel = ({
  results,
  selectedImageId,
  onSelectImage,
  isProcessing,
  processedCount,
}: BulkResultsPanelProps) => {
  const selectedResult = results.find((r) => r.id === selectedImageId);
  const completedResults = results.filter((r) => r.status === "complete");
  const averageConfidence =
    completedResults.length > 0
      ? completedResults.reduce((acc, r) => acc + (r.result?.confidence || 0), 0) /
        completedResults.length
      : 0;

  if (results.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <p className="text-muted-foreground">
          Upload images to see recognition results
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Recognition Results</h3>

      {/* Progress bar for bulk processing */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </span>
            <span className="font-medium">
              {processedCount} / {results.length}
            </span>
          </div>
          <Progress value={(processedCount / results.length) * 100} className="h-2" />
        </div>
      )}

      {/* Summary stats */}
      {completedResults.length > 0 && !isProcessing && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="text-sm text-muted-foreground">Processed</div>
            <div className="text-xl font-bold text-gradient-primary">
              {completedResults.length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
            <div className="text-xl font-bold text-gradient-secondary">
              {averageConfidence.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* Selected image result detail */}
      {selectedResult?.result && (
        <div className="space-y-3 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Selected</span>
            <span className="text-lg font-bold text-gradient-primary">
              {selectedResult.result.confidence.toFixed(1)}%
            </span>
          </div>
          <div className="text-lg font-semibold">{selectedResult.result.sign}</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded-md bg-secondary/20 text-secondary text-xs font-medium">
              {selectedResult.result.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedResult.result.description}
          </p>
        </div>
      )}

      {/* Results list */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectImage(item.id)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
              selectedImageId === item.id
                ? "bg-primary/10 border border-primary/30"
                : "bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-10 h-10 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {item.result?.sign || item.name}
              </div>
              {item.result && (
                <div className="text-xs text-muted-foreground">
                  {item.result.category}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {item.status === "pending" && (
                <Clock className="w-4 h-4 text-muted-foreground" />
              )}
              {item.status === "processing" && (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              )}
              {item.status === "complete" && item.result && (
                <>
                  <span className="text-sm font-medium text-primary">
                    {item.result.confidence.toFixed(0)}%
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkResultsPanel;
