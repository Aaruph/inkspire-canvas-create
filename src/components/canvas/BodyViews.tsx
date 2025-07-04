import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface BodyViewsProps {
  currentView: 'front' | 'back' | 'arm' | 'leg';
  onViewChange: (view: 'front' | 'back' | 'arm' | 'leg') => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  onResetPosition: () => void;
}

const BodyViews = ({
  currentView,
  onViewChange,
  zoom,
  onZoomChange,
  rotation,
  onRotationChange,
  onResetPosition,
}: BodyViewsProps) => {
  const views = [
    { id: 'front' as const, label: 'Front View' },
    { id: 'back' as const, label: 'Back View' },
    { id: 'arm' as const, label: 'Arm View' },
    { id: 'leg' as const, label: 'Leg View' },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Body Views & Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* View Selection */}
        <div className="grid grid-cols-2 gap-2">
          {views.map((view) => (
            <Button
              key={view.id}
              variant={currentView === view.id ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange(view.id)}
              className="text-xs"
            >
              {view.label}
            </Button>
          ))}
        </div>

        {/* Zoom Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Zoom</span>
            <span className="text-sm text-muted-foreground">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onZoomChange(Math.max(zoom - 0.1, 0.5))}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-3 h-3" />
            </Button>
            <Slider
              value={[zoom]}
              min={0.5}
              max={2}
              step={0.1}
              className="flex-1"
              onValueChange={(value) => onZoomChange(value[0])}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onZoomChange(Math.min(zoom + 0.1, 2))}
              disabled={zoom >= 2}
            >
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Rotation Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Rotation</span>
            <span className="text-sm text-muted-foreground">{rotation}°</span>
          </div>
          <Slider
            value={[rotation]}
            min={-180}
            max={180}
            step={15}
            className="w-full"
            onValueChange={(value) => onRotationChange(value[0])}
          />
        </div>

        {/* Reset Position */}
        <Button
          variant="outline"
          size="sm"
          onClick={onResetPosition}
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Position
        </Button>
      </CardContent>
    </Card>
  );
};

export default BodyViews;