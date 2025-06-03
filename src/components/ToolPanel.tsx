
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Eye, Palette, Save } from 'lucide-react';
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
    <div className="space-y-6">
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full bg-zinc-800 p-1">
          <TabsTrigger 
            value="draw" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 transition-all duration-200"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Draw
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger 
            value="customize" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 transition-all duration-200"
          >
            <Palette className="w-4 h-4 mr-2" />
            Text
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          <TabsContent value="draw" className="space-y-4 mt-0">
            <div className="space-y-3">
              <h3 className="text-white font-medium">Drawing Mode</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Unleash your creativity! Use professional drawing tools to sketch your unique tattoo design.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4 mt-0">
            <div className="space-y-3">
              <h3 className="text-white font-medium">Preview Mode</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                See your tattoo on a human model. Click to position your design exactly where you want it.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="customize" className="space-y-4 mt-0">
            <div className="space-y-3">
              <h3 className="text-white font-medium">Text Editor</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Create custom text tattoos with various fonts and colors. Perfect your typography on the right panel.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Save Design Button */}
      <div className="pt-4 border-t border-zinc-700">
        <Button 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2.5 transition-all duration-200"
          onClick={handleSaveDesign}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default ToolPanel;
