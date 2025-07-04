import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Undo, Redo, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';
import { toast } from 'sonner';

interface AdvancedCanvasToolsProps {
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onDownload: () => void;
  zoom: number;
  canUndo: boolean;
  canRedo: boolean;
}

const AdvancedCanvasTools = ({
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onReset,
  onDownload,
  zoom,
  canUndo,
  canRedo,
}: AdvancedCanvasToolsProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4 space-y-4">
        {/* Undo/Redo Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1"
          >
            <Undo className="w-4 h-4 mr-1" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1"
          >
            <Redo className="w-4 h-4 mr-1" />
            Redo
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">Zoom</span>
            <span className="text-sm text-muted-foreground">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onZoomOut}
              disabled={zoom <= 0.5}
              className="flex-1"
            >
              <ZoomOut className="w-4 h-4 mr-1" />
              Out
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onZoomIn}
              disabled={zoom >= 3}
              className="flex-1"
            >
              <ZoomIn className="w-4 h-4 mr-1" />
              In
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Design
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onReset}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Canvas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedCanvasTools;