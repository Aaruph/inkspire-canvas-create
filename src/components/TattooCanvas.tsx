
import { useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import CanvasToolbar from './canvas/CanvasToolbar';
import TemplateGallery from './canvas/TemplateGallery';
import DrawingCanvas from './canvas/DrawingCanvas';
import QuickActions from './canvas/QuickActions';
import AdvancedCanvasTools from './canvas/AdvancedCanvasTools';
import ColorPalette from './canvas/ColorPalette';

interface TattooCanvasProps {
  activeColor: string;
  strokeWidth: number;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onAddText?: (text: string, font: string, color: string, size: number) => void;
}

const TattooCanvas = ({
  activeColor,
  strokeWidth,
  onColorChange,
  onStrokeWidthChange,
  onAddText,
}: TattooCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<"draw" | "templates">("draw");
  const [zoom, setZoom] = useState(1);
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Standard template designs
  const templateDesigns = [
    { id: 'minimal-tribal', name: 'Minimal Tribal', src: '/templates/minimal-tribal.png' },
    { id: 'geometric', name: 'Geometric Pattern', src: '/templates/geometric.png' },
    { id: 'flower', name: 'Simple Flower', src: '/templates/flower.png' },
    { id: 'lettering', name: 'Custom Lettering', src: '/templates/lettering.png' },
  ];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.fillStyle = "#1A1F2C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    toast("Canvas cleared");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas || !ctx) return;
        
        // Center image on canvas
        const xPos = (canvas.width - img.width) / 2;
        const yPos = (canvas.height - img.height) / 2;
        
        // Clear canvas and draw image
        ctx.fillStyle = "#1A1F2C";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, xPos, yPos);
        
        toast("Image uploaded successfully");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const loadTemplateDesign = (templateSrc: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas and draw image
      ctx.fillStyle = "#1A1F2C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw image with proper dimensions
      const scale = Math.min(
        (canvas.width * 0.8) / img.width,
        (canvas.height * 0.8) / img.height
      );
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      const centerX = (canvas.width - scaledWidth) / 2;
      const centerY = (canvas.height - scaledHeight) / 2;
      
      ctx.drawImage(img, centerX, centerY, scaledWidth, scaledHeight);
      
      toast("Template design loaded");
    };
    img.src = templateSrc;
    
    // Fallback if template doesn't load
    img.onerror = () => {
      toast.error("Couldn't load template design. Please try again.");
    };
  };

  // Canvas history functions
  const saveCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = canvasHistory.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    
    // Limit history to 20 states
    if (newHistory.length > 20) {
      newHistory.shift();
    }
    
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [canvasHistory, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const newIndex = historyIndex - 1;
      ctx.putImageData(canvasHistory[newIndex], 0, 0);
      setHistoryIndex(newIndex);
      toast("Undone");
    }
  }, [canvasHistory, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < canvasHistory.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const newIndex = historyIndex + 1;
      ctx.putImageData(canvasHistory[newIndex], 0, 0);
      setHistoryIndex(newIndex);
      toast("Redone");
    }
  }, [canvasHistory, historyIndex]);

  const zoomIn = useCallback(() => {
    if (zoom < 3) {
      setZoom(prev => Math.min(prev + 0.25, 3));
    }
  }, [zoom]);

  const zoomOut = useCallback(() => {
    if (zoom > 0.5) {
      setZoom(prev => Math.max(prev - 0.25, 0.5));
    }
  }, [zoom]);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.fillStyle = "#1A1F2C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
    toast("Canvas reset");
  }, [saveCanvasState]);

  const downloadDesign = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `tattoo-design-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast("Design downloaded successfully");
    } catch (error) {
      console.error('Error downloading design:', error);
      toast.error('Failed to download design');
    }
  }, []);

  const handleAddText = (text: string, font: string, color: string, size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set text properties
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text at center of canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.fillText(text, centerX, centerY);
    
    saveCanvasState();
    
    if (onAddText) {
      onAddText(text, font, color, size);
    }
    
    toast("Text added to canvas");
  };

  return (
    <div className="flex gap-4 h-full">
      {/* Left Sidebar - Tools and Colors */}
      <div className="w-64 space-y-4">
        <AdvancedCanvasTools
          onUndo={undo}
          onRedo={redo}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={resetCanvas}
          onDownload={downloadDesign}
          zoom={zoom}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < canvasHistory.length - 1}
        />
        <ColorPalette
          activeColor={activeColor}
          onColorChange={onColorChange}
        />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <CanvasToolbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeColor={activeColor}
          onColorChange={onColorChange}
          strokeWidth={strokeWidth}
          onStrokeWidthChange={onStrokeWidthChange}
          onClear={clearCanvas}
          onFileUpload={handleFileUpload}
        />

        {activeTab === "templates" && (
          <TemplateGallery 
            templates={templateDesigns} 
            onTemplateSelect={loadTemplateDesign} 
          />
        )}
        
        <div 
          className="canvas-container flex-grow relative overflow-hidden"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
        >
          <DrawingCanvas
            activeColor={activeColor}
            strokeWidth={strokeWidth}
            canvasRef={canvasRef}
            onSaveState={saveCanvasState}
            zoom={zoom}
          />
        </div>
        
        <QuickActions />
      </div>
    </div>
  );
};

export default TattooCanvas;
