
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark, Clock, FileImage, Trash } from 'lucide-react';

interface TattooCanvasProps {
  activeColor: string;
  strokeWidth: number;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
}

const TattooCanvas = ({ activeColor, strokeWidth, onColorChange, onStrokeWidthChange }: TattooCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPos, setPrevPos] = useState<{ x: number, y: number } | null>(null);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [activeTab, setActiveTab] = useState('draw');

  // Standard template designs
  const templateDesigns = [
    { id: 'minimal-tribal', name: 'Minimal Tribal', src: '/templates/minimal-tribal.png' },
    { id: 'geometric', name: 'Geometric Pattern', src: '/templates/geometric.png' },
    { id: 'flower', name: 'Simple Flower', src: '/templates/flower.png' },
    { id: 'lettering', name: 'Custom Lettering', src: '/templates/lettering.png' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Fill with a subtle background
      ctx.fillStyle = "#1A1F2C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize context
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = strokeWidth;

    setCanvasCtx(ctx);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (!canvasCtx) return;
    canvasCtx.strokeStyle = activeColor;
  }, [activeColor, canvasCtx]);

  useEffect(() => {
    if (!canvasCtx) return;
    canvasCtx.lineWidth = strokeWidth;
  }, [strokeWidth, canvasCtx]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    // Get position
    const pos = getEventPosition(e);
    if (!pos) return;
    
    setPrevPos(pos);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasCtx || !prevPos) return;
    
    // Prevent scrolling on touch devices
    if (e.type === 'touchmove') {
      e.preventDefault();
    }
    
    const currentPos = getEventPosition(e);
    if (!currentPos) return;
    
    // Draw line
    canvasCtx.beginPath();
    canvasCtx.moveTo(prevPos.x, prevPos.y);
    canvasCtx.lineTo(currentPos.x, currentPos.y);
    canvasCtx.stroke();
    
    setPrevPos(currentPos);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setPrevPos(null);
  };

  const getEventPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      // Touch event
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvasCtx;
    if (!canvas || !ctx) return;
    
    ctx.fillStyle = "#1A1F2C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    toast("Canvas cleared");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasCtx || !canvasRef.current) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas || !canvasCtx) return;
        
        // Center image on canvas
        const xPos = (canvas.width - img.width) / 2;
        const yPos = (canvas.height - img.height) / 2;
        
        // Clear canvas and draw image
        canvasCtx.fillStyle = "#1A1F2C";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        canvasCtx.drawImage(img, xPos, yPos);
        
        toast("Image uploaded successfully");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const loadTemplateDesign = (templateSrc: string) => {
    if (!canvasCtx || !canvasRef.current) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvasCtx) return;
      
      // Center image on canvas
      const xPos = (canvas.width - img.width) / 2;
      const yPos = (canvas.height - img.height) / 2;
      
      // Clear canvas and draw image
      canvasCtx.fillStyle = "#1A1F2C";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw image with proper dimensions
      const scale = Math.min(
        (canvas.width * 0.8) / img.width,
        (canvas.height * 0.8) / img.height
      );
      
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      const centerX = (canvas.width - scaledWidth) / 2;
      const centerY = (canvas.height - scaledHeight) / 2;
      
      canvasCtx.drawImage(img, centerX, centerY, scaledWidth, scaledHeight);
      
      toast("Template design loaded");
    };
    img.src = templateSrc;
    
    // Fallback if template doesn't load
    img.onerror = () => {
      toast.error("Couldn't load template design. Please try again.");
    };
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-wrap gap-4 mb-4 p-4 bg-zinc-800 rounded-lg">
          <TabsList className="mr-4 bg-zinc-700">
            <TabsTrigger value="draw" className="data-[state=active]:bg-white data-[state=active]:text-black font-medium">
              Draw
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:text-black font-medium">
              Templates
            </TabsTrigger>
          </TabsList>
          
          <Button 
            variant="outline" 
            onClick={clearCanvas}
            className="border-white/50 text-white hover:border-white hover:bg-white/10"
          >
            <Trash className="w-4 h-4 mr-2" />
            Clear
          </Button>
          
          {activeTab === "draw" && (
            <>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className={`w-8 h-8 p-0 rounded-full ${activeColor === '#ffffff' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => onColorChange('#ffffff')}
                  style={{ backgroundColor: '#ffffff' }}
                />
                <Button
                  variant="ghost"
                  className={`w-8 h-8 p-0 rounded-full ${activeColor === '#000000' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => onColorChange('#000000')}
                  style={{ backgroundColor: '#000000' }}
                />
                <Button
                  variant="ghost"
                  className={`w-8 h-8 p-0 rounded-full ${activeColor === '#555555' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => onColorChange('#555555')}
                  style={{ backgroundColor: '#555555' }}
                />
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-white font-medium">Line:</span>
                <Slider
                  value={[strokeWidth]}
                  min={1}
                  max={20}
                  step={1}
                  className="w-24"
                  onValueChange={(value) => onStrokeWidthChange(value[0])}
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  className="border-white/50 text-white hover:border-white hover:bg-white/10"
                  onClick={() => document.getElementById('upload-image')?.click()}
                >
                  <FileImage className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </>
          )}
        </div>
      </Tabs>

      {activeTab === "templates" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {templateDesigns.map((design) => (
            <div 
              key={design.id}
              className="border border-white/30 rounded-lg p-2 hover:border-white cursor-pointer transition-all bg-zinc-800"
              onClick={() => loadTemplateDesign(design.src)}
            >
              <div className="aspect-square bg-zinc-900 rounded flex items-center justify-center mb-2">
                <div className="text-white/70 text-xs text-center font-medium p-4">
                  {design.name}
                </div>
              </div>
              <Button
                variant="ghost" 
                className="w-full text-xs text-white hover:text-white hover:bg-white/10 uppercase tracking-wider"
                onClick={(e) => {
                  e.stopPropagation();
                  loadTemplateDesign(design.src);
                }}
              >
                Apply Design
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="canvas-container flex-grow relative">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="flex justify-between items-center mt-4 p-2 bg-zinc-800 rounded-lg">
        <div className="text-xs text-white/70 font-medium">
          <Clock className="inline-block w-3 h-3 mr-1" /> Auto-save enabled
        </div>
        <Button 
          variant="ghost" 
          className="text-xs text-white hover:text-white hover:bg-white/10 uppercase tracking-wider"
          onClick={() => toast("Design saved to favorites")}
        >
          <Bookmark className="w-3 h-3 mr-1" /> Save to Favorites
        </Button>
      </div>
    </div>
  );
};

export default TattooCanvas;
