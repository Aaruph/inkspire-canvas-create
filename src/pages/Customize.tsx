
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TattooCanvas from '@/components/TattooCanvas';
import HumanDoll from '@/components/canvas/HumanDoll';
import BodyViews from '@/components/canvas/BodyViews';
import ToolPanel from '@/components/ToolPanel';
import AdvancedTextEditor from '@/components/canvas/AdvancedTextEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Customize = () => {
  const [activeTab, setActiveTab] = useState('draw');
  const [activeColor, setActiveColor] = useState('#000000'); 
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Preview controls
  const [currentView, setCurrentView] = useState<'front' | 'back' | 'arm' | 'leg'>('front');
  const [previewZoom, setPreviewZoom] = useState(1);
  const [previewRotation, setPreviewRotation] = useState(0);
  const [tattooPosition, setTattooPosition] = useState({ x: 50, y: 50 });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'preview') {
      captureCanvas();
    }
  };

  const captureCanvas = () => {
    const canvasElement = canvasRef.current?.querySelector('canvas');
    if (canvasElement) {
      try {
        const dataUrl = canvasElement.toDataURL('image/png');
        setCanvasImage(dataUrl);
      } catch (error) {
        console.error('Error capturing canvas:', error);
        toast.error('Failed to capture your design. Please try again.');
      }
    }
  };

  const handleSaveDesign = () => {
    captureCanvas();
    toast.success('Your design has been saved!');
  };

  const handleAddText = (text: string, font: string, color: string, size: number) => {
    console.log('Text added:', { text, font, color, size });
  };

  useEffect(() => {
    if (activeTab === 'preview' && !canvasImage) {
      const timer = setTimeout(() => {
        captureCanvas();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, canvasImage]);

  const handleResetPosition = () => {
    setTattooPosition({ x: 50, y: 50 });
    setPreviewRotation(0);
    setPreviewZoom(1);
    toast("Position reset to center");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="ink-container py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display text-foreground mb-3 tracking-wider uppercase">
              Create Your Perfect Tattoo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design with precision, preview with confidence
            </p>
          </div>

          {/* Main Content Grid - Updated layout for bigger drawing section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Tool Panel - Increased from col-span-2 to col-span-3 for better spacing */}
            <div className="lg:col-span-3">
              <Card className="bg-card border-border h-fit">
                <CardContent className="p-4">
                  <ToolPanel 
                    onTabChange={handleTabChange} 
                    activeTab={activeTab}
                    onSaveDesign={handleSaveDesign}
                    onAddText={handleAddText}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Main Canvas Area - Reduced from col-span-8 to col-span-7 to accommodate larger sidebar */}
            <div className="lg:col-span-7">
              <Card className="bg-card border-border h-[700px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-lg">
                    {activeTab === 'draw' && 'Drawing Canvas'}
                    {activeTab === 'preview' && 'Tattoo Preview'}
                    {activeTab === 'customize' && 'Design Studio'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 h-[calc(100%-80px)]">
                  {activeTab === 'draw' && (
                    <div ref={canvasRef} className="h-full">
                      <TattooCanvas 
                        activeColor={activeColor}
                        strokeWidth={strokeWidth}
                        onColorChange={setActiveColor}
                        onStrokeWidthChange={setStrokeWidth}
                        onAddText={handleAddText}
                      />
                    </div>
                  )}
                  
                  {activeTab === 'preview' && (
                    <div className="h-full">
                      <HumanDoll 
                        canvasImage={canvasImage}
                        onPlacementChange={(x, y) => setTattooPosition({ x, y })}
                        currentView={currentView}
                        zoom={previewZoom}
                        rotation={previewRotation}
                      />
                    </div>
                  )}
                  
                  {activeTab === 'customize' && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center max-w-md mx-auto p-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl">✨</span>
                        </div>
                        <h3 className="text-xl font-display uppercase tracking-wider text-foreground mb-3">
                          Customize Mode
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Use the text editor on the right to add custom text tattoos with different fonts and colors.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Switch to Draw to see your complete design
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Body Views for Preview or Text Editor for Customize */}
            {activeTab === 'preview' && (
              <div className="lg:col-span-2">
                <BodyViews
                  currentView={currentView}
                  onViewChange={setCurrentView}
                  zoom={previewZoom}
                  onZoomChange={setPreviewZoom}
                  rotation={previewRotation}
                  onRotationChange={setPreviewRotation}
                  onResetPosition={handleResetPosition}
                />
              </div>
            )}
            
            {activeTab === 'customize' && (
              <div className="lg:col-span-2">
                <Card className="bg-card border-border h-fit">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-lg">Text Editor</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <AdvancedTextEditor onAddText={handleAddText} />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-auto border-t border-border py-6">
        <div className="ink-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-display text-2xl text-foreground tracking-wider uppercase">Inkspire</span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Customize;
