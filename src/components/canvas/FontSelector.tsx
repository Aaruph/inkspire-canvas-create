
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector = ({ selectedFont, onFontChange }: FontSelectorProps) => {
  const fonts = [
    { value: 'serif', label: 'Serif', family: 'serif' },
    { value: 'sans-serif', label: 'Sans Serif', family: 'sans-serif' },
    { value: 'monospace', label: 'Monospace', family: 'monospace' },
    { value: 'cursive', label: 'Cursive', family: 'cursive' },
    { value: 'fantasy', label: 'Fantasy', family: 'fantasy' },
    { value: 'Bebas Neue', label: 'Bebas Neue', family: '"Bebas Neue", serif' },
    { value: 'Montserrat', label: 'Montserrat', family: '"Montserrat", sans-serif' },
    { value: 'Times New Roman', label: 'Times New Roman', family: '"Times New Roman", serif' },
    { value: 'Arial Black', label: 'Arial Black', family: '"Arial Black", sans-serif' },
    { value: 'Impact', label: 'Impact', family: '"Impact", sans-serif' },
    { value: 'Georgia', label: 'Georgia', family: '"Georgia", serif' },
    { value: 'Helvetica', label: 'Helvetica', family: '"Helvetica", sans-serif' }
  ];

  return (
    <Select value={selectedFont} onValueChange={onFontChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a font" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {fonts.map((font) => (
          <SelectItem 
            key={font.value} 
            value={font.value}
            className="cursor-pointer"
          >
            <span style={{ fontFamily: font.family }}>
              {font.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontSelector;
