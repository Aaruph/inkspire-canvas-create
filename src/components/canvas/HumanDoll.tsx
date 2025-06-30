
import { useState } from 'react';

interface HumanDollProps {
  canvasImage: string | null;
  onPlacementChange?: (x: number, y: number) => void;
}

const HumanDoll = ({ canvasImage, onPlacementChange }: HumanDollProps) => {
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

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background tattoo reference image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop&crop=center"
          alt="Body reference"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Human Silhouette */}
      <div className="relative z-10">
        <svg 
          width="200" 
          height="400" 
          viewBox="0 0 200 400" 
          className="opacity-80"
        >
          {/* Head */}
          <ellipse cx="100" cy="50" rx="30" ry="35" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
          
          {/* Neck */}
          <rect x="90" y="80" width="20" height="20" fill="#374151"/>
          
          {/* Torso */}
          <ellipse cx="100" cy="180" rx="50" ry="80" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
          
          {/* Arms */}
          <ellipse cx="60" cy="140" rx="15" ry="60" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
          <ellipse cx="140" cy="140" rx="15" ry="60" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
          
          {/* Legs */}
          <ellipse cx="80" cy="320" rx="18" ry="80" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
          <ellipse cx="120" cy="320" rx="18" ry="80" fill="#374151" stroke="#6B7280" strokeWidth="2"/>
        </svg>
        
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
              filter: 'drop-shadow(0 0 8px rgba(155, 135, 245, 0.8))',
            }}
          />
        )}
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-gray-400 text-sm">
          {canvasImage ? 'Click to place your tattoo' : 'Design your tattoo first'}
        </p>
      </div>
    </div>
  );
};

export default HumanDoll;
