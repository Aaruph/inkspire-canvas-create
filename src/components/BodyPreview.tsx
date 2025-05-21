import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const bodyParts = [
  { id: 'arm', label: 'Arm' },
  { id: 'forearm', label: 'Forearm' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'back', label: 'Back' },
  { id: 'chest', label: 'Chest' },
  { id: 'leg', label: 'Leg' },
  { id: 'ankle', label: 'Ankle' },
  { id: 'wrist', label: 'Wrist' },
];

interface BodyPreviewProps {
  canvasImage: string | null;
}

const BodyPreview = ({ canvasImage }: BodyPreviewProps) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('forearm');
  const [tattooSize, setTattooSize] = useState(50);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  const handleBodyPartChange = (part: string) => {
    setSelectedBodyPart(part);
    // Reset position when changing body part
    setPosition({ x: 50, y: 50 });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasImage) return;
    setIsDragging(true);
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // Calculate percentage position
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !canvasImage) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // Calculate percentage position
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp values to keep tattoo within bounds
    const halfSize = tattooSize / 2;
    const clampedX = Math.min(Math.max(newX, halfSize), 100 - halfSize);
    const clampedY = Math.min(Math.max(newY, halfSize), 100 - halfSize);
    
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-2 mb-4 p-4 bg-card rounded-lg">
        {bodyParts.map((part) => (
          <Button
            key={part.id}
            variant={selectedBodyPart === part.id ? "default" : "outline"}
            className={
              selectedBodyPart === part.id
                ? "bg-ink-accent text-ink-dark hover:bg-ink-accent/90"
                : "border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
            }
            onClick={() => handleBodyPartChange(part.id)}
          >
            {part.label}
          </Button>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 p-4 bg-card rounded-lg">
          <label className="text-sm text-ink-light block mb-2">Tattoo Size</label>
          <Slider
            value={[tattooSize]}
            min={10}
            max={80}
            step={1}
            className="w-full"
            onValueChange={(value) => setTattooSize(value[0])}
          />
        </div>
        <div className="flex-1 p-4 bg-card rounded-lg">
          <p className="text-sm text-ink-light mb-1">Position</p>
          <p className="text-xs text-muted-foreground">Drag the tattoo to position it</p>
        </div>
      </div>
      
      <div 
        className="canvas-container flex-grow relative bg-secondary overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-ink-light/30 text-lg font-medium">
            {selectedBodyPart === 'forearm' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-32 h-64 rounded-full bg-ink-dark/50 border border-ink-accent/20">
                  <span className="block pt-8">Forearm</span>
                </div>
              </div>
            ) : selectedBodyPart === 'arm' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-36 h-72 rounded-full bg-ink-dark/50 border border-ink-accent/20">
                  <span className="block pt-8">Arm</span>
                </div>
              </div>
            ) : selectedBodyPart === 'shoulder' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-ink-dark/50 border border-ink-accent/20 flex items-center justify-center">
                  <span>Shoulder</span>
                </div>
              </div>
            ) : selectedBodyPart === 'back' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-64 h-80 rounded-lg bg-ink-dark/50 border border-ink-accent/20 flex items-center justify-center">
                  <span>Back</span>
                </div>
              </div>
            ) : selectedBodyPart === 'chest' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-72 h-56 rounded-lg bg-ink-dark/50 border border-ink-accent/20 flex items-center justify-center">
                  <span>Chest</span>
                </div>
              </div>
            ) : selectedBodyPart === 'leg' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-40 h-80 rounded-full bg-ink-dark/50 border border-ink-accent/20 flex items-start justify-center">
                  <span className="block pt-8">Leg</span>
                </div>
              </div>
            ) : selectedBodyPart === 'ankle' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-ink-dark/50 border border-ink-accent/20 flex items-center justify-center">
                  <span>Ankle</span>
                </div>
              </div>
            ) : selectedBodyPart === 'wrist' ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="w-32 h-24 rounded-full bg-ink-dark/50 border border-ink-accent/20 flex items-center justify-center">
                  <span>Wrist</span>
                </div>
              </div>
            ) : (
              <span>Select a body part</span>
            )}
          </div>
        </div>
        
        {/* Tattoo Preview Layer */}
        {canvasImage && (
          <div 
            className="absolute pointer-events-none transition-all duration-300"
            style={{
              width: `${tattooSize}%`,
              height: `${tattooSize}%`,
              top: `${position.y - (tattooSize / 2)}%`,
              left: `${position.x - (tattooSize / 2)}%`,
              backgroundImage: `url(${canvasImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 8px rgba(155, 135, 245, 0.5))',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BodyPreview;
