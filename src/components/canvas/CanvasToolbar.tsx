
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
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "draw" | "templates")} className="w-full">
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-black rounded-lg border border-white/20">
        <TabsList className="mr-4 bg-gray-800 border border-white/20">
          <TabsTrigger
            value="draw"
            className="data-[state=active]:bg-white data-[state=active]:text-black font-medium text-white"
          >
            DRAW
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="data-[state=active]:bg-white data-[state=active]:text-black font-medium text-white"
          >
            TEMPLATES
          </TabsTrigger>
        </TabsList>

        <Button
          variant="outline"
          onClick={onClear}
          className="border-white text-white hover:border-white hover:bg-white/10 bg-black"
        >
          <Trash className="w-4 h-4 mr-2" />
          CLEAR
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
                className="border-white text-white hover:border-white hover:bg-white/10 bg-black"
                onClick={() => document.getElementById('upload-image')?.click()}
              >
                <FileImage className="w-4 h-4 mr-2" />
                UPLOAD
              </Button>
            </div>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default CanvasToolbar;
