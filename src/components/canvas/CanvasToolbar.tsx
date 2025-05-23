
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileImage, Trash } from 'lucide-react';
import ColorPicker from './ColorPicker';
import StrokeWidthControl from './StrokeWidthControl';

interface CanvasToolbarProps {
  activeTab: "draw" | "templates";
  setActiveTab: React.Dispatch<React.SetStateAction<"draw" | "templates">>;
  activeColor: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  onClear: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CanvasToolbar = ({
  activeTab,
  setActiveTab,
  activeColor,
  onColorChange,
  strokeWidth,
  onStrokeWidthChange,
  onClear,
  onFileUpload,
}: CanvasToolbarProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-zinc-800 rounded-lg">
        <TabsList className="mr-4 bg-zinc-700">
          <TabsTrigger
            value="draw"
            className="data-[state=active]:bg-white data-[state=active]:text-black font-medium"
          >
            Draw
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="data-[state=active]:bg-white data-[state=active]:text-black font-medium"
          >
            Templates
          </TabsTrigger>
        </TabsList>

        <Button
          variant="outline"
          onClick={onClear}
          className="border-white/50 text-white hover:border-white hover:bg-white/10"
        >
          <Trash className="w-4 h-4 mr-2" />
          Clear
        </Button>

        {activeTab === "draw" && (
          <>
            <ColorPicker activeColor={activeColor} onColorChange={onColorChange} />
            <StrokeWidthControl
              strokeWidth={strokeWidth}
              onStrokeWidthChange={onStrokeWidthChange}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                id="upload-image"
                className="hidden"
                onChange={onFileUpload}
              />
              <Button
                variant="outline"
                className="border-white/50 text-white hover:border-white hover:bg-white/10"
                onClick={() => document.getElementById('upload-image')?.click()}
              >
                <FileImage className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default CanvasToolbar;
