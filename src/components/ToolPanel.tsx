
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Image, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface ToolPanelProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  onSaveDesign: () => void;
  onAddText?: (text: string, font: string, color: string, size: number) => void;
}

const ToolPanel = ({ onTabChange, activeTab, onSaveDesign }: ToolPanelProps) => {
  const handleSaveDesign = () => {
    onSaveDesign();
    toast("Design saved successfully!");
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-700 p-4 shadow-lg">
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4 bg-zinc-800">
          <TabsTrigger 
            value="draw" 
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Draw
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Image className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger 
            value="customize" 
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            <Palette className="w-4 h-4 mr-2" />
            Customize
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <p className="text-gray-300 text-sm font-medium">
            Unleash your creativity! Sketch your design using our professional-grade drawing tools.
          </p>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <p className="text-gray-300 text-sm font-medium">
            See your tattoo come to life! Preview your design on different body parts and adjust as needed.
          </p>
        </TabsContent>
        
        <TabsContent value="customize" className="space-y-4">
          <p className="text-gray-300 text-sm font-medium mb-4">
            Perfect every detail! Use the text editor on the right to add custom text tattoos.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-white text-white hover:border-white hover:bg-white/10"
              onClick={() => toast("This feature will be available soon!")}
            >
              Add Filters
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:border-white hover:bg-white/10"
              onClick={() => toast("This feature will be available soon!")}
            >
              Adjust Rotation
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-4 border-t border-zinc-700 mt-4">
        <Button 
          className="w-full bg-white text-black hover:bg-gray-200 hover:shadow-lg transition-all duration-300 font-bold uppercase tracking-wider"
          onClick={handleSaveDesign}
        >
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default ToolPanel;
