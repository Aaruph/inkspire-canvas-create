
import { useState } from 'react';

interface HumanDollProps {
  canvasImage: string | null;
  onPlacementChange?: (x: number, y: number) => void;
  currentView?: 'front' | 'back' | 'arm' | 'leg';
  zoom?: number;
  rotation?: number;
}

const HumanDoll = ({ 
  canvasImage, 
  onPlacementChange,
  currentView = 'front',
  zoom = 1,
  rotation = 0
}: HumanDollProps) => {
  const [tattooPosition, setTattooPosition] = useState({ x: 50, y: 40 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasImage) return;
    setIsDragging(true);
    updatePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !canvasImage) return;
    updatePosition(e);
  };

  const updatePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const clampedX = Math.min(Math.max(x, 5), 95);
    const clampedY = Math.min(Math.max(y, 5), 95);
    
    setTattooPosition({ x: clampedX, y: clampedY });
    onPlacementChange?.(clampedX, clampedY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderBodyView = () => {
    const baseProps = {
      fill: "#374151",
      stroke: "#6B7280",
      strokeWidth: "2"
    };

    switch (currentView) {
      case 'front':
        return (
          <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-80">
            {/* Head */}
            <ellipse cx="100" cy="50" rx="30" ry="35" {...baseProps}/>
            {/* Neck */}
            <rect x="90" y="80" width="20" height="20" fill="#374151"/>
            {/* Torso */}
            <ellipse cx="100" cy="180" rx="50" ry="80" {...baseProps}/>
            {/* Arms */}
            <ellipse cx="60" cy="140" rx="15" ry="60" {...baseProps}/>
            <ellipse cx="140" cy="140" rx="15" ry="60" {...baseProps}/>
            {/* Legs */}
            <ellipse cx="80" cy="320" rx="18" ry="80" {...baseProps}/>
            <ellipse cx="120" cy="320" rx="18" ry="80" {...baseProps}/>
          </svg>
        );

      case 'back':
        return (
          <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-80">
            {/* Head (back view) */}
            <ellipse cx="100" cy="50" rx="30" ry="35" {...baseProps}/>
            {/* Neck */}
            <rect x="90" y="80" width="20" height="20" fill="#374151"/>
            {/* Back */}
            <ellipse cx="100" cy="180" rx="45" ry="75" {...baseProps}/>
            {/* Shoulder blades */}
            <ellipse cx="75" cy="130" rx="20" ry="25" {...baseProps}/>
            <ellipse cx="125" cy="130" rx="20" ry="25" {...baseProps}/>
            {/* Arms (back view) */}
            <ellipse cx="60" cy="140" rx="15" ry="60" {...baseProps}/>
            <ellipse cx="140" cy="140" rx="15" ry="60" {...baseProps}/>
            {/* Legs */}
            <ellipse cx="80" cy="320" rx="18" ry="80" {...baseProps}/>
            <ellipse cx="120" cy="320" rx="18" ry="80" {...baseProps}/>
          </svg>
        );

      case 'arm':
        return (
          <svg width="300" height="400" viewBox="0 0 300 400" className="opacity-80">
            {/* Upper Arm */}
            <ellipse cx="150" cy="120" rx="40" ry="80" {...baseProps}/>
            {/* Elbow */}
            <ellipse cx="150" cy="200" rx="25" ry="20" {...baseProps}/>
            {/* Forearm */}
            <ellipse cx="150" cy="280" rx="30" ry="70" {...baseProps}/>
            {/* Hand */}
            <ellipse cx="150" cy="360" rx="20" ry="30" {...baseProps}/>
          </svg>
        );

      case 'leg':
        return (
          <svg width="250" height="400" viewBox="0 0 250 400" className="opacity-80">
            {/* Thigh */}
            <ellipse cx="125" cy="120" rx="45" ry="80" {...baseProps}/>
            {/* Knee */}
            <ellipse cx="125" cy="200" rx="30" ry="25" {...baseProps}/>
            {/* Calf */}
            <ellipse cx="125" cy="280" rx="35" ry="70" {...baseProps}/>
            {/* Ankle */}
            <ellipse cx="125" cy="360" rx="20" ry="15" {...baseProps}/>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-background to-muted rounded-lg overflow-hidden cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
      </div>
      
      {/* Human Silhouette */}
      <div className="relative z-10" style={{ transform: `rotate(${rotation}deg)` }}>
        {renderBodyView()}
        
        {/* Tattoo Overlay */}
        {canvasImage && (
          <div 
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              width: '60px',
              height: '60px',
              top: `${tattooPosition.y}%`,
              left: `${tattooPosition.x}%`,
              transform: 'translate(-50%, -50%)',
              backgroundImage: `url(${canvasImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.8))',
            }}
          />
        )}
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-muted-foreground text-sm">
          {canvasImage ? `Click to place your tattoo on ${currentView} view` : 'Design your tattoo first'}
        </p>
      </div>
    </div>
  );
};

export default HumanDoll;
