
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import { Type, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface TextTattooEditorProps {
  onAddText: (text: string, font: string, color: string, size: number) => void;
}

const TextTattooEditor = ({ onAddText }: TextTattooEditorProps) => {
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState('serif');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(48);

  const handleAddText = () => {
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }
    
    onAddText(text, selectedFont, textColor, fontSize);
    setText('');
    toast.success('Text added to canvas');
  };

  return (
    <div className="space-y-6 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Text Tattoo Editor</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="text-input" className="text-sm font-medium">
            Text Content
          </Label>
          <Input
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your tattoo text..."
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Font Family
          </Label>
          <FontSelector 
            selectedFont={selectedFont} 
            onFontChange={setSelectedFont} 
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Text Color
          </Label>
          <div className="flex items-center gap-4">
            <ColorPicker 
              activeColor={textColor} 
              onColorChange={setTextColor} 
            />
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-8 rounded border border-border cursor-pointer"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Font Size: {fontSize}px
          </Label>
          <Slider
            value={[fontSize]}
            min={16}
            max={120}
            step={2}
            className="w-full"
            onValueChange={(value) => setFontSize(value[0])}
          />
        </div>

        <div className="p-4 bg-muted rounded-lg border-2 border-dashed">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <div
              style={{
                fontFamily: selectedFont,
                color: textColor,
                fontSize: Math.min(fontSize, 32) + 'px',
                fontWeight: selectedFont.includes('bold') ? 'bold' : 'normal',
                fontStyle: selectedFont.includes('italic') ? 'italic' : 'normal'
              }}
              className="break-words"
            >
              {text || 'Your text here...'}
            </div>
          </div>
        </div>

        <Button
          onClick={handleAddText}
          className="w-full"
          disabled={!text.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Text to Canvas
        </Button>
      </div>
    </div>
  );
};

export default TextTattooEditor;
