
import { Slider } from '@/components/ui/slider';

interface StrokeWidthControlProps {
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
}

const StrokeWidthControl = ({ strokeWidth, onStrokeWidthChange }: StrokeWidthControlProps) => {
  return (
    <div className="flex items-center gap-2">
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
  );
};

export default StrokeWidthControl;
