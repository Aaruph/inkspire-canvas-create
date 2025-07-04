import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import { Type, Plus, RotateCw, Move, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface AdvancedTextEditorProps {
  onAddText: (text: string, font: string, color: string, size: number, style?: {
    rotation?: number;
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    opacity?: number;
  }) => void;
}

const AdvancedTextEditor = ({ onAddText }: AdvancedTextEditorProps) => {
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState('serif');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(48);
  
  // Advanced controls
  const [rotation, setRotation] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [opacity, setOpacity] = useState(100);

  const handleAddText = () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }
    
    onAddText(text, selectedFont, textColor, fontSize, {
      rotation,
      letterSpacing,
      lineHeight,
      textAlign,
      fontWeight,
      fontStyle,
      opacity: opacity / 100
    });
    
    setText('');
    toast.success('Advanced text added to canvas');
  };

  const resetAdvancedSettings = () => {
    setRotation(0);
    setLetterSpacing(0);
    setLineHeight(1.2);
    setTextAlign('center');
    setFontWeight('normal');
    setFontStyle('normal');
    setOpacity(100);
    toast('Settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="text-input" className="text-sm font-medium text-foreground">
          Text Content
        </Label>
        <Input
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your tattoo text..."
          className="bg-card border-border text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Font & Color Row */}
      <div className="grid grid-cols-1 gap-4">
        {/* Font Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Font Family
          </Label>
          <FontSelector 
            selectedFont={selectedFont} 
            onFontChange={setSelectedFont} 
          />
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Text Color
          </Label>
          <div className="flex items-center gap-3">
            <ColorPicker 
              activeColor={textColor} 
              onColorChange={setTextColor} 
            />
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-8 rounded border border-border cursor-pointer bg-card"
            />
          </div>
        </div>
      </div>

      {/* Font Size & Basic Styling */}
      <div className="space-y-4">
        {/* Font Size */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-foreground">Font Size</Label>
            <span className="text-sm text-muted-foreground">{fontSize}px</span>
          </div>
          <Slider
            value={[fontSize]}
            min={16}
            max={120}
            step={2}
            className="w-full"
            onValueChange={(value) => setFontSize(value[0])}
          />
        </div>

        {/* Font Weight & Style */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Weight</Label>
            <Select value={fontWeight} onValueChange={(value: 'normal' | 'bold') => setFontWeight(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Style</Label>
            <Select value={fontStyle} onValueChange={(value: 'normal' | 'italic') => setFontStyle(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="italic">Italic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Advanced Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium text-foreground">Advanced Controls</Label>
        </div>

        {/* Rotation */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-foreground">Rotation</Label>
            <span className="text-sm text-muted-foreground">{rotation}°</span>
          </div>
          <Slider
            value={[rotation]}
            min={-180}
            max={180}
            step={15}
            className="w-full"
            onValueChange={(value) => setRotation(value[0])}
          />
        </div>

        {/* Letter Spacing */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-foreground">Letter Spacing</Label>
            <span className="text-sm text-muted-foreground">{letterSpacing}px</span>
          </div>
          <Slider
            value={[letterSpacing]}
            min={-5}
            max={20}
            step={0.5}
            className="w-full"
            onValueChange={(value) => setLetterSpacing(value[0])}
          />
        </div>

        {/* Line Height */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-foreground">Line Height</Label>
            <span className="text-sm text-muted-foreground">{lineHeight.toFixed(1)}</span>
          </div>
          <Slider
            value={[lineHeight]}
            min={0.8}
            max={3}
            step={0.1}
            className="w-full"
            onValueChange={(value) => setLineHeight(value[0])}
          />
        </div>

        {/* Text Alignment */}
        <div className="space-y-2">
          <Label className="text-sm text-foreground">Text Alignment</Label>
          <Select value={textAlign} onValueChange={(value: 'left' | 'center' | 'right') => setTextAlign(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Opacity */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm text-foreground">Opacity</Label>
            <span className="text-sm text-muted-foreground">{opacity}%</span>
          </div>
          <Slider
            value={[opacity]}
            min={10}
            max={100}
            step={5}
            className="w-full"
            onValueChange={(value) => setOpacity(value[0])}
          />
        </div>
      </div>

      <Separator />

      {/* Live Preview */}
      <div className="p-4 bg-card rounded-lg border border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">Live Preview:</p>
          </div>
          <div
            style={{
              fontFamily: selectedFont,
              color: textColor,
              fontSize: Math.min(fontSize, 32) + 'px',
              fontWeight: fontWeight,
              fontStyle: fontStyle,
              letterSpacing: letterSpacing + 'px',
              lineHeight: lineHeight,
              textAlign: textAlign,
              transform: `rotate(${rotation}deg)`,
              opacity: opacity / 100,
              transition: 'all 0.3s ease'
            }}
            className="break-words min-h-[40px] flex items-center justify-center mx-auto max-w-full"
          >
            {text || 'Your text here...'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddText}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
          disabled={!text.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Advanced Text
        </Button>
        
        <Button
          onClick={resetAdvancedSettings}
          variant="outline"
          className="w-full"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Reset Advanced Settings
        </Button>
      </div>
    </div>
  );
};

export default AdvancedTextEditor;