
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import CanvasToolbar from './canvas/CanvasToolbar';
import TemplateGallery from './canvas/TemplateGallery';
import DrawingCanvas from './canvas/DrawingCanvas';
import QuickActions from './canvas/QuickActions';

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
    
    if (onAddText) {
      onAddText(text, font, color, size);
    }
    
    toast("Text added to canvas");
  };

  return (
    <div className="flex flex-col h-full">
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
      
      <div className="canvas-container flex-grow relative">
        <DrawingCanvas
          activeColor={activeColor}
          strokeWidth={strokeWidth}
          canvasRef={canvasRef}
        />
      </div>
      
      <QuickActions />
    </div>
  );
};

export default TattooCanvas;
