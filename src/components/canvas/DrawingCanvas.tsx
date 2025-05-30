import { useRef, useState, useEffect } from 'react';

interface DrawingCanvasProps {
  activeColor: string;
  strokeWidth: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const DrawingCanvas = ({ activeColor, strokeWidth, canvasRef }: DrawingCanvasProps) => {
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
      
      // Fill with black background
      ctx.fillStyle = "#000000";
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
  }, [canvasRef]);

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

  return (
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
  );
};

export default DrawingCanvas;
