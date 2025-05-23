
import { Button } from '@/components/ui/button';

interface Template {
  id: string;
  name: string;
  src: string;
}

interface TemplateGalleryProps {
  templates: Template[];
  onTemplateSelect: (templateSrc: string) => void;
}

const TemplateGallery = ({ templates, onTemplateSelect }: TemplateGalleryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {templates.map((design) => (
        <div
          key={design.id}
          className="border border-white/30 rounded-lg p-2 hover:border-white cursor-pointer transition-all bg-zinc-800"
          onClick={() => onTemplateSelect(design.src)}
        >
          <div className="aspect-square bg-zinc-900 rounded flex items-center justify-center mb-2">
            <div className="text-white/70 text-xs text-center font-medium p-4">
              {design.name}
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full text-xs text-white hover:text-white hover:bg-white/10 uppercase tracking-wider"
            onClick={(e) => {
              e.stopPropagation();
              onTemplateSelect(design.src);
            }}
          >
            Apply Design
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;
