
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
    <div className="space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="text-input" className="text-sm font-medium text-gray-200">
          Text Content
        </Label>
        <Input
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your tattoo text..."
          className="bg-zinc-800 border-zinc-600 text-white placeholder-gray-400 focus:border-purple-500"
        />
      </div>

      {/* Font Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">
          Font Family
        </Label>
        <FontSelector 
          selectedFont={selectedFont} 
          onFontChange={setSelectedFont} 
        />
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">
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
            className="w-12 h-8 rounded border border-zinc-600 cursor-pointer bg-zinc-800"
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-gray-200">Font Size</Label>
          <span className="text-sm text-gray-400">{fontSize}px</span>
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

      {/* Preview */}
      <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-3">Preview:</p>
          <div
            style={{
              fontFamily: selectedFont,
              color: textColor,
              fontSize: Math.min(fontSize, 32) + 'px',
              fontWeight: selectedFont.includes('bold') ? 'bold' : 'normal',
              fontStyle: selectedFont.includes('italic') ? 'italic' : 'normal'
            }}
            className="break-words min-h-[40px] flex items-center justify-center"
          >
            {text || 'Your text here...'}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <Button
        onClick={handleAddText}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5"
        disabled={!text.trim()}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Text to Canvas
      </Button>
    </div>
  );
};

export default TextTattooEditor;
