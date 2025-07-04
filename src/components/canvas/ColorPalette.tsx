import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Palette, Plus, X } from 'lucide-react';

interface ColorPaletteProps {
  activeColor: string;
  onColorChange: (color: string) => void;
}

const defaultColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#A52A2A', '#808080', '#FFB6C1', '#90EE90', '#87CEEB'
];

const ColorPalette = ({ activeColor, onColorChange }: ColorPaletteProps) => {
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('#000000');

  const addCustomColor = () => {
    if (!customColors.includes(newColor)) {
      setCustomColors([...customColors, newColor]);
    }
  };

  const removeCustomColor = (color: string) => {
    setCustomColors(customColors.filter(c => c !== color));
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Color Palette
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Default Colors */}
        <div className="grid grid-cols-5 gap-2">
          {defaultColors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded border-2 transition-all ${
                activeColor === color ? 'border-primary' : 'border-border'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
              title={color}
            />
          ))}
        </div>

        {/* Custom Colors */}
        {customColors.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">Custom Colors</span>
            <div className="grid grid-cols-5 gap-2">
              {customColors.map((color) => (
                <div key={color} className="relative">
                  <button
                    className={`w-8 h-8 rounded border-2 transition-all ${
                      activeColor === color ? 'border-primary' : 'border-border'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorChange(color)}
                    title={color}
                  />
                  <button
                    className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs"
                    onClick={() => removeCustomColor(color)}
                  >
                    <X className="w-2 h-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Custom Color */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Add Custom Color</span>
          <div className="flex gap-2">
            <Input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-16 h-8 p-1 cursor-pointer"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={addCustomColor}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Current Color Display */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Current Color</span>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded border-2 border-border"
              style={{ backgroundColor: activeColor }}
            />
            <span className="text-sm text-muted-foreground font-mono">{activeColor}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPalette;