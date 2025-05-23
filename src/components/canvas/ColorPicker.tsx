
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  activeColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker = ({ activeColor, onColorChange }: ColorPickerProps) => {
  const colors = [
    { value: '#ffffff', label: 'White' },
    { value: '#000000', label: 'Black' },
    { value: '#555555', label: 'Gray' },
  ];

  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <Button
          key={color.value}
          variant="ghost"
          className={`w-8 h-8 p-0 rounded-full ${
            activeColor === color.value ? 'ring-2 ring-white' : ''
          }`}
          onClick={() => onColorChange(color.value)}
          style={{ backgroundColor: color.value }}
          aria-label={color.label}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
