
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TattooCanvas from '@/components/TattooCanvas';
import BodyPreview from '@/components/BodyPreview';
import ToolPanel from '@/components/ToolPanel';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Customize = () => {
  const [activeTab, setActiveTab] = useState('draw');
  const [activeColor, setActiveColor] = useState('#9b87f5');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [canvasImage, setCanvasImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // If switching to preview tab, capture the canvas
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
    
    // In a real app, this would save to a database or local storage
    // For now we just show a toast notification
    toast.success('Your design has been saved!');
  };

  // Handle initial canvas capture if starting directly on preview tab
  useEffect(() => {
    if (activeTab === 'preview' && !canvasImage) {
      // Small delay to ensure canvas is rendered
      const timer = setTimeout(() => {
        captureCanvas();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, canvasImage]);

  return (
    <div className="min-h-screen flex flex-col bg-ink-dark">
      <Navbar />
      
      <main className="flex-grow">
        <div className="ink-container py-6 md:py-10">
          <h1 className="text-3xl md:text-4xl font-display text-ink-light mb-2">Customize Your Tattoo</h1>
          <p className="text-ink-light/70 max-w-2xl mb-8">
            Draw your own design, upload an image, or modify existing artwork to create your perfect tattoo.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Side - Tool Panel */}
            <div className="lg:col-span-1">
              <ToolPanel 
                onTabChange={handleTabChange} 
                activeTab={activeTab}
                onSaveDesign={handleSaveDesign}
              />
            </div>
            
            {/* Right Side - Canvas/Preview Area */}
            <div className="lg:col-span-3 bg-card rounded-lg border border-border p-4 min-h-[600px]">
              {activeTab === 'draw' && (
                <div ref={canvasRef} className="h-full">
                  <TattooCanvas 
                    activeColor={activeColor}
                    strokeWidth={strokeWidth}
                    onColorChange={setActiveColor}
                    onStrokeWidthChange={setStrokeWidth}
                  />
                </div>
              )}
              
              {activeTab === 'preview' && (
                <div className="h-full">
                  <BodyPreview canvasImage={canvasImage} />
                </div>
              )}
              
              {activeTab === 'customize' && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md mx-auto p-8">
                    <h3 className="text-xl font-medium text-ink-light mb-4">Advanced Customization</h3>
                    <p className="text-ink-light/70 mb-6">
                      We're working on additional customization features like filters, effects, and more advanced tools.
                    </p>
                    <p className="text-ink-accent">
                      Coming soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="mt-auto border-t border-ink-accent/20 py-6">
        <div className="ink-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-display text-xl text-ink-light">Inkspire</span>
            </div>
            <div className="text-ink-light/60 text-sm">
              &copy; {new Date().getFullYear()} Inkspire. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Customize;
