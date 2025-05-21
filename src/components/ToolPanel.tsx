
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Image, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface ToolPanelProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  onSaveDesign: () => void;
}

const ToolPanel = ({ onTabChange, activeTab, onSaveDesign }: ToolPanelProps) => {
  const handleSaveDesign = () => {
    onSaveDesign();
    toast("Design saved successfully!");
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger 
            value="draw" 
            className="data-[state=active]:bg-ink-accent data-[state=active]:text-ink-dark"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Draw
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-ink-accent data-[state=active]:text-ink-dark"
          >
            <Image className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger 
            value="customize" 
            className="data-[state=active]:bg-ink-accent data-[state=active]:text-ink-dark"
          >
            <Palette className="w-4 h-4 mr-2" />
            Customize
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <p className="text-ink-light/70 text-sm">
            Use the canvas to sketch your tattoo design. You can adjust colors and brush size from the toolbar above the canvas.
          </p>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <p className="text-ink-light/70 text-sm">
            See how your tattoo design looks on different body parts. Drag to position the tattoo and use the slider to adjust size.
          </p>
        </TabsContent>
        
        <TabsContent value="customize" className="space-y-4">
          <p className="text-ink-light/70 text-sm">
            Adjust additional properties like size, rotation, and filters for your tattoo design.
          </p>
          <div className="py-4 grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
              onClick={() => toast("This feature will be available soon!")}
            >
              Add Filters
            </Button>
            <Button 
              variant="outline" 
              className="border-ink-accent/50 text-ink-light hover:border-ink-accent hover:bg-ink-accent/10"
              onClick={() => toast("This feature will be available soon!")}
            >
              Adjust Rotation
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="pt-4 border-t border-border mt-4">
        <Button 
          className="w-full bg-gradient-to-r from-ink-accent to-ink-accent2 text-ink-dark hover:shadow-lg hover:shadow-ink-accent/20 transition-all duration-300"
          onClick={handleSaveDesign}
        >
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default ToolPanel;
