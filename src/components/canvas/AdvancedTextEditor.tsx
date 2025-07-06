import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';
import { Type, Plus, RotateCw, Move, Eye, Languages, ArrowRight } from 'lucide-react';
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
  
  // Translation states
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Advanced controls
  const [rotation, setRotation] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [opacity, setOpacity] = useState(100);

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' }
  ];

  // Simple translation function (basic word replacements for demo)
  const translateText = async (textToTranslate: string, targetLang: string) => {
    setIsTranslating(true);
    
    try {
      // Basic translation mappings for common words
      const translations: Record<string, Record<string, string>> = {
        hi: {
          'love': 'प्रेम',
          'peace': 'शांति',
          'strength': 'शक्ति',
          'family': 'परिवार',
          'dream': 'सपना',
          'hope': 'आशा',
          'faith': 'विश्वास',
          'courage': 'साहस',
          'freedom': 'स्वतंत्रता',
          'warrior': 'योद्धा'
        },
        ne: {
          'love': 'माया',
          'peace': 'शान्ति',
          'strength': 'शक्ति',
          'family': 'परिवार',
          'dream': 'सपना',
          'hope': 'आशा',
          'faith': 'विश्वास',
          'courage': 'साहस',
          'freedom': 'स्वतन्त्रता',
          'warrior': 'योद्धा'
        },
        ar: {
          'love': 'حب',
          'peace': 'سلام',
          'strength': 'قوة',
          'family': 'عائلة',
          'dream': 'حلم',
          'hope': 'أمل',
          'faith': 'إيمان',
          'courage': 'شجاعة',
          'freedom': 'حرية',
          'warrior': 'محارب'
        },
        it: {
          'love': 'amore',
          'peace': 'pace',
          'strength': 'forza',
          'family': 'famiglia',
          'dream': 'sogno',
          'hope': 'speranza',
          'faith': 'fede',
          'courage': 'coraggio',
          'freedom': 'libertà',
          'warrior': 'guerriero'
        },
        es: {
          'love': 'amor',
          'peace': 'paz',
          'strength': 'fuerza',
          'family': 'familia',
          'dream': 'sueño',
          'hope': 'esperanza',
          'faith': 'fe',
          'courage': 'coraje',
          'freedom': 'libertad',
          'warrior': 'guerrero'
        }
      };

      const targetTranslations = translations[targetLang];
      if (targetTranslations) {
        const lowerText = textToTranslate.toLowerCase();
        const translated = targetTranslations[lowerText] || textToTranslate;
        setTranslatedText(translated);
        setText(translated);
        toast.success(`Translated to ${languages.find(l => l.code === targetLang)?.name}`);
      } else {
        toast.error('Translation not available for this language yet');
      }
    } catch (error) {
      toast.error('Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAddText = () => {
    const textToAdd = translatedText || text;
    if (!textToAdd.trim()) {
      toast.error('Please enter some text');
      return;
    }
    
    onAddText(textToAdd, selectedFont, textColor, fontSize, {
      rotation,
      letterSpacing,
      lineHeight,
      textAlign,
      fontWeight,
      fontStyle,
      opacity: opacity / 100
    });
    
    setText('');
    setTranslatedText('');
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

      {/* Translation Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium text-foreground">Translation</Label>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <Label className="text-sm text-foreground">Translate to:</Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            onClick={() => translateText(text, selectedLanguage)}
            disabled={!text.trim() || selectedLanguage === 'en' || isTranslating}
            variant="outline"
            className="w-full"
          >
            {isTranslating ? (
              <>Translating...</>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Translate Text
              </>
            )}
          </Button>
          
          {translatedText && (
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <Label className="text-xs text-muted-foreground">Translated:</Label>
              <p className="text-sm font-medium text-foreground mt-1">{translatedText}</p>
            </div>
          )}
        </div>
      </div>

      <Separator />

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
            {translatedText || text || 'Your text here...'}
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