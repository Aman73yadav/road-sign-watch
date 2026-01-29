import { useCallback, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedImage {
  id: string;
  src: string;
  name: string;
}

interface ImageUploadPanelProps {
  images: UploadedImage[];
  selectedImageId: string | null;
  onImagesUpload: (files: FileList) => void;
  onSelectImage: (id: string) => void;
  onRemoveImage: (id: string) => void;
  onClearAll: () => void;
}

const ImageUploadPanel = ({
  images,
  selectedImageId,
  onImagesUpload,
  onSelectImage,
  onRemoveImage,
  onClearAll,
}: ImageUploadPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onImagesUpload(files);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        // Filter to only image files
        const imageFiles = Array.from(files).filter((file) =>
          file.type.startsWith("image/")
        );
        if (imageFiles.length > 0) {
          const dataTransfer = new DataTransfer();
          imageFiles.forEach((file) => dataTransfer.items.add(file));
          onImagesUpload(dataTransfer.files);
        }
      }
    },
    [onImagesUpload]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Image Input</h3>
        {images.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {images.length === 0 ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`aspect-video rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border bg-muted/50 hover:border-muted-foreground/50 hover:bg-muted/70"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center p-8">
            <div
              className={`mx-auto mb-4 transition-transform duration-200 ${
                isDragging ? "scale-110" : ""
              }`}
            >
              {isDragging ? (
                <Upload className="w-16 h-16 text-primary mx-auto animate-bounce" />
              ) : (
                <ImagePlus className="w-16 h-16 text-muted-foreground/50 mx-auto" />
              )}
            </div>
            <p className={`mb-4 ${isDragging ? "text-primary font-medium" : "text-muted-foreground"}`}>
              {isDragging ? "Drop images here" : "Drag & drop images here"}
            </p>
            {!isDragging && (
              <>
                <Button variant="glow" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  <Upload className="w-4 h-4" />
                  Choose Images
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  or drop multiple images for bulk analysis
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Selected image preview with drop zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`aspect-video rounded-xl border-2 overflow-hidden relative transition-all duration-200 ${
              isDragging
                ? "border-primary border-dashed bg-primary/10"
                : "border-border border-solid bg-muted/50"
            }`}
          >
            {isDragging ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-primary mx-auto mb-2 animate-bounce" />
                  <p className="text-primary font-medium">Drop to add more images</p>
                </div>
              </div>
            ) : selectedImageId ? (
              <img
                src={images.find((img) => img.id === selectedImageId)?.src}
                alt="Selected"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select an image to preview
              </div>
            )}
          </div>

          {/* Thumbnail grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {images.length} image{images.length !== 1 ? "s" : ""} uploaded
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
                Add More
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-1">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageId === image.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-muted-foreground/30"
                  }`}
                  onClick={() => onSelectImage(image.id)}
                >
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full aspect-square object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveImage(image.id);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploadPanel;
