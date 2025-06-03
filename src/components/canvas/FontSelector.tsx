
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector = ({ selectedFont, onFontChange }: FontSelectorProps) => {
  const fonts = [
    // Basic System Fonts
    { value: 'serif', label: 'Serif', family: 'serif' },
    { value: 'sans-serif', label: 'Sans Serif', family: 'sans-serif' },
    { value: 'monospace', label: 'Monospace', family: 'monospace' },
    { value: 'cursive', label: 'Cursive', family: 'cursive' },
    { value: 'fantasy', label: 'Fantasy', family: 'fantasy' },
    
    // Google Fonts
    { value: 'Bebas Neue', label: 'Bebas Neue', family: '"Bebas Neue", serif' },
    { value: 'Montserrat', label: 'Montserrat', family: '"Montserrat", sans-serif' },
    { value: 'Playfair Display', label: 'Playfair Display', family: '"Playfair Display", serif' },
    { value: 'Oswald', label: 'Oswald', family: '"Oswald", sans-serif' },
    { value: 'Roboto', label: 'Roboto', family: '"Roboto", sans-serif' },
    { value: 'Open Sans', label: 'Open Sans', family: '"Open Sans", sans-serif' },
    { value: 'Lato', label: 'Lato', family: '"Lato", sans-serif' },
    { value: 'Poppins', label: 'Poppins', family: '"Poppins", sans-serif' },
    { value: 'Inter', label: 'Inter', family: '"Inter", sans-serif' },
    { value: 'Raleway', label: 'Raleway', family: '"Raleway", sans-serif' },
    
    // Classic System Fonts
    { value: 'Times New Roman', label: 'Times New Roman', family: '"Times New Roman", serif' },
    { value: 'Arial Black', label: 'Arial Black', family: '"Arial Black", sans-serif' },
    { value: 'Impact', label: 'Impact', family: '"Impact", sans-serif' },
    { value: 'Georgia', label: 'Georgia', family: '"Georgia", serif' },
    { value: 'Helvetica', label: 'Helvetica', family: '"Helvetica", sans-serif' },
    { value: 'Verdana', label: 'Verdana', family: '"Verdana", sans-serif' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS', family: '"Trebuchet MS", sans-serif' },
    { value: 'Courier New', label: 'Courier New', family: '"Courier New", monospace' },
    
    // Script & Display Fonts
    { value: 'Dancing Script', label: 'Dancing Script', family: '"Dancing Script", cursive' },
    { value: 'Pacifico', label: 'Pacifico', family: '"Pacifico", cursive' },
    { value: 'Righteous', label: 'Righteous', family: '"Righteous", cursive' },
    { value: 'Creepster', label: 'Creepster', family: '"Creepster", cursive' },
    { value: 'Orbitron', label: 'Orbitron', family: '"Orbitron", sans-serif' }
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
