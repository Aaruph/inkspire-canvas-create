
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-card rounded-lg">
        <Button 
          variant="outline" 
          onClick={clearCanvas}
          className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
        >
          Clear Canvas
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className={`w-8 h-8 p-0 rounded-full ${activeColor === '#ffffff' ? 'ring-2 ring-ink-accent' : ''}`}
            onClick={() => onColorChange('#ffffff')}
            style={{ backgroundColor: '#ffffff' }}
          />
          <Button
            variant="ghost"
            className={`w-8 h-8 p-0 rounded-full ${activeColor === '#9b87f5' ? 'ring-2 ring-ink-accent' : ''}`}
            onClick={() => onColorChange('#9b87f5')}
            style={{ backgroundColor: '#9b87f5' }}
          />
          <Button
            variant="ghost"
            className={`w-8 h-8 p-0 rounded-full ${activeColor === '#D946EF' ? 'ring-2 ring-ink-accent' : ''}`}
            onClick={() => onColorChange('#D946EF')}
            style={{ backgroundColor: '#D946EF' }}
          />
          <Button
            variant="ghost"
            className={`w-8 h-8 p-0 rounded-full ${activeColor === '#0EA5E9' ? 'ring-2 ring-ink-accent' : ''}`}
            onClick={() => onColorChange('#0EA5E9')}
            style={{ backgroundColor: '#0EA5E9' }}
          />
          <Button
            variant="ghost"
            className={`w-8 h-8 p-0 rounded-full ${activeColor === '#000000' ? 'ring-2 ring-ink-accent' : ''}`}
            onClick={() => onColorChange('#000000')}
            style={{ backgroundColor: '#000000' }}
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-ink-light">Stroke:</span>
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
            className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
            onClick={() => document.getElementById('upload-image')?.click()}
          >
            Upload Image
          </Button>
        </div>
      </div>
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
    </div>
  );
};

export default TattooCanvas;
