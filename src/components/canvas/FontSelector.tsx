
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const FontSelector = ({ selectedFont, onFontChange }: FontSelectorProps) => {
  const fontCategories = [
    {
      category: 'English/Latin',
      fonts: [
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
        
        // Script & Display Fonts
        { value: 'Dancing Script', label: 'Dancing Script', family: '"Dancing Script", cursive' },
        { value: 'Pacifico', label: 'Pacifico', family: '"Pacifico", cursive' },
        { value: 'Righteous', label: 'Righteous', family: '"Righteous", cursive' },
        { value: 'Creepster', label: 'Creepster', family: '"Creepster", cursive' },
        { value: 'Orbitron', label: 'Orbitron', family: '"Orbitron", sans-serif' }
      ]
    },
    {
      category: 'Hindi/Devanagari',
      fonts: [
        { value: 'Noto Sans Devanagari', label: 'Noto Sans Devanagari', family: '"Noto Sans Devanagari", sans-serif' },
        { value: 'Kalam', label: 'Kalam (Handwriting)', family: '"Kalam", cursive' },
        { value: 'Hind', label: 'Hind', family: '"Hind", sans-serif' },
        { value: 'Mukti', label: 'Mukti', family: '"Mukti", sans-serif' }
      ]
    },
    {
      category: 'Arabic',
      fonts: [
        { value: 'Noto Sans Arabic', label: 'Noto Sans Arabic', family: '"Noto Sans Arabic", sans-serif' },
        { value: 'Amiri', label: 'Amiri (Traditional)', family: '"Amiri", serif' },
        { value: 'Cairo', label: 'Cairo (Modern)', family: '"Cairo", sans-serif' }
      ]
    },
    {
      category: 'Chinese',
      fonts: [
        { value: 'Noto Sans Chinese', label: 'Noto Sans Chinese', family: '"Noto Sans Chinese", sans-serif' }
      ]
    },
    {
      category: 'Japanese',
      fonts: [
        { value: 'Noto Sans Japanese', label: 'Noto Sans Japanese', family: '"Noto Sans Japanese", sans-serif' }
      ]
    },
    {
      category: 'Korean',
      fonts: [
        { value: 'Noto Sans Korean', label: 'Noto Sans Korean', family: '"Noto Sans Korean", sans-serif' }
      ]
    },
    {
      category: 'Thai',
      fonts: [
        { value: 'Noto Sans Thai', label: 'Noto Sans Thai', family: '"Noto Sans Thai", sans-serif' },
        { value: 'Sarabun', label: 'Sarabun', family: '"Sarabun", sans-serif' }
      ]
    }
  ];

  return (
    <Select value={selectedFont} onValueChange={onFontChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a font" />
      </SelectTrigger>
      <SelectContent className="max-h-80 overflow-y-auto">
        {fontCategories.map((category) => (
          <div key={category.category}>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50">
              {category.category}
            </div>
            {category.fonts.map((font) => (
              <SelectItem 
                key={font.value} 
                value={font.value}
                className="cursor-pointer py-2"
              >
                <span style={{ fontFamily: font.family }}>
                  {font.label}
                </span>
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontSelector;
